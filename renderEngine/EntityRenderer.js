class EntityRenderer {

    constructor(shader) {
        this.gl = DisplayManager.gl;
        resize(this.gl);
        this.projectionMatrix = EntityRenderer.createProjectionMatrix();
        shader.loadProjectionMatrix(flatten(this.projectionMatrix));
    }

    prepare() {
        var gl = this.gl;
        //gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        gl.depthFunc(gl.LEQUAL);							//Near things obscure far things
    }

    render(entity, shader) {
        var gl = this.gl;
        var model = entity.model;
        var rawModel = model.rawModel;
        if (rawModel == null) rawModel = model;

        EntityRenderer.prepareTexturedModel(model, rawModel);

        var transformationMatrix = Maths.createTransformationMatrix(
            entity.position, entity.rotX, entity.rotY, entity.rotZ, entity.scale);
        shader.loadTransformationMatrix(transformationMatrix);
        shader.loadShineVariables(model.texture.shineDamper, model.texture.reflectivity);

        gl.drawElements(gl.TRIANGLES, rawModel.vertexCount, gl.UNSIGNED_SHORT, 0);
    }

    static prepareTexturedModel(model, rawModel) {
        gl.bindBuffer(gl.ARRAY_BUFFER, rawModel.buffers.pos);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, rawModel.buffers.norm);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, gl.FALSE, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, rawModel.buffers.tex);
        gl.vertexAttribPointer(2, 2, gl.FLOAT, gl.FALSE, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, model.texture);
    }

    static createProjectionMatrix() {
        return perspective(70, gl.canvas.width / gl.canvas.height, 0.1, 1000);
    }
}