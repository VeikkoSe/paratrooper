var AstarManager = function AstarManager() {
  "use strict";
  var data = [];
  for (var i = 0; i < 256; i++) {
    $traceurRuntime.setProperty(data, i, []);
    for (var j = 0; j < 256; j++) {
      if ((j > 25 && j < 37) && (i > 25 && i < 35))
        $traceurRuntime.setProperty(data[$traceurRuntime.toProperty(i)], j, 0);
      else
        $traceurRuntime.setProperty(data[$traceurRuntime.toProperty(i)], j, 1);
    }
  }
  this.graphDiagonal = new Graph(data, {diagonal: true});
};
($traceurRuntime.createClass)(AstarManager, {
  move: function(start, end) {
    "use strict";
    var start = this.graphDiagonal.grid[$traceurRuntime.toProperty(Math.floor(start.x))][$traceurRuntime.toProperty(Math.floor(start.y))];
    var end = this.graphDiagonal.grid[$traceurRuntime.toProperty(Math.floor(end.x))][$traceurRuntime.toProperty(Math.floor(end.y))];
    var res = astar.search(this.graphDiagonal, start, end);
    return res;
  },
  Create2DArray: function(rows) {
    "use strict";
    var arr = [];
    for (var i = 0; i < rows; i++) {
      $traceurRuntime.setProperty(arr, i, []);
    }
    return arr;
  }
}, {});
