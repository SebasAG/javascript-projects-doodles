let tree = [];
let r = 1;
let walks = [];
let dens = 0.002;
let showFPS = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  tree.push(createVector(width/2, height/2));
  let n = width*height*dens;
  console.log(n);
  for (let i = 0; i < n; i++)
    walks.push(createVector(
      randomGaussian(width/2, width/5), randomGaussian(height/2, height/5)
    ));
}

function draw() {
  background(0);

  strokeWeight(2*r);
  stroke(75);
  for (let i = 0; i < walks.length; i++) {
    let v = p5.Vector.random2D();
    walks[i].add(v.setMag(2));
    walks[i].x = constrain(walks[i].x, 0, width);
    walks[i].y = constrain(walks[i].y, 0, height);

    point(walks[i].x, walks[i].y);

    for (particle of tree) {
      let d = p5.Vector.dist(walks[i], particle);
      if (d < 2*r) {
        tree.push(walks[i]);
        // walks[i] = createVector(
        //   randomGaussian(width/2, width/5), randomGaussian(height/2, height/5)
        // );
        walks.splice(i, 1);
        break;
      }
    }
  }

  stroke(0, 128, 70);
  for (particle of tree) point(particle.x, particle.y);

  if (showFPS) {
    noStroke();
    fill(255);
    text(floor(frameRate()), 10, 20);
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
