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
  },
  buildPlane: function(width, squares) {
    "use strict";
    var xLength = squares;
    var yLength = squares;
    var heightMapVertexData = [];
    var hd = [];
    var zPosition = 0;
    var part = width / squares;
    var c = 0;
    for (var x = 0; x < xLength; x++) {
      for (var y = 0; y < yLength; y++) {
        var xPosition1 = part * x + part;
        var yPosition1 = part * y;
        var xPosition2 = part * x + part;
        var yPosition2 = part * y + part;
        var xPosition3 = part * x;
        var yPosition3 = part * y;
        var xPosition4 = part * x;
        var yPosition4 = part * y;
        var xPosition5 = part * x + part;
        var yPosition5 = part * y + part;
        var xPosition6 = part * x;
        var yPosition6 = part * y + part;
        $traceurRuntime.setProperty(hd, c++, [xPosition1, yPosition1]);
        $traceurRuntime.setProperty(hd, c++, [xPosition2, yPosition2]);
        $traceurRuntime.setProperty(hd, c++, [xPosition3, yPosition3]);
        $traceurRuntime.setProperty(hd, c++, [xPosition4, yPosition4]);
        $traceurRuntime.setProperty(hd, c++, [xPosition5, yPosition5]);
        $traceurRuntime.setProperty(hd, c++, [xPosition6, yPosition6]);
      }
    }
    c = 0;
    var iloop = [];
    var il = 0;
    var added = {};
    var val = [];
    var alreadyAdded;
    for (var i = 0; i < hd.length; i++) {
      alreadyAdded = false;
      if ($traceurRuntime.toProperty(hd[$traceurRuntime.toProperty(i)][0] + ',' + hd[$traceurRuntime.toProperty(i)][1]) in added) {
        iloop.push(added[$traceurRuntime.toProperty(hd[$traceurRuntime.toProperty(i)][0] + ',' + hd[$traceurRuntime.toProperty(i)][1])]);
        alreadyAdded = true;
      }
      if (!alreadyAdded) {
        $traceurRuntime.setProperty(heightMapVertexData, c++, hd[$traceurRuntime.toProperty(i)][0]);
        $traceurRuntime.setProperty(heightMapVertexData, c++, 0);
        $traceurRuntime.setProperty(heightMapVertexData, c++, hd[$traceurRuntime.toProperty(i)][1]);
        $traceurRuntime.setProperty(added, hd[$traceurRuntime.toProperty(i)][0] + ',' + hd[$traceurRuntime.toProperty(i)][1], il);
        iloop.push(il);
        il++;
      }
    }
    var plane = [];
    plane.push(iloop);
    plane.push(heightMapVertexData);
    return plane;
  }
}, {});
