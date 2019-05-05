import utils from '../utils';

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
function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
}

Circle.prototype.draw = function() {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.fill();
  c.closePath();
};

Circle.prototype.update = function() {
  this.draw();
};

// Implementation
let circle1, circle2;

function init() {
  circle1 = new Circle(canvas.width/2, canvas.height/2, 150, 'black');
  circle2 = new Circle(0,0,30, 'red');

  for (let i = 0; i < 400; i++) {
    // objects.push()
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circle2.x = mouse.x;
  circle2.y = mouse.y;
  if(utils.distance(circle1.x, circle1.y, circle2.x, circle2.y) <= circle1.radius + circle2.radius){
    circle1.color = 'red';
  } else {
    circle1.color = 'black';
  }
  circle1.update();
  circle2.update();


  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
  // objects.forEach(object => {
  //  object.update()
  // })
}

init();
animate();