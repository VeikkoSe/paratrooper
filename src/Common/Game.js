class Game {
    constructor(canvas) {

        this.running = true;

        this.stateEngine = null;


        this.camera = new Camera();
        this.stateEngine = new StateEngine();

        this.stateEngine.changeState("gamestate");
        this.tick();

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