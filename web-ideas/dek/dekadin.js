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
// i'm working with fixed size div, so i WILL MAKE the assumption about the size.

function splitString(str, index) {
    "use strict";
    return [str.substring(0, index), str.substring(index)];
}

function splitIntoLines(div, linechars) {
    "use strict";
    let el = div[0];
    var lines = [];

    if(el.firstChild === null) return [""];
    else { // not null
        let str = el.innerHTML;
        if(str.length <= charPerLine) return [str];
        // str.length > charPerLine

        let split = [];
        split = splitString(str, linechars);
        lines.push(split[0]);

        while(split[1] > linechars) {
            lines.push(split[0]);
            split = splitString(split[1], linechars);
        }
        lines.push(split[1]);
    }
    return lines;
}

function wouldOverflow(div, word) {
    "use strict";
    let newWord = (word.innerHTML === undefined)? "" : word.innerHTML;

    window.charPerLine = div.width()/charWidth; // CONSTANT PER LOAD

    let lines = splitIntoLines(div, charPerLine);
    console.log(charPerLine, lines.length);
    // console.log(lines);

    // be careful about lines.pop() AND newWord
    return lines.pop().length + newWord.length > charPerLine;
}

function flushBuffer(div) {
    div[0].innerHTML = "";
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
           if( wouldOverflow(dest, element.innerHTML) ) {
               flushBuffer(dest);
           }
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

    // would like to use const but more importantly, access regardless of scope
    window.charWidth = $("#char").width();
    window.charHeight = $("#char").height();
    window.linePerDiv = 3; // calculating is not accurate enough.

    setupWordTransfer(src, dest);
});

