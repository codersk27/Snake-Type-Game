const canvas = document.getElementById("mycanvas");
const context = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;


const circle = {
    x: width / 2,
    y: height / 2,
    radius: 4
}

context.fillStyle = "white"

function drawCircle(x = circle.x, y = circle.y) {
    context.beginPath();
    context.arc(x, y, circle.radius, 0, Math.PI * 2);
    context.fill();
}


const snake = [
    [circle.x - 10 * 4, height / 2],
    [circle.x - 11 * 4, height / 2],
    [circle.x - 12 * 4, height / 2],
]

let interval = 0;
let score = 0;
let time = 50;
let count = 0;

function drawSnake() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    for (let i of snake) {
        // console.log(i[0], canvas.width);
        if ((i[0] >= circle.x - circle.radius && i[0] <= circle.x + circle.radius && i[1] >= circle.y - circle.radius && i[1] <= circle.y + circle.radius)) {
            circle.x = Math.floor((Math.random() * 1000) % canvas.width);
            circle.y = Math.floor((Math.random() * 1000) % canvas.height);
            // console.log(circle.x, circle.y);
            score += 10;
            count++;
            if (count == 5) {
                count = 0;
                time -= 5
            }
            document.getElementById("score").innerHTML = score;
        }
        drawCircle(i[0], i[1]);
    }
}

drawSnake();

let endgame = true;

function updateSnake(dir) {
    clearInterval(interval);
    interval = setInterval(() => {
        if (dir == 2) {
            snake.map(i => i[0] -= circle.radius);
        }
        if (dir == 3) {
            snake.map(i => i[0] += circle.radius);
        }
        if (dir == 0) {
            snake.map(i => i[1] -= circle.radius);
        }
        if (dir == 1) {
            snake.map(i => i[1] += circle.radius);
        }
        if (snake[0][0] >= canvas.width || snake[0][0] <= 0 || snake[0][1] >= canvas.height || snake[0][1] <= 0) {
            clearInterval(interval);
            context.fillRect(0, 0, canvas.width, canvas.height);

            alert(`Your Score: ${score}`);
            score = 0;
            endgame = false;
        } else {
            drawSnake();
        }
    }, time);
}

document.addEventListener("keydown", (event) => {

    if (endgame) {
        if (event.key === "ArrowUp") {
            // console.log("up");
            updateSnake(0)
        }
        if (event.key === "ArrowDown") {
            // console.log("down");
            updateSnake(1)
        }
        if (event.key === "ArrowLeft") {
            // console.log("left");
            updateSnake(2)
        }
        if (event.key === "ArrowRight") {
            // console.log("right");
            updateSnake(3)
        }
    } else {
        alert("reload to replay")
    }
});
