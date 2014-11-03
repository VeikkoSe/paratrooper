var MeshComponent = function MeshComponent(mesh, width) {
  "use strict";
  this.name = "MeshComponent";
  this.mesh = mesh;
  this.width = width;
};
($traceurRuntime.createClass)(MeshComponent, {}, {}, Component);
