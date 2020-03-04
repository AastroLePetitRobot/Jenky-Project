$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $("body").on('change', '#customSwitch1', function(){
    $('body').toggleClass('light dark');
    if($(this).prop('checked')){
      $('#customSwitch1_label').text('Dark');
    }
    else{
      $('#customSwitch1_label').text('Light');
    }
  });
  if(window.location.hash == '#inventaire'){
    $('.resume').hide();
    $('.btn1').removeClass("active");
    $('.objets').show();
    $('.btn2').addClass("active");
    $('.competences').hide();
    $('.btn3').removeClass("active");
  } else if(window.location.hash == '#competences'){
    $('.resume').hide();
    $('.btn1').removeClass("active");
    $('.objets').hide();
    $('.btn2').removeClass("active");
    $('.competences').show();
    $('.btn3').addClass("active");
  }else if(window.location.hash == '#'){
    $('.resume').show();
    $('.btn1').addClass("active");
    $('.objets').hide();
    $('.btn2').removeClass("active");
    $('.competences').hide();
    $('.btn3').removeClass("active");
  }
  $(".btn1").click(function(){
    $('.resume').show();
    $('.btn1').addClass("active");
    $('.objets').hide();
    $('.btn2').removeClass("active");
    $('.competences').hide();
    $('.btn3').removeClass("active");
  });
  $(".btn2").click(function(){
    $('.resume').hide();
    $('.btn1').removeClass("active");
    $('.objets').show();
    $('.btn2').addClass("active");
    $('.competences').hide();
    $('.btn3').removeClass("active");
  });
  $(".btn3").click(function(){
    $('.resume').hide();
    $('.btn1').removeClass("active");
    $('.objets').hide();
    $('.btn2').removeClass("active");
    $('.competences').show();
    $('.btn3').addClass("active");
  });
  $(document).on('mouseenter', '.afficher_stuff', function () {
    $(this).find(":button").show();
  }).on('mouseleave', '.afficher_stuff', function () {
      $(this).find(":button").hide();
  });
  $(document).on('mouseenter', '.item', function () {
    $(this).find(".close").show();
  }).on('mouseleave', '.item', function () {
      $(this).find(".close").hide();
  });
  $(".alert-danger").fadeTo(2000, 100).slideUp(500, function(){
    $(".alert-danger").slideUp(500);
});
$(".alert-success").fadeTo(2000, 100).slideUp(500, function(){
  $(".alert-success").slideUp(500);
});
function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }
$(".info-combat").click(function(){
  var username = $(this).attr("user")
  $.ajax({
    type: 'POST',
    url : '/dashboard/arene/infouser/',headers: { "X-CSRFToken": getCookie("csrftoken") },
    data: {'id' : $(this).attr("data-id")},
    success: function(data){
        $(".modal-title").text(username)
        $(".modal-body").html("<p> <img class='icones' src='/static/img/icons/atq.png'> "+data.atq+"</p>"+"<p><img class='icones' src='/static/img/icons/def.png'> "+data.def+"</p>"+"<p><img class='icones' src='/static/img/icons/spd.png'> "+data.spd+"</p>"+"<p><img class='icones' src='/static/img/icons/acc.png'> "+data.acc+"</p>")
    },
    error: function(data){
        console.log("erreur");
    }
});
})
$(".attaquer-combat").click(function(){
  $(".ljoueur").hide()
  $("#game").show()
  $(".retour").show()
})
$(".retour").click(function(){
  $(".retour").hide()
  $(".ljoueur").show()
  $("#game").hide()
})

var Joueur1;
var Joueur2;
var joueur1pos1x = 10, joueur1pos1y = 335
var joueur2pos1x = 960, joueur2pos1y = 335


function startGame() {
    Joueur1 = new component(128, 256, "/static/img/mc/steve_face.png", joueur1pos1x, joueur1pos1y, "image");
    Joueur2 = new component(128, 256, "/static/img/mc/steve_face.png", joueur2pos1x, joueur2pos1y, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1100;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.getElementById("game").appendChild(this.canvas)
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
        console.log(color)
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}
function updateGameArea() {
  myGameArea.clear();
  Joueur1.newPos();
  Joueur1.update();
  Joueur2.newPos();
  Joueur2.update();
}
