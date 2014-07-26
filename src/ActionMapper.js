class ActionMapper {

    constructor() {
        this.shooting = null;
        this.mouseDown = false;


    }


    handleMouseDown(event) {


        //this.x = ev.clientX;
        //this.y = ev.clientY;
       // this.button = ev.button;
       // this.dstep = Math.max(this.camera.position[0],this.camera.position[1],this.camera.position[2])/100;

        //if (this.picker == null) return;

        //var coords = this.get2DCoords(ev);


        var w = 1280;
        var h = 720;

        //var x = (mouseX(event) - w / 2) / (w / 2);
        var x = mouseX(event);
        var y = h-mouseY(event);
        if(x<0)
        x = 0;
        if(x>1280)
            x = 1280;
        if(y<0)
            y = 0;
        if(y>720)
            y = 720;

        console.log(x);
        console.log(y);
        console.log('h');
        this.picking = picker.find([x,y]);
        console.log(this.picking);
        /*
        if (this.picking){
            var count = this.picker.plist.length;
            var message = count==1?count+' object has been selected': count+' objects have been selected';
            $('#title-id').html(message);
        }
        else{
            this.picker.stop();
            $('#title-id').html('Please select an object and drag it. (Alt key drags on the camera axis)');
        }
        */




    }

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    handleMouseUp(event) {



        var w = 1280;
        var h = 720;

        var x = (mouseX(event) - w / 2) / (w / 2);
        var y = -(mouseY(event) - h / 2) / (h / 2);


        var viewportArray = [
            0, 0, w , h
        ];

        // The results of the operation will be stored in this array.
        var modelPointArrayResultsNear = [];


        var success = GLU.unProject(
            x, y, 0,
            camera.mvMatrix, camera.pMatrix,
            viewportArray, modelPointArrayResultsNear);


        var modelPointArrayResultsFar = [];


        var success = GLU.unProject(
            x, y, 1,
            camera.mvMatrix, camera.pMatrix,
            viewportArray, modelPointArrayResultsFar);


        camera.eye = intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);


        //console.log(modelPointArrayResultsNear);
        //console.log(modelPointArrayResultsFar);


    }


    handleMouseMove(e) {

        var x = helpers.getMouseX(e);
        var y = helpers.getMouseY(e);


        camera.slideLeft = false;
        camera.slideRight = false;
        camera.slideUp = false;
        camera.slideDown = false;

        //var ydiv = (y / screenHeight);
        //var xdiv = (x / screenWidth);

        if ($('#controlEdgeMovement').prop('checked')) {
            if (x < 20)
                camera.slideLeft = true;

            if (x > (resolutionWidth - 20))
                camera.slideRight = true;

            if (y < 20)
                camera.slideUp = true;

            if (y > (resolutionHeight - 20))
                camera.slideDown = true;

        }


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

