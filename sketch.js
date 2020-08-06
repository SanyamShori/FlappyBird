
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var back;

var bird;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameOver;

function preload(){
 
  backImg = loadImage("back.png");
  
  birdImg = loadImage("bird.png");
  
  dieSound = loadSound("die.mp3");
  flapSound = loadSound("flap.mp3");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  back = createSprite(200,200,400,400);
  back.addImage(backImg);
  back.scale = 2;
  
  bird = createSprite(100,200,20,20);
  bird.addImage(birdImg);
  
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;

  gameOver.visible = false;
  
  obstaclesGroup = new Group();
}

function draw() {
  background(255);
  
  
    if (gameState === PLAY) 
  {
    
    //moving background
    back.velocityX = -1;    
  
    if (back.x < 0){
      back.x = back.width;
    }
  
   //bird jumps when space key is pressed
    if (keyWentDown("space")) {
      bird.velocityY = -15;
      flapSound.play();
   }
  
   if (keyWentUp("space")) {
      bird.velocityY = 0;
    }
    
    bird.velocityY = bird.velocityY + 0.8;
}
  
 if(obstaclesGroup.isTouching(bird)){
      obstaclesGroup.destroyEach();
      dieSound.play();
      gameState = END;
     
    }
    
  else if (gameState === END) {
    gameOver.visible = true;
    
    back.velocityX = 0;
    bird.velocityY = 0;
    bird.velocityX = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    
  }
  
  spawnObstacles();
  
  drawSprites();
 
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,30,10,40);
    obstacle.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(4,6));
    switch(rand) {
      
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
    
  }
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,320,10,40);
    obstacle.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }

}

