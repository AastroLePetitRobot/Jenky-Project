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
  $("#score").hide()
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
  combat_start = true
  demarrer_combat(1)
}
tourjoueur1 = false
tourjoueur2 = false
phase1 = true
phase2 = true 
phase3 = true
phase4 = true
pphase1 = true
pphase2 = true
pphase3 = true
pphase4 = true
monte2 = false
monte=false
lastplayed = 0
cpt = 0
j1hp = 100
j2hp = 100
combat_start=false
function update (){
  if(j1hp>0 && j2hp>0){
    if(combat_start){
      bougerPerso()
      if(lastplayed == 1 && tourjoueur2){
        lancer_attaque_j2()
      } else if(lastplayed == 2 && tourjoueur1) {
        lancer_attaque_j1()
        console.log("le joueur 2 joue")
      }
      attaquer_perso1()
      attaquer_perso2()
    }
  } else {
    $("canvas").hide()
    if(j1hp<= 0){
      $("#score").text("Le joueur 2 a gagné")
    } else {
      $("#score").text("Le joueur 1 a gagné")
    }
    $("#score").show()
  }
}

function bougerPerso(){
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
}

function attaquer_perso1(){
  if(tourjoueur1){
    if(!phase1){
      if(player.y > 120){
        player.setTexture('j1p2')
        player.x+=19.2
        player.y-=12
      } else {
        player.setTexture('j1p3')
        player2.setTexture('j1p1bis')
  
        phase1 = true
      }
    } else if(!phase2){
      if(player.y < 400){
        player.x+=13
        player.y+=13
      } else {
        player.setTexture('j1p4')
        console.log("pv")
        j2hp-=10 // on retire 10 hp au joueur 2
        pprogressBar.clear()
        pprogressBar.fillStyle(0x32ea32 , 1);
        pprogressBar.fillRect(770, 10, 320 * (j2hp/100), 30);
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
        tourjoueur1 = false
        tourjoueur2 = true
        console.log("Au tour du joueur 2")
        lastplayed = 1
        player.x = 100
        player.y = 400
      }
    }
  }
}

function attaquer_perso2(){
  if(tourjoueur2){
    if(!pphase1){
      if(player2.y > 120){
        player2.setTexture('j1p2')
        player2.x-=19.2
        player2.y-=12
      } else {
        player2.setTexture('j1p3')
        player.setTexture('j1p1bis')

        pphase1 = true
      }
    } else if(!pphase2){
      if(player2.y < 400){
        player2.x-=13
        player2.y+=13
      } else {
        player2.setTexture('j1p4')
        console.log("pv")
        j1hp-=10 // on retire 10 hp au joueur 2
        progressBar.clear()
        progressBar.fillStyle(0x32ea32 , 1);
        progressBar.fillRect(10, 10, 320 * (j1hp/100), 30);
        pphase2 = true
      }
    } else if(!pphase3){
      if(player2.y < 450){
        player2.x+=10.5
        player2.y+=2
      } else {
        pphase3 = true
        player2.setTexture('j1p1')
        player.setTexture('j1p1')
      }
    } else if(!pphase4){
      if(player2.x < 1000){
        player2.x+=10
        player2.y-=1
      } else {
        pphase4 = true
        tourjoueur2 = false
        tourjoueur1 = true
        console.log("au tour du joueur 1")
        lastplayed = 2
        player2.x = 1000
        player2.y = 400
      }
    }
  }
}

function lancer_attaque_j1(){
  if(!tourjoueur2 && tourjoueur1){
    phase1 = false
    phase2 = false
    phase3 = false
    phase4 = false
    tourjoueur1 = true
    lastplayed = 1
  }
}

function lancer_attaque_j2(){
  if(!tourjoueur1 && tourjoueur2){
  pphase1 = false
  pphase2 = false
  pphase3 = false
  pphase4 = false
  tourjoueur2 = true
  lastplayed = 2
  }
}

function demarrer_combat(id){
  if(id == 1){
    tourjoueur1 = true
    lancer_attaque_j1()
    combat_start = true
    lastplayed = 1
  } else if(id == 2){
    tourjoueur2 = true
    lancer_attaque_j2()
    combat_start = true
    lastplayed = 2
  } else {
    console.log("Mauvais id")
  }
}