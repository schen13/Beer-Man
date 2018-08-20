## Pacman

### Overview

This rendition of Pacman will be a browser-based game made with Javascript and HTML Canvas. The user will guide Pacman with the arrow keys to collect all food on the map without colliding with any ghosts. Power-ups will allow Pacman to temporarily be able to eat the ghosts for points and remove them from play for a short period of time. Each eating and death event will trigger a sound effect.

### MVP List
Users should be able to:
- [ ] Pick a custom color Pacman
- [ ] Enjoy bug-free navigation of the map
- [ ] Hear eating and dying sounds as those events unfold
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
`pacman.js`: handle physics and user arrow input
`ghost.js`: handle basic logic decisions to chase pacman
`audio.js`: trigger sound effects on eating or dying

### Implementation Timeline
#### Over the weekend:
- [ ] Read up on WebAudioAPI
#### Day 1: 
- [ ] Setup modules, webpack, entry file
- [ ] Write entry file skeleton
- [ ] Create board
- [ ] Implement color wheel picker for Pacman
- [ ] Ensure sound is properly synced through Web Audio API
- [ ] Solidify Pacman physics (moving, turning)
#### Day 2:
- [ ] Work on ghost physics
- [ ] Render Pacman/ghost collisions and sounds
- [ ] Update board with every eating/colliding event
#### Day 3:
- [ ] Implement win/lose conditions
- [ ] Build start and stop functionality
#### Day 4: 
- [ ] Make sure user can both win and lose
- [ ] Make sure user can keep playing more rounds if so desired
- [ ] Style canvas
- [ ] Setup scoreboard
