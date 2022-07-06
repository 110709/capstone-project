var path,bomb;
var bomb,stick,banana;
var pathImg,bombImg1;

var gameOverImg,restartImg;

var bombG, stickG,bananaG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;
var select_obstacles=Math.round(Math.random(1,3));
function preload(){
  pathImg = loadImage("Road.png");
  //girlImg = loadAnimation("girl running.png");
  
  bombImg = loadAnimation("bomb.jpg");
  stickImg = loadAnimation("stick.jpg");
  bananaImg= loadAnimation("banana-peel.jpg");
  
  gameOverImg = loadImage("game over.png");
  restartImg = loadImage("restart.png");
  
}

function setup(){
  
createCanvas(1200,300);

path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
bomb  = createSprite(70,150);
bomb.addAnimation("Running",bombImg);
bomb.scale=0.07;
  
bomb.setCollider("rectangle",0,0,40,40);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
bombG = new Group();
stickG = new Group();
bananaG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   bomb.y = World.mouseY;
  
   edges= createEdgeSprites();
   bomb .collide(edges);
  
  
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    
  
  
  
  
  if (World.frameCount % 150 == 0) {
    if (select_obstacles == 1) {
      banana();
    } else if (select_obstacles == 2) {
      stick();
    } else {
      bomb();
    }
  }
  
   if(bombG.isTouching(bomb)){
     gameState = END;
     bomb.velocityY = 0;
     
    }
    
    if(stickG.isTouching(bomb)){
      gameState = END;
      stick.velocityY = 0;
     
    }
    
    if(bananaG.isTouching(bomb)){
      gameState = END;
      banana.velocityY = 0;
      
    }
    
}else if (gameState === END) {
    gameOverImg.visible = true;
   restartImg.visible = true;

    textSize(20);
    fill(255);
    text("Press restart to Restart the game!", 500,200);
  
    path.velocityX = 0;
    bomb.velocityY = 0;
    
  
    bombG.setVelocityXEach(0);
    bombG.setLifetimeEach(-1);
  
    stickG.setVelocityXEach(0);
    stickG.setLifetimeEach(-1);
  
    bananaG.setVelocityXEach(0);
    bananaG.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      console.log("Restart the Game");
      reset();
    }
   }
  
    drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOverImg.visible = false;
  restartImg.visible= false;
  bomb.changeAnimation("Running" , bombrunning);

  bomb.destroyEach();
  stick.destroyEach();
  banana.destroyEach();
  score = 0
  

}
    

     



function bomb(){
        bomb =createSprite(1100,Math.round(random(50, 250)));
        bomb.scale =0.06;
        bomb.velocityX = -(6 + 2*distance/150);
        bomb.addAnimation("bomb",bomb);
        bomb.setLifetime=170;
        bombG.add(bomb);
}

function stick(){
        stick =createSprite(1100,Math.round(random(50, 250)));
        stick.scale =0.06;
        stick.velocityX = -(6 + 2*distance/150);
        stick.addAnimation("stick",stick);
        stick.setLifetime=170;
        stickG.add(stick);
}

function banana(){
        banana =createSprite(1100,Math.round(random(50, 250)));
        banana.scale =0.06;
        banana.velocityX = -(6 + 2*distance/150);
        banana.addAnimation("opponentbanana",oppRed1Img);
        banana.setLifetime=170;
        bananaG.add(banana);
}



