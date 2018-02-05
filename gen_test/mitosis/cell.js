function Cell(pos, r, c) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height));
  }
  this.r = r || 60;
  this.c = c || color(floor(random(100, 255)), floor(random(100,255)), 0, 100);

  this.move = () => {
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
  }

  this.clicked = () => {
    return (dist(this.pos.x, this.pos.y, mouseX, mouseY) < this.r)
  }

  this.mitosis = () => {
    // let offset = p5.Vector.random2D();
    return new Cell(this.pos, this.r/sqrt(2), this.c);
  }

  this.show = () => {
    noStroke();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}
