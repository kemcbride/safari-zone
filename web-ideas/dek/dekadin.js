/* jshint: esnext: true */

// Trying to get something to scroll like 'gameboy text'
// -- text being added blast-by-blast is working
//
// TODO:
// -- scrolling/flushing on overflow
// http://stackoverflow.com/questions/536814/insert-ellipsis-into-html-tag-if-content-too-wide
//
// -- hide/show based on visibility of room
// http://stackoverflow.com/questions/9255279/callback-when-css3-transition-finishes
//
// -- blast word-by-word, but then render character-by-character

// Basic Functions for detecting overflow in a monospace-text-div

// needs to: tell if word would cause overflow.
// length of word (in char) would result in the last line becoming longer than the
// horizontal space available.
// i'm working with fixed size div, so i will make the assumption about the size.
function wouldOverflow(dest, word) {
    "use strict";
    var newWord = word.innerHTML;
    var divWidth = dest.width();
    var charPerLine = divWidth/charWidth;

    var lines = splitIntoLines(dest, charPerLine);
    console.log(lines);

    return (divWidth > charWidth);
}

function splitIntoLines(div, linechars) {
    "use strict";
    let el = div[0];
    let lines = [];

    if(el.firstChild === null) return lines;
    else {
        switch(true) {
        case (el.innerHTML.length > linechars):
            while(el.innerHTML.length > linechars) {
                lines.push(el.innerHTML.splitText(linechars));
            }
        default:
            lines.push(el.innerHTML);
        }
    }
    return lines;
    // innerHTML does not show where the visual line splits are
    // ... so i guess i'll do some stupid math. GUHGGH
}

// Basic functions for blasting text into a new div
function setupWordTransfer(src, dest) {
    "use strict";
    src.blast({delimiter: 'word'});

    setTimeout(function() {
        transferText(dest);
    }, 2000);
}

function transferText(dest) {
    "use strict";
    $(".blast").each( function( index, element ) {
       setTimeout(function() {
           console.log(wouldOverflow(dest, element.innerHTML));
           transferUnit(element, dest);
       }, 500*index);
    });
}

function transferUnit(el, dest) {
    "use strict";
    dest[0].innerHTML += el.innerHTML + " ";
}


$( document ).ready( function() {
    "use strict";
    var src = $("#dekadin-text");
    var dest = $("#text-box");

    // I would like to use const but ... I need more importantly to access this regardless of scope
    window.charWidth = $("#char").width();
    window.charHeight = $("#char").height();
    console.log(charWidth, charHeight);

    setupWordTransfer(src, dest);
});

