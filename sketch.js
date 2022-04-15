const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;
var star, star2, starImg, g_star, zerostar, onestar, twostar, stars;
var ballon;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var starcontrol = 0;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  
  starImg = loadImage("star.png");
  g_star = loadImage("g_star1.png");
  zerostar = loadAnimation("empty.png");
  onestar = loadAnimation("one_star.png");
  twostar = loadAnimation("stars.png");
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //botão 1
  button = createImg('cut_btn.png');
  button.position(180,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //botão 2
   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:200,y:90});
   rope2 = new Rope(7,{x:500,y:90});
   
   ballon = createImg("baloon2.png")
   ballon.position(300,400);
   ballon.size(120,120);
   ballon.mouseClicked(ApplyForce);


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  star = createSprite(350,50);
  star.addImage(starImg);
  star.addImage("g_star",g_star);
  star.scale = 0.03;

  star2 = createSprite(100,270);
  star2.addImage(starImg);
  star2.addImage("g_star",g_star);
  star2.scale = 0.03;

  stars = createSprite(80,50);
  stars.addAnimation("zero", zerostar);
  stars.addAnimation("one", onestar);
  stars.addAnimation("two",  twostar);
  stars.scale = 0.3;

  bunny = createSprite(120,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit, star, 50) == true){
    console.log("a");
    star.changeImage("g_star", g_star);
    star.scale = 0.09
    stars.changeAnimation("one", onestar);
    starcontrol = 1;
  }
  if(collide(fruit, star2, 50) == true){
    console.log("a");
    star2.changeImage("g_star", g_star);
    star2.scale = 0.09
    if(starcontrol == 0){
      stars.changeAnimation("one", onestar);
    }
    else{
      stars.changeAnimation("two", twostar);
    }
  }


  if(collide(fruit,bunny,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,v){
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=v)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}
function ApplyForce(){
  Matter.Body.applyForce(fruit, {x:0 ,y:0}, {x:0, y: -0.05});
  air.play();
}

