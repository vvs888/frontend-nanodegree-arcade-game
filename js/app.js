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
const Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandom(-ctx.canvas.width, ctx.canvas.width);
    this.y = y;
    this.speed = getRandom(35, 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    allEnemies.forEach(enemy => {
        enemy.x += enemy.speed * dt;
        if (enemy.x > ctx.canvas.width) {
            enemy.x = getRandom(-ctx.canvas.width, -player.xMove);
            enemy.speed = getRandom(35, 100);
        }
    });
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {

    allEnemies.forEach(enemy => {
        if (enemy.x + 50.5 > player.x && player.x + 50.5 > enemy.x && player.y < enemy.y + 40 && player.y + 40 > enemy.y) {
            // player returns to initial position
            player.y = player.initY;
            player.x = player.initX;

            // all items reset to random positions
            allItems.forEach(item => {
                item.x = item.randomX();
                item.y = item.randomY();
            });

            // Score resets
            modal.e1.style.display = 'block';
            modal.e2.style.display = 'block';
            modal.header.style.color = 'red';
            modal.header.textContent = 'You Loose! Try again.';
            modal.counter = 0;
            modal.score.textContent = `Your score: ${modal.counter}`;
            game.score.textContent = modal.score.textContent;
        }
    });
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

        modal.e1.style.display = 'block';
        modal.e2.style.display = 'block';
        modal.header.style.color = 'green';
        modal.header.textContent = 'You Win!';

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

const Item = function(cost) {
    this.cost = cost;
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
        this.x = getRandom(-ctx.canvas.width, -player.xMove);
        this.y = getRandom(-ctx.canvas.height, -player.yMove);
        modal.score.textContent = `Your score: ${modal.counter += this.cost}`;
        game.score.textContent = modal.score.textContent;
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

    // if all items are collected and player reaches water all items return on desk in random order
    allItems.forEach(item => {
        if (item.x > -ctx.canvas.width && item.x < -player.xMove &&
            item.y > -ctx.canvas.height && item.y < player.yMove &&
            player.y < 0) {
            item.x = item.randomX();
            item.y = item.randomY();
        }
    });
}

// Now instantiate your objects.
const enemy1 = new Enemy(ctx.canvas.height / 6 - 47);

const enemy2 = new Enemy(ctx.canvas.height / 6 - 47);

const enemy3 = new Enemy(ctx.canvas.height / 6 + 36);

const enemy4 = new Enemy(ctx.canvas.height / 6 + 36);

const enemy5 = new Enemy(ctx.canvas.height / 6 + 119);

const enemy6 = new Enemy(ctx.canvas.height / 6 + 119);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];


// Place the player object in a variable called player
const player = new Player(ctx.canvas.width / 2 - 50.5, ctx.canvas.height / 2 + 83, 101, 83);
Player.prototype.initX = player.x;
Player.prototype.initY = player.y;

const item1 = new Item(200);
item1.sprite = 'images/Gem Blue.png';

const item2 = new Item(300);
item2.sprite = 'images/Gem Green.png';

const item3 = new Item(500);
item3.sprite = 'images/Gem Orange.png';

const item4 = new Item(700);
item4.sprite = 'images/Heart.png';

const item5 = new Item(100);
item5.sprite = 'images/Key.png';

const item6 = new Item(1000);
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

const Modal = function() {

    this.counter = 0;
    this.score = document.querySelector('.modalScore');
    this.score.textContent = `Your score: ${this.counter}`;
    this.header = document.querySelector('.modal-content h1');
    this.e1 = document.querySelector('.modal');
    this.e2 = document.querySelector('.modal-overlay');
    this.close = document.querySelector('#close');
    this.close.addEventListener('click', function() {
        modal.e1.style.display = 'none';
        modal.e2.style.display = 'none';
        // if modal is closed score resets
        modal.counter = 0;
        modal.score.textContent = `Your score: ${modal.counter}`;
        game.score.textContent = modal.score.textContent;
    });
};

const modal = new Modal();

const Game = function() {
    this.score = document.querySelector('.score span');
    this.score.textContent = `Your score: ${modal.counter}`;
}

const game = new Game();