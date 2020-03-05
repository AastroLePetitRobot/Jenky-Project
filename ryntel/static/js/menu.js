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
  var game = new Phaser.Game(config);

})
$(".retour").click(function(){
  $(".retour").hide()
  $(".ljoueur").show()
  $("#game").hide()
})
var config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 600,
  parent: 'phaser',
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};
function preload (){
  this.load.image('bg', "/static/img/background.png");
  this.load.image('j1p1' , '/static/img/sprites/personnage_assemblВ/personnage-f1.png')
  this.load.image('j1p1bis' , '/static/img/sprites/personnage_assemblВ/personnage-f1-bis.png')
  this.load.image('j1p2' , '/static/img/sprites/personnage_assemblВ/personnage-f2.png')
  this.load.image('j1p3' , '/static/img/sprites/personnage_assemblВ/personnage-f3.png')
  this.load.image('j1p4' , '/static/img/sprites/personnage_assemblВ/personnage-f4.png')

}
function formatTime(seconds){
  // Minutes
  var minutes = Math.floor(seconds/60);
  // Seconds
  var partInSeconds = seconds%60;
  // Adds left zeros to seconds
  partInSeconds = partInSeconds.toString().padStart(2,'0');
  // Returns formated time
  return `${minutes}:${partInSeconds}`;
}
var progressBox
var progressBar
var progressBox2
var pprogressBox
var pprogressBar
var pprogressBox2
var scorebox
var score
var pusername
var ppusername
function onEvent ()
{
  this.initialTime -= 1; // One second
  score.setText(formatTime(this.initialTime));
}
function create (){
  this.initialTime = 180;

  bg = this.add.image(0, 0, 'bg').setOrigin(0,0);
  bg.setDisplaySize(config.width,config.height);
  player = this.add.sprite(100,400,'j1p1').setDisplaySize(341,256)
  player2 = this.add.sprite(1000,400,'j1p1').setDisplaySize(341,256);
  player2.flipX = true
  progressBox2 = this.add.graphics();
  progressBox = this.add.graphics();
  progressBar = this.add.graphics();
  progressBox.fillStyle(0xFF0000, 1);
  progressBox.fillRect(10, 10, 320, 30);
  progressBox2.fillStyle(0x222222, 1);
  progressBox2.fillRect(0, 0, 340, 50);
  progressBar.clear();
  progressBar.fillStyle(0x32ea32 , 1);
  progressBar.fillRect(10, 10, 320 * 1, 30);
  
  pprogressBox2 = this.add.graphics();
  pprogressBox = this.add.graphics();
  pprogressBar = this.add.graphics();
  scorebox = this.add.graphics();
  pprogressBox.fillStyle(0xFF0000, 1);
  pprogressBox.fillRect(770, 10, 320, 30);
  pprogressBox2.fillStyle(0x222222, 1);
  pprogressBox2.fillRect(760, 0, 340, 50);
  pprogressBar.clear();
  pprogressBar.fillStyle(0x32ea32 , 1);
  pprogressBar.fillRect(770, 10, 320 * 1, 30);
  pprogressBox.fillStyle(0x222222, 1);
  pprogressBox.fillRect(470, 0, 160, 80);
  score = this.add.text(510, 25, formatTime(this.initialTime), { fontSize: '32px'});
  timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
  pusername = this.add.text(0, 50, "Gauthier", { fontSize: '20px'});
  ppusername = this.add.text(800, 50, "Thibaut", { fontSize: '20px'});
  ppusername.x = config.width - ppusername.width;

}
phase1 = false
phase2 = false 
phase3 = false
phase4 = false
monte2 = false
monte=false
cpt = 0
function update (){
  cpt++
  if(cpt %17==0){
    if(!monte2){
      player2.y-=5
      monte2 = true
    } else {
      player2.y+=5
      monte2=false
    }
   
  }
  if(cpt%18==0){
    if(phase4){
      if(!monte){
        player.y-=5
        monte = true
      } else {
        player.y+=5
        monte=false
      }
    }
  }

  if(!phase1){
    if(player.y > 120){
      player.setTexture('j1p2')
      player.x+=12.8
      player.y-=8
    } else {
      player.setTexture('j1p3')
      player2.setTexture('j1p1bis')

      phase1 = true
    }
  } else if(!phase2){
    if(player.y < 400){
      player.x+=7
      player.y+=7
    } else {
      player.setTexture('j1p4')
      console.log("pv")
      pprogressBar.clear()
      pprogressBar.fillStyle(0x32ea32 , 1);
      pprogressBar.fillRect(770, 10, 320 * 0.5, 30);
      phase2 = true
    }
  } else if(!phase3){
    if(player.y < 450){
      player.x-=10.5
      player.y+=2
    } else {
      phase3 = true
      player.setTexture('j1p1')
      player2.setTexture('j1p1')
    }
  } else if(!phase4){
    if(player.x > 100){
      player.x-=10
      player.y-=1
    } else {
      phase4 = true
      player.x = 100
      player.y = 400
    }
  }
}