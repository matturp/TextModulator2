var gui;
var gui2;
var defineSize = 100;
var fillColor = '#FFFFFF';
var canvasColor = '#000000';
var write = 'write';
let roboto;
let hiArray;
var rotation = 0;
var dynamicRotation = false;
var dynamicRotationAmount = 0;
var fidelity = 0.1;
var fidelityMin = 0.01;
var fidelityMax = 0.3;
var fidelityStep = 0.01;
var objectType = ['circle','square','line','vertex'];
var outline = false;
var strokeAmount = 1;
var strokeAmountMin = 1;
var strokeAmountMax = 100;
var strokeAmountStep = 1;
var strokeColor = '#FFFFFF';
var circleRadius = 10;
var squareLength = 10;
var lineLength = 10;
var xPosition = 0;
var xPositionMin = -1000;
var yPosition = 0;
var yPositionMin = -1000;

function preload(){
  roboto = loadFont('assets/RobotoMono-Bold.ttf');
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  gui = createGui('VARIABLES 01').setPosition(50, 50);
  sliderRange(0,1000,10);
  gui.addGlobals('fillColor','strokeColor','canvasColor','xPosition','yPosition', 'defineSize','write','fidelity','objectType','outline','strokeAmount','rotation','dynamicRotation','dynamicRotationAmount');

  gui2 = createGui('VARIABLES 02').setPosition(windowWidth - 250, 50);
  sliderRange(0,100,2);
  gui2.addGlobals('circleRadius','squareLength','lineLength');

  frameRate(60);
  textFont(roboto);
  
}

function draw() {
  background(canvasColor);
  textAlign(CENTER);

  push();
  textSize(10);
  noStroke();
  text('Press ENTER to save your sketch',windowWidth/2,windowHeight - 50);
  pop();

  translate(windowWidth/2,windowHeight/2);
  stroke(strokeColor);
  strokeWeight(strokeAmount);
  textSize(defineSize);
  //text('hello',0,0);

  if (outline == false){

    fill(fillColor);
   
    } else {
  
    noFill();
    
    }

  hiArray = roboto.textToPoints(write,xPosition,yPosition,defineSize, {

    sampleFactor: fidelity

  });


  rotate(rotation);

  
  beginShape();

  for (let i = 0; i < hiArray.length; i++){

   

    if (dynamicRotation == true){

      rotate(rotation);
      rotation = rotation + radians(dynamicRotationAmount);
    }
    
    switch(objectType){

    case 'circle':
    ellipse(hiArray[i].x, hiArray[i].y,circleRadius,circleRadius);
    break;

    case 'square':
    rectMode(CENTER);
    rect(hiArray[i].x, hiArray[i].y,squareLength,squareLength);
    break;

    case 'line':
    push();
    translate(hiArray[i].x, hiArray[i].y);
    line(0, 0, lineLength,lineLength);
    pop();
    break;

    case 'vertex':
    push();
    vertex(hiArray[i].x, hiArray[i].y);
    pop();
    break;
}
}
endShape();
}

function keyPressed(){

  if (keyCode === ENTER) {
    save('sketch.png');
  }
}