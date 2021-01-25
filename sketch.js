var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var survivalTime;
var score = 0;
var gameState = PLAY;
var PLAY = 1;
var END = 0;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 600);

  monkey = createSprite(80, 570, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2;

  ground = createSprite(300, 590, 900, 20);
  ground.velocityX = -4;
  ground.shapeColor = "green";

  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("lightBlue");

  stroke("red");
  fill("red");
  textSize(18);
  text("Score: " + score, 20, 100);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 250, 50);


  monkey.collide(ground);

  if (keyDown("space") && monkey.y > 200) {
    monkey.velocityY = -9;
  }

  monkey.velocityY = monkey.velocityY + 0.9;



  if (ground.x > 0) {
    ground.x = ground.width / 2;
  }

  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score = score + 1;
  }

  drawSprites();
  create_banana();
  obstacles();
  
  if(obstacleGroup.isTouching(monkey))
    {
      gameState = END;
      ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);  
    }  
}

function create_banana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, Math.round(random(210, 400)), 20, 20);
    banana.velocityX = -9;
    banana.addImage(bananaImage);
    banana.scale = 0.11;
    banana.lifetime = 95;
    FoodGroup.add(banana)
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var rock = createSprite(800, 525, 20, 20);
    rock.velocityX = -9;
    rock.addImage(obstacleImage);
    rock.scale = 0.3;
    rock.lifetime = 100;
    obstacleGroup.add(rock);
  }
}