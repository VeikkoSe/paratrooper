var Picker = function Picker() {
  "use strict";
  this.plist = [];
  this.texture = null;
  this.framebuffer = null;
  this.renderbuffer = null;
  this.pickerColors = [];
  this.picked = false;
  this.configure();
};
($traceurRuntime.createClass)(Picker, {
  createColor: function() {
    "use strict";
    var color = [Math.random(), Math.random(), Math.random()];
    for (var i = 0; i < this.pickerColors.length; i++) {
      if (color[0] == this.pickerColors[$traceurRuntime.toProperty(i)][0] && color[1] == this.pickerColors[$traceurRuntime.toProperty(i)][1] && color[2] == this.pickerColors[$traceurRuntime.toProperty(i)][2]) {
        return this.createColor();
      }
    }
    this.pickerColors.push(color);
    return color;
  },
  configure: function() {
    "use strict";
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolutionWidth, resolutionHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    this.renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, resolutionWidth, resolutionHeight);
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
  findAndSet: function(coords) {
    "use strict";
    var readout = new Uint8Array(1 * 1 * 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.readPixels(coords[0], coords[1], 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, readout);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    var foundSelectableEntities = em.getAllEntitiesPosessingComponent("Selectable");
    var newSelected = null;
    var oldSelected = null;
    for (var i = 0; i < foundSelectableEntities.length; i++) {
      var selectable = em.searchComponentForEntity(foundSelectableEntities[$traceurRuntime.toProperty(i)], "Selectable");
      if (selectable.selected) {
        oldSelected = selectable;
      }
      if (this.compareColors(readout, selectable.color)) {
        newSelected = selectable;
      }
      selectable.selected = false;
    }
    if (newSelected) {
      newSelected.selected = true;
      camera.clickPosition = null;
      return true;
    } else if (oldSelected)
      oldSelected.selected = true;
    return false;
  }
}, {});
