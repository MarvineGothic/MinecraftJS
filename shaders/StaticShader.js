class StaticShader extends ShaderProgram {

    static get VERTEX_FILE() {
        return "shaders/vertexShader.glsl";
    }

    static get FRAGMENT_FILE() {
        return "shaders/fragmentShader.glsl";
    }

    constructor(gl) {
        super(gl, StaticShader.VERTEX_FILE, StaticShader.FRAGMENT_FILE);
        this.MAX_LIGHTS = 2;
        this.transfMatrixLoc = null;
        this.projectionMatrix = null;
        this.viewMatrix = null;
        this.sampler = null;

        this.ambientColorUniform = null;
        this.lightPosition = [2];
        this.lightColor = [2];
        this.attenuation = [2];
        this.bindAttributes();
        this.start();
        this.getAllUniformLocations();
    }

    start() {
        ShaderProgram.start();
    }

    bindAttributes() {
        ShaderProgram.bindAttribute('vertPosition', 0);
        ShaderProgram.bindAttribute('normal', 1);
        ShaderProgram.bindAttribute('textureCoordinates', 2);

    }

    getAllUniformLocations() {
        this.transfMatrixLoc = ShaderProgram.getUniformLoc('transformationMatrix');
        this.projectionMatrix = ShaderProgram.getUniformLoc('projectionMatrix');
        this.viewMatrix = ShaderProgram.getUniformLoc('viewMatrix');

        this.shineDamper = ShaderProgram.getUniformLoc('shineDamper');
        this.reflectivity = ShaderProgram.getUniformLoc('reflectivity');

        this.ambientColorUniform = ShaderProgram.getUniformLoc('ambientLightIntensity');
        for (var i = 0; i < 2; i++) {
            this.lightPosition[i] = ShaderProgram.getUniformLoc("light.position[" + i + "]");
            this.lightColor[i] = ShaderProgram.getUniformLoc("light.color[" + i + "]");
            this.attenuation[i] = ShaderProgram.getUniformLoc("attenuation[" + i + "]");
        }
    }

    loadShineVariables(damper, reflectivity) {
        ShaderProgram.loadFloat(this.shineDamper, damper);
        ShaderProgram.loadFloat(this.reflectivity, reflectivity);
    }

    loadTransformationMatrix(matrix) {
        ShaderProgram.loadMatrix(this.transfMatrixLoc, matrix);
    }

    loadProjectionMatrix(matrix) {
        ShaderProgram.loadMatrix(this.projectionMatrix, matrix);
    }

    loadViewMatrix(camera) {
        var m = Maths.createViewMatrix(camera);
        ShaderProgram.loadMatrix(this.viewMatrix, m);
    }

    loadLights(lights) {
        for (var i = 0; i < this.MAX_LIGHTS; i++) {
            if (i < lights.length) {
                ShaderProgram.loadVector(this.lightPosition[i], lights[i].position);
                ShaderProgram.loadVector(this.lightColor[i], lights[i].color);
                ShaderProgram.loadVector(this.attenuation[i], lights[i].attenuation);
               // console.log(lights[i].attenuation)
            } else {
                ShaderProgram.loadVector(this.lightPosition[i], new Vector3f(0, 0, 0));
                ShaderProgram.loadVector(this.lightColor[i], new Vector3f(0, 0, 0));
                ShaderProgram.loadVector(this.attenuation[i], new Vector3f(1, 0, 0));
            }
        }
        ShaderProgram.loadVector(this.ambientColorUniform, new Vector3f(0.2, 0.2, 0.2));
    }
}