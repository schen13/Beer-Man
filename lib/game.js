const Beerman = require('./beerman');
const Ghost = require('./ghost');
class Game {

  constructor(ctx, board) {
    const beerman = new Beerman({ color: "#FFFF00", board });
    const ghost = new Ghost({ color: "#FF0000", board, beerman });
    this.board = board;
    this.objects = [beerman, ghost];
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
      if (idx >= 1 && this.checkPosEquality(object.pos, beermanPos)) {
        caught = true;
        this.objects[0].die(ctx);
      }
    });
    this.won = empty;
    this.gameOver = caught;
  }

  checkPosEquality(pos1, pos2) {
    return (pos1[0] === pos2[0] && pos1[1] === pos2[1]);
  }

  moveObjects(walls) {
    this.objects.forEach((object, idx) => {
      if (idx === 0) {
        object.drink();
      }
      object.move(walls);
    });
  }
}

module.exports = Game;