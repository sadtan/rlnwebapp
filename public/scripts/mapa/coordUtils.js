var Zoom = 0;
var zFactor = 70;

class CoordHelper
{
    
    constructor(_width, _height)
    {
        this.radius =  6.371;

        this.p0 = 
        {
            scrX: - 15,            // Minimum X position on screen
            scrY: 0,            // Minimum Y position on screen
            lat: 12.4748909033, // Latitude
            lng: -79.1635583007 // Longitude
        }

        this.p1 = 
        {
            scrX: _width,      // Maximum X position on screen
            scrY: _height,    // Maximum Y position on screen
            lat: -4.23168726, // Latitude
            lng: -66.85119071 // Longitude
        }


        this.latlngToGlobalXY = function (lat, lng)
        {
            //Calculates x based on cos of average of the latitudes
            let x = this.radius*lng*Math.cos((this.p0.lat + this.p1.lat)/2);

            //Calculates y based on latitude
            let y = this.radius*lat;

            return {x: x, y: y}
        }

        // Calculate global X and Y for top-left reference point
        this.p0.pos = this.latlngToGlobalXY(this.p0.lat, this.p0.lng);
        // Calculate global X and Y for bottom-right reference point
        this.p1.pos = this.latlngToGlobalXY(this.p1.lat, this.p1.lng);
    }
    
    latlngToScreenXY = function (lat, lng)
    {
        //Calculate global X and Y for projection point
        let pos = this.latlngToGlobalXY(lat, lng);
        //Calculate the percentage of Global X position in relation to total global width
        pos.perX = ((pos.x-this.p0.pos.x)/(this.p1.pos.x - this.p0.pos.x));
        //Calculate the percentage of Global Y position in relation to total global height
        pos.perY = ((pos.y-this.p0.pos.y)/(this.p1.pos.y - this.p0.pos.y));

        //Returns the screen position based on reference points
        return {
            x: this.p0.scrX + (this.p1.scrX - this.p0.scrX)*pos.perX,
            y: this.p0.scrY + (this.p1.scrY - this.p0.scrY)*pos.perY
        }
    }
    
}