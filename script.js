class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
  }

  move(x, y) {
    this.x += x;
    this.y += y;
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = 300;
    this.canvas.style.background = 'black';
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, 20, 'red');
    this.handleKeys();
    this.animate();
  }

  handleKeys() {
    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 37: // Left arrow
          this.ball.move(-10, 0);
          break;
        case 38: // Up arrow
          this.ball.move(0, -10);
          break;
        case 39: // Right arrow
          this.ball.move(10, 0);
          break;
        case 40: // Down arrow
          this.ball.move(0, 10);
          break;
      }
    });
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();
    this.context.translate(-this.ball.x + this.canvas.width / 2 + 0.5, 0); // Added 0.5 pixel offset
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(this.canvas.width / 2 - 200, 0);
    this.context.lineTo(this.canvas.width / 2 - 100, this.canvas.height);
    this.context.lineTo(this.canvas.width / 2 + 100, this.canvas.height);
    this.context.lineTo(this.canvas.width / 2 + 200, 0);
    this.context.lineTo(this.canvas.width, 0);
    this.context.closePath();
    this.context.fillStyle = 'grey';
    this.context.fill();
    this.ball.draw(this.context);
    this.context.restore();
    requestAnimationFrame(() => this.animate());
  }
}
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.style.position = 'absolute';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.transform = 'translate(-50%, -50%)';
canvas.style.overflow = 'hidden';
document.body.appendChild(canvas);

const game = new Game(canvas);

const areaText = document.createElement('h1');
areaText.innerText = 'Pingular Tunnel';
areaText.style.color = 'white';
areaText.style.textAlign = 'center';
areaText.style.position = 'absolute';
areaText.style.top = '10px';
areaText.style.width = '100%';
document.body.appendChild(areaText);

document.title = 'Sewers';
