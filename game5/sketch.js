// game config
const rows = 6;
const cols = 7; // should be odd and >=3
const total_triangles = rows * cols;
const total_downs = total_triangles / 2; // assumes total_triangles always even; probably true since it's mult of two ints
const text_color = 256;

const spacing = 60;
const x_offset = 60;
const y_offset = 40;

// game state
let triangles = [];
let turn_type = TRI_UP;
let num_tertiaries = 0; // to be determined during game generation
let num_revealed = 0; // incremented throughout the game
let num_downs = 0; // incremented throughout the game
let start_time = null; // set on the first triangle reveal
let total_time = null; // set on last triangle reveal

function initialize_state() {
  triangles = [];
  turn_type = TRI_UP;
  num_tertiaries = 0; // to be determined during game generation
  num_revealed = 0; // incremented throughout the game
  num_downs = 0; // incremented throughout the game
  start_time = null; // set on the first triangle reveal
  total_time = null; // set on last triangle reveal
}

function build_board() {
  initialize_state();
  let isPrimary = true;
  let tester = new UpTriangle(createVector());
  let x_space = tester.base() / 2 + 10;
  let y_space = tester.height() + 10;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      isPrimary = !isPrimary;
      (r + c).toString();
      let center = createVector(c * x_space + x_offset, r * y_space + y_offset);
      if (isPrimary) {
        triangles.push(new UpTriangle(center, (r * cols + c).toString()));
      } else {
        triangles.push(new DownTriangle(center, (r * cols + c).toString()));
      }
    }
  }
  let index = 0;
  isPrimary = true;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let above = null;
      let left = null;
      let right = null;
      isPrimary = !isPrimary;
      if (isPrimary) {
        index++;
        continue;
      }
      // safe because we check it's not primary
      let curTri = triangles[index];
      // link the triangles and resolve colors
      // console.log(index);
      if (r != 0) {
        // has a triangle above (this is not the top row)
        above = triangles[index - cols];
      }
      if (c != 0) {
        // has a triangle on the left
        left = triangles[index - 1];
      }
      if (c != cols - 1) {
        // has a triange on the right
        right = triangles[index + 1];
      }
      curTri.link(above, left, right);
      curTri.resolveColor();
      // console.log(`At c=${c}, r=${r}`, curTri.fillColor);
      if (curTri.fillColor === "brown") num_tertiaries++;

      index++;
    }
  }
}

function setup() {
  let canv = createCanvas(400, 600);
  canv.parent("gameContainer");
  canv.id("game");
  textAlign(CENTER);
  build_board();
}

function getTimeString() {
  function fmtTime(mils) {
    return (mils / 1000).toFixed(2);
  }
  return (
    (total_time
      ? " Final: " + fmtTime(total_time)
      : " Elapsed: " + (start_time ? fmtTime(millis() - start_time) : "0")) +
    " seconds"
  );
}

function draw() {
  background("#303030");
  fill(0);
  for (let i = 0; i < triangles.length; i++) {
    let t = triangles[i];
    t.draw();
  }
  fill(text_color);
  let timer = getTimeString();
  if (turn_type === TRI_DOWN) text("This Turn: DOWN" + timer, width / 2, 15);
  if (turn_type === TRI_UP) text("This Turn: UP" + timer, width / 2, 15);
}

function mouseClicked() {
  let p = createVector(mouseX, mouseY);
  for (let i = 0; i < triangles.length; i++) {
    let t = triangles[i];
    if (t.contains(p)) {
      if (t.direction === turn_type && !t.isRevealed) {
        t.reveal();
        num_revealed++;
        // console.log(
        //   "Total Downs Remaining: ",
        //   total_downs - num_tertiaries - num_downs
        // );
        // console.log("Num Ter:", num_tertiaries);
        if (t.direction === TRI_DOWN) num_downs++;
        if (num_downs < total_downs - num_tertiaries)
          // there are non-tertiary downs remaining
          turn_type *= -1; // assumes this is the right way to swap to the next turn state
        if (num_downs === total_downs - num_tertiaries)
          // only ups remain
          turn_type = TRI_UP;
        //console.log("Revealing");
        if (start_time === null) {
          console.log("Starting clock!");
          start_time = millis();
        }
        if (num_revealed === total_triangles - num_tertiaries) {
          console.log("Stopping clock!");
          total_time = millis() - start_time;
        }
      } else {
        console.log("Cannot press this type of triangle until next turn.");
      }
      break;
    }
  }
}

function keyTyped() {
  if (key === "r") {
    console.log("Restarting game...");
    build_board();
  }
}