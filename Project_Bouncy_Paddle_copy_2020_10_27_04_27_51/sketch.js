var paddle,ball;

var paddleImg,ballImg;

var gameState;

var score;

function preload(){
  paddleImg=loadImage("paddle.png");
  ballImg=loadImage("ball.png");
}

function setup(){
  createCanvas(400,400);
  paddle=createSprite(390,200,10,70);
  ball=createSprite(200,200,12,12);
  paddle.addImage("paddle",paddleImg);
  ball.addImage("ball",ballImg);
  score=0;
  gameState="serve";
}

function draw(){
  background("white");
  edges=createEdgeSprites();
  
  if(gameState==="serve"){
    text("Press Space Key to serve.",150,100);
    
  }
  
  if(keyDown("space") && gameState==="serve"){
    ball.velocityX=9;
    ball.velocityY=3;
    gameState="play";
  }
  
  if(gameState==="play"){
    if(keyDown(UP_ARROW)){
      paddle.y=paddle.y-20;
    }
    else if(keyDown(DOWN_ARROW)){
      paddle.y=paddle.y+20;
    }
    
    if(ball.isTouching(edges[0]) || ball.isTouching(edges[2]) || ball.isTouching(edges[3]) ||
      ball.isTouching(paddle)){
      
      ball.bounceOff(edges[0]);
      ball.bounceOff(edges[2]);
      ball.bounceOff(edges[3]);
      ball.bounceOff(paddle);
    }
    
    
    if(ball.isTouching(edges[1]) ){
      gameState="end";
    }
  }
  
  else if(gameState==="end"){
    
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    paddle.x=390;
    paddle.y=200;
    ball.visible=false;
    paddle.visible=false;
    text("Click on 'R' to restart the game.",150,180);
    if(keyDown("R")){
      
      gameState="serve";
      ball.visible=true;
      paddle.visible=true;
    }
  }
  
  drawSprites();
}