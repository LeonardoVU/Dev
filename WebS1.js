var PI = Math.PI;
var cz = 275;//675;
var ca = 3 * PI / 2;
//ca = 0;

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

        var camera = new BABYLON.ArcRotateCamera("camera", ca, 16 * PI / 32, cz, new BABYLON.Vector3(0, 125, 0), scene);
        //camera.lowerBetaLimit = PI / 3;
        //camera.attachControl(canvas, true);
        //camera.zoomToMouseLocation = true;
        camera.wheelDeltaPercentage = 0.01;
        //camera.attachControl(canvas, true);

        //var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 10), scene);
        //light.position = new BABYLON.Vector3(-3500, 7000, 7000);
        //  light.intensity = 1.0;
        var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 0, 0), scene);
        light1.intensity = 1;
        const shadowGenerator = new BABYLON.ShadowGenerator(1028, light1);
        shadowGenerator.usePoissonSampling = true;

        const ground = BABYLON.MeshBuilder.CreateSphere("ground", { diameter: 250, segments: 128 }, scene);
        var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0, 0.05, 1);
        //groundMaterial.specularColor = new BABYLON.Color3(0, 0.050, 0.250);
        //groundMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        ground.material = groundMaterial;
        ground.receiveShadows = true;

        const skyDome = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 9000, segments: 128 }, scene);
        const lgtS = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 4 }, scene);
        lgtS.position = light1.position;
        lgtS.isVisible = false;
        var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
        skyMaterial.backFaceCulling = false;


        skyMaterial.turbidity = 1;
        skyMaterial.luminance = 1;
        skyMaterial.inclination = -0.51;
        skyMaterial.azimuth = -0.477 * PI / 2;//2.4915 / 2 * PI;
        //skyMaterial.useSunPosition = true;
        //skyMaterial.sunPosition = new BABYLON.Vector3(-3500, 7500, 7000);
        skyMaterial.rayleigh = 2;
        //ground.material = skyMaterial;

        skyDome.isPickable = false;
        skyDome.material = skyMaterial;

        var fontData = await (await fetch("SnsReg.json")).json();
        var myText = BABYLON.MeshBuilder.CreateText("LV Projects", "LV Projects", fontData, {
            size: 10,
            resolution: 32,
            depth: 1.5
        });

        const myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);

        myMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

        myText.material = myMaterial;
        myText.position.y = 130;//125;
        myText.position.z = 0;//-250;


        shadowGenerator.getShadowMap().renderList.push(myText);

        //myText.parent = anchor1;
        //myText.position.z = 5;

        // light1.position.z = 25 * Math.sin(skyMaterial.inclination);


        //myText.enablePointerMoveEvents = true;
        console.log(myText.id);

        scene.registerBeforeRender(() => {
            myText.rotation.y -= 0.01;
            skyMaterial.inclination += 0.00055;
            light1.position.y = 175 * Math.sin((skyMaterial.inclination + PI / 6) * 3);
            light1.position.z = 175 * Math.cos((skyMaterial.inclination + PI / 6) * 3);
            lgtS.position = light1.position;
            //console.log(skyMaterial.inclination);
            if (skyMaterial.inclination >= 0.475) {
                //skyMaterial.inclination = 0.475;
            }


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