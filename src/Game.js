class Game {
    constructor(canvas) {

        this.running = true;

        this.stateEngine = null;


        this.camera = new Camera();
        this.stateEngine = new StateEngine();

        //this.initGL(canvas);


        this.stateEngine.changeState("gamestate");
        //this.picker = new Picker();
        this.tick();
        //this.stateEngine.currentState.tick();



    }


    tick() {

        var that = this;
        requestAnimFrame(function () {
            that.tick()
        });

        this.stateEngine.currentState.animate();
        this.stateEngine.currentState.render();

    }






}