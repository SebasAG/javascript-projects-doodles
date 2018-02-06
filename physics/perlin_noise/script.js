const W = 20;
let cols, rows;
let zoff = 0;

function setup() {
  createCanvas(600, 600);
  cols = floor(width/W);
  rows = floor(height/W);
}

function draw() {
  background(0);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let r = noise(xoff, yoff, zoff);
      let v = p5.Vector.fromAngle(r*TWO_PI);

      stroke(255);
      push();
        translate(x*W, y*W);
        rotate(v.heading());
        line(0, 0, W, 0);
      pop();

      xoff += 0.1;
    }
    yoff += 0.1;
  }
  zoff += 0.01;

  // noStroke();
  // fill(255);
  // text(floor(frameRate()), 10, 20);
}
