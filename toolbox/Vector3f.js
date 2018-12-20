class Vector3f {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    scale(scale) {
        this.x *= scale;
        this.y *= scale;
        return this;
    }

    normalise() {
        var len = this.length();
        if (len !== 0.0) {
            var l = 1.0 / len;
            return this.scale(l);
        } else {
            console.error("Zero length vector");
        }
    }
}