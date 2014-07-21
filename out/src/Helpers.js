var Helpers = function Helpers() {
  "use strict";
  this.mouseX = 0;
  this.mouseY = 0;
};
($traceurRuntime.createClass)(Helpers, {
  degToRad: function(degrees) {
    "use strict";
    return degrees * Math.PI / 180;
  },
  getMouseX: function(e) {
    "use strict";
    var x = 0;
    if (e.x != undefined) {
      x = e.x;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    }
    return x;
  },
  getMouseY: function(e) {
    "use strict";
    var y = 0;
    if (e.y != undefined) {
      y = e.y;
    } else {
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return y;
  }
}, {});
