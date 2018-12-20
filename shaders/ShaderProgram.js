class ShaderProgram {


    constructor(gl, vertexFile, fragmentFile) {
        if (new.target === ShaderProgram) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        this.programID = initShaders(gl, vertexFile, fragmentFile);
        ShaderProgram.gl = gl;
        ShaderProgram.programID = this.programID;
        ShaderProgram.start();
    }

    static getUniformLoc(uniformName) {
        return ShaderProgram.gl.getUniformLocation(ShaderProgram.programID, uniformName);
    }

    static start() {
        ShaderProgram.gl.useProgram(ShaderProgram.programID);
    }

    static bindAttribute(variableName, attributeNumber) {
        ShaderProgram.gl.getAttribLocation(ShaderProgram.programID, variableName);
        ShaderProgram.gl.enableVertexAttribArray(attributeNumber);
    };

    static loadFloat(location, value) {
        ShaderProgram.gl.uniform1i(location, value);
    }

    static loadVector(location, vector) {
        ShaderProgram.gl.uniform3f(location, vector.x, vector.y, vector.z);
    }

    static loadBoolean(location, value) {
        var toLoad = 0;
        if (value)
            toLoad = 1;
        ShaderProgram.gl.uniform1f(location, toLoad);
    }

    static loadMatrix(location, matrix) {
        ShaderProgram.gl.uniformMatrix4fv(location, false, flatten(matrix));
    }
}