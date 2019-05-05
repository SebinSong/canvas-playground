import utils from '../../utils';
import PVector from '../shared/pvector.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const DRAG_COEFFICIENT = 0.175;
const GRAVITY = 0.5;
const BALL_NUMBER = 15;
const [ RADIUS_MIN, RADIUS_MAX ] = [ 10, 50 ];
const [ MASS_MIN, MASS_MAX ] = [ 5, 15 ];
const massCalc = utils.linearScale([RADIUS_MIN, RADIUS_MAX], [MASS_MIN, MASS_MAX]);
const balls = [];
let liquid = null;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

class Ball {
  constructor(x, y, vx, vy, r) {
    this.position = new PVector(x,y);
    this.velocity = new PVector(vx, vy);
    this.netForce = new PVector();
    this.radius = r;
    this.mass = massCalc(r);
    this.color = utils.randomColor(colors);
  }

  // getters 
  draw() {
    c.beginPath();
    c.moveTo(this.position.x + this.radius, this.position.y);
    c.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI, false);
    c.fillStyle = this.color;
    c.strokeStyle = 'rgba(0,0,0,0.5)';
    c.fill();
    c.stroke();
    c.closePath();

    return this;
  }
  updateForce() {
    const gravity = new PVector(0, GRAVITY*this.mass);
    this.netForce.reset().add(gravity);

    if(liquid.isInside(this)){
      this.netForce.add(this.getViscousForce());
    }
  }
  getViscousForce() {
    const speed = this.velocity.magnitude;
    const v = DRAG_COEFFICIENT * speed * speed;

    return this.velocity.normalize().times(-1).times(v);
  }
  updateVelocityAndPosition() {
    const acceleration = this.netForce.copy().times(1/this.mass);

    this.velocity.add(acceleration);
    this.position.add(this.velocity);

    if(this.position.y + this.radius >= liquid.y + liquid.height){
      this.position.y = liquid.y + liquid.height - this.radius;
      this.velocity.reverseY();
    }
  }
  update() {
    this.updateForce();
    this.updateVelocityAndPosition();
    this.draw();
  }
}

class Liquid {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  display() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  isInside(ball){
    const ballBottom = ball.position.y + ball.radius;
    if(ballBottom >= this.y && ballBottom <= canvas.height){
      return true;
    } else {
      return false;
    }
  }
}

function init() {
  const gap = canvas.width / (BALL_NUMBER + 1);

  for (let i = 0; i < BALL_NUMBER; i++) {
    const ball = new Ball(
      gap * (1 + i), // x
      50, // y
      0, // vx
      0, // vy
      utils.randomIntFromRange(RADIUS_MIN, RADIUS_MAX) // radius
    );
    
    balls.push(ball);
  }

  liquid = new Liquid(
    0, canvas.height - 300, canvas.width, 300, 'rgba(0,0,0,0.3)');
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(ball => ball.update());
  liquid.display();
}

init();
animate();