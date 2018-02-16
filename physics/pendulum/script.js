let r1 = 100, r2 = 100;
let m1 = 10, m2 = 10;
let th1, th2;
let om1, om2;

let trace;

function setup() {
  createCanvas(600, 600);
  th1 = random(TWO_PI);
  th2 = random(TWO_PI);

  trace = createGraphics(width, height);
  trace.background(0);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(2);
  fill(255);

  let x1 = r1 * sin(th1), y1 = r1 * cos(th1);
  let x2 = x1 + r2 * sin(th2), y2 = y1 + r2 * cos(th2);

  trace.stroke(150);
  trace.strokeWeight(2);
  trace.point(width/2 + x2, height/2 +y2);
  image(trace, 0, 0);

  translate(width/2, height/2);
  line(0, 0, x1, y1);
  ellipse(x1, y1, m1, m1);
  line(x1, y1, x2, y2);
  ellipse(x2, y2, m2, m2);

  th1 += 0.1;
  th2 -= 0.2;
}

