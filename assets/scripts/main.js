// Game panel is always OFF when page is initially loaded.
let on = false;
// Strict is always OFF when page is initially loaded.
let strict = false;

// scoreDisplay is the central display in the display window
const scoreDisplay = document.querySelector("#score-display");
// strictDisplay is top left in the display window
const strictDisplay = document.querySelector("#strict-display")
// State of the On/Off button
const onOffButton = document.querySelector("#on-off");
// State of the Strict button
const strictButton = document.querySelector("#strict");



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
    if (strict === false) {
        strict = true;
        strictDisplay.innerHTML = "STRICT: ON";
    } else {
        strict = false;
        strictDisplay.innerHTML = "STRICT: OFF";
    }
});