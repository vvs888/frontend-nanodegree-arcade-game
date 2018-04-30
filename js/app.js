function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandom(-ctx.canvas.width, ctx.canvas.width);
    this.speed = getRandom(25, 65);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    enemy1.x += enemy1.speed * dt;
    let enemy1currentX = Math.floor(enemy1.x);
    if (enemy1currentX === player.currentX && enemy1.y === player.currentY) {
        player.currentY = player.y;
        player.currentX = player.x
    }
    if (enemy1.x > ctx.canvas.width) {
        enemy1.x = getRandom(-ctx.canvas.width, -101);
        enemy1.speed = getRandom(25, 65);
    }

    enemy3.x += enemy3.speed * dt;
    let enemy3currentX = Math.floor(enemy3.x);
    if (enemy3currentX === player.currentX && enemy3.y === player.currentY) {
        player.currentY = player.y;
        player.currentX = player.x
    }
    if (enemy3.x > ctx.canvas.width) {
        enemy3.x = getRandom(-ctx.canvas.width, -101);
        enemy3.speed = getRandom(25, 65);
    }

    enemy5.x += enemy5.speed * dt;
    let enemy5currentX = Math.floor(enemy5.x);
    if (enemy5currentX === player.currentX && enemy5.y === player.currentY) {
        player.currentY = player.y;
        player.currentX = player.x
    }
    if (enemy5.x > ctx.canvas.width) {
        enemy5.x = getRandom(-ctx.canvas.width, -101);
        enemy5.speed = getRandom(25, 65);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {

    this.sprite = 'images/char-boy.png';
    this.x = ctx.canvas.width / 2 - 50.5;
    this.y = ctx.canvas.height / 2 + 83;
    this.currentX = this.x;
    this.currentY = this.y;
    this.xMove = 101;
    this.yMove = 83;
}

Player.prototype.update = function() {

}

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.currentX, this.currentY);
}

Player.prototype.handleInput = function(evt) {

    if (evt === 'up') {
        this.currentY -= this.yMove;
        if (this.currentY === -29) {
            this.currentY = 54;
        }
        console.log(this.currentY);
    } else if (evt === 'right') {
        this.currentX += this.xMove;
        if (this.currentX === 505) {
            this.currentX = 404;
        }
        console.log(this.currentX);
    } else if (evt === 'down') {
        this.currentY += this.yMove;
        if (this.currentY === 469) {
            this.currentY = 386;
        }
        console.log(this.currentY);
    } else if (evt === 'left') {
        this.currentX -= this.xMove;
        if (this.currentX === -101) {
            this.currentX = 0;
        }
        console.log(this.currentX);
    }
}

// Now instantiate your objects.
const enemy1 = new Enemy();
enemy1.y = ctx.canvas.height / 6 - 47;

const enemy2 = new Enemy();

const enemy3 = new Enemy();
enemy3.y = ctx.canvas.height / 6 + 36;

const enemy4 = new Enemy();

const enemy5 = new Enemy();
enemy5.y = ctx.canvas.height / 6 + 119;

const enemy6 = new Enemy();

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];


// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
