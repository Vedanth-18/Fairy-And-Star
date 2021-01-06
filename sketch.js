var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody, starProperties;
var rectangle;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgImg = loadImage("images/starryNight.jpg");
	fairyVoice = loadSound("sound/JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	engine = Engine.create();
	world = engine.world;

	fairyVoice.play();
	var rectProperties= {
		isStatic:true,
		restitution: 0.4
	  }

	rectangle = Bodies.rectangle(546,694,160, 10, rectProperties);
	World.add(world, rectangle);

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;

	starProperties = {
		isStatic: true,
		restitution: 0.4,
		visible: false
	  }

	starBody = Bodies.circle(650 , 30 , 5 , starProperties);
	World.add(world, starBody);
	console.log(starBody);

	star = createSprite(starBody.position.x, starBody.position.y, 10,10);
	star.addImage(starImg);
	star.scale = 0.2;

	
	fairy.setCollider("circle", 490,-30 , 70);
    
	
	Engine.run(engine);
}


function draw() {
  background(bgImg);
  Engine.update(engine);
    star.x = starBody.position.x;
    star.y = starBody.position.y;
  if(keyDown(DOWN_ARROW)) { 
	Matter.Body.setStatic(starBody, false);
  }

  if(star.isTouching(fairy)) {
    Matter.Body.setStatic(starBody, true);
}
  fill("#c3d9fa");
  //rectMode(CENTER);
  rect(rectangle.position.x, rectangle.position.y, 250, 8);
  keyPressed();
  fill("white");
  textSize(60);
  textFont("Consolas");
  textStyle(BOLD);
  text("Fairy And Stars", 26,68);
  textSize(10);
  fill("white");
  textFont("Comic Sans");
  text(".Use Arrow to move the fairy", 565, 740);
  text(".Press own arrow to make the star fall",565, 720);
  drawSprites();
}

function keyPressed() {
	if(keyDown(LEFT_ARROW)) {
       fairy.x = fairy.x - 6;
	}
	if(keyDown(RIGHT_ARROW)) {
       fairy.x = fairy.x +6;
	}
}

