const R = 1,
      L = -1;
const RULE = [
  [[1,R,1], [2,L,0]],
  [[2,L,0], [2,R,1]],
  [[1,L,0], [0,R,0]],
];
const str = '012345678';

let g = new Array(16);
let x;
let st = 0;

let p;

function setup() {
  noCanvas();
  p = createP()
  p.style('font-family', '"Courier New"');
  p.style('font-size', 20 + 'px');

  for (let i = 0; i < g.length; i++) {
    g[i] = 0;
  }

  x = floor(g.length)/2;
}

function draw() {
  let s = g[x];
  let ng  = RULE[s][st][0];
  let nx  = RULE[s][st][1];
  let nst = RULE[s][st][2];
  g[x] = ng;
  x += nx + g.length; x %= g.length;
  st = nst;

  let t = '';
  for (let i = 0; i < g.length; i++) {
    t = t.concat(str.charAt(g[i]));
  }
  p.html(t);
}
