

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

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    document.addEventListener('keydown', this.bindKeyHandlers.bind(this));
  }

  start() {
    setInterval(() => {
      this.game.moveObjects();
      this.game.render(this.ctx);
    }, 20);
  }

  bindKeyHandlers(e) {
    const key = e.key.toUpperCase();
    if (keyBinds[key]) {
      this.game.objects[0].turn(keyBinds[key]);
    }
  }
}

export default GameView;