const Beerman = require('./beerman');
const Ghost = require('./ghost');
const DEFAULTS = {
  bmanVel: 4,
  ghostVel: 2,
  gridSize: 40,
  wallSize: 4,
  lives: 2,
  bmanDir: [1, 0],
  ghostDir: [-1, 0]
};

class Game {

  constructor(ctx, board) {
    this.defaultCharPos = [[320, 360], [240, 240], [280, 240], [320, 240], [360, 240]];
    const beerman = new Beerman({ pos: this.defaultCharPos[0], color: "#FFFF00", board });
    const blinky = new Ghost({ pos: this.defaultCharPos[1], color: "#FF0000", board, beerman, name: "blinky" });
    const pinky = new Ghost({ pos: this.defaultCharPos[2], color: "#FF69B4", board, beerman, name: "pinky" });
    const inky = new Ghost({ pos: this.defaultCharPos[3], color: "#00FFFF", board, beerman, name: "inky", blinky: blinky });
    const clyde = new Ghost({ pos: this.defaultCharPos[4], color: "#FFA500", board, beerman, name: "clyde" });
    this.ctx = ctx;
    this.board = board;
    this.chars = [beerman, blinky, pinky, inky, clyde];
    this.gameOver = false;
    this.won = false;
    this.score = 0;
    this.powerTimer = 0;
    this.lives = DEFAULTS.lives;
    this.lostLife = false;
    this.render(ctx);
  }

  render(ctx) {
    this.ctx.textAlign = "left";
    this.board.render(ctx);
    const beermanPos = this.chars[0].pos;
    this.chars.forEach((char, idx) => {
      char.render(ctx);
      if (idx >= 1 && this.checkCollision(char.pos, beermanPos)) {
        if (this.chars[0].poweredUp) {
          char.die(ctx);
          this.score += 1000;
        } else {
          this.lives -= 1;
          this.chars[0].die(ctx);
          this.lostLife = true;
        }
      }
    });
    this.won = this.board.isEmpty();
    this.gameOver = (this.lives === 0);
  }

  checkCollision(pos1, pos2) {
    return ((Math.abs(pos1[0] - pos2[0]) <= 2) && Math.abs(pos1[1] - pos2[1]) <= 2);
  }

  moveChars(walls) {
    this.chars.forEach((char, idx) => {
      if (idx === 0) {
        this.bmanDrink();
      }
      char.move(walls);
    });
  }

  bmanDrink() {
    const bman = this.chars[0];
    if (bman.pos[0] % DEFAULTS.gridSize === 0 && bman.pos[0] % DEFAULTS.gridSize === 0) {
      const row = Math.floor(bman.pos[1] / DEFAULTS.gridSize);
      const col = Math.floor(bman.pos[0] / DEFAULTS.gridSize);
      if (this.board.drinkLocations[row][col] === 1) {
        this.board.removeDrink(Math.floor(bman.pos[1] / DEFAULTS.gridSize), Math.floor(bman.pos[0] / DEFAULTS.gridSize));
        bman.numBeers += bman.poweredUp ? 0.5 : 1;
        bman.vel = DEFAULTS.bmanVel * Math.pow((1 / 2), (Math.floor(bman.numBeers / 20)));
        if (bman.vel < DEFAULTS.bmanVel && bman.color !== "green") {
          bman.color = "green";
        }
        this.score += 100;
      } else if (this.board.drinkLocations[row][col] === 2) {
        this.board.removeDrink(Math.floor(bman.pos[1] / DEFAULTS.gridSize), Math.floor(bman.pos[0] / DEFAULTS.gridSize));
        bman.pos = [Math.floor(bman.pos[0] / DEFAULTS.wallSize) * DEFAULTS.wallSize, Math.floor(bman.pos[1] / DEFAULTS.wallSize) * DEFAULTS.wallSize];
        bman.numBeers = 0;
        bman.vel = DEFAULTS.bmanVel;
        bman.color = "yellow";
        bman.poweredUp = true;
        window.clearTimeout(this.powerTimer);
        this.powerTimer = setTimeout(() => {
          bman.poweredUp = false;
        }, 7000);
        this.score += 500;
      }
    }
  }

  resetChars() {
    this.chars[0].openMouth = true;
    this.chars[0].dying = false;
    this.chars.forEach((char, idx) => {
      char.pos = this.defaultCharPos[idx];
      if (idx === 0) {
        char.dir = DEFAULTS.bmanDir;
        char.vel = DEFAULTS.bmanVel;
        char.numBeers = 0;
        char.color = "yellow";
      } else {
        char.dir = DEFAULTS.ghostDir;
        char.vel = DEFAULTS.ghostVel;
        char.isDead = false;
      }
    });
  }

  resetGame() {
    this.resetChars();
    this.score = 0;
    this.lives = DEFAULTS.lives;
    this.gameOver = false;
    this.won = false;
  }

  // initializeAudio() {
  //   this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  //   const bufferLoader = new BufferLoader(
  //     this.audioContext,
  //     [
  //       '../audio/pacman_beginning.wav',
  //       '../audio/pacman_chomp.wav',
  //       '../audio/pacman_eatfruit.wav',
  //       '../audio/pacman_eatghost.wav',
  //       '../audio/pacman_death.wav'
  //     ],
  //     this.finishedLoading
  //   );
  //   bufferLoader.load();
  // }
}
// finishedLoading(bufferList) {
//   bufferList.forEach(buffer => {
//     let source = this.audioContext.createBufferSource();
//     source.buffer = buffer;
//     source.connect(this.audioContext.destination);
//     this.sources.push(source);
//   });
// }

// class BufferLoader {
//   constructor(context, urlList, callback) {
//     this.context = context;
//     this.urlList = urlList;
//     this.onload = callback;
//     this.bufferList = new Array();
//     this.loadCount = 0;
//   }

//   loadBuffer(url, index) {
//     // Load buffer asynchronously
//     const request = new XMLHttpRequest();
//     request.open("GET", url, true);
//     request.responseType = "arraybuffer";

//     const loader = this;

//     request.onload = () => {
//       // Asynchronously decode the audio file data in request.response
//       loader.context.decodeAudioData(
//         request.response,
//         (buffer) => {
//           if (!buffer) {
//             alert('error decoding file data: ' + url);
//             return;
//           }
//           loader.bufferList[index] = buffer;
//           if (++loader.loadCount === loader.urlList.length)
//             loader.onload(loader.bufferList);
//         },
//         (error) => {
//           console.error('decodeAudioData error', error);
//         }
//       );
//     };

//     request.onerror = () => alert('BufferLoader: XHR error');
//     request.send();
//   }

//   load() {
//     for (let i = 0; i < this.urlList.length; i++) {
//       this.loadBuffer(this.urlList[i], i);
//     }
//   }

module.exports = Game;