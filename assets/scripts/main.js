// Game panel is always OFF when page is initially loaded.
let on = false;
// Strict is always OFF when page is initially loaded.
let strict = false;
// The computer always plays first 
let compTurn = true;
// The score always starts as 0 (maybe add compSequence.length)
let score = 0;
// The last score is always displayed when the page is initally loaded (More work needed here?)
let highLast = "last";
let highScore = 0;
let lastScore = 0;

// The Game is not started when the page loads
let start = false;

//Array to hold random sequence
let sequence = [];
//Array to hold computer sequence (1 added from random sequence each turn)
let compSequence = [];
//Array to hold player sequence ()
let playerSequence = [];

// scoreDisplay is the central display in the display window
const scoreDisplay = document.querySelector("#score-display");
// strictDisplay is top left in the display window
const strictDisplay = document.querySelector("#strict-display")
// High / Last is displayed in the top right of the display window
const highLastDisplay = document.querySelector("#high-last-display")
// State of the On/Off button
const onOffButton = document.querySelector("#on-off");
// State of the Strict button
const strictButton = document.querySelector("#strict");
// State of the HighLast button
const highLastButton = document.querySelector("#high-last");
// Start/Reset Button
const startResetButton = document.querySelector("#start-reset")



// On/Off button status - sets variable and changes text in the display window
onOffButton.addEventListener('click', (event) => {
    if (on === false) {
        on = true;
        scoreDisplay.innerHTML = "PRESS START";
        // Add further functions later
    } else {
        on = false;
        scoreDisplay.innerHTML = "OFF";
        // Add further functions later
    }
});

// Strict ON or OFF - sets variable and changes text in display window
strictButton.addEventListener('click', (event) => {
    if (on === true && start === false) {
        if (strict === false) {
            strict = true;
            strictDisplay.innerHTML = "STRICT: ON";
        } else {
            strict = false;
            strictDisplay.innerHTML = "STRICT: OFF";
        }
    }

});

//High / last button  - toggles between the High Score and the last Score on the Display
highLastButton.addEventListener('click', (event) => {
    if (on === true) {
        if (highLast === "last") {
            highLast = "high";
            highLastDisplay.innerHTML = "HIGH: " + highScore;
        } else {
            highLast = "last";
            highLastDisplay.innerHTML = "LAST: " + lastScore;
        }
    }
});

//start/reset Button functionality
startResetButton.addEventListener('click', (event) => {
    if (on === true) {
        if (start === false){
            start = true;
            startResetButton.innerHTML= "RESET";
            scoreDisplay.innerHTML = "SCORE: " + score;
            playGame();
        } else {
            start = false;
            startResetButton.innerHTML= "START";
            scoreDisplay.innerHTML = "PRESS START";
            resetGame();
        }
    }});
    
function playGame(){
    score = 0;
    playerSequence = [];
    compSequence = [];
    // Populate random sequence with numbers between 1 and 4.
    // loop currently set to 8 but can use skill level when this has been implemented
    for (i=0; i<8; i++){
        //math.random returns number between 0 and 1. 
        //I have multiplied this by 4 and then use math.floor to round it down to the nearest whole number.
        //I have then added 1. This ensures that the number is always between 1 and 4
        sequence.push(Math.floor(Math.random() * 4) + 1);}
    //Need to determine turns and add items from the random sequence to the compSeq.......TBC...
}