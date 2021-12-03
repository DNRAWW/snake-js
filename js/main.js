const canvas = document.getElementById('gameField');
const ctx = canvas.getContext('2d');
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

var Config = {
    height: canvas.height,
    width: canvas.width,
    cellSize: 40,
    step: 0,
    maxStep: 7,
}

class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
}

class Game {
    constructor() {
        this.gameOver = false;
    };

    drawSnake(snake) {
        // draw tail
        snake.tail.forEach(element => {
            ctx.fillStyle = "#71C9CE";
            ctx.fillRect(element.x, element.y, Config.cellSize, Config.cellSize);
        });

        // draw head
        ctx.fillStyle = "#A6E3E9";
        ctx.fillRect(snake.x, snake.y, Config.cellSize, Config.cellSize);
    };

    drawFood(food) {
        ctx.beginPath();
        ctx.fillStyle = "#FF2E63";
        ctx.arc(food.x + (Config.cellSize / 2), food.y + (Config.cellSize / 2), Config.cellSize / 4, 0, 2 * Math.PI);
        ctx.fill();
    };
}
    
class Snake extends Entity {
    constructor(x, y) {
        super(x, y);

        this.dx = Config.cellSize;
        this.dy = 0;
        
        this.maxTails = 2;
        
        this.tail = [];
    };
    
    move(){
        this.tail.unshift( { x: snake.x, y: snake.y } );

        this.x += this.dx;
        this.y += this.dy;

        if ( this.tail.length > this.maxTails ) {
            snake.tail.pop();
        }

        if(this.x >= Config.width) {
            this.x = 0;
        }

        else if(this.x < 0) {
            this.x = Config.width - Config.cellSize;
        };

        if(this.y >= Config.height) {
            this.y = 0;
        }

        else if(this.y < 0) {
            this.y = Config.height - Config.cellSize;
        };
    }

    eat(){
        this.maxTails++;
    };
}

class Food extends Entity {
    constructor(x, y) {
        super(x, y);
    };

    eaten(x, y){
        this.x = randomInt(0, Config.width / Config.cellSize) * Config.cellSize;
        this.y = randomInt(0, Config.height / Config.cellSize) * Config.cellSize;
    };
}
    
let snake = new Snake(0, 0);

let food = new Food(randomInt(0, Config.width / Config.cellSize) * Config.cellSize, randomInt(0, Config.height / Config.cellSize) * Config.cellSize);

let game = new Game();

function play() {
    requestAnimationFrame(play);
    if( ++Config.step < Config.maxStep) {
        return;
    }

    Config.step = 0;

    ctx.clearRect(0,0, Config.width, Config.height);

    game.drawFood(food);
    game.drawSnake(snake);

    snake.move();

    if(snake.x == food.x && snake.y == food.y) {
        food.eaten();
        snake.eat();
    };

    snake.tail.forEach(tail => {
        if(snake.x == tail.x && snake.y == tail.y){
            restart();
        }
    });
}

function restart() {
    snake = new Snake(0, 0);

    food = new Food(randomInt(0, Config.width / Config.cellSize) * Config.cellSize, randomInt(0, Config.height / Config.cellSize) * Config.cellSize);
}

document.addEventListener("keydown", function(e) {
    switch(e.code){
        case "KeyW":
            snake.dy = -Config.cellSize;
            snake.dx = 0;

            break;

        case "KeyS":
            snake.dy = Config.cellSize;
            snake.dx = 0;

            break;

        case "KeyA":
            snake.dy = 0;
            snake.dx = -Config.cellSize;

            break;

        case "KeyD":
            snake.dy = 0;
            snake.dx = Config.cellSize;

            break;
    }
})

play()