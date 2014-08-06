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


    buildPlane(width, squares) {

        var xLength = squares;
        var yLength = squares;

        var heightMapVertexData = [];
        var hd = [];

        var zPosition = 0;

        var part = width / squares;

        var c = 0;
        // First, build the data for the vertex buffer
        for (var x = 0; x < xLength; x++) {

            for (var y = 0; y < yLength; y++) {

                var xPosition1 = part * x + part;
                var yPosition1 = part * y;

                var xPosition2 = part * x + part;
                var yPosition2 = part * y + part;

                var xPosition3 = part * x;
                var yPosition3 = part * y;

                var xPosition4 = part * x;
                var yPosition4 = part * y;

                var xPosition5 = part * x + part;
                var yPosition5 = part * y + part;

                var xPosition6 = part * x;
                var yPosition6 = part * y + part;


                // Position
                hd[c++] = [xPosition1, yPosition1];
                hd[c++] = [xPosition2, yPosition2];
                hd[c++] = [xPosition3, yPosition3];

                hd[c++] = [xPosition4, yPosition4];
                hd[c++] = [xPosition5, yPosition5];
                hd[c++] = [xPosition6, yPosition6];

            }
        }
        //console.log(hd);
        c = 0;
        var iloop = [];
        var il = 0;
        var added = {};
        var val = [];
        var alreadyAdded;

        for (var i = 0; i < hd.length; i++) {
            alreadyAdded = false;

            if (hd[i][0] + ',' + hd[i][1] in added) {

                iloop.push(added[hd[i][0] + ',' + hd[i][1]]);
                alreadyAdded = true;

            }

            if (!alreadyAdded) {
                heightMapVertexData[c++] = hd[i][0];
                heightMapVertexData[c++] = 0;
                heightMapVertexData[c++] = hd[i][1];

                added[hd[i][0] + ',' + hd[i][1]] = il;
                iloop.push(il);

                il++;
            }
        }
        var plane = [];
        plane.push(iloop);
        plane.push(heightMapVertexData);
        return plane;
    }
}