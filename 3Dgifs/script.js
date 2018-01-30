let a = 0;
const w = 14,
      N = 8,
      offs = 0.07;

function setup() {
  createCanvas(400, 400, WEBGL);
  ambientMaterial(255, 0, 0);
  ortho(-width/2, width/2, height/2, -height/2, 0, 1000);
  rectMode(CENTER);
}

function draw() {
  // background(100);

  rotateX(-QUARTER_PI);
  rotateY(QUARTER_PI);

  // pointLight(
  //   79, 105, 105,
  //   -100, 100, 0
  // );
  pointLight(
    255, 255, 255,
    100, -100, 0
  );

  for (i = -N; i <= N; i++) {
    for (j = -N; j <= N; j++) {
      let h = floor(map(sin(a + (i*i + j*j) * offs), -1, 1, 50, 200)),
          x = i*w,
          z = j*w;
      push();
        translate(x, 0, z);
        box(w, h, w);
      pop();
    }
  }

  a -= 0.05;
}
