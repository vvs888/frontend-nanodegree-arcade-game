// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
var currentIndex = array.length, temporaryValue, randomIndex;

while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
}

return array;
}

//function for generating random number
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    enemy1.x += enemy1.speed * dt;

    if (enemy1.x > ctx.canvas.width) {
        enemy1.x = getRandom(-ctx.canvas.width, -101);
        enemy1.speed = getRandom(25, 65);
    }

    enemy3.x += enemy3.speed * dt;

    if (enemy3.x > ctx.canvas.width) {
        enemy3.x = getRandom(-ctx.canvas.width, -101);
        enemy3.speed = getRandom(25, 65);
    }

    enemy5.x += enemy5.speed * dt;

    if (enemy5.x > ctx.canvas.width) {
        enemy5.x = getRandom(-ctx.canvas.width, -101);
        enemy5.speed = getRandom(25, 65);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
    if (enemy1.x + 50.5 > player.x && player.x + 50.5 > enemy1.x && player.y < enemy1.y + 40 && player.y + 40 > enemy1.y) {
        player.y = player.initY;
        player.x = player.initX;
        // all items return on random positions after collision Enemy with Player
        allItems.forEach(item => {
            item.x = item.randomX();
            item.y = item.randomY();
        });
    }

    if (enemy3.x + 50.5 > player.x && player.x + 50.5 > enemy3.x && player.y < enemy3.y + 40 && player.y + 40 > enemy3.y) {
        player.y = player.initY;
        player.x = player.initX;
        // all items return on random positions after collision Enemy with Player
        allItems.forEach(item => {
            item.x = item.randomX();
            item.y = item.randomY();
        });
    }

    if (enemy5.x + 50.5 > player.x && player.x + 50.5 > enemy5.x && player.y < enemy5.y + 40 && player.y + 40 > enemy5.y) {
        player.y = player.initY;
        player.x = player.initX;
        // all items return on random positions after collision Enemy with Player
        allItems.forEach(item => {
            item.x = item.randomX();
            item.y = item.randomY();
        });
    }
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

Player.prototype.selectHero = function() {
    //Player can choose character
    const players = document.querySelector('.characters');
    players.addEventListener('click', function(evt) {
        if (evt.target.nodeName.toLowerCase() === 'img' &&
            player.x === player.initX && player.y === player.initY /* preventing changing a hero after changing hero's initial position */) {
            player.sprite = evt.target.getAttribute('src');
        }
    });
}

Player.prototype.update = function() {

    if (this.y < 0) {
        setTimeout(function() {
            // if player reaches water, player returns to initial position
            player.x = player.initX;
            player.y = player.initY;
            }, 500);
        }
        // preventing the player from moving outside the screen
        if (this.y < 0 - this.yMove) {
            this.y += this.yMove;
        }

        if (this.x === ctx.canvas.width) {
            this.x -= this.xMove;
        }

        if (this.y > this.initY) {
            this.y = this.initY;
        }

        if (this.x < 0) {
            this.x = 0;
        }
}

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(evt) {

    if (evt === 'up') {
        this.y -= this.yMove;

    } else if (evt === 'right') {
        this.x += this.xMove;

    } else if (evt === 'down') {
        this.y += this.yMove;

    } else if (evt === 'left') {
        this.x -= this.xMove;
    }
}

const Item = function() {
    this.x = this.randomX();
    this.y = this.randomY();
}

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//random x-position
Item.prototype.randomX = function() {
    let x = [];
    for (i = 0; i < ctx.canvas.width; i+=101) {
        x.push(i);
    }
    shuffle(x);
    return Number(x[0]);
}

// random y-position
Item.prototype.randomY = function() {
    let y = [];
    for(let j = ctx.canvas.height / 6 - 47; j <= ctx.canvas.height / 6 + 119; j+=83){
        y.push(j);
    }
    shuffle(y);
    return Number(y[0]);
}

Item.prototype.checkCollisions = function() {

    if (this.x === player.x && this.y === player.y) {
        this.x = getRandom(-ctx.canvas.width, -101);
        this.y = getRandom(-ctx.canvas.height, -83);
    }

    // prevent 2 items occupy the same cell in same time
    if (item1.x === item2.x && item1.y === item2.y ||
        item1.x === item3.x && item1.y === item3.y ||
        item1.x === item4.x && item1.y === item4.y ||
        item1.x === item5.x && item1.y === item5.y ||
        item1.x === item6.x && item1.y === item6.y) {
        item1.x = this.randomX();
        item1.y = this.randomY();
    }

    if (item2.x === item3.x && item2.y === item3.y ||
        item2.x === item4.x && item2.y === item4.y ||
        item2.x === item5.x && item2.y === item5.y ||
        item2.x === item6.x && item2.y === item6.y) {
        item2.x = this.randomX();
        item2.y = this.randomY();
    }

    if (item3.x === item4.x && item3.y === item4.y ||
        item3.x === item5.x && item3.y === item5.y ||
        item3.x === item6.x && item3.y === item6.y) {
        item3.x = this.randomX();
        item3.y = this.randomY();
    }

    if (item4.x === item5.x && item4.y === item5.y ||
        item4.x === item6.x && item4.y === item6.y) {
        item4.x = this.randomX();
        item4.y = this.randomY();
    }

    if (item5.x === item6.x && item5.y === item6.y) {
        item5.x = this.randomX();
        item5.y = this.randomY();
    }
}

// Now instantiate your objects.
const enemy1 = new Enemy(getRandom(-ctx.canvas.width, ctx.canvas.width), ctx.canvas.height / 6 - 47, getRandom(25, 65));

const enemy2 = new Enemy();

const enemy3 = new Enemy(getRandom(-ctx.canvas.width, ctx.canvas.width), ctx.canvas.height / 6 + 36, getRandom(25, 65));

const enemy4 = new Enemy();

const enemy5 = new Enemy(getRandom(-ctx.canvas.width, ctx.canvas.width), ctx.canvas.height / 6 + 119, getRandom(25, 65));

const enemy6 = new Enemy();

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];


// Place the player object in a variable called player
const player = new Player(ctx.canvas.width / 2 - 50.5, ctx.canvas.height / 2 + 83, 101, 83);
Player.prototype.initX = player.x;
Player.prototype.initY = player.y;

const item1 = new Item();
item1.sprite = 'images/Gem Blue.png';

const item2 = new Item();
item2.sprite = 'images/Gem Green.png';

const item3 = new Item();
item3.sprite = 'images/Gem Orange.png';

const item4 = new Item();
item4.sprite = 'images/Heart.png';

const item5 = new Item();
item5.sprite = 'images/Key.png';

const item6 = new Item();
item6.sprite = 'images/Star.png';

const allItems = [item1, item2, item3, item4, item5, item6];

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
