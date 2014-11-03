class AstarManager {

    constructor() {
        var data = [];

        for(var i=0;i<256;i++)
        {
            data[i] = [];
            for(var j=0;j<256;j++)
            {
                if((j>25 && j<37) && (i>25 && i<35))
                    data[i][j] = 0;
                else
                    data[i][j] = 1;
            }
        }


        this.graphDiagonal = new Graph(
            data
        , { diagonal: true });


    }
    move(start,end) {

        var start = this.graphDiagonal.grid[Math.floor(start.x)][Math.floor(start.y)];
        var end = this.graphDiagonal.grid[Math.floor(end.x)][Math.floor(end.y)];
        var res = astar.search(this.graphDiagonal, start, end)

        return res;
    }

    Create2DArray(rows) {
        var arr = [];

        for (var i=0;i<rows;i++) {
            arr[i] = [];
        }

        return arr;
    }


}

