var Selectable = function Selectable() {
  "use strict";
  this.name = "Selectable";
  this.selected = false;
  this.color = picker.createColor();
};
($traceurRuntime.createClass)(Selectable, {}, {}, Component);
