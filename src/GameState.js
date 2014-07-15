class GameState extends StateEngine {

    constructor(canvas) {


        this.medic = null;

        this.background = null;
        this.actionMapper = null;
        this.lastTime = 0;


        this.frameCount = 0;
        this.xRot = 0;

        this.actionMapper = new ActionMapper();


    }

    init() {

        particleProgram = initParticleShaders("particle");
        shaderProgram = initShaders("per-fragment-lighting");

        gl.enable(gl.CULL_FACE);

        this.medic = new Medic();

        this.background = new Model('background');

        gl.clearColor(0.0, 0.0, 0.0, 1.0);


    }


    simpleWorldToViewX(x) {
        return  x / screenWidth;
    }

    simpleWorldToViewY(y) {

        return  y / screenHeight;
    }

    animate() {
        var timeNow = new Date().getTime();
        this.frameCount++;
        if (this.lastTime != 0) {
            var elapsed = timeNow - this.lastTime;
            this.elapsedTotal += elapsed;
            this.xRot += (90 * elapsed) / 2000.0;

            this.actionMapper.handleKeys(elapsed);


            this.medic.move(elapsed);


        }

        this.lastTime = timeNow;

    }


    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }


    drawMedic() {


        if (this.medic.visible == 1) {

            camera.mvPushMatrix();


            mat4.translate(camera.mvMatrix, [0, 0, 0]);
            //mat4.rotate(camera.mvMatrix, this.degToRad(-90), [0, 1, 0]);
            //mat4.rotate(camera.mvMatrix, this.degToRad(-90), [1, 0, 0]);

            //mat4.rotate(camera.mvMatrix, this.degToRad(this.medic.angle), [1, 0, 0]);

            gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);


            gl.bindBuffer(gl.ARRAY_BUFFER, this.medic.model.vertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


            gl.bindBuffer(gl.ARRAY_BUFFER, this.medic.model.normalPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


            gl.bindBuffer(gl.ARRAY_BUFFER, this.medic.model.texturePositionBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.medic.model.texture);
            gl.uniform1i(shaderProgram.samplerUniform, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.medic.model.indexPositionBuffer);

            //this.setMatrixUniforms();
            gl.drawElements(gl.TRIANGLES, this.medic.model.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            // gl.disable(gl.BLEND);
            camera.mvPopMatrix();
        }
    }

    drawGround() {


        //draw background
        camera.mvPushMatrix();
        mat4.translate(camera.mvMatrix, [0, 0, 0]);
        //mat4.rotate(camera.mvMatrix, this.degToRad(-this.xRot), [1, 1, 1]);
        //mat4.translate(camera.mvMatrix, [0, 0, -10]);
        //mat4.scale(camera.mvMatrix, [0.219, 0.212, 0.212]);

        gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.background.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.background.normalPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.background.texturePositionBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);


        gl.bindTexture(gl.TEXTURE_2D, this.background.texture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.background.indexPositionBuffer);
        //this.setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, this.background.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);

        camera.mvPopMatrix();

    }


    drawScene() {


        gl.useProgram(shaderProgram);


        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniform1i(shaderProgram.useLightingUniform, true);
        gl.uniform1f(shaderProgram.alphaUniform, 1);

        gl.disable(gl.DEPTH_TEST);

        //Light uniforms
        var x = $('#slider-x').slider("value");
        var y = $('#slider-y').slider("value");
        var z = $('#slider-z').slider("value");

        gl.uniform3f(shaderProgram.uLightPosition, x, y, z);
        gl.uniform3f(shaderProgram.uLightAmbient, 0, 0, 0);
        gl.uniform3f(shaderProgram.uLightDiffuse, 0.8, 0.8, 0.8);
        gl.uniform3f(shaderProgram.uLightSpecular, 0.8, 0.8, 0.8);


        gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);


        //gl.useProgram(shaderProgram);

        //mat4.inverse(mvMatrix,cMatrix);     //Obtain Camera Matrix from Model-View Matrix
        //displayMatrix(mvMatrix);
        //gl.uniformMatrix4fv(prg.uMVMatrix, false, mvMatrix);

        camera.move();
        this.setMatrixUniforms();

        this.drawGround();


        //this.drawAsteroids();
        //this.drawSun();

        //this.drawBullets();
        this.drawMedic();
        //gl.useProgram(particleProgram);

        //gl.enable(gl.BLEND);
        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        //this.drawAsteroidExplosion();

        //this.drawSmokeTrail();
        //gl.disable(gl.BLEND);


        //camera.move();

    }


    setMatrixUniforms() {
        mat4.inverse(camera.mvMatrix, camera.cMatrix);
        gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, camera.pMatrix);
        gl.uniformMatrix4fv(shaderProgram.uMVMatrix, false, camera.mvMatrix);

        var normalMatrix = mat3.create();
        mat4.toInverseMat3(camera.mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.uNMatrix, false, normalMatrix);
    }


}