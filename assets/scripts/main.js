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
const strictDisplay = document.querySelector("#strict-display");
// High / Last is displayed in the top right of the display window
const highLastDisplay = document.querySelector("#high-last-display");
// location of the On/Off button
const onOffButton = document.querySelector("#on-off");
// location of the Strict button
const strictButton = document.querySelector("#strict");
// location of the HighLast button
const highLastButton = document.querySelector("#high-last");
// location of Start/Reset Button
const startResetButton = document.querySelector("#start-reset");
// location of Blue Button
const blueButton = document.querySelector("blue");
// location of Yellow Button
const yellowButton = document.querySelector("yellow");
// location of the red button
const redButton = document.querySelector("red");
// location of the green button
const greenButton = document.querySelector("green");



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
        if (start === false) {
            start = true;
            startResetButton.innerHTML = "RESET";
            scoreDisplay.innerHTML = "SCORE: " + score;
            playGame();
        } else {
            start = false;
            startResetButton.innerHTML = "START";
            scoreDisplay.innerHTML = "PRESS START";
            resetGame();
        }
    }
});


//Blue button functionality - only listening during players turn
blueButton.addEventListener('click', (event) => {
    if (playerTurn === true) {
        blueActive();
        playerSequence.push[1];
        check();
    }
});
//Yellow button functionality - only listening during players turn
yellowButton.addEventListener('click', (event) => {
    if (playerTurn === true) {
        yellowActive();
        playerSequence.push[2];
        check();
    }
});
//Red button functionality - only listening during players turn
redButton.addEventListener('click', (event) => {
    if (playerTurn === true) {
        redActive();
        playerSequence.push[3];
        check();
    }
});
//Green button functionality - only listening during players turn
greenButton.addEventListener('click', (event) => {
    if (playerTurn === true) {
        blueActive();
        playerSequence.push[4];
        check();
    }
});


//-----FUNCTIONS-----------//
function playGame() {
    score = 0;
    playerTurn = false;
    playerSequence = [];
    compSequence = [];
    // Populate random sequence with numbers between 1 and 4.
    // loop currently set to 8 but can use skill level when this has been implemented
    for (i = 0; i < 8; i++) {
        //math.random returns number between 0 and 1. 
        //I have multiplied this by 4 and then use math.floor to round it down to the nearest whole number.
        //I have then added 1. This ensures that the number is always between 1 and 4
        sequence.push(Math.floor(Math.random() * 4) + 1);
    }
    console.log("sequence = " + sequence); //for debug
    //computers turn first
    compPlay() //play sequence for the player to copy and then set playerTurn = true
};


function compPlay() {
    for (i = 0; i < score; i++) {
        switch (Sequence[i]) {
            case 1:
                blueActive(); //need to set timeout.. maybe add to colour functions
                break;
            case 2:
                yellowActive();
                break;
            case 3:
                redActive();
                break;
            case 4:
                greenActive();
                break;
        };

    };
    compSequence.push(sequence[score])
    playerTurn = true;
    console.log("compSequence =" + compSequence); //for debug
};

//Check Function is called from the coloured button eventlisteners
//this checks the players input against the computer sequence.
function check() {
    console.log("playerSequence = " + playerSequence);
    if (playerSequence === Sequence) {
        winning();
    } else if (playerSequence === compSequence) {
        playerTurn = false; //correct sequence comp turn
        score++;
        compPlay();
    } else if (strict === false) {
        playerSequence.pop(); // .pop removes last item from the array
        compSequence.pop();
        strict = true;
        playerTurn = false;
        compPlay();
    } else {
        gameOver();
    }
}
//=========COLOUR ACTIVATION FUNCTIONS==============//

//highlight quadrant and play note .. Called during the computers turn and the players turn
function blueActive() {
    setTimeout(function () {
        //add a class to the blue quadrant to change the background colour for 1 sec.
        var blueQuadrant = document.getElementById("#blue");
        blueQuadrant.classList.add("highlightBlue");
        //add audio
    }, 1000);
    //removes highlight and adds time interval between colours - May have to move time interval to separate function???
    setTimeout(function() {
        blueQuadrant.classList.remove("highlightBlue");
    },200);
}
function yellowActive() {
    setTimeout(function () {
        var yellowQuadrant = document.getElementById("#yellow");
        yellowQuadrant.classList.add("highlightYellow");
        //add audio
    }, 1000);
    //removes highlight and adds time interval between colours - 
    //May have to move time interval to separate function and colour classs removal???
    setTimeout(function() {
        yellowQuadrant.classList.remove("highlightYellow");
    },200);
}
function redActive() {
    setTimeout(function () {
        var redQuadrant = document.getElementById("#red");
        redQuadrant.classList.add("highlightRed");
        //add audio
    }, 1000);
    //removes highlight and adds time interval between colours - 
    //May have to move time interval to separate function???
    setTimeout(function() {
        redQuadrant.classList.remove("highlightRed");
    },200);
}
function greenActive() {
    setTimeout(function () {
        var greenQuadrant = document.getElementById("#green");
        greenQuadrant.classList.add("highlightGreen");
        //add audio
    }, 1000);
    //removes highlight and adds time interval between colours - 
    //May have to move time interval to separate function???
    setTimeout(function() {
        greenQuadrant.classList.remove("highlightGreen");
    },200);
}