import utils from '../utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const frictionfactor = 0.6;

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

addEventListener('click', () => {
  init();
});

// Objects
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy; 
  this.radius = radius;
  this.color = color;
}

Ball.prototype.draw = function() {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.fill();
  c.stroke();
  c.closePath();
};

Ball.prototype.update = function() {
  this.draw();

  this.x += this.dx;
  this.y += this.dy;
  this.dy += 1;

  if(this.y + this.radius > canvas.height){
    this.y = canvas.height - this.radius;
    this.dy = -this.dy * frictionfactor;
  }
  if(this.x + this.radius > canvas.width ||
       this.x - this.radius < 0){
    this.dx = -this.dx;
  }
};

// Implementation
let balls = [];
function init() {
  balls = [];

  for (let i = 0; i < 80; i++) {
    balls.push(new Ball(
      utils.randomIntFromRange(30, canvas.width - 30),
      utils.randomIntFromRange(canvas.height/3*2, canvas.height/3),
      utils.randomIntFromRange(-2,2)*utils.randomIntFromRange(2,5),
      2,
      utils.randomIntFromRange(10,30),
      utils.randomColor(colors)
    ));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(ball => {
    ball.update();
  });

  c.fillStyle = 'black';
  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
  // objects.forEach(object => {
  //  object.update()
  // })
}

init();
animate();
