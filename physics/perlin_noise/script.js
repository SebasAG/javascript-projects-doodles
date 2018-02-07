const W = 20;
let cols, rows;
let zoff = 0;

let parts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width/W);
  rows = floor(height/W);

  for (let i = 0; i < 100; i++)
    parts.push(new Particle());
}

function draw() {
  // background(0, 10);
  // let yoff = 0;
  // for (let y = 0; y < rows; y++) {
  //   let xoff = 0;
  //   for (let x = 0; x < cols; x++) {
  //     let r = noise(xoff, yoff, zoff);
  //     let v = p5.Vector.fromAngle(r*TWO_PI);
  //
  //     stroke(50);
  //     push();
  //       translate(x*W+W/2, y*W+W/2);
  //       rotate(v.heading());
  //       strokeWeight(4);
  //       line(0, 0, W, 0);
  //     pop();
  //
  //     xoff += 0.1;
  //   }
  //   yoff += 0.1;
  // }
  zoff += 0.02;

  for (part of parts) {
    let r = noise(part.pos.x * 0.01, part.pos.y * 0.01, zoff);
    part.update(p5.Vector.fromAngle(r*TWO_PI));
    part.show();
  }

  // noStroke();
  // fill(255);
  // text(floor(frameRate()), 10, 20);
}
