
var cHelper;
var IsDragging = false;
var W;
var H;
var F = 1.2;
var clickedMousePos = {x: 0, y: 0};
var lastMousePos = {x: 0, y: 0};
var IsClicked = false;
var imgOrigin = {x: 0, y: 0};

//
var wayPoints = [];

// 
var selectedPlace = -1;

//


document.getElementById("filter-creadores").addEventListener("click", FilterCreadores)
document.getElementById("filter-piezas").addEventListener("click", FilterPiezas)
var selectedCreadores = [];

var iLastSelected = undefined;


function FilterCreadores() {
    bFilterCreadores = true;
    ToggleButton();
    if( iLastSelected ) {
        for (let i = 0; i < docCreadores.length; ++i)
        {
            docCreadores[i].classList.add("d-none");
        }
        for (let i = 0; i < docCreadores.length; ++i)
        {
            docPiezas[i].classList.add("d-none");
        }
        for (let i = 0; i < docCreadores.length; ++i)
        {
            
            if (docCreadores[i].children[1].children[1].children[2].innerText == selectedPlace)
            {
                iLastSelected = selectedPlace;
                docCreadores[i].classList.remove("d-none");
                document.getElementById('intro-mapa').classList.add('d-none');
            }
                
        }

    }
}

function ToggleButton() {
    if (!bFilterCreadores) {
        document.getElementById("filter-creadores").style.backgroundColor = "#CDCDCD";
        document.getElementById("filter-piezas").style.backgroundColor = "#2727E5";
        
        
    } else {
        
        document.getElementById("filter-creadores").style.backgroundColor = "#2727E5";
        document.getElementById("filter-piezas").style.backgroundColor = "#CDCDCD";
        

    }
}
function FilterPiezas() {
    bFilterCreadores = false;
    ToggleButton();
    
    
    if( iLastSelected ) {
        for (let i = 0; i < docCreadores.length; ++i)
        {
            docCreadores[i].classList.add("d-none");
        }
        for (let i = 0; i < docCreadores.length; ++i)
        {
            docPiezas[i].classList.add("d-none");
        }

        for (let i = 0; i < docCreadores.length; ++i)
        {
            
            if (docCreadores[i].children[1].children[1].children[2].innerText == selectedPlace)
            {
                iLastSelected = selectedPlace;
                for (let j = 0; j < docPiezas.length; ++j)
                {
                    if (docPiezas[j].children[4].children[0].innerText  == docCreadores[i].children[1].children[1].children[3].innerText)
                    {
                        docPiezas[i].classList.remove("d-none");
                    }
                }
                // docCreadores[i].classList.remove("d-none");
                document.getElementById('intro-mapa').classList.add('d-none');
            }
                
        }
        
    }
}

function preload ()
{
    azul   = loadImage("./img/svg/blue.svg");
    red   = loadImage("./img/svg/red.svg");
    mySvg  = loadImage("./img/svg/colombia.svg");
    mySvgRed  = loadImage("./img/svg/colombia_azul.svg");
    blanco = loadImage("./img/svg/white.svg");
}

function setup ()
{
    $canvas = $('#canvasp5');
    $parent = $canvas.parent();
    parentW = $parent.width();

    //imageMode(CENTER);
    W = mySvg.width * windowHeight * 0.6 / mySvg.height;
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
    
    ToggleBtnZoom()
    noStroke(); 
    //stroke('black');
    rect(0, 0, width, height);
    if (bFilterCreadores) {
        W = mySvg.width * windowHeight * 0.6 / mySvg.height;
        H = windowHeight * 0.6;
        image(mySvg,    imgOrigin.x, imgOrigin.y, W + ( Zoom * 10 * W/H), height + (Zoom * 10 ))
    }
    
    else {
        W = mySvg.width * windowHeight * 0.6 / mySvg.height;
        H = windowHeight * 0.6;
        image(mySvgRed, imgOrigin.x, imgOrigin.y, W + ( Zoom * 10 * W/H), height + (Zoom * 10 ))
    }
    

    strokeWeight(5); 
    stroke('purple'); 
    

    var scrollEnabled = false;
    if (IsMouseOnCanvas())
    {
        window.addEventListener('scroll', noScroll);
        scrollEnabled = false;
    } else 
    {
        scrollEnabled = true;

        if (scrollEnabled)
        {
            window.removeEventListener('scroll', noScroll);
            scrollEnabled = false;
        }
    }

    if (IsDragging && IsMouseOnCanvas())
    {
        let speed = {x: winMouseX - pwinMouseX, y: winMouseY - pwinMouseY};
        
        if (abs(speed.x) != 0 || abs(speed.y) != 0)
        {
            // imgOrigin.x += (mouseX - clickedMousePos.x) / 10;
            // imgOrigin.y += (mouseY - clickedMousePos.y) / 10;
            imgOrigin.x += speed.x;
            imgOrigin.y += speed.y;
            
            imgOrigin.x = clamp(imgOrigin.x, -width - ( Zoom * 10 * W/H), 0);
            imgOrigin.y = clamp(imgOrigin.y, -height - (Zoom * 10 ));

            if (imgOrigin.y != 0)
            {
                cHelper.p1.scrY += speed.y;
            }
            if (imgOrigin.x != 0)
            {
                cHelper.p1.scrX += speed.x;
            }

            cHelper.p0.scrX = imgOrigin.x - 15;
            cHelper.p0.scrY = imgOrigin.y;

        }
    }

    for (let i = 0; i < wayPoints.length; ++i)
    {
        wayPoints[i].draw();
    }

    for (let o = 0; o < 10; ++o)
    {

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

                var dF = 0.1;

                if (D < 0.1)
                {
                    wayPoints[j].coords.x -= dF;
                    wayPoints[j].coords.y -= dF * (W/H);
                }
                //break;
                compList.push({i, j});
            } else break;
            
        }
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
    
    console.log("ZOOM", Zoom)
    //zFactor = clamp(zFactor, 0, zFactor * 2);

    if (Zoom >=  0 &&  Zoom <= zFactor * 15)
    {
        cHelper.p1.scrX += (zFactor * 10 * W/H);
        cHelper.p1.scrY += (zFactor * 10);
        console.log("IN", zFactor * 10)
    }
    Zoom = clamp(Zoom, 0, zFactor * 15);
}


function ZoomOut ()
{
    Zoom -= zFactor;
    
    
    console.log("ZOOM", Zoom)
    //zFactor = clamp(zFactor, 0, zFactor * 2);

    if (Zoom >=  0 &&  Zoom <= zFactor * 15)
    {
        cHelper.p1.scrX -= (zFactor * 10 * W/H);
        cHelper.p1.scrY -= (zFactor * 10);
        console.log("OUT", zFactor * 10)
    }
    Zoom = clamp(Zoom, 0, zFactor * 15);
}

// var dZ = 0.1;
// var bZooming = false;
// function ZoomDraw()
// {

// }

function ToggleBtnZoom() {
    if ( Zoom == zFactor * 15 ) {
        
        document.getElementById("btn-zoom-in").style.backgroundColor = "#CDCDCD";
    } else {
        document.getElementById("btn-zoom-in").style.backgroundColor = "#2727E5";
    }
    if ( Zoom == 0 )
        document.getElementById("btn-zoom-out").style.backgroundColor = "#CDCDCD";
    else {
        document.getElementById("btn-zoom-out").style.backgroundColor = "#2727E5" 
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
    document.getElementById("filter-creadores").classList.remove("d-none")
    document.getElementById("filter-piezas").classList.remove("d-none")

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
        docPiezas[i].classList.add("d-none");
    }
    selectedCreadores = [];

    for (let i = 0; i < docCreadores.length; ++i)
        if (docCreadores[i].children[1].children[1].children[2].innerText == selectedPlace)
            selectedCreadores.push(docCreadores[i].children[1].children[1].children[2].innerText);

    if ( bFilterCreadores )
        for (let i = 0; i < docCreadores.length; ++i)
        {
            
            if (docCreadores[i].children[1].children[1].children[2].innerText == selectedPlace)
            {
                iLastSelected = selectedPlace;
                docCreadores[i].classList.remove("d-none");
                document.getElementById('intro-mapa').classList.add('d-none');
            }
                
        }
    else 
    for (let i = 0; i < docCreadores.length; ++i)
        {
            
            if (docCreadores[i].children[1].children[1].children[2].innerText == selectedPlace)
            {
                iLastSelected = selectedPlace;
                for (let j = 0; j < docPiezas.length; ++j)
                {
                    if (docPiezas[j].children[4].children[0].innerText  == docCreadores[i].children[1].children[1].children[3].innerText)
                    {
                        docPiezas[i].classList.remove("d-none");
                    }
                }
                // docCreadores[i].classList.remove("d-none");
                document.getElementById('intro-mapa').classList.add('d-none');
            }
                
        }
    // for (let i = 0; i < docPiezas.length; ++i)
    //     {
    //         console.log(docPiezas[i].children[4].children[0].innerText)
    //         if ( selectedCreadores.indexOf(docPiezas[i].children[4].children[0].innerText) != -1)
    //         {
    //             iLastSelected = selectedPlace;
    //             docPiezas[i].classList.remove("d-none");
    //             document.getElementById('intro-mapa').classList.add('d-none');
    //         }
                
    //     }
}

function noScroll() 
{
    window.scrollTo(0, 0);
}

