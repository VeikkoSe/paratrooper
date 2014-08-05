class Terrain {
    constructor(heightmap) {
        var t = new Texture(heightmap);

        this.texture = t.loadedTexture;
        this.data = this.getHeightData(this.texture.image);

        this.plane = this.buildPlane(200,128);

        var j=0;

        for (var i=1;i<this.plane[1].length;i= i+3)
        {

            this.plane[1][i] = this.data[j];
            j++;

        }


        this.plane.push(this.createNormals(this.plane[1],this.plane[0]));

        this.vertexPositionBuffer = gl.createBuffer();
        this.texturePositionBuffer = gl.createBuffer();
        this.indexPositionBuffer = gl.createBuffer();
        this.normalPositionBuffer = gl.createBuffer();

        var fakeTextures = [];
        var c = 0;
        for (var i=0;i<this.plane[2].length;i++)
        {
            fakeTextures[c] = 0;
            c++;
            fakeTextures[c] = 1;
            c++;

        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fakeTextures), gl.STATIC_DRAW);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.plane[1]), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexPositionBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.plane[0]), gl.STATIC_DRAW);
        this.indexPositionBuffer.numItems  = this.plane[0].length;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.plane[2]), gl.STATIC_DRAW);



    }

    getHeightData(img) {
        var canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        var context = canvas.getContext('2d');

        var size = 128 * 128;
        var data = new Float32Array(size);

        context.drawImage(img, 0, 0);

        for (var i = 0; i < size; i++) {
            data[i] = 0
        }

        var imgd = context.getImageData(0, 0, 128, 128);
        var pix = imgd.data;

        var j = 0;
        for (var i = 0, n = pix.length; i < n; i += (4)) {
            var all = pix[i] + pix[i + 1] + pix[i + 2];
            data[j++] = all / 30;
        }
        return data;
    }





    buildPlane(width, squares) {


        var SIZE_PER_SIDE = squares;


        var xLength = squares;
        var yLength = squares;

        var heightMapVertexData = [];
        var hd = [];


        var zPosition = 0;

        var part = width / squares;

        var c = 0;
        // First, build the data for the vertex buffer
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


                // Position
                hd[c++] = [xPosition1, yPosition1];
                hd[c++] = [xPosition2, yPosition2];
                hd[c++] = [xPosition3, yPosition3];

                hd[c++] = [xPosition4, yPosition4];
                hd[c++] = [xPosition5, yPosition5];
                hd[c++] = [xPosition6, yPosition6];





            }

        }




        //console.log(hd);
        c = 0;
        var iloop = [];
        var il = 0;
        var added = {};
        var val = [];
        var alreadyAdded;

        for (var i = 0; i < hd.length; i++) {
            alreadyAdded = false;

            if (hd[i][0]+','+hd[i][1] in added) {

                iloop.push(added[hd[i][0]+','+hd[i][1]]);
                alreadyAdded = true;

            }

            if (!alreadyAdded) {
                heightMapVertexData[c++] = hd[i][0];
                heightMapVertexData[c++] = 0;
                heightMapVertexData[c++] = hd[i][1];

                added[hd[i][0]+','+hd[i][1]] = il;
                iloop.push(il);

                il++;
            }


        }


        var plane = [];
        plane.push(iloop);
        plane.push(heightMapVertexData);
        return plane;

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