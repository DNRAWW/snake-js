const canvas = document.getElementById('gameField');
const ctx = canvas.getContext('2d');

var Config = {
    height: canvas.height,
    width: canvas.width,
    cellSize: 40,
    step: 0,
    maxStep: 8,
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
        ctx.fillRect(snake.head.x, snake.head.y, Config.cellSize, Config.cellSize);
    };

    drawFood(food) {
        ctx.fillStyle = "#71C9CE";
        ctx.fillRect(food.x, food.y, Config.cellSize/2, Config.cellSize/2);
    };
}
    
class Snake extends Entity {
    constructor(x, y) {
        super(x, y);

        this.head = {x: this.x, y: this.y};

        this.dx = Config.cellSize;
        this.dy = 0;

        console.log(this.head);

        this.size = 3;

        this.tail = [
            {x: this.x - Config.cellSize, y: this.y},
            {x: this.x - Config.cellSize * 2, y: this.y},
        ];
    };
    
    move(){
        snake.head.x += snake.dx;
        snake.head.y += snake.dy;
        
        if(snake.head.x >= Config.width) {
            snake.head.x = 0;
        }

        else if(snake.head.x < 0) {
            snake.head.x = Config.width;
        };

        if(snake.head.y >= Config.height) {
            snake.head.y = 0;
        }

        else if(snake.head.y < 0) {
            snake.head.y = Config.height;
        };
    }

    eat(){
        this.size++;
    };
}

class Food extends Entity {
    constructor(x, y) {
        super(x, y);
    };
    
    // random = () => Math.floor(Math.random()*11);

    eaten(x, y){
        this.x = Math.floor(Math.random() * 11);
        this.y = y;
    };
}
    
let snake = new Snake(Config.width/2, Config.height/2);

let food = new Food(0, 0);

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