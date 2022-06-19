const WIDTH = 401;
const HEIGHT = 500;
let CENTERP;
const MAX_HP = 4; // maximum health

let blocks = [];
let ball;
let platform;
let score = 0;

var randomInt = function(range) {
  var mini = range[0];
  var maxi = range[1];
  return floor(random(mini, maxi));
}

setup = function() {
  let canv = createCanvas(WIDTH, HEIGHT);
  canv.parent("gameContainer");
  canv.id("game");
  background(151);
  angleMode(DEGREES);
  // frameRate(30);
  CENTERP = createVector(WIDTH/2, HEIGHT/2);

  generateLevel();
  ball = new Ball(CENTERP.x+10, CENTERP.y + 10, 5, createVector(0, 5));
  platform = new Platform(CENTERP.x, HEIGHT - 12, 5, 100, 10);
}

draw = function() {
  background(151);

  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      platform.moveLeft();
    } else if (keyCode === RIGHT_ARROW) {
      platform.moveRight();
    } else if (keyCode == ENTER) {
      ball.vel = createVector(0);
    }
  }
  let anyHit = false;
  for (let i = blocks.length - 1; i >= 0; i--) {
    let b = blocks[i];
    b.show();
    if (!anyHit && ball.hitBlock(b)) {
      b.takeHit();
      // anyHit = true;
    }
    if (b.hp === 0) {
      blocks.splice(i, 1);
    }
  }
  ball.show();
  ball.update();
  ball.platformBounce(platform);

  platform.show();
}

generateLevel = function() {
  let row_index = 0;
  for (let y = 75; y < 180; y+=30) {
    for (let x = 20; x < WIDTH; x+=40) {
      let hp = MAX_HP - row_index;
      let b = new Block(x, y, hp);
      blocks.push(b)
    }
    row_index++;
  }
}

keyTyped = function() {

}
