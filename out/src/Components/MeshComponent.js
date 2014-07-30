var MeshComponent = function MeshComponent(mesh) {
  "use strict";
  this.name = "MeshComponent";
  this.mesh = mesh;
};
($traceurRuntime.createClass)(MeshComponent, {}, {}, Component);
