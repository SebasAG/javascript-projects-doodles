let res = 24,
    cols, rows;
let grid = [],
    ngrid = [];
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0, 255, 0);
  // noStroke();
  textSize(res);
  // rectMode(CENTER);
  textAlign(CENTER);

  cols = floor(width/res);
  rows = floor(height/res);

  for (i = 0; i < cols; i++) {
    grid.push([]);
    for (j = 0; j < rows; j ++) {
      grid[i].push(floor(random(2)));
    }
  }
  for (i = 0; i < cols; i++) {
    ngrid.push([]);
    for (j = 0; j < rows; j ++) {
      ngrid[i].push(grid[i][j]);
    }
  }

  frameRate(10);
}

function draw() {
  background(0, 70);

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j ++) {
      let sum = countCells(grid, i, j);
      if (grid[i][j] == 0 && sum == 3) {
        ngrid[i][j] = 1;
      } else if (grid[i][j] == 1 && (sum < 2 || sum > 3)) {
        ngrid[i][j] = 0;
      }
    }
  }

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j ++) {
      let x = i * res, y = j * res;
      if (grid[i][j] == 1) {
        // rect(x, y, res-1, res-1);
        text(String.fromCharCode(0x16A0 + ((i * rows + j) % 89)), x+res/2, y+res);
      }
      grid[i][j] = ngrid[i][j];
    }
  }

  t += 1;
  if (t % 2000 == 0) {
    t = 0;
    for (i = 0; i < cols; i++) {
      grid.push([]);
      for (j = 0; j < rows; j ++) {
        grid[i][j] = floor(random(2));
      }
    }
  }
}

function countCells(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i != 0 || j != 0) {
        sum += grid[(x+i+cols)%cols][(y+j+rows)%rows];
      }
    }
  }
  return sum;
}
