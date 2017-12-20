let X; // x pos of jumper
const R = 20; // radius of jumper
const G = 0.2; // gravity

let obsticles = [];
let jumper;
let score = 0;

var randomInt = function(range) {
  var mini = range[0];
  var maxi = range[1];
  return floor(random(mini, maxi));
}

setup = function() {
  let canv = createCanvas(700, 400);
  canv.parent("gameContainer");
  canv.id("game");
  background(51);
  angleMode(DEGREES);
  
  X = width/4;
  var y = height - R;
  
  jumper = new Jumper(X, y, R, G);
}

draw = function() {
  background(51);
  jumper.update();
  jumper.show();
  if (frameCount % 120 == 0) {
    var topOfOb1 = random(0, height/2);
    var topOfOb2 = random(topOfOb1+50, height);
    var ranges = [[0, 5], [topOfOb1, topOfOb1+50], [topOfOb2, topOfOb2+50], [height-5, height]];
    obsticles.push(new Obsticle(width, -2, ranges));
  }
  let collisionPts = jumper.nRadialPoints(8, false);
  for (var i = obsticles.length-1; i >= 0; i--) {
    var o = obsticles[i];
    o.update();
    o.show();
    if (o.pos.x < -o.w) {
      obsticles = obsticles.slice(1);
      score++;
    }
    for (pt of collisionPts) {
      if (o.pointWithin(pt)) {
        o.hit = true;
        score = 0;
        break;
      }
    }
  }
  fill('white');
  textSize(25);
  text(score, 30, 30);
}

keyTyped = function() {
  jumper.vel.y = -6;
}
