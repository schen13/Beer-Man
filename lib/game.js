const Beerman = require('./beerman');

class Game {

  constructor(ctx) {
    const beerman = new Beerman({ pos: [400, 450], color: "#FFFF00" });
    this.objects = [beerman];
    this.render(ctx);
  }

  render(ctx) {
    this.objects.forEach(object => object.render(ctx));
  }

  moveObjects(walls) {
    this.objects.forEach(object => {
      object.move(walls);
    });
  }
}

module.exports = Game;