// Trying to get something to scroll like 'gameboy text'
// -- text being added blast-by-blast is working
//
// TODO:
// -- scrolling/flushing on overflow
// http://stackoverflow.com/questions/536814/insert-ellipsis-into-html-tag-if-content-too-wide
// should store the "lines" in the dest as an array of "lines", so that char counting is good
// also need to use a different way to initiate the transfer, so that it can be controller
// with a callback
//
// -- hide/show based on visibility of room
// http://stackoverflow.com/questions/9255279/callback-when-css3-transition-finishes
//
// -- blast word-by-word, but then character-by-character

// Basic Functions for detecting overflow in a monospace-text-div


function splitString(str, index) {
    "use strict";
    return [str.substring(0, index), str.substring(index)];
}

function splitIntoLines(div, linechars) {
    // you know what i need to do? i need to actually store the text for the div in 
    // an abstracted way - i need to store it as lines in an array
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

// needs to: tell if word would cause overflow.
function wouldOverflow(div, word) {
    "use strict";
    window.charPerLine = div.width()/charWidth; // CONSTANT PER LOAD

    // newWord can't be undefined or null.
    let newWord = (word.innerHTML === undefined)? "" : word.innerHTML;
    let lines = splitIntoLines(div, charPerLine);

    console.log(charPerLine, lines.length);
    // console.log(lines);

    // be careful about lines.pop() AND newWord
    return lines.pop().length + newWord.length > charPerLine;
}

function flushBuffer(div) {
    // pretty dumb so far...
    div.innerHTML = "";
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
    // so obviously this has some problems - 
    // ALL of the setTimeouts are set from right now at the start, when really,
    // I want them to create each other more recursive-like, to be able to
    // really control the flow.

    // would like to be able to access these like an array / with an iterator,
    // not in this weird jquery "each" way
    $(".blast").each( function( index, element ) {
       setTimeout(function() {
           if( wouldOverflow(dest, element.innerHTML) ) {
               dest[0].classList.toggle('ready-to-flush');

               // put the actual FLUSH into a click / action callback to continue
               setTimeout(function() {
                   flushBuffer(dest[0]);
                   dest[0].classList.toggle('ready-to-flush');
               }, 250); // 250 ms just to be between word renders
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
    // instead, make a class in another file, include it, instantiate it, do stuff
});

