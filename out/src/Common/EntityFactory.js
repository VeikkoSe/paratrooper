var EntityFactory = function EntityFactory() {
  "use strict";
  this.controllable = new Controllable();
};
($traceurRuntime.createClass)(EntityFactory, {
  createMedic: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new Movable(0, 1, 0));
    e.addComponent(new Renderable(0, 1, 0));
    e.addComponent(new Selectable());
    e.addComponent(this.controllable);
    e.addComponent(new MeshComponent(new Mesh("ranger", 5)));
  },
  createRanger: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new Movable(5, 1, 5));
    e.addComponent(new Renderable(5, 1, 5));
    e.addComponent(new Selectable());
    e.addComponent(this.controllable);
    e.addComponent(new MeshComponent(new Mesh("gunner", 5)));
  },
  createGunner: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new Movable(10, 1, 5));
    e.addComponent(new Renderable(10, 1, 5));
    e.addComponent(new Selectable());
    e.addComponent(this.controllable);
    e.addComponent(new MeshComponent(new Mesh("medic", 5)));
  },
  createTerrain: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new Renderable(0, 0, 0));
    e.addComponent(new MeshComponent(new Mesh("heightmap_1", 5)));
  },
  createHouse: function() {
    "use strict";
    var mesh = new Mesh("house");
    for (var i = 0; i < 1; i++) {
      var e = em.addNew();
      e.addComponent(new Renderable(30, 0, 30));
      e.addComponent(this.controllable);
      e.addComponent(new MeshComponent(mesh, 5));
    }
  }
}, {});
