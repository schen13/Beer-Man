import Beerman from './beerman';

class Game {

  constructor(ctx) {
    const beerman = new Beerman({ pos: [400, 400], color: "#FFFF00" });
    this.objects = [beerman];
    this.render(ctx);
  }

  render(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.objects.forEach(object => object.render(ctx));
  }

  moveObjects() {
    this.objects.forEach(object => {
      object.move();
      object.wrap();
    });
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 800;

export default Game;