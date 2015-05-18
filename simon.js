/*Necessary for MVP

The game should display a randomly generated color sequence.
	- random sequence from 4 colors

The game should make the sequence longer each turn.
	- chain to the sequence each time

The game should play the sequence to completion before 
accepting the player's input.
	- activate event listener when random sequence chooser returns

The player must match the correct color sequence for the 
game to continue onto the next turn.
	- input === sequence ? run sequence function + 1 color : end game func

The game should alert the player whether or not they got the sequence correct, 
and if the game will continue or not.
	- input === sequence ? alert "correct!" run sequence function + 1 color 
	: alert "wrong!" end game func

The game should be nicely styled.
	- cover 3X3 box with alpha chan board; set 1980's background.*/

var run = false;
var colors = ["#red", "#blue", "#green", "#yellow"];
var counter = 0;
var currentSeq = [];
var inputSeq = [];
var tempArr = [];
var score = 0;
var correct = 0;
var audio = document.getElementsByTagName("audio")[0];
var audio1 = document.getElementById("resetbutton");
var bluesound = document.getElementById("bluesound");
var redsound = document.getElementById("redsound");
var greensound = document.getElementById("greensound");
var yellowsound = document.getElementById("yellowsound");
var colorsounds = [redsound, bluesound, greensound, yellowsound]
var colorsoundsSeq = [];
var scoreDisplay = document.getElementById("score");
var playAgain = document.getElementById("playagain");
var quote = document.getElementById("quote");



var runGame = function() {
	run = true
	quote.textContent = ""
	window.setTimeout(function() {
		seqGenerator()}, 3000)
}

// randomly get colors and extend sequence by 1 each time it's called
var seqGenerator =  function() {
	if (run === true ) {
		playAgain.textContent = ""
		var sequence =  Math.floor(Math.random() * colors.length);
		currentSeq.push(colors[sequence])
		colorsoundsSeq.push(colorsounds[sequence])
		for (var i = 0; i < currentSeq.length; i++) {
	    flashColors(i)
		}
		counter += 1;
 }
}
// clicking colors adds them to an array

var addToArr = function(val) {
	inputSeq.push("#" + val.id )
	checkInput()
}	

// does input sequence match currentSeq? yes? 
// run seqgenerator and empty inputArr
// compare incoming value which is the length of input -1 each time
// as it comes in it should be compared to the index of the pattern Arr




var checkInput = function() { 
	if (inputSeq[inputSeq.length-1] === currentSeq[inputSeq.length-1]) {
		correct += 1;
	}
	else {
		endGame()
	}
	if (correct === currentSeq.length && run === true) {
		score += 1
		window.setTimeout(function() {
			inputSeq = [];
			seqGenerator()
			correct = 0;
		}, 2000)
	}
}


var reset = function() {
	correct = 0;
	run = false;
	counter = 0;
	currentSeq = [];
	inputSeq = [];
	tempArr = [];
	score = 0;
	colorsoundsSeq = [];
	scoreDisplay.textContent = ""
	quote.textContent = ""
	playAgain.textContent = "Press The Start Button To Play"
}

var endGame = function() {
	// alert ("game over")
	run = false
	scoreDisplay.textContent = "final score: " + score
	quote.textContent = "All those moments will be lost in time like tears in rain..."


}

// flash each color in the currentSeq then empty currentSeq
// in order for it to flash, I had to rund slashSeq() on the 
// currentSeq array as it shifted() every second.
var flashColors = function(n) {
	window.setTimeout(function() {
		animator(currentSeq[n])
		colorsoundsSeq[n].play()
		colorsoundsSeq[n].currentTime=0;
	} , (n * 700 ))
}


// function to flash a given element.
var animator = function(element) {
	$(element).animate({
  opacity: 0.1, 
  }, 100).animate({
  opacity: 1
  }, 50);
}

// event functions to flash colors and make sounds when clicked
$( "#red" ).click(function() {
 redsound.play()
 animator($( "#red" ))
 redsound.currentTime=0;
})

$( "#blue" ).click(function() {
 bluesound.play()
 animator($( "#blue" ))
 bluesound.currentTime=0;
})

$( "#green" ).click(function() {
 greensound.play()
 animator($( "#green" ))
 greensound.currentTime=0;
})

$( "#yellow" ).click(function() {
 yellowsound.play()
 animator($( "#yellow" ))
 yellowsound.currentTime=0;
})


$("#start").click(function() {
	reset()
	audio.play();
	runGame()
})
 
$("#reset").click(function() {
	reset()
	audio1.play();
})




// Mouseover/ Click sound effect- by JavaScript Kit (www.javascriptkit.com)
// Visit JavaScript Kit at http://www.javascriptkit.com/ for full source code

//** Usage: Instantiate script by calling: var uniquevar=createsoundbite("soundfile1", "fallbackfile2", "fallebacksound3", etc)
//** Call: uniquevar.playclip() to play sound














