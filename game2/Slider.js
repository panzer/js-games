function Slider(x1, x2, y, vel, h) {
  this.x1 = x1;
  this.x2 = x2;
  this.y = y;
  this.vel = vel;
  this.h = h;
  
  this.show = function() {
    push();
    fill('green');
    rectMode(CENTER);
    let mid = (this.x1 + this.x2) / 2;
    rect(mid, this.y, this.x2 - this.x1, this.h);
    stroke('red');
    strokeWeight(3);
    point(this.x1, this.y);
    point(this.x2, this.y);
    pop();
  };
  
  this.update = function() {
    this.x1 += this.vel;
    this.x2 += this.vel;
    if (this.x2 >= width || this.x1 <= 0) {
      this.vel *= -1;
    }
  };
  
  this.stopOnSlider = function(other) {
    this.vel = 0;
    this.x1 = max(other.x1, this.x1);
    this.x2 = min(other.x2, this.x2);
    if (this.x2 - this.x1 < 0) {
      this.x1 = this.x2;
    }
  }
}
