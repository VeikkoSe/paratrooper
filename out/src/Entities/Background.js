var Background = function Background(id) {
  "use strict";
  this.id = id;
  this.components = [];
};
($traceurRuntime.createClass)(Background, {addComponent: function(component) {
    "use strict";
    this.components.push(component);
  }}, {});
