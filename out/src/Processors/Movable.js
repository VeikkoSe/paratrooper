var Movable = function Movable() {
  "use strict";
  $traceurRuntime.defaultSuperCall(this, $Movable.prototype, arguments);
};
var $Movable = Movable;
($traceurRuntime.createClass)(Movable, {draw: function() {
    "use strict";
    em.getAllEntitiesPosessingComponent;
    console.log(em);
    camera.mvPushMatrix();
    gl.uniform3fv(shaderProgram.uMaterialDiffuse, this.diffuse);
    mat4.translate(camera.mvMatrix, camera.eye);
    gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexPositionBuffer);
    this.setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, this.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    camera.mvPopMatrix();
  }}, {}, Processor);
