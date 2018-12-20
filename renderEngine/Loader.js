class Loader {

    constructor(gl) {
        this.gl = gl;
    }

    loadToVAO(positions, textureCoord, normals, indices) {
        var indexBufferID = this.bindIndicesBuffer(indices);
        var buffers = {
            pos: this.storeDataInAttributeList(0, 3, positions),
            norm: this.storeDataInAttributeList(1, 3, normals),
            tex: this.storeDataInAttributeList(2, 2, textureCoord)
        };
        return new RawModel(indices.length, indexBufferID, buffers);
    }

    loadTexture(filename) {
        var gl = this.gl;
        var texture = gl.createTexture();
        texture.image = new Image();
        texture.image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
            gl.generateMipmap(gl.TEXTURE_2D);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        };
        texture.image.src = filename;
        return texture;
    }

    storeDataInAttributeList(attributeNumber, coordinateSize, data) {
        // create buffer id
        var gl = this.gl;
        var id = gl.createBuffer();

        // set id to the current active array buffer (only one can be active)
        gl.bindBuffer(gl.ARRAY_BUFFER, id);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, id);
        gl.vertexAttribPointer(attributeNumber, coordinateSize, gl.FLOAT, gl.FALSE, 0, 0);
        return id;
    }

    bindIndicesBuffer(indices) {
        // create buffer id
        var gl = this.gl;
        var id = gl.createBuffer();

        // set id to the current active array buffer (only one can be active)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, id);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        return id;
    }
}