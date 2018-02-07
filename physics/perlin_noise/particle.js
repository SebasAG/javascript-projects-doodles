function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector();

  this.update = (vel) => {
    this.pos.add(vel);
    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }

  this.show = () => {
    stroke(255, 10);
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  }
}
