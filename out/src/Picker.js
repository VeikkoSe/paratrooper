var Picker = function Picker(canvas) {
  "use strict";
  this.plist = [];
  this.canvas = canvas;
  this.texture = null;
  this.framebuffer = null;
  this.renderbuffer = null;
  this.processHitsCallback = null;
  this.addHitCallback = null;
  this.removeHitCallback = null;
  this.hitPropertyCallback = null;
  this.moveCallback = null;
  this.configure();
};
($traceurRuntime.createClass)(Picker, {
  update: function() {
    "use strict";
    var width = this.canvas.width;
    var height = this.canvas.height;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
  },
  configure: function() {
    "use strict";
    var width = this.canvas.width;
    var height = this.canvas.height;
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    this.renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    this.framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  },
  initTextureFramebuffer: function() {
    "use strict";
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.bindTexture(gl.TEXTURE_2D, this.rttTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBufferWidth, this.frameBufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.frameBufferWidth, this.frameBufferHeight);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.rttTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  },
  compareColors: function(readout, color) {
    "use strict";
    return (Math.abs(Math.round(color[0] * 255) - readout[0]) <= 1 && Math.abs(Math.round(color[1] * 255) - readout[1]) <= 1 && Math.abs(Math.round(color[2] * 255) - readout[2]) <= 1);
  },
  hitProperty: function(ob) {
    "use strict";
    return ob.diffuse;
  },
  find: function(coords) {
    "use strict";
    var readout = new Uint8Array(1 * 1 * 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.readPixels(coords[0], coords[1], 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, readout);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    var found = false;
    var property = game.stateEngine.gameState.medic.model.diffuse;
    console.log(readout);
    if (this.compareColors(readout, property)) {
      found = true;
    }
    return found;
  }
}, {});
