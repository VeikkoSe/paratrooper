var Character = function Character() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $Character.prototype, arguments);
};
var $Character = Character;
($traceurRuntime.createClass)(Character, {
  isClose: function(currentCoord, newCoord) {
    "use strict";
    if (currentCoord < newCoord + 0.2 && currentCoord > newCoord - 0.2)
      return true;
    return false;
  },
  update: function(deltatime) {
    "use strict";
    var speed = 0.2;
    var foundMoveEntities = em.getAllEntitiesPosessingComponent("Movable");
    if (foundMoveEntities.length > 0) {
      for (var e = 0; e < foundMoveEntities.length; e++) {
        var se = em.searchComponentForEntity(foundMoveEntities[$traceurRuntime.toProperty(e)], "Selectable");
        if (se) {
          var re = em.searchComponentForEntity(foundMoveEntities[$traceurRuntime.toProperty(e)], "Renderable");
          if (re) {
            var me = em.searchComponentForEntity(foundMoveEntities[$traceurRuntime.toProperty(e)], "Movable");
            if (me && se.selected && camera.clickPosition) {
              me.newXpos = camera.clickPosition[0];
              me.newYpos = camera.clickPosition[1];
              me.newZpos = camera.clickPosition[2];
            }
            if (!this.isClose(re.xPos, me.newXpos) || !this.isClose(re.zPos, me.newZpos)) {
              var dirX = me.newXpos - re.xPos;
              var dirZ = me.newZpos - re.zPos;
              var hyp = Math.sqrt(dirX * dirX + dirZ * dirZ);
              console.log(hyp);
              console.log = function() {};
              dirX /= hyp;
              dirZ /= hyp;
              re.xPos += dirX * speed;
              re.zPos += dirZ * speed;
              re.yPos = 0;
            }
          }
        }
      }
    }
  }
}, {}, Processor);
