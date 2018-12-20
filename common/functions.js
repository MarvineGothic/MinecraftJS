function createArrayBuffer(gl, array) {
    // create buffer id
    var id = gl.createBuffer();
    // set id to the current active array buffer (only one can be active)
    gl.bindBuffer(gl.ARRAY_BUFFER, id);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
    return id;
}

function createElementArrayBuffer(gl, array) {
    // create buffer id
    var id = gl.createBuffer();
    // set id to the current active array buffer (only one can be active)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, id);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(array), gl.STATIC_DRAW);
    return id;
}


// http://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
function resize(gl) {
    var realToCSSPixels = window.devicePixelRatio || 1;

    // Lookup the size the browser is displaying the canvas in CSS pixels
    // and compute a size needed to make our drawingbuffer match it in
    // device pixels.
    var displayWidth = Math.floor(gl.canvas.clientWidth * realToCSSPixels);
    var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

    // Check if the canvas is not the same size.
    if (gl.canvas.width !== displayWidth ||
        gl.canvas.height !== displayHeight) {

        // Make the canvas the same size
        gl.canvas.width = displayWidth;
        gl.canvas.height = displayHeight;

        // Set the viewport to match
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
}

function handleLoadedTexture(gl, textures) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[0].image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    gl.bindTexture(gl.TEXTURE_2D, textures[1]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[1].image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.bindTexture(gl.TEXTURE_2D, textures[2]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[2].image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);
}

//////////////////////////////////////////////////
function hexToRgb(hex) {
    if (Array.isArray(hex)) {
        return [hex[0] / 255, hex[1] / 255, hex[2] / 255, 1];
    }

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? ( [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
        1
    ]) : null;
}

function scaleLight(intensity, color) {
    var a = scale(intensity, hexToRgb(color));
    a[3] = 1;
    return new Float32Array(a);
}
////////////////////////////////////////////////////////
function resourceLoaded(func) {
    numberOfResourcesToLoad--;
    if (numberOfResourcesToLoad === 0) {
        // start rendering
        func();
    }
    if (numberOfResourcesToLoad < 0) {
        alert("Invalid number of resources");
    }
}

function resourceLoadError(err) {
    console.log(err);
    alert(err);
}
//////////////////////////////////////



