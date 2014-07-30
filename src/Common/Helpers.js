class Helpers {
    constructor() {

    }

    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

    mouseX(e) {
        if (e.pageX) return e.pageX;
        else if (e.clientX)
            return e.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
        else return null;
    }

    mouseY(e) {
        if (e.pageY) return e.pageY;
        else if (e.clientY)
            return e.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
        else return null;
    }

    simpleWorldToViewX(x) {
        return  x / screenWidth;
    }

    simpleWorldToViewY(y) {

        return  y / screenHeight;
    }

    setMatrixUniforms() {

        gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, camera.pMatrix);
        gl.uniformMatrix4fv(shaderProgram.uMVMatrix, false, camera.mvMatrix);

        var normalMatrix = mat3.create();
        mat4.toInverseMat3(camera.mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.uNMatrix, false, normalMatrix);
    }
}