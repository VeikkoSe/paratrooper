class Picker {
    constructor() {
        this.plist = [];

        this.texture = null;
        this.framebuffer = null;
        this.renderbuffer = null;
        this.pickerColors = [];
        this.picked = false;

        this.configure();
    }

    createColor() {

        var color = [Math.random(), Math.random(), Math.random()];
        for (var i = 0; i < this.pickerColors.length; i++) {

            if (color[0] == this.pickerColors[i][0] &&
                color[1] == this.pickerColors[i][1] &&
                color[2] == this.pickerColors[i][2]) {
                return this.createColor();
            }
        }
        this.pickerColors.push(color);
        return color;
    }

    configure() {


        //1. Init Picking Texture
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolutionWidth, resolutionHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        //2. Init Render Buffer
        this.renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, resolutionWidth, resolutionHeight);


        //3. Init Frame Buffer
        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);


        //4. Clean up
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

;


    initTextureFramebuffer() {

        //3. Init Frame Buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);


        //1. Init Picking Texture
        gl.bindTexture(gl.TEXTURE_2D, this.rttTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.frameBufferWidth, this.frameBufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        //2. Init Render Buffer
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.frameBufferWidth, this.frameBufferHeight);

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.rttTexture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);

        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    }


    compareColors(readout, color) {


        return (Math.abs(Math.round(color[0] * 255) - readout[0]) <= 1 &&
            Math.abs(Math.round(color[1] * 255) - readout[1]) <= 1 &&
            Math.abs(Math.round(color[2] * 255) - readout[2]) <= 1);
    }

    hitProperty(ob) {
        return ob.diffuse;
    }

    findAndSet(coords) {

        //read one pixel
        var readout = new Uint8Array(1 * 1 * 4);
        //console.info(this.framebuffer);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.readPixels(coords[0], coords[1], 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, readout);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);


        //var property = game.stateEngine.gameState.medic.model.diffuse;
        var foundSelectableEntities = em.getAllEntitiesPosessingComponent("Selectable");
        var newSelected = null;
        var oldSelected = null;
        for (var i = 0; i < foundSelectableEntities.length; i++) {

            var selectable = em.searchComponentForEntity(foundSelectableEntities[i], "Selectable");

            if (selectable.selected) {
                oldSelected = selectable;
            }
            if (this.compareColors(readout, selectable.color)) {
                newSelected = selectable;
            }
            selectable.selected = false;
        }
        if (newSelected)
            newSelected.selected = true;
        else if (oldSelected)
            oldSelected.selected = true;


        //return false;


    }


;
}

