class GameState extends StateEngine {

    constructor(canvas) {

        this.renderProcess = new RenderProcess();
        this.terrainProcess = new TerrainProcess();
        this.characterProcess = new Character();
        this.ef = new EntityFactory();

    }

    init() {

        particleProgram = initParticleShaders("particle");
        shaderProgram = initShaders("per-fragment-lighting");

        //gl.enable(gl.CULL_FACE);

        gl.clearColor(0.3, 0.3, 0.3, 1.0);
        gl.clearDepth(1.0);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        this.ef.createTerrain();
        this.ef.createMedic();

        this.ef.createRanger();
        this.ef.createGunner();
       //this.ef.createBackground();

        this.ef.createHouse();



    }


    animate() {
        this.characterProcess.update();
    }

    render() {
        //first we draw to framebuffer with solid colors for picking
        //then we draw the frame
        gl.useProgram(shaderProgram);
        //off-screen rendering
        gl.bindFramebuffer(gl.FRAMEBUFFER, picker.framebuffer);
        gl.uniform1i(shaderProgram.uDrawColors, 1);
        this.drawScene();
        gl.uniform1i(shaderProgram.uDrawColors, 0);
        //on-screen rendering
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.drawScene();
    }

    drawScene() {

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniform1i(shaderProgram.uUseLighting, 1);
        gl.uniform1f(shaderProgram.alphaUniform, 1);

        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);

        //Light uniforms
        var x = $('#slider-x').slider("value");
        var y = $('#slider-y').slider("value");
        var z = $('#slider-z').slider("value");

        gl.uniform3f(shaderProgram.uLightPosition, x, y, z);
        gl.uniform3f(shaderProgram.uLightAmbient, 0, 0, 0);
        gl.uniform3f(shaderProgram.uLightDiffuse, 0.8, 0.8, 0.8);
        gl.uniform3f(shaderProgram.uLightSpecular, 0.8, 0.8, 0.8);


        gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);

        camera.move();

        this.renderProcess.draw();
        this.terrainProcess.draw();


    }


}