## Beer-Man

### Overview

This rendition of Pac-Man, called Beer-Man, is a browser-based game made with only JavaScript and HTML Canvas. The user will guide Beer-Man with either WASD or arrow keys to collect all beer on the map without colliding with any ghosts. The more beer he drinks, the slower he will become. Coffee power-ups will allow Beer-Man to gain a sobering boost of speed and wisdom, restoring his original velocity and gaining the ability to destroy ghosts for points. Can he get his fill before the ghosts come for him? That's up to you!

### MVP List
Users should be able to:
- [ ] Enjoy bug-free navigation of the map
- [ ] Start, pause, and reset the game at will
- [ ] Understand and achieve clear win/lose conditions
- [ ] View game instructions, scoring, and lives left at all times
- [ ] ~~Hear drinking and dying sounds as those events unfold~~

### Wireframes

![Basic Layout](/images/wireframe.png)

Game grid should be centered. Simple instructions will be on the left. Other UI elements are on the right.

### Architecture and Technologies

This project will use the following:
* Vanilla JS for game logic
* HTML5 canvas for DOM manipulation and display
* Webpack to bundle the scripts
* ~~Web Audio API for well-timed sound effects~~

Scripts: 
* `entry.js`: entry file
* `board.js`: renders board and beverages
* `moving_object.js`: basic moving and collision detection inherited by Beer-Man and ghosts
* `ghost.js`: handle ghost drawing and AI targeting
* `beerman.js`: handle Beer-Man drawing and dying animation
* `game.js`: handle overall game mechanics, including moving, collision events, and resetting
* `game_view.js`: handle key listeners, game animation, and display
* `audio.js`: trigger sound effects on eating or dying

### Implementation Timeline
#### Over the weekend:
- [x] Read up on WebAudioAPI
#### Day 1: 
- [x] Setup modules, webpack, entry file
- [x] Write entry file skeleton
- [x] Create board
- [x] Solidify Beer-Man physics (moving, turning)
#### Day 2:
- [x] Work on ghost AI
- [x] Fill board with beer and coffee
- [x] Implement collisions logic for Beer-Man, ghosts, drinks, and walls
- [x] Update board with every drinking/colliding event
#### Day 3:
- [x] Finish ghost AI
- [x] Implement win/lose conditions
- [x] Build start and stop functionality
- [ ] Ensure sound is properly synced through Web Audio API
#### Day 4: 
- [x] Make sure user can both win and lose
- [x] Make sure user can keep playing more rounds if so desired
- [x] Style canvas
- [x] Setup scoreboard

