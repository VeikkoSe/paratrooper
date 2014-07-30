var Helpers = function Helpers() {
  "use strict";
};
($traceurRuntime.createClass)(Helpers, {
  degToRad: function(degrees) {
    "use strict";
    return degrees * Math.PI / 180;
  },
  mouseX: function(e) {
    "use strict";
    if (e.pageX)
      return e.pageX;
    else if (e.clientX)
      return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    else
      return null;
  },
  mouseY: function(e) {
    "use strict";
    if (e.pageY)
      return e.pageY;
    else if (e.clientY)
      return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    else
      return null;
  },
  simpleWorldToViewX: function(x) {
    "use strict";
    return x / screenWidth;
  },
  simpleWorldToViewY: function(y) {
    "use strict";
    return y / screenHeight;
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
}, {});
