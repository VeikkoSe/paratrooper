var Renderable = function Renderable(imitialX, initialY, initialZ) {
  "use strict";
  this.name = "Renderable";
  this.xPos = imitialX;
  this.yPos = initialY;
  this.zPos = initialZ;
};
($traceurRuntime.createClass)(Renderable, {}, {}, Component);
