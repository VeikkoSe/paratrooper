var Terrain = function Terrain(heightmap) {
  "use strict";
  this.texture = new Texture(heightmap);
  this.data = null;
  this.initDone = 0;
  this.vertexPositionBuffer = gl.createBuffer();
  this.texturePositionBuffer = gl.createBuffer();
  this.indexPositionBuffer = gl.createBuffer();
  this.normalPositionBuffer = gl.createBuffer();
  this.normals = null;
  this.vertices = null;
  this.textures = null;
  this.indices = null;
};
($traceurRuntime.createClass)(Terrain, {
  createData: function() {
    "use strict";
    this.createHeightMap();
  },
  getHeightData: function(img) {
    "use strict";
    var canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    var context = canvas.getContext('2d', {preserveDrawingBuffer: true});
    var data = this.matrix(128, 128, 0);
    context.drawImage(img, 0, 0);
    var imgd = context.getImageData(0, 0, 128, 128);
    var pix = imgd.data;
    var x = 0;
    var y = 0;
    for (var i = 0,
        n = pix.length; i < n; i += (4)) {
      if (x == 128) {
        y++;
        x = 0;
      }
      var all = pix[$traceurRuntime.toProperty(i)] + pix[$traceurRuntime.toProperty(i + 1)] + pix[$traceurRuntime.toProperty(i + 2)];
      $traceurRuntime.setProperty(data[$traceurRuntime.toProperty(y)], x, all / 30);
      x++;
    }
    return data;
  },
  matrix: function(rows, cols, defaultValue) {
    "use strict";
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr.push([]);
      arr[$traceurRuntime.toProperty(i)].push(new Array(cols));
      for (var j = 0; j < cols; j++) {
        $traceurRuntime.setProperty(arr[$traceurRuntime.toProperty(i)], j, defaultValue);
      }
    }
    return arr;
  },
  createHeightMap: function() {
    "use strict";
    var heightData = this.getHeightData(this.texture.loadedTexture.image);
    var squares = 127;
    var width = 200;
    var xLength = squares;
    var yLength = squares;
    var heightMapVertexData = [];
    var hd = [];
    var part = width / squares;
    var c = 0;
    for (var x = 0; x < xLength; x++) {
      for (var y = 0; y < yLength; y++) {
        var xPosition1 = x + 1;
        var yPosition1 = y;
        var xPosition2 = x + 1;
        var yPosition2 = y + 1;
        var xPosition3 = x;
        var yPosition3 = y;
        var xPosition4 = x;
        var yPosition4 = y;
        var xPosition5 = x + 1;
        var yPosition5 = y + 1;
        var xPosition6 = x;
        var yPosition6 = y + 1;
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
    var alreadyAdded;
    for (var i = 0; i < hd.length; i++) {
      alreadyAdded = false;
      if ($traceurRuntime.toProperty(hd[$traceurRuntime.toProperty(i)][0] + ',' + hd[$traceurRuntime.toProperty(i)][1]) in added) {
        iloop.push(added[$traceurRuntime.toProperty(hd[$traceurRuntime.toProperty(i)][0] + ',' + hd[$traceurRuntime.toProperty(i)][1])]);
        alreadyAdded = true;
      }
      if (!alreadyAdded) {
        $traceurRuntime.setProperty(heightMapVertexData, c++, hd[$traceurRuntime.toProperty(i)][0] * part);
        $traceurRuntime.setProperty(heightMapVertexData, c++, heightData[$traceurRuntime.toProperty(hd[$traceurRuntime.toProperty(i)][1])][$traceurRuntime.toProperty(hd[$traceurRuntime.toProperty(i)][0])]);
        $traceurRuntime.setProperty(heightMapVertexData, c++, hd[$traceurRuntime.toProperty(i)][1] * part);
        $traceurRuntime.setProperty(added, hd[$traceurRuntime.toProperty(i)][0] + ',' + hd[$traceurRuntime.toProperty(i)][1], il);
        iloop.push(il);
        il++;
      }
    }
    var normals = this.createNormals(heightMapVertexData, iloop);
    var fakeTexture = [];
    var c = 0;
    for (var i = 0; i < normals.length; i++) {
      $traceurRuntime.setProperty(fakeTexture, c, 0);
      c++;
      $traceurRuntime.setProperty(fakeTexture, c, 1);
      c++;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fakeTexture), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(heightMapVertexData), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexPositionBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(iloop), gl.STATIC_DRAW);
    this.indexPositionBuffer.numItems = iloop.length;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  },
  createNormals: function(vs, ind) {
    "use strict";
    var x = 0;
    var y = 1;
    var z = 2;
    var ns = [];
    for (var i = 0; i < vs.length; i++) {
      $traceurRuntime.setProperty(ns, i, 0.0);
    }
    for (var i = 0; i < ind.length; i = i + 3) {
      var v1 = [];
      var v2 = [];
      var normal = [];
      $traceurRuntime.setProperty(v1, x, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + x)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i)] + x)]);
      $traceurRuntime.setProperty(v1, y, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + y)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i)] + y)]);
      $traceurRuntime.setProperty(v1, z, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + z)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i)] + z)]);
      $traceurRuntime.setProperty(v2, x, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 2)] + x)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + x)]);
      $traceurRuntime.setProperty(v2, y, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 2)] + y)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + y)]);
      $traceurRuntime.setProperty(v2, z, vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 2)] + z)] - vs[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + 1)] + z)]);
      $traceurRuntime.setProperty(normal, x, v1[$traceurRuntime.toProperty(y)] * v2[$traceurRuntime.toProperty(z)] - v1[$traceurRuntime.toProperty(z)] * v2[$traceurRuntime.toProperty(y)]);
      $traceurRuntime.setProperty(normal, y, v1[$traceurRuntime.toProperty(z)] * v2[$traceurRuntime.toProperty(x)] - v1[$traceurRuntime.toProperty(x)] * v2[$traceurRuntime.toProperty(z)]);
      $traceurRuntime.setProperty(normal, z, v1[$traceurRuntime.toProperty(x)] * v2[$traceurRuntime.toProperty(y)] - v1[$traceurRuntime.toProperty(y)] * v2[$traceurRuntime.toProperty(x)]);
      for (var j = 0; j < 3; j++) {
        $traceurRuntime.setProperty(ns, 3 * ind[$traceurRuntime.toProperty(i + j)] + x, ns[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + j)] + x)] + normal[$traceurRuntime.toProperty(x)]);
        $traceurRuntime.setProperty(ns, 3 * ind[$traceurRuntime.toProperty(i + j)] + y, ns[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + j)] + y)] + normal[$traceurRuntime.toProperty(y)]);
        $traceurRuntime.setProperty(ns, 3 * ind[$traceurRuntime.toProperty(i + j)] + z, ns[$traceurRuntime.toProperty(3 * ind[$traceurRuntime.toProperty(i + j)] + z)] + normal[$traceurRuntime.toProperty(z)]);
      }
    }
    for (var i = 0; i < vs.length; i = i + 3) {
      var nn = [];
      $traceurRuntime.setProperty(nn, x, ns[$traceurRuntime.toProperty(i + x)]);
      $traceurRuntime.setProperty(nn, y, ns[$traceurRuntime.toProperty(i + y)]);
      $traceurRuntime.setProperty(nn, z, ns[$traceurRuntime.toProperty(i + z)]);
      var len = Math.sqrt((nn[$traceurRuntime.toProperty(x)] * nn[$traceurRuntime.toProperty(x)]) + (nn[$traceurRuntime.toProperty(y)] * nn[$traceurRuntime.toProperty(y)]) + (nn[$traceurRuntime.toProperty(z)] * nn[$traceurRuntime.toProperty(z)]));
      if (len == 0)
        len = 0.00001;
      $traceurRuntime.setProperty(nn, x, nn[$traceurRuntime.toProperty(x)] / len);
      $traceurRuntime.setProperty(nn, y, nn[$traceurRuntime.toProperty(y)] / len);
      $traceurRuntime.setProperty(nn, z, nn[$traceurRuntime.toProperty(z)] / len);
      $traceurRuntime.setProperty(ns, i + x, nn[$traceurRuntime.toProperty(x)]);
      $traceurRuntime.setProperty(ns, i + y, nn[$traceurRuntime.toProperty(y)]);
      $traceurRuntime.setProperty(ns, i + z, nn[$traceurRuntime.toProperty(z)]);
    }
    return ns;
  }
}, {});
