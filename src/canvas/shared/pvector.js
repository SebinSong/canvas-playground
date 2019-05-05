class PVector {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }

  //getters
  get magnitude() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }
  get direction() { 
    return { x: this.x / this.magnitude, y: this.y / this.magnitude };
  }

  // static methods
  static sub(v1,v2) {
    return new PVector(v1.x - v2.x, v1.y - v2.y);
  }
  static random() {
    const angle = Math.random() * Math.PI * 2;
    return new PVector(Math.cos(angle), Math.sin(angle));
  }
  static distance(v1, v2) {
    const [dx, dy] = [v2.x - v1.x, v2.y - v1.y];
    return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
  }
  static getSign(value) { return (value>=0)? 1 : -1; }

  // methods
  add({x, y}) {
    this.x += x;
    this.y += y;

    return this;
  }
  sub({x, y}) {
    this.x -= x;
    this.y -= y;

    return this;
  }
  reset({x, y}={x: 0, y: 0}) {
    this.x = x;
    this.y = y;

    return this;
  }
  copy() {
    return new PVector(this.x, this.y);
  }
  normalize() {
    const theta = Math.atan(Math.abs(this.y) / Math.abs(this.x));
    const [ signX, signY ] = [ PVector.getSign(this.x), PVector.getSign(this.y) ];

    return new PVector(signX * Math.cos(theta), signY * Math.sin(theta));
  }
  times(constant) {
    this.x *= constant;
    this.y *= constant;

    return this;
  }
  setMag(mag) {
    const angle = Math.atan(Math.abs(this.y)/Math.abs(this.x));
    const [ xSign, ySign ] = [ PVector.getSign(this.x), PVector.getSign(this.y) ];

    this.reset({
      x: xSign * mag * Math.cos(angle),
      y: ySign * mag * Math.sin(angle)
    });

    return this;
  }
  limit(value) {
    let [ absx, absy ] = [
      Math.abs(this.x), Math.abs(this.y)
    ];

    if(absx > value){
      this.x = (this.x < 0)? -value : value;
    }
    if(absy > value){
      this.y = (this.y < 0)? -value : value;
    }

    return this;
  }
  reverseX() { 
    this.x = -this.x; 
    return this;
  }
  reverseY() {
    this.y = -this.y;
    return this; 
  }
}

// utils

export default PVector;