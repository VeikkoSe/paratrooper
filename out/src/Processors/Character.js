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
              if (me.newXpos > 0 && me.newZpos > 0) {
                var start = {
                  x: re.xPos,
                  y: re.zPos
                };
                var end = {
                  x: me.newXpos,
                  y: me.newZpos
                };
                me.path = astarManager.move(start, end);
                me.pathPosition = 0;
              }
            }
            if (me && me.path && me.pathPosition != me.path.length) {
              var pos = me.pathPosition++;
              me.newXpos = me.path[$traceurRuntime.toProperty(pos)].x;
              me.newZpos = me.path[$traceurRuntime.toProperty(pos)].y;
              re.xPos = me.newXpos;
              re.zPos = me.newZpos;
              re.yPos = 1;
            }
          }
        }
      }
    }
  },
  checkCollision: function() {
    "use strict";
  }
}, {}, Processor);
