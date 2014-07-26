var GameState = function GameState(canvas) {
  "use strict";
  this.medic = null;
  this.background = null;
  this.actionMapper = null;
  this.lastTime = 0;
  this.frameCount = 0;
  this.xRot = 0;
  this.actionMapper = new ActionMapper();
};
($traceurRuntime.createClass)(GameState, {
  init: function() {
    "use strict";
    particleProgram = initParticleShaders("particle");
    shaderProgram = initShaders("per-fragment-lighting");
    gl.enable(gl.CULL_FACE);
    this.medic = new Medic();
    this.background = new Model('background');
    gl.clearColor(0.3, 0.3, 0.3, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  },
  simpleWorldToViewX: function(x) {
    "use strict";
    return x / screenWidth;
  },
  simpleWorldToViewY: function(y) {
    "use strict";
    return y / screenHeight;
  },
  animate: function() {
    "use strict";
    var timeNow = new Date().getTime();
    this.frameCount++;
    if (this.lastTime != 0) {
      var elapsed = timeNow - this.lastTime;
      this.elapsedTotal += elapsed;
      this.xRot += (90 * elapsed) / 2000.0;
      this.actionMapper.handleKeys(elapsed);
      this.medic.move(elapsed);
    }
    this.lastTime = timeNow;
  },
  drawMedic: function() {
    "use strict";
    if (this.medic.visible == 1) {
      camera.mvPushMatrix();
      gl.uniform3fv(shaderProgram.uMaterialDiffuse, this.medic.model.diffuse);
      mat4.translate(camera.mvMatrix, camera.eye);
      gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.medic.model.vertexPositionBuffer);
      gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.medic.model.normalPositionBuffer);
      gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.medic.model.texturePositionBuffer);
      gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.medic.model.texture);
      gl.uniform1i(shaderProgram.samplerUniform, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.medic.model.indexPositionBuffer);
      this.setMatrixUniforms();
      gl.drawElements(gl.TRIANGLES, this.medic.model.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
      camera.mvPopMatrix();
    }
  },
  drawGround: function() {
    "use strict";
    camera.mvPushMatrix();
    mat4.translate(camera.mvMatrix, [0, 0, 0]);
    gl.uniform3fv(shaderProgram.uMaterialDiffuse, this.background.diffuse);
    gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.background.vertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.background.normalPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.background.texturePositionBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.background.texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.background.indexPositionBuffer);
    this.setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, this.background.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    camera.mvPopMatrix();
  },
  render: function() {
    "use strict";
    gl.useProgram(shaderProgram);
    gl.bindFramebuffer(gl.FRAMEBUFFER, picker.framebuffer);
    gl.uniform1i(shaderProgram.uDrawColors, 1);
    this.drawScene();
    gl.uniform1i(shaderProgram.uDrawColors, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.drawScene();
  },
  drawScene: function() {
    "use strict";
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniform1i(shaderProgram.uUseLighting, 1);
    gl.uniform1f(shaderProgram.alphaUniform, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    var x = $('#slider-x').slider("value");
    var y = $('#slider-y').slider("value");
    var z = $('#slider-z').slider("value");
    gl.uniform3f(shaderProgram.uLightPosition, x, y, z);
    gl.uniform3f(shaderProgram.uLightAmbient, 0, 0, 0);
    gl.uniform3f(shaderProgram.uLightDiffuse, 0.8, 0.8, 0.8);
    gl.uniform3f(shaderProgram.uLightSpecular, 0.8, 0.8, 0.8);
    gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);
    camera.move();
    this.drawGround();
    this.drawMedic();
  },
  setMatrixUniforms: function() {
    "use strict";
    gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, camera.pMatrix);
    gl.uniformMatrix4fv(shaderProgram.uMVMatrix, false, camera.mvMatrix);
    var normalMatrix = mat3.create();
    mat4.toInverseMat3(camera.mvMatrix, normalMatrix);
    mat3.transpose(normalMatrix);
    gl.uniformMatrix3fv(shaderProgram.uNMatrix, false, normalMatrix);
  }
}, {}, StateEngine);
