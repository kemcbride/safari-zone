// all the uh interactive functionality that i had will go here
// - so that the "timed flashing" can go in a worker thread.
/*
	<script src="https://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script src="https://code.jquery.com/color/jquery.color.plus-names-2.1.2.min.js"></script>
*/
var key_left = 37;
var key_down = 40;
var key_up = 38;
var key_right = 39;
var key_d = 68;
var key_k = 75;
var key_f = 70;
var key_j = 74;

$( document ).ready( function() {

  $( document ).keyup( function( event ) { 
    var ew = event.which;
    if ( ew == key_left || ew == key_d ) { //left key
      $("#arrow-left").removeClass("pressed");
    }
    if ( ew == key_up || ew == key_j ) { // up key
      $("#arrow-up").removeClass("pressed");
    }
    if ( ew == key_right || ew == key_k ) { // right key
      $("#arrow-right").removeClass("pressed");
    }
    if ( ew == key_down || ew == key_f ) { // down key
      $("#arrow-down").removeClass("pressed");
    }

  });
  $( document ).keydown( function( event ) {
    var ew = event.which;
    if ( ew == key_left || ew == key_d ) { // left key
      $("#arrow-left").addClass("pressed");
    }
    if ( ew == key_up || ew == key_j ) { // up key
      $("#arrow-up").addClass("pressed");
    }
    if ( ew == key_right || ew == key_k ) { // right key
      $("#arrow-right").addClass("pressed");
    }
    if ( ew == key_down || ew == key_f ) { // down key
      $("#arrow-down").addClass("pressed");
    }
  });

var timerWorker = new Worker("fly_with_me.js");

});
