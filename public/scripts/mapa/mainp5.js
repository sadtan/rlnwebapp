
var cHelper;
var IsDragging = false;
var W;
var H;
var F = 2;
var clickedMousePos = {x: 0, y: 0};
var lastMousePos = {x: 0, y: 0};
var IsClicked = false;
var imgOrigin = {x: 0, y: 0};

//
var wayPoints = [];

// 
var selectedPlace = -1;

function preload ()
{
    azul   = loadImage("./img/svg/blue.svg");
    mySvg  = loadImage("./img/svg/colombia.svg");
    blanco = loadImage("./img/svg/white.svg");
}

function setup ()
{
    $canvas = $('#canvasp5');
    $parent = $canvas.parent();
    parentW = $parent.width();

    //imageMode(CENTER);
    W = mySvg.width*windowHeight * 0.6/mySvg.height;
    H = windowHeight * 0.6;

    var canvas = createCanvas( W, H );
    cHelper = new CoordHelper( W, H );

    canvas.parent('canvasp5');

    for (let i = 0; i < latLongArr.length; ++i)
        wayPoints.push(new WayPoint(latLongArr[i].lat, latLongArr[i].long, latLongArr[i].id));


    // for (let i = 0; i < latLongArr.length; ++i)
    // {
        
    //     for (let j = 0; j < latLongArr.length; ++j)
    //     {
    //         if (i != j)
    //         {
    //             var dPos1 = cHelper.latlngToScreenXY(latLongArr[i].lat, latLongArr[i].long);
    //             var dPos2 = cHelper.latlngToScreenXY(latLongArr[j].lat, latLongArr[j].long);

    //             var yDir = dPos1.y - dPos2.y;
    //             var xDir = dPos1.x - dPos2.x;

    //             var D = Math.sqrt
    //             ( 
    //                 Math.pow(xDir, 2)
    //                 +  Math.pow(yDir, 2)
    //             );

    //             console.log("Y DIR", dPos1.y - dPos2.y);
                
    //             var dF = 0.2;
    //             if (D < 100)
    //             {
    //                 yDir < 0 ? latLongArr[i].lat += dF : latLongArr[i].lat += dF;
    //                 xDir < 0 ? latLongArr[i].long += dF : latLongArr[i].long += dF;   
    //             }
    //         }
            
    //     }
    //     if (i == 0) break;
    // }

    
    
}

function draw ()
{
    
    noStroke(); 
    //stroke('black');
    rect(0, 0, width, height);

    image(mySvg, imgOrigin.x, imgOrigin.y, mySvg.width*height/mySvg.height + (Zoom * 30 * W/H), height + (Zoom * 30 ))

    strokeWeight(5); 
    stroke('purple'); 
    

    // var scrollEnabled = false;
    // if (IsMouseOnCanvas())
    // {
    //     window.addEventListener('scroll', noScroll);
    //     scrollEnabled = false;
    // } else 
    // {
    //     scrollEnabled = true;

    //     if (scrollEnabled)
    //     {
    //         window.removeEventListener('scroll', noScroll);
    //         scrollEnabled = false;
    //     }
    // }

    if (IsDragging && IsMouseOnCanvas())
    {
        let speed = {x: winMouseX - pwinMouseX, y: winMouseY - pwinMouseY};
        
        if (abs(speed.x) != 0 || abs(speed.y) != 0)
        {
            // imgOrigin.x += (mouseX - clickedMousePos.x) / 10;
            // imgOrigin.y += (mouseY - clickedMousePos.y) / 10;
            imgOrigin.x += speed.x;
            imgOrigin.y += speed.y;
            
            imgOrigin.x = clamp(imgOrigin.x, -width, 0);
            imgOrigin.y = clamp(imgOrigin.y, -height, 0);

            if (imgOrigin.y != 0)
            {
                cHelper.p1.scrY += speed.y;
            }
            if (imgOrigin.x != 0)
            {
                cHelper.p1.scrX += speed.x;
            }

            cHelper.p0.scrX = imgOrigin.x;
            cHelper.p0.scrY = imgOrigin.y;

        }
    }

    for (let i = 0; i < wayPoints.length; ++i)
    {
        wayPoints[i].draw();
    }

    var compList = [];
    for (let i = 0; i < wayPoints.length; ++i)
    {
        for (let j = 0; j < wayPoints.length; ++j)
        {
            if (i != j && !IsCompared(i, j))
            {
                var dPos1 = wayPoints[i].coords;
                var dPos2 = wayPoints[j].coords;

                var yDir = dPos1.y - dPos2.y;
                var xDir = dPos1.x - dPos2.x;
                var D = Math.sqrt
                ( 
                    Math.pow(xDir, 2)
                    +  Math.pow(yDir, 2)
                );

                var dF = 0.6;

                if (D < 0.5)
                {
                    wayPoints[j].coords.x -= dF;
                    wayPoints[j].coords.y -= dF * (W/H);
                }
                //break;
                compList.push({i, j});
            } else break;
            
        }
    }

    function IsCompared(i, j)
    {
        for (let c = 0; c < compList.length; ++c)
        {
            if ((compList[c]['i'] == i && compList[c]['j'] == j) || (compList[c]['j'] == i && compList[c]['i'] == j))
            {
                return true;
            }
        }
        return false;
    }

}

// function mouseWheel (e)
// {
//     if (IsMouseOnCanvas())
//     {
//         (e.delta > 0) ? ZoomOut() : ZoomIn();
//     }
// }

document.getElementById("btn-zoom-out").addEventListener('click', ZoomOut);
document.getElementById("btn-zoom-in").addEventListener('click', ZoomIn)

function ZoomIn ()
{
    Zoom += zFactor;
    Zoom = clamp(Zoom, 0, 3);
    if (Zoom !=  0 && Zoom != 3)
    {
        cHelper.p1.scrX += (Zoom * 30 * W/H + 20) / F;
        cHelper.p1.scrY += (Zoom * 30) / F;
    }
}


function ZoomOut ()
{
    Zoom -= zFactor;
    Zoom = clamp(Zoom, 0, 3);
    if (Zoom !=  0 && Zoom != 3)
    {
        cHelper.p1.scrX -= (Zoom * 30 * W/H + 20) / F;
        cHelper.p1.scrY -= (Zoom * 30) / F;
    }
}

function clamp(num, min, max) 
{
    return num <= min ? min : num >= max ? max : num;
}

function IsMouseOnCanvas ()
{
    if 
    (
        mouseX > 0 
        && mouseX < width
        && mouseY > 0
        && mouseY < height
    )
    return true;

    return false;
}

function mousePressed()
{
    clickedMousePos.x = mouseX;
    clickedMousePos.y = mouseY;

    IsClicked = true;
    lastMousePos = {x: mouseX, y:mouseY}; 

    IsDragging = true;
}

function mouseReleased() 
{
    IsClicked = false;
    IsDragging = false;

    for (let i = 0; i < wayPoints.length; ++i)
    {
        if (wayPoints[i].IsMouseOver())
            selectedPlace = wayPoints[i].index;
    }

    for (let i = 0; i < docCreadores.length; ++i)
    {
        docCreadores[i].classList.add("d-none");
    }

    for (let i = 0; i < docCreadores.length; ++i)
    {
        if (docCreadores[i].children[1].children[1].children[2].innerText == selectedPlace)
        {
            docCreadores[i].classList.remove("d-none");
            document.getElementById('intro-mapa').classList.add('d-none');
        }
            
    }
}

function noScroll() 
{
    window.scrollTo(0, 0);
}

