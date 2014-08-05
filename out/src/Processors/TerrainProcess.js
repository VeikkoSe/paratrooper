var TerrainProcess = function TerrainProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $TerrainProcess.prototype, arguments);
};
var $TerrainProcess = TerrainProcess;
($traceurRuntime.createClass)(TerrainProcess, {draw: function() {
    "use strict";
    var foundTerrainEntities = em.getAllEntitiesPosessingComponent("TerrainComponent");
    if (foundTerrainEntities.length > 0) {
      for (var e = 0; e < foundTerrainEntities.length; e++) {
        var foundTerrain = em.searchComponentForEntity(foundTerrainEntities[$traceurRuntime.toProperty(e)], "TerrainComponent");
        camera.mvPushMatrix();
        gl.uniform3fv(shaderProgram.uDrawColor, [1, 1, 1]);
        gl.uniform3fv(shaderProgram.uMaterialDiffuse, [1, 1, 1]);
        mat4.translate(camera.mvMatrix, [0, 0, 0]);
        gl.uniform3fv(shaderProgram.uDrawColor, [1, 1, 1]);
        gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);
        gl.bindBuffer(gl.ARRAY_BUFFER, foundTerrain.terrain.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, foundTerrain.terrain.normalPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, foundTerrain.terrain.texturePositionBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, foundTerrain.terrain.texture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, foundTerrain.terrain.indexPositionBuffer);
        helpers.setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, foundTerrain.terrain.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        camera.mvPopMatrix();
      }
    }
  }}, {}, Processor);
