const WIDTH = 500;
const HEIGHT = 500;
const P_SIZE = WIDTH * 0.7;
const B_SIZE = 20;
const ROT = 3;
let CENTERP;
const SPEED = 2;
const STROKE = 10;
const BOUNCE_RAD = 60;
const debug = false;

let player;
let ball;
let score = 0;
let bouncepoint;

setup = function() {
  let canv = createCanvas(WIDTH, HEIGHT);
  canv.parent("gameContainer");
  canv.id("game");
  background(51);
  angleMode(DEGREES);
  CENTERP = createVector(WIDTH/2, HEIGHT/2);
  player = new Circle(CENTERP.x, CENTERP.y, P_SIZE, 30);
  let v = p5.Vector.random2D().mult(SPEED);
  ball = new Ball(CENTERP.x, CENTERP.y, v, B_SIZE);
  bouncepoint = createVector();
}

draw = function() {
  background('#ff844c');
  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      player.rotateByAngle(ROT);
    } else if (keyCode === RIGHT_ARROW) {
      player.rotateByAngle(-ROT);
    }
  }
  
  // auto play
  // if (!goodAngle()) {
  //   player.rotateByAngle(-ROT);
  // }
  
  ball.update();
  if (collision()) {
    bouncepoint = ball.bounce();
    score++;
  } else if (outOfBounds()) {
    ball.pos = createVector(CENTERP.x, CENTERP.y);
    score = 0;
  }
  
  player.show();
  ball.show();
  textSize(30);
  textAlign(CENTER);
  text(score, CENTERP.x, CENTERP.y);
  if (debug) {
    push();
    noFill();
    ellipse(CENTERP.x, CENTERP.y, BOUNCE_RAD * 2, BOUNCE_RAD * 2);
    strokeWeight(5);
    point(bouncepoint.x, bouncepoint.y);
    pop();
  }
}

collision = function() {
  let atEdge = (ball.pos.dist(CENTERP) >= P_SIZE/2 - B_SIZE - STROKE/2);
  return atEdge && goodAngle();
}

outOfBounds = function() {
  return (ball.pos.dist(CENTERP) > P_SIZE/2 - B_SIZE - STROKE/2);
}

goodAngle = function() {
  let ang = CENTERP.sub(ball.pos).heading() + 540;
  ang %= 360;
  CENTERP.add(ball.pos);
  return angleInRange(ang, player.a1, player.a2);
}

angleInRange = function(a, r1, r2) {
  if (r1 > r2) {
    if (a < 180) return a <= r2;
    else return a >= r1;
  } else {
    return r1 <= a && a <= r2;
  }
}

keyPressed = function() {
  
}

mousePressed = function() {
  
}

mouseDragged = function() {
  
}
