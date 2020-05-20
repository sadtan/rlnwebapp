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

  //var canvas = createCanvas(parentW, windowHeight* 0.6);
  var canvas = createCanvas(parentW, windowHeight* 0.6);
  canvas.parent('canvasp5');
  if (min(width, height) === height) {
    image(mySvg, width/2, height/2,  mySvg.width*height/mySvg.height, height);
  } else {
    image(mySvg, width/2, height/2, width, mySvg.height*width/mySvg.width);
  } 

  ////////////////////////////////////////
  //top-left reference point
  var p0 = {
    scrX: width/8,        // Minimum X position on screen
    scrY: 0,         // Minimum Y position on screen
    lat: 12.4748909033,    // Latitude
    lng: -79.1635583007     // Longitude
  }
  //bottom-right reference point
  var p1 = {
    scrX: parentW,          // Maximum X position on screen
    scrY: windowHeight* 0.6,        // Maximum Y position on screen
    lat: -4.23168726,    // Latitude
    lng: -66.85119071      // Longitude
  }
  var radius = 6.371;     //Earth Radius in Km

  function latlngToGlobalXY(lat, lng){
    //Calculates x based on cos of average of the latitudes
    let x = radius*lng*Math.cos((p0.lat + p1.lat)/2);
    //Calculates y based on latitude
    let y = radius*lat;
    return {x: x, y: y}
  }
  // Calculate global X and Y for top-left reference point
  p0.pos = latlngToGlobalXY(p0.lat, p0.lng);
  // Calculate global X and Y for bottom-right reference point
  p1.pos = latlngToGlobalXY(p1.lat, p1.lng);

  // This function converts lat and lng coordinates to SCREEN X and Y positions
  function latlngToScreenXY(lat, lng){
    //Calculate global X and Y for projection point
    let pos = latlngToGlobalXY(lat, lng);
    //Calculate the percentage of Global X position in relation to total global width
    pos.perX = ((pos.x-p0.pos.x)/(p1.pos.x - p0.pos.x));
    //Calculate the percentage of Global Y position in relation to total global height
    pos.perY = ((pos.y-p0.pos.y)/(p1.pos.y - p0.pos.y));

    //Returns the screen position based on reference points
    return {
        x: p0.scrX + (p1.scrX - p0.scrX)*pos.perX,
        y: p0.scrY + (p1.scrY - p0.scrY)*pos.perY
    }
  }
  

  // draw points
  console.log(latLongArr)
  for (let i = 0; i < latLongArr.length; ++i)
  {
    var pos = latlngToScreenXY(latLongArr[i].lat, latLongArr[i].long);
    

    //console.log(latLongArr[i].lat, latLongArr[i].long)
    image(azul, pos.x, pos.y, 25, 30);
    // if (i == 0)
    //   break;
  }
  // image(azul, random(100, width - 100), random(100, height - 100));
  // image(azul, random(100, width - 100), random(100, height - 100));
  // image(azul, random(100, width - 100), random(100, height - 100));
  // image(azul, random(100, width - 100), random(100, height - 100));

} 


    // min(width, height) === height
    //     ? image(mySvg, width/2, height/2, mySvg.width * height/mySvg.height, height)
    //     : image(mySvg, width/2, height/2, width, mySvg.height*width/mySvg.width);


function windowResized() { 
  resizeCanvas(parentW, windowHeight* 0.6); 

  if (min(width, height) === height) {
    image(mySvg, width/2, height/2,  mySvg.width*height/mySvg.height, height);
  } else {
    image(mySvg, width/2, height/2, width, mySvg.height*width/mySvg.width);
  } 
  ////////////////////////////////////////
  //top-left reference point
  var p0 = {
    scrX: width/8,        // Minimum X position on screen
    scrY: 0,         // Minimum Y position on screen
    lat: 12.4748909033,    // Latitude
    lng: -79.1635583007     // Longitude
  }
  //bottom-right reference point
  var p1 = {
    scrX: parentW,          // Maximum X position on screen
    scrY: windowHeight* 0.6,        // Maximum Y position on screen
    lat: -4.23168726,    // Latitude
    lng: -66.85119071      // Longitude
  }
  var radius = 6.371;     //Earth Radius in Km

  function latlngToGlobalXY(lat, lng){
    //Calculates x based on cos of average of the latitudes
    let x = radius*lng*Math.cos((p0.lat + p1.lat)/2);
    //Calculates y based on latitude
    let y = radius*lat;
    return {x: x, y: y}
  }
  // Calculate global X and Y for top-left reference point
  p0.pos = latlngToGlobalXY(p0.lat, p0.lng);
  // Calculate global X and Y for bottom-right reference point
  p1.pos = latlngToGlobalXY(p1.lat, p1.lng);

  // This function converts lat and lng coordinates to SCREEN X and Y positions
  function latlngToScreenXY(lat, lng){
    //Calculate global X and Y for projection point
    let pos = latlngToGlobalXY(lat, lng);
    //Calculate the percentage of Global X position in relation to total global width
    pos.perX = ((pos.x-p0.pos.x)/(p1.pos.x - p0.pos.x));
    //Calculate the percentage of Global Y position in relation to total global height
    pos.perY = ((pos.y-p0.pos.y)/(p1.pos.y - p0.pos.y));

    //Returns the screen position based on reference points
    return {
        x: p0.scrX + (p1.scrX - p0.scrX)*pos.perX,
        y: p0.scrY + (p1.scrY - p0.scrY)*pos.perY
    }
  }
  

  //image(azul, pos.x, pos.y);
  console.log(latLongArr)
  for (let i = 0; i < latLongArr.length; ++i)
  {
    var pos = latlngToScreenXY(latLongArr[i].lat, latLongArr[i].long);
    

    //console.log(latLongArr[i].lat, latLongArr[i].long)
    image(azul, pos.x, pos.y, 25, 30);
    // if (i == 0)
    //   break;
  }
}