var TerrainProcessor = function TerrainProcessor() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $TerrainProcessor.prototype, arguments);
};
var $TerrainProcessor = TerrainProcessor;
($traceurRuntime.createClass)(TerrainProcessor, {draw: function() {
    "use strict";
    var foundTextureEntities = em.getAllEntitiesPosessingComponent("TerrainComponent");
    if (foundTextureEntities.length > 0) {
      for (var e = 0; e < foundTextureEntities.length; e++) {
        camera.mvPushMatrix();
        gl.uniform3fv(shaderProgram.uDrawColor, [1, 1, 1]);
        mat4.translate(camera.mvMatrix, [0, 0, 0]);
        gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);
        gl.bindBuffer(gl.ARRAY_BUFFER, foundTextureEntities.plane[1]);
        gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, foundTextureEntities.plane[0]);
        helpers.setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, foundTextureEntities.plane[0].length, gl.UNSIGNED_SHORT, 0);
        camera.mvPopMatrix();
      }
    }
  }}, {}, Processor);
