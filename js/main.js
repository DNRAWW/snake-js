const canvas = document.getElementById('gameField');
const ctx = canvas.getContext('2d');

class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };
}
    
class Snake extends Entity {
    constructor(x, y) {
        super(x, y);
        this.size = 3;
    };
    
    eat(){
        this.size++;
    };
    
    moveX(){
        x++;
    };
    
    moveY(){
        y++;
    };
}

class Food extends Entity {
    constructor(x, y) {
        super(x, y);
    };
    
    // random = () => Math.floor(Math.random()*11);

    eaten(x, y){
        this.x = x;
        this.y = y;
    };
}
    
let snake = new Snake(10, 20);

console.log(`x - ${snake.x}, \ny - ${snake.y}, \nsize - ${snake.size}`)

let food = new Food(20, 10);

console.log(`x - ${food.x}, \ny - ${food.y}`);