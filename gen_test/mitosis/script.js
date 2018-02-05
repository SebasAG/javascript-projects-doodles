let cells = [];

function setup() {
  createCanvas(600, 600);
  cells.push(new Cell());
}

function draw() {
  background(0);
  for (cell of cells) {
    cell.move();
    cell.show();
  }
}

function mousePressed() {
  for (let i = cells.length-1; i >= 0; i--) {
    if (cells[i].clicked()) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }
}
