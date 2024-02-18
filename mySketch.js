var playerPos = 500;

//Ball starting position
var x = 800
var y = 500

//Player and Opponent starting score
var pScore = 0;
var oScore = 0;

function setup() {
	createCanvas(windowWidth / 2 + 400 ,windowHeight - 50);
	background(0);
	
	background(255)
	
	//ball starting speed
	xSpeed = -10
	ySpeed = 10
}

function draw() {
	background(0);
	drawBackground();

	//player Boost
	if (keyCode === SHIFT) {
		player(fill('red'));
	}

	ballPhysics();
	ball();

	opponent();
	player();

	playerScore();
	opponentScore();
	scoreChange();

	constrainToScreen();

	//Dash between the score
	fill('white');
	textSize(64);
	text("-", width / 2, height / 11);

	//Boost Instructions Text
	textSize(24);
	textAlign(CENTER);
	textFont('Times New Roman');
	fill('red')
	text("Hold Shift while moving to Boost", width / 2, height - 32);
}

//Ball collision physics
function ballPhysics() {
	rectMode(RADIUS);
	x = x + xSpeed;

	if (x <= 15 && x > -15 && y <= playerPos + 100 && y >= playerPos - 100) {
		x = 15;
		xSpeed = (xSpeed * -1) + 1;
	} else if (x >= width - 15 && x < width + 15) {
		x = width - 15;
		xSpeed = (xSpeed + 1) * -1;
	}

	y = y + ySpeed;

	if (y > height - 16) {
		y = height - 16;
		ySpeed = ySpeed * -1;
	} else if (y < 16) {
		y = 16;
		ySpeed = ySpeed * -1;
	}
}

function ball() {
	fill('white');
	stroke('black');
	circle(x, y, 32);
}

function opponent() {
	rectMode(CENTER);
	rect(width, y, 30, 200);
}

//Player Movement
function player() {
	if (keyIsDown(UP_ARROW)) {
		playerPos = playerPos - 10;
	}
	if (keyIsDown(DOWN_ARROW)) {
		playerPos = playerPos + 10;
	}

	//player position
	rectMode(CENTER);
	rect(0, playerPos, 30, 200);
}

//Constraining player paddle on screen
function constrainToScreen() {
	if (playerPos > height - 100) {
		playerPos = height - 100;
	} else if (playerPos < 100) {
		playerPos = 100;
	}
}

function playerScore() {
	fill('white');
	textSize(64);
	text(pScore, width / 2 - 128, height / 11);
}

function opponentScore() {
	fill('white');
	textSize(64);
	text(oScore, width / 2 + 128, height / 11);
}

//Change in player and opponent score
//Ball speed increase and reset
function scoreChange() {
	if (x <= 0) {
		oScore = oScore + 1;
		x = width / 2;
		y = height / 2;
		xSpeed = -10;
	} else if (x >= width) {
		pScore = pScore + 1;
		x = width / 2;
		y = height / 2;
		xSpeed = -10;
	}
}

//Background Pattern
function drawBackground() {
	for (let x = 0; x <= width + 20; x = x + 38) {
		for (let y = 0; y <= height + 20; y = y + 38) {
			drawSquare(x, y);
		}
	}
}

function drawSquare(x, y) {
	fill('rgb(21,21,21)');
	noStroke();
	rect(x - 2, y - 12, 25, 25);
}