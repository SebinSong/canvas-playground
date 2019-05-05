import utils from '../shared/utils';
import PVector from '../shared/pvector';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const INIT_RADIUS = 3;
const MAX_RADIUS = 50;
const TRY_COUNT = 50;
const DISTANCE_MARGIN = 2;
let circles = [];

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF587', '#FF7F66', '#7D6B7D'];

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
class Circle {
  constructor (x,y,r) {
    this.position = new PVector(x,y);
    this.radius = r;
    this.color = utils.randomColor(colors);
    this.stopGrowing = false;
  }

  //static
  static newCircle() {
    const newCircle = new Circle(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      INIT_RADIUS
    );

    for(let i=0; i<circles.length; i++){
      let circle = circles[i];

      if(Circle.isOverlap(newCircle, circle)){
        return null;
      }
    }

    return newCircle;
  }
  static isOverlap(c1, c2){
    const minDistance = c1.radius + c2.radius;
    const distance = PVector.distance(c1.position, c2.position);

    return distance - DISTANCE_MARGIN < minDistance;
  }

  // methods
  grow() {
    this.radius += 1;
    if(this.radius >= MAX_RADIUS){
      this.radius = MAX_RADIUS;
      this.stopGrowing = true;
    }
  }
  edges() {
    return this.position.x - this.radius <= 0 ||
           this.position.x + this.radius >= canvas.width ||
           this.position.y - this.radius <= 0 ||
           this.position.y + this.radius >= canvas.height;
  }
  show() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    c.fill();
    c.closePath();
  }
  update() {
    this.show();
    if (this.stopGrowing) {
      return;
    }

    this.grow();
    if(this.edges()){
      this.stopGrowing = true;
    }

    for(let n=0; n<circles.length; n++){
      const circle = circles[n];

      if(circle === this){
        continue;
      } else if(Circle.isOverlap(this, circle)){
        this.stopGrowing = true;
        break;
      }
    }
  }
}

// Implementation
function init() {
  circles = [];
  const circle = new Circle(canvas.width/2, canvas.height/2, 15);
  circles.push(circle);
}

// Animation Loop
function animate() {
  let count = TRY_COUNT;

  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => circle.update());

  if(circles.length >= 1500){
    return;
  }
  while (count-- > 0) {
    const newCircle = Circle.newCircle();

    if(newCircle !== null){
      circles.push(newCircle);
      break;
    }
  }
}

init();
animate();