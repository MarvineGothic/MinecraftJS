class DisplayManager {

    constructor() {
        this.createDisplay();
        this.then = 0;
        this.now = 1;
    }

    // creating canvas and gl
    createDisplay() {
        var canvas = document.getElementById('game-surface');
        this.gl = canvas.getContext('webgl2');
        if (!this.gl) {
            this.gl = canvas.getContext('experimental-webgl');
        }
        this.lblFPS = document.getElementById("lblFPS");
        //this.lblFPS.innerHTML = 60;
        DisplayManager.gl = this.gl;
        this.height = this.gl.canvas.height;
        this.width = this.gl.canvas.width;
    }

    fps() {
        this.now *= 0.001;                          // convert to seconds
        const deltaTime = this.now - this.then;          // compute time since last frame
        this.then = this.now;                            // remember time for next frame
        const fps = 60 / deltaTime;             // compute frames per second
        this.lblFPS.innerHTML = fps.toFixed(1);  // update fps display
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}