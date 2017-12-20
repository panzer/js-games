function Jumper(x, y, r, g) {
  PhysObj.call(this, x, y);
  this.rad = r || 20;
  this.g = g || 0.1;
  
  this.show = function() {
    push();
    fill('white');
    ellipse(this.pos.x, this.pos.y, this.rad * 2, this.rad * 2);
    pop();
  };
  
  this.update = function() {
    this.pos.y += this.vel.y;
    this.vel.y += this.g;
    if (this.pos.y > height - this.rad) {
      this.vel.y = 0;
      this.pos.y = height - this.rad;
    } else if (this.pos.y < this.rad) {
      this.vel.y = 0;
      this.pos.y = this.rad;
    }
  };
  
  this.radialPointForAngle = function(angle) {
    var r = createVector(this.rad, 0).rotate(angle);
    return r.add(this.pos);
  }
  
  this.nRadialPoints = function(n, show) {
    push();
    stroke('red');
    strokeWeight(3);
    let result = [];
    let seg = 360 / n;
    for (var i = 0; i < n; i++) {
      let angle = seg * i;
      let pt = this.radialPointForAngle(angle);
      result.push(pt);
      if (show) point(pt.x, pt.y);
    }
    pop();
    return result;
  }
}
