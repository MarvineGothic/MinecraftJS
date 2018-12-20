class Maths {
    static createTransformationMatrix(translation, rx, ry, rz, scale) {
        var matrix = mat4();

        matrix = mult(rotateX(rx), matrix);
        matrix = mult(rotateY(ry), matrix);
        matrix = mult(rotateZ(rz), matrix);
        matrix = mult(translate(translation.x, translation.y, translation.z), matrix);
        matrix = mult(scalem(scale, scale, scale), matrix);
        return matrix;
    }

    static createViewMatrix(camera) {
        var view = mat4();
        var pos = camera.position;
        view = mult(translate(-pos.x, -pos.y, -pos.z), view);
        view = mult(mult(rotateX(camera.pitch), rotateY(camera.yaw)), view);
        return view;
    }
    static mat4f(){
        return mat4();
    }
}