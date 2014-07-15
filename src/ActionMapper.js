class ActionMapper {

    constructor() {
        this.shooting = null;
        this.mouseDown = false;


    }


    handleMouseDown(e) {
        this.mouseDown = true;
        if(this.mouseDown) {
            var x = (e.offsetX || e.clientX - $(e.target).offset().left);
            var y = (e.offsetY || e.clientY - $(e.target).offset().top);
            //game.stateEngine.gameState.medic.newXpos = x;
            //game.stateEngine.gameState.medic.newYpos = y;
        }
       // printMessage("X:"+x+"Y:"+y);
        this.mouseDown = false;
    }

    handleMouseUp(event) {
        this.mouseDown = false;


    }


    handleMouseMove(e) {

        var canvas = document.getElementById("canvas");
        var x = 0;
        var y = 0;
        if (e.x != undefined && e.y != undefined)
        {
            x = e.x;
            y = e.y;
        }
        else // Firefox method to get the position
        {
            x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;


        camera.slideLeft = false;
        camera.slideRight = false;
        camera.slideUp = false;
        camera.slideDown = false;

        //var ydiv = (y / screenHeight);
        //var xdiv = (x / screenWidth);

        if(x<20)
            camera.slideLeft = true;

        if(x >(resolutionWidth-20))
            camera.slideRight = true;

        if(y<20)
          camera.slideUp = true;

        if(y>(resolutionHeight-20))
            camera.slideDown = true;




    }




/*
    handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;
    }

    handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }
    */

    handleKeys(elapsed) {

        //game.ship.setAccelerationOff(elapsed);
        //up
        /*
        if (currentlyPressedKeys[38]) {
            game.stateEngine.gameState.medic.setAccelerationOn(elapsed);
        }
        */
        //down
        /*
        if (currentlyPressedKeys[40]) {
            //game.ship.removeSpeed();
        }
        //left
        if (currentlyPressedKeys[37]) {
            game.stateEngine.gameState.medic.rotateLeft(elapsed);
        }
        //right
        if (currentlyPressedKeys[39]) {
            game.stateEngine.gameState.medic.rotateRight(elapsed);
        }
        */
        //spacebar
        /*
        if (currentlyPressedKeys[32]) {
            game.stateEngine.gameState.gun.shootBullet(elapsed);

        }
        */
    }


}

