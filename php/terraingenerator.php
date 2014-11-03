<?php

ini_set("display_errors",1);
ini_set('memory_limit', '-1');

class Terrain {

    public function __construct($imagefile) {

        if(!$imagefile)
        {
            return false;
        }
        //this.texture = new Texture(heightmap);
        $this->data = null;
        $this->initDone = 0;

        $this->normals = null;
        $this->vertices = null;
        $this->textures = null;
        $this->indices = null;
        $this->terrainData = null;
        $this->imageFile = $imagefile;

        $this->imageSize = getimagesize ($imagefile)[0];
        //$this->imageSize = 128;    


    }



    private function getHeightData() {


        $size = $this->imageSize;
        //$canvas = document.createElement('canvas');
        //$canvas[.]width = size;
        //canvas.height = size;
        //$context = canvas.getContext('2d', {preserveDrawingBuffer: true});
        $im = imagecreatefrompng($this->imageFile);
        for($y = 0;$y<$size;$y++)
        {
          for($x = 0;$x<$size;$x++)
          {

            $src_index = imagecolorat($im,$x,$y);
            $pxlcolor = imagecolorsforindex($im, $src_index);
    
            $data[$y][$x] = 255-$pxlcolor['red'];
          }   
        }    
        imagedestroy($im);

        //context.drawImage(img, 0, 0);


        //$imgd = context.getImageData(0, 0, size, size);

        //$pix = imgd.data;
        /*
        $x = 0;
        $y = 0;
        $pix = 100;
        for ($i = 0, $n = count($pix); $i < $n; $i += (4)) {
            if ($x == $size) {
                $y++;
                $x = 0;
            }
            $all = $pix[$i] + $pix[$i + 1] + $pix[$i + 2];

            $data[$y][$x] = $all / 30;
            $x++;
        }
        */

        return $data;
    }


    public function createHeightMap() {


        $heightData = $this->getHeightData();


        $squares = $this->imageSize-1;
        //$width = $this->imageSize;
        $width  = $this->imageSize;


        $heightMapVertexData = array();
        $hd = array();

        $part = $width / $squares;


        // First, build the data for the vertex buffer
        for ($x = 0; $x < $squares; $x++) {

            for ($y = 0; $y < $squares; $y++) {

                //first triangle of square
                $xPosition1 = $x + 1;
                $yPosition1 = $y;

                $xPosition2 = $x + 1;
                $yPosition2 = $y + 1;

                $xPosition3 = $x;
                $yPosition3 = $y;

                //second triangle of square
                $xPosition4 = $x;
                $yPosition4 = $y;

                $xPosition5 = $x + 1;
                $yPosition5 = $y + 1;

                $xPosition6 = $x;
                $yPosition6 = $y + 1;

                // Position
                $hd[] = array($xPosition1, $yPosition1);
                $hd[] = array($xPosition2, $yPosition2);
                $hd[] = array($xPosition3, $yPosition3);

                $hd[] = array($xPosition4, $yPosition4);
                $hd[] = array($xPosition5, $yPosition5);
                $hd[] = array($xPosition6, $yPosition6);

            }
        }

      
        //keeps the indices;
        $iloop = array();
        //indice order number
        $il = 0;
        //if we have already used a vertice don't add it again
        //just link the original with index
        $added = array();
        //$alreadyAdded = false;
        $heightMapVertexData = array();
        //we create indexbuffer

        for ($i = 0; $i < count($hd); $i++) {
            //$alreadyAdded = false;

            $xc = $hd[$i][0] * $part;
            $yc = $hd[$i][1] * $part;

            if (isset($added[$xc][$yc])) {

                //$iloop[] = $added[$hd[$i][0] . ',' . $hd[$i][1]];
            //    $iloop[] = $iloop[$key];//$iloop[] = $added[$hd[$i][0] . ',' . $hd[$i][1]];
                //$alreadyAdded = true;
                $iloop[] = $added[$xc][$yc];    
            }
            else { 
            //    if (!$alreadyAdded) {
                //x y z
                //y is determined from heightmap value in same xy position
                $heightMapVertexData[] = $xc;
                $heightMapVertexData[] = $heightData[$hd[$i][1]][$hd[$i][0]];
                $heightMapVertexData[] = $yc;

                $added[$xc][$yc] = $il;
                $iloop[] = $il;//$hd[$i][0] . ',' . $hd[$i][1];

                $il++;
            }
        }
        unset($hd);
        unset($added);
        unset($heightData);

        $normals = $this->createNormals($heightMapVertexData, $iloop);

        $fakeTexture = array();
        $c = 0;
        for ($i = 0; $i < count($normals); $i++) {
            $fakeTexture[$c] = 0;
            $c++;
            $fakeTexture[$c] = 1;
            $c++;

        }

        return array('vertices'=>$heightMapVertexData,'indices'=>$iloop,'normals'=>$normals,'texturecoordinates'=>$fakeTexture,
              "ambient"  => array(0.5,0.5,0.5),
  "diffuse"  => array(0.9,0.9,0.9),
  "specular" => array(1.0,1.0,1.0));
/*
var_dump($heightMapVertexData);
var_dump($iloop);
        var_dump($normals);

*/
        //console.log(heightMapVertexData);
        //console.log(iloop);


        //$fakeTexture = [];
        //$c = 0;
        //for ($i = 0; $i < count($normals); $i++) {
        //    $fakeTexture[$c] = 0;
        //    $c++;
        //    $fakeTexture[$c] = 1;
        //    $c++;

        //}
        //console.log(fakeTexture);
        //console.log(normals);
/*

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fakeTexture), gl.STATIC_DRAW);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(heightMapVertexData), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexPositionBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(iloop), gl.STATIC_DRAW);
        this.indexPositionBuffer.numItems = iloop.length;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
*/
        //return $hd;
    }




    private function createNormals($vs, $ind) {


        $x = 0;
        $y = 1;
        $z = 2;

        $ns = array();

       
        for ($i = 0; $i < count($vs); $i++) { //for each vertex, initialize normal x, normal y, normal z
            $ns[$i] = 0.0;
        }



        for ($i = 0; $i < count($ind); $i = $i + 3) { //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
            $v1 = array();
            $v2 = array();
            $normal = array();
            //p1 - p0
            $v1[$x] = $vs[3 * $ind[$i + 1] + $x] - $vs[3 * $ind[$i] + $x];
            $v1[$y] = $vs[3 * $ind[$i + 1] + $y] - $vs[3 * $ind[$i] + $y];
            $v1[$z] = $vs[3 * $ind[$i + 1] + $z] - $vs[3 * $ind[$i] + $z];
            // p0 - p1
            $v2[$x] = $vs[3 * $ind[$i + 2] + $x] - $vs[3 * $ind[$i + 1] + $x];
            $v2[$y] = $vs[3 * $ind[$i + 2] + $y] - $vs[3 * $ind[$i + 1] + $y];
            $v2[$z] = $vs[3 * $ind[$i + 2] + $z] - $vs[3 * $ind[$i + 1] + $z];
            //p2 - p1
            // v1[x] = vs[3*ind[i+2]+x] - vs[3*ind[i+1]+x];
            // v1[y] = vs[3*ind[i+2]+y] - vs[3*ind[i+1]+y];
            // v1[z] = vs[3*ind[i+2]+z] - vs[3*ind[i+1]+z];
            // p0 - p1
            // v2[x] = vs[3*ind[i]+x] - vs[3*ind[i+1]+x];
            // v2[y] = vs[3*ind[i]+y] - vs[3*ind[i+1]+y];
            // v2[z] = vs[3*ind[i]+z] - vs[3*ind[i+1]+z];
            //cross product by Sarrus Rule
            $normal[$x] = $v1[$y] * $v2[$z] - $v1[$z] * $v2[$y];
            $normal[$y] = $v1[$z] * $v2[$x] - $v1[$x] * $v2[$z];
            $normal[$z] = $v1[$x] * $v2[$y] - $v1[$y] * $v2[$x];
  /*          var_dump($i);
            var_dump($ns);
            var_dump($normal);

            var_dump();
            var_dump($ns[3 * $ind[$i + 1] + 0]);
            var_dump($ns[3 * $ind[$i + 2] + 0]);
   
            exit;*/
            // ns[3*ind[i]+x] += normal[x];
            // ns[3*ind[i]+y] += normal[y];
            // ns[3*ind[i]+z] += normal[z];
            for ($j = 0; $j < 3; $j++) { //update the normals of that triangle: sum of vectors
                $ns[3 * $ind[$i + $j] + $x] = $ns[3 * $ind[$i + $j] + $x] + $normal[$x];
                $ns[3 * $ind[$i + $j] + $y] = $ns[3 * $ind[$i + $j] + $y] + $normal[$y];
                $ns[3 * $ind[$i + $j] + $z] = $ns[3 * $ind[$i + $j] + $z] + $normal[$z];
            }
        }
        //normalize the result
        for ($i = 0; $i < count($vs); $i = $i + 3) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)

            $nn = array();
            $nn[$x] = $ns[$i + $x];
            $nn[$y] = $ns[$i + $y];
            $nn[$z] = $ns[$i + $z];

            $len = sqrt(($nn[$x] * $nn[$x]) + ($nn[$y] * $nn[$y]) + ($nn[$z] * $nn[$z]));
            if ($len === 0 || is_nan($len)) 
                $len = 0.00001;

            $nn[$x] = $nn[$x] / $len;
            $nn[$y] = $nn[$y] / $len;
            $nn[$z] = $nn[$z] / $len;

            $ns[$i + $x] = $nn[$x];
            $ns[$i + $y] = $nn[$y];
            $ns[$i + $z] = $nn[$z];
        }

        return $ns;
    }
}
for ($i=1;$i<10;$i++)
{
    $terrain = new Terrain("heightmap_".$i.".png");
    $data = $terrain->createHeightMap();

    file_put_contents("heightmap_".$i.".js",json_encode($data));
    unset($data);
}

