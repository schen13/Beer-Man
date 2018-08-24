const Beerman = require('./beerman');
const Ghost = require('./ghost');
class Game {

  constructor(ctx, board) {
    const beerman = new Beerman({ color: "#FFFF00", board });
    const blinky = new Ghost({ pos: [300, 300], color: "#FF0000", board, beerman, name: "blinky" });
    const pinky = new Ghost({ pos: [350, 300], color: "#FF69B4", board, beerman, name: "pinky" });
    const inky = new Ghost({ pos: [400, 300], color: "#00FFFF", board, beerman, name: "inky", blinky: blinky });
    const clyde = new Ghost({ pos: [450, 300], color: "#FFA500", board, beerman, name: "clyde" });
    this.board = board;
    this.objects = [beerman, blinky, pinky, inky, clyde];
    this.gameOver = false;
    this.won = false;
    this.render(ctx);
  }

  render(ctx) {
    let empty = false;
    let caught = false;
    this.board.render(ctx);
    if (this.board.isEmpty()) {
      empty = true;
    }
    const beermanPos = this.objects[0].pos;
    this.objects.forEach((object, idx) => {
      object.render(ctx);
      if (idx >= 1 && this.checkCollision(object.pos, beermanPos)) {
        if (this.objects[0].poweredUp) {
          object.die(ctx);
          this.objects[0].score += 1000;
        } else {
          caught = true;
          this.objects[0].die(ctx);
        }
      }
    });
    this.won = empty;
    this.gameOver = caught;
  }

  checkCollision(pos1, pos2) {
    return ((Math.abs(pos1[0] - pos2[0]) <= 2.5) && Math.abs(pos1[1] - pos2[1]) <= 2.5);
  }

  moveObjects(walls, tiles) {
    this.objects.forEach((object, idx) => {
      if (idx === 0) {
        object.drink();
      }
      object.move(walls, tiles);
    });
  }
}

module.exports = Game;