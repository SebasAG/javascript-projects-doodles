let angle = 0;
let graphics;

function setup() {
  createCanvas(400, 400, WEBGL);

  graphics = createGraphics(300, 300);
  graphics.background(0);
  graphics.fill(255);
  graphics.textAlign(CENTER);
  graphics.textSize(64);
  graphics.text("love", 150, 150);
}

function draw() {
  background(0);
  // graphics.background(0);

  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, 1);

  // rotateX(angle);
  // rotateY(angle * 1.3);
  // rotateZ(angle * 0.7);

  texture(graphics);
  // box(100);
  plane(300, 300);

  angle += 0.03;
}
