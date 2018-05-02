//function for generating random number
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
    if (enemy1currentX + 50.5 > player.currentX && player.currentX + 50.5 > enemy1currentX && player.currentY < enemy1.y + 40 && player.currentY + 40 > enemy1.y) {
        player.currentY = player.y;
        player.currentX = player.x
    }
    if (enemy1.x > ctx.canvas.width) {
        enemy1.x = getRandom(-ctx.canvas.width, -101);
        enemy1.speed = getRandom(25, 65);
    }

    enemy3.x += enemy3.speed * dt;
    let enemy3currentX = Math.floor(enemy3.x);
    if (enemy3currentX + 50.5 > player.currentX && player.currentX + 50.5 > enemy3currentX && player.currentY < enemy3.y + 40 && player.currentY + 40 > enemy3.y) {
        player.currentY = player.y;
        player.currentX = player.x
    }
    if (enemy3.x > ctx.canvas.width) {
        enemy3.x = getRandom(-ctx.canvas.width, -101);
        enemy3.speed = getRandom(25, 65);
    }

    enemy5.x += enemy5.speed * dt;
    let enemy5currentX = Math.floor(enemy5.x);
    if (enemy5currentX + 50.5 > player.currentX && player.currentX + 50.5 > enemy5currentX && player.currentY < enemy5.y + 40 && player.currentY + 40 > enemy5.y) {
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
const Player = function(x, y, xMove, yMove) {

    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.xMove = xMove;
    this.yMove = yMove;
}

//Player can choose character
const players = document.querySelector('.characters');
players.addEventListener('click', function(evt) {
    if (evt.target.nodeName.toLowerCase() === 'img' && player.x === player.initX && player.y === player.initY) {
        player.sprite = evt.target.getAttribute('src');
    }
});

Player.prototype.update = function() {

}

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(evt) {

    if (evt === 'up') {
        this.y -= this.yMove;
        if (this.y < 0) {
                setTimeout(function() {
                player.x = player.initX;
                player.y = player.initY;
                }, 500);
            }
        // preventing the player from moving outside the screen
        if (this.y < 0 - this.yMove) {
            this.y += this.yMove;
        }
        console.log(this.y);
    } else if (evt === 'right') {
        this.x += this.xMove;
        // preventing the player from moving outside the screen
        if (this.x === ctx.canvas.width) {
            this.x -= this.xMove;
        }
        console.log(this.x);
    } else if (evt === 'down') {
        this.y += this.yMove;
        // preventing the player from moving outside the screen
        if (this.y > this.initY) {
            this.y = this.initY;
        }
        console.log(this.y);
    } else if (evt === 'left') {
        this.x -= this.xMove;
        // preventing the player from moving outside the screen
        if (this.x < 0) {
            this.x = 0;
        }
        console.log(this.x);
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
const player = new Player(ctx.canvas.width / 2 - 50.5, ctx.canvas.height / 2 + 83, 101, 83);
Player.prototype.initX = player.x;
Player.prototype.initY = player.y;

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
