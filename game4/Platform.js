function Platform(x, y, speed, w, h) {
  this.pos = createVector(x, y);
  this.speed = speed;
  this.w = w || 100;
  this.h = h || 10;
  
  this.show = function() {
    push();
    rect(this.pos.x, this.pos.y, this.w, this.h);
    for (var i = 0; i < this.w; i+=2) {
      let val = this.pos.x + i;
      let ang = map(val, this.pos.x, this.pos.x + this.w, -30, 80);
      let d = createVector(0, -12).rotate(ang);
      line(val, this.pos.y, val + d.x, this.pos.y + d.y);
    }
    pop();
  }
  
  this.moveLeft = function() {
    if (this.pos.x > 0) {
      this.pos.x -= this.speed;
    }
  }
  
  this.moveRight = function() {
    if (this.pos.x < WIDTH - this.w) {
      this.pos.x += this.speed;
    }
  }
}
