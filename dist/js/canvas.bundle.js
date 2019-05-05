/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas/natureofcode/circlePacking.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas/natureofcode/circlePacking.js":
/*!**************************************************!*\
  !*** ./src/canvas/natureofcode/circlePacking.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ../shared/utils */ "./src/canvas/shared/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _pvector = __webpack_require__(/*! ../shared/pvector */ "./src/canvas/shared/pvector.js");

var _pvector2 = _interopRequireDefault(_pvector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var INIT_RADIUS = 3;
var MAX_RADIUS = 50;
var TRY_COUNT = 50;
var DISTANCE_MARGIN = 2;
var circles = [];

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF587', '#FF7F66', '#7D6B7D'];

// Event Listeners
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects

var Circle = function () {
  function Circle(x, y, r) {
    _classCallCheck(this, Circle);

    this.position = new _pvector2.default(x, y);
    this.radius = r;
    this.color = _utils2.default.randomColor(colors);
    this.stopGrowing = false;
  }

  //static


  _createClass(Circle, [{
    key: 'grow',


    // methods
    value: function grow() {
      this.radius += 1;
      if (this.radius >= MAX_RADIUS) {
        this.radius = MAX_RADIUS;
        this.stopGrowing = true;
      }
    }
  }, {
    key: 'edges',
    value: function edges() {
      return this.position.x - this.radius <= 0 || this.position.x + this.radius >= canvas.width || this.position.y - this.radius <= 0 || this.position.y + this.radius >= canvas.height;
    }
  }, {
    key: 'show',
    value: function show() {
      c.beginPath();
      c.fillStyle = this.color;
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
      c.fill();
      c.closePath();
    }
  }, {
    key: 'update',
    value: function update() {
      this.show();
      if (this.stopGrowing) {
        return;
      }

      this.grow();
      if (this.edges()) {
        this.stopGrowing = true;
      }

      for (var n = 0; n < circles.length; n++) {
        var circle = circles[n];

        if (circle === this) {
          continue;
        } else if (Circle.isOverlap(this, circle)) {
          this.stopGrowing = true;
          break;
        }
      }
    }
  }], [{
    key: 'newCircle',
    value: function newCircle() {
      var newCircle = new Circle(Math.random() * canvas.width, Math.random() * canvas.height, INIT_RADIUS);

      for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];

        if (Circle.isOverlap(newCircle, circle)) {
          return null;
        }
      }

      return newCircle;
    }
  }, {
    key: 'isOverlap',
    value: function isOverlap(c1, c2) {
      var minDistance = c1.radius + c2.radius;
      var distance = _pvector2.default.distance(c1.position, c2.position);

      return distance - DISTANCE_MARGIN < minDistance;
    }
  }]);

  return Circle;
}();

// Implementation


function init() {
  circles = [];
  var circle = new Circle(canvas.width / 2, canvas.height / 2, 15);
  circles.push(circle);
}

// Animation Loop
function animate() {
  var count = TRY_COUNT;

  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(function (circle) {
    return circle.update();
  });

  if (circles.length >= 1500) {
    return;
  }
  while (count-- > 0) {
    var newCircle = Circle.newCircle();

    if (newCircle !== null) {
      circles.push(newCircle);
      break;
    }
  }
}

init();
animate();

/***/ }),

/***/ "./src/canvas/shared/pvector.js":
/*!**************************************!*\
  !*** ./src/canvas/shared/pvector.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PVector = function () {
  function PVector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, PVector);

    this.x = x;
    this.y = y;
  }

  //getters


  _createClass(PVector, [{
    key: "add",


    // methods
    value: function add(_ref) {
      var x = _ref.x,
          y = _ref.y;

      this.x += x;
      this.y += y;

      return this;
    }
  }, {
    key: "sub",
    value: function sub(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;

      this.x -= x;
      this.y -= y;

      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
          x = _ref3.x,
          y = _ref3.y;

      this.x = x;
      this.y = y;

      return this;
    }
  }, {
    key: "copy",
    value: function copy() {
      return new PVector(this.x, this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var theta = Math.atan(Math.abs(this.y) / Math.abs(this.x));
      var _ref4 = [PVector.getSign(this.x), PVector.getSign(this.y)],
          signX = _ref4[0],
          signY = _ref4[1];


      return new PVector(signX * Math.cos(theta), signY * Math.sin(theta));
    }
  }, {
    key: "times",
    value: function times(constant) {
      this.x *= constant;
      this.y *= constant;

      return this;
    }
  }, {
    key: "setMag",
    value: function setMag(mag) {
      var angle = Math.atan(Math.abs(this.y) / Math.abs(this.x));
      var _ref5 = [PVector.getSign(this.x), PVector.getSign(this.y)],
          xSign = _ref5[0],
          ySign = _ref5[1];


      this.reset({
        x: xSign * mag * Math.cos(angle),
        y: ySign * mag * Math.sin(angle)
      });

      return this;
    }
  }, {
    key: "limit",
    value: function limit(value) {
      var _ref6 = [Math.abs(this.x), Math.abs(this.y)],
          absx = _ref6[0],
          absy = _ref6[1];


      if (absx > value) {
        this.x = this.x < 0 ? -value : value;
      }
      if (absy > value) {
        this.y = this.y < 0 ? -value : value;
      }

      return this;
    }
  }, {
    key: "reverseX",
    value: function reverseX() {
      this.x = -this.x;
      return this;
    }
  }, {
    key: "reverseY",
    value: function reverseY() {
      this.y = -this.y;
      return this;
    }
  }, {
    key: "magnitude",
    get: function get() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
  }, {
    key: "direction",
    get: function get() {
      return { x: this.x / this.magnitude, y: this.y / this.magnitude };
    }

    // static methods

  }], [{
    key: "sub",
    value: function sub(v1, v2) {
      return new PVector(v1.x - v2.x, v1.y - v2.y);
    }
  }, {
    key: "random",
    value: function random() {
      var angle = Math.random() * Math.PI * 2;
      return new PVector(Math.cos(angle), Math.sin(angle));
    }
  }, {
    key: "distance",
    value: function distance(v1, v2) {
      var dx = v2.x - v1.x,
          dy = v2.y - v1.y;

      return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
  }, {
    key: "getSign",
    value: function getSign(value) {
      return value >= 0 ? 1 : -1;
    }
  }]);

  return PVector;
}();

// utils

exports.default = PVector;

/***/ }),

/***/ "./src/canvas/shared/utils.js":
/*!************************************!*\
  !*** ./src/canvas/shared/utils.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function getSign(value) {
  return value >= 0 ? 1 : -1;
}

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

function randomSign() {
  return Math.random() < 0.5 ? 1 : -1;
}

function linearScale(domain, range) {
  // domain, range both are supposed to be an array with the length of 2
  var _ref = [].concat(_toConsumableArray(domain), _toConsumableArray(range)),
      d1 = _ref[0],
      d2 = _ref[1],
      r1 = _ref[2],
      r2 = _ref[3];

  var dSpan = d2 - d1,
      rSpan = r2 - r1;

  return function (value) {
    if (value <= d1) {
      return r1;
    } else if (value >= d2) {
      return r2;
    } else {
      var percent = (value - d1) / dSpan;
      return r1 + rSpan * percent;
    }
  };
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance,
  getSign: getSign,
  setPrototypeChain: setPrototypeChain,
  randomSign: randomSign,
  linearScale: linearScale
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map