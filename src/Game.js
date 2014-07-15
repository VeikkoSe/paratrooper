class Game {
    constructor(canvas) {

        this.running = true;

        this.stateEngine = null;


        this.camera = new Camera();
        this.stateEngine = new StateEngine();

        this.initGL(canvas);


        this.stateEngine.changeState("gamestate");
        this.tick();





    }



    tick() {

        var that = this;
        requestAnimFrame(function () {
            that.tick()
        });

        this.stateEngine.currentState.animate();
        this.stateEngine.currentState.drawScene();

    }


    initGL(canvas) {
        try {
            //gl = canvas.getContext("webgl");
            gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
            //gl = WebGLDebugUtils.makeDebugContext(gl, undefined, logGLCall);
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {

        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }
}