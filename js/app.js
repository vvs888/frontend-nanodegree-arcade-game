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
let enemy1X = getRandom(-ctx.canvas.width, ctx.canvas.width);
const enemy1Y = ctx.canvas.height / 6 - 41.5;
let speed1 = getRandom(25, 55);

let enemy3X = getRandom(-ctx.canvas.width, ctx.canvas.width);
const enemy3Y = ctx.canvas.height / 6 + 41.5;
let speed3 = getRandom(25, 55);

let enemy5X = getRandom(-ctx.canvas.width, ctx.canvas.width);
const enemy5Y = ctx.canvas.height / 6 + 124.5;
let speed5 = getRandom(25, 55);

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    enemy1X += speed1 * dt;
    if (enemy1X > ctx.canvas.width) {
        enemy1X = getRandom(-ctx.canvas.width, -101);
        console.log(enemy1X);
        speed1 = getRandom(25, 55);
    }

    enemy3X += speed3 * dt;
    if (enemy3X > ctx.canvas.width) {
        enemy3X = getRandom(-ctx.canvas.width, -101);
        console.log(enemy3X);
        speed3 = getRandom(25, 55);
    }

    enemy5X += speed5 * dt;
    if (enemy5X > ctx.canvas.width) {
        enemy5X = getRandom(-ctx.canvas.width, -101);
        console.log(enemy5X);
        speed5 = getRandom(25, 55);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), enemy1X, enemy1Y);

    ctx.drawImage(Resources.get(this.sprite), enemy3X, enemy3Y);

    ctx.drawImage(Resources.get(this.sprite), enemy5X, enemy5Y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {

    this.sprite = 'images/char-boy.png';
}

const xInit = ctx.canvas.width / 2 - 50.5;
const yInit = ctx.canvas.height / 2 + 100;

Player.prototype.update = function() {

}

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), xInit, yInit);
}

Player.prototype.handleInput = function(evt) {

}

// Now instantiate your objects.
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const enemy5 = new Enemy();
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
