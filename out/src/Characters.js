var Medic = function Medic() {
  "use strict";
  this.lastTime = 0;
  this.lt = 0;
  this.xPos = 0;
  this.yPos = 0;
  this.newYpos = 0;
  this.newXpos = 0;
  this.angle = 90;
  this.lt = 0;
  this.speed = 0;
  this.acceleration = 5;
  this.model = new Model('ship');
  this.visible = 1;
  this.velocityX = 0;
  this.velocityY = 0;
  this.acceleration = 10;
  this.lifes = 5;
};
($traceurRuntime.createClass)(Medic, {
  rotateLeft: function(elapsed) {
    "use strict";
    if (this.angle >= 360)
      this.angle = 0;
    if (this.angle < 0)
      this.angle = 360;
    this.angle += 600 * (elapsed / 1000.0);
  },
  rotateRight: function(elapsed) {
    "use strict";
    if (this.angle >= 360)
      this.angle = 0;
    if (this.angle < 0)
      this.angle = 360;
    this.angle -= 600 * (elapsed / 1000.0);
  },
  setAccelerationOn: function(elapsed) {
    "use strict";
  },
  move: function(elapsed) {
    "use strict";
    var deltaY = this.newYpos - this.yPos;
    var deltaX = this.newXpos - this.xPos;
    var angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    printMessage(deltaX);
    var dirVectorX = Math.cos(this.degToRad(angleInDegrees));
    var dirVectorY = Math.sin(this.degToRad(angleInDegrees));
    this.velocityX = dirVectorX * (elapsed / 1000.0);
    this.velocityY = dirVectorY * (elapsed / 1000.0);
    this.xPos += this.velocityX;
    this.yPos += this.velocityY;
  },
  degToRad: function(degrees) {
    "use strict";
    return degrees * Math.PI / 180;
  },
  checkHit: function() {
    "use strict";
  }
}, {}, Character);
