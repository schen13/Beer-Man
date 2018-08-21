import MovingObject from './moving_object';

const DEFAULTS = {
  dir: [1, 0],
  vel: 5,
  radius: 20
};

class Beerman extends MovingObject {
  constructor(options) {
    options.dir = DEFAULTS.dir;
    options.vel = DEFAULTS.vel;
    options.radius = DEFAULTS.radius;
    super(options);
  }
}

export default Beerman;