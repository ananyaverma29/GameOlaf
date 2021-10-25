const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var olaf, elsa, backgroundImg, olafImage, snowMountainImageRight,snowMountainImageLeft,snowball,cannon;
var balls = [];
var invisibleWall1, invisibleWall2, iceCageImage, rightArmImage,elsaWalkingLeft, snowmanImage,greyStarImage,leftArmImage, elsaInStarImage, elsaWalkingRight;
var  elsaWalkingLeft;
var elsa;
var cannon;
var score =0;
//var snowBackground;
var cage;
function preload()
{
    backgroundImg = loadImage("moving background.gif");
    snowMountainImageRight = loadImage("snowMountainRightReal.png");
    snowMountainImageLeft = loadImage("snowMountainleftReal.png");
    olafImage = loadImage("olafwithouthands.png");
    iceCageImage = loadImage("icecage.png");
    elsaRightImage = loadImage("elsaMoving.png","elsaMoving2.png");
    snowmanImage = loadImage("snowman2.png");
    starImage = loadImage("star.png");
    elsaInStarImage = loadImage("elsa1.png");
    greyStarImage = loadImage("greystar.png");
    //leftArmImage = loadImage("leftArm.png");
    rightArmImage = loadImage("rightArm.png");
    elsaWalkingRight = loadImage("ElsaMovingRight2.png");
    elsaWalkingLeft = loadImage("elsaMoving2.png");
}
function setup()
{
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
    createCanvas(windowWidth, windowHeight);
    var snowBackground = createSprite(width/2, height/2);
    backgroundImg.resize(width,height);
    snowBackground.addImage("snowbackground",backgroundImg);
    //snowBackground.scale = 5.5;
    var edge = createEdgeSprites();
    var snowMountainLeft = createSprite(300,619,10,1000);
    snowMountainLeft.addImage("snowMountainLeft", snowMountainImageLeft);
    snowMountainLeft.scale = 1;

    var snowMountainRight = createSprite(1210,700,10,1000);
    snowMountainRight.addImage("snowMountainRight", snowMountainImageRight);
    snowMountainRight.scale = 1;
    
     var snowman = createSprite(width/2,height/2);
     snowman.addImage("snowman", snowmanImage);
    

     snowman.scale = 0.3;

    var olaf = createSprite(width/2-500,height/2-60,70,70);

    olaf.addImage(olafImage);

    
    olaf.scale = 0.2;

  //  var olafLeftArm = createSprite(width/2-427,height/2-20,70,70);
  //  olafLeftArm.addImage(leftArmImage);
  
   // olafLeftArm.scale = 0.11;
      cannon = new Cannon(width/2-427,height/2-20,70,70);

    var olafRightArm = createSprite(width/2-577, height/2-25,70,70);
    olafRightArm.addImage(rightArmImage);
    
    olafRightArm.scale = 0.11;

    var iceCage1 = createSprite(width/2+500, height/2+85, 50,50);
    iceCage1.addImage(iceCageImage);
    iceCage1.scale = 1;
     
    var iceCage2 = createSprite(width/2+ 570, height/2-30, 50,50);//top ice cage
    iceCage2.addImage(iceCageImage);
    iceCage2.scale = 1;

    var iceCage3 = createSprite(width/2+ 650, height/2+85, 50,50);
    iceCage3.addImage(iceCageImage);
    iceCage3.scale = 1;
    cage = [iceCage1,iceCage2,iceCage3];
    var star = createSprite(100,100,50,50);
    star.addImage(starImage);
    star.scale= 0.3;

    var elsaInStar = createSprite(105,90,50,50);
    elsaInStar.addImage(elsaInStarImage);
   // elsaInStar.scale = 0.09;
    elsaInStar.scale = 0.05;
}
function draw()
{
    invisibleWall1 = createSprite(width/2+525,height/2-30, 29, 200);
    //invisibleWall1.visible = true;

     
  invisibleWall2 = createSprite(width/2+620,height/2-30, 30, 200);
   // invisibleWall2.visible = true;
  
    elsa = createSprite(width/2+565, height/2-20, 50,50);
    //elsaRight.addAnimation("elsaMoving",elsaRightImage); 
    elsa.addImage("walkingRight", elsaWalkingRight);
    elsa.addImage("walkingLeft", elsaWalkingLeft);
    elsa.scale = 0.6;
    elsa.velocityX=0.5;
    elsa.scale = 0.5;
    elsa.bounceOff(invisibleWall1,()=>{
        elsa.changeImage("walkingRight",elsaWalkingRight)

    });
    elsa.bounceOff(invisibleWall2,()=>{
        elsa.changeImage("walkingLeft",elsaWalkingLeft)
    });
    
   for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithCage(i);
  }
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithCage(i);
  }
  
  cannon.display();
  fill("#6d4c41");
  textSize(40);
  text(`Score:${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);
    drawSprites();
}
function collisionWithCage(index) {
  for (var i = 0; i < cage.length; i++)
  {
    if (balls[index] !== undefined && cage[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, cage[i].body);

      if (collision.collided) {
        score+=5
          cage[i].remove(i);


        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}
function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      waterSound.play()  
      ball.remove(index);
      
    }
  }
}
function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    cannonExplosion.play();
    balls[balls.length - 1].shoot();
  }
}



