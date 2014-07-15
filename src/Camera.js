class Camera {
    constructor() {

        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();
        this.cMatrix = mat4.create();
        this.mvMatrixStack = [];

        this.x = 0;
        this.y = -30;
        this.z = -10;
        this.slideLeft = false;
        this.slideRight = false;
        this.slideUp = false;
        this.slideDown = false;
        this.rotation = 70;

        this.home = [this.x,this.y,this.z];

        mat4.identity(this.mvMatrix);
        mat4.translate(this.mvMatrix, this.home);

        //Initialize Camera matrix as the inverse of the Model-View Matrix
        mat4.identity(this.cMatrix);
        mat4.inverse(this.mvMatrix,this.cMatrix);

        //Initialize Perspective matrix
        mat4.identity(this.pMatrix);

    }

    setPerspective() {
        mat4.perspective(80, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, this.pMatrix);

    }

    slideCameraLeft(xAddition) {
        this.x += xAddition;
    }

    slideCameraRight(xDecrease) {
        this.x -= xDecrease;
    }

    slideCameraUp(zAddition) {
        this.z += zAddition;

    }

    slideCameraDown(zDecrease) {
        this.z -= zDecrease;

    }



    move() {

        mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, this.pMatrix);

        if(this.slideLeft)
            this.slideCameraLeft(0.3);
        if(this.slideRight)
            this.slideCameraRight(0.3);
        if(this.slideUp)
            this.slideCameraUp(0.3);
        if(this.slideDown)
            this.slideCameraDown(0.3);

/*

        this.x = $('#cslider-x').slider("value");
        this.y = $('#cslider-y').slider("value");
        this.z = $('#cslider-z').slider("value");

        this.rotation = $('#rslider-x').slider("value");
*/
        mat4.identity(this.mvMatrix);
        mat4.rotate(this.mvMatrix, this.rotation, [1, 0, 0]);
        mat4.translate(this.mvMatrix, [this.x, this.y ,this.z]);



    }


    mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(this.mvMatrix, copy);
        this.mvMatrixStack.push(copy);
    }


    mvPopMatrix() {
        if (this.mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        this.mvMatrix = this.mvMatrixStack.pop();
    }

    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }


}