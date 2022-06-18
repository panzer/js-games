function Ball(x, y, r, v) {
  this.pos = createVector(x, y);
  this.vel = v || createVector();
  this.rad = r || 10;

  this.show = function() {
    push();
    fill('white');
    ellipse(this.pos.x, this.pos.y, this.rad * 2, this.rad * 2);
    pop();
  };

  this.update = function() {
    this.pos.add(this.vel);
    if (this.pos.y > height - this.rad) {
      // Hits top
      this.vel.y *= -1;
      this.pos.y = height - this.rad;
    } else if (this.pos.y < this.rad) {
      // Hits bottom
      this.vel.y *= -1;
      this.pos.y = this.rad;
    }
    if (this.pos.x > width - this.rad) {
      // Hits right
      this.vel.x *= -1;
      this.pos.x = width - this.rad;
    } else if (this.pos.x < this.rad){
      // Hits left
      this.vel.x *= -1;
      this.pos.x = this.rad;
    }
  };

  this.hitBlock = function(b) {
    let oVel = this.vel.copy();
    let res = false;
    let p_closest;  // closest point to center
    let closest_dist;
    for (p of this.nRadialPoints(16, false)) {
      if (b.pointWithin(p)) {
        res = true;
        if (p_closest === undefined) {
          p_closest = p;
          closest_dist = b.pos.dist(p);
        } else {
          let candidate_dist = b.pos.dist(p);
          if (candidate_dist < closest_dist) {
            p_closest = p;
            closest_dist = candidate_dist;
          }
        }
      }
    }
    if (p_closest !== undefined) {
      this.pos.sub(p_closest);
      let desired = this.pos.copy();
      this.pos.add(p);
      desired.normalize();
      let ma = this.vel.dot(desired) * 2;
      desired.mult(ma);
      this.vel.sub(desired);
      print("ovel: " + oVel + " nvel: " + this.vel);
    }
    return res;
  }

  this.platformBounce = function(plat) {
    if (this.pos.y + this.rad >= plat.pos.y) {
      if (this.pos.x >= plat.pos.x && plat.pos.x + plat.w >= this.pos.x) {
        let val = this.pos.x;
        let ang = map(val, plat.pos.x, plat.pos.x + plat.w, -30, 80);
        let desired = createVector(0, -this.vel.mag()).rotate(ang);
        this.vel = desired;
      }

    }
  }

  this.radialPointForAngle = function(angle) {
    var r = createVector(this.rad, 0).rotate(angle);
    return r.add(this.pos);
  }

  this.nRadialPoints = function(n, show) {
    if (show) {
      push();
      stroke('red');
      strokeWeight(4);
    }
    let result = [];
    let seg = 360 / n;
    for (var i = 0; i < n; i++) {
      let angle = seg * i;
      let pt = this.radialPointForAngle(angle);
      result.push(pt);
      if (show) point(pt.x, pt.y);
    }
    if (show) pop();
    return result;
  }
}
