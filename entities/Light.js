class Light extends Entity {

    constructor(position, color, model, attenuation) {
        super(null, position, 0, 0, 0, 1);
        this.position = position;
        this.color = color;
        super.model = model;
        this.attenuation = attenuation === undefined ? new Vector3f(1, 0, 0) : this.attenuation = attenuation;
    }

    setIntensity(intensity) {
        this.color.x = intensity;
        this.color.y = intensity;
        this.color.z = intensity;
    }

    static dayNight(directionalLight) {
        // Update directional light direction, intensity and colour
        lightAngle += 0.5;

        if (lightAngle > 90) {
            directionalLight.setIntensity(0);
            gl.clearColor(0, 0, 0, 1);
            if (lightAngle >= 270)
                lightAngle = -90;
        }
        else if (lightAngle <= -80 || lightAngle >= 80) {
            var factor = 1 - (Math.abs(lightAngle) - 80) / 10;
            directionalLight.setIntensity(factor);
            gl.clearColor(factor * 0.75, factor * 0.85, factor * 0.8, 1.0);
        }

        else {
            directionalLight.color.x = 1.5;
            directionalLight.color.y = 1.5;
            directionalLight.color.z = 1.5;
            gl.clearColor(0.75, 0.85, 0.8, 1.0);
        }
        var angRad = radians(lightAngle);
        directionalLight.position.x = 100 * Math.sin(angRad);
        directionalLight.position.y = 100 * Math.cos(angRad);
    }
}