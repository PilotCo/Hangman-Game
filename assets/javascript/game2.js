/* 
	Title: HANGMAN
	Written By: Cody Pilot; Date: 6/24/2017
	This javascript code will print a random word chosen from an array of western words.
	The word will originally show up as underscores allowing the user to guess letters.
*/

// Initialize and declare Variables

var validChoices;
var possibleWords;
var initialPress = true;
var wrongChoicesLeft;
var currentWord = "";
var currentWordUnderscored = "";
var currentTurn = 1;
var myGuess = "";
var lettersGuessed;
var numLettersGuessed
var lettersMatched;
var validChoice;
var correctGuess;
var endGame;
var score = 0;
var gamesPlayed = 0;


// setup the game.
function setup(){
	validChoices = "abcdefghijklmnopqrstuvwxyz";
	possibleWords = ['space','comet','galaxy','wormhole','earth','planet','spaceship','universe','jupiter','spacetime'];
	wrongChoicesLeft = 1;
	endGame = false;

	lettersGuessed = "";
	lettersMatched = 0;
	currentWordUnderscored = "";
	currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
	for (var i = 0; i < currentWord.length; i++) {
		currentWordUnderscored += "_";
	}
	//initialize the html document display.
	document.getElementById("randWord").innerHTML = currentWordUnderscored;
	document.getElementById("wrongChoicesLeft").innerHTML = wrongChoicesLeft;
	document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
	document.getElementById("initialOutput").innerHTML = "Let's Begin!";
	document.getElementById("playAgain").innerHTML = "";
}

//this function will replace a string value at some index with another value.
function setCharAt(str,index,replaceWith) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + replaceWith + str.substr(index+1);
}

//setup the restart game button
function restartGame(){
	setup();
}
//set up the initial starting conditions on a key press.

if(initialPress == true){ // run this only once at the beginning of the game.
	document.getElementById("initialOutput").innerHTML = "Press any key to get started!";
	document.onkeyup = function(initialButton){
			if(initialPress == true){
        	initialPress = false;
        	setup();
       		}
    }
}


//window.onload = setup();

//start the game. If a letter is picked and submitted run the function.
function submitLetter(){
	//initialize function variables.
	myGuess = document.getElementById("guessBox").value;
	validChoice = false;
	correctGuess = false;
	document.getElementById("errorMsg").innerHTML = "";

	
	//check to see if myGuess is a valid guess
	for (var i = 0; i < validChoices.length; i++) {
		if(myGuess == validChoices[i]){
			validChoice = true;
		}
	}
	if(validChoice == false){
		document.getElementById("errorMsg").innerHTML = "Not a valid choice, try again"
	}else{
		//check to see if the guess was already made.
		for (var i = 0; i < lettersGuessed.length; i++) {
			if(myGuess == lettersGuessed[i]){
				validChoice = false;
			}
		}
		if(validChoice == false){
			document.getElementById("errorMsg").innerHTML = "This letter was already guessed, try again"
		}else{
			//We now have a valid guess, now check to see if this is a correct or incorrect guess
			for (var i = 0; i < currentWord.length; i++) {
				if(myGuess == currentWord[i]){
					//every time myGuess shows in the current word, replace the underscore with the correct letter.
					//currentWordUnderscored[i] = myGuess;
					currentWordUnderscored = setCharAt(currentWordUnderscored,i,myGuess);

					correctGuess = true;
					console.log("correctGuess = " + correctGuess)
					console.log(currentWordUnderscored);
					console.log("curent word letter that is correct: " + currentWord[i]);
					lettersMatched++;
				}
			}
			//if the valid letter choice is incorrect, subtract 1 from the valid choices remaining
			if(correctGuess == false){
				wrongChoicesLeft--;
			}
			//no matter the outcome, there was a letter guessed. update which letters were guessed.
			lettersGuessed += myGuess;

			//display new variables on the html page.
			document.getElementById("randWord").innerHTML = currentWordUnderscored;
			document.getElementById("wrongChoicesLeft").innerHTML = wrongChoicesLeft;
			document.getElementById("lettersGuessed").innerHTML = lettersGuessed;

			//check to see if the game needs to end.
			if(currentWordUnderscored == currentWord || lettersMatched == currentWord.length){
				document.getElementById("initialOutput").innerHTML = "You Win!!!";
				endGame = true;
				score++;
				gamesPlayed++;
			}else if(wrongChoicesLeft == 0){
				document.getElementById("initialOutput").innerHTML = "You Lose...";
				endGame = true;
				gamesPlayed++;
			}
			if(endGame == true){
				document.getElementById("playAgain").innerHTML = "Would you like to play again? Click Restart!";
			}
		}
	}

}
