let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine,
    world;

let boxes = [];
let ground;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  engine = Engine.create();
  world  = engine.world;
  Engine.run(engine);

  ground = Bodies.rectangle(
    width/2, height - 50, width, 100,
    {
      isStatic: true
    }
  );
  World.add(world, ground);
}

function draw() {
  background(51);

  for (sbox of boxes) {
    sbox.show();
  }

  noStroke();
  fill(150);
  rect(ground.position.x, ground.position.y, width, 100);
}

function mousePressed() {
  boxes.push(new Box(mouseX, mouseY, 20, 20));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}


function Box(x, y, w, h) {
  this.body = Bodies.rectangle(x, y, w, h, {
    friction: 0.3,
    restitution: 0.6,
  });
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = () => {
    let pos = this.body.position;
    let ang = this.body.angle;

    push();
      fill(255);
      stroke(170);
      strokeWeight(2);
      translate(pos.x, pos.y);
      rotate(this.body.angle);
      rect(0, 0, this.w, this.h);
    pop();
  }
}
