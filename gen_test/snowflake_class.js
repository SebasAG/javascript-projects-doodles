class Snowflake {
  constructor(sx, sy, img) {
    let x = sx || random(width),
        y = sy || random(-100, 0);
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.angle = random(TWO_PI);
    this.angV = randomGaussian()/50;

    this.img = img;
    this.r = constrain(randomSize()*20, 10, 100);
  }

  update() {
    this.vel.add(this.acc);
    if (this.vel.y > this.r * 0.2) this.vel.y = this.r * 0.2;

    this.pos.add(this.vel);
    if (this.pos.x < -this.r) this.pos.x += width + 2*this.r;
    if (this.pos.x > width + this.r) this.pos.x -= width + 2*this.r;

    this.acc.mult(0);
    this.angle += this.angV;

    if (this.pos.y > height + this.r) this.randomize();
  }

  render() {
    // stroke(255);
    // strokeWeight(this.r);
    // point(this.pos.x, this.pos.y);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.img, 0, 0, this.r, this.r);
    pop();
  }

  randomize() {
    let x = random(width),
        y = random(-100, 0);
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.angle = random(TWO_PI);
    this.angV = randomGaussian()/50;

    this.img = random(textures);
    this.r = constrain(randomSize()*20, 10, 100);
  }

  applyForce(force) {
    let f = force.copy();
    f.mult(this.r * 0.1);

    this.acc.add(f);
  }
}

function randomSize() {
  // while (true) {
  //   let r1 = random(), r2 = random();
  //   if (r2 > r1) return r1;
  // }

  // let r = randomGaussian();
  // return r*r;

  return -log(1-random());
}
