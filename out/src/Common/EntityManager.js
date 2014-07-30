var EntityManager = function EntityManager() {
  "use strict";
  this.entities = [];
  this.maxId = 0;
};
($traceurRuntime.createClass)(EntityManager, {
  addNew: function() {
    "use strict";
    this.maxId++;
    var ent = new Entity(this.maxId);
    this.entities.push(ent);
    return ent;
  },
  getAllEntitiesPosessingComponent: function(name) {
    "use strict";
    var entities = [];
    for (var e = 0; e < this.entities.length; e++) {
      for (var c = 0; c < this.entities[$traceurRuntime.toProperty(e)].components.length; c++) {
        if (this.entities[$traceurRuntime.toProperty(e)].components[$traceurRuntime.toProperty(c)].name == name)
          entities.push(this.entities[$traceurRuntime.toProperty(e)]);
      }
    }
    return entities;
  },
  searchComponentForEntity: function(entity, component) {
    "use strict";
    for (var c = 0; c < entity.components.length; c++) {
      if (entity.components[$traceurRuntime.toProperty(c)].name == component) {
        return entity.components[$traceurRuntime.toProperty(c)];
      }
    }
    return false;
  }
}, {});
