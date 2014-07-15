var Game = function Game(canvas) {
  "use strict";
  this.running = true;
  this.stateEngine = null;
  this.camera = new Camera();
  this.stateEngine = new StateEngine();
  this.initGL(canvas);
  this.stateEngine.changeState("gamestate");
  this.tick();
};
($traceurRuntime.createClass)(Game, {
  tick: function() {
    "use strict";
    var that = this;
    requestAnimFrame(function() {
      that.tick();
    });
    this.stateEngine.currentState.animate();
    this.stateEngine.currentState.drawScene();
  },
  initGL: function(canvas) {
    "use strict";
    try {
      gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch (e) {}
    if (!gl) {
      alert("Could not initialise WebGL, sorry :-(");
    }
  }
}, {});
