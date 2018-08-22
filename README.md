## Beer-Man

### Overview

This rendition of Pac-Man, called Beer-Man, will be a browser-based game made with Javascript and HTML Canvas. The user will guide Beer-Man with the arrow keys to collect all beer on the map without colliding with any ghosts. The more beer he drinks, the slower he will become. Coffee power-ups will allow Beer-Man to gain a sobering boost of speed and wisdom, restoring his original velocity and gaining the ability to destroy ghosts for points. Each drinking and death event will trigger a sound effect with Web Audio API.

### MVP List
Users should be able to:
- [ ] Enjoy bug-free navigation of the map
- [ ] Hear drinking and dying sounds as those events unfold
- [ ] Start, pause, and reset the game at will
- [ ] Understand and achieve clear win/lose conditions
- [ ] View game instructions, scoring, and lives left at all times

### Wireframes

![Basic Layout](/game_layout.png)

Game grid should be centered. Simple instructions will be on the right. Pause and play will be on the bottom. A color wheel will be displayed at the beginning as a prompt to the user.

### Architecture and Technologies

This project will use the following:
* Vanilla JS for game logic
* HTML5 canvas for DOM manipulation and display
* Webpack to bundle the scripts
* Web Audio API for well-timed sound effects

Scripts: 
`beerman.js`: entry file
`ghost.js`: handle physics and basic logic decisions to chase Beerman
`player.js`: handle beerman player's physics
`game.js`: handle overall game mechanics
`game_view.js`: handle key listeners and canvas
`audio.js`: trigger sound effects on eating or dying

### Implementation Timeline
#### Over the weekend:
- [ ] Read up on WebAudioAPI
#### Day 1: 
- [ ] Setup modules, webpack, entry file
- [ ] Write entry file skeleton
- [ ] Create board
- [ ] Solidify Beer-Man physics (moving, turning)
#### Day 2:
- [ ] Work on ghost AI
- [ ] Fill board with beer and coffee
- [ ] Implement collisions logic for Beer-Man, ghosts, drinks, and walls
- [ ] Update board with every drinking/colliding event
#### Day 3:
- [ ] Finish ghost AI
- [ ] Implement win/lose conditions
- [ ] Build start and stop functionality
- [ ] Ensure sound is properly synced through Web Audio API
#### Day 4: 
- [ ] Make sure user can both win and lose
- [ ] Make sure user can keep playing more rounds if so desired
- [ ] Style canvas
- [ ] Setup scoreboard

