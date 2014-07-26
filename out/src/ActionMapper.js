var ActionMapper = function ActionMapper() {
  "use strict";
  this.shooting = null;
  this.mouseDown = false;
};
($traceurRuntime.createClass)(ActionMapper, {
  handleMouseDown: function(event) {
    "use strict";
    var w = 1280;
    var h = 720;
    var x = mouseX(event);
    var y = h - mouseY(event);
    if (x < 0)
      x = 0;
    if (x > 1280)
      x = 1280;
    if (y < 0)
      y = 0;
    if (y > 720)
      y = 720;
    console.log(x);
    console.log(y);
    console.log('h');
    this.picking = picker.find([x, y]);
    console.log(this.picking);
  },
  getMousePos: function(canvas, evt) {
    "use strict";
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  },
  handleMouseUp: function(event) {
    "use strict";
    var w = 1280;
    var h = 720;
    var x = (mouseX(event) - w / 2) / (w / 2);
    var y = -(mouseY(event) - h / 2) / (h / 2);
    var viewportArray = [0, 0, w, h];
    var modelPointArrayResultsNear = [];
    var success = GLU.unProject(x, y, 0, camera.mvMatrix, camera.pMatrix, viewportArray, modelPointArrayResultsNear);
    var modelPointArrayResultsFar = [];
    var success = GLU.unProject(x, y, 1, camera.mvMatrix, camera.pMatrix, viewportArray, modelPointArrayResultsFar);
    camera.eye = intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);
  },
  handleMouseMove: function(e) {
    "use strict";
    var x = helpers.getMouseX(e);
    var y = helpers.getMouseY(e);
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
  },
  handleKeys: function(elapsed) {
    "use strict";
  }
}, {});
