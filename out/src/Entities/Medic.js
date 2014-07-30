var Medic = function Medic(id) {
  "use strict";
  this.id = id;
  this.components = [];
};
($traceurRuntime.createClass)(Medic, {addComponent: function(component) {
    "use strict";
    this.components.push(component);
  }}, {});
