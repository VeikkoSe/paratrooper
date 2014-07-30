var Movable = function Movable() {
  "use strict";
  this.name = "Movable";
  this.newYpos = 0;
  this.newXpos = 0;
  this.newZpos = 0;
  this.angle = 90;
  this.lt = 0;
  this.speed = 0;
  this.acceleration = 5;
};
($traceurRuntime.createClass)(Movable, {}, {}, Component);
