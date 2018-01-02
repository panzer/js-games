function Circle(x, y, d, a) {
  this.x = x;
  this.y = y;
  this.d = d;
  this.a1 = 0;
  this.a2 = a;
  
  this.show = function() {
    push();
    noFill();
    stroke('#b91400');
    ellipse(this.x, this.y, this.d, this.d);
    stroke('white');
    strokeWeight(STROKE);
    arc(this.x, this.y, this.d, this.d, this.a1, this.a2);
    pop();
  };
  
  this.rotateByAngle = function(a) {
    this.a1 += a + 360;
    this.a2 += a + 360;
    this.a1 %= 360;
    this.a2 %= 360;
  }
  
  this.update = function() {
    
  };
}
