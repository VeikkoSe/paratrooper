var Movable = function Movable() {
  "use strict";
  var newXpos = arguments[0] !== (void 0) ? arguments[0] : 0;
  var newYpos = arguments[1] !== (void 0) ? arguments[1] : 0;
  var newZpos = arguments[2] !== (void 0) ? arguments[2] : 0;
  this.name = "Movable";
  this.newXpos = newXpos;
  this.newYpos = newYpos;
  this.newZpos = newZpos;
  this.path = {};
  this.angle = 90;
  this.lt = 0;
  this.speed = 0;
  this.acceleration = 5;
};
($traceurRuntime.createClass)(Movable, {}, {}, Component);
