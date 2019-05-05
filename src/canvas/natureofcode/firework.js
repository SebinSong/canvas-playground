import utils from '../../utils';
import PVector from '../shared/pvector';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const FIREWORK_NUMBER = 1;
const GRAVITY = 0.5;
let fireworks = [];
let particles = [];
let gravity = null;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#801B14', '#F2E4A4', '#A19D77', '#2A2B24', '#E0493F'];

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

class Particle {
  constructor (x,y) {
    this.position = new PVector(x,y);
    this.velocity = new PVector(
      utils.randomSign() * utils.randomIntFromRange(0,7), 
      utils.randomIntFromRange(-25,-12));
    this.acceleration = new PVector();
    this.color = utils.randomColor(colors);
  }

  // methods
  draw () {
    c.beginPath();
    c.arc(this.position.x, this.position.y, 4, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
  applyForce (force) {
    this.acceleration.add(force);
  }
  update() {
    this.applyForce(gravity);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.times(0);

    this.draw();
  }
}

class ExplosionParticle extends Particle {
  constructor(x,y) {
    super(x,y);
    this.velocity = PVector.random().setMag(
      4 + Math.random() * 11
    );
    this.lifeSpan = 200;
  }

  update() {
    super.update.call(this);
    this.velocity.times(0.9);
    this.lifeSpan -= 3;
  }
}

class Firework {
  constructor () {
    this.firework = new Particle(
      Math.floor( Math.random() * canvas.width ),
      canvas.height
    );
    this.exploded = false;
  }

  // methods
  update () {
    if (this.exploded) {
      return;
    }

    this.firework.update();
    if(this.firework.velocity.y >=0){
      this.exploded = true;
      this.explode();
    }
  }
  explode () {
    for(let i=0; i<60; i++) {
      const particle = new ExplosionParticle(
        this.firework.position.x,
        this.firework.position.y
      );

      particles.push(particle);
    }
  }
}

function init() {
  fireworks = [];
  particles = [];
  gravity = new PVector(0, GRAVITY);

  for (let i = 0; i < FIREWORK_NUMBER; i++) {
    fireworks.push(new Firework());
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  if(Math.random() < 0.04){
    fireworks.push(new Firework());
  }

  for(let i=fireworks.length-1; i>=0; i--){
    const firework = fireworks[i];
    if (firework.exploded) {
      fireworks.splice(i, 1);
    } else {
      firework.update();
    }
  }

  for(let j=particles.length-1; j>=0; j--){
    const particle = particles[j];
    if (particle.lifeSpan <= 0) {
      particles.splice(j, 1);
    } else {
      particle.update();
    }
  }
}

init();
animate();