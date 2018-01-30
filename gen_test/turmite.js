let grid = []; // 0,1
let w = 20, gW, gH;

let dir;
const N = 0,
      E = 1,
      S = 2,
      W = 3;
let x, y;

let st = 0; // 0,1,2
// {{{0,'N',2},{1,'S',1}},{{0,'E',0},{0,'S',0}},{{1,'W',1},{1,'N',2}}}
const RULE = [
  [[0,N,2], [1,S,1]],
  [[0,E,0], [0,S,0]],
  [[1,W,1], [1,N,2]],
];

const STR = "0123456789·"
const STATES = STR.length % 2 == 1 ? STR.length : STR.length - 1;

function setup() {
  createCanvas(400, 400);
  colorMode(RGB, 1);

  textFont('Courier New');
  textSize(w);
  fill(0, 1, 0);

  gW = floor(width/w);
  gH = floor(height/w);

  for (let i = 0; i < gW; i++) {
    grid.push([]);
    for (let j = 0; j < gH; j++) {
      grid[i].push(0);
    }
  }

  x = floor(gW/2);
  y = gH-1;//floor(gH/2);
  dir = N;
}

function draw() {
  background(0);

  let sq = grid[x][y],
      sqm = sq % 2;
  let nsq = RULE[st][sqm][0];
  dir     = RULE[st][sqm][1];
  st      = RULE[st][sqm][2];

  grid[x][y]++;
  if (grid[x][y] % 2 != nsq) grid[x][y] += STATES;
  grid[x][y] %= 2*STATES;
  moveForward();

  for (i = 0; i < gW; i++) {
    for (j = 0; j < gH; j++) {
      let g = grid[i][j];
      if (g != 0) {
        text(
          STR.charAt(g%STATES),
          i * w, (j + 1) * w
        );
      }
    }
  }

  // fill(1, 0, 0);
  // rect(x*w, y*w, w, w);

  // fill(1);
  // text(floor(frameCount), 10, 20);
}

function moveForward() {
  switch (dir) {
    case N:
      y--;
      break;
    case E:
      x++;
      break;
    case S:
      y++;
      break;
    case W:
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
