import utils from '../utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const GRAVITY = 1;
const TIME_TO_LEAVE = 200;
const FRICTIONFACTOR = 0.85;
const groundHeight = 80;

canvas.width = innerWidth;
canvas.height = innerHeight;

// Event Listeners

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
function Star(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = { 
    x: utils.randomSign() * utils.randomIntFromRange(4,10), 
    y: 3, 
    hitY: null
  };
  this.friction = FRICTIONFACTOR;
  this.gravity = 1;
  this.ministarNum = 8;
}

Star.prototype.draw = function() {
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.shadowColor = '#E3EAEF';
  c.shadowBlur = 20;
  c.fill();
  c.closePath();
  c.restore();
};

Star.prototype.update = function() {
  this.draw();
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.velocity.y += GRAVITY;

  // when ball hits the bottom of the screen, reverse the sign of the y-velocity
  if(this.y + this.radius >= canvas.height - groundHeight){
    let vy = -this.velocity.y * this.friction;
        
    this.y = canvas.height - this.radius - groundHeight;
    this.velocity.y = (Math.abs(vy)<0.5)? 0 : vy;
    this.friction *= 0.975;

    if(this.velocity.y !== 0){
      this.shatter();
    }
  }

  if(this.x + this.radius >= canvas.width) {
    this.x = canvas.width - this.radius;
    this.velocity.x = -this.velocity.x * this.friction;
    this.shatter();
  }
  if(this.x - this.radius <= 0) {
    this.x = this.radius;
    this.velocity.x = -this.velocity.x * this.friction;
    this.shatter();
  }
};

Star.prototype.shatter = function() {
  this.radius -= 3;
  if(this.radius <= 0) {
    this.radius = 0;
  }

  for(let i=0; i<this.ministarNum; i++){
    miniStars.push(
      new MiniStar(
        this.x, this.y + this.radius,
        2, 'red'
      )
    );
  }
};

function MiniStar(x, y, radius, color) {
  Star.call(this, x, y, radius, color);
  this.velocity = { 
    x: utils.randomSign() * utils.randomIntFromRange(3, 8), 
    y: utils.randomIntFromRange(-15,0)
  };
  this.friction = FRICTIONFACTOR;
  this.gravity = 0.15;
  this.ttl = TIME_TO_LEAVE; // stands for 'time to leave'
  this.opacity = 1;
}

MiniStar.prototype.draw = function() {
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = `rgba(227, 234, 239,${this.opacity})`;
  c.shadowColor = '#E3EAEF';
  c.shadowBlur = 20;
  c.fill();
  c.closePath();
  c.restore();
};

MiniStar.prototype.update = function() {
  this.draw();

  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.velocity.y += this.gravity;
  this.ttl -= 1;
  this.opacity = 1 - (TIME_TO_LEAVE - this.ttl) / TIME_TO_LEAVE;

  // when ball hits the bottom of the screen, reverse the sign of the y-velocity
  if(this.y + this.radius >= canvas.height - groundHeight){
    this.y = canvas.height - this.radius - groundHeight;
    this.velocity.y *= (-1) * this.friction;
    this.friction *= 0.975;
  }
};

function createMountainRange(mountainAmount, height, color) {
  for (let i=0; i<mountainAmount; i++) {
    const mountainWidth = canvas.width / mountainAmount;
    const currentStart = mountainWidth * i;
    const extraWidth = canvas.width * 0.7 * (1 - height / canvas.height);

    c.beginPath();
    c.moveTo(currentStart - extraWidth, canvas.height);
    c.lineTo(currentStart + mountainWidth + extraWidth, canvas.height);
    c.lineTo(currentStart + mountainWidth/2, canvas.height - height);
    c.lineTo(currentStart - extraWidth, canvas.height);
    c.fillStyle = color;
    c.fill();
    c.closePath();
  }
}

// Implementation
const backgroundGradient = c.createLinearGradient(0,0,0,canvas.height);
backgroundGradient.addColorStop(0, '#171e26');
backgroundGradient.addColorStop(1, '#3f586b');

let Stars;
let miniStars;
let backgroundStars;
let ticker = 0;
let randomSpawnRate = 75;
let previousTick = 0;

function init() {
  Stars = [];
  miniStars = [];
  backgroundStars = [];

  for (let i=0; i<150; i++) {
    const [x, y, radius, color] = [
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      utils.randomIntFromRange(1,3),
      'white'
    ];

    backgroundStars.push(
      new Star(x, y, radius, color)
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.fillStyle = backgroundGradient;
  c.fillRect(0, 0, canvas.width, canvas.height);

  backgroundStars.forEach(bgStar => bgStar.draw());
    
  createMountainRange(1, canvas.height - 50, '#384551');
  createMountainRange(2, canvas.height - 100, '#283843');
  createMountainRange(3, canvas.height - 300, '#26333e');

  c.fillStyle = '#182028';
  c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

  Stars.forEach((star, index) => {
    star.update();
    if (star.radius === 0){
      Stars.splice(index, 1);
    }
  });
  miniStars.forEach((ministar, index) => {
    ministar.update();
    if (ministar.ttl <= 0) {
      miniStars.splice(index, 1);
    }
  });

  ticker++;
  if (ticker - previousTick === randomSpawnRate) {
    Stars.push(new Star(
      50 + Math.random() * (canvas.width - 100),
      -100,
      18,
      '#E3EAEF'
    ));

    randomSpawnRate = utils.randomIntFromRange(75,100);
    previousTick = ticker;
  }
}

init();
animate();