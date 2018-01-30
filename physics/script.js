let showFPS = true;

const DENS = 0.1
const RAD = 1 / DENS;
const SIZE = RAD / Math.sqrt(2);

let rows, cols;
let grid = [];

const REJ = 30;
let act = [];
let ord = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  strokeWeight(RAD/2);

  cols = floor(width/SIZE);
  rows = floor(height/SIZE);
  for (let i = 0; i < cols*rows; i++) {
    grid.push(undefined);
    // grid[i] = undefined;
  }

  let p = createVector(width/2, height/2);
  let col = floor(p.x / SIZE);
  let row = floor(p.y / SIZE);
  grid[col + row * cols] = p;
  act.push(p);
  ord.push(p);
}

function draw() {
  background(0);
  // noLoop();

  // if (act.length > 0) {
  for (let tot = 0; tot < REJ && act.length > 0; tot++) {
    let randInd = floor(random(act.length));
    let p = act[randInd];
    let found = false;

    for (let i = 0; i < REJ; i++) {
      let q = p5.Vector.random2D();
      q.setMag(random(RAD, 2 * RAD));
      q.add(p);
      // stroke(128, 0, 0);
      // point(q.x, q.y);

      let col = floor(q.x / SIZE);
      let row = floor(q.y / SIZE);
      let ind = col + row * cols;

      if (col > -1 && row > -1 && col < cols && row < rows && !grid[ind]) {
        let qFits = true;
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            let ind_n = (col + k) + (row + l) * cols;
            let n = grid[ind_n];
            if (n) if (p5.Vector.dist(n, q) < RAD) qFits = false;
          }
        }
        if (qFits) {
          found = true;
          grid[ind] = q;
          act.push(q);
          ord.push(q);
          break;
        }
      }
    }
    if (!found) {
      act.splice(randInd, 1);
    }
  }

  for (i = 0; i < ord.length; i++) {
    // stroke(255);
    stroke(i % 360, 100, 100);
    point(ord[i].x, ord[i].y);
  }

  // for (p of grid) {
  //   if (p) {
  //     stroke(255);
  //     point(p.x, p.y);
  //   }
  // }

  for (p of act) {
    stroke(0, 0, 50);
    point(p.x, p.y);
  }

  if (showFPS) {
    noStroke();
    fill(255);
    text(floor(frameRate()), 10, 20);
    text(act.length, 10, 40);
  }
}

function mousePressed() {
  if (showFPS)
    showFPS = false
  else
    showFPS = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
