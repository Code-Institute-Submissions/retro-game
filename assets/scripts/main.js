// Game panel is always OFF when page is initially loaded.
let on = false;
// scoreDisplay is the central display in the display window
const scoreDisplay = document.querySelector("#score-display");
// State of the On/Off button---*/
const onOffButton = document.querySelector("#on-off");

// On/Off button status - Change text in the display window
onOffButton.addEventListener('click', (event) => {
    if (on === false ) {
      on = true;
      scoreDisplay.innerHTML = "PRESS START";
      // Add further functions later
    } else {
      on = false;
      scoreDisplay.innerHTML = "OFF";
      // Add further functions later
    }
  });

  