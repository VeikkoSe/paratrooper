class ActionMapper {

    constructor() {
        this.shooting = null;
        this.mouseDown = false;


    }


    handleMouseDown(e) {
        /*
        this.mouseDown = true;
        if(this.mouseDown) {
            var x = helpers.getMouseX(e);
            var y = helpers.getMouseY(e);
            game.stateEngine.gameState.medic.newXpos = x;
            game.stateEngine.gameState.medic.newYpos = y;
        }
        printMessage("X:"+x+"Y:"+y);
        this.mouseDown = false;
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




//console.log(gl.viewportWidth);

        var w = 1280;
        var h = 720;

        var x = (event.offsetX - w / 2) / (w / 2);
        var y = -(event.offsetY - h / 2) / (h / 2);


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



        camera.eye = intersectionpoint(modelPointArrayResultsNear,modelPointArrayResultsFar);



        console.log(modelPointArrayResultsNear);
        console.log(modelPointArrayResultsFar);
//        modelPointArrayResultsFar[0] = modelPointArrayResultsFar[0]/10;
  //      modelPointArrayResultsFar[1] = modelPointArrayResultsFar[1]/10;
    //    modelPointArrayResultsFar[2] = 0;

        //camera.eye =modelPointArrayResultsFar;
        //var pos = getMousePos(document.getElementById('canvas'),event);




        //console.log(unproject(100,100,1));



/*
        this.mouseDown = false;


        var world1 = [0,0,0,0] ;
        var world2 = [0,0,0,0] ;
        var dir = [0,0,0] ;
        var target = event.target != null ? event.target : event.srcElement;

        var w = event.srcElement.clientWidth ;
        var h = event.srcElement.clientHeight ;

        // calculate x,y clip space coordinates
        var x = (event.offsetX-w/2)/(w/2) ;
        var y = -(event.offsetY-h/2)/(h/2) ;

        //var x = getMouseX(event);
        //var y = getMouseY(event);
        mat4.inverse(camera.pvMatrix, camera.pvMatrixInverse) ;
        // convert clip space coordinates into world space
        mat4.multiplyVec4(camera.pvMatrixInverse, [x,y,-1,1], world1) ;
       // vec3.scale(world1,1/world1[3]) ;
        mat4.multiplyVec4(camera.pvMatrixInverse, [x,y,0,1], world2) ;
        //vec3.scale(world2,1/world2[3]) ;
        // calculate world space view vector
        vec3.subtract(world2,world1,dir) ;
        vec3.normalize(dir) ;
        //vec3.scale(dir,0.3) ;
        // move eye in direction of world space view vector
        vec3.subtract(camera.eye,dir) ;

        console.log(camera.eye);

*/

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

         //We disable edge movement for now
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

