var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var speedX = 2;
var speedY = -2;
var ballRadius = 10;
//Paddle variables
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth) / 2;
//Brick variables
var brickRows = 3;
var brickColumns = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
//Score stuff
var score = 0;
//Lives
var lives = 3;


//Creates the bricks
for (c = 0; c < brickColumns; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRows; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1
    }
  }
}
//Moves the paddle with controls
var leftPressed = false;
var rightPressed = false;
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);
function keyDownHandler(e){
	if(e.keyCode === 37){
  	leftPressed = true;
  }else if(e.keyCode === 39){
  	rightPressed = true;
  }
}
function keyUpHandler(e){
	if(e.keyCode === 37){
  	leftPressed = false;
  }else if (e.keyCode === 39){
  	rightPressed = false;
  }
}
//Mouse Movement
function mouseMoveHandler(e){
	var mouse = e.clientX - canvas.offsetLeft;
  if(mouse > 0 && mouse < canvas.width - paddleWidth){
  	paddleX = mouse - paddleWidth/2;
  }
}
//Draws the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
//Draws the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}
//Draws the bricks
function drawBricks() {
  for (c = 0; c < brickColumns; c++) {
    for (r = 0; r < brickRows; r++) {
      if (bricks[c][r].status === 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#663300";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function wallCheck() {
  if (y + speedY < ballRadius) {
    speedY = -speedY;
  } else if (y + speedY > canvas.height) {
  		lives--;
    	if(lives <= 0){
    		$("#gameOver").text("You lose you person that is bad at the game;;;;;;;;;");
    		setTimeout(function(){
    			ctx = null;
    		}, 100);
    	}else{
      		x = canvas.width/2;
        	y = canvas.height-30;
        	paddleX = (canvas.width-paddleWidth)/2;
        	speedY = 0;
        	speedX = 0;
        	$("#lives").text("You  have "+lives + " lives left");
          setTimeout(function(){
          	speedY = -2;
            speedX = 2;
          }, 1000);
      }
  }
  if (x + speedX < ballRadius || x + speedX > canvas.width - ballRadius) {
    speedX = -speedX;
  }
}
function drawLives(){
	ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.fillText("Lives: "+ lives, 10,10);
  
}
function paddleCheck(){
	if(y + speedY > canvas.height - ballRadius && x > paddleX && x < paddleX + paddleWidth){
  	speedY = -speedY;
  }
}

function brickCheck(){
	for (c = 0; c < brickColumns; c++) {
    for (r = 0; r < brickRows; r++) {
    	var brick = bricks[c][r];
      if(brick.status === 1){
      	if((x > brick.x && x < brick.x+brickWidth) && (y > brick.y && y< brick.y + brickHeight)){//The x and ys are just there to sort things
        	brick.status = -1;
          speedY = -speedY;
          score++;
          $("#score").text("Your current score is " + (score * 100));
          if(score === brickRows * brickColumns){
          	$("#gameOver").text("You just won your very own car XD");
            setTimeout(function(){
            	ctx = null;
            }, 100);
          }
        }
      }
    }
  }
}
function movePaddle(){
	if(leftPressed === true && paddleX > 0){
  	paddleX -= 5;
  }else if (rightPressed === true && paddleX < canvas.width - paddleWidth){
  	paddleX+= 5;
  }
}
//Runs everything 
function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  paddleCheck();
	wallCheck();
  brickCheck();
  movePaddle();
  drawLives();
  x += speedX;
  y += speedY;
}
setInterval(main, 10);