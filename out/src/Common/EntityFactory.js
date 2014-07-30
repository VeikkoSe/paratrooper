var EntityFactory = function EntityFactory() {
  "use strict";
  this.movable = new Movable();
  this.controllable = new Controllable();
};
($traceurRuntime.createClass)(EntityFactory, {
  createMedic: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(this.movable);
    e.addComponent(new Renderable(0, 0, 0));
    e.addComponent(new Selectable());
    e.addComponent(this.controllable);
    e.addComponent(new MeshComponent(new Mesh("ship")));
  },
  createRanger: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(this.movable);
    e.addComponent(new Renderable(5, 0, 5));
    e.addComponent(new Selectable());
    e.addComponent(this.controllable);
    e.addComponent(new MeshComponent(new Mesh("ship")));
  },
  createGunner: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(this.movable);
    e.addComponent(new Renderable(10, 0, 5));
    e.addComponent(new Selectable());
    e.addComponent(this.controllable);
    e.addComponent(new MeshComponent(new Mesh("ship")));
  },
  createBackground: function() {
    "use strict";
    var e = em.addNew();
    e.addComponent(new Renderable(0, 0, 0));
    e.addComponent(new MeshComponent(new Mesh("background")));
  }
}, {});
