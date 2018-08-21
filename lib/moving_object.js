class MovingObject {
  constructor({ pos, dir, vel, radius, color }) {
    this.pos = pos;
    this.dir = dir;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.render = this.render.bind(this);
    this.move = this.move.bind(this);
  }

  move() {
    this.pos = [this.pos[0] + this.dir[0] * this.vel, this.pos[1] + this.dir[1] * this.vel];
    console.log(this.pos);
  }

  turn(dir) {
    this.dir = dir;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  wrap() {
    if (this.pos[0] === 0 && this.dir === [-1, 0]) {
      this.pos[0] === 800;
    } else if (this.pos[0] === 800 && this.dir === [1, 0]) {
      this.pos[0] === 0;
    } else if (this.pos[1] === 0 && this.dir === [-1, 0]) {
      this.pos[1] === 800;
    } else if (this.pos[1] === 800 && this.dir === [1, 0]) {
      this.pos[0] === 0;
    }
  }
}

export default MovingObject;