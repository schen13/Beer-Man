const Beerman = require('./beerman');

class Game {

  constructor(ctx, board) {
    const beerman = new Beerman({ pos: [400, 450], color: "#FFFF00", board });
    this.objects = [beerman];
    this.render(ctx);
  }

  render(ctx) {
    this.objects.forEach(object => object.render(ctx));
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