let grid = [];
let w = 12, gW, gH;
let x, y;

let dir;
const UP = 0,
      RIGHT = 1,
      DOWN = 2,
      LEFT = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 1);
  textFont('Courier New');
  textSize(w);
  fill(0, 255, 0);

  gW = floor(width/w);
  gH = floor(height/w);

  for (let i = 0; i < gW; i++) {
    grid.push([]);
    for (let j = 0; j < gH; j++) {
      grid[i].push(0);
    }
  }

  x = floor(gW/2);
  y = floor(gH/2);
  dir = UP;
}

function draw() {
  background(0);

  let st = grid[x][y]
  switch (st) {
    case 0:
      turnRight();
      break;
    default:
    case 1:
      turnLeft();
      break;
  }
  grid[x][y]++;
  grid[x][y] %= 2;
  moveForward();

  for (i = 0; i < gW; i++) {
    for (j = 0; j < gH; j++) {
      // fill(1-grid[i][j]);
      // noStroke();
      // rect(i*w, j*w, w, w);
      switch (grid[i][j]) {
        case 0:
          break;
        case 1:
          text('o', i*w, (j+1)*w);
          break;
        default:
      }
    }
  }

  // fill(1, 0, 0);
  // rect(x*w, y*w, w, w);

  // fill(0);
  // text(floor(frameCount), 10, 20);
}

function turnRight() {
  dir++;
  dir %= 4;
}

function turnLeft() {
  dir += 3;
  dir %= 4;
}

function moveForward() {
  switch (dir) {
    case UP:
      y--;
      break;
    case RIGHT:
      x++;
      break;
    case DOWN:
      y++;
      break;
    case LEFT:
      x--;
      break;
    default:
  }
  x += gW; x %= gW;
  y += gH; y %= gH;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
