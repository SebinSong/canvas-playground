/* eslint-disable for-direction */

import utils from '../shared/utils';
import PVector from '../shared/pvector';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

const [R, K] = [10, 30];
const grids = [];
const active = [];
const W = R / Math.sqrt(2);

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
class Blob {
  constructor(x,y,r=40) {
    this.position = new PVector(x,y);
    this.radius = r;
  }

  show() {
    c.strokeStyle = 'rgba(0,0,0,0.8)';
    c.beginPath();
    c.moveTo(this.position.x + this.radius, this.position.y);
    c.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI, false);
    c.stroke();
    c.closePath();
  }
}

function init() {
  const [ cols, rows ] = [
    Math.floor(canvas.width / W), Math.floor(canvas.height / W)
  ];

  // step 0
  for(let i=0; i<cols*rows; i++){
    grids[i] = -1;
  }

  // step 1
  const randomX = Math.floor( Math.random() * canvas.width );
  const randomY = Math.floor( Math.random() * canvas.height );
  const pos = new PVector(randomX, randomY);
  const [ a, b ] = [ Math.floor(randomX / W), Math.floor(randomY / W) ];
  grids[a + b*cols] = pos;
  active.push(pos);

}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  if(active.length > 0) {
    const r = Math.floor(Math.random() * active.length);
    const position = active[r];
    for(let n=0; n<K; n++){
      const sample = PVector.random();
      const mag = utils.randomIntFromRange(R, 2*R);
      sample.setMag(mag);
      sample.add(position);

      let col = Math.floor(sample.x / W);
      let row = Math.floor(sample.y / W);

      let ok = true;
      for (let m=-1; m>=1; m++) {
        for (let k=-1; k>=1; k++) {
          const neighbor = grid[m+ k*cols];
          if(neighbor !== -1){
            const dis = PVector.distance(sample,neighbor);

            if(dis < R){
              ok = false;
            }
          }
        }
      }
    }
  }
  grids.forEach(grid => {
    if(grid === -1) return;

    c.beginPath();
    c.strokeStyle = 'rgba(0,0,0,0.5)';
    c.strokeWidth = 3;
    c.arc(grid.x, grid.y, 10, 0, 2*Math.PI, false);
    c.stroke();
    c.closePath();
  });
}

init();
animate();