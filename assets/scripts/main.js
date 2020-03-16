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
// Get HIGH and LAST from local storage
let highScore = 0; //localStorage.getItem('high');
let lastScore = 0; //localStorage.getItem('last');
// set SKILL to easy when page loads
let skill = 1;

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

let blueAudio = new Audio(src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
let yellowAudio = new Audio(src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
let redAudio = new Audio(src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
let greenAudio = new Audio(src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
let incorrectAudio = new Audio(src = "./assets/audio/131657__bertrof__game-sound-wrong.wav");
let winningAudio = new Audio(src = "./assets/audio/341985__unadamlar__goodresult.wav");
let gameoverAudio = new Audio(src = "./assets/audio/382310__myfox14__game-over-arcade.wav");

//counts up when there is no button press during players turn
let idleCount = 0;
//used as set interval timer for idleCount.
let idleDelayInterval;
//counts time outs after 3 its game over
let timeoutCount = 0;
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
// location of SKILL button
const skillButton = document.querySelector("#skill-button");
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
        on = true;
        let buttonArray = [strictButton, highLastButton, startResetButton, skillButton]
        for (i = 0; i < buttonArray.length; i++) {
            buttonArray[i].style.color = "black";
        }
        start = false;
        onOffButton.innerHTML = "OFF";
        startResetButton.innerHTML = "START";
        scoreDisplay.innerHTML = "PRESS START";
        if (!strict) {
            strictDisplay.innerHTML = "STRICT: OFF"
        } else {
            strictDisplay.innerHTML = "STRICT: ON"
        }
        if (skill === 1) {
            skillDisplay.innerHTML = "SKILL: EASY";
        } else if (skill === 2) {
            skillDisplay.innerHTML = "SKILL: NORM";
        } else if (skill === 3) {
            skillDisplay.innerHTML = "SKILL: HARD";
        }
        displayHighLast();
        // Add further functions later
    } else {
        on = false;
        start = false;
        let buttonArray = [strictButton, highLastButton, startResetButton, skillButton]
        for (i = 0; i < buttonArray.length; i++) {
            buttonArray[i].style.color = "grey";
        }
        onOffButton.innerHTML = "ON";
        startResetButton.innerHTML = "START";
        scoreDisplay.innerHTML = "OFF";
        skillDisplay.innerHTML = " ";
        turnDisplay.innerHTML = " ";
        clearInterval(idleDelayInterval);
        clearInterval(compPlayInterval);
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
            lifeUsed = 0;
        }
    }

});

//High / last button  - toggles between the High Score and the last Score on the Display
highLastButton.addEventListener('click', (event) => {
    if (on === true) {
        if (highLast === "last") {
            highLast = "high";
        } else
            highLast = "last";
        displayHighLast();
    }
});


//start/reset Button functionality
startResetButton.addEventListener('click', (event) => {
    if (on) {
        if (start === false) {
            let buttonArray = [strictButton, skillButton]
            for (i = 0; i < buttonArray.length; i++) {
                buttonArray[i].style.color = "grey";
            }
            start = true;
            startResetButton.innerHTML = "RESET";
            scoreDisplay.innerHTML = "SCORE: " + score;
            startGame();
        } else {
            let buttonArray = [strictButton, skillButton]
            for (i = 0; i < buttonArray.length; i++) {
                buttonArray[i].style.color = "black";
            }
            start = false;

            startResetButton.innerHTML = "START";
            scoreDisplay.innerHTML = "PRESS START";
            resetGame();
        }
    }
});

//SKILL button - toggles between skill levels
skillButton.addEventListener('click', (event) => {
    if (on && !start) {
        if (skill === 1) {
            skill = 2;
            skillDisplay.innerHTML = "SKILL: NORM";
        } else if (skill === 2) {
            skill = 3;
            skillDisplay.innerHTML = "SKILL: HARD";
        } else if (skill === 3) {
            skill = 1;
            skillDisplay.innerHTML = "SKILL: EASY";
        }
    }

});

//=================PLAYER TURN EVENT LISTNERS===============//

//Blue button functionality - only listening during players turn
blueButton.addEventListener('click', (event) => {
    colourPressed(1);
});
//Yellow button functionality - only listening during players turn
yellowButton.addEventListener('click', (event) => {
    colourPressed(2);
});
//Red button functionality - only listening during players turn
redButton.addEventListener('click', (event) => {
    colourPressed(3);
});
//Green button functionality - only listening during players turn
greenButton.addEventListener('click', (event) => {
    colourPressed(4);
});




//-----FUNCTIONS-----------//

//==========START GAME=============//
function startGame() {
    score = 0;
    scoreDisplay.innerHTML = "SCORE: " + score;
    turnDisplay.innerHTML = "COMP TURN";
    playerTurn = false;
    lifeUsed = 0;
    playerSequence = []; //to hold the players input - cleared each turn
    sequence = []; // randomly generated
    seqPoint = 0;
    let seqLength = 0;
    switch (skill) {
        case 1:
            seqLength = 8;
            break;
        case 2:
            seqLength = 16;
            break;
        case 3:
            seqLength = 32;
            break;
    }
    generateSequence(seqLength);
    //computers turn first
    round = 1; // round 1 play first part of sequence 
    compPlayInterval = setInterval(compPlay, 1000); //play sequence for the player to copy and then set playerTurn = true
};

//==============GENERATE SEQUENCE=========================//
function generateSequence(seqLength) {
    // Populate random sequence with numbers between 1 and 4.
    // loop currently set to 8 but can use skill level when this has been implemented
    for (i = 0; i < seqLength; i++) {
        //math.random returns number between 0 and 1. 
        //I have multiplied this by 4 and then use math.floor to round it down to the nearest whole number.
        //I have then added 1. This ensures that the number is always between 1 and 4
        sequence.push(Math.floor(Math.random() * 4) + 1);
    }
}
//===============COMP TURN===============================//
//Computers turn
function compPlay() {
    turnDisplay.innerHTML = "COMP TURN";
    setTimeout(() => {
        coloursNotActive();
    }, 400);
    if (seqPoint === round) {
        seqPoint = 0;
        playerTurn = true;
        turnDisplay.innerHTML = "YOUR TURN";
        idleDelayInterval = setInterval(idleDelay, 3300);
        clearInterval(compPlayInterval);
    } else {
        colourActive(sequence[seqPoint]); //highlights colour and plays sound.
    }
    seqPoint++;
};

//===============IDLE DELAY===================================//
//reminds player of sequence if there are no button presses for 10s 
function idleDelay() {
    if (!playerTurn) {
        clearInterval(idleDelayInterval);
        idleCount = 0;
    } else if (idleCount === 3 && on) {
        clearInterval(idleDelayInterval);
        playerSequence = [];
        idleCount = 0;
        seqPoint = 0;
        timeoutCount++;
        if (timeoutCount < 4) {
            scoreDisplay.innerHTML = "TIME OUT";
            setTimeout(() => {
                coloursNotActive();
                scoreDisplay.innerHTML = "TRY AGAIN";
            }, 1500);
            setTimeout(() => {
                coloursNotActive();
            }, 1500);
            //run compPlay() every 1s until clear interval is called.
            compPlayInterval = setInterval(compPlay, 1000);
        } else {
            // IF TIMEOUT IS CALLED MORE THAN 4 TIMES GAME OVER.
            scoreDisplay.innerHTML = "TIME OUT";
            setTimeout(() => {
                coloursNotActive();
                scoreDisplay.innerHTML = "GAME OVER";
            }, 1000);
            gameOver();

        }
    } else {
        idleCount++;
   
    }
}

//============COLOUR PRESSES===========================//
//The colour button presses are only acknowledged during the players turn. 
//the colour is highlighted and note played. The colours return to normal. 
//The colour pressed is added to the player sequence and then checked in the check() function.
function colourPressed(colour) {
    idleCount = 0;
    if (playerTurn === true) {
        colourActive(colour);
        playerSequence.push([colour]);
        setTimeout(() => {
            coloursNotActive();
        }, 200);
        check();
    }
}

//============CHECK FUNCTION=============================//
//Check Function is called from the colourPressed() function.
//this checks the players input against the computer sequence.
function check() {
    for (i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] != sequence[i]) {
            playerCorrect = false;
            if (sound) {
                incorrectAudio.play();
            }
        } else {
            playerCorrect = true;
        }
    }

    if (playerCorrect) {
        if (playerSequence.length === sequence.length) {
            score = score + 1;
            winning();
        } else if (playerSequence.length === round) {
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
        } else {
            playerTurn = true; //continue listening for the rest of the sequence
        }

    } else if (!strict) {
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
        }, 1300);
        //run compPlay() every 1s until clear intaval is called.
        setTimeout(() => {
            compPlayInterval = setInterval(compPlay, 1000);
        }, 2000);
    } else {
        gameOver();
    }
}
//=========COLOUR ACTIVATION==============//

//highlight quadrant and play note .. Called during the computers turn and the players turn
function colourActive(colour) {

    let colourButton = [blueButton, yellowButton, redButton, greenButton];
    let bgColour = ["#0040ff", "#ffff00", "#ff1a1a", "#009900"];
    let colourSound = [blueAudio, yellowAudio, redAudio, greenAudio];
    //highlight colour background
    colourButton[colour - 1].style.backgroundColor = bgColour[colour - 1];
    //play colour sound
    if (sound) {
        colourSound[colour - 1].play();
    }
}
//return colours to deactivated state
function coloursNotActive() {
    blueButton.style.backgroundColor = "#0040ff88";
    yellowButton.style.backgroundColor = "#ffff0088";
    redButton.style.backgroundColor = "#ff1a1a88";
    greenButton.style.backgroundColor = "#00990069";
}

//========RESET GAME=========================//

function resetGame() {
    start = false;
    timeoutCount = 0;
    updateHLScore();
    //if not in strict mode - and life used. give life back for next game.
    if (lifeUsed === 1) {
        strict = false;
        lifeUsed = 0;
    }
    //change display
    scoreDisplay.innerHTML = "PRESS START";
    clearInterval(idleDelayInterval);
    clearInterval(compPlayInterval);

}

//==========PLAYER WINS FUNCTION=============//

function winning() {
    start = false;
    timeoutCount = 0;
    updateHLScore();
    //AUDIO FANFARE
    if (sound) {
        winningAudio.play();
    }
    //if not in strict mode - and life used. give life back for next game.
    if (lifeUsed === 1) {
        strict = false;
        lifeUsed = 0;
    };
    //change display
    scoreDisplay.innerHTML = "WINNER!";
    startResetButton.innerHTML = "START";
    clearInterval(idleDelayInterval);
    clearInterval(compPlayInterval);
}

//===============GAME OVER=================//

function gameOver() {
    start = false;
    timeoutCount = 0;
    playerTurn = false;
    updateHLScore();
    //AUDIO looser tone
    if (sound) {
        gameoverAudio.play();
    }
     //if not in strict mode - and life used. give life back for next game.
     if (lifeUsed === 1) {
        strict = false;
        lifeUsed = 0;
    }
    //change display
    let buttonArray = [strictButton, skillButton]
            for (i = 0; i < buttonArray.length; i++) {
                buttonArray[i].style.color = "black";
            }

    scoreDisplay.innerHTML = "YOU LOSE!";
    startResetButton.innerHTML = "START";
    clearInterval(idleDelayInterval);

}

//===========HIGH LAST=======================//

//---Function to update high and last scores-----//
function updateHLScore() {
    lastScore = score;
    if (lastScore > highScore) {
        highScore = lastScore;
    }
    //Add High and last to local storage so they are retained if the user closes the browser
    //localStorage.setItem('last', lastScore);
    //localStorage,setItem('high', highscore);
    displayHighLast();
}

// update highLast display
function displayHighLast() {
    if (highLast === "last") {
        highLastDisplay.innerHTML = "LAST: " + lastScore;
    } else {
        highLastDisplay.innerHTML = "HIGH: " + highScore;

    }
}