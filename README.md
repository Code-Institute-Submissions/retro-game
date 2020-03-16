# RETRO GAME - ATARI Touch-Me!

## Introduction
### Full Stack Developer Course: Milestone project 2.

The brief was to design an interactive front end website.
The site should respond to the users' actions, allowing users to actively engage with data, alter the way the site displays the information to achieve their preferred goals.

#### Value provided:
Users are able to interact with the site in their particular way, to achieve their personal goals and derive answers to their specific questions.
The site owner advances their own goals by providing this functionality, potentially by being a regular user themselves.


## Design Development
One idea suggested was to create 'The Simon Game'. I did a little bit of research into this and found that the Simon game was based on an old Atari arcade game that never really took off. Whilst looking at this I was taken with the imagery of the arcade game and the hand held device and decided that I would like to recreate this. I have a passion for the past and thought I could bring the retro / vintage / nostalgic 'feel' to this site and game for myself and the player to enjoy.

This is a memory game where the player must replicate a sequence. A light and accompanying sound are played and the player must press the button to replicate the coloured light and sound. If the players sequence matches the computer sequence they go to the next round where an additional coloured light and sound is added to the sequence.


 
## UX

I decided I wanted the first page you get to to be the Game. As this is the main reason for visiting the site. I also believe that most traffic to the site will be users that have previously played and they would not be interested in the 'How to play' page and the history of the game. 

### Game Panel display 
Much of the HTML and CSS development time was spent developing the game panel. I wanted to ensure that the panel was close to the design of the original Atari game to provide the retro feel, whilst providing a good user interface on mobile and desktop devices. Therefore I have removed / combined some buttons and made some buttons larger than others. I quickly realised that bootstrap was not very useful for this project. This meant that I had to be creative with my use of CSS. I spent some time working with view height and view width parameters to ensure the game panel appeared well on all devices and buttons images etc were responsive and remained in proportion.

### How to play page
I decided to place the 'How to play' information on a separate page. The aim of this page is to provide the user with concise instructions on how to play and the controls whilst retaining the retro feel. I have modified some of the original documentation to describe the controls to provide this. I also included a breif history section that provides links to vintage posters and teh Wikipedia page. I wanted this page to open as an additional page so the player can have this open alongside the game panel for reference.  


## User Stories

- As a user, I expect to press a button to switch the game panel on.

- As a user, I want to see the game status in a display window.

- As a user, I expect to press a START button to start the game.

- As a user, I expect a random sequence of signals to be played.

- As a user, I expect that each time I input a sequence of signals correctly, I see the same sequence of signals but with an additional step.

- As a user, I expect to hear a sound that corresponds to each colour when the sequence plays and when I press a colour.

- As a user, if I press the incorrect colour I expect a sound and a message to be presented in the display to let me know.  I expect that the sequence of signals starts again to remind me so I can try again.

- As a user, I expect that if I do not input a signal there will be a timeout after 10seconds.

- As a user, I expect that the game will be over after 3 timeouts.  

- As I user, I want to be able to restart the game, I expect to be able to press a reset button, and the game will return to a single step.

- As I user, I expect to have the option to play in STRICT mode where if I press the incorrect colour it notifies me and the game ends.

- As a user, I expect to win the game by getting a series of 8 steps correct (in 'EASY'). I expect the game to end and the display to change to let me know I have won.

- As a user, I expect to be able to see my last and high socre in the display.

- As a user, I expect that I can change the skill level to increase the length of the sequence. NORM = 16, HARD = 32.

- As a user, I can turn the sound OFF. ** yet to be implemented **Future enhancement. 



Click here for [Wireframes](./assets/links/retro-game-mockups.pdf).

Click here for [Game flow](./assets/links/retro-game-flowchart.pdf) flowchart used during JS code development.

Click here for [compPlay()](./assets/links/retro-game-flowchart.pdf) flowchart used during JS code development.

Click here for [check()](./assets/links/retro-game-flowchart.pdf) flowchart used during JS code development.

## Features

Button Functionalities:

1. ON/OFF Button -  Toggle button. When on the display lights up and the button row becomes active. When switched off the game is ended and the main middle of the display window will show 'OFF'.

2. START/RESET Button - Large button in the center of the game panel. This switch will become active when the ON/OFF switch is ON and START will be displayed. The display window will display the text 'PRESS START'.

3. START Button - When pressed the game begins (the computer sequence starts). Then the switch will become the RESET switch.

4. RESET Button - When pressed the game will stop and be reset. Then it will display START.

5. STRICT Button - Button to toggle strict mode on and off. When strict mode is OFF; if the player makes an error they get a second attempt at the sequence. STRICT : OFF will be displayed in the display window. If strict mode is ON then the player does not get a second chance. This button will be inactive when the the OFF button is pressed and suring gameplay.

6. HIGH/LAST Button - This button will become active when the ON OFF button is ON. Then it can be used to toggle the between the High and last scores in the display window. 

7. Coloured buttons: BLUE BUTTON, YELLOW BUTTON, RED BUTTON, GREEN BUTTON - Illuminate and play sound during computer sequence or when the player presses during game play. 

8. SKILL BUTTON: This can be used to toggle between EASY, NORM and HARD. In EASY the sequence length is 8. In NORM the sequence length is 16. In HARD the sequence length is 32. 


 
### Existing Features
- Feature 1 - allows users X to achieve Y, by having them fill out Z
- ...

For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

### Features Left to Implement
- An additional button to mute the sound.
- Increase the sequence speed could be altered as a feature, or depedent on level. i.e. on HARD have it alot quicker.


## Technologies Used

- HTML
- CSS
- bootstrap
- Javascript
- Jasmine

## Testing

### HTML validation
I used https://validator.w3.org/ to validate the HTML.
This highlighted one issue with '|' symbol used in the google fonts link:
 <link href="https://fonts.googleapis.com/css?family=Chango|Press+Start+2P&display=swap" rel="stylesheet">

### CSS validation
 I used https://jigsaw.w3.org/css-validator/validator to validate the CSS and there are no issues.

### JS validation

During the code development I developed flow charts included above. From this I have been able to develope a spreadsheet that deatails each feature / function and scenario to step through with the expected result. 

I made use of console log to display DEBUG messages to allow me to determine which part of the code was running and what the variable values were. This was a huge help in identifying issues and determining correct code execution.
Thourough validation in this way has given me complete confidence that my code is operating as intended.

I have tested the game functional

Jasmine JS testing

I planned to complete Jasmine Unit testing on some functions but as most functions interact with other functions there are few where this testing is useful. I have begun developing the scripts but encountered a few issues. I have simply run out of time. My main focus has been developing the game features and my Javascript knowledge. With additional time I would like to add this to expand my understanding and skillset. 

https://www.tutorialspoint.com/jasminejs 

## Different Devices

I used google chrome developer tools.

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).


In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X








## Attributes
rainbow back ground
https://www.bing.com/images/search?view=detailV2&id=B1E8ABF695AAFDB605DD9DBA1CE4AD6FC54C7E64&thid=OIP.i821QjwYywfIUEgeYb02iwHaEo&mediaurl=https%3A%2F%2Fwallpapersite.com%2Fimages%2Fwallpapers%2Fcolorful-1920x1200-rainbow-colors-dark-background-amoled-ios-11-9939.jpg&exph=1200&expw=1920&q=rainbow+black+background&selectedindex=143&ajaxhist=0&vt=0&eim=0
