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