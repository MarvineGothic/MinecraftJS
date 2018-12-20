"use strict";

var display;
var gl;

var loader;
var shader;
var renderer;

var camera;
var ray;
var sun;

var lightAngle = 0;

var entities = new EntitySet();
var lights = [];
var then = 0;
var now = 1;

function init() {
    display = new DisplayManager();
    gl = display.gl;
    loader = new Loader(gl);
    shader = new StaticShader(gl);
    renderer = new EntityRenderer(shader);
    camera = new Camera(2, 3, 2);
    camera.init();

    // ######################################### MODELS #################################################################
    var cube = new CubeModel();
    var sunTex = new ModelTexture(loader.loadTexture('res/yellow.png'));
    var sunTexModel = new TexturedModel(loader.loadToVAO((cube.vertices), (cube.textureCoordinates), (cube.normals), cube.indices), sunTex.texture);

    var grassTex = new ModelTexture(loader.loadTexture('res/grassTex.png'));
    var grassTexModel = new TexturedModel(loader.loadToVAO((cube.vertices), (cube.setTextureCoordinates(3, 3, 1, 0)),
        (cube.normals), cube.indices), grassTex.texture);

    var cobbleTex = new ModelTexture(loader.loadTexture('res/cobblestone.png'));
    cobbleTex.texture.reflectivity = 10;
    cobbleTex.texture.shineDamper = 1;
    var cobbleTexModel = new TexturedModel(loader.loadToVAO((cube.vertices), (cube.textureCoordinates), (cube.normals), cube.indices), cobbleTex.texture);


    var glassTex = new ModelTexture(loader.loadTexture('res/glass.png'));
    var glassTexModel = new TexturedModel(loader.loadToVAO((cube.vertices), (cube.textureCoordinates), (cube.normals), cube.indices), glassTex.texture);

    var dirtTex = new ModelTexture(loader.loadTexture('res/dirtTex.png'));
    var dirtTexModel = new TexturedModel(loader.loadToVAO((cube.vertices), (cube.textureCoordinates), (cube.normals), cube.indices), dirtTex.texture);

    var leavesTex = new ModelTexture(loader.loadTexture('res/Leaf.png'));
    var leafTexModel = new TexturedModel(loader.loadToVAO((cube.vertices), (cube.textureCoordinates), (cube.normals), cube.indices), leavesTex.texture);

    var treeTex = new ModelTexture(loader.loadTexture('res/TreeBark.png'));
    var treeTexModel = new TexturedModel(loader.loadToVAO((cube.vertices), (cube.setTextureCoordinates(3, 3, 1, 0)), (cube.normals), cube.indices), treeTex.texture);

    var torch = new TorchModel();
    var torchTex = new ModelTexture(loader.loadTexture('res/torch.png'));
    var torchTexModel = new TexturedModel(loader.loadToVAO((torch.vertices), (torch.textureCoordinates), (torch.normals), torch.indices), torchTex.texture);

    var TexPack = [];
    TexPack.push(cobbleTexModel);
    TexPack.push(glassTexModel);
    // ############################################ ADD ENTITIES #########################################################

    // lights
    sun = new Light(new Vector3f(100, 100, -50), new Vector3f(1.5, 1.5, 1.5), sunTexModel);

    torch = new Light(new Vector3f(3, 3, 1), new Vector3f(0.5, 0.5, 0), torchTexModel, new Vector3f(1, 0.01, 0.005));
    torch.rotX = -45;

    // other meshes
    new Tree(5, -10, 8, treeTexModel, leafTexModel, entities);
    new Tree(15, -10, 6, treeTexModel, leafTexModel, entities);
    new Tree(13, 0, 9, treeTexModel, leafTexModel, entities);
    new Tree(0, 15, 7, treeTexModel, leafTexModel, entities);
    new Tree(10, 13, 8, treeTexModel, leafTexModel, entities);
    new House(TexPack, entities);

    for (var x = -20; x < 20; x++)
        for (var z = -20; z < 20; z++)
            entities.add(new Entity(grassTexModel, new Vector3f(x, 0, z), 0, 0, 0, 1))


    entities.add(sun);
    entities.add(torch);
    lights.push(sun);
    lights.push(torch);
}

function draw(now) {
    camera.move();
    renderer.prepare();
    shader.loadLights(lights);
    shader.loadViewMatrix(camera);

    Light.dayNight(sun);

    //ray.update();
    var stop = false;
    for (var i = 0; i < entities.size(); i++) {
        var voxelVec3f = camera.findLookAtVoxelCoordinates(entities.get(i).position, 5);
        var equals = entities.get(i).equals(new Entity(null, voxelVec3f, 0, 0, 0, 1));
        if (equals && camera.remove) {
            entities.remove(i);
            stop = true;
            break;
        }
        if (stop) break;
    }

    for (var i = 0; i < entities.size(); i++) {
        renderer.render(entities.get(i), shader);
    }

    now *= 0.001;                          // convert to seconds
    const deltaTime = now - then;          // compute time since last frame
    then = now;                            // remember time for next frame
    const fps = 1 / deltaTime;             // compute frames per second
    display.lblFPS.innerHTML = fps.toFixed(1);  // update fps display

    requestAnimationFrame(draw);
}


window.onload = function () {
    init();
    draw();
};