//===========RETRO GAME JS SCRIPT====================//
// Game panel is always OFF when page is initially loaded.
let on = false;
// Strict is always OFF when page is initially loaded.
let strict = false;
// If stict is OFF and the second chance is used this becomes 1.
let lifeUsed = 0;
// The computer always plays first 
let compTurn = true;
// The score always starts as 0 (maybe add compSequence.length)
let score = 0;
// The last score is always displayed when the page is initally loaded (More work needed here?)
let highLast = "last";
//set HIGH and LAST to zero when the page is first loaded
let highScore = 0;
let lastScore = 0;

// The Game is not started when the page loads
let start = false;

//computer always goes first
let playerTurn = false;
//Used in the check() function to determine when the player is correct.
let playerCorrect = false;

//Array to hold random sequence
let sequence = [];
//Array to hold player sequence ()
let playerSequence = [];
//seqPoint is used to determine the part of the sequence should be activated in compPlay.
let seqPoint = 0;
//compPlatInterval is used to set interval timer to run compPlay every 1 second
let compPlayInterval;
//round is used to determine where the game is upto where in the sequence the game is at.
let round = 0;
//****sound on by default*** NOT YET IMPLEMENTED*** sound OFF function.
let sound = true;

// scoreDisplay is the central display in the display window
const scoreDisplay = document.querySelector("#score-display");
// strictDisplay is top left in the display window
const strictDisplay = document.querySelector("#strict-display");
// High / Last is displayed in the top right of the display window
const highLastDisplay = document.querySelector("#high-last-display");
// SKill displayed in bottom left of the display window
const skillDisplay = document.querySelector("#skill-display");
// COMP TURN or YOUR TURN displayed in bottom rightof the display window
const turnDisplay = document.querySelector("#turn-display");
// location of the On/Off button
const onOffButton = document.querySelector("#on-off");
// location of the Strict button
const strictButton = document.querySelector("#strict");
// location of the HighLast button
const highLastButton = document.querySelector("#high-last");
// location of Start/Reset Button
const startResetButton = document.querySelector("#start-reset");
// location of Blue Button
const blueButton = document.querySelector("#blue");
// location of Yellow Button
const yellowButton = document.querySelector("#yellow");
// location of the red button
const redButton = document.querySelector("#red");
// location of the green button
const greenButton = document.querySelector("#green");



// On/Off button status - sets variable and changes text in the display window
onOffButton.addEventListener('click', (event) => {
    if (on === false) {
        console.log("DEBUG: on/off button status: ON"); //debug
        on = true;
        start = false;
        startResetButton.innerHTML = "START";
        scoreDisplay.innerHTML = "PRESS START";
        if (!strict) {
            strictDisplay.innerHTML = "STRICT: OFF"
        } else {
            strictDisplay.innerHTML = "STRICT: ON"
        }
        skillDisplay.innerHTML = "SKILL: EASY";
        highLastDisplay.innerHTML = "LAST: " + lastScore;



        // Add further functions later
    } else {
        console.log("DEBUG: on/off button status: OFF"); //debug
        on = false;
        start = false;
        startResetButton.innerHTML = "START";
        scoreDisplay.innerHTML = "OFF";
        skillDisplay.innerHTML = " ";
        turnDisplay.innerHTML = " ";
        updateHLScore() //update the high and last score (incase off button has been pressed mid game)
        // Add further functions later
    }
});

// Strict ON or OFF - sets variable and changes text in display window
strictButton.addEventListener('click', (event) => {
    if (on && !start) {
        if (!strict) {
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
        if (start === false) {
            console.log("DEBUG: start game"); //debug
            start = true;
            startResetButton.innerHTML = "RESET";
            scoreDisplay.innerHTML = "SCORE: " + score;
            startGame();
        } else {
            console.log("DEBUG: reset game"); //debug
            start = false;
            startResetButton.innerHTML = "START";
            scoreDisplay.innerHTML = "PRESS START";
            resetGame();
        }
    }
});




//-----FUNCTIONS-----------//
function startGame() {
    score = 0;
    scoreDisplay.innerHTML = "SCORE: " + score;
    turnDisplay.innerHTML = "COMP TURN";
    playerTurn = false;
    lifeUsed = 0;
    playerSequence = []; //to hold the players input - cleared each turn
    sequence = []; // randomly generated
    seqPoint = 0;
    console.log("DEBUG: startGame Function"); //debug
    // Populate random sequence with numbers between 1 and 4.
    // loop currently set to 8 but can use skill level when this has been implemented
    for (i = 0; i < 8; i++) {
        //math.random returns number between 0 and 1. 
        //I have multiplied this by 4 and then use math.floor to round it down to the nearest whole number.
        //I have then added 1. This ensures that the number is always between 1 and 4
        sequence.push(Math.floor(Math.random() * 4) + 1);
    }
    console.log("DEBUG: play game function: sequence = " + sequence); //for debug
    //computers turn first
    round = 1; // round 1 play first part of sequence 
    compPlayInterval = setInterval(compPlay, 1000); //play sequence for the player to copy and then set playerTurn = true
};

//Computers turn
function compPlay() {
    turnDisplay.innerHTML = "COMP TURN";
    setTimeout(() => {
        coloursNotActive();
    }, 400);
    console.log("DEBUG: compPlay Function called"); //debug
    if (seqPoint === round) {
        seqPoint = 0;
        playerTurn = true;
        turnDisplay.innerHTML = "YOUR TURN";
        console.log("DEBUG: end compPlay - players turn");
        clearInterval(compPlayInterval);
    } else {
        console.log("DEBUG: coloursActive Function called" + seqPoint); //debug
        colourActive(sequence[seqPoint]);
    }
    /*if (sequence[seqPoint] === 1) {
        blueActive();
    } else if (sequence[seqPoint] === 2) {
        yellowActive();
    } else if (sequence[seqPoint] === 3) {
        redActive();
    } else if (sequence[seqPoint] === 4) {
        greenActive();
    }*/

    seqPoint++;
};

//=================PLAYER TURN EVENT LISTNERS===============

//Blue button functionality - only listening during players turn
blueButton.addEventListener('click', (event) => {
    console.log("DEBUG: player turn Blue pressed"); //debug
    colourPressed(1);
    /*if (playerTurn === true) {
        
        blueActive();
        playerSequence.push([1]);
        setTimeout(() => { 
            coloursNotActive();
        }, 200);
        check();
    }*/
});
//Yellow button functionality - only listening during players turn
yellowButton.addEventListener('click', (event) => {
    console.log("DEBUG: player turn Yellow pressed"); //debug
    colourPressed(2);
    /*if (playerTurn === true) {
        
        yellowActive();
        playerSequence.push([2]);
        setTimeout(() => { 
            coloursNotActive();
        }, 200);
        check();
    }*/
});
//Red button functionality - only listening during players turn
redButton.addEventListener('click', (event) => {
    //colour = 3;
    console.log("DEBUG: player turn Red pressed"); //debug
    colourPressed(3);
    /*   if (playerTurn === true) {
            console.log("DEBUG: player turn Red pressed"); //debug
            redActive();
            playerSequence.push([3]);
            setTimeout(() => { 
                coloursNotActive();
            }, 200);
            check();
        }*/
});

function colourPressed(colour) {
    if (playerTurn === true) {
        console.log("DEBUG: player turn colour pressed" + colour); //debug
        colourActive(colour);
        playerSequence.push([colour]);
        setTimeout(() => {
            coloursNotActive();
        }, 200);
        check();
    }

}

//Green button functionality - only listening during players turn
greenButton.addEventListener('click', (event) => {
    colourPressed(4);
    console.log("DEBUG: player turn Green pressed"); //debug
    /*if (playerTurn === true) {
         
         greenActive();
         playerSequence.push([4]);
         setTimeout(() => { 
             coloursNotActive();
         }, 500);
         check();
     }*/
});


//============CHECK FUNCTION=============================//
//Check Function is called from the coloured button eventlisteners
//this checks the players input against the computer sequence.
function check() {
    console.log("check function");
    console.log("DEBUG: playerSequence = " + playerSequence);
    for (i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] != sequence[i]) {
            console.log("DEBUG: Check function: player sequence not equal to sequence");
            playerCorrect = false;
        } else {
            playerCorrect = true;
        }
        console.log("DEBUG: Check function: playerCorrect = " + playerCorrect);
    }


    if (playerCorrect === true && sequence.length === playerSequence.length) {
        score = score + 1;
        console.log("player wins!");
        winning();
    } else if (playerCorrect === true && playerSequence.length === round) {
        console.log("player correct comp to play!");
        playerTurn = false; //correct sequence comp turn
        score = score + 1;
        scoreDisplay.innerHTML = "SCORE: " + score;
        playerSequence = []; //empty players sequence
        seqPoint = 0; //added here as appeared to be starting from 1 in compPlay
        //clear colours after .5s 
        setTimeout(() => {
            coloursNotActive();
            turnDisplay.innerHTML = "COMP TURN";
        }, 500);
        round++;

        //run compPlay() every 1s until clear interval is called. 
        setTimeout(() => {
            compPlayInterval = setInterval(compPlay, 1000);
        }, 1300);
    } else if (playerCorrect === true) {
        playerTurn = true; //continue listening for the rest of the sequence
    } else if (strict === false) {
        console.log("strict active player gets second chance");
        playerSequence = []; //empty players sequence
        strict = true; // life used up
        playerTurn = false;
        seqPoint = 0; //added here so whole sequence is repeated in compPlay
        //clear colours after .5s
        lifeUsed = 1;
        scoreDisplay.innerHTML = "INCORRECT";
        setTimeout(() => {
            coloursNotActive();
            scoreDisplay.innerHTML = "TRY AGAIN";
        }, 700);
        setTimeout(() => {
            coloursNotActive();
        }, 1400);
        //run compPlay() every 1s until clear intaval is called.
        setTimeout(() => {
            compPlayInterval = setInterval(compPlay, 1000);
            compPlay();
        }, 2000);
    } else {
        console.log("game over");
        gameOver();
    }
}
//=========COLOUR ACTIVATION FUNCTIONS==============//

