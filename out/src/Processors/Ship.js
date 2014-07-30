var RenderProcess = function RenderProcess() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $RenderProcess.prototype, arguments);
};
var $RenderProcess = RenderProcess;
($traceurRuntime.createClass)(RenderProcess, {draw: function() {
    "use strict";
    var foundMeshEntities = em.getAllEntitiesPosessingComponent("MeshComponent");
    if (foundMeshEntities.length > 0) {
      var fmfound = [];
      for (var e = 0; e < foundMeshEntities.length; e++) {
        for (var c = 0; c < foundMeshEntities[$traceurRuntime.toProperty(e)].components.length; c++) {
          if (foundMeshEntities[$traceurRuntime.toProperty(e)].components[$traceurRuntime.toProperty(c)].name == "MeshComponent") {
            fmfound.push(foundMeshEntities[$traceurRuntime.toProperty(e)].components[$traceurRuntime.toProperty(c)]);
          }
        }
      }
      for (var fm = 0; fm < fmfound.length; fm++) {
        {
          camera.mvPushMatrix();
          gl.uniform3fv(shaderProgram.uMaterialDiffuse, fmfound[$traceurRuntime.toProperty(fm)].mesh.diffuse);
          mat4.translate(camera.mvMatrix, camera.eye);
          gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);
          gl.bindBuffer(gl.ARRAY_BUFFER, fmfound[$traceurRuntime.toProperty(fm)].mesh.vertexPositionBuffer);
          gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
          gl.bindBuffer(gl.ARRAY_BUFFER, fmfound[$traceurRuntime.toProperty(fm)].mesh.normalPositionBuffer);
          gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
          gl.bindBuffer(gl.ARRAY_BUFFER, fmfound[$traceurRuntime.toProperty(fm)].mesh.texturePositionBuffer);
          gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, fmfound[$traceurRuntime.toProperty(fm)].mesh.texture);
          gl.uniform1i(shaderProgram.samplerUniform, 0);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fmfound[$traceurRuntime.toProperty(fm)].mesh.indexPositionBuffer);
          helpers.setMatrixUniforms();
          gl.drawElements(gl.TRIANGLES, fmfound[$traceurRuntime.toProperty(fm)].mesh.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
          camera.mvPopMatrix();
        }
      }
    }
  }}, {}, Processor);
