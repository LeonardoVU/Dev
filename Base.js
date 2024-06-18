var PI = Math.PI;
var cz = 50;
var ca = 3 * PI / 2;


(async function () {
    if (!navigator.gpu) {
        alert("Web GPU is not supported on your platform so far.");
        return;
    }
    const canvas = document.getElementById("Vue0");
    //const engine = new BABYLON.Engine(canvas, true);
    const engine = new BABYLON.WebGPUEngine(canvas);
    await engine.initAsync();
    const createScene = async function () {


        const scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.ArcRotateCamera("camera", ca, 16 * PI / 32, cz, new BABYLON.Vector3(0, 5, 0), scene);

        camera.attachControl(canvas, true);

        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        //light.position = new BABYLON.Vector3(-3500, 7000, 7000);
        light.intensity = 1.0;
        const box = BABYLON.MeshBuilder.CreateBox("bx", { width:4, height:4, depth:0.1 }, scene);

        scene.registerBeforeRender(() => {
            box.rotation.y += PI / 500;
        });
        /*         if (BABYLON.VideoRecorder.IsSupported(engine)) {
                    var recorder = new BABYLON.VideoRecorder(engine);
                    recorder.startRecording("test.webm", 64);
                } */

        return scene;
    };
    const scene = await createScene();


    engine.runRenderLoop(function () {
        scene.render();
    });


    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();

        /*       if (this.outerWidth > this.outerHeight) {
                  orn = 0
              } else {
                  orn = 1;
              } */

    });
})();