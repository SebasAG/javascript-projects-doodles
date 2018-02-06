let dots = [];
let n = 0;
const a = 180*(Math.sqrt(5)-1);
const r = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  background(0);

  let d = r * sqrt(n), t = n * a;
  let x = d * cos(t), y = d * sin(t);
  if (x < width/2 && x > -width/2 && y < height/2 && y > -height/2) {
    dots.push(createVector(d*cos(t), d*sin(t)));
  }

  translate(width/2, height/2);
  for (p of dots) {
    ellipse(p.x, p.y, r/2, r/2);
  }

  n++
}
