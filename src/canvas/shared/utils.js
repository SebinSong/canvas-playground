function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function getSign(value){ return (value>=0)? 1 : -1; }

function setPrototypeChain(child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: false
    },
    _super: {
      value: parent,
      enumarable: false,
      writable: true,
      configurable: false
    }
  });
}

function randomSign(){ return (Math.random() < 0.5)? 1: -1; }

function linearScale(domain, range) {
  // domain, range both are supposed to be an array with the length of 2
  const [ d1, d2, r1, r2 ] = [ ...domain, ...range ];
  const [ dSpan, rSpan ] = [ d2 - d1, r2 - r1 ];
  return function(value) {
    if(value <= d1) {
      return r1;
    }
    else if(value >= d2) {
      return r2;
    } else {
      const percent = (value - d1) / dSpan;
      return r1 + rSpan * percent;
    }
  };
}

module.exports = { 
  randomIntFromRange, 
  randomColor, 
  distance,
  getSign,
  setPrototypeChain, 
  randomSign,
  linearScale
};
