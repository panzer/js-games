const TRI_UP = -1;
const TRI_DOWN = 1;

class Triangle {
  constructor(pos, dir, name) {
    this.pos = pos;
    this.size = 40;
    this.name = name;
    this.direction = dir;
    this.fillColor = null;
    this.isRevealed = false;
    this.v_1 = null;
    this.v_2 = null;
    this.v_3 = null;
    // fill with primary if up; calculate color if down
    if (this.direction == TRI_UP) {
      this.fillColor = getRandomPrimaryColor();
    }
    this.set_vertices();
    if (this.direction === TRI_DOWN) {
      this.shift(new p5.Vector(0, this.height() - this.size));
    } else {
      this.shift(new p5.Vector(0, this.size));
    }
  }

  set_vertices() {
    let offset = new p5.Vector(0, this.direction * this.size);
    this.v_1 = p5.Vector.add(this.pos, offset);
    offset.rotate(PI / 1.5);
    this.v_2 = p5.Vector.add(this.pos, offset);
    offset.rotate(PI / 1.5);
    this.v_3 = p5.Vector.add(this.pos, offset);
  }

  draw() {
    if (this.isRevealed && this.fillColor !== null) {
      fill(getP5Color(this.fillColor));
    } else {
      fill(Color.grey);
    }

    stroke(Color.black);
    triangle(
      this.v_1.x,
      this.v_1.y,
      this.v_2.x,
      this.v_2.y,
      this.v_3.x,
      this.v_3.y
    );
    fill(0);
    // text(this.name, this.pos.x, this.pos.y);
  }

  reveal() {
    this.isRevealed = true;
  }

  contains(point) {
    let inv_twice_area = 1 / (2 * this.area());
    let s =
      inv_twice_area *
      (this.v_1.y * this.v_3.x -
        this.v_1.x * this.v_3.y +
        (this.v_3.y - this.v_1.y) * point.x +
        (this.v_1.x - this.v_3.x) * point.y);
    let t =
      inv_twice_area *
      (this.v_1.x * this.v_2.y -
        this.v_1.y * this.v_2.x +
        (this.v_1.y - this.v_2.y) * point.x +
        (this.v_2.x - this.v_1.x) * point.y);

    return s > 0 && t > 0 && 1 - s - t > 0;
  }

  area() {
    return (
      0.5 *
      (-this.v_2.y * this.v_3.x +
        this.v_1.y * (-this.v_2.x + this.v_3.x) +
        this.v_1.x * (this.v_2.y - this.v_3.y) +
        this.v_2.x * this.v_3.y)
    );
  }

  height() {
    return (2 * this.area()) / this.base();
  }

  base() {
    return Math.abs(this.v_2.x - this.v_3.x);
  }

  shift(s) {
    this.pos.add(s);
    this.set_vertices();
  }
}

class UpTriangle extends Triangle {
  constructor(pos, name) {
    super(pos, -1, name);
  }
}

class DownTriangle extends Triangle {
  constructor(pos, name) {
    super(pos, 1, name);
    this.up = null;
    this.left = null;
    this.right = null;
  }

  link(up, left, right) {
    this.up = up;
    this.left = left;
    this.right = right;
  }

  resolveColor() {
    let u = null;
    let l = null;
    let r = null;
    if (this.up === null && this.left === null && this.right === null) {
      return;
    }
    if (this.up !== null) u = this.up.fillColor;
    if (this.left !== null) l = this.left.fillColor;
    if (this.right !== null) r = this.right.fillColor;
    this.fillColor = blendColors(u, l, r);
  }
}
