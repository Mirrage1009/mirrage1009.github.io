// Setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Utility: random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Ball class
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -this.velX;
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
        }
      }
    }
  }
}
// Create ball array
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`,
    size
  );
  balls.push(ball);
}

// Animation loop
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}


loop();
// EvilCircle class
class EvilCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = 20;
    this.velY = 20;
    this.color = 'white';
    this.size = 20;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if ((this.x + this.size) >= width) this.x = width - this.size;
    if ((this.x - this.size) <= 0) this.x = this.size;
    if ((this.y + this.size) >= height) this.y = height - this.size;
    if ((this.y - this.size) <= 0) this.y = this.size;
  }

  setControls() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
        case 'ArrowLeft':
          this.x -= this.velX;
          break;
        case 'd':
        case 'ArrowRight':
          this.x += this.velX;
          break;
        case 'w':
        case 'ArrowUp':
          this.y -= this.velY;
          break;
        case 's':
        case 'ArrowDown':
          this.y += this.velY;
          break;
      }
    });
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          count--;
          ballCount.textContent = count;
        }
      }
    }
  }
}

const evilCircle = new EvilCircle(width / 2, height / 2);
evilCircle.setControls();

let count = balls.length;
const ballCount = document.querySelector('.ball-count');
ballCount.textContent = count;

loop();