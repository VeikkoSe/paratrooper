var Character = function Character() {
  "use strict";
};
($traceurRuntime.createClass)(Character, {
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
    var dirVectorX = Math.cos(helpers.degToRad(angleInDegrees));
    var dirVectorY = Math.sin(helpers.degToRad(angleInDegrees));
    this.velocityX = dirVectorX * (elapsed / 1000.0);
    this.velocityY = dirVectorY * (elapsed / 1000.0);
    this.xPos += this.velocityX;
    this.yPos += this.velocityY;
  },
  checkHit: function() {
    "use strict";
  }
}, {});
