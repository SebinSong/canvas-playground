const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

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
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
}

Particle.prototype.draw = function() {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.strokeStyle = this.color;
  c.stroke();
  c.closePath();
};

Particle.prototype.update = function() {
  this.draw();
};

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 4; i++) {
    particles.push(
      new Particle(
        Math.random() * innerWidth,
        Math.random() * innerHeight,
        100,
        'blue'
      )
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => particle.update());
  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
}

init();
animate();