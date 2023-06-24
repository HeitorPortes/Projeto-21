var PLAY = 1;
var END = 0;
var GameState = PLAY;

var tucano, tucano_voando, tucano_space, tucano_collided;
var ground, groundGif;

var nuvemGroup, nuvemGif;
var obstaculosGroup, carcara, coruja, bemTV;

var invesibleBlock;

var score;

var restartGif, gameOverGif;

function preload(){
    tucano_voando = loadImage("tucano1.gif");
    tucano_space = loadImage("tucano2.gif");
    tucano_collided = loadImage("tucano3.gif");

    groundGif = loadImage("Ground.gif");

    nuvemGif = loadImage("nuvem.gif");

    carcara = loadImage("carcara.gif");
    coruja = loadImage("coruja.gif");
    bemTV = loadImage("bemtv.gif");

    restartGif = loadImage("restart.gif");
    gameOverGif = loadImage("gameOver.gif");

}

function setup() {
    createCanvas(600, 200);
    
    ground = createSprite(200,180,400,20);
  ground.addImage(groundGif);
  ground.x = ground.width /2;
  ground.scale=1000000000000;
    
    tucano = createSprite(50,100,20,50);
    tucano.addImage(tucano_voando);
    
    tucano.scale = 4;

    invesibleBlock=createSprite(300,1,1000,10);
    invesibleBlock.visible = false;

   

    gameOver = createSprite(300,100);
  gameOver.addImage(gameOverGif);

  restart = createSprite(300,140);
  restart.addImage(restartGif);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);

  score = 0;

}

function draw() {
    background(180);
  
  text("Score: "+ score, 500,50);
  
  console.log(GameState);



  if(GameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    
    ground.velocityX = -(6
      +score/1000);
    
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyWentDown("space")&& tucano.y >= 100) {
        tucano.velocityY = -12;
        tucano.addImage("space",tucano_space);
    }

    if(keyWentUp("space")){
      tucano.addImage("voando",tucano_voando);
    }
    
    tucano.velocityY = tucano.velocityY + 0.8
  
    spawnClouds();
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(tucano)){
        gameState = END;
    }
  
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      tucano.velocityY = 0
     
      tucano.changeAnimation("collided", tucano_collided);
     
    obstaclesGroup.setLifetimeEach(-1);
    nuvemGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     nuvemGroup.setVelocityXEach(0);
   }

    drawSprites();

 
}

function reset(){
    GameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    tucano.addImage("collided",tucano_collided);
  
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    score = 0;
  
    trex.changeAnimation("running", trex_running);
  }

  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(400,165,10,40);
      obstacle.velocityX = -(6+score/1000);
      
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle.addImage(bemTV);
                 break;
         case 2: obstacle.addImage(carcara);
                 break;
         case 3: obstacle.addImage(coruja);
                 break;
         default: break;
       }

       obstacle.scale = 1.5;
       obstacle.lifetime = 300;
      
       obstaclesGroup.add(obstacle);
    }
   }

   function spawnClouds() {
    if (frameCount % 60 === 0) {
       nuvem = createSprite(600,100,40,10);
      nuvem.y = Math.round(random(10,60));
      nuvem.addImage(nuvemGif);
      nuvem.scale = 0.5;
      nuvem.velocityX = -3;
      
      nuvem.lifetime = 134;
      
      nuvem.depth = tucano.depth;
      tucano.depth = tucano.depth + 1;
      
     cloudsGroup.add(nuvem);
      }
  }