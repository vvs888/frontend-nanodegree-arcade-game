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
class Enemy {
    constructor(y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = getRandom(-ctx.canvas.width, ctx.canvas.width);
        this.y = y;
        this.speed = getRandom(35, 100);

        // Update the enemy's position, required method for game
        // Parameter: dt, a time delta between ticks
        this.update = (dt) => {
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
        this.render = () => ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        this.checkCollisions = () => {

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
                    modal.isOpened();
                    modal.header.style.color = 'red';
                    modal.paragraph.style.color = 'red';
                    modal.header.textContent = 'You Lose!';
                    modal.paragraph.textContent = 'Wanna try again?';
                    modal.counter = 0;
                    modal.score.textContent = `Your score: ${modal.counter}`;
                    game.score.textContent = modal.score.textContent;
                }
            });
        };
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y, xMove, yMove) {

        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.xMove = xMove;
        this.yMove = yMove;
        this.initX = this.x;
        this.initY = this.y;
        //Player can select a hero
        this.selectHero = () => {
            const players = document.querySelector('.characters');
            players.addEventListener('click', function(evt) {
                if (evt.target.nodeName.toLowerCase() === 'img' &&
                    player.x === player.initX && player.y === player.initY /* preventing changing a hero after changing hero's initial position */) {
                    player.sprite = evt.target.getAttribute('src');
                }
            });
        };

       this.update = () => {

        if (this.y < 0) {
            // if water reached player earnes 500 points
            modal.score.textContent = `Your score: ${modal.counter + 500}`
            modal.isOpened();
            modal.header.style.color = 'green';
            modal.paragraph.style.color = 'green';
            modal.header.textContent = 'You Won!';
            modal.paragraph.textContent = 'Wanna play again?';

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
        };

        // Draw the player
        this.render = () => ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        this.handleInput = (evt) => {
            /* if modal is opened player cannot move; if game is stopped player cannot move */
            if (evt === 'up' && modal.body.classList.contains('closed') && allItems.length > 0) {
                this.y -= this.yMove;

            } else if (evt === 'right' && modal.body.classList.contains('closed') && allItems.length > 0) {
                this.x += this.xMove;

            } else if (evt === 'down' && modal.body.classList.contains('closed') && allItems.length > 0) {
                this.y += this.yMove;

            } else if (evt === 'left' && modal.body.classList.contains('closed') && allItems.length > 0) {
                this.x -= this.xMove;
            }
        };
    }
}

// Items to collect
const Item = function(cost) {
    this.cost = cost;
    this.x = this.randomX();
    this.y = this.randomY();
}

// Draw items
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
let allEnemies = [];


// Place the player object in a variable called player
const player = new Player(ctx.canvas.width / 2 - 50.5, ctx.canvas.height / 2 + 83, 101, 83);


const item1 = new Item(200);
item1.sprite = 'images/Gem Blue.png';

const item2 = new Item(300);
item2.sprite = 'images/Gem Green.png';

const item3 = new Item(500);
item3.sprite = 'images/Gem Orange.png';

const item4 = new Item(700);
item4.sprite = 'images/Heart.png';

const item5 = new Item(800);
item5.sprite = 'images/Key.png';

const item6 = new Item(1000);
item6.sprite = 'images/Star.png';


let allItems = [];

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

// Modal window to display the Game's status
class Modal {
    constructor() {
        this.counter = 0;
        this.body = document.querySelector('.modal');
        this.score = document.querySelector('.modalScore');
        this.score.textContent = `Your score: ${this.counter}`;
        this.header = document.querySelector('.modal-content h1');
        this.paragraph = document.querySelector('.modal-content p');
        this.e1 = document.querySelector('.modal');
        this.e2 = document.querySelector('.modal-overlay');
        // No Button
        this.close = document.querySelector('#close');
        this.close.addEventListener('click', () => {
            this.isClosed();
            // if modal is closed score resets
            this.counter = 0;
            this.score.textContent = `Your score: ${modal.counter}`;
            game.score.textContent = modal.score.textContent;
        });
        // Yes Button
        this.yes = document.querySelector('#yes');
        this.yes.addEventListener('click', () => {
            this.isClosed();
            start.isStarted();
        });

        this.isOpened = () => {
            this.body.classList.remove('closed');
            this.e1.style.display = 'block';
            this.e2.style.display = 'block';
        };

        this.isClosed = () => {
            this.body.classList.add('closed');
            this.e1.style.display = 'none';
            this.e2.style.display = 'none';
            start.isStopped();
        };
    }
};

const modal = new Modal();

//Displays the game's status
const Game = function() {
    this.score = document.querySelector('.score span');
    this.score.textContent = `Your score: ${modal.counter}`;
}

const game = new Game();

// start/stop  button
class Start {
    constructor() {
        this.e = document.querySelector('.stopped');
        this.e.addEventListener('click', () => {
            this.isStarted();
        });

        this.isStarted = () => {
            this.e.classList.remove('stopped');
            this.e.classList.add('started');
            this.e.textContent = 'Stop';
            allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
            allItems = [item1, item2, item3, item4, item5, item6];
            modal.counter = 0;
            this.e = document.querySelector('.started');
            this.e.addEventListener('click', () => {
                this.isStopped();
            });
        }

        this.isStopped = function() {
            this.e.classList.add('stopped');
            this.e.classList.remove('started');
            this.e.textContent = 'Start';
            player.x = player.initX;
            player.y = player.initY;
            allEnemies = [];
            allItems = [];
            // reset score
            modal.counter = 0;
            game.score.textContent = `Your score: ${modal.counter}`;
            modal.score.textContent = `Your score: ${modal.counter}`;
            this.e = document.querySelector('.stopped');
            this.e.addEventListener('click', () => {
                this.isStarted();
            });
        }
    }
}

const start = new Start();
