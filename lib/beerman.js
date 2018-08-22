const MovingObject = require('./moving_object');

const DEFAULTS = {
  dir: [1, 0],
  vel: 2.5,
  radius: 18
};

class Beerman extends MovingObject {
  constructor(options) {
    options.dir = DEFAULTS.dir;
    options.vel = DEFAULTS.vel;
    options.radius = DEFAULTS.radius;
    super(options);
  }
}

module.exports = Beerman;