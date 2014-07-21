class Helpers  {
    constructor() {
      this.mouseX = 0;
      this.mouseY = 0;


    }


    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

     getMouseX(e)
    {

        var x = 0;

        if (e.x != undefined)
        {
            x = e.x;

        }
        else // Firefox method to get the position
        {

            x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;

        }

        return x;



    }
    getMouseY(e)
    {

        var y = 0;
        if (e.y != undefined)
        {

            y = e.y;
        }
        else // Firefox method to get the position
        {


            y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        return y;



    }

}