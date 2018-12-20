class Entity {

    constructor(model, position, rotX, rotY, rotZ, scale) {
        this.model = model;
        this.position = position;
        this.rotX = rotX;
        this.rotY = rotY;
        this.rotZ = rotZ;
        this.scale = scale;
    }

    increasePosition(dx, dy, dz) {
        this.position.x += dx;
        this.position.y += dy;
        this.position.z += dz;
    }

    increaseRotation(dx, dy, dz) {
        this.rotX += dx;
        this.rotY += dy;
        this.rotZ += dz;
    }

    equals(other) {
        if (this === other) return true;
        if (other === null || other.position === null) return false;
        return this.position.x + 0.5 > other.position.x && this.position.x - 0.5 < other.position.x &&
            this.position.z + 0.5 > other.position.z && this.position.z - 0.5 < other.position.z &&
            this.position.y + 0.5 > other.position.y && this.position.y - 0.5 < other.position.y;
    }
}