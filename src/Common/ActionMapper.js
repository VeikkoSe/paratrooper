class ActionMapper {

    constructor() {

    }


    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    handleMouseDown(event) {
        if (!actionMapper.setPicking(event))
            actionMapper.setClickPosition(event);
    }

    setPicking(event) {

        var x = helpers.mouseX(event);
        var y = resolutionHeight - helpers.mouseY(event);

        if (x < 0)
            x = 0;
        if (x > resolutionWidth)
            x = resolutionWidth;
        if (y < 0)
            y = 0;
        if (y > resolutionHeight)
            y = resolutionHeight;

        //console.log(x);
        //console.log(y);

        if (picker.findAndSet([x, y]))
            return true;

        return false;

    }

    setClickPosition(event) {


        var x = (helpers.mouseX(event) - resolutionWidth / 2) / (resolutionWidth / 2);
        var y = -(helpers.mouseY(event) - resolutionHeight / 2) / (resolutionHeight / 2);


        var viewportArray = [
            0, 0, resolutionWidth , resolutionHeight
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

        camera.clickPosition = intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);
        console.debug(camera.clickPosition[0]);
        console.debug(camera.clickPosition[1]);
        console.debug(camera.clickPosition[2]);
    }


    handleMouseMove(e) {

        var x = helpers.mouseX(e);
        var y = helpers.mouseY(e);


        camera.slideLeft = false;
        camera.slideRight = false;
        camera.slideUp = false;
        camera.slideDown = false;

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


}

