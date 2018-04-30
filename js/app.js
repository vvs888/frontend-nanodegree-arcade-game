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
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    enemy1.x += enemy1.speed * dt;
    // console.log(enemy1.x);
    if (enemy1.x > ctx.canvas.width) {
        enemy1.x = getRandom(-ctx.canvas.width, -101);
        enemy1.speed = getRandom(25, 55);
    }

    enemy3.x += enemy3.speed * dt;
    if (enemy3.x > ctx.canvas.width) {
        enemy3.x = getRandom(-ctx.canvas.width, -101);
        // console.log(enemy3X);
        enemy3.speed = getRandom(25, 55);
    }

    enemy5.x += enemy5.speed * dt;
    // console.log(enemy5CurrentX);
    if (enemy5.x > ctx.canvas.width) {
        enemy5.x = getRandom(-ctx.canvas.width, -101);
        // console.log(enemy5X);
        enemy5.speed = getRandom(25, 55);
        // console.log(enemy5.speed);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), enemy1.x, enemy1.y);

    ctx.drawImage(Resources.get(this.sprite), enemy3.x, enemy3.y);

    ctx.drawImage(Resources.get(this.sprite), enemy5.x, enemy5.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {

    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {

}

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(evt) {

    if (evt === 'up') {
        this.y -= this.yMove;
        if (this.y === -29) {
            this.y = 54;
        }
        console.log(this.y);
    } else if (evt === 'right') {
        this.x += this.xMove;
        if (this.x === 505) {
            this.x = 404;
        }
        console.log(this.x);
    } else if (evt === 'down') {
        this.y += this.yMove;
        if (this.y === 469) {
            this.y = 386;
        }
        console.log(this.y);
    } else if (evt === 'left') {
        this.x -= this.xMove;
        if (this.x === -101) {
            this.x = 0;
        }
        console.log(this.x);
    }
}

// Now instantiate your objects.
const enemy1 = new Enemy();
enemy1.x = getRandom(-ctx.canvas.width, ctx.canvas.width);
enemy1.y = ctx.canvas.height / 6 - 41.5;
enemy1.speed = getRandom(25, 55);

const enemy2 = new Enemy();

const enemy3 = new Enemy();
enemy3.x = getRandom(-ctx.canvas.width, ctx.canvas.width);
enemy3.y = ctx.canvas.height / 6 + 41.5;
enemy3.speed = getRandom(25, 55);

const enemy4 = new Enemy();

const enemy5 = new Enemy();
enemy5.x = getRandom(-ctx.canvas.width, ctx.canvas.width);
enemy5.y = ctx.canvas.height / 6 + 124.5;
enemy5.speed = getRandom(25, 55);
// console.log(enemy5.speed);

const enemy6 = new Enemy();

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];


// Place the player object in a variable called player
const player = new Player();
player.x = ctx.canvas.width / 2 - 50.5;
player.y = ctx.canvas.height / 2 + 83;
player.xMove = 101;
player.yMove = 83;


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
