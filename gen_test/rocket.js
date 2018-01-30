// let scrib = new Scribble();

let dt = 1,
    f = 0.5,
    mutRate = 0.01,
    popl,
    popsize = 100;

let lifespan = 400,
    count = 0,
    Tcount = 0;

let distW = 1,
    timeW = 10;

let target,
    rad = 10;

let obst,
    orad = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 1);
  textSize(20);
  noStroke();

  popl = new Population();
  target = createVector(width/2, 200);
  obst = createVector(width/2, height/2);
}

function draw() {
  background(0, 100);
  ellipse(target.x, target.y, 2*rad, 2*rad);
  push();
  fill(1, 0, 0);
  ellipse(obst.x, obst.y, 2*orad, 2*orad);
  pop();

  popl.run();

  count++;
  if (count == lifespan) {
    popl.eval();
    popl.selection();
    count = 0;
    Tcount++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function Rocket(dna) {
  this.pos = createVector(width/2, height-10);
  this.vel = createVector();
  this.acc = createVector();

  this.fitness = 0;
  if (dna) this.dna = dna
  else this.dna = new DNA();

  this.completed = false;
  this.goal = false;
  this.compTime = lifespan;

  this.string = String.fromCharCode(0x30A0 + floor(random(0, 96)));

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.applyForce(this.dna.genes[count]);
    let d = dist(
      this.pos.x, this.pos.y,
      target.x, target.y
    )

    if (!this.completed) {
      if (d <= rad) {
        this.completed = true;
        this.goal = true;
        this.compTime = count;
        // this.pos = target.copy();
      } else if (this.crashed()) {
        this.completed = true;
      } else {
        this.vel.add(p5.Vector.mult(this.acc, f*dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.mult(0);
      }
    }
  }

  this.crashed = function() {
    let od = dist(
      this.pos.x, this.pos.y,
      obst.x, obst.y
    )

    return od <= orad || this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height;
  }

  this.show = function() {
    let a = map(this.vel.heading(), -PI, PI, 0, 1),
        v = this.vel.mag(),
        d = v/(1 + abs(v));
    push();
      fill(a, 1-a, d);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      // triangle(8, 0, -8, 2, -8, -2);
      text(this.string, 0, 0);
    pop();
  }

  this.calcFitness = function() {
    let d = dist(
      this.pos.x, this.pos.y,
      target.x, target.y
    )
    if (d > width) d = width;

    this.fitness += map(d, 0, width, distW, 0);
    let ft = map(this.compTime, 0, lifespan, 1, 0);
    this.fitness += ft*ft*timeW;
    if (this.completed) {
      if(this.goal) this.fitness *= 10
      else this.fitness /= 10;
    }
  }
}

function Population() {
  this.rockets = [];
  this.mPoll = []
  for (var i = 0; i < popsize; i++) {
    this.rockets.push(new Rocket());
  }

  this.run = function() {
    for (var i = 0; i < popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

  this.eval = function() {
    let maxFit = 0,
        minTime = lifespan,
        finC = 0;
    for (var i = 0; i < popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxFit) maxFit = this.rockets[i].fitness;
      if (this.rockets[i].compTime < minTime) minTime = this.rockets[i].compTime;
      if (this.rockets[i].goal) finC++;
    }

    this.mPool = [];
    for (var i = 0; i < popsize; i++) {
      let n = map(this.rockets[i].fitness, 0, maxFit, 0, 100);
      // console.log(n);
      for (var j = 0; j < n; j++) {
        this.mPool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    let newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      let dnaA = random(this.mPool).dna,
          dnaB = random(this.mPool).dna;

      let newDNA = dnaA.crossover(dnaB);
      newDNA.mutate();

      newRockets.push(new Rocket(newDNA));
    }

    this.rockets = newRockets;
  }
}

function DNA(genes) {
  if (genes) this.genes = genes
  else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      this.genes.push(p5.Vector.random2D());
      // this.genes[i].setMag(0.1);
    }
  }

  this.crossover = function(partner) {
    let newGenes = [],
        mid = floor(random(this.genes.length));

    for (var i = 0; i < this.genes.length; i++) {
      if (i > mid) newGenes.push(this.genes[i])
      else newGenes.push(partner.genes[i]);
    }

    return new DNA(newGenes);
  }

  this.mutate = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random() < mutRate) this.genes[i] = p5.Vector.random2D();
    }
  }
}
