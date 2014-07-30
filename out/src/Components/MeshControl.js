var MeshComponent = function MeshComponent(mesh) {
  "use strict";
  this.name = "Mesh";
  this.mesh = mesh;
};
($traceurRuntime.createClass)(MeshComponent, {}, {}, Component);
