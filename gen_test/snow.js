let snow = [],
    gravity,
    sheet,
    textures = [],
    xOff = 0;

function preload() {
  sheet = loadImage("flakes/f32.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.5);

  for (let x = 0; x < sheet.width; x += 32) {
    for (let y = 0; y < sheet.height; y += 32) {
      let img = sheet.get(x, y, 32, 32);
      textures.push(img);
    }
  }

  for (var i = 0; i < 200; i++) {
    let x = random(width),
        y = random(-height, 0),
        design = random(textures);
    snow.push(new Snowflake(x, y, design));
  }
}

function draw() {
  background(0);
  // let wx = map(mouseX, 0, width, -0.01, 0.01),
  //     windM = createVector(wx, 0);
  let nx = map(noise(xOff), 0, 1, -0.05, 0.05),
      windN = createVector(nx, 0);
  xOff += 0.1;

  for (flake of snow) {
    flake.applyForce(gravity);
    // flake.applyForce(windM);
    flake.applyForce(windN);
    flake.update();
    flake.render();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
