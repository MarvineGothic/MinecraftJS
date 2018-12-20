function Camera(x, y, z) {
    var c = this;
    var position = new Vector3f(x, y, z);
    this.position = position;
    var pitch = 0;
    c.pitch = pitch;
    var yaw = 0;
    c.yaw = yaw;
    var roll = 0;
    this.roll = roll;
    c.remove = false;

    var mouseDragging = false;
    var mouseX = false;
    var mouseY = false;
    var speed = 0;
    var speedD = 0.5;
    var sideSpeed = 0;
    var up = 0;
    var down = 0;

    this.init = function () {
        window.onmousemove = this.mouseMove;
        window.onmousedown = this.mouseDown;
        window.onmouseup = this.mouseUp;
        window.onkeydown = this.onkeyDown;
        window.onkeyup = this.onkeyUp;
    };

    this.findLookAtVoxelCoordinates = function (voxelPos, maxDistance) {
        var y = voxelPos.y;
        var entX = voxelPos.x;
        var dy = this.position.y - y;
        var distance = Math.abs(dy / Math.sin(radians(c.pitch)));
        if (distance > maxDistance) return null;

        var radius = dy === 0 ? (entX - this.position.x) / Math.sin(radians(c.yaw)) : dy / Math.tan(radians(c.pitch));

        var z = radius * Math.cos(radians(c.yaw)) + this.position.z;
        var x = radius * Math.sin(radians(c.yaw)) + this.position.x;
        return new Vector3f(x, y, z);
    };

    this.mouseMove = function (event) {
        var rotationSpeed;
        if (mouseDragging) {
            event = event || /* IE */ window.event;
            rotationSpeed = 0.2;
            c.pitch -= (-mouseY + event.clientY) * rotationSpeed;
            c.yaw -= (-mouseX + event.clientX) * rotationSpeed;
            mouseX = event.clientX;
            mouseY = event.clientY;
        }
    };

    this.mouseDown = function (event) {
        event = event || /* IE */ window.event;
        mouseDragging = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
    };

    this.mouseUp = function () {
        mouseDragging = false;
    };

    this.onkeyDown = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key === "W".charCodeAt(0)) {
            speed = speedD;
        }
        if (key === "S".charCodeAt(0)) {
            speed = -speedD;
        }
        if (e.shiftKey) {
            speedD = 1.5;
        }
        if (key === "A".charCodeAt(0)) {
            sideSpeed = speedD;
        }
        if (key === "D".charCodeAt(0)) {
            sideSpeed = -speedD;
        }
        if (key === 'Q'.charCodeAt(0)) {
            down = speedD;
        }

        if (key === 'E'.charCodeAt(0)) {
            up = speedD;
        }
        // remove voxel
        if (key === 'R'.charCodeAt(0)) {
            c.remove = true;
        }
    };

    this.onkeyUp = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key === "W".charCodeAt(0) || key === "S".charCodeAt(0))
            speed = 0;

        if (key === "A".charCodeAt(0) || key === "D".charCodeAt(0))
            sideSpeed = 0;

        if (key === 'Q'.charCodeAt(0)) {
            down = 0;
        }

        if (key === 'E'.charCodeAt(0)) {
            up = 0;
        }
        if (e.shiftKey) {
            speedD = 0.5;
        }
        if (key === 'R'.charCodeAt(0)) {
            c.remove = false;
        }

    };

    this.move = function () {

        if (speed !== 0) {
            position.x -= Math.sin(radians(c.yaw)) * speed;
            position.z -= Math.cos(radians(c.yaw)) * speed;
        }

        if (sideSpeed !== 0) {
            position.x -= Math.cos(radians(c.yaw)) * sideSpeed;
            position.z += Math.sin(radians(c.yaw)) * sideSpeed;
        }

        if (down !== 0) position.y += down;
        if (up !== 0) position.y -= up;

    };
}