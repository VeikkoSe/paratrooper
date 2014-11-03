var ActionMapper = function ActionMapper() {
  "use strict";
};
($traceurRuntime.createClass)(ActionMapper, {
  getMousePos: function(canvas, evt) {
    "use strict";
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  },
  handleMouseDown: function(event) {
    "use strict";
    if (!actionMapper.setPicking(event))
      actionMapper.setClickPosition(event);
  },
  setPicking: function(event) {
    "use strict";
    var x = helpers.mouseX(event);
    var y = resolutionHeight - helpers.mouseY(event);
    if (x < 0)
      x = 0;
    if (x > resolutionWidth)
      x = resolutionWidth;
    if (y < 0)
      y = 0;
    if (y > resolutionHeight)
      y = resolutionHeight;
    if (picker.findAndSet([x, y]))
      return true;
    return false;
  },
  setClickPosition: function(event) {
    "use strict";
    var x = (helpers.mouseX(event) - resolutionWidth / 2) / (resolutionWidth / 2);
    var y = -(helpers.mouseY(event) - resolutionHeight / 2) / (resolutionHeight / 2);
    var viewportArray = [0, 0, resolutionWidth, resolutionHeight];
    var modelPointArrayResultsNear = [];
    var success = GLU.unProject(x, y, 0, camera.mvMatrix, camera.pMatrix, viewportArray, modelPointArrayResultsNear);
    var modelPointArrayResultsFar = [];
    var success = GLU.unProject(x, y, 1, camera.mvMatrix, camera.pMatrix, viewportArray, modelPointArrayResultsFar);
    camera.clickPosition = intersectionpoint(modelPointArrayResultsNear, modelPointArrayResultsFar);
    console.debug(camera.clickPosition[0]);
    console.debug(camera.clickPosition[1]);
    console.debug(camera.clickPosition[2]);
  },
  handleMouseMove: function(e) {
    "use strict";
    var x = helpers.mouseX(e);
    var y = helpers.mouseY(e);
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
  }
}, {});
