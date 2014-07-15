var ActionMapper = function ActionMapper() {
  "use strict";
  this.shooting = null;
  this.mouseDown = false;
};
($traceurRuntime.createClass)(ActionMapper, {
  handleMouseDown: function(e) {
    "use strict";
    this.mouseDown = true;
    if (this.mouseDown) {
      var x = (e.offsetX || e.clientX - $(e.target).offset().left);
      var y = (e.offsetY || e.clientY - $(e.target).offset().top);
    }
    this.mouseDown = false;
  },
  handleMouseUp: function(event) {
    "use strict";
    this.mouseDown = false;
  },
  handleMouseMove: function(e) {
    "use strict";
    var canvas = document.getElementById("canvas");
    var x = 0;
    var y = 0;
    if (e.x != undefined && e.y != undefined) {
      x = e.x;
      y = e.y;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    camera.slideLeft = false;
    camera.slideRight = false;
    camera.slideUp = false;
    camera.slideDown = false;
    if (x < 20)
      camera.slideLeft = true;
    if (x > (resolutionWidth - 20))
      camera.slideRight = true;
    if (y < 20)
      camera.slideUp = true;
    if (y > (resolutionHeight - 20))
      camera.slideDown = true;
  },
  handleKeys: function(elapsed) {
    "use strict";
  }
}, {});
