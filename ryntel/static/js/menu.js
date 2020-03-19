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
    url : '/dashboard/arene/historique/',headers: { "X-CSRFToken": getCookie("csrftoken") },
    data: {'id' : $(this).attr("data-id")},
    success: function(data){
        $(".modal-title").text("Historique de "+username)
        html_gen = ""
        for(i=1; i<Object.keys(data).length+1 ; i++){
          html_gen+="<p>Combat n°: "+data[i].id_match
          html_gen+="<br>Joueur attaquant: "+data[i].joueur_attaque
          html_gen+="<br>Joueur défenseur: "+data[i].joueur_defense
          html_gen+="<br>Gagnant: "+data[i].gagnant+"</p>"

        }
        $(".modal-body").html(html_gen)
    },
    error: function(data){
        console.log("erreur");
    }
});
})

$(function() {
  $('.tooltip-wrapper').tooltip({position: "top"});
});