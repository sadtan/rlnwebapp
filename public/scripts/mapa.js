function preload(){
    mySvg = loadImage("./img/svg/colombia.svg");
    blanco = loadImage("./img/svg/white.svg");
    azul = loadImage("./img/svg/blue.svg");
}

function setup() { 
  $canvas = $('#canvasp5');
  $parent = $canvas.parent();
  parentW = $parent.width();

  imageMode(CENTER);

  var canvas = createCanvas(parentW, windowHeight* 0.6);
  canvas.parent('canvasp5');

  if (min(width, height) === height) {
    image(mySvg, width/2, height/2,  mySvg.width*height/mySvg.height, height);
  } else {
    image(mySvg, width/2, height/2, width, mySvg.height*width/mySvg.width);
  } 

  image(azul, random(100, width - 100), random(100, height - 100));
  image(azul, random(100, width - 100), random(100, height - 100));
  image(azul, random(100, width - 100), random(100, height - 100));
  image(azul, random(100, width - 100), random(100, height - 100));

} 

function windowResized() { 
  resizeCanvas(parentW, windowHeight* 0.6); 

  if (min(width, height) === height) {
    image(mySvg, width/2, height/2,  mySvg.width*height/mySvg.height, height);
  } else {
    image(mySvg, width/2, height/2, width, mySvg.height*width/mySvg.width);
  } 
}