const DEFAULT_COOL = 0;

function Block(x, y, hp, w, h) {
  this.pos = createVector(x, y);
  this.w = w || 40;
  this.h = h || 30;
  this.hp = hp || 1;
  this.cooldown = 0;

  this.show = function() {
    let b = map(this.hp, 0, MAX_HP, 0, 255);
    push();
    fill(0, b, b); //rgb
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.w, this.h);
    // fill("white");
    // text(this.cooldown, this.pos.x, this.pos.y);
    pop();
    if (this.cooldown > 0) {
      this.cooldown--;
    }
  }

  this.pointWithin = function(p) {
    let xIn = (p.x <= this.pos.x + this.w/2) && (this.pos.x - this.w/2 <= p.x);
    let yIn = (p.y <= this.pos.y + this.h/2) && (this.pos.y - this.h/2 <= p.y);
    return xIn && yIn;
  }

  this.takeHit = function(points = 1) {
    if (this.cooldown == 0) {
      this.hp -= points;
      this.cooldown = DEFAULT_COOL;
    }
  }
}
