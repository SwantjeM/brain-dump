let r = 100;
let startTime;
let BoxTime;
let x,y
let message;


function setup() {
  let canvas =createCanvas(400, 400);
  canvas.parent('p5-container');
  frameRate(60)
  startTime = millis();
  x=100;
  y=350;
  textSize(24);
  textStyle(BOLD);
}

function writeText(message){
  x=200 - textWidth(message)/2;
  text(message, x, y)
}

function breathe_in(){
  elapsedTime = (millis()-startTime)/1000;
  BoxTime = elapsedTime % 16
  if(BoxTime <4){
    r += 100/240;
    message = "INHALE"
  }
  if(BoxTime >=4 && BoxTime<8){
   // r += 100/240;
    message = "HOLD"
  }
  if(BoxTime >=8 && BoxTime < 12){
    r -= 100/240;
    message = "EXHALE"
  }
  if(BoxTime >=12 && BoxTime<16){
   // r += 100/240;
    message = "HOLD"
  }
}

function draw() {
  
  background(239, 180, 16);
  noFill();
  stroke(255);
  strokeWeight(5)
  ellipse(200, 200, 200, 200)
  noStroke();
  fill(247, 218, 136);
  breathe_in()
  ellipse(200,200,r, r)
  fill(255)
  writeText(message)
  
}