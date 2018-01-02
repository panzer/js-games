function Ball(x, y, vel, r) {
  this.pos = createVector(x, y);
  this.vel = vel;
  this.rad = r;
  
  this.show = function() {
    push();
    fill('#69f0ae');
    stroke('#2bbd7e');
    ellipse(this.pos.x, this.pos.y, this.rad * 2, this.rad * 2);
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x, this.pos.y + this.vel.y);
    pop();
  }
  
  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.bounce = function() {
    let r = p5.Vector.random2D().mult(BOUNCE_RAD);
    let desired = r.add(CENTERP);
    let ret = createVector(desired.x, desired.y);
    this.vel = desired.sub(this.pos);
    this.vel.setMag(SPEED);
    this.update();
    return ret;
  }
}
