let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let bodyLength = 16;
let step = 16;
let rows = canvas.height / step;
let columns = canvas.width / step;
let snake = [];
let x = 160;
let y = 304;
let xSpeed = step;
let ySpeed = 0;
let xFood = (Math.floor(Math.random() * rows - 1) + 1) * step;;
let yFood = (Math.floor(Math.random() * columns - 1) + 1) * step;
let food = 0;
let gameOver = [];

function drawSnake() {
	if (gameOver !== "GAME OVER") {
		for (let i = 0; i < snake.length - 1; ++i) {
			snake[i] = snake[i + 1];
		}
	}
	snake[food] = {x: x, y: y};
	ctx.beginPath();
	ctx.fillStyle = "blue";
	for (let i = 0; i < snake.length - 1; ++i) {
		ctx.fillRect(snake[i].x, snake[i].y, bodyLength, bodyLength);
	}
	ctx.fillRect(x, y, bodyLength, bodyLength);
	ctx.closePath();
	x += xSpeed;
	y += ySpeed;
}

function collisionCheck() {
	if (x > canvas.width - bodyLength) {
		document.getElementById('score').innerHTML = "GAME OVER";
		x = canvas.width - bodyLength;
		gameOver = "GAME OVER";
		document.getElementById('restart').removeAttribute("hidden");
	}
	if (x < 0) {
		document.getElementById('score').innerHTML = "GAME OVER";
		x = 0;
		gameOver = "GAME OVER";
		document.getElementById('restart').removeAttribute("hidden");
	}
	if (y > canvas.height - bodyLength) {
		document.getElementById('score').innerHTML = "GAME OVER";
		y = canvas.height - bodyLength;
		gameOver = "GAME OVER";
		document.getElementById('restart').removeAttribute("hidden");
	}
	if (y < 0) {
		document.getElementById('score').innerHTML = "GAME OVER";
		y = 0;
		gameOver = "GAME OVER";
		document.getElementById('restart').removeAttribute("hidden");
	}
	for (let i = 0; i < snake.length; ++i) {
		if (x === snake[i].x && y === snake[i].y) {
			gameOver = "GAME OVER";
			document.getElementById('score').innerHTML = "GAME OVER";
			document.getElementById('restart').removeAttribute("hidden");
			xSpeed = 0;
			ySpeed = 0;
		}
	}
}

function movingDirection(direction) {
	if (direction === 'Up' && xSpeed !== 0 && gameOver !== "GAME OVER") {
		xSpeed = 0;
		ySpeed = -step;
	}
	if (direction === 'Down' && xSpeed !== 0 && gameOver !== "GAME OVER") {
		xSpeed = 0;
		ySpeed = step;	
	}
	if (direction === 'Left' && ySpeed !== 0 && gameOver !== "GAME OVER") {
		xSpeed = -step;
		ySpeed = 0;
	}
	if (direction === 'Right' && ySpeed !== 0 && gameOver !== "GAME OVER") {
		xSpeed = step;
		ySpeed = 0;
	}
}

function foodLocation() {
	xFood = (Math.floor(Math.random() * rows - 1) + 1) * step;
	yFood = (Math.floor(Math.random() * columns - 1) + 1) * step;
}

function drawFood() {
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.fillRect(xFood, yFood, bodyLength, bodyLength);
	ctx.closePath();
	if (x === xFood && y === yFood) {
		++food;
		foodLocation();
		document.getElementById('points').innerHTML = food;
	}
}

function movingSnake() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFood();
	collisionCheck();
	drawSnake();
}

setInterval(movingSnake, 150);

window.addEventListener('keydown', (event) => {
	let direction = event.key.replace('Arrow', '');
	movingDirection(direction);
});
