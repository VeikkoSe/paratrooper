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
    e.addComponent(new MeshComponent(new Mesh("ranger")));
  },
  createRanger: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new Movable(5, 1, 5));
    e.addComponent(new Renderable(5, 1, 5));
    e.addComponent(new Selectable());
    e.addComponent(this.controllable);
    e.addComponent(new MeshComponent(new Mesh("gunner")));
  },
  createGunner: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new Movable(10, 1, 5));
    e.addComponent(new Renderable(10, 1, 5));
    e.addComponent(new Selectable());
    e.addComponent(this.controllable);
    e.addComponent(new MeshComponent(new Mesh("medic")));
  },
  createBackground: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new Renderable(0, 0, 0));
    e.addComponent(new MeshComponent(new Mesh("background")));
  },
  createTerrain: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new Renderable(0, 0, 0));
    e.addComponent(new TerrainComponent(new Terrain("heightmap")));
  },
  createHouse: function() {
    "use strict";
    var mesh = new Mesh("house");
    for (var i = 0; i < 3; i++) {
      var randX = Math.floor((Math.random() * 50) + 1);
      var randZ = Math.floor((Math.random() * 50) + 1);
      randX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      randZ *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      var e = em.addNew();
      e.addComponent(new Renderable(randX, 0, randZ));
      e.addComponent(new Selectable());
      e.addComponent(this.controllable);
      e.addComponent(new MeshComponent(mesh));
    }
  }
}, {});
