
var bFilterCreadores = true;
class WayPoint
{
    constructor (x, y, i)
    {
        this.coords = {x, y};
        this.index = i;
        this.pos = {x, y};
        this.pos = cHelper.latlngToScreenXY(this.coords.x, this.coords.y);
        this.white = loadImage("./img/svg/white.svg");
        this.blue = loadImage("./img/svg/blue.svg");
        this.red = loadImage("./img/svg/red.svg");

        this.wpW = this.white.width * 2 / 5;
        this.wpH = this.white.height * 2 / 5;
    }

    draw ()
    {
        this.pos = cHelper.latlngToScreenXY(this.coords.x, this.coords.y);

        if (Zoom == 0)
        {
            this.wpW = this.white.width * 1/2 + 10;
            this.wpH = this.white.height * 1/2 + 15;
        }
        else 
        {
            // this.wpW = this.white.width * 1 / (zFactor / Zoom ) + 10;
            // this.wpH = this.white.height * 1 / (zFactor / Zoom ) + 15;
            this.wpW = this.white.width * 1/2 + 10;
            this.wpH = this.white.height * 1/2 + 15;
        }
        
        if (this.IsMouseOver())
        {
            image(this.white, this.pos.x - this.wpW / 2, this.pos.y - this.wpH, this.wpW, this.wpH)
        }
        else 
        {
            bFilterCreadores ? 
            image(this.blue, this.pos.x - this.wpW / 2, this.pos.y - this.wpH, this.wpW, this.wpH) :
            image(this.red , this.pos.x - this.wpW / 2, this.pos.y - this.wpH, this.wpW, this.wpH);
        }
        
        // if (this.IsMouseOver())
        //     console.log(this.IsMouseOver());
        
        //point(this.pos.x, this.pos.y);
    }

    IsMouseOver ()
    {
        if 
        (
            mouseX > this.pos.x - this.wpW / 2
            && mouseX < this.pos.x + this.wpW / 2 
            && mouseY > this.pos.y - this.wpH
            && mouseY < this.pos.y
        )
        return true;

        return false;
    }
}