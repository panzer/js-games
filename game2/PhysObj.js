function PhysObj(x, y, vx, vy, ax, ay) {
  this.pos = createVector(x, y);
  this.vel = createVector(vx, vy);
  this.acc = createVector(ax, ay);
}

Function.prototype.inheritsFrom = function( parentClassOrObject ){
  if ( parentClassOrObject.constructor == Function )
  {
    //Normal Inheritance
    this.prototype = new parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject.prototype;
  }
  else
  {
    //Pure Virtual Inheritance
    this.prototype = parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject;
  }
  return this;
}