function colourActive(seqPoint) {
    if (seqPoint === 1) {
        blueButton.style.backgroundColor = "#0040ff";
        //Play blue audio
        if (sound) {
            blueAudio.play();
        }
    } else if (seqPoint === 2) {
        yellowButton.style.backgroundColor = "#ffff00";
        //Play yellow audio
        if (sound) {
            yellowAudio.play();
        }
    } else if (seqPoint === 3) {
        redButton.style.backgroundColor = "#ff1a1a";
        //play red audio
        if (sound) {
            redAudio.play();
        }
    } else if (seqPoint === 4) {
        greenButton.style.backgroundColor = "#009900";
        //play green audio
        if (sound) {
            greenAudio.play();
        }
    }
}
/*
//highlight quadrant and play note .. Called during the computers turn and the players turn
function blueActive() {
    console.log("blueActive function");
    //Change backgroundcolor
    blueButton.style.backgroundColor = "#0040ff";
    //Play blue audio
    if (sound) {
       blueAudio.play();
    }
}

function yellowActive() {
    console.log("yellowActive function");
    //Change backgroundcolor
    yellowButton.style.backgroundColor = "#ffff00";
    //Play yellow audio
    if (sound) {
        yellowAudio.play();
    }
}

function redActive() {
    console.log("redActive function");
    //Change backgroundcolor
    redButton.style.backgroundColor = "#ff1a1a";
    //play red audio
    if (sound) {
        redAudio.play();
    }
}

function greenActive() {
    console.log("greenActive function");
    //change background color
    greenButton.style.backgroundColor = "#009900";
    //play green audio
    if (sound) {
        greenAudio.play();
    }
}
*/
//return colors to deactivated state
function coloursNotActive() {
    console.log("DEBUG: Deactivate colours");
    blueButton.style.backgroundColor = "#0040ff88";
    yellowButton.style.backgroundColor = "#ffff0088";
    redButton.style.backgroundColor = "#ff1a1a88";
    greenButton.style.backgroundColor = "#00990088";
}

//========RESET GAME=========================//

function resetGame() {
    console.log("DEBUG: Reset game");
    updateHLScore();
    //if not in strict mode - and life used. give life back for next game.
    if (lifeUsed === 1) {
        strict = false;
    }
    //change display
    scoreDisplay.innerHTML = "PRESS START";

}

//==========PLAYER WINS FUNCTION=============//

function winning() {
    console.log("DEBUG: Winning!!");
    updateHLScore();
    //AUDIO FANFARE

    //change display
    scoreDisplay.innerHTML = "WINNER!";
}

//===============GAME OVER=================//

function gameOver() {
    console.log("DEBUG: Game Over");
    playerTurn = false;
    updateHLScore();
    //AUDIO looser tone
    //change display
    scoreDisplay.innerHTML = "YOU LOSE!";


}
//---Function to update high and last scores-----//
function updateHLScore() {
    lastScore = score;
    if (lastScore > highScore) {
        highScore = lastScore;
    }
    if (highLast === "last") {
        highLastDisplay.innerHTML = "LAST: " + lastScore;
    } else {
        highLastDisplay.innerHTML = "HIGH: " + highScore;
    }
}