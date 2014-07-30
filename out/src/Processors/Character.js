var Character = function Character() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $Character.prototype, arguments);
};
var $Character = Character;
($traceurRuntime.createClass)(Character, {update: function() {
    "use strict";
    var foundMoveEntities = em.getAllEntitiesPosessingComponent("Movable");
    if (foundMoveEntities.length > 0) {
      for (var e = 0; e < foundMoveEntities.length; e++) {
        var se = em.searchComponentForEntity(foundMoveEntities[$traceurRuntime.toProperty(e)], "Selectable");
        if (se) {
          var re = em.searchComponentForEntity(foundMoveEntities[$traceurRuntime.toProperty(e)], "Renderable");
          if (re) {
            var me = em.searchComponentForEntity(foundMoveEntities[$traceurRuntime.toProperty(e)], "Movable");
            if (me && se.selected) {
              re.xPos = camera.clickPosition[0];
              re.yPos = camera.clickPosition[1];
              re.zPos = camera.clickPosition[2];
            }
          }
        }
      }
    }
  }}, {}, Processor);
