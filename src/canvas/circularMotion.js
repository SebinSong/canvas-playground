import utils from '../utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
const lastMouse = {
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

// Objects
function Particle(x, y, radius, color) {
  this.xInit = this.x = x;
  this.yInit = this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distanceFromCenter = utils.randomIntFromRange(80,150); 
}

Particle.prototype.draw = function({x, y}) {

  c.beginPath();
  c.strokeStyle = this.color;
  c.lineWidth = this.radius;
  c.moveTo(x,y);
  c.lineTo(this.x, this.y);
  c.stroke();
};

Particle.prototype.update = function() {
  const lastPoint = {x: this.x, y: this.y};

  this.x = lastMouse.x + this.distanceFromCenter * Math.cos(this.radians);
  this.y = lastMouse.y + this.distanceFromCenter * Math.sin(this.radians);
  this.radians += this.velocity;

  this.draw(lastPoint);
};

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(
      canvas.width/2, 
      canvas.height/2,
      utils.randomIntFromRange(4,8),
      utils.randomColor(colors)
    ));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  lastMouse.x += (mouse.x - lastMouse.x) * 0.07;
  lastMouse.y += (mouse.y - lastMouse.y) * 0.07;

  c.fillStyle = 'rgba(255,255,255,0.15)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => particle.update());

  c.fillStyle = 'rgba(0,0,0,0.75)';
  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
}

init();
animate();