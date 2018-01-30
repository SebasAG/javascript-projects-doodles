let symSize = 30,
    streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  textSize(symSize);

  let x = 0;
  for (var i = 0; i <= width/symSize; i++) {
    let stream = new Stream();
    stream.genSymbols(x, random(-1000, 0));
    streams.push(stream);

    x += symSize;
  }
}

function draw() {
  background(0, 100);
  for (stream of streams) stream.render();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight)
}

function Symbol(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.value;
  this.switchInterval = floor(random(5, 30));

  this.setSymbol = () => {
    if (frameCount % this.switchInterval == 0)
      this.value = String.fromCharCode(0x30A0 + floor(random(0, 96)));
  };

  // this.render = () => {
  //   fill(0, 255, 70);
  //   text(this.value, this.x, this.y);
  //   this.rain();
  //   this.setSymbol();
  // }

  this.rain = () => this.y = this.y >= height + symSize ? 0 : this.y + this.speed;
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = floor(random(2, height/symSize - 5));
  this.speed = random(5, 20);

  this.genSymbols = (x, y) => {
    for (var i = 0; i <= this.totalSymbols; i++) {
      let symbol = new Symbol(x, y, this.speed);
      symbol.setSymbol();
      this.symbols.push(symbol);

      y -= symSize;
    }
  };

  this.render = () => {
    for (symbol of this.symbols) {
      fill(0, 255, 70);
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setSymbol();
    }
  };
}
