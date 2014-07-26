function printMessage(msg) {
  $('#debugarea').html(msg);
}
function initParticleShaders(id) {
  var program = gl.createProgram();
  getShader(id, program);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
  program.pointLifetimeAttribute = gl.getAttribLocation(program, "aLifetime");
  gl.enableVertexAttribArray(program.pointLifetimeAttribute);
  program.pointStartPositionAttribute = gl.getAttribLocation(program, "aStartPosition");
  gl.enableVertexAttribArray(program.pointStartPositionAttribute);
  program.pointEndPositionAttribute = gl.getAttribLocation(program, "aEndPosition");
  gl.enableVertexAttribArray(program.pointEndPositionAttribute);
  program.samplerUniform = gl.getUniformLocation(program, "sTexture");
  program.centerPositionUniform = gl.getUniformLocation(program, "uCenterPosition");
  program.colorUniform = gl.getUniformLocation(program, "uColor");
  program.timeUniform = gl.getUniformLocation(program, "uTime");
  return program;
}
function initShaders(id) {
  var program = gl.createProgram();
  getShader(id, program);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
  program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
  gl.enableVertexAttribArray(program.aVertexPosition);
  program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
  gl.enableVertexAttribArray(program.textureCoordAttribute);
  program.aVertexNormal = gl.getAttribLocation(program, "aVertexNormal");
  gl.enableVertexAttribArray(program.aVertexNormal);
  program.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
  program.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");
  program.uNMatrix = gl.getUniformLocation(program, "uNMatrix");
  program.samplerUniform = gl.getUniformLocation(program, "uSampler");
  program.uMaterialShininess = gl.getUniformLocation(program, "uMaterialShininess");
  program.uAmbient = gl.getUniformLocation(program, "uAmbient");
  program.uLightPosition = gl.getUniformLocation(program, "uLightPosition");
  program.uLightAmbient = gl.getUniformLocation(program, "uLightAmbient");
  program.uLightDiffuse = gl.getUniformLocation(program, "uLightDiffuse");
  program.uLightSpecular = gl.getUniformLocation(program, "uLightSpecular");
  program.uMaterialDiffuse = gl.getUniformLocation(program, "uMaterialDiffuse");
  program.alphaUniform = gl.getUniformLocation(program, "uAlpha");
  program.uUseLighting = gl.getUniformLocation(program, "uUseLighting");
  program.uDrawColors = gl.getUniformLocation(program, "uDrawColors");
  return program;
}
function getShader(id, program) {
  var vs_source = null,
      fs_source = null;
  $.ajax({
    async: false,
    url: './shaders/' + id + '-vs.shader',
    success: function(data) {
      vs_source = data;
    },
    dataType: 'html'
  });
  $.ajax({
    async: false,
    url: './shaders/' + id + '-fs.shader',
    success: function(data) {
      fs_source = data;
    },
    dataType: 'html'
  });
  var vsshader;
  var fsshader;
  fsshader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fsshader, fs_source);
  gl.compileShader(fsshader);
  if (!gl.getShaderParameter(fsshader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(fsshader));
    return null;
  }
  vsshader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vsshader, vs_source);
  gl.compileShader(vsshader);
  if (!gl.getShaderParameter(vsshader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(vsshader));
    return null;
  }
  gl.attachShader(program, vsshader);
  gl.attachShader(program, fsshader);
}
function logGLCall(functionName, args) {
  console.log("gl." + functionName + "(" + WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function mouseX(evt) {
  if (evt.pageX)
    return evt.pageX;
  else if (evt.clientX)
    return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  else
    return null;
}
function mouseY(evt) {
  if (evt.pageY)
    return evt.pageY;
  else if (evt.clientY)
    return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  else
    return null;
}
function viewport() {
  var e = window;
  var a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return {
    width: e[$traceurRuntime.toProperty(a + 'Width')],
    height: e[$traceurRuntime.toProperty(a + 'Height')]
  };
}
function webGLStart() {
  var canvas = document.getElementById("canvas");
  initGL(canvas);
  helpers = new Helpers();
  camera = new Camera();
  picker = new Picker(canvas);
  game = new Game(canvas);
  document.onmouseup = game.stateEngine.gameState.actionMapper.handleMouseUp;
  document.onmousemove = game.stateEngine.gameState.actionMapper.handleMouseMove;
  document.onmousedown = game.stateEngine.gameState.actionMapper.handleMouseDown;
}
function updateLightPosition() {
  var x = $('#slider-x').slider("value");
  var y = $('#slider-y').slider("value");
  var z = $('#slider-z').slider("value");
  $('#slider-x-value').html(x);
  $('#slider-y-value').html(y);
  $('#slider-z-value').html(z);
}
function updateCameraPosition() {
  var x = $('#cslider-x').slider("value");
  var y = $('#cslider-y').slider("value");
  var z = $('#cslider-z').slider("value");
  $('#cslider-x-value').html(x);
  $('#cslider-y-value').html(y);
  $('#cslider-z-value').html(z);
}
function updateRotation() {
  var x = $('#rslider-x').slider("value");
  $('#rotslider-x-value').html(x);
}
$(document).ready(function() {
  $('#slider-x').slider({
    value: 0.0,
    min: -100,
    max: 100,
    step: 0.1,
    slide: updateLightPosition,
    change: updateLightPosition
  });
  $('#slider-y').slider({
    value: 68.0,
    min: -100,
    max: 100,
    step: 0.1,
    slide: updateLightPosition,
    change: updateLightPosition
  });
  $('#slider-z').slider({
    value: 50,
    min: -100,
    max: 100,
    step: 0.1,
    slide: updateLightPosition,
    change: updateLightPosition
  });
  $('#cslider-x').slider({
    value: 0,
    min: -100,
    max: 100,
    step: 0.1,
    slide: updateCameraPosition,
    change: updateCameraPosition
  });
  $('#cslider-y').slider({
    value: 0,
    min: -100,
    max: 100,
    step: 0.1,
    slide: updateCameraPosition,
    change: updateCameraPosition
  });
  $('#cslider-z').slider({
    value: 0,
    min: -100,
    max: 100,
    step: 0.1,
    slide: updateCameraPosition,
    change: updateCameraPosition
  });
  $('#rslider-x').slider({
    value: 0,
    min: 0,
    max: 360,
    step: 0.1,
    slide: updateRotation,
    change: updateRotation
  });
  webGLStart();
});
function intersectionpoint(A, B) {
  var r = -A[1] / B[1];
  var x = (r * B[0] + A[0]) / (r + 1);
  var z = (r * B[2] + A[2]) / (r + 1);
  return [x, 0, z];
}
function objectLabelGenerator() {
  var color = [Math.random(), Math.random(), Math.random(), 1.0];
  var key = color[0] + ':' + color[1] + ':' + color[2];
  if ($traceurRuntime.toProperty(key) in colorset) {
    return uniqueColorGenerator();
  } else {
    $traceurRuntime.setProperty(colorset, key, true);
    return color;
  }
}
function initGL(canvas) {
  try {
    gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl"));
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {}
  if (!gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
}
