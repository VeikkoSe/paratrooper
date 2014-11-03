class Terrain {
    constructor(heightmap) {
        //var t = ;

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
        this.terrainData = null;




    }

    createData() {


        this.terrainData = this.createHeightMap();


    }

    getHeightData(img) {
        var size = 128;
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        var context = canvas.getContext('2d', {preserveDrawingBuffer: true});


        var data = this.matrix(size, size, 0);


        context.drawImage(img, 0, 0);


        var imgd = context.getImageData(0, 0, size, size);

        var pix = imgd.data;
        var x = 0;
        var y = 0;

        for (var i = 0, n = pix.length; i < n; i += (4)) {
            if (x == 128) {
                y++;
                x = 0;
            }
            var all = pix[i] + pix[i + 1] + pix[i + 2];

            data[y][x] = all / 30;
            x++;
        }


        return data;
    }


    matrix(rows, cols, defaultValue) {

        var arr = [];

        // Creates all lines:
        for (var i = 0; i < rows; i++) {

            // Creates an empty line
            arr.push([]);

            // Adds cols to the empty line:
            arr[i].push(new Array(cols));

            for (var j = 0; j < cols; j++) {
                // Initializes:
                arr[i][j] = defaultValue;
            }
        }

        return arr;
    }


    createHeightMap() {


        var heightData = this.getHeightData(this.texture.loadedTexture.image);

        var squares = 256;
        var width = 256;

        var xLength = squares;
        var yLength = squares;

        var heightMapVertexData = [];
        var hd = [];

        var part = width / squares;

        var c = 0;
        // First, build the data for the vertex buffer
        for (var x = 0; x < xLength; x++) {

            for (var y = 0; y < yLength; y++) {

                //first triangle of square
                var xPosition1 = x + 1;
                var yPosition1 = y;

                var xPosition2 = x + 1;
                var yPosition2 = y + 1;

                var xPosition3 = x;
                var yPosition3 = y;

                //second triangle of square
                var xPosition4 = x;
                var yPosition4 = y;

                var xPosition5 = x + 1;
                var yPosition5 = y + 1;

                var xPosition6 = x;
                var yPosition6 = y + 1;


                // Position
                hd[c++] = [xPosition1, yPosition1];
                hd[c++] = [xPosition2, yPosition2];
                hd[c++] = [xPosition3, yPosition3];

                hd[c++] = [xPosition4, yPosition4];
                hd[c++] = [xPosition5, yPosition5];
                hd[c++] = [xPosition6, yPosition6];

            }
        }

        c = 0;
        //keeps the indices;
        var iloop = [];
        //indice order number
        var il = 0;
        //if we have already used a vertice don't add it again
        //just link the original with index
        var added = {};
        var alreadyAdded;

        //we create indexbuffer
        for (var i = 0; i < hd.length; i++) {
            alreadyAdded = false;

            if (hd[i][0] + ',' + hd[i][1] in added) {

                iloop.push(added[hd[i][0] + ',' + hd[i][1]]);
                alreadyAdded = true;

            }

            if (!alreadyAdded) {
                //x y z
                //y is determined from heightmap value in same xy position
                heightMapVertexData[c++] = hd[i][0] * part;
                //heightMapVertexData[c++] = 0;
                heightMapVertexData[c++] = heightData[hd[i][1]][hd[i][0]];
                heightMapVertexData[c++] = hd[i][1] * part;

                added[hd[i][0] + ',' + hd[i][1]] = il;
                iloop.push(il);

                il++;
            }
        }

        var normals = this.createNormals(heightMapVertexData, iloop);


        console.log(heightMapVertexData);
        console.log(iloop);


        var fakeTexture = [];
        var c = 0;
        for (var i = 0; i < normals.length; i++) {
            fakeTexture[c] = 0;
            c++;
            fakeTexture[c] = 1;
            c++;

        }
        console.log(fakeTexture);
        console.log(normals);
        return;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fakeTexture), gl.STATIC_DRAW);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(heightMapVertexData), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexPositionBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(iloop), gl.STATIC_DRAW);
        this.indexPositionBuffer.numItems = iloop.length;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

        return hd;
    }




    createNormals(vs, ind) {
        var x = 0;
        var y = 1;
        var z = 2;

        var ns = [];
        for (var i = 0; i < vs.length; i++) { //for each vertex, initialize normal x, normal y, normal z
            ns[i] = 0.0;
        }

        for (var i = 0; i < ind.length; i = i + 3) { //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
            var v1 = [];
            var v2 = [];
            var normal = [];
            //p1 - p0
            v1[x] = vs[3 * ind[i + 1] + x] - vs[3 * ind[i] + x];
            v1[y] = vs[3 * ind[i + 1] + y] - vs[3 * ind[i] + y];
            v1[z] = vs[3 * ind[i + 1] + z] - vs[3 * ind[i] + z];
            // p0 - p1
            v2[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];
            v2[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];
            v2[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];
            //p2 - p1
            // v1[x] = vs[3*ind[i+2]+x] - vs[3*ind[i+1]+x];
            // v1[y] = vs[3*ind[i+2]+y] - vs[3*ind[i+1]+y];
            // v1[z] = vs[3*ind[i+2]+z] - vs[3*ind[i+1]+z];
            // p0 - p1
            // v2[x] = vs[3*ind[i]+x] - vs[3*ind[i+1]+x];
            // v2[y] = vs[3*ind[i]+y] - vs[3*ind[i+1]+y];
            // v2[z] = vs[3*ind[i]+z] - vs[3*ind[i+1]+z];
            //cross product by Sarrus Rule
            normal[x] = v1[y] * v2[z] - v1[z] * v2[y];
            normal[y] = v1[z] * v2[x] - v1[x] * v2[z];
            normal[z] = v1[x] * v2[y] - v1[y] * v2[x];

            // ns[3*ind[i]+x] += normal[x];
            // ns[3*ind[i]+y] += normal[y];
            // ns[3*ind[i]+z] += normal[z];
            for (var j = 0; j < 3; j++) { //update the normals of that triangle: sum of vectors
                ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
                ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
                ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
            }
        }
        //normalize the result
        for (var i = 0; i < vs.length; i = i + 3) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)

            var nn = [];
            nn[x] = ns[i + x];
            nn[y] = ns[i + y];
            nn[z] = ns[i + z];

            var len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
            if (len == 0) len = 0.00001;

            nn[x] = nn[x] / len;
            nn[y] = nn[y] / len;
            nn[z] = nn[z] / len;

            ns[i + x] = nn[x];
            ns[i + y] = nn[y];
            ns[i + z] = nn[z];
        }

        return ns;
    }
}