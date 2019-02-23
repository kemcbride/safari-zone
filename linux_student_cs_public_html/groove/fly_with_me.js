//
// 
//
var n = 0;
var b = [];

var offset = -0.313;
var bpm = 132;
var bps = bpm/60;
var p = 1097*2;
// first toggle should occur at time: bps + offset

function toggle_targets(auc) {
  var x = document.getElementsByClassName('targets')[0];
  b[n] = auc.currentTime;
  if(b.length > 1) { console.log(b[n]-b[n-1]); }
  if( n%2 == 1 ) {
    x.classList.remove('targets-off');
  }
  else {
    x.classList.add('targets-off');
  }
  n++;
  var beats_me = setTimeout(function() { toggle_targets(auc) }, p);
}

document.addEventListener('DOMContentLoaded', function() {

var pl = document.getElementById('audio-player');
var auc = new MediaController();
pl.controller = auc;
pl.onplay = function( event ) {
  setTimeout( function() {toggle_targets(auc)}, (bps+offset)*500 );
};

});
