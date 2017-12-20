function Obsticle(x, dx, ranges) {
  PhysObj.call(this, x, 0, dx, 0);
  this.w = 20;
  this.yRanges = ranges; // ex. [[0, 200], [300, 400]]
  this.hit = false;
  
  this.show = function() {
    if (!this.hit) fill('white');
    else fill('red');
    for (var i = 0; i < this.yRanges.length; i++) {
      var range = this.yRanges[i];
      var h = range[1] - range[0];
      rect(this.pos.x, range[0], this.w, h);
    }
  }
  
  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.pointWithin = function(p) {
    var posx = this.pos.x;
    var w = this.w;
    var withinRange = function(bool, r) {
      var xr = (p.x >= posx) && (p.x <= posx + w);
      var yr = (p.y >= r[0]) && (p.y <= r[1]);
      return bool || (xr && yr);
    }
    return this.yRanges.reduce(withinRange, false);
  }
  
  this.removeOverlaps = function(rgs) {
    let result = [];
    for (var i = rgs.length - 1; i >= 0; i--) {
      // first range
      let a = rgs[i];
      for (var j = i - 1; j >= 0; j--) {
        // second range
        let b = rgs[j];
        // check overlaps
        let a_over_b = b[0] < a[1] && a[1] < b[1];
        let b_over_a = a[0] < b[1] && b[1] < a[1];
        // if any overlaps, combine
        if (a_over_b || b_over_a) {
          // remove A
          rgs.splice(i, 1);
          // replace B with combo of both A and B
          rgs.splice(j, 1, new Array(min(a[0], b[0]), max(a[1], b[1])));
        }
      }
    }
    return rgs;
  }
  
  this.yRanges = this.removeOverlaps(ranges);
}
