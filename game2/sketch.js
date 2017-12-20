let sliders = [];
let active;
const WIDTH = 300;
const HEIGHT = 600;
const H = 20.0;
const I = HEIGHT - (H / 2);
const WIN = H / 2;

setup = function() {
  let canv = createCanvas(WIDTH, HEIGHT);
  canv.parent("gameContainer");
  canv.id("game");
  background(51);
  angleMode(DEGREES);
  
  reset();
}

reset = function() {
  sliders = [new Slider(100.0, 200.0, I, 0.0, H)];
  active = new Slider(100.0, 200.0, I - H, 2.0, H);
}

draw = function() {
  background('#0288d1');
  for (s of sliders) {
    s.show();
    s.update();
  }
  active.update();
  active.show();
  if (active.y < WIN) {
    fill('white');
    textSize(42);
    textAlign(CENTER);
    text("Win!", WIDTH / 2, HEIGHT / 2);
  }
}

keyPressed = function() {
  // get slightly faster
  var v = active.vel * 1.01;
  var last = sliders[sliders.length-1];
  active.stopOnSlider(last);
  sliders.push(active);
  active = new Slider(active.x1, active.x2, active.y - H, v, H);
  if (active.x2 - active.x1 == 0) {
    reset();
  }
}

mousePressed = function() {
  
}

mouseDragged = function() {
  
}
