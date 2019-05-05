import utils from '../../utils.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const mouse = { x: null, y: null };
const prevMouse = { 
  x: null, y: null,
  update() {
    this.x = this.x + (mouse.x - this.x) * 0.03;
    this.y = this.y + (mouse.y - this.y) * 0.03;
  }
};
const BALL_NUMBER = 10;
const GRAVITY = 0.5;
const WIND = 0.125;
const colors = ['#FFF586', '#FF8C64', '#FF6659', '#7C6A7C'];

const balls = [];

// eventListeners

// constantly keep track of mouse pointer location
window.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', function() {
  init();
});


// class declarations

// PVector: an object with x, y information.
class PVector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //getters
  get magnitude() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }
  get direction() { 
    return { x: this.x / this.magnitude, y: this.y / this.magnitude };
  }

  // methods
  add({x, y}) {
    this.x += x;
    this.y += y;
  }
  reset({x, y}) {
    this.x = x;
    this.y = y;
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
  }
  reverseX() { this.x = -this.x; }
  reverseY() { this.y = -this.y; }
}

// Ball: Balls to move around on the canvas
class Ball {
  constructor(x, y, vx, vy, radius, color, mass) {
    this.p = new PVector(x, y);
    this.velocity = new PVector(vx, vy);
    this.netforce = new PVector(0, 0);
    this.radius = radius;
    this.color = color;
    this.mass = mass;
  }

  // getters
  get acceleration() {
    return {
      x: this.netforce.x / this.mass,
      y: this.netforce.y / this.mass
    };
  }

  // methods

  //display things on canvas
  draw() {
    c.beginPath();
    c.moveTo(this.p.x, this.p.y);
    c.arc(this.p.x, this.p.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  confineBallWithinCanvas() {
    if(this.p.x - this.radius < 0) {
      this.p.x = this.radius;
      this.velocity.reverseX();
    }
    if(this.p.x + this.radius > canvas.width) {
      this.p.x = canvas.width - this.radius;
      this.velocity.reverseX();
    }
    if(this.p.y - this.radius < 0) {
      this.p.y = this.radius;
      this.velocity.reverseY();
    }
    if(this.p.y + this.radius > canvas.height) {
      this.p.y = canvas.height - this.radius;
      this.velocity.reverseY();
    }
  }

  // update info the ball uses for drawing
  update() {
    this.draw();

    this.velocity.add(this.acceleration);
    this.velocity.limit(12);
    this.p.add(this.velocity);
    this.confineBallWithinCanvas();

  }
}

// Function declarations

function init() {
  const [ rMin, rMax ] = [ 8, 15 ];
  
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  mouse.x = canvas.width / 2;
  mouse.y = canvas.height / 2;
  prevMouse.x = mouse.x;
  prevMouse.y = mouse.y;

  // create Balls
  const massScale = utils.linearScale([ rMin, rMax ], [ 1, 5 ]);
  for (let i=0; i<BALL_NUMBER; i++) {
    const radius = utils.randomIntFromRange(rMin, rMax);
    const ball = new Ball(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      0,
      0,
      radius,
      utils.randomColor(colors),
      massScale(radius) // mass
    );

    ball.netforce.add({ x: WIND, y: 0 }); // wind to righthand direction
    ball.netforce.add({ x: 0, y: GRAVITY * ball.mass });  // gravity

    balls.push(ball);
  }
}

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.update();
  });

  prevMouse.update();
}

// executes the script
init();
animate();

