## Beer-Man

[Live Site](https://schen13.github.io/Beer-Man/)

### Overview

This rendition of Pac-Man, called Beer-Man, is a browser-based game made with only JavaScript and HTML Canvas. The user will guide Beer-Man with either WASD or arrow keys to collect all beer on the map without colliding with any ghosts. The more beer he drinks, the slower he will become. Coffee power-ups will allow Beer-Man to gain a sobering boost of speed and wisdom, restoring his original velocity and gaining the ability to destroy ghosts for points. Can he get his fill before the ghosts come for him? That's up to you!

### Features
Users should be able to:
- [x] Enjoy bug-free navigation of the map
- [x] Start, pause, and reset the game at will
- [x] Understand and achieve clear win/lose conditions
- [x] View game instructions, scoring, and lives left at all times

### Gameplay
![Gameplay](/images/gameplay.gif)

#### Buffered Keyboard Input
```js
move(walls) {
    if (this.queuedDir && !this.willCollide(this.queuedDir, walls, true)) {
      this.dir = this.queuedDir;
      this.queuedDir = undefined;
    }
    if (!this.willCollide(this.dir, walls, false)) {
      this.pos = [this.pos[0] + this.dir[0] * this.vel, this.pos[1] + this.dir[1] * this.vel];
    }
    this.wrap();
  }

  turn(dir, walls) {
    if (!this.willCollide(dir, walls, true)) {
      this.dir = dir;
      this.queuedDir = undefined;
    } else {
      this.queuedDir = dir;
    }
  }
```
Beer-Man will store the most recent direction given, such that moving and turning is smooth. The player can buffer the next direction and watch as Beer-Man will follow that command once it can make that turn.

#### Bug-Free Key Handlers
```js
const keyBinds = {
  "W": [0, -1],
  "A": [-1, 0],
  "S": [0, 1],
  "D": [1, 0],
  "ARROWUP": [0, -1],
  "ARROWLEFT": [-1, 0],
  "ARROWDOWN": [0, 1],
  "ARROWRIGHT": [1, 0]
};

bindKeyHandlers(e) {
  const key = e.key.toUpperCase();
  if (key === " ") {
    if (this.isPaused) {
      this.isPaused = false;
      this.intervalID = setInterval(() => this.step(), 20);

    } else {
      window.clearInterval(this.intervalID);
      this.isPaused = true;
    }
  }
  if (keyBinds[key]) {
    this.game.chars[0].turn(keyBinds[key], this.board.walls);
  }
  if (key === "Y" && this.restartBuffer > 0 && !this.game.chars[0].dying) {
    window.clearInterval(this.intervalID);
    this.ctx.clearRect(0, 0, CANVAS_X, CANVAS_Y);
    this.restarted = true;
    this.restartBuffer = 0;
    this.start();
  }
}
```
The event listener checks for spacebar (resume and pause), WASD/arrow keys (turning), and Y (game restart, disabled during async calls).


### Architecture and Technologies

This project will use the following:
* Vanilla JS for game logic
* HTML5 canvas for DOM manipulation and display
* Webpack to bundle the scripts

Scripts: 
* `entry.js`: entry file
* `board.js`: renders board and beverages
* `moving_object.js`: basic moving and collision detection inherited by Beer-Man and ghosts
* `ghost.js`: handle ghost drawing and AI targeting
* `beerman.js`: handle Beer-Man drawing and dying animation
* `game.js`: handle overall game mechanics, including moving, collision events, and resetting
* `game_view.js`: handle key listeners, game animation, and display

### Future Features
* Improve ghost AI so it doesn't get stuck at corners
* Implement sound effects (have the files, code not working)
* Add more levels