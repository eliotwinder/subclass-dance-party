$(document).ready(function(){
  window.dancers = [];


  $(".addDancerButton").on("click", function(event){
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 100
    );
    window.dancers.push(dancer);

    $('body').append(dancer.$node);

  });

  $(".lineup").on("click", function(event){
    var spaceBDancers = $(window).width() / dancers.length;
    var center = $(window).height() / 2;
    for (var i = 0; i < dancers.length; i++) {
      dancers[i].$node.animate({
        left: "" + ((spaceBDancers*i) - (0.5 * spaceBDancers) + "px"),
        top: "" + center + "px"
      }, 1000);
    }
  });

  
  // Global variable that keeps track of the mouse position
  window.currentMousePos = { x: -1, y: -1 };
  $(document).mousemove(function(event) {
      window.currentMousePos.x = event.pageX;
      window.currentMousePos.y = event.pageY;
  });

});

