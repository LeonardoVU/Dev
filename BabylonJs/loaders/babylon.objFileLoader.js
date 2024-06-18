(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-loaders", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-loaders"] = factory(require("babylonjs"));
	else
		root["LOADERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_observable__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/loaders/src/OBJ/index.ts":
/*!*********************************************!*\
  !*** ../../../dev/loaders/src/OBJ/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* reexport safe */ _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   OBJFileLoader: () => (/* reexport safe */ _objFileLoader__WEBPACK_IMPORTED_MODULE_3__.OBJFileLoader),
/* harmony export */   SolidParser: () => (/* reexport safe */ _solidParser__WEBPACK_IMPORTED_MODULE_2__.SolidParser)
/* harmony export */ });
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts");
/* harmony import */ var _objLoadingOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objLoadingOptions */ "../../../dev/loaders/src/OBJ/objLoadingOptions.ts");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solidParser */ "../../../dev/loaders/src/OBJ/solidParser.ts");
/* harmony import */ var _objFileLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objFileLoader */ "../../../dev/loaders/src/OBJ/objFileLoader.ts");






/***/ }),

/***/ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/mtlFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* binding */ MTLFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Class reading and parsing the MTL file bundled with the obj file.
 */
var MTLFileLoader = /** @class */ (function () {
    function MTLFileLoader() {
        /**
         * All material loaded from the mtl will be set here
         */
        this.materials = [];
    }
    /**
     * This function will read the mtl file and create each material described inside
     * This function could be improve by adding :
     * -some component missing (Ni, Tf...)
     * -including the specific options available
     *
     * @param scene defines the scene the material will be created in
     * @param data defines the mtl data to parse
     * @param rootUrl defines the rooturl to use in order to load relative dependencies
     * @param assetContainer defines the asset container to store the material in (can be null)
     */
    MTLFileLoader.prototype.parseMTL = function (scene, data, rootUrl, assetContainer) {
        if (data instanceof ArrayBuffer) {
            return;
        }
        //Split the lines from the file
        var lines = data.split("\n");
        // whitespace char ie: [ \t\r\n\f]
        var delimiter_pattern = /\s+/;
        //Array with RGB colors
        var color;
        //New material
        var material = null;
        //Look at each line
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            // Blank line or comment
            if (line.length === 0 || line.charAt(0) === "#") {
                continue;
            }
            //Get the first parameter (keyword)
            var pos = line.indexOf(" ");
            var key = pos >= 0 ? line.substring(0, pos) : line;
            key = key.toLowerCase();
            //Get the data following the key
            var value = pos >= 0 ? line.substring(pos + 1).trim() : "";
            //This mtl keyword will create the new material
            if (key === "newmtl") {
                //Check if it is the first material.
                // Materials specifications are described after this keyword.
                if (material) {
                    //Add the previous material in the material array.
                    this.materials.push(material);
                }
                //Create a new material.
                // value is the name of the material read in the mtl file
                scene._blockEntityCollection = !!assetContainer;
                material = new babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(value, scene);
                material._parentContainer = assetContainer;
                scene._blockEntityCollection = false;
            }
            else if (key === "kd" && material) {
                // Diffuse color (color under white light) using RGB values
                //value  = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set tghe color into the material
                material.diffuseColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ka" && material) {
                // Ambient color (color under shadow) using RGB values
                //value = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set tghe color into the material
                material.ambientColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ks" && material) {
                // Specular color (color when light is reflected from shiny surface) using RGB values
                //value = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set the color into the material
                material.specularColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ke" && material) {
                // Emissive color using RGB values
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                material.emissiveColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ns" && material) {
                //value = "Integer"
                material.specularPower = parseFloat(value);
            }
            else if (key === "d" && material) {
                //d is dissolve for current material. It mean alpha for BABYLON
                material.alpha = parseFloat(value);
                //Texture
                //This part can be improved by adding the possible options of texture
            }
            else if (key === "map_ka" && material) {
                // ambient texture map with a loaded image
                //We must first get the folder of the image
                material.ambientTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_kd" && material) {
                // Diffuse texture map with a loaded image
                material.diffuseTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_ks" && material) {
                // Specular texture map with a loaded image
                //We must first get the folder of the image
                material.specularTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_ns") {
                //Specular
                //Specular highlight component
                //We must first get the folder of the image
                //
                //Not supported by BABYLON
                //
                //    continue;
            }
            else if (key === "map_bump" && material) {
                //The bump texture
                var values = value.split(delimiter_pattern);
                var bumpMultiplierIndex = values.indexOf("-bm");
                var bumpMultiplier = null;
                if (bumpMultiplierIndex >= 0) {
                    bumpMultiplier = values[bumpMultiplierIndex + 1];
                    values.splice(bumpMultiplierIndex, 2); // remove
                }
                material.bumpTexture = MTLFileLoader._GetTexture(rootUrl, values.join(" "), scene);
                if (material.bumpTexture && bumpMultiplier !== null) {
                    material.bumpTexture.level = parseFloat(bumpMultiplier);
                }
            }
            else if (key === "map_d" && material) {
                // The dissolve of the material
                material.opacityTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
                //Options for illumination
            }
            else if (key === "illum") {
                //Illumination
                if (value === "0") {
                    //That mean Kd == Kd
                }
                else if (value === "1") {
                    //Color on and Ambient on
                }
                else if (value === "2") {
                    //Highlight on
                }
                else if (value === "3") {
                    //Reflection on and Ray trace on
                }
                else if (value === "4") {
                    //Transparency: Glass on, Reflection: Ray trace on
                }
                else if (value === "5") {
                    //Reflection: Fresnel on and Ray trace on
                }
                else if (value === "6") {
                    //Transparency: Refraction on, Reflection: Fresnel off and Ray trace on
                }
                else if (value === "7") {
                    //Transparency: Refraction on, Reflection: Fresnel on and Ray trace on
                }
                else if (value === "8") {
                    //Reflection on and Ray trace off
                }
                else if (value === "9") {
                    //Transparency: Glass on, Reflection: Ray trace off
                }
                else if (value === "10") {
                    //Casts shadows onto invisible surfaces
                }
            }
            else {
                // console.log("Unhandled expression at line : " + i +'\n' + "with value : " + line);
            }
        }
        //At the end of the file, add the last material
        if (material) {
            this.materials.push(material);
        }
    };
    /**
     * Gets the texture for the material.
     *
     * If the material is imported from input file,
     * We sanitize the url to ensure it takes the texture from aside the material.
     *
     * @param rootUrl The root url to load from
     * @param value The value stored in the mtl
     * @param scene
     * @returns The Texture
     */
    MTLFileLoader._GetTexture = function (rootUrl, value, scene) {
        if (!value) {
            return null;
        }
        var url = rootUrl;
        // Load from input file.
        if (rootUrl === "file:") {
            var lastDelimiter = value.lastIndexOf("\\");
            if (lastDelimiter === -1) {
                lastDelimiter = value.lastIndexOf("/");
            }
            if (lastDelimiter > -1) {
                url += value.substr(lastDelimiter + 1);
            }
            else {
                url += value;
            }
        }
        // Not from input file.
        else {
            url += value;
        }
        return new babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Texture(url, scene, false, MTLFileLoader.INVERT_TEXTURE_Y);
    };
    /**
     * Invert Y-Axis of referenced textures on load
     */
    MTLFileLoader.INVERT_TEXTURE_Y = true;
    return MTLFileLoader;
}());


/***/ }),

/***/ "../../../dev/loaders/src/OBJ/objFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/objFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJFileLoader: () => (/* binding */ OBJFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solidParser */ "../../../dev/loaders/src/OBJ/solidParser.ts");







/**
 * OBJ file type loader.
 * This is a babylon scene loader plugin.
 */
var OBJFileLoader = /** @class */ (function () {
    /**
     * Creates loader for .OBJ files
     *
     * @param loadingOptions options for loading and parsing OBJ/MTL files.
     */
    function OBJFileLoader(loadingOptions) {
        /**
         * Defines the name of the plugin.
         */
        this.name = "obj";
        /**
         * Defines the extension the plugin is able to load.
         */
        this.extensions = ".obj";
        this._assetContainer = null;
        this._loadingOptions = loadingOptions || OBJFileLoader._DefaultLoadingOptions;
    }
    Object.defineProperty(OBJFileLoader, "INVERT_TEXTURE_Y", {
        /**
         * Invert Y-Axis of referenced textures on load
         */
        get: function () {
            return _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader.INVERT_TEXTURE_Y;
        },
        set: function (value) {
            _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader.INVERT_TEXTURE_Y = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OBJFileLoader, "_DefaultLoadingOptions", {
        get: function () {
            return {
                computeNormals: OBJFileLoader.COMPUTE_NORMALS,
                optimizeNormals: OBJFileLoader.OPTIMIZE_NORMALS,
                importVertexColors: OBJFileLoader.IMPORT_VERTEX_COLORS,
                invertY: OBJFileLoader.INVERT_Y,
                invertTextureY: OBJFileLoader.INVERT_TEXTURE_Y,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                UVScaling: OBJFileLoader.UV_SCALING,
                materialLoadingFailsSilently: OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY,
                optimizeWithUV: OBJFileLoader.OPTIMIZE_WITH_UV,
                skipMaterials: OBJFileLoader.SKIP_MATERIALS,
                useLegacyBehavior: OBJFileLoader.USE_LEGACY_BEHAVIOR,
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Calls synchronously the MTL file attached to this obj.
     * Load function or importMesh function don't enable to load 2 files in the same time asynchronously.
     * Without this function materials are not displayed in the first frame (but displayed after).
     * In consequence it is impossible to get material information in your HTML file
     *
     * @param url The URL of the MTL file
     * @param rootUrl defines where to load data from
     * @param onSuccess Callback function to be called when the MTL file is loaded
     * @param onFailure
     */
    OBJFileLoader.prototype._loadMTL = function (url, rootUrl, onSuccess, onFailure) {
        //The complete path to the mtl file
        var pathOfFile = rootUrl + url;
        // Loads through the babylon tools to allow fileInput search.
        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadFile(pathOfFile, onSuccess, undefined, undefined, false, function (request, exception) {
            onFailure(pathOfFile, exception);
        });
    };
    /**
     * Instantiates a OBJ file loader plugin.
     * @returns the created plugin
     */
    OBJFileLoader.prototype.createPlugin = function () {
        return new OBJFileLoader(OBJFileLoader._DefaultLoadingOptions);
    };
    /**
     * If the data string can be loaded directly.
     * @returns if the data can be loaded directly
     */
    OBJFileLoader.prototype.canDirectLoad = function () {
        return false;
    };
    /**
     * Imports one or more meshes from the loaded OBJ data and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise containing the loaded meshes, particles, skeletons and animations
     */
    OBJFileLoader.prototype.importMeshAsync = function (meshesNames, scene, data, rootUrl) {
        //get the meshes from OBJ file
        return this._parseSolid(meshesNames, scene, data, rootUrl).then(function (meshes) {
            return {
                meshes: meshes,
                particleSystems: [],
                skeletons: [],
                animationGroups: [],
                transformNodes: [],
                geometries: [],
                lights: [],
                spriteManagers: [],
            };
        });
    };
    /**
     * Imports all objects from the loaded OBJ data and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise which completes when objects have been loaded to the scene
     */
    OBJFileLoader.prototype.loadAsync = function (scene, data, rootUrl) {
        //Get the 3D model
        return this.importMeshAsync(null, scene, data, rootUrl).then(function () {
            // return void
        });
    };
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    OBJFileLoader.prototype.loadAssetContainerAsync = function (scene, data, rootUrl) {
        var _this = this;
        var container = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
        this._assetContainer = container;
        return this.importMeshAsync(null, scene, data, rootUrl)
            .then(function (result) {
            result.meshes.forEach(function (mesh) { return container.meshes.push(mesh); });
            result.meshes.forEach(function (mesh) {
                var material = mesh.material;
                if (material) {
                    // Materials
                    if (container.materials.indexOf(material) == -1) {
                        container.materials.push(material);
                        // Textures
                        var textures = material.getActiveTextures();
                        textures.forEach(function (t) {
                            if (container.textures.indexOf(t) == -1) {
                                container.textures.push(t);
                            }
                        });
                    }
                }
            });
            _this._assetContainer = null;
            return container;
        })
            .catch(function (ex) {
            _this._assetContainer = null;
            throw ex;
        });
    };
    /**
     * Read the OBJ file and create an Array of meshes.
     * Each mesh contains all information given by the OBJ and the MTL file.
     * i.e. vertices positions and indices, optional normals values, optional UV values, optional material
     * @param meshesNames defines a string or array of strings of the mesh names that should be loaded from the file
     * @param scene defines the scene where are displayed the data
     * @param data defines the content of the obj file
     * @param rootUrl defines the path to the folder
     * @returns the list of loaded meshes
     */
    OBJFileLoader.prototype._parseSolid = function (meshesNames, scene, data, rootUrl) {
        var _this = this;
        var fileToLoad = ""; //The name of the mtlFile to load
        var materialsFromMTLFile = new _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader();
        var materialToUse = [];
        var babylonMeshesArray = []; //The mesh for babylon
        // Main function
        var solidParser = new _solidParser__WEBPACK_IMPORTED_MODULE_2__.SolidParser(materialToUse, babylonMeshesArray, this._loadingOptions);
        solidParser.parse(meshesNames, data, scene, this._assetContainer, function (fileName) {
            fileToLoad = fileName;
        });
        // load the materials
        var mtlPromises = [];
        // Check if we have a file to load
        if (fileToLoad !== "" && !this._loadingOptions.skipMaterials) {
            //Load the file synchronously
            mtlPromises.push(new Promise(function (resolve, reject) {
                _this._loadMTL(fileToLoad, rootUrl, function (dataLoaded) {
                    try {
                        //Create materials thanks MTLLoader function
                        materialsFromMTLFile.parseMTL(scene, dataLoaded, rootUrl, _this._assetContainer);
                        //Look at each material loaded in the mtl file
                        for (var n = 0; n < materialsFromMTLFile.materials.length; n++) {
                            //Three variables to get all meshes with the same material
                            var startIndex = 0;
                            var _indices = [];
                            var _index = void 0;
                            //The material from MTL file is used in the meshes loaded
                            //Push the indice in an array
                            //Check if the material is not used for another mesh
                            while ((_index = materialToUse.indexOf(materialsFromMTLFile.materials[n].name, startIndex)) > -1) {
                                _indices.push(_index);
                                startIndex = _index + 1;
                            }
                            //If the material is not used dispose it
                            if (_index === -1 && _indices.length === 0) {
                                //If the material is not needed, remove it
                                materialsFromMTLFile.materials[n].dispose();
                            }
                            else {
                                for (var o = 0; o < _indices.length; o++) {
                                    //Apply the material to the Mesh for each mesh with the material
                                    var mesh = babylonMeshesArray[_indices[o]];
                                    var material = materialsFromMTLFile.materials[n];
                                    mesh.material = material;
                                    if (!mesh.getTotalIndices()) {
                                        // No indices, we need to turn on point cloud
                                        material.pointsCloud = true;
                                    }
                                }
                            }
                        }
                        resolve();
                    }
                    catch (e) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Error processing MTL file: '".concat(fileToLoad, "'"));
                        if (_this._loadingOptions.materialLoadingFailsSilently) {
                            resolve();
                        }
                        else {
                            reject(e);
                        }
                    }
                }, function (pathOfFile, exception) {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Error downloading MTL file: '".concat(fileToLoad, "'"));
                    if (_this._loadingOptions.materialLoadingFailsSilently) {
                        resolve();
                    }
                    else {
                        reject(exception);
                    }
                });
            }));
        }
        //Return an array with all Mesh
        return Promise.all(mtlPromises).then(function () {
            var isLine = function (mesh) { var _a, _b; return Boolean((_b = (_a = mesh._internalMetadata) === null || _a === void 0 ? void 0 : _a["_isLine"]) !== null && _b !== void 0 ? _b : false); };
            // Iterate over the mesh, determine if it is a line mesh, clone or modify the material to line rendering.
            babylonMeshesArray.forEach(function (mesh) {
                var _a, _b;
                if (isLine(mesh)) {
                    var mat = (_a = mesh.material) !== null && _a !== void 0 ? _a : new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(mesh.name + "_line", scene);
                    // If another mesh is using this material and it is not a line then we need to clone it.
                    var needClone = mat.getBindedMeshes().filter(function (e) { return !isLine(e); }).length > 0;
                    if (needClone) {
                        mat = (_b = mat.clone(mat.name + "_line")) !== null && _b !== void 0 ? _b : mat;
                    }
                    mat.wireframe = true;
                    mesh.material = mat;
                    if (mesh._internalMetadata) {
                        mesh._internalMetadata["_isLine"] = undefined;
                    }
                }
            });
            return babylonMeshesArray;
        });
    };
    /**
     * Defines if UVs are optimized by default during load.
     */
    OBJFileLoader.OPTIMIZE_WITH_UV = true;
    /**
     * Invert model on y-axis (does a model scaling inversion)
     */
    OBJFileLoader.INVERT_Y = false;
    /**
     * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
     */
    OBJFileLoader.IMPORT_VERTEX_COLORS = false;
    /**
     * Compute the normals for the model, even if normals are present in the file.
     */
    OBJFileLoader.COMPUTE_NORMALS = false;
    /**
     * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
     * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
     */
    OBJFileLoader.OPTIMIZE_NORMALS = false;
    /**
     * Defines custom scaling of UV coordinates of loaded meshes.
     */
    OBJFileLoader.UV_SCALING = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(1, 1);
    /**
     * Skip loading the materials even if defined in the OBJ file (materials are ignored).
     */
    OBJFileLoader.SKIP_MATERIALS = false;
    /**
     * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
     *
     * Defaults to true for backwards compatibility.
     */
    OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY = true;
    /**
     * Loads assets without handedness conversions. This flag is for compatibility. Use it only if absolutely required. Defaults to false.
     */
    OBJFileLoader.USE_LEGACY_BEHAVIOR = false;
    return OBJFileLoader;
}());
if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SceneLoader) {
    //Add this loader into the register plugin
    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.RegisterPlugin(new OBJFileLoader());
}


/***/ }),

/***/ "../../../dev/loaders/src/OBJ/objLoadingOptions.ts":
/*!*********************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/objLoadingOptions.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../../dev/loaders/src/OBJ/solidParser.ts":
/*!***************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/solidParser.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SolidParser: () => (/* binding */ SolidParser)
/* harmony export */ });
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__);








/**
 * Class used to load mesh data from OBJ content
 */
var SolidParser = /** @class */ (function () {
    /**
     * Creates a new SolidParser
     * @param materialToUse defines the array to fill with the list of materials to use (it will be filled by the parse function)
     * @param babylonMeshesArray defines the array to fill with the list of loaded meshes (it will be filled by the parse function)
     * @param loadingOptions defines the loading options to use
     */
    function SolidParser(materialToUse, babylonMeshesArray, loadingOptions) {
        this._positions = []; //values for the positions of vertices
        this._normals = []; //Values for the normals
        this._uvs = []; //Values for the textures
        this._colors = [];
        this._meshesFromObj = []; //[mesh] Contains all the obj meshes
        this._indicesForBabylon = []; //The list of indices for VertexData
        this._wrappedPositionForBabylon = []; //The list of position in vectors
        this._wrappedUvsForBabylon = []; //Array with all value of uvs to match with the indices
        this._wrappedColorsForBabylon = []; // Array with all color values to match with the indices
        this._wrappedNormalsForBabylon = []; //Array with all value of normals to match with the indices
        this._tuplePosNorm = []; //Create a tuple with indice of Position, Normal, UV  [pos, norm, uvs]
        this._curPositionInIndices = 0;
        this._hasMeshes = false; //Meshes are defined in the file
        this._unwrappedPositionsForBabylon = []; //Value of positionForBabylon w/o Vector3() [x,y,z]
        this._unwrappedColorsForBabylon = []; // Value of colorForBabylon w/o Color4() [r,g,b,a]
        this._unwrappedNormalsForBabylon = []; //Value of normalsForBabylon w/o Vector3()  [x,y,z]
        this._unwrappedUVForBabylon = []; //Value of uvsForBabylon w/o Vector3()      [x,y,z]
        this._triangles = []; //Indices from new triangles coming from polygons
        this._materialNameFromObj = ""; //The name of the current material
        this._objMeshName = ""; //The name of the current obj mesh
        this._increment = 1; //Id for meshes created by the multimaterial
        this._isFirstMaterial = true;
        this._grayColor = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(0.5, 0.5, 0.5, 1);
        this._hasLineData = false; //If this mesh has line segment(l) data
        this._materialToUse = materialToUse;
        this._babylonMeshesArray = babylonMeshesArray;
        this._loadingOptions = loadingOptions;
    }
    /**
     * Search for obj in the given array.
     * This function is called to check if a couple of data already exists in an array.
     *
     * If found, returns the index of the founded tuple index. Returns -1 if not found
     * @param arr Array<{ normals: Array<number>, idx: Array<number> }>
     * @param obj Array<number>
     * @returns {boolean}
     */
    SolidParser.prototype._isInArray = function (arr, obj) {
        if (!arr[obj[0]]) {
            arr[obj[0]] = { normals: [], idx: [] };
        }
        var idx = arr[obj[0]].normals.indexOf(obj[1]);
        return idx === -1 ? -1 : arr[obj[0]].idx[idx];
    };
    SolidParser.prototype._isInArrayUV = function (arr, obj) {
        if (!arr[obj[0]]) {
            arr[obj[0]] = { normals: [], idx: [], uv: [] };
        }
        var idx = arr[obj[0]].normals.indexOf(obj[1]);
        if (idx != 1 && obj[2] === arr[obj[0]].uv[idx]) {
            return arr[obj[0]].idx[idx];
        }
        return -1;
    };
    /**
     * This function set the data for each triangle.
     * Data are position, normals and uvs
     * If a tuple of (position, normal) is not set, add the data into the corresponding array
     * If the tuple already exist, add only their indice
     *
     * @param indicePositionFromObj Integer The index in positions array
     * @param indiceUvsFromObj Integer The index in uvs array
     * @param indiceNormalFromObj Integer The index in normals array
     * @param positionVectorFromOBJ Vector3 The value of position at index objIndice
     * @param textureVectorFromOBJ Vector3 The value of uvs
     * @param normalsVectorFromOBJ Vector3 The value of normals at index objNormale
     * @param positionColorsFromOBJ
     */
    SolidParser.prototype._setData = function (indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, positionVectorFromOBJ, textureVectorFromOBJ, normalsVectorFromOBJ, positionColorsFromOBJ) {
        //Check if this tuple already exists in the list of tuples
        var _index;
        if (this._loadingOptions.optimizeWithUV) {
            _index = this._isInArrayUV(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj, indiceUvsFromObj]);
        }
        else {
            _index = this._isInArray(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj]);
        }
        //If it not exists
        if (_index === -1) {
            //Add an new indice.
            //The array of indices is only an array with his length equal to the number of triangles - 1.
            //We add vertices data in this order
            this._indicesForBabylon.push(this._wrappedPositionForBabylon.length);
            //Push the position of vertice for Babylon
            //Each element is a Vector3(x,y,z)
            this._wrappedPositionForBabylon.push(positionVectorFromOBJ);
            //Push the uvs for Babylon
            //Each element is a Vector3(u,v)
            this._wrappedUvsForBabylon.push(textureVectorFromOBJ);
            //Push the normals for Babylon
            //Each element is a Vector3(x,y,z)
            this._wrappedNormalsForBabylon.push(normalsVectorFromOBJ);
            if (positionColorsFromOBJ !== undefined) {
                //Push the colors for Babylon
                //Each element is a BABYLON.Color4(r,g,b,a)
                this._wrappedColorsForBabylon.push(positionColorsFromOBJ);
            }
            //Add the tuple in the comparison list
            this._tuplePosNorm[indicePositionFromObj].normals.push(indiceNormalFromObj);
            this._tuplePosNorm[indicePositionFromObj].idx.push(this._curPositionInIndices++);
            if (this._loadingOptions.optimizeWithUV) {
                this._tuplePosNorm[indicePositionFromObj].uv.push(indiceUvsFromObj);
            }
        }
        else {
            //The tuple already exists
            //Add the index of the already existing tuple
            //At this index we can get the value of position, normal, color and uvs of vertex
            this._indicesForBabylon.push(_index);
        }
    };
    /**
     * Transform Vector() and BABYLON.Color() objects into numbers in an array
     */
    SolidParser.prototype._unwrapData = function () {
        //Every array has the same length
        for (var l = 0; l < this._wrappedPositionForBabylon.length; l++) {
            //Push the x, y, z values of each element in the unwrapped array
            this._unwrappedPositionsForBabylon.push(this._wrappedPositionForBabylon[l].x * this._handednessSign, this._wrappedPositionForBabylon[l].y, this._wrappedPositionForBabylon[l].z);
            this._unwrappedNormalsForBabylon.push(this._wrappedNormalsForBabylon[l].x * this._handednessSign, this._wrappedNormalsForBabylon[l].y, this._wrappedNormalsForBabylon[l].z);
            this._unwrappedUVForBabylon.push(this._wrappedUvsForBabylon[l].x, this._wrappedUvsForBabylon[l].y); //z is an optional value not supported by BABYLON
            if (this._loadingOptions.importVertexColors) {
                //Push the r, g, b, a values of each element in the unwrapped array
                this._unwrappedColorsForBabylon.push(this._wrappedColorsForBabylon[l].r, this._wrappedColorsForBabylon[l].g, this._wrappedColorsForBabylon[l].b, this._wrappedColorsForBabylon[l].a);
            }
        }
        // Reset arrays for the next new meshes
        this._wrappedPositionForBabylon.length = 0;
        this._wrappedNormalsForBabylon.length = 0;
        this._wrappedUvsForBabylon.length = 0;
        this._wrappedColorsForBabylon.length = 0;
        this._tuplePosNorm.length = 0;
        this._curPositionInIndices = 0;
    };
    /**
     * Create triangles from polygons
     * It is important to notice that a triangle is a polygon
     * We get 5 patterns of face defined in OBJ File :
     * facePattern1 = ["1","2","3","4","5","6"]
     * facePattern2 = ["1/1","2/2","3/3","4/4","5/5","6/6"]
     * facePattern3 = ["1/1/1","2/2/2","3/3/3","4/4/4","5/5/5","6/6/6"]
     * facePattern4 = ["1//1","2//2","3//3","4//4","5//5","6//6"]
     * facePattern5 = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-4/-4/-4","-5/-5/-5","-6/-6/-6"]
     * Each pattern is divided by the same method
     * @param faces Array[String] The indices of elements
     * @param v Integer The variable to increment
     */
    SolidParser.prototype._getTriangles = function (faces, v) {
        //Work for each element of the array
        for (var faceIndex = v; faceIndex < faces.length - 1; faceIndex++) {
            //Add on the triangle variable the indexes to obtain triangles
            this._pushTriangle(faces, faceIndex);
        }
        //Result obtained after 2 iterations:
        //Pattern1 => triangle = ["1","2","3","1","3","4"];
        //Pattern2 => triangle = ["1/1","2/2","3/3","1/1","3/3","4/4"];
        //Pattern3 => triangle = ["1/1/1","2/2/2","3/3/3","1/1/1","3/3/3","4/4/4"];
        //Pattern4 => triangle = ["1//1","2//2","3//3","1//1","3//3","4//4"];
        //Pattern5 => triangle = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-1/-1/-1","-3/-3/-3","-4/-4/-4"];
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 1
     * In this pattern we get vertice positions
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern1 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        //For each element in the triangles array.
        //This var could contains 1 to an infinity of triangles
        for (var k = 0; k < this._triangles.length; k++) {
            // Set position indice
            var indicePositionFromObj = parseInt(this._triangles[k]) - 1;
            this._setData(indicePositionFromObj, 0, 0, // In the pattern 1, normals and uvs are not defined
            this._positions[indicePositionFromObj], // Get the vectors data
            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), // Create default vectors
            this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 2
     * In this pattern we get vertice positions and uvs
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern2 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1/1"
            //Split the data for getting position and uv
            var point = this._triangles[k].split("/"); // ["1", "1"]
            //Set position indice
            var indicePositionFromObj = parseInt(point[0]) - 1;
            //Set uv indice
            var indiceUvsFromObj = parseInt(point[1]) - 1;
            this._setData(indicePositionFromObj, indiceUvsFromObj, 0, //Default value for normals
            this._positions[indicePositionFromObj], //Get the values for each element
            this._uvs[indiceUvsFromObj], babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), //Default value for normals
            this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 3
     * In this pattern we get vertice positions, uvs and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern3 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1/1/1"
            //Split the data for getting position, uv, and normals
            var point = this._triangles[k].split("/"); // ["1", "1", "1"]
            // Set position indice
            var indicePositionFromObj = parseInt(point[0]) - 1;
            // Set uv indice
            var indiceUvsFromObj = parseInt(point[1]) - 1;
            // Set normal indice
            var indiceNormalFromObj = parseInt(point[2]) - 1;
            this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], this._uvs[indiceUvsFromObj], this._normals[indiceNormalFromObj] //Set the vector for each component
            );
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 4
     * In this pattern we get vertice positions and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern4 = function (face, v) {
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1//1"
            //Split the data for getting position and normals
            var point = this._triangles[k].split("//"); // ["1", "1"]
            // We check indices, and normals
            var indicePositionFromObj = parseInt(point[0]) - 1;
            var indiceNormalFromObj = parseInt(point[1]) - 1;
            this._setData(indicePositionFromObj, 1, //Default value for uv
            indiceNormalFromObj, this._positions[indicePositionFromObj], //Get each vector of data
            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), this._normals[indiceNormalFromObj], this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /*
     * Create triangles and push the data for each polygon for the pattern 3
     * In this pattern we get vertice positions, uvs and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern5 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "-1/-1/-1"
            //Split the data for getting position, uv, and normals
            var point = this._triangles[k].split("/"); // ["-1", "-1", "-1"]
            // Set position indice
            var indicePositionFromObj = this._positions.length + parseInt(point[0]);
            // Set uv indice
            var indiceUvsFromObj = this._uvs.length + parseInt(point[1]);
            // Set normal indice
            var indiceNormalFromObj = this._normals.length + parseInt(point[2]);
            this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], this._uvs[indiceUvsFromObj], this._normals[indiceNormalFromObj], //Set the vector for each component
            this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    SolidParser.prototype._addPreviousObjMesh = function () {
        //Check if it is not the first mesh. Otherwise we don't have data.
        if (this._meshesFromObj.length > 0) {
            //Get the previous mesh for applying the data about the faces
            //=> in obj file, faces definition append after the name of the mesh
            this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
            //Set the data into Array for the mesh
            this._unwrapData();
            if (this._loadingOptions.useLegacyBehavior) {
                // Reverse tab. Otherwise face are displayed in the wrong sens
                this._indicesForBabylon.reverse();
            }
            //Set the information for the mesh
            //Slice the array to avoid rewriting because of the fact this is the same var which be rewrited
            this._handledMesh.indices = this._indicesForBabylon.slice();
            this._handledMesh.positions = this._unwrappedPositionsForBabylon.slice();
            this._handledMesh.normals = this._unwrappedNormalsForBabylon.slice();
            this._handledMesh.uvs = this._unwrappedUVForBabylon.slice();
            this._handledMesh.hasLines = this._hasLineData;
            if (this._loadingOptions.importVertexColors) {
                this._handledMesh.colors = this._unwrappedColorsForBabylon.slice();
            }
            //Reset the array for the next mesh
            this._indicesForBabylon.length = 0;
            this._unwrappedPositionsForBabylon.length = 0;
            this._unwrappedColorsForBabylon.length = 0;
            this._unwrappedNormalsForBabylon.length = 0;
            this._unwrappedUVForBabylon.length = 0;
            this._hasLineData = false;
        }
    };
    SolidParser.prototype._optimizeNormals = function (mesh) {
        var positions = mesh.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
        var normals = mesh.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
        var mapVertices = {};
        if (!positions || !normals) {
            return;
        }
        for (var i = 0; i < positions.length / 3; i++) {
            var x = positions[i * 3 + 0];
            var y = positions[i * 3 + 1];
            var z = positions[i * 3 + 2];
            var key = x + "_" + y + "_" + z;
            var lst = mapVertices[key];
            if (!lst) {
                lst = [];
                mapVertices[key] = lst;
            }
            lst.push(i);
        }
        var normal = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        for (var key in mapVertices) {
            var lst = mapVertices[key];
            if (lst.length < 2) {
                continue;
            }
            var v0Idx = lst[0];
            for (var i = 1; i < lst.length; ++i) {
                var vIdx = lst[i];
                normals[v0Idx * 3 + 0] += normals[vIdx * 3 + 0];
                normals[v0Idx * 3 + 1] += normals[vIdx * 3 + 1];
                normals[v0Idx * 3 + 2] += normals[vIdx * 3 + 2];
            }
            normal.copyFromFloats(normals[v0Idx * 3 + 0], normals[v0Idx * 3 + 1], normals[v0Idx * 3 + 2]);
            normal.normalize();
            for (var i = 0; i < lst.length; ++i) {
                var vIdx = lst[i];
                normals[vIdx * 3 + 0] = normal.x;
                normals[vIdx * 3 + 1] = normal.y;
                normals[vIdx * 3 + 2] = normal.z;
            }
        }
        mesh.setVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
    };
    /**
     * Function used to parse an OBJ string
     * @param meshesNames defines the list of meshes to load (all if not defined)
     * @param data defines the OBJ string
     * @param scene defines the hosting scene
     * @param assetContainer defines the asset container to load data in
     * @param onFileToLoadFound defines a callback that will be called if a MTL file is found
     */
    SolidParser.prototype.parse = function (meshesNames, data, scene, assetContainer, onFileToLoadFound) {
        var _this = this;
        var _a, _b;
        if (this._loadingOptions.useLegacyBehavior) {
            this._pushTriangle = function (faces, faceIndex) { return _this._triangles.push(faces[0], faces[faceIndex], faces[faceIndex + 1]); };
            this._handednessSign = 1;
        }
        else if (scene.useRightHandedSystem) {
            this._pushTriangle = function (faces, faceIndex) { return _this._triangles.push(faces[0], faces[faceIndex + 1], faces[faceIndex]); };
            this._handednessSign = 1;
        }
        else {
            this._pushTriangle = function (faces, faceIndex) { return _this._triangles.push(faces[0], faces[faceIndex], faces[faceIndex + 1]); };
            this._handednessSign = -1;
        }
        // Split the file into lines
        var lines = data.split("\n");
        // Look at each line
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim().replace(/\s\s/g, " ");
            var result = void 0;
            // Comment or newLine
            if (line.length === 0 || line.charAt(0) === "#") {
                continue;
                //Get information about one position possible for the vertices
            }
            else if (SolidParser.VertexPattern.test(line)) {
                result = line.match(/[^ ]+/g); // match will return non-null due to passing regex pattern
                // Value of result with line: "v 1.0 2.0 3.0"
                // ["v", "1.0", "2.0", "3.0"]
                // Create a Vector3 with the position x, y, z
                this._positions.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
                if (this._loadingOptions.importVertexColors) {
                    if (result.length >= 7) {
                        var r = parseFloat(result[4]);
                        var g = parseFloat(result[5]);
                        var b = parseFloat(result[6]);
                        this._colors.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(r > 1 ? r / 255 : r, g > 1 ? g / 255 : g, b > 1 ? b / 255 : b, result.length === 7 || result[7] === undefined ? 1 : parseFloat(result[7])));
                    }
                    else {
                        // TODO: maybe push NULL and if all are NULL to skip (and remove grayColor var).
                        this._colors.push(this._grayColor);
                    }
                }
            }
            else if ((result = SolidParser.NormalPattern.exec(line)) !== null) {
                //Create a Vector3 with the normals x, y, z
                //Value of result
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                //Add the Vector in the list of normals
                this._normals.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
            }
            else if ((result = SolidParser.UVPattern.exec(line)) !== null) {
                //Create a Vector2 with the normals u, v
                //Value of result
                // ["vt 0.1 0.2 0.3", "0.1", "0.2"]
                //Add the Vector in the list of uvs
                this._uvs.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(parseFloat(result[1]) * this._loadingOptions.UVScaling.x, parseFloat(result[2]) * this._loadingOptions.UVScaling.y));
                //Identify patterns of faces
                //Face could be defined in different type of pattern
            }
            else if ((result = SolidParser.FacePattern3.exec(line)) !== null) {
                //Value of result:
                //["f 1/1/1 2/2/2 3/3/3", "1/1/1 2/2/2 3/3/3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern3(result[1].trim().split(" "), // ["1/1/1", "2/2/2", "3/3/3"]
                1);
            }
            else if ((result = SolidParser.FacePattern4.exec(line)) !== null) {
                //Value of result:
                //["f 1//1 2//2 3//3", "1//1 2//2 3//3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern4(result[1].trim().split(" "), // ["1//1", "2//2", "3//3"]
                1);
            }
            else if ((result = SolidParser.FacePattern5.exec(line)) !== null) {
                //Value of result:
                //["f -1/-1/-1 -2/-2/-2 -3/-3/-3", "-1/-1/-1 -2/-2/-2 -3/-3/-3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern5(result[1].trim().split(" "), // ["-1/-1/-1", "-2/-2/-2", "-3/-3/-3"]
                1);
            }
            else if ((result = SolidParser.FacePattern2.exec(line)) !== null) {
                //Value of result:
                //["f 1/1 2/2 3/3", "1/1 2/2 3/3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern2(result[1].trim().split(" "), // ["1/1", "2/2", "3/3"]
                1);
            }
            else if ((result = SolidParser.FacePattern1.exec(line)) !== null) {
                //Value of result
                //["f 1 2 3", "1 2 3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern1(result[1].trim().split(" "), // ["1", "2", "3"]
                1);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern1.exec(line)) !== null) {
                //Value of result
                //["l 1 2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern1(result[1].trim().split(" "), // ["1", "2"]
                0);
                this._hasLineData = true;
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern2.exec(line)) !== null) {
                //Value of result
                //["l 1/1 2/2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern2(result[1].trim().split(" "), // ["1/1", "2/2"]
                0);
                this._hasLineData = true;
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern3.exec(line)) !== null) {
                //Value of result
                //["l 1/1/1 2/2/2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern3(result[1].trim().split(" "), // ["1/1/1", "2/2/2"]
                0);
                this._hasLineData = true;
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if (SolidParser.GroupDescriptor.test(line) || SolidParser.ObjectDescriptor.test(line)) {
                // Create a new mesh corresponding to the name of the group.
                // Definition of the mesh
                var objMesh = {
                    name: line.substring(2).trim(),
                    indices: null,
                    positions: null,
                    normals: null,
                    uvs: null,
                    colors: null,
                    materialName: this._materialNameFromObj,
                    isObject: SolidParser.ObjectDescriptor.test(line),
                };
                this._addPreviousObjMesh();
                //Push the last mesh created with only the name
                this._meshesFromObj.push(objMesh);
                //Set this variable to indicate that now meshesFromObj has objects defined inside
                this._hasMeshes = true;
                this._isFirstMaterial = true;
                this._increment = 1;
                //Keyword for applying a material
            }
            else if (SolidParser.UseMtlDescriptor.test(line)) {
                //Get the name of the material
                this._materialNameFromObj = line.substring(7).trim();
                //If this new material is in the same mesh
                if (!this._isFirstMaterial || !this._hasMeshes) {
                    //Set the data for the previous mesh
                    this._addPreviousObjMesh();
                    //Create a new mesh
                    var objMesh = 
                    //Set the name of the current obj mesh
                    {
                        name: (this._objMeshName || "mesh") + "_mm" + this._increment.toString(),
                        indices: null,
                        positions: null,
                        normals: null,
                        uvs: null,
                        colors: null,
                        materialName: this._materialNameFromObj,
                        isObject: false,
                    };
                    this._increment++;
                    //If meshes are already defined
                    this._meshesFromObj.push(objMesh);
                    this._hasMeshes = true;
                }
                //Set the material name if the previous line define a mesh
                if (this._hasMeshes && this._isFirstMaterial) {
                    //Set the material name to the previous mesh (1 material per mesh)
                    this._meshesFromObj[this._meshesFromObj.length - 1].materialName = this._materialNameFromObj;
                    this._isFirstMaterial = false;
                }
                // Keyword for loading the mtl file
            }
            else if (SolidParser.MtlLibGroupDescriptor.test(line)) {
                // Get the name of mtl file
                onFileToLoadFound(line.substring(7).trim());
                // Apply smoothing
            }
            else if (SolidParser.SmoothDescriptor.test(line)) {
                // smooth shading => apply smoothing
                // Today I don't know it work with babylon and with obj.
                // With the obj file  an integer is set
            }
            else {
                //If there is another possibility
                babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Logger.Log("Unhandled expression at line : " + line);
            }
        }
        // At the end of the file, add the last mesh into the meshesFromObj array
        if (this._hasMeshes) {
            // Set the data for the last mesh
            this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
            if (this._loadingOptions.useLegacyBehavior) {
                //Reverse indices for displaying faces in the good sense
                this._indicesForBabylon.reverse();
            }
            //Get the good array
            this._unwrapData();
            //Set array
            this._handledMesh.indices = this._indicesForBabylon;
            this._handledMesh.positions = this._unwrappedPositionsForBabylon;
            this._handledMesh.normals = this._unwrappedNormalsForBabylon;
            this._handledMesh.uvs = this._unwrappedUVForBabylon;
            this._handledMesh.hasLines = this._hasLineData;
            if (this._loadingOptions.importVertexColors) {
                this._handledMesh.colors = this._unwrappedColorsForBabylon;
            }
        }
        // If any o or g keyword not found, create a mesh with a random id
        if (!this._hasMeshes) {
            var newMaterial = null;
            if (this._indicesForBabylon.length) {
                if (this._loadingOptions.useLegacyBehavior) {
                    // reverse tab of indices
                    this._indicesForBabylon.reverse();
                }
                //Get positions normals uvs
                this._unwrapData();
            }
            else {
                // There is no indices in the file. We will have to switch to point cloud rendering
                for (var _i = 0, _c = this._positions; _i < _c.length; _i++) {
                    var pos = _c[_i];
                    this._unwrappedPositionsForBabylon.push(pos.x, pos.y, pos.z);
                }
                if (this._normals.length) {
                    for (var _d = 0, _e = this._normals; _d < _e.length; _d++) {
                        var normal = _e[_d];
                        this._unwrappedNormalsForBabylon.push(normal.x, normal.y, normal.z);
                    }
                }
                if (this._uvs.length) {
                    for (var _f = 0, _g = this._uvs; _f < _g.length; _f++) {
                        var uv = _g[_f];
                        this._unwrappedUVForBabylon.push(uv.x, uv.y);
                    }
                }
                if (this._colors.length) {
                    for (var _h = 0, _j = this._colors; _h < _j.length; _h++) {
                        var color = _j[_h];
                        this._unwrappedColorsForBabylon.push(color.r, color.g, color.b, color.a);
                    }
                }
                if (!this._materialNameFromObj) {
                    // Create a material with point cloud on
                    newMaterial = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(), scene);
                    newMaterial.pointsCloud = true;
                    this._materialNameFromObj = newMaterial.name;
                    if (!this._normals.length) {
                        newMaterial.disableLighting = true;
                        newMaterial.emissiveColor = babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                    }
                }
            }
            //Set data for one mesh
            this._meshesFromObj.push({
                name: babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(),
                indices: this._indicesForBabylon,
                positions: this._unwrappedPositionsForBabylon,
                colors: this._unwrappedColorsForBabylon,
                normals: this._unwrappedNormalsForBabylon,
                uvs: this._unwrappedUVForBabylon,
                materialName: this._materialNameFromObj,
                directMaterial: newMaterial,
                isObject: true,
            });
        }
        //Set data for each mesh
        for (var j = 0; j < this._meshesFromObj.length; j++) {
            //check meshesNames (stlFileLoader)
            if (meshesNames && this._meshesFromObj[j].name) {
                if (meshesNames instanceof Array) {
                    if (meshesNames.indexOf(this._meshesFromObj[j].name) === -1) {
                        continue;
                    }
                }
                else {
                    if (this._meshesFromObj[j].name !== meshesNames) {
                        continue;
                    }
                }
            }
            //Get the current mesh
            //Set the data with VertexBuffer for each mesh
            this._handledMesh = this._meshesFromObj[j];
            //Create a Mesh with the name of the obj mesh
            scene._blockEntityCollection = !!assetContainer;
            var babylonMesh = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Mesh(this._meshesFromObj[j].name, scene);
            babylonMesh._parentContainer = assetContainer;
            scene._blockEntityCollection = false;
            this._handledMesh._babylonMesh = babylonMesh;
            // If this is a group mesh, it should have an object mesh as a parent. So look for the first object mesh that appears before it.
            if (!this._handledMesh.isObject) {
                for (var k = j - 1; k >= 0; --k) {
                    if (this._meshesFromObj[k].isObject && this._meshesFromObj[k]._babylonMesh) {
                        babylonMesh.parent = this._meshesFromObj[k]._babylonMesh;
                        break;
                    }
                }
            }
            //Push the name of the material to an array
            //This is indispensable for the importMesh function
            this._materialToUse.push(this._meshesFromObj[j].materialName);
            //If the mesh is a line mesh
            if (this._handledMesh.hasLines) {
                (_a = babylonMesh._internalMetadata) !== null && _a !== void 0 ? _a : (babylonMesh._internalMetadata = {});
                babylonMesh._internalMetadata["_isLine"] = true; //this is a line mesh
            }
            if (((_b = this._handledMesh.positions) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                //Push the mesh into an array
                this._babylonMeshesArray.push(babylonMesh);
                continue;
            }
            var vertexData = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData(); //The container for the values
            //Set the data for the babylonMesh
            vertexData.uvs = this._handledMesh.uvs;
            vertexData.indices = this._handledMesh.indices;
            vertexData.positions = this._handledMesh.positions;
            if (this._loadingOptions.computeNormals) {
                var normals = new Array();
                babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData.ComputeNormals(this._handledMesh.positions, this._handledMesh.indices, normals);
                vertexData.normals = normals;
            }
            else {
                vertexData.normals = this._handledMesh.normals;
            }
            if (this._loadingOptions.importVertexColors) {
                vertexData.colors = this._handledMesh.colors;
            }
            //Set the data from the VertexBuffer to the current Mesh
            vertexData.applyToMesh(babylonMesh);
            if (this._loadingOptions.invertY) {
                babylonMesh.scaling.y *= -1;
            }
            if (this._loadingOptions.optimizeNormals) {
                this._optimizeNormals(babylonMesh);
            }
            //Push the mesh into an array
            this._babylonMeshesArray.push(babylonMesh);
            if (this._handledMesh.directMaterial) {
                babylonMesh.material = this._handledMesh.directMaterial;
            }
        }
    };
    // Descriptor
    /** Object descriptor */
    SolidParser.ObjectDescriptor = /^o/;
    /** Group descriptor */
    SolidParser.GroupDescriptor = /^g/;
    /** Material lib descriptor */
    SolidParser.MtlLibGroupDescriptor = /^mtllib /;
    /** Use a material descriptor */
    SolidParser.UseMtlDescriptor = /^usemtl /;
    /** Smooth descriptor */
    SolidParser.SmoothDescriptor = /^s /;
    // Patterns
    /** Pattern used to detect a vertex */
    SolidParser.VertexPattern = /^v(\s+[\d|.|+|\-|e|E]+){3,7}/;
    /** Pattern used to detect a normal */
    SolidParser.NormalPattern = /^vn(\s+[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)/;
    /** Pattern used to detect a UV set */
    SolidParser.UVPattern = /^vt(\s+[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)/;
    /** Pattern used to detect a first kind of face (f vertex vertex vertex) */
    SolidParser.FacePattern1 = /^f\s+(([\d]{1,}[\s]?){3,})+/;
    /** Pattern used to detect a second kind of face (f vertex/uvs vertex/uvs vertex/uvs) */
    SolidParser.FacePattern2 = /^f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a third kind of face (f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal) */
    SolidParser.FacePattern3 = /^f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a fourth kind of face (f vertex//normal vertex//normal vertex//normal)*/
    SolidParser.FacePattern4 = /^f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a fifth kind of face (f -vertex/-uvs/-normal -vertex/-uvs/-normal -vertex/-uvs/-normal) */
    SolidParser.FacePattern5 = /^f\s+(((-[\d]{1,}\/-[\d]{1,}\/-[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a line(l vertex vertex) */
    SolidParser.LinePattern1 = /^l\s+(([\d]{1,}[\s]?){2,})+/;
    /** Pattern used to detect a second kind of line (l vertex/uvs vertex/uvs) */
    SolidParser.LinePattern2 = /^l\s+((([\d]{1,}\/[\d]{1,}[\s]?){2,})+)/;
    /** Pattern used to detect a third kind of line (l vertex/uvs/normal vertex/uvs/normal) */
    SolidParser.LinePattern3 = /^l\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){2,})+)/;
    return SolidParser;
}());


/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-objFileLoader.ts":
/*!***************************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-objFileLoader.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   OBJFileLoader: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.OBJFileLoader),
/* harmony export */   SolidParser: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.SolidParser)
/* harmony export */ });
/* harmony import */ var loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/OBJ/index */ "../../../dev/loaders/src/OBJ/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__) {
        if (!globalObject.BABYLON[key]) {
            globalObject.BABYLON[key] = loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__[key];
        }
    }
}



/***/ }),

/***/ "babylonjs/Misc/observable":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_observable__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/objFileLoader.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loaders: () => (/* reexport module object */ _lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/loaders/legacy/legacy-objFileLoader */ "../../../lts/loaders/src/legacy/legacy-objFileLoader.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5vYmpGaWxlTG9hZGVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBSUE7O0FBRUE7QUFDQTtBQUFBO0FBTUE7O0FBRUE7QUFDQTtBQStNQTtBQTdNQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBdE5BOztBQUVBO0FBQ0E7QUFvTkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pPQTtBQUNBO0FBR0E7QUFDQTtBQUdBO0FBRUE7QUFFQTtBQUVBOzs7QUFHQTtBQUNBO0FBbUVBOzs7O0FBSUE7QUFDQTtBQWxCQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUVBO0FBVUE7QUFDQTtBQTlEQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7QUFKQTtBQThEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFyVUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFZQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBbVJBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5VkE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQWdCQTs7QUFFQTtBQUNBO0FBb0VBOzs7OztBQUtBO0FBQ0E7QUFwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7OztBQWFBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFPQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXozQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF3MUJBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzM1QkE7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUNoQkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0xPQURFUlMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL09CSi9pbmRleC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovbXRsRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovb2JqRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovc29saWRQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9sdHMvbG9hZGVycy9zcmMvbGVnYWN5L2xlZ2FjeS1vYmpGaWxlTG9hZGVyLnRzIiwid2VicGFjazovL0xPQURFUlMvZXh0ZXJuYWwgdW1kIHtcInJvb3RcIjpcIkJBQllMT05cIixcImNvbW1vbmpzXCI6XCJiYWJ5bG9uanNcIixcImNvbW1vbmpzMlwiOlwiYmFieWxvbmpzXCIsXCJhbWRcIjpcImJhYnlsb25qc1wifSIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uL3NyYy9vYmpGaWxlTG9hZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1sb2FkZXJzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtbG9hZGVyc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiTE9BREVSU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2Nfb2JzZXJ2YWJsZV9fKSA9PiB7XG5yZXR1cm4gIiwiZXhwb3J0ICogZnJvbSBcIi4vbXRsRmlsZUxvYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9vYmpMb2FkaW5nT3B0aW9uc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb2xpZFBhcnNlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9vYmpGaWxlTG9hZGVyXCI7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgdHlwZSB7IEFzc2V0Q29udGFpbmVyIH0gZnJvbSBcImNvcmUvYXNzZXRDb250YWluZXJcIjtcclxuLyoqXHJcbiAqIENsYXNzIHJlYWRpbmcgYW5kIHBhcnNpbmcgdGhlIE1UTCBmaWxlIGJ1bmRsZWQgd2l0aCB0aGUgb2JqIGZpbGUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTVRMRmlsZUxvYWRlciB7XHJcbiAgICAvKipcclxuICAgICAqIEludmVydCBZLUF4aXMgb2YgcmVmZXJlbmNlZCB0ZXh0dXJlcyBvbiBsb2FkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSU5WRVJUX1RFWFRVUkVfWSA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGwgbWF0ZXJpYWwgbG9hZGVkIGZyb20gdGhlIG10bCB3aWxsIGJlIHNldCBoZXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtYXRlcmlhbHM6IFN0YW5kYXJkTWF0ZXJpYWxbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB3aWxsIHJlYWQgdGhlIG10bCBmaWxlIGFuZCBjcmVhdGUgZWFjaCBtYXRlcmlhbCBkZXNjcmliZWQgaW5zaWRlXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNvdWxkIGJlIGltcHJvdmUgYnkgYWRkaW5nIDpcclxuICAgICAqIC1zb21lIGNvbXBvbmVudCBtaXNzaW5nIChOaSwgVGYuLi4pXHJcbiAgICAgKiAtaW5jbHVkaW5nIHRoZSBzcGVjaWZpYyBvcHRpb25zIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBzY2VuZSB0aGUgbWF0ZXJpYWwgd2lsbCBiZSBjcmVhdGVkIGluXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBkZWZpbmVzIHRoZSBtdGwgZGF0YSB0byBwYXJzZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcm9vdHVybCB0byB1c2UgaW4gb3JkZXIgdG8gbG9hZCByZWxhdGl2ZSBkZXBlbmRlbmNpZXNcclxuICAgICAqIEBwYXJhbSBhc3NldENvbnRhaW5lciBkZWZpbmVzIHRoZSBhc3NldCBjb250YWluZXIgdG8gc3RvcmUgdGhlIG1hdGVyaWFsIGluIChjYW4gYmUgbnVsbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBhcnNlTVRMKHNjZW5lOiBTY2VuZSwgZGF0YTogc3RyaW5nIHwgQXJyYXlCdWZmZXIsIHJvb3RVcmw6IHN0cmluZywgYXNzZXRDb250YWluZXI6IE51bGxhYmxlPEFzc2V0Q29udGFpbmVyPik6IHZvaWQge1xyXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9TcGxpdCB0aGUgbGluZXMgZnJvbSB0aGUgZmlsZVxyXG4gICAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcclxuICAgICAgICAvLyB3aGl0ZXNwYWNlIGNoYXIgaWU6IFsgXFx0XFxyXFxuXFxmXVxyXG4gICAgICAgIGNvbnN0IGRlbGltaXRlcl9wYXR0ZXJuID0gL1xccysvO1xyXG4gICAgICAgIC8vQXJyYXkgd2l0aCBSR0IgY29sb3JzXHJcbiAgICAgICAgbGV0IGNvbG9yOiBudW1iZXJbXTtcclxuICAgICAgICAvL05ldyBtYXRlcmlhbFxyXG4gICAgICAgIGxldCBtYXRlcmlhbDogTnVsbGFibGU8U3RhbmRhcmRNYXRlcmlhbD4gPSBudWxsO1xyXG5cclxuICAgICAgICAvL0xvb2sgYXQgZWFjaCBsaW5lXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lID0gbGluZXNbaV0udHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQmxhbmsgbGluZSBvciBjb21tZW50XHJcbiAgICAgICAgICAgIGlmIChsaW5lLmxlbmd0aCA9PT0gMCB8fCBsaW5lLmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0dldCB0aGUgZmlyc3QgcGFyYW1ldGVyIChrZXl3b3JkKVxyXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBsaW5lLmluZGV4T2YoXCIgXCIpO1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gcG9zID49IDAgPyBsaW5lLnN1YnN0cmluZygwLCBwb3MpIDogbGluZTtcclxuICAgICAgICAgICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAvL0dldCB0aGUgZGF0YSBmb2xsb3dpbmcgdGhlIGtleVxyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gcG9zID49IDAgPyBsaW5lLnN1YnN0cmluZyhwb3MgKyAxKS50cmltKCkgOiBcIlwiO1xyXG5cclxuICAgICAgICAgICAgLy9UaGlzIG10bCBrZXl3b3JkIHdpbGwgY3JlYXRlIHRoZSBuZXcgbWF0ZXJpYWxcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJuZXdtdGxcIikge1xyXG4gICAgICAgICAgICAgICAgLy9DaGVjayBpZiBpdCBpcyB0aGUgZmlyc3QgbWF0ZXJpYWwuXHJcbiAgICAgICAgICAgICAgICAvLyBNYXRlcmlhbHMgc3BlY2lmaWNhdGlvbnMgYXJlIGRlc2NyaWJlZCBhZnRlciB0aGlzIGtleXdvcmQuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0FkZCB0aGUgcHJldmlvdXMgbWF0ZXJpYWwgaW4gdGhlIG1hdGVyaWFsIGFycmF5LlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBuZXcgbWF0ZXJpYWwuXHJcbiAgICAgICAgICAgICAgICAvLyB2YWx1ZSBpcyB0aGUgbmFtZSBvZiB0aGUgbWF0ZXJpYWwgcmVhZCBpbiB0aGUgbXRsIGZpbGVcclxuXHJcbiAgICAgICAgICAgICAgICBzY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISFhc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsID0gbmV3IFN0YW5kYXJkTWF0ZXJpYWwodmFsdWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLl9wYXJlbnRDb250YWluZXIgPSBhc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIHNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwia2RcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRGlmZnVzZSBjb2xvciAoY29sb3IgdW5kZXIgd2hpdGUgbGlnaHQpIHVzaW5nIFJHQiB2YWx1ZXNcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhbHVlICA9IFwiciBnIGJcIlxyXG4gICAgICAgICAgICAgICAgY29sb3IgPSA8bnVtYmVyW10+dmFsdWUuc3BsaXQoZGVsaW1pdGVyX3BhdHRlcm4sIDMpLm1hcChwYXJzZUZsb2F0KTtcclxuICAgICAgICAgICAgICAgIC8vY29sb3IgPSBbcixnLGJdXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0Z2hlIGNvbG9yIGludG8gdGhlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KGNvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwia2FcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQW1iaWVudCBjb2xvciAoY29sb3IgdW5kZXIgc2hhZG93KSB1c2luZyBSR0IgdmFsdWVzXHJcblxyXG4gICAgICAgICAgICAgICAgLy92YWx1ZSA9IFwiciBnIGJcIlxyXG4gICAgICAgICAgICAgICAgY29sb3IgPSA8bnVtYmVyW10+dmFsdWUuc3BsaXQoZGVsaW1pdGVyX3BhdHRlcm4sIDMpLm1hcChwYXJzZUZsb2F0KTtcclxuICAgICAgICAgICAgICAgIC8vY29sb3IgPSBbcixnLGJdXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0Z2hlIGNvbG9yIGludG8gdGhlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbWJpZW50Q29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KGNvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwia3NcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU3BlY3VsYXIgY29sb3IgKGNvbG9yIHdoZW4gbGlnaHQgaXMgcmVmbGVjdGVkIGZyb20gc2hpbnkgc3VyZmFjZSkgdXNpbmcgUkdCIHZhbHVlc1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFsdWUgPSBcInIgZyBiXCJcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gPG51bWJlcltdPnZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuLCAzKS5tYXAocGFyc2VGbG9hdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbG9yID0gW3IsZyxiXVxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGNvbG9yIGludG8gdGhlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5zcGVjdWxhckNvbG9yID0gQ29sb3IzLkZyb21BcnJheShjb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImtlXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIEVtaXNzaXZlIGNvbG9yIHVzaW5nIFJHQiB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gdmFsdWUuc3BsaXQoZGVsaW1pdGVyX3BhdHRlcm4sIDMpLm1hcChwYXJzZUZsb2F0KTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmVtaXNzaXZlQ29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KGNvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwibnNcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy92YWx1ZSA9IFwiSW50ZWdlclwiXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5zcGVjdWxhclBvd2VyID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImRcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy9kIGlzIGRpc3NvbHZlIGZvciBjdXJyZW50IG1hdGVyaWFsLiBJdCBtZWFuIGFscGhhIGZvciBCQUJZTE9OXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dHVyZVxyXG4gICAgICAgICAgICAgICAgLy9UaGlzIHBhcnQgY2FuIGJlIGltcHJvdmVkIGJ5IGFkZGluZyB0aGUgcG9zc2libGUgb3B0aW9ucyBvZiB0ZXh0dXJlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9rYVwiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhbWJpZW50IHRleHR1cmUgbWFwIHdpdGggYSBsb2FkZWQgaW1hZ2VcclxuICAgICAgICAgICAgICAgIC8vV2UgbXVzdCBmaXJzdCBnZXQgdGhlIGZvbGRlciBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFtYmllbnRUZXh0dXJlID0gTVRMRmlsZUxvYWRlci5fR2V0VGV4dHVyZShyb290VXJsLCB2YWx1ZSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJtYXBfa2RcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRGlmZnVzZSB0ZXh0dXJlIG1hcCB3aXRoIGEgbG9hZGVkIGltYWdlXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwibWFwX2tzXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNwZWN1bGFyIHRleHR1cmUgbWFwIHdpdGggYSBsb2FkZWQgaW1hZ2VcclxuICAgICAgICAgICAgICAgIC8vV2UgbXVzdCBmaXJzdCBnZXQgdGhlIGZvbGRlciBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLnNwZWN1bGFyVGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwibWFwX25zXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vU3BlY3VsYXJcclxuICAgICAgICAgICAgICAgIC8vU3BlY3VsYXIgaGlnaGxpZ2h0IGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgLy9XZSBtdXN0IGZpcnN0IGdldCB0aGUgZm9sZGVyIG9mIHRoZSBpbWFnZVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vTm90IHN1cHBvcnRlZCBieSBCQUJZTE9OXHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9idW1wXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vVGhlIGJ1bXAgdGV4dHVyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gdmFsdWUuc3BsaXQoZGVsaW1pdGVyX3BhdHRlcm4pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVtcE11bHRpcGxpZXJJbmRleCA9IHZhbHVlcy5pbmRleE9mKFwiLWJtXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bXBNdWx0aXBsaWVyOiBOdWxsYWJsZTxzdHJpbmc+ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYnVtcE11bHRpcGxpZXJJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVtcE11bHRpcGxpZXIgPSB2YWx1ZXNbYnVtcE11bHRpcGxpZXJJbmRleCArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5zcGxpY2UoYnVtcE11bHRpcGxpZXJJbmRleCwgMik7IC8vIHJlbW92ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmJ1bXBUZXh0dXJlID0gTVRMRmlsZUxvYWRlci5fR2V0VGV4dHVyZShyb290VXJsLCB2YWx1ZXMuam9pbihcIiBcIiksIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRlcmlhbC5idW1wVGV4dHVyZSAmJiBidW1wTXVsdGlwbGllciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmJ1bXBUZXh0dXJlLmxldmVsID0gcGFyc2VGbG9hdChidW1wTXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9kXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBkaXNzb2x2ZSBvZiB0aGUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLm9wYWNpdHlUZXh0dXJlID0gTVRMRmlsZUxvYWRlci5fR2V0VGV4dHVyZShyb290VXJsLCB2YWx1ZSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vT3B0aW9ucyBmb3IgaWxsdW1pbmF0aW9uXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImlsbHVtXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vSWxsdW1pbmF0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UaGF0IG1lYW4gS2QgPT0gS2RcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db2xvciBvbiBhbmQgQW1iaWVudCBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCIyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0hpZ2hsaWdodCBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCIzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1JlZmxlY3Rpb24gb24gYW5kIFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RyYW5zcGFyZW5jeTogR2xhc3Mgb24sIFJlZmxlY3Rpb246IFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI1XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1JlZmxlY3Rpb246IEZyZXNuZWwgb24gYW5kIFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI2XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RyYW5zcGFyZW5jeTogUmVmcmFjdGlvbiBvbiwgUmVmbGVjdGlvbjogRnJlc25lbCBvZmYgYW5kIFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI3XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RyYW5zcGFyZW5jeTogUmVmcmFjdGlvbiBvbiwgUmVmbGVjdGlvbjogRnJlc25lbCBvbiBhbmQgUmF5IHRyYWNlIG9uXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIjhcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vUmVmbGVjdGlvbiBvbiBhbmQgUmF5IHRyYWNlIG9mZlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RyYW5zcGFyZW5jeTogR2xhc3Mgb24sIFJlZmxlY3Rpb246IFJheSB0cmFjZSBvZmZcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiMTBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ2FzdHMgc2hhZG93cyBvbnRvIGludmlzaWJsZSBzdXJmYWNlc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVbmhhbmRsZWQgZXhwcmVzc2lvbiBhdCBsaW5lIDogXCIgKyBpICsnXFxuJyArIFwid2l0aCB2YWx1ZSA6IFwiICsgbGluZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9BdCB0aGUgZW5kIG9mIHRoZSBmaWxlLCBhZGQgdGhlIGxhc3QgbWF0ZXJpYWxcclxuICAgICAgICBpZiAobWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdGV4dHVyZSBmb3IgdGhlIG1hdGVyaWFsLlxyXG4gICAgICpcclxuICAgICAqIElmIHRoZSBtYXRlcmlhbCBpcyBpbXBvcnRlZCBmcm9tIGlucHV0IGZpbGUsXHJcbiAgICAgKiBXZSBzYW5pdGl6ZSB0aGUgdXJsIHRvIGVuc3VyZSBpdCB0YWtlcyB0aGUgdGV4dHVyZSBmcm9tIGFzaWRlIHRoZSBtYXRlcmlhbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBUaGUgcm9vdCB1cmwgdG8gbG9hZCBmcm9tXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHN0b3JlZCBpbiB0aGUgbXRsXHJcbiAgICAgKiBAcGFyYW0gc2NlbmVcclxuICAgICAqIEByZXR1cm5zIFRoZSBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9HZXRUZXh0dXJlKHJvb3RVcmw6IHN0cmluZywgdmFsdWU6IHN0cmluZywgc2NlbmU6IFNjZW5lKTogTnVsbGFibGU8VGV4dHVyZT4ge1xyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdXJsID0gcm9vdFVybDtcclxuICAgICAgICAvLyBMb2FkIGZyb20gaW5wdXQgZmlsZS5cclxuICAgICAgICBpZiAocm9vdFVybCA9PT0gXCJmaWxlOlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXN0RGVsaW1pdGVyID0gdmFsdWUubGFzdEluZGV4T2YoXCJcXFxcXCIpO1xyXG4gICAgICAgICAgICBpZiAobGFzdERlbGltaXRlciA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxhc3REZWxpbWl0ZXIgPSB2YWx1ZS5sYXN0SW5kZXhPZihcIi9cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsYXN0RGVsaW1pdGVyID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHVybCArPSB2YWx1ZS5zdWJzdHIobGFzdERlbGltaXRlciArIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXJsICs9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE5vdCBmcm9tIGlucHV0IGZpbGUuXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVybCArPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dHVyZSh1cmwsIHNjZW5lLCBmYWxzZSwgTVRMRmlsZUxvYWRlci5JTlZFUlRfVEVYVFVSRV9ZKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy90b29sc1wiO1xyXG5pbXBvcnQgdHlwZSB7IEFic3RyYWN0TWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9hYnN0cmFjdE1lc2hcIjtcclxuaW1wb3J0IHR5cGUgeyBJU2NlbmVMb2FkZXJQbHVnaW5Bc3luYywgSVNjZW5lTG9hZGVyUGx1Z2luRmFjdG9yeSwgSVNjZW5lTG9hZGVyUGx1Z2luLCBJU2NlbmVMb2FkZXJBc3luY1Jlc3VsdCB9IGZyb20gXCJjb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVMb2FkZXIgfSBmcm9tIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCI7XHJcbmltcG9ydCB7IEFzc2V0Q29udGFpbmVyIH0gZnJvbSBcImNvcmUvYXNzZXRDb250YWluZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgV2ViUmVxdWVzdCB9IGZyb20gXCJjb3JlL01pc2Mvd2ViUmVxdWVzdFwiO1xyXG5pbXBvcnQgeyBNVExGaWxlTG9hZGVyIH0gZnJvbSBcIi4vbXRsRmlsZUxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE9CSkxvYWRpbmdPcHRpb25zIH0gZnJvbSBcIi4vb2JqTG9hZGluZ09wdGlvbnNcIjtcclxuaW1wb3J0IHsgU29saWRQYXJzZXIgfSBmcm9tIFwiLi9zb2xpZFBhcnNlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuXHJcbi8qKlxyXG4gKiBPQkogZmlsZSB0eXBlIGxvYWRlci5cclxuICogVGhpcyBpcyBhIGJhYnlsb24gc2NlbmUgbG9hZGVyIHBsdWdpbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBPQkpGaWxlTG9hZGVyIGltcGxlbWVudHMgSVNjZW5lTG9hZGVyUGx1Z2luQXN5bmMsIElTY2VuZUxvYWRlclBsdWdpbkZhY3Rvcnkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIFVWcyBhcmUgb3B0aW1pemVkIGJ5IGRlZmF1bHQgZHVyaW5nIGxvYWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgT1BUSU1JWkVfV0lUSF9VViA9IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIEludmVydCBtb2RlbCBvbiB5LWF4aXMgKGRvZXMgYSBtb2RlbCBzY2FsaW5nIGludmVyc2lvbilcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBJTlZFUlRfWSA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZlcnQgWS1BeGlzIG9mIHJlZmVyZW5jZWQgdGV4dHVyZXMgb24gbG9hZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJTlZFUlRfVEVYVFVSRV9ZKCkge1xyXG4gICAgICAgIHJldHVybiBNVExGaWxlTG9hZGVyLklOVkVSVF9URVhUVVJFX1k7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXQgSU5WRVJUX1RFWFRVUkVfWSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIE1UTEZpbGVMb2FkZXIuSU5WRVJUX1RFWFRVUkVfWSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5jbHVkZSBpbiBtZXNoZXMgdGhlIHZlcnRleCBjb2xvcnMgYXZhaWxhYmxlIGluIHNvbWUgT0JKIGZpbGVzLiAgVGhpcyBpcyBub3QgcGFydCBvZiBPQkogc3RhbmRhcmQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSU1QT1JUX1ZFUlRFWF9DT0xPUlMgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogQ29tcHV0ZSB0aGUgbm9ybWFscyBmb3IgdGhlIG1vZGVsLCBldmVuIGlmIG5vcm1hbHMgYXJlIHByZXNlbnQgaW4gdGhlIGZpbGUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ09NUFVURV9OT1JNQUxTID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIE9wdGltaXplIHRoZSBub3JtYWxzIGZvciB0aGUgbW9kZWwuIExpZ2h0aW5nIGNhbiBiZSB1bmV2ZW4gaWYgeW91IHVzZSBPcHRpbWl6ZVdpdGhVViA9IHRydWUgYmVjYXVzZSBuZXcgdmVydGljZXMgY2FuIGJlIGNyZWF0ZWQgZm9yIHRoZSBzYW1lIGxvY2F0aW9uIGlmIHRoZXkgcGVydGFpbiB0byBkaWZmZXJlbnQgZmFjZXMuXHJcbiAgICAgKiBVc2luZyBPcHRpbWl6ZWhOb3JtYWxzID0gdHJ1ZSB3aWxsIGhlbHAgc21vb3RoaW5nIHRoZSBsaWdodGluZyBieSBhdmVyYWdpbmcgdGhlIG5vcm1hbHMgb2YgdGhvc2UgdmVydGljZXMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgT1BUSU1JWkVfTk9STUFMUyA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGN1c3RvbSBzY2FsaW5nIG9mIFVWIGNvb3JkaW5hdGVzIG9mIGxvYWRlZCBtZXNoZXMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVVZfU0NBTElORyA9IG5ldyBWZWN0b3IyKDEsIDEpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTa2lwIGxvYWRpbmcgdGhlIG1hdGVyaWFscyBldmVuIGlmIGRlZmluZWQgaW4gdGhlIE9CSiBmaWxlIChtYXRlcmlhbHMgYXJlIGlnbm9yZWQpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNLSVBfTUFURVJJQUxTID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIGEgbWF0ZXJpYWwgZmFpbHMgdG8gbG9hZCBPQkogbG9hZGVyIHdpbGwgc2lsZW50bHkgZmFpbCBhbmQgb25TdWNjZXNzKCkgY2FsbGJhY2sgd2lsbCBiZSB0cmlnZ2VyZWQuXHJcbiAgICAgKlxyXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTUFURVJJQUxfTE9BRElOR19GQUlMU19TSUxFTlRMWSA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhc3NldHMgd2l0aG91dCBoYW5kZWRuZXNzIGNvbnZlcnNpb25zLiBUaGlzIGZsYWcgaXMgZm9yIGNvbXBhdGliaWxpdHkuIFVzZSBpdCBvbmx5IGlmIGFic29sdXRlbHkgcmVxdWlyZWQuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVTRV9MRUdBQ1lfQkVIQVZJT1IgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIG5hbWUgb2YgdGhlIHBsdWdpbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5hbWUgPSBcIm9ialwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBleHRlbnNpb24gdGhlIHBsdWdpbiBpcyBhYmxlIHRvIGxvYWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBleHRlbnNpb25zID0gXCIub2JqXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfYXNzZXRDb250YWluZXI6IE51bGxhYmxlPEFzc2V0Q29udGFpbmVyPiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGluZ09wdGlvbnM6IE9CSkxvYWRpbmdPcHRpb25zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBsb2FkZXIgZm9yIC5PQkogZmlsZXNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbG9hZGluZ09wdGlvbnMgb3B0aW9ucyBmb3IgbG9hZGluZyBhbmQgcGFyc2luZyBPQkovTVRMIGZpbGVzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkaW5nT3B0aW9ucz86IE9CSkxvYWRpbmdPcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGluZ09wdGlvbnMgPSBsb2FkaW5nT3B0aW9ucyB8fCBPQkpGaWxlTG9hZGVyLl9EZWZhdWx0TG9hZGluZ09wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0IF9EZWZhdWx0TG9hZGluZ09wdGlvbnMoKTogT0JKTG9hZGluZ09wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbXB1dGVOb3JtYWxzOiBPQkpGaWxlTG9hZGVyLkNPTVBVVEVfTk9STUFMUyxcclxuICAgICAgICAgICAgb3B0aW1pemVOb3JtYWxzOiBPQkpGaWxlTG9hZGVyLk9QVElNSVpFX05PUk1BTFMsXHJcbiAgICAgICAgICAgIGltcG9ydFZlcnRleENvbG9yczogT0JKRmlsZUxvYWRlci5JTVBPUlRfVkVSVEVYX0NPTE9SUyxcclxuICAgICAgICAgICAgaW52ZXJ0WTogT0JKRmlsZUxvYWRlci5JTlZFUlRfWSxcclxuICAgICAgICAgICAgaW52ZXJ0VGV4dHVyZVk6IE9CSkZpbGVMb2FkZXIuSU5WRVJUX1RFWFRVUkVfWSxcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG4gICAgICAgICAgICBVVlNjYWxpbmc6IE9CSkZpbGVMb2FkZXIuVVZfU0NBTElORyxcclxuICAgICAgICAgICAgbWF0ZXJpYWxMb2FkaW5nRmFpbHNTaWxlbnRseTogT0JKRmlsZUxvYWRlci5NQVRFUklBTF9MT0FESU5HX0ZBSUxTX1NJTEVOVExZLFxyXG4gICAgICAgICAgICBvcHRpbWl6ZVdpdGhVVjogT0JKRmlsZUxvYWRlci5PUFRJTUlaRV9XSVRIX1VWLFxyXG4gICAgICAgICAgICBza2lwTWF0ZXJpYWxzOiBPQkpGaWxlTG9hZGVyLlNLSVBfTUFURVJJQUxTLFxyXG4gICAgICAgICAgICB1c2VMZWdhY3lCZWhhdmlvcjogT0JKRmlsZUxvYWRlci5VU0VfTEVHQUNZX0JFSEFWSU9SLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxscyBzeW5jaHJvbm91c2x5IHRoZSBNVEwgZmlsZSBhdHRhY2hlZCB0byB0aGlzIG9iai5cclxuICAgICAqIExvYWQgZnVuY3Rpb24gb3IgaW1wb3J0TWVzaCBmdW5jdGlvbiBkb24ndCBlbmFibGUgdG8gbG9hZCAyIGZpbGVzIGluIHRoZSBzYW1lIHRpbWUgYXN5bmNocm9ub3VzbHkuXHJcbiAgICAgKiBXaXRob3V0IHRoaXMgZnVuY3Rpb24gbWF0ZXJpYWxzIGFyZSBub3QgZGlzcGxheWVkIGluIHRoZSBmaXJzdCBmcmFtZSAoYnV0IGRpc3BsYXllZCBhZnRlcikuXHJcbiAgICAgKiBJbiBjb25zZXF1ZW5jZSBpdCBpcyBpbXBvc3NpYmxlIHRvIGdldCBtYXRlcmlhbCBpbmZvcm1hdGlvbiBpbiB5b3VyIEhUTUwgZmlsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB1cmwgVGhlIFVSTCBvZiB0aGUgTVRMIGZpbGVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgd2hlcmUgdG8gbG9hZCBkYXRhIGZyb21cclxuICAgICAqIEBwYXJhbSBvblN1Y2Nlc3MgQ2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIE1UTCBmaWxlIGlzIGxvYWRlZFxyXG4gICAgICogQHBhcmFtIG9uRmFpbHVyZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9sb2FkTVRMKFxyXG4gICAgICAgIHVybDogc3RyaW5nLFxyXG4gICAgICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgICAgICBvblN1Y2Nlc3M6IChyZXNwb25zZTogc3RyaW5nIHwgQXJyYXlCdWZmZXIsIHJlc3BvbnNlVXJsPzogc3RyaW5nKSA9PiBhbnksXHJcbiAgICAgICAgb25GYWlsdXJlOiAocGF0aE9mRmlsZTogc3RyaW5nLCBleGNlcHRpb24/OiBhbnkpID0+IHZvaWRcclxuICAgICkge1xyXG4gICAgICAgIC8vVGhlIGNvbXBsZXRlIHBhdGggdG8gdGhlIG10bCBmaWxlXHJcbiAgICAgICAgY29uc3QgcGF0aE9mRmlsZSA9IHJvb3RVcmwgKyB1cmw7XHJcblxyXG4gICAgICAgIC8vIExvYWRzIHRocm91Z2ggdGhlIGJhYnlsb24gdG9vbHMgdG8gYWxsb3cgZmlsZUlucHV0IHNlYXJjaC5cclxuICAgICAgICBUb29scy5Mb2FkRmlsZShwYXRoT2ZGaWxlLCBvblN1Y2Nlc3MsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmYWxzZSwgKHJlcXVlc3Q/OiBXZWJSZXF1ZXN0IHwgdW5kZWZpbmVkLCBleGNlcHRpb24/OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgb25GYWlsdXJlKHBhdGhPZkZpbGUsIGV4Y2VwdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZXMgYSBPQkogZmlsZSBsb2FkZXIgcGx1Z2luLlxyXG4gICAgICogQHJldHVybnMgdGhlIGNyZWF0ZWQgcGx1Z2luXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVBsdWdpbigpOiBJU2NlbmVMb2FkZXJQbHVnaW5Bc3luYyB8IElTY2VuZUxvYWRlclBsdWdpbiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPQkpGaWxlTG9hZGVyKE9CSkZpbGVMb2FkZXIuX0RlZmF1bHRMb2FkaW5nT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUgZGF0YSBzdHJpbmcgY2FuIGJlIGxvYWRlZCBkaXJlY3RseS5cclxuICAgICAqIEByZXR1cm5zIGlmIHRoZSBkYXRhIGNhbiBiZSBsb2FkZWQgZGlyZWN0bHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNhbkRpcmVjdExvYWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wb3J0cyBvbmUgb3IgbW9yZSBtZXNoZXMgZnJvbSB0aGUgbG9hZGVkIE9CSiBkYXRhIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzTmFtZXMgYSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyBvZiB0aGUgbWVzaCBuYW1lcyB0aGF0IHNob3VsZCBiZSBsb2FkZWQgZnJvbSB0aGUgZmlsZVxyXG4gICAgICogQHBhcmFtIHNjZW5lIHRoZSBzY2VuZSB0aGUgbWVzaGVzIHNob3VsZCBiZSBhZGRlZCB0b1xyXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIE9CSiBkYXRhIHRvIGxvYWRcclxuICAgICAqIEBwYXJhbSByb290VXJsIHJvb3QgdXJsIHRvIGxvYWQgZnJvbVxyXG4gICAgICogQHJldHVybnMgYSBwcm9taXNlIGNvbnRhaW5pbmcgdGhlIGxvYWRlZCBtZXNoZXMsIHBhcnRpY2xlcywgc2tlbGV0b25zIGFuZCBhbmltYXRpb25zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbXBvcnRNZXNoQXN5bmMobWVzaGVzTmFtZXM6IGFueSwgc2NlbmU6IFNjZW5lLCBkYXRhOiBhbnksIHJvb3RVcmw6IHN0cmluZyk6IFByb21pc2U8SVNjZW5lTG9hZGVyQXN5bmNSZXN1bHQ+IHtcclxuICAgICAgICAvL2dldCB0aGUgbWVzaGVzIGZyb20gT0JKIGZpbGVcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VTb2xpZChtZXNoZXNOYW1lcywgc2NlbmUsIGRhdGEsIHJvb3RVcmwpLnRoZW4oKG1lc2hlcykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWVzaGVzOiBtZXNoZXMsXHJcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZVN5c3RlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgc2tlbGV0b25zOiBbXSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkdyb3VwczogW10sXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1Ob2RlczogW10sXHJcbiAgICAgICAgICAgICAgICBnZW9tZXRyaWVzOiBbXSxcclxuICAgICAgICAgICAgICAgIGxpZ2h0czogW10sXHJcbiAgICAgICAgICAgICAgICBzcHJpdGVNYW5hZ2VyczogW10sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnRzIGFsbCBvYmplY3RzIGZyb20gdGhlIGxvYWRlZCBPQkogZGF0YSBhbmQgYWRkcyB0aGVtIHRvIHRoZSBzY2VuZVxyXG4gICAgICogQHBhcmFtIHNjZW5lIHRoZSBzY2VuZSB0aGUgb2JqZWN0cyBzaG91bGQgYmUgYWRkZWQgdG9cclxuICAgICAqIEBwYXJhbSBkYXRhIHRoZSBPQkogZGF0YSB0byBsb2FkXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCByb290IHVybCB0byBsb2FkIGZyb21cclxuICAgICAqIEByZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBjb21wbGV0ZXMgd2hlbiBvYmplY3RzIGhhdmUgYmVlbiBsb2FkZWQgdG8gdGhlIHNjZW5lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQXN5bmMoc2NlbmU6IFNjZW5lLCBkYXRhOiBzdHJpbmcsIHJvb3RVcmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vR2V0IHRoZSAzRCBtb2RlbFxyXG4gICAgICAgIHJldHVybiB0aGlzLmltcG9ydE1lc2hBc3luYyhudWxsLCBzY2VuZSwgZGF0YSwgcm9vdFVybCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiB2b2lkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGludG8gYW4gYXNzZXQgY29udGFpbmVyLlxyXG4gICAgICogQHBhcmFtIHNjZW5lIFRoZSBzY2VuZSB0byBsb2FkIGludG9cclxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGltcG9ydFxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgVGhlIHJvb3QgdXJsIGZvciBzY2VuZSBhbmQgcmVzb3VyY2VzXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgbG9hZGVkIGFzc2V0IGNvbnRhaW5lclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEFzc2V0Q29udGFpbmVyQXN5bmMoc2NlbmU6IFNjZW5lLCBkYXRhOiBzdHJpbmcsIHJvb3RVcmw6IHN0cmluZyk6IFByb21pc2U8QXNzZXRDb250YWluZXI+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBuZXcgQXNzZXRDb250YWluZXIoc2NlbmUpO1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0Q29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pbXBvcnRNZXNoQXN5bmMobnVsbCwgc2NlbmUsIGRhdGEsIHJvb3RVcmwpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4gY29udGFpbmVyLm1lc2hlcy5wdXNoKG1lc2gpKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbWVzaC5tYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWF0ZXJpYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIubWF0ZXJpYWxzLmluZGV4T2YobWF0ZXJpYWwpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIubWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRleHR1cmVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0dXJlcyA9IG1hdGVyaWFsLmdldEFjdGl2ZVRleHR1cmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlcy5mb3JFYWNoKCh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci50ZXh0dXJlcy5pbmRleE9mKHQpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci50ZXh0dXJlcy5wdXNoKHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hc3NldENvbnRhaW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hc3NldENvbnRhaW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBleDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIHRoZSBPQkogZmlsZSBhbmQgY3JlYXRlIGFuIEFycmF5IG9mIG1lc2hlcy5cclxuICAgICAqIEVhY2ggbWVzaCBjb250YWlucyBhbGwgaW5mb3JtYXRpb24gZ2l2ZW4gYnkgdGhlIE9CSiBhbmQgdGhlIE1UTCBmaWxlLlxyXG4gICAgICogaS5lLiB2ZXJ0aWNlcyBwb3NpdGlvbnMgYW5kIGluZGljZXMsIG9wdGlvbmFsIG5vcm1hbHMgdmFsdWVzLCBvcHRpb25hbCBVViB2YWx1ZXMsIG9wdGlvbmFsIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbWVzaGVzTmFtZXMgZGVmaW5lcyBhIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIG9mIHRoZSBtZXNoIG5hbWVzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZCBmcm9tIHRoZSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgc2NlbmUgd2hlcmUgYXJlIGRpc3BsYXllZCB0aGUgZGF0YVxyXG4gICAgICogQHBhcmFtIGRhdGEgZGVmaW5lcyB0aGUgY29udGVudCBvZiB0aGUgb2JqIGZpbGVcclxuICAgICAqIEBwYXJhbSByb290VXJsIGRlZmluZXMgdGhlIHBhdGggdG8gdGhlIGZvbGRlclxyXG4gICAgICogQHJldHVybnMgdGhlIGxpc3Qgb2YgbG9hZGVkIG1lc2hlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wYXJzZVNvbGlkKG1lc2hlc05hbWVzOiBhbnksIHNjZW5lOiBTY2VuZSwgZGF0YTogc3RyaW5nLCByb290VXJsOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PEFic3RyYWN0TWVzaD4+IHtcclxuICAgICAgICBsZXQgZmlsZVRvTG9hZDogc3RyaW5nID0gXCJcIjsgLy9UaGUgbmFtZSBvZiB0aGUgbXRsRmlsZSB0byBsb2FkXHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxzRnJvbU1UTEZpbGU6IE1UTEZpbGVMb2FkZXIgPSBuZXcgTVRMRmlsZUxvYWRlcigpO1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsVG9Vc2U6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgY29uc3QgYmFieWxvbk1lc2hlc0FycmF5OiBBcnJheTxNZXNoPiA9IFtdOyAvL1RoZSBtZXNoIGZvciBiYWJ5bG9uXHJcblxyXG4gICAgICAgIC8vIE1haW4gZnVuY3Rpb25cclxuICAgICAgICBjb25zdCBzb2xpZFBhcnNlciA9IG5ldyBTb2xpZFBhcnNlcihtYXRlcmlhbFRvVXNlLCBiYWJ5bG9uTWVzaGVzQXJyYXksIHRoaXMuX2xvYWRpbmdPcHRpb25zKTtcclxuXHJcbiAgICAgICAgc29saWRQYXJzZXIucGFyc2UobWVzaGVzTmFtZXMsIGRhdGEsIHNjZW5lLCB0aGlzLl9hc3NldENvbnRhaW5lciwgKGZpbGVOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgZmlsZVRvTG9hZCA9IGZpbGVOYW1lO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBsb2FkIHRoZSBtYXRlcmlhbHNcclxuICAgICAgICBjb25zdCBtdGxQcm9taXNlczogQXJyYXk8UHJvbWlzZTx2b2lkPj4gPSBbXTtcclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEgZmlsZSB0byBsb2FkXHJcbiAgICAgICAgaWYgKGZpbGVUb0xvYWQgIT09IFwiXCIgJiYgIXRoaXMuX2xvYWRpbmdPcHRpb25zLnNraXBNYXRlcmlhbHMpIHtcclxuICAgICAgICAgICAgLy9Mb2FkIHRoZSBmaWxlIHN5bmNocm9ub3VzbHlcclxuICAgICAgICAgICAgbXRsUHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkTVRMKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlVG9Mb2FkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290VXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZGF0YUxvYWRlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NyZWF0ZSBtYXRlcmlhbHMgdGhhbmtzIE1UTExvYWRlciBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsc0Zyb21NVExGaWxlLnBhcnNlTVRMKHNjZW5lLCBkYXRhTG9hZGVkLCByb290VXJsLCB0aGlzLl9hc3NldENvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Mb29rIGF0IGVhY2ggbWF0ZXJpYWwgbG9hZGVkIGluIHRoZSBtdGwgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbWF0ZXJpYWxzRnJvbU1UTEZpbGUubWF0ZXJpYWxzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGhyZWUgdmFyaWFibGVzIHRvIGdldCBhbGwgbWVzaGVzIHdpdGggdGhlIHNhbWUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfaW5kaWNlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgX2luZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UaGUgbWF0ZXJpYWwgZnJvbSBNVEwgZmlsZSBpcyB1c2VkIGluIHRoZSBtZXNoZXMgbG9hZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgaW5kaWNlIGluIGFuIGFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgaWYgdGhlIG1hdGVyaWFsIGlzIG5vdCB1c2VkIGZvciBhbm90aGVyIG1lc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChfaW5kZXggPSBtYXRlcmlhbFRvVXNlLmluZGV4T2YobWF0ZXJpYWxzRnJvbU1UTEZpbGUubWF0ZXJpYWxzW25dLm5hbWUsIHN0YXJ0SW5kZXgpKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW5kaWNlcy5wdXNoKF9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydEluZGV4ID0gX2luZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBtYXRlcmlhbCBpcyBub3QgdXNlZCBkaXNwb3NlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaW5kZXggPT09IC0xICYmIF9pbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB0aGUgbWF0ZXJpYWwgaXMgbm90IG5lZWRlZCwgcmVtb3ZlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbHNGcm9tTVRMRmlsZS5tYXRlcmlhbHNbbl0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCBfaW5kaWNlcy5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQXBwbHkgdGhlIG1hdGVyaWFsIHRvIHRoZSBNZXNoIGZvciBlYWNoIG1lc2ggd2l0aCB0aGUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNoID0gYmFieWxvbk1lc2hlc0FycmF5W19pbmRpY2VzW29dXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG1hdGVyaWFsc0Zyb21NVExGaWxlLm1hdGVyaWFsc1tuXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNoLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWVzaC5nZXRUb3RhbEluZGljZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBpbmRpY2VzLCB3ZSBuZWVkIHRvIHR1cm4gb24gcG9pbnQgY2xvdWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwucG9pbnRzQ2xvdWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9vbHMuV2FybihgRXJyb3IgcHJvY2Vzc2luZyBNVEwgZmlsZTogJyR7ZmlsZVRvTG9hZH0nYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLm1hdGVyaWFsTG9hZGluZ0ZhaWxzU2lsZW50bHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChwYXRoT2ZGaWxlOiBzdHJpbmcsIGV4Y2VwdGlvbj86IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9vbHMuV2FybihgRXJyb3IgZG93bmxvYWRpbmcgTVRMIGZpbGU6ICcke2ZpbGVUb0xvYWR9J2ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLm1hdGVyaWFsTG9hZGluZ0ZhaWxzU2lsZW50bHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChleGNlcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUmV0dXJuIGFuIGFycmF5IHdpdGggYWxsIE1lc2hcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwobXRsUHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0xpbmUgPSAobWVzaDogQWJzdHJhY3RNZXNoKSA9PiBCb29sZWFuKG1lc2guX2ludGVybmFsTWV0YWRhdGE/LltcIl9pc0xpbmVcIl0gPz8gZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBtZXNoLCBkZXRlcm1pbmUgaWYgaXQgaXMgYSBsaW5lIG1lc2gsIGNsb25lIG9yIG1vZGlmeSB0aGUgbWF0ZXJpYWwgdG8gbGluZSByZW5kZXJpbmcuXHJcbiAgICAgICAgICAgIGJhYnlsb25NZXNoZXNBcnJheS5mb3JFYWNoKChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNMaW5lKG1lc2gpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdCA9IG1lc2gubWF0ZXJpYWwgPz8gbmV3IFN0YW5kYXJkTWF0ZXJpYWwobWVzaC5uYW1lICsgXCJfbGluZVwiLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYW5vdGhlciBtZXNoIGlzIHVzaW5nIHRoaXMgbWF0ZXJpYWwgYW5kIGl0IGlzIG5vdCBhIGxpbmUgdGhlbiB3ZSBuZWVkIHRvIGNsb25lIGl0LlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5lZWRDbG9uZSA9IG1hdC5nZXRCaW5kZWRNZXNoZXMoKS5maWx0ZXIoKGUpID0+ICFpc0xpbmUoZSkpLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lZWRDbG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXQgPSBtYXQuY2xvbmUobWF0Lm5hbWUgKyBcIl9saW5lXCIpID8/IG1hdDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0LndpcmVmcmFtZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaC5tYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzaC5faW50ZXJuYWxNZXRhZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoLl9pbnRlcm5hbE1ldGFkYXRhW1wiX2lzTGluZVwiXSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25NZXNoZXNBcnJheTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuaWYgKFNjZW5lTG9hZGVyKSB7XHJcbiAgICAvL0FkZCB0aGlzIGxvYWRlciBpbnRvIHRoZSByZWdpc3RlciBwbHVnaW5cclxuICAgIFNjZW5lTG9hZGVyLlJlZ2lzdGVyUGx1Z2luKG5ldyBPQkpGaWxlTG9hZGVyKCkpO1xyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgQXNzZXRDb250YWluZXIgfSBmcm9tIFwiY29yZS9hc3NldENvbnRhaW5lclwiO1xyXG5pbXBvcnQgeyBWZXJ0ZXhCdWZmZXIgfSBmcm9tIFwiY29yZS9CdWZmZXJzL2J1ZmZlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFN0YW5kYXJkTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvc3RhbmRhcmRNYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBDb2xvcjMsIENvbG9yNCB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiwgVmVjdG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgeyBHZW9tZXRyeSB9IGZyb20gXCJjb3JlL01lc2hlcy9nZW9tZXRyeVwiO1xyXG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuaW1wb3J0IHsgVmVydGV4RGF0YSB9IGZyb20gXCJjb3JlL01lc2hlcy9tZXNoLnZlcnRleERhdGFcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IE9CSkxvYWRpbmdPcHRpb25zIH0gZnJvbSBcIi4vb2JqTG9hZGluZ09wdGlvbnNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmUvTWlzYy9sb2dnZXJcIjtcclxuXHJcbnR5cGUgTWVzaE9iamVjdCA9IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGluZGljZXM6IE51bGxhYmxlPEFycmF5PG51bWJlcj4+O1xyXG4gICAgcG9zaXRpb25zOiBOdWxsYWJsZTxBcnJheTxudW1iZXI+PjtcclxuICAgIG5vcm1hbHM6IE51bGxhYmxlPEFycmF5PG51bWJlcj4+O1xyXG4gICAgY29sb3JzOiBOdWxsYWJsZTxBcnJheTxudW1iZXI+PjtcclxuICAgIHV2czogTnVsbGFibGU8QXJyYXk8bnVtYmVyPj47XHJcbiAgICBtYXRlcmlhbE5hbWU6IHN0cmluZztcclxuICAgIGRpcmVjdE1hdGVyaWFsPzogTnVsbGFibGU8TWF0ZXJpYWw+O1xyXG4gICAgaXNPYmplY3Q6IGJvb2xlYW47IC8vIElmIHRoZSBlbnRpdHkgaXMgZGVmaW5lZCBhcyBhbiBvYmplY3QgKFwib1wiKSwgb3IgZ3JvdXAgKFwiZ1wiKVxyXG4gICAgX2JhYnlsb25NZXNoPzogQWJzdHJhY3RNZXNoOyAvLyBUaGUgY29ycmVzcG9uZGluZyBCYWJ5bG9uIG1lc2hcclxuICAgIGhhc0xpbmVzPzogYm9vbGVhbjsgLy8gSWYgdGhlIG1lc2ggaGFzIGxpbmVzXHJcbn07XHJcblxyXG4vKipcclxuICogQ2xhc3MgdXNlZCB0byBsb2FkIG1lc2ggZGF0YSBmcm9tIE9CSiBjb250ZW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU29saWRQYXJzZXIge1xyXG4gICAgLy8gRGVzY3JpcHRvclxyXG4gICAgLyoqIE9iamVjdCBkZXNjcmlwdG9yICovXHJcbiAgICBwdWJsaWMgc3RhdGljIE9iamVjdERlc2NyaXB0b3IgPSAvXm8vO1xyXG4gICAgLyoqIEdyb3VwIGRlc2NyaXB0b3IgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR3JvdXBEZXNjcmlwdG9yID0gL15nLztcclxuICAgIC8qKiBNYXRlcmlhbCBsaWIgZGVzY3JpcHRvciAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBNdGxMaWJHcm91cERlc2NyaXB0b3IgPSAvXm10bGxpYiAvO1xyXG4gICAgLyoqIFVzZSBhIG1hdGVyaWFsIGRlc2NyaXB0b3IgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVXNlTXRsRGVzY3JpcHRvciA9IC9edXNlbXRsIC87XHJcbiAgICAvKiogU21vb3RoIGRlc2NyaXB0b3IgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU21vb3RoRGVzY3JpcHRvciA9IC9ecyAvO1xyXG5cclxuICAgIC8vIFBhdHRlcm5zXHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIHZlcnRleCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBWZXJ0ZXhQYXR0ZXJuID0gL152KFxccytbXFxkfC58K3xcXC18ZXxFXSspezMsN30vO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBub3JtYWwgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTm9ybWFsUGF0dGVybiA9IC9edm4oXFxzK1tcXGR8LnwrfFxcLXxlfEVdKykoICtbXFxkfC58K3xcXC18ZXxFXSspKCArW1xcZHwufCt8XFwtfGV8RV0rKS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIFVWIHNldCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVVlBhdHRlcm4gPSAvXnZ0KFxccytbXFxkfC58K3xcXC18ZXxFXSspKCArW1xcZHwufCt8XFwtfGV8RV0rKS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIGZpcnN0IGtpbmQgb2YgZmFjZSAoZiB2ZXJ0ZXggdmVydGV4IHZlcnRleCkgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRmFjZVBhdHRlcm4xID0gL15mXFxzKygoW1xcZF17MSx9W1xcc10/KXszLH0pKy87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIHNlY29uZCBraW5kIG9mIGZhY2UgKGYgdmVydGV4L3V2cyB2ZXJ0ZXgvdXZzIHZlcnRleC91dnMpICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEZhY2VQYXR0ZXJuMiA9IC9eZlxccysoKChbXFxkXXsxLH1cXC9bXFxkXXsxLH1bXFxzXT8pezMsfSkrKS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIHRoaXJkIGtpbmQgb2YgZmFjZSAoZiB2ZXJ0ZXgvdXZzL25vcm1hbCB2ZXJ0ZXgvdXZzL25vcm1hbCB2ZXJ0ZXgvdXZzL25vcm1hbCkgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRmFjZVBhdHRlcm4zID0gL15mXFxzKygoKFtcXGRdezEsfVxcL1tcXGRdezEsfVxcL1tcXGRdezEsfVtcXHNdPyl7Myx9KSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgZm91cnRoIGtpbmQgb2YgZmFjZSAoZiB2ZXJ0ZXgvL25vcm1hbCB2ZXJ0ZXgvL25vcm1hbCB2ZXJ0ZXgvL25vcm1hbCkqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGYWNlUGF0dGVybjQgPSAvXmZcXHMrKCgoW1xcZF17MSx9XFwvXFwvW1xcZF17MSx9W1xcc10/KXszLH0pKykvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBmaWZ0aCBraW5kIG9mIGZhY2UgKGYgLXZlcnRleC8tdXZzLy1ub3JtYWwgLXZlcnRleC8tdXZzLy1ub3JtYWwgLXZlcnRleC8tdXZzLy1ub3JtYWwpICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEZhY2VQYXR0ZXJuNSA9IC9eZlxccysoKCgtW1xcZF17MSx9XFwvLVtcXGRdezEsfVxcLy1bXFxkXXsxLH1bXFxzXT8pezMsfSkrKS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIGxpbmUobCB2ZXJ0ZXggdmVydGV4KSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMaW5lUGF0dGVybjEgPSAvXmxcXHMrKChbXFxkXXsxLH1bXFxzXT8pezIsfSkrLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgc2Vjb25kIGtpbmQgb2YgbGluZSAobCB2ZXJ0ZXgvdXZzIHZlcnRleC91dnMpICovXHJcbiAgICBwdWJsaWMgc3RhdGljIExpbmVQYXR0ZXJuMiA9IC9ebFxccysoKChbXFxkXXsxLH1cXC9bXFxkXXsxLH1bXFxzXT8pezIsfSkrKS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIHRoaXJkIGtpbmQgb2YgbGluZSAobCB2ZXJ0ZXgvdXZzL25vcm1hbCB2ZXJ0ZXgvdXZzL25vcm1hbCkgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTGluZVBhdHRlcm4zID0gL15sXFxzKygoKFtcXGRdezEsfVxcL1tcXGRdezEsfVxcL1tcXGRdezEsfVtcXHNdPyl7Mix9KSspLztcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkaW5nT3B0aW9uczogT0JKTG9hZGluZ09wdGlvbnM7XHJcbiAgICBwcml2YXRlIF9wb3NpdGlvbnM6IEFycmF5PFZlY3RvcjM+ID0gW107IC8vdmFsdWVzIGZvciB0aGUgcG9zaXRpb25zIG9mIHZlcnRpY2VzXHJcbiAgICBwcml2YXRlIF9ub3JtYWxzOiBBcnJheTxWZWN0b3IzPiA9IFtdOyAvL1ZhbHVlcyBmb3IgdGhlIG5vcm1hbHNcclxuICAgIHByaXZhdGUgX3V2czogQXJyYXk8VmVjdG9yMj4gPSBbXTsgLy9WYWx1ZXMgZm9yIHRoZSB0ZXh0dXJlc1xyXG4gICAgcHJpdmF0ZSBfY29sb3JzOiBBcnJheTxDb2xvcjQ+ID0gW107XHJcbiAgICBwcml2YXRlIF9tZXNoZXNGcm9tT2JqOiBBcnJheTxNZXNoT2JqZWN0PiA9IFtdOyAvL1ttZXNoXSBDb250YWlucyBhbGwgdGhlIG9iaiBtZXNoZXNcclxuICAgIHByaXZhdGUgX2hhbmRsZWRNZXNoOiBNZXNoT2JqZWN0OyAvL1RoZSBjdXJyZW50IG1lc2ggb2YgbWVzaGVzIGFycmF5XHJcbiAgICBwcml2YXRlIF9pbmRpY2VzRm9yQmFieWxvbjogQXJyYXk8bnVtYmVyPiA9IFtdOyAvL1RoZSBsaXN0IG9mIGluZGljZXMgZm9yIFZlcnRleERhdGFcclxuICAgIHByaXZhdGUgX3dyYXBwZWRQb3NpdGlvbkZvckJhYnlsb246IEFycmF5PFZlY3RvcjM+ID0gW107IC8vVGhlIGxpc3Qgb2YgcG9zaXRpb24gaW4gdmVjdG9yc1xyXG4gICAgcHJpdmF0ZSBfd3JhcHBlZFV2c0ZvckJhYnlsb246IEFycmF5PFZlY3RvcjI+ID0gW107IC8vQXJyYXkgd2l0aCBhbGwgdmFsdWUgb2YgdXZzIHRvIG1hdGNoIHdpdGggdGhlIGluZGljZXNcclxuICAgIHByaXZhdGUgX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uOiBBcnJheTxDb2xvcjQ+ID0gW107IC8vIEFycmF5IHdpdGggYWxsIGNvbG9yIHZhbHVlcyB0byBtYXRjaCB3aXRoIHRoZSBpbmRpY2VzXHJcbiAgICBwcml2YXRlIF93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb246IEFycmF5PFZlY3RvcjM+ID0gW107IC8vQXJyYXkgd2l0aCBhbGwgdmFsdWUgb2Ygbm9ybWFscyB0byBtYXRjaCB3aXRoIHRoZSBpbmRpY2VzXHJcbiAgICBwcml2YXRlIF90dXBsZVBvc05vcm06IEFycmF5PHsgbm9ybWFsczogQXJyYXk8bnVtYmVyPjsgaWR4OiBBcnJheTxudW1iZXI+OyB1djogQXJyYXk8bnVtYmVyPiB9PiA9IFtdOyAvL0NyZWF0ZSBhIHR1cGxlIHdpdGggaW5kaWNlIG9mIFBvc2l0aW9uLCBOb3JtYWwsIFVWICBbcG9zLCBub3JtLCB1dnNdXHJcbiAgICBwcml2YXRlIF9jdXJQb3NpdGlvbkluSW5kaWNlcyA9IDA7XHJcbiAgICBwcml2YXRlIF9oYXNNZXNoZXM6IEJvb2xlYW4gPSBmYWxzZTsgLy9NZXNoZXMgYXJlIGRlZmluZWQgaW4gdGhlIGZpbGVcclxuICAgIHByaXZhdGUgX3Vud3JhcHBlZFBvc2l0aW9uc0ZvckJhYnlsb246IEFycmF5PG51bWJlcj4gPSBbXTsgLy9WYWx1ZSBvZiBwb3NpdGlvbkZvckJhYnlsb24gdy9vIFZlY3RvcjMoKSBbeCx5LHpdXHJcbiAgICBwcml2YXRlIF91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uOiBBcnJheTxudW1iZXI+ID0gW107IC8vIFZhbHVlIG9mIGNvbG9yRm9yQmFieWxvbiB3L28gQ29sb3I0KCkgW3IsZyxiLGFdXHJcbiAgICBwcml2YXRlIF91bndyYXBwZWROb3JtYWxzRm9yQmFieWxvbjogQXJyYXk8bnVtYmVyPiA9IFtdOyAvL1ZhbHVlIG9mIG5vcm1hbHNGb3JCYWJ5bG9uIHcvbyBWZWN0b3IzKCkgIFt4LHksel1cclxuICAgIHByaXZhdGUgX3Vud3JhcHBlZFVWRm9yQmFieWxvbjogQXJyYXk8bnVtYmVyPiA9IFtdOyAvL1ZhbHVlIG9mIHV2c0ZvckJhYnlsb24gdy9vIFZlY3RvcjMoKSAgICAgIFt4LHksel1cclxuICAgIHByaXZhdGUgX3RyaWFuZ2xlczogQXJyYXk8c3RyaW5nPiA9IFtdOyAvL0luZGljZXMgZnJvbSBuZXcgdHJpYW5nbGVzIGNvbWluZyBmcm9tIHBvbHlnb25zXHJcbiAgICBwcml2YXRlIF9tYXRlcmlhbE5hbWVGcm9tT2JqOiBzdHJpbmcgPSBcIlwiOyAvL1RoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICBwcml2YXRlIF9vYmpNZXNoTmFtZTogc3RyaW5nID0gXCJcIjsgLy9UaGUgbmFtZSBvZiB0aGUgY3VycmVudCBvYmogbWVzaFxyXG4gICAgcHJpdmF0ZSBfaW5jcmVtZW50OiBudW1iZXIgPSAxOyAvL0lkIGZvciBtZXNoZXMgY3JlYXRlZCBieSB0aGUgbXVsdGltYXRlcmlhbFxyXG4gICAgcHJpdmF0ZSBfaXNGaXJzdE1hdGVyaWFsOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgX2dyYXlDb2xvciA9IG5ldyBDb2xvcjQoMC41LCAwLjUsIDAuNSwgMSk7XHJcbiAgICBwcml2YXRlIF9tYXRlcmlhbFRvVXNlOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX2JhYnlsb25NZXNoZXNBcnJheTogQXJyYXk8TWVzaD47XHJcbiAgICBwcml2YXRlIF9wdXNoVHJpYW5nbGU6IChmYWNlczogQXJyYXk8c3RyaW5nPiwgZmFjZUluZGV4OiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9oYW5kZWRuZXNzU2lnbjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfaGFzTGluZURhdGE6IGJvb2xlYW4gPSBmYWxzZTsgLy9JZiB0aGlzIG1lc2ggaGFzIGxpbmUgc2VnbWVudChsKSBkYXRhXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFNvbGlkUGFyc2VyXHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWxUb1VzZSBkZWZpbmVzIHRoZSBhcnJheSB0byBmaWxsIHdpdGggdGhlIGxpc3Qgb2YgbWF0ZXJpYWxzIHRvIHVzZSAoaXQgd2lsbCBiZSBmaWxsZWQgYnkgdGhlIHBhcnNlIGZ1bmN0aW9uKVxyXG4gICAgICogQHBhcmFtIGJhYnlsb25NZXNoZXNBcnJheSBkZWZpbmVzIHRoZSBhcnJheSB0byBmaWxsIHdpdGggdGhlIGxpc3Qgb2YgbG9hZGVkIG1lc2hlcyAoaXQgd2lsbCBiZSBmaWxsZWQgYnkgdGhlIHBhcnNlIGZ1bmN0aW9uKVxyXG4gICAgICogQHBhcmFtIGxvYWRpbmdPcHRpb25zIGRlZmluZXMgdGhlIGxvYWRpbmcgb3B0aW9ucyB0byB1c2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG1hdGVyaWFsVG9Vc2U6IHN0cmluZ1tdLCBiYWJ5bG9uTWVzaGVzQXJyYXk6IEFycmF5PE1lc2g+LCBsb2FkaW5nT3B0aW9uczogT0JKTG9hZGluZ09wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9tYXRlcmlhbFRvVXNlID0gbWF0ZXJpYWxUb1VzZTtcclxuICAgICAgICB0aGlzLl9iYWJ5bG9uTWVzaGVzQXJyYXkgPSBiYWJ5bG9uTWVzaGVzQXJyYXk7XHJcbiAgICAgICAgdGhpcy5fbG9hZGluZ09wdGlvbnMgPSBsb2FkaW5nT3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaCBmb3Igb2JqIGluIHRoZSBnaXZlbiBhcnJheS5cclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHRvIGNoZWNrIGlmIGEgY291cGxlIG9mIGRhdGEgYWxyZWFkeSBleGlzdHMgaW4gYW4gYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogSWYgZm91bmQsIHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmb3VuZGVkIHR1cGxlIGluZGV4LiBSZXR1cm5zIC0xIGlmIG5vdCBmb3VuZFxyXG4gICAgICogQHBhcmFtIGFyciBBcnJheTx7IG5vcm1hbHM6IEFycmF5PG51bWJlcj4sIGlkeDogQXJyYXk8bnVtYmVyPiB9PlxyXG4gICAgICogQHBhcmFtIG9iaiBBcnJheTxudW1iZXI+XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfaXNJbkFycmF5KGFycjogQXJyYXk8eyBub3JtYWxzOiBBcnJheTxudW1iZXI+OyBpZHg6IEFycmF5PG51bWJlcj4gfT4sIG9iajogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgICAgIGlmICghYXJyW29ialswXV0pIHtcclxuICAgICAgICAgICAgYXJyW29ialswXV0gPSB7IG5vcm1hbHM6IFtdLCBpZHg6IFtdIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGlkeCA9IGFycltvYmpbMF1dLm5vcm1hbHMuaW5kZXhPZihvYmpbMV0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaWR4ID09PSAtMSA/IC0xIDogYXJyW29ialswXV0uaWR4W2lkeF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNJbkFycmF5VVYoYXJyOiBBcnJheTx7IG5vcm1hbHM6IEFycmF5PG51bWJlcj47IGlkeDogQXJyYXk8bnVtYmVyPjsgdXY6IEFycmF5PG51bWJlcj4gfT4sIG9iajogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgICAgIGlmICghYXJyW29ialswXV0pIHtcclxuICAgICAgICAgICAgYXJyW29ialswXV0gPSB7IG5vcm1hbHM6IFtdLCBpZHg6IFtdLCB1djogW10gfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaWR4ID0gYXJyW29ialswXV0ubm9ybWFscy5pbmRleE9mKG9ialsxXSk7XHJcblxyXG4gICAgICAgIGlmIChpZHggIT0gMSAmJiBvYmpbMl0gPT09IGFycltvYmpbMF1dLnV2W2lkeF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycltvYmpbMF1dLmlkeFtpZHhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldCB0aGUgZGF0YSBmb3IgZWFjaCB0cmlhbmdsZS5cclxuICAgICAqIERhdGEgYXJlIHBvc2l0aW9uLCBub3JtYWxzIGFuZCB1dnNcclxuICAgICAqIElmIGEgdHVwbGUgb2YgKHBvc2l0aW9uLCBub3JtYWwpIGlzIG5vdCBzZXQsIGFkZCB0aGUgZGF0YSBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIGFycmF5XHJcbiAgICAgKiBJZiB0aGUgdHVwbGUgYWxyZWFkeSBleGlzdCwgYWRkIG9ubHkgdGhlaXIgaW5kaWNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGluZGljZVBvc2l0aW9uRnJvbU9iaiBJbnRlZ2VyIFRoZSBpbmRleCBpbiBwb3NpdGlvbnMgYXJyYXlcclxuICAgICAqIEBwYXJhbSBpbmRpY2VVdnNGcm9tT2JqIEludGVnZXIgVGhlIGluZGV4IGluIHV2cyBhcnJheVxyXG4gICAgICogQHBhcmFtIGluZGljZU5vcm1hbEZyb21PYmogSW50ZWdlciBUaGUgaW5kZXggaW4gbm9ybWFscyBhcnJheVxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uVmVjdG9yRnJvbU9CSiBWZWN0b3IzIFRoZSB2YWx1ZSBvZiBwb3NpdGlvbiBhdCBpbmRleCBvYmpJbmRpY2VcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlVmVjdG9yRnJvbU9CSiBWZWN0b3IzIFRoZSB2YWx1ZSBvZiB1dnNcclxuICAgICAqIEBwYXJhbSBub3JtYWxzVmVjdG9yRnJvbU9CSiBWZWN0b3IzIFRoZSB2YWx1ZSBvZiBub3JtYWxzIGF0IGluZGV4IG9iak5vcm1hbGVcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvbkNvbG9yc0Zyb21PQkpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2V0RGF0YShcclxuICAgICAgICBpbmRpY2VQb3NpdGlvbkZyb21PYmo6IG51bWJlcixcclxuICAgICAgICBpbmRpY2VVdnNGcm9tT2JqOiBudW1iZXIsXHJcbiAgICAgICAgaW5kaWNlTm9ybWFsRnJvbU9iajogbnVtYmVyLFxyXG4gICAgICAgIHBvc2l0aW9uVmVjdG9yRnJvbU9CSjogVmVjdG9yMyxcclxuICAgICAgICB0ZXh0dXJlVmVjdG9yRnJvbU9CSjogVmVjdG9yMixcclxuICAgICAgICBub3JtYWxzVmVjdG9yRnJvbU9CSjogVmVjdG9yMyxcclxuICAgICAgICBwb3NpdGlvbkNvbG9yc0Zyb21PQko/OiBDb2xvcjRcclxuICAgICkge1xyXG4gICAgICAgIC8vQ2hlY2sgaWYgdGhpcyB0dXBsZSBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgbGlzdCBvZiB0dXBsZXNcclxuICAgICAgICBsZXQgX2luZGV4OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLm9wdGltaXplV2l0aFVWKSB7XHJcbiAgICAgICAgICAgIF9pbmRleCA9IHRoaXMuX2lzSW5BcnJheVVWKHRoaXMuX3R1cGxlUG9zTm9ybSwgW2luZGljZVBvc2l0aW9uRnJvbU9iaiwgaW5kaWNlTm9ybWFsRnJvbU9iaiwgaW5kaWNlVXZzRnJvbU9ial0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9pbmRleCA9IHRoaXMuX2lzSW5BcnJheSh0aGlzLl90dXBsZVBvc05vcm0sIFtpbmRpY2VQb3NpdGlvbkZyb21PYmosIGluZGljZU5vcm1hbEZyb21PYmpdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vSWYgaXQgbm90IGV4aXN0c1xyXG4gICAgICAgIGlmIChfaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIC8vQWRkIGFuIG5ldyBpbmRpY2UuXHJcbiAgICAgICAgICAgIC8vVGhlIGFycmF5IG9mIGluZGljZXMgaXMgb25seSBhbiBhcnJheSB3aXRoIGhpcyBsZW5ndGggZXF1YWwgdG8gdGhlIG51bWJlciBvZiB0cmlhbmdsZXMgLSAxLlxyXG4gICAgICAgICAgICAvL1dlIGFkZCB2ZXJ0aWNlcyBkYXRhIGluIHRoaXMgb3JkZXJcclxuICAgICAgICAgICAgdGhpcy5faW5kaWNlc0ZvckJhYnlsb24ucHVzaCh0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIC8vUHVzaCB0aGUgcG9zaXRpb24gb2YgdmVydGljZSBmb3IgQmFieWxvblxyXG4gICAgICAgICAgICAvL0VhY2ggZWxlbWVudCBpcyBhIFZlY3RvcjMoeCx5LHopXHJcbiAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRQb3NpdGlvbkZvckJhYnlsb24ucHVzaChwb3NpdGlvblZlY3RvckZyb21PQkopO1xyXG4gICAgICAgICAgICAvL1B1c2ggdGhlIHV2cyBmb3IgQmFieWxvblxyXG4gICAgICAgICAgICAvL0VhY2ggZWxlbWVudCBpcyBhIFZlY3RvcjModSx2KVxyXG4gICAgICAgICAgICB0aGlzLl93cmFwcGVkVXZzRm9yQmFieWxvbi5wdXNoKHRleHR1cmVWZWN0b3JGcm9tT0JKKTtcclxuICAgICAgICAgICAgLy9QdXNoIHRoZSBub3JtYWxzIGZvciBCYWJ5bG9uXHJcbiAgICAgICAgICAgIC8vRWFjaCBlbGVtZW50IGlzIGEgVmVjdG9yMyh4LHkseilcclxuICAgICAgICAgICAgdGhpcy5fd3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uLnB1c2gobm9ybWFsc1ZlY3RvckZyb21PQkopO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uQ29sb3JzRnJvbU9CSiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvL1B1c2ggdGhlIGNvbG9ycyBmb3IgQmFieWxvblxyXG4gICAgICAgICAgICAgICAgLy9FYWNoIGVsZW1lbnQgaXMgYSBCQUJZTE9OLkNvbG9yNChyLGcsYixhKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZENvbG9yc0ZvckJhYnlsb24ucHVzaChwb3NpdGlvbkNvbG9yc0Zyb21PQkopO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0FkZCB0aGUgdHVwbGUgaW4gdGhlIGNvbXBhcmlzb24gbGlzdFxyXG4gICAgICAgICAgICB0aGlzLl90dXBsZVBvc05vcm1baW5kaWNlUG9zaXRpb25Gcm9tT2JqXS5ub3JtYWxzLnB1c2goaW5kaWNlTm9ybWFsRnJvbU9iaik7XHJcbiAgICAgICAgICAgIHRoaXMuX3R1cGxlUG9zTm9ybVtpbmRpY2VQb3NpdGlvbkZyb21PYmpdLmlkeC5wdXNoKHRoaXMuX2N1clBvc2l0aW9uSW5JbmRpY2VzKyspO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMub3B0aW1pemVXaXRoVVYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3R1cGxlUG9zTm9ybVtpbmRpY2VQb3NpdGlvbkZyb21PYmpdLnV2LnB1c2goaW5kaWNlVXZzRnJvbU9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL1RoZSB0dXBsZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICAgICAgICAvL0FkZCB0aGUgaW5kZXggb2YgdGhlIGFscmVhZHkgZXhpc3RpbmcgdHVwbGVcclxuICAgICAgICAgICAgLy9BdCB0aGlzIGluZGV4IHdlIGNhbiBnZXQgdGhlIHZhbHVlIG9mIHBvc2l0aW9uLCBub3JtYWwsIGNvbG9yIGFuZCB1dnMgb2YgdmVydGV4XHJcbiAgICAgICAgICAgIHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLnB1c2goX2luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2Zvcm0gVmVjdG9yKCkgYW5kIEJBQllMT04uQ29sb3IoKSBvYmplY3RzIGludG8gbnVtYmVycyBpbiBhbiBhcnJheVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF91bndyYXBEYXRhKCkge1xyXG4gICAgICAgIC8vRXZlcnkgYXJyYXkgaGFzIHRoZSBzYW1lIGxlbmd0aFxyXG4gICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbi5sZW5ndGg7IGwrKykge1xyXG4gICAgICAgICAgICAvL1B1c2ggdGhlIHgsIHksIHogdmFsdWVzIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgdW53cmFwcGVkIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZFBvc2l0aW9uc0ZvckJhYnlsb24ucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRQb3NpdGlvbkZvckJhYnlsb25bbF0ueCAqIHRoaXMuX2hhbmRlZG5lc3NTaWduLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbltsXS55LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbltsXS56XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb25bbF0ueCAqIHRoaXMuX2hhbmRlZG5lc3NTaWduLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uW2xdLnksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb25bbF0uelxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb24ucHVzaCh0aGlzLl93cmFwcGVkVXZzRm9yQmFieWxvbltsXS54LCB0aGlzLl93cmFwcGVkVXZzRm9yQmFieWxvbltsXS55KTsgLy96IGlzIGFuIG9wdGlvbmFsIHZhbHVlIG5vdCBzdXBwb3J0ZWQgYnkgQkFCWUxPTlxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAvL1B1c2ggdGhlIHIsIGcsIGIsIGEgdmFsdWVzIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgdW53cmFwcGVkIGFycmF5XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZENvbG9yc0ZvckJhYnlsb25bbF0ucixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkQ29sb3JzRm9yQmFieWxvbltsXS5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uW2xdLmIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZENvbG9yc0ZvckJhYnlsb25bbF0uYVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZXNldCBhcnJheXMgZm9yIHRoZSBuZXh0IG5ldyBtZXNoZXNcclxuICAgICAgICB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fd3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fd3JhcHBlZFV2c0ZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl93cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX3R1cGxlUG9zTm9ybS5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2N1clBvc2l0aW9uSW5JbmRpY2VzID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0cmlhbmdsZXMgZnJvbSBwb2x5Z29uc1xyXG4gICAgICogSXQgaXMgaW1wb3J0YW50IHRvIG5vdGljZSB0aGF0IGEgdHJpYW5nbGUgaXMgYSBwb2x5Z29uXHJcbiAgICAgKiBXZSBnZXQgNSBwYXR0ZXJucyBvZiBmYWNlIGRlZmluZWQgaW4gT0JKIEZpbGUgOlxyXG4gICAgICogZmFjZVBhdHRlcm4xID0gW1wiMVwiLFwiMlwiLFwiM1wiLFwiNFwiLFwiNVwiLFwiNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm4yID0gW1wiMS8xXCIsXCIyLzJcIixcIjMvM1wiLFwiNC80XCIsXCI1LzVcIixcIjYvNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm4zID0gW1wiMS8xLzFcIixcIjIvMi8yXCIsXCIzLzMvM1wiLFwiNC80LzRcIixcIjUvNS81XCIsXCI2LzYvNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm40ID0gW1wiMS8vMVwiLFwiMi8vMlwiLFwiMy8vM1wiLFwiNC8vNFwiLFwiNS8vNVwiLFwiNi8vNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm41ID0gW1wiLTEvLTEvLTFcIixcIi0yLy0yLy0yXCIsXCItMy8tMy8tM1wiLFwiLTQvLTQvLTRcIixcIi01Ly01Ly01XCIsXCItNi8tNi8tNlwiXVxyXG4gICAgICogRWFjaCBwYXR0ZXJuIGlzIGRpdmlkZWQgYnkgdGhlIHNhbWUgbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0gZmFjZXMgQXJyYXlbU3RyaW5nXSBUaGUgaW5kaWNlcyBvZiBlbGVtZW50c1xyXG4gICAgICogQHBhcmFtIHYgSW50ZWdlciBUaGUgdmFyaWFibGUgdG8gaW5jcmVtZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldFRyaWFuZ2xlcyhmYWNlczogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9Xb3JrIGZvciBlYWNoIGVsZW1lbnQgb2YgdGhlIGFycmF5XHJcbiAgICAgICAgZm9yIChsZXQgZmFjZUluZGV4ID0gdjsgZmFjZUluZGV4IDwgZmFjZXMubGVuZ3RoIC0gMTsgZmFjZUluZGV4KyspIHtcclxuICAgICAgICAgICAgLy9BZGQgb24gdGhlIHRyaWFuZ2xlIHZhcmlhYmxlIHRoZSBpbmRleGVzIHRvIG9idGFpbiB0cmlhbmdsZXNcclxuICAgICAgICAgICAgdGhpcy5fcHVzaFRyaWFuZ2xlKGZhY2VzLCBmYWNlSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9SZXN1bHQgb2J0YWluZWQgYWZ0ZXIgMiBpdGVyYXRpb25zOlxyXG4gICAgICAgIC8vUGF0dGVybjEgPT4gdHJpYW5nbGUgPSBbXCIxXCIsXCIyXCIsXCIzXCIsXCIxXCIsXCIzXCIsXCI0XCJdO1xyXG4gICAgICAgIC8vUGF0dGVybjIgPT4gdHJpYW5nbGUgPSBbXCIxLzFcIixcIjIvMlwiLFwiMy8zXCIsXCIxLzFcIixcIjMvM1wiLFwiNC80XCJdO1xyXG4gICAgICAgIC8vUGF0dGVybjMgPT4gdHJpYW5nbGUgPSBbXCIxLzEvMVwiLFwiMi8yLzJcIixcIjMvMy8zXCIsXCIxLzEvMVwiLFwiMy8zLzNcIixcIjQvNC80XCJdO1xyXG4gICAgICAgIC8vUGF0dGVybjQgPT4gdHJpYW5nbGUgPSBbXCIxLy8xXCIsXCIyLy8yXCIsXCIzLy8zXCIsXCIxLy8xXCIsXCIzLy8zXCIsXCI0Ly80XCJdO1xyXG4gICAgICAgIC8vUGF0dGVybjUgPT4gdHJpYW5nbGUgPSBbXCItMS8tMS8tMVwiLFwiLTIvLTIvLTJcIixcIi0zLy0zLy0zXCIsXCItMS8tMS8tMVwiLFwiLTMvLTMvLTNcIixcIi00Ly00Ly00XCJdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRyaWFuZ2xlcyBhbmQgcHVzaCB0aGUgZGF0YSBmb3IgZWFjaCBwb2x5Z29uIGZvciB0aGUgcGF0dGVybiAxXHJcbiAgICAgKiBJbiB0aGlzIHBhdHRlcm4gd2UgZ2V0IHZlcnRpY2UgcG9zaXRpb25zXHJcbiAgICAgKiBAcGFyYW0gZmFjZVxyXG4gICAgICogQHBhcmFtIHZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4xKGZhY2U6IEFycmF5PHN0cmluZz4sIHY6IG51bWJlcikge1xyXG4gICAgICAgIC8vR2V0IHRoZSBpbmRpY2VzIG9mIHRyaWFuZ2xlcyBmb3IgZWFjaCBwb2x5Z29uXHJcbiAgICAgICAgdGhpcy5fZ2V0VHJpYW5nbGVzKGZhY2UsIHYpO1xyXG4gICAgICAgIC8vRm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgdHJpYW5nbGVzIGFycmF5LlxyXG4gICAgICAgIC8vVGhpcyB2YXIgY291bGQgY29udGFpbnMgMSB0byBhbiBpbmZpbml0eSBvZiB0cmlhbmdsZXNcclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAvLyBTZXQgcG9zaXRpb24gaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVBvc2l0aW9uRnJvbU9iaiA9IHBhcnNlSW50KHRoaXMuX3RyaWFuZ2xlc1trXSkgLSAxO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2V0RGF0YShcclxuICAgICAgICAgICAgICAgIGluZGljZVBvc2l0aW9uRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAvLyBJbiB0aGUgcGF0dGVybiAxLCBub3JtYWxzIGFuZCB1dnMgYXJlIG5vdCBkZWZpbmVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3NpdGlvbnNbaW5kaWNlUG9zaXRpb25Gcm9tT2JqXSwgLy8gR2V0IHRoZSB2ZWN0b3JzIGRhdGFcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIuWmVybygpLFxyXG4gICAgICAgICAgICAgICAgVmVjdG9yMy5VcCgpLCAvLyBDcmVhdGUgZGVmYXVsdCB2ZWN0b3JzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMgPyB0aGlzLl9jb2xvcnNbaW5kaWNlUG9zaXRpb25Gcm9tT2JqXSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1Jlc2V0IHZhcmlhYmxlIGZvciB0aGUgbmV4dCBsaW5lXHJcbiAgICAgICAgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdHJpYW5nbGVzIGFuZCBwdXNoIHRoZSBkYXRhIGZvciBlYWNoIHBvbHlnb24gZm9yIHRoZSBwYXR0ZXJuIDJcclxuICAgICAqIEluIHRoaXMgcGF0dGVybiB3ZSBnZXQgdmVydGljZSBwb3NpdGlvbnMgYW5kIHV2c1xyXG4gICAgICogQHBhcmFtIGZhY2VcclxuICAgICAqIEBwYXJhbSB2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMihmYWNlOiBBcnJheTxzdHJpbmc+LCB2OiBudW1iZXIpIHtcclxuICAgICAgICAvL0dldCB0aGUgaW5kaWNlcyBvZiB0cmlhbmdsZXMgZm9yIGVhY2ggcG9seWdvblxyXG4gICAgICAgIHRoaXMuX2dldFRyaWFuZ2xlcyhmYWNlLCB2KTtcclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAvL3RyaWFuZ2xlW2tdID0gXCIxLzFcIlxyXG4gICAgICAgICAgICAvL1NwbGl0IHRoZSBkYXRhIGZvciBnZXR0aW5nIHBvc2l0aW9uIGFuZCB1dlxyXG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IHRoaXMuX3RyaWFuZ2xlc1trXS5zcGxpdChcIi9cIik7IC8vIFtcIjFcIiwgXCIxXCJdXHJcbiAgICAgICAgICAgIC8vU2V0IHBvc2l0aW9uIGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VQb3NpdGlvbkZyb21PYmogPSBwYXJzZUludChwb2ludFswXSkgLSAxO1xyXG4gICAgICAgICAgICAvL1NldCB1diBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlVXZzRnJvbU9iaiA9IHBhcnNlSW50KHBvaW50WzFdKSAtIDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zZXREYXRhKFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlUG9zaXRpb25Gcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlVXZzRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIDAsIC8vRGVmYXVsdCB2YWx1ZSBmb3Igbm9ybWFsc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25zW2luZGljZVBvc2l0aW9uRnJvbU9ial0sIC8vR2V0IHRoZSB2YWx1ZXMgZm9yIGVhY2ggZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXZzW2luZGljZVV2c0Zyb21PYmpdLFxyXG4gICAgICAgICAgICAgICAgVmVjdG9yMy5VcCgpLCAvL0RlZmF1bHQgdmFsdWUgZm9yIG5vcm1hbHNcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycyA/IHRoaXMuX2NvbG9yc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1Jlc2V0IHZhcmlhYmxlIGZvciB0aGUgbmV4dCBsaW5lXHJcbiAgICAgICAgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdHJpYW5nbGVzIGFuZCBwdXNoIHRoZSBkYXRhIGZvciBlYWNoIHBvbHlnb24gZm9yIHRoZSBwYXR0ZXJuIDNcclxuICAgICAqIEluIHRoaXMgcGF0dGVybiB3ZSBnZXQgdmVydGljZSBwb3NpdGlvbnMsIHV2cyBhbmQgbm9ybWFsc1xyXG4gICAgICogQHBhcmFtIGZhY2VcclxuICAgICAqIEBwYXJhbSB2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMyhmYWNlOiBBcnJheTxzdHJpbmc+LCB2OiBudW1iZXIpIHtcclxuICAgICAgICAvL0dldCB0aGUgaW5kaWNlcyBvZiB0cmlhbmdsZXMgZm9yIGVhY2ggcG9seWdvblxyXG4gICAgICAgIHRoaXMuX2dldFRyaWFuZ2xlcyhmYWNlLCB2KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLl90cmlhbmdsZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgLy90cmlhbmdsZVtrXSA9IFwiMS8xLzFcIlxyXG4gICAgICAgICAgICAvL1NwbGl0IHRoZSBkYXRhIGZvciBnZXR0aW5nIHBvc2l0aW9uLCB1diwgYW5kIG5vcm1hbHNcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLl90cmlhbmdsZXNba10uc3BsaXQoXCIvXCIpOyAvLyBbXCIxXCIsIFwiMVwiLCBcIjFcIl1cclxuICAgICAgICAgICAgLy8gU2V0IHBvc2l0aW9uIGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VQb3NpdGlvbkZyb21PYmogPSBwYXJzZUludChwb2ludFswXSkgLSAxO1xyXG4gICAgICAgICAgICAvLyBTZXQgdXYgaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVV2c0Zyb21PYmogPSBwYXJzZUludChwb2ludFsxXSkgLSAxO1xyXG4gICAgICAgICAgICAvLyBTZXQgbm9ybWFsIGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VOb3JtYWxGcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMl0pIC0gMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NldERhdGEoXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VQb3NpdGlvbkZyb21PYmosXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VVdnNGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlTm9ybWFsRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXZzW2luZGljZVV2c0Zyb21PYmpdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9ybWFsc1tpbmRpY2VOb3JtYWxGcm9tT2JqXSAvL1NldCB0aGUgdmVjdG9yIGZvciBlYWNoIGNvbXBvbmVudFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1Jlc2V0IHZhcmlhYmxlIGZvciB0aGUgbmV4dCBsaW5lXHJcbiAgICAgICAgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdHJpYW5nbGVzIGFuZCBwdXNoIHRoZSBkYXRhIGZvciBlYWNoIHBvbHlnb24gZm9yIHRoZSBwYXR0ZXJuIDRcclxuICAgICAqIEluIHRoaXMgcGF0dGVybiB3ZSBnZXQgdmVydGljZSBwb3NpdGlvbnMgYW5kIG5vcm1hbHNcclxuICAgICAqIEBwYXJhbSBmYWNlXHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjQoZmFjZTogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZ2V0VHJpYW5nbGVzKGZhY2UsIHYpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAvL3RyaWFuZ2xlW2tdID0gXCIxLy8xXCJcclxuICAgICAgICAgICAgLy9TcGxpdCB0aGUgZGF0YSBmb3IgZ2V0dGluZyBwb3NpdGlvbiBhbmQgbm9ybWFsc1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IHRoaXMuX3RyaWFuZ2xlc1trXS5zcGxpdChcIi8vXCIpOyAvLyBbXCIxXCIsIFwiMVwiXVxyXG4gICAgICAgICAgICAvLyBXZSBjaGVjayBpbmRpY2VzLCBhbmQgbm9ybWFsc1xyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VQb3NpdGlvbkZyb21PYmogPSBwYXJzZUludChwb2ludFswXSkgLSAxO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VOb3JtYWxGcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMV0pIC0gMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NldERhdGEoXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VQb3NpdGlvbkZyb21PYmosXHJcbiAgICAgICAgICAgICAgICAxLCAvL0RlZmF1bHQgdmFsdWUgZm9yIHV2XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VOb3JtYWxGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25zW2luZGljZVBvc2l0aW9uRnJvbU9ial0sIC8vR2V0IGVhY2ggdmVjdG9yIG9mIGRhdGFcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIuWmVybygpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9ybWFsc1tpbmRpY2VOb3JtYWxGcm9tT2JqXSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycyA/IHRoaXMuX2NvbG9yc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUmVzZXQgdmFyaWFibGUgZm9yIHRoZSBuZXh0IGxpbmVcclxuICAgICAgICB0aGlzLl90cmlhbmdsZXMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogQ3JlYXRlIHRyaWFuZ2xlcyBhbmQgcHVzaCB0aGUgZGF0YSBmb3IgZWFjaCBwb2x5Z29uIGZvciB0aGUgcGF0dGVybiAzXHJcbiAgICAgKiBJbiB0aGlzIHBhdHRlcm4gd2UgZ2V0IHZlcnRpY2UgcG9zaXRpb25zLCB1dnMgYW5kIG5vcm1hbHNcclxuICAgICAqIEBwYXJhbSBmYWNlXHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjUoZmFjZTogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9HZXQgdGhlIGluZGljZXMgb2YgdHJpYW5nbGVzIGZvciBlYWNoIHBvbHlnb25cclxuICAgICAgICB0aGlzLl9nZXRUcmlhbmdsZXMoZmFjZSwgdik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIC8vdHJpYW5nbGVba10gPSBcIi0xLy0xLy0xXCJcclxuICAgICAgICAgICAgLy9TcGxpdCB0aGUgZGF0YSBmb3IgZ2V0dGluZyBwb3NpdGlvbiwgdXYsIGFuZCBub3JtYWxzXHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5fdHJpYW5nbGVzW2tdLnNwbGl0KFwiL1wiKTsgLy8gW1wiLTFcIiwgXCItMVwiLCBcIi0xXCJdXHJcbiAgICAgICAgICAgIC8vIFNldCBwb3NpdGlvbiBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlUG9zaXRpb25Gcm9tT2JqID0gdGhpcy5fcG9zaXRpb25zLmxlbmd0aCArIHBhcnNlSW50KHBvaW50WzBdKTtcclxuICAgICAgICAgICAgLy8gU2V0IHV2IGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VVdnNGcm9tT2JqID0gdGhpcy5fdXZzLmxlbmd0aCArIHBhcnNlSW50KHBvaW50WzFdKTtcclxuICAgICAgICAgICAgLy8gU2V0IG5vcm1hbCBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlTm9ybWFsRnJvbU9iaiA9IHRoaXMuX25vcm1hbHMubGVuZ3RoICsgcGFyc2VJbnQocG9pbnRbMl0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2V0RGF0YShcclxuICAgICAgICAgICAgICAgIGluZGljZVBvc2l0aW9uRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIGluZGljZVV2c0Zyb21PYmosXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VOb3JtYWxGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25zW2luZGljZVBvc2l0aW9uRnJvbU9ial0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91dnNbaW5kaWNlVXZzRnJvbU9ial0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3JtYWxzW2luZGljZU5vcm1hbEZyb21PYmpdLCAvL1NldCB0aGUgdmVjdG9yIGZvciBlYWNoIGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzID8gdGhpcy5fY29sb3JzW2luZGljZVBvc2l0aW9uRnJvbU9ial0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SZXNldCB2YXJpYWJsZSBmb3IgdGhlIG5leHQgbGluZVxyXG4gICAgICAgIHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2FkZFByZXZpb3VzT2JqTWVzaCgpIHtcclxuICAgICAgICAvL0NoZWNrIGlmIGl0IGlzIG5vdCB0aGUgZmlyc3QgbWVzaC4gT3RoZXJ3aXNlIHdlIGRvbid0IGhhdmUgZGF0YS5cclxuICAgICAgICBpZiAodGhpcy5fbWVzaGVzRnJvbU9iai5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vR2V0IHRoZSBwcmV2aW91cyBtZXNoIGZvciBhcHBseWluZyB0aGUgZGF0YSBhYm91dCB0aGUgZmFjZXNcclxuICAgICAgICAgICAgLy89PiBpbiBvYmogZmlsZSwgZmFjZXMgZGVmaW5pdGlvbiBhcHBlbmQgYWZ0ZXIgdGhlIG5hbWUgb2YgdGhlIG1lc2hcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2ggPSB0aGlzLl9tZXNoZXNGcm9tT2JqW3RoaXMuX21lc2hlc0Zyb21PYmoubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBpbnRvIEFycmF5IGZvciB0aGUgbWVzaFxyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBEYXRhKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMudXNlTGVnYWN5QmVoYXZpb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldmVyc2UgdGFiLiBPdGhlcndpc2UgZmFjZSBhcmUgZGlzcGxheWVkIGluIHRoZSB3cm9uZyBzZW5zXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBpbmZvcm1hdGlvbiBmb3IgdGhlIG1lc2hcclxuICAgICAgICAgICAgLy9TbGljZSB0aGUgYXJyYXkgdG8gYXZvaWQgcmV3cml0aW5nIGJlY2F1c2Ugb2YgdGhlIGZhY3QgdGhpcyBpcyB0aGUgc2FtZSB2YXIgd2hpY2ggYmUgcmV3cml0ZWRcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2guaW5kaWNlcyA9IHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLnBvc2l0aW9ucyA9IHRoaXMuX3Vud3JhcHBlZFBvc2l0aW9uc0ZvckJhYnlsb24uc2xpY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2gubm9ybWFscyA9IHRoaXMuX3Vud3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLnV2cyA9IHRoaXMuX3Vud3JhcHBlZFVWRm9yQmFieWxvbi5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5oYXNMaW5lcyA9IHRoaXMuX2hhc0xpbmVEYXRhO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2guY29sb3JzID0gdGhpcy5fdW53cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5zbGljZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1Jlc2V0IHRoZSBhcnJheSBmb3IgdGhlIG5leHQgbWVzaFxyXG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZENvbG9yc0ZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkVVZGb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhc0xpbmVEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29wdGltaXplTm9ybWFscyhtZXNoOiBBYnN0cmFjdE1lc2gpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBtZXNoLmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kKTtcclxuICAgICAgICBjb25zdCBub3JtYWxzID0gbWVzaC5nZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQpO1xyXG4gICAgICAgIGNvbnN0IG1hcFZlcnRpY2VzOiB7IFtrZXk6IHN0cmluZ106IG51bWJlcltdIH0gPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKCFwb3NpdGlvbnMgfHwgIW5vcm1hbHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoIC8gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHggPSBwb3NpdGlvbnNbaSAqIDMgKyAwXTtcclxuICAgICAgICAgICAgY29uc3QgeSA9IHBvc2l0aW9uc1tpICogMyArIDFdO1xyXG4gICAgICAgICAgICBjb25zdCB6ID0gcG9zaXRpb25zW2kgKiAzICsgMl07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHggKyBcIl9cIiArIHkgKyBcIl9cIiArIHo7XHJcblxyXG4gICAgICAgICAgICBsZXQgbHN0ID0gbWFwVmVydGljZXNba2V5XTtcclxuICAgICAgICAgICAgaWYgKCFsc3QpIHtcclxuICAgICAgICAgICAgICAgIGxzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbWFwVmVydGljZXNba2V5XSA9IGxzdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsc3QucHVzaChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IG5ldyBWZWN0b3IzKCk7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbWFwVmVydGljZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbHN0ID0gbWFwVmVydGljZXNba2V5XTtcclxuICAgICAgICAgICAgaWYgKGxzdC5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdjBJZHggPSBsc3RbMF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbHN0Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2SWR4ID0gbHN0W2ldO1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsc1t2MElkeCAqIDMgKyAwXSArPSBub3JtYWxzW3ZJZHggKiAzICsgMF07XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW3YwSWR4ICogMyArIDFdICs9IG5vcm1hbHNbdklkeCAqIDMgKyAxXTtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHNbdjBJZHggKiAzICsgMl0gKz0gbm9ybWFsc1t2SWR4ICogMyArIDJdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub3JtYWwuY29weUZyb21GbG9hdHMobm9ybWFsc1t2MElkeCAqIDMgKyAwXSwgbm9ybWFsc1t2MElkeCAqIDMgKyAxXSwgbm9ybWFsc1t2MElkeCAqIDMgKyAyXSk7XHJcbiAgICAgICAgICAgIG5vcm1hbC5ub3JtYWxpemUoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbHN0Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2SWR4ID0gbHN0W2ldO1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsc1t2SWR4ICogMyArIDBdID0gbm9ybWFsLng7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW3ZJZHggKiAzICsgMV0gPSBub3JtYWwueTtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHNbdklkeCAqIDMgKyAyXSA9IG5vcm1hbC56O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc2guc2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kLCBub3JtYWxzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gcGFyc2UgYW4gT0JKIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIG1lc2hlc05hbWVzIGRlZmluZXMgdGhlIGxpc3Qgb2YgbWVzaGVzIHRvIGxvYWQgKGFsbCBpZiBub3QgZGVmaW5lZClcclxuICAgICAqIEBwYXJhbSBkYXRhIGRlZmluZXMgdGhlIE9CSiBzdHJpbmdcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBob3N0aW5nIHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gYXNzZXRDb250YWluZXIgZGVmaW5lcyB0aGUgYXNzZXQgY29udGFpbmVyIHRvIGxvYWQgZGF0YSBpblxyXG4gICAgICogQHBhcmFtIG9uRmlsZVRvTG9hZEZvdW5kIGRlZmluZXMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIGlmIGEgTVRMIGZpbGUgaXMgZm91bmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBhcnNlKG1lc2hlc05hbWVzOiBhbnksIGRhdGE6IHN0cmluZywgc2NlbmU6IFNjZW5lLCBhc3NldENvbnRhaW5lcjogTnVsbGFibGU8QXNzZXRDb250YWluZXI+LCBvbkZpbGVUb0xvYWRGb3VuZDogKGZpbGVUb0xvYWQ6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy51c2VMZWdhY3lCZWhhdmlvcikge1xyXG4gICAgICAgICAgICB0aGlzLl9wdXNoVHJpYW5nbGUgPSAoZmFjZXMsIGZhY2VJbmRleCkgPT4gdGhpcy5fdHJpYW5nbGVzLnB1c2goZmFjZXNbMF0sIGZhY2VzW2ZhY2VJbmRleF0sIGZhY2VzW2ZhY2VJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGVkbmVzc1NpZ24gPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2NlbmUudXNlUmlnaHRIYW5kZWRTeXN0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fcHVzaFRyaWFuZ2xlID0gKGZhY2VzLCBmYWNlSW5kZXgpID0+IHRoaXMuX3RyaWFuZ2xlcy5wdXNoKGZhY2VzWzBdLCBmYWNlc1tmYWNlSW5kZXggKyAxXSwgZmFjZXNbZmFjZUluZGV4XSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRlZG5lc3NTaWduID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9wdXNoVHJpYW5nbGUgPSAoZmFjZXMsIGZhY2VJbmRleCkgPT4gdGhpcy5fdHJpYW5nbGVzLnB1c2goZmFjZXNbMF0sIGZhY2VzW2ZhY2VJbmRleF0sIGZhY2VzW2ZhY2VJbmRleCArIDFdKTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGVkbmVzc1NpZ24gPSAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNwbGl0IHRoZSBmaWxlIGludG8gbGluZXNcclxuICAgICAgICBjb25zdCBsaW5lcyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XHJcbiAgICAgICAgLy8gTG9vayBhdCBlYWNoIGxpbmVcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBsaW5lc1tpXS50cmltKCkucmVwbGFjZSgvXFxzXFxzL2csIFwiIFwiKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgIC8vIENvbW1lbnQgb3IgbmV3TGluZVxyXG4gICAgICAgICAgICBpZiAobGluZS5sZW5ndGggPT09IDAgfHwgbGluZS5jaGFyQXQoMCkgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0dldCBpbmZvcm1hdGlvbiBhYm91dCBvbmUgcG9zaXRpb24gcG9zc2libGUgZm9yIHRoZSB2ZXJ0aWNlc1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFNvbGlkUGFyc2VyLlZlcnRleFBhdHRlcm4udGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbGluZS5tYXRjaCgvW14gXSsvZykhOyAvLyBtYXRjaCB3aWxsIHJldHVybiBub24tbnVsbCBkdWUgdG8gcGFzc2luZyByZWdleCBwYXR0ZXJuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVmFsdWUgb2YgcmVzdWx0IHdpdGggbGluZTogXCJ2IDEuMCAyLjAgMy4wXCJcclxuICAgICAgICAgICAgICAgIC8vIFtcInZcIiwgXCIxLjBcIiwgXCIyLjBcIiwgXCIzLjBcIl1cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIFZlY3RvcjMgd2l0aCB0aGUgcG9zaXRpb24geCwgeSwgelxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25zLnB1c2gobmV3IFZlY3RvcjMocGFyc2VGbG9hdChyZXN1bHRbMV0pLCBwYXJzZUZsb2F0KHJlc3VsdFsyXSksIHBhcnNlRmxvYXQocmVzdWx0WzNdKSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHIgPSBwYXJzZUZsb2F0KHJlc3VsdFs0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGcgPSBwYXJzZUZsb2F0KHJlc3VsdFs1XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSBwYXJzZUZsb2F0KHJlc3VsdFs2XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xvcnMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBDb2xvcjQociA+IDEgPyByIC8gMjU1IDogciwgZyA+IDEgPyBnIC8gMjU1IDogZywgYiA+IDEgPyBiIC8gMjU1IDogYiwgcmVzdWx0Lmxlbmd0aCA9PT0gNyB8fCByZXN1bHRbN10gPT09IHVuZGVmaW5lZCA/IDEgOiBwYXJzZUZsb2F0KHJlc3VsdFs3XSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbWF5YmUgcHVzaCBOVUxMIGFuZCBpZiBhbGwgYXJlIE5VTEwgdG8gc2tpcCAoYW5kIHJlbW92ZSBncmF5Q29sb3IgdmFyKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29sb3JzLnB1c2godGhpcy5fZ3JheUNvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLk5vcm1hbFBhdHRlcm4uZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgVmVjdG9yMyB3aXRoIHRoZSBub3JtYWxzIHgsIHksIHpcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAvLyBbXCJ2biAxLjAgMi4wIDMuMFwiLCBcIjEuMFwiLCBcIjIuMFwiLCBcIjMuMFwiXVxyXG4gICAgICAgICAgICAgICAgLy9BZGQgdGhlIFZlY3RvciBpbiB0aGUgbGlzdCBvZiBub3JtYWxzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3JtYWxzLnB1c2gobmV3IFZlY3RvcjMocGFyc2VGbG9hdChyZXN1bHRbMV0pLCBwYXJzZUZsb2F0KHJlc3VsdFsyXSksIHBhcnNlRmxvYXQocmVzdWx0WzNdKSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5VVlBhdHRlcm4uZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgVmVjdG9yMiB3aXRoIHRoZSBub3JtYWxzIHUsIHZcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAvLyBbXCJ2dCAwLjEgMC4yIDAuM1wiLCBcIjAuMVwiLCBcIjAuMlwiXVxyXG4gICAgICAgICAgICAgICAgLy9BZGQgdGhlIFZlY3RvciBpbiB0aGUgbGlzdCBvZiB1dnNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3V2cy5wdXNoKG5ldyBWZWN0b3IyKHBhcnNlRmxvYXQocmVzdWx0WzFdKSAqIHRoaXMuX2xvYWRpbmdPcHRpb25zLlVWU2NhbGluZy54LCBwYXJzZUZsb2F0KHJlc3VsdFsyXSkgKiB0aGlzLl9sb2FkaW5nT3B0aW9ucy5VVlNjYWxpbmcueSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vSWRlbnRpZnkgcGF0dGVybnMgb2YgZmFjZXNcclxuICAgICAgICAgICAgICAgIC8vRmFjZSBjb3VsZCBiZSBkZWZpbmVkIGluIGRpZmZlcmVudCB0eXBlIG9mIHBhdHRlcm5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuRmFjZVBhdHRlcm4zLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdDpcclxuICAgICAgICAgICAgICAgIC8vW1wiZiAxLzEvMSAyLzIvMiAzLzMvM1wiLCBcIjEvMS8xIDIvMi8yIDMvMy8zXCIuLi5dXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4zKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCIxLzEvMVwiLCBcIjIvMi8yXCIsIFwiMy8zLzNcIl1cclxuICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5GYWNlUGF0dGVybjQuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0OlxyXG4gICAgICAgICAgICAgICAgLy9bXCJmIDEvLzEgMi8vMiAzLy8zXCIsIFwiMS8vMSAyLy8yIDMvLzNcIi4uLl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjQoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjEvLzFcIiwgXCIyLy8yXCIsIFwiMy8vM1wiXVxyXG4gICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkZhY2VQYXR0ZXJuNS5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL1tcImYgLTEvLTEvLTEgLTIvLTIvLTIgLTMvLTMvLTNcIiwgXCItMS8tMS8tMSAtMi8tMi8tMiAtMy8tMy8tM1wiLi4uXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuNShcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiLTEvLTEvLTFcIiwgXCItMi8tMi8tMlwiLCBcIi0zLy0zLy0zXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuRmFjZVBhdHRlcm4yLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdDpcclxuICAgICAgICAgICAgICAgIC8vW1wiZiAxLzEgMi8yIDMvM1wiLCBcIjEvMSAyLzIgMy8zXCIuLi5dXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4yKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCIxLzFcIiwgXCIyLzJcIiwgXCIzLzNcIl1cclxuICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5GYWNlUGF0dGVybjEuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAvL1tcImYgMSAyIDNcIiwgXCIxIDIgM1wiLi4uXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMShcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiMVwiLCBcIjJcIiwgXCIzXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgYSBtZXNoIG9yIGFuIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgLy8gRWFjaCB0aW1lIHRoaXMga2V5d29yZCBpcyBhbmFseXplZCwgY3JlYXRlIGEgbmV3IE9iamVjdCB3aXRoIGFsbCBkYXRhIGZvciBjcmVhdGluZyBhIGJhYnlsb25NZXNoXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkxpbmVQYXR0ZXJuMS5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHRcclxuICAgICAgICAgICAgICAgIC8vW1wibCAxIDJcIl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjEoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjFcIiwgXCIyXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc0xpbmVEYXRhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgYSBtZXNoIG9yIGFuIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgLy8gRWFjaCB0aW1lIHRoaXMga2V5d29yZCBpcyBhbmFseXplZCwgY3JlYXRlIGEgbmV3IE9iamVjdCB3aXRoIGFsbCBkYXRhIGZvciBjcmVhdGluZyBhIGJhYnlsb25NZXNoXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkxpbmVQYXR0ZXJuMi5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHRcclxuICAgICAgICAgICAgICAgIC8vW1wibCAxLzEgMi8yXCJdXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4yKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCIxLzFcIiwgXCIyLzJcIl1cclxuICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzTGluZURhdGEgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlZmluZSBhIG1lc2ggb3IgYW4gb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAvLyBFYWNoIHRpbWUgdGhpcyBrZXl3b3JkIGlzIGFuYWx5emVkLCBjcmVhdGUgYSBuZXcgT2JqZWN0IHdpdGggYWxsIGRhdGEgZm9yIGNyZWF0aW5nIGEgYmFieWxvbk1lc2hcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuTGluZVBhdHRlcm4zLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLy9bXCJsIDEvMS8xIDIvMi8yXCJdXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4zKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCIxLzEvMVwiLCBcIjIvMi8yXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc0xpbmVEYXRhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgYSBtZXNoIG9yIGFuIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgLy8gRWFjaCB0aW1lIHRoaXMga2V5d29yZCBpcyBhbmFseXplZCwgY3JlYXRlIGEgbmV3IE9iamVjdCB3aXRoIGFsbCBkYXRhIGZvciBjcmVhdGluZyBhIGJhYnlsb25NZXNoXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoU29saWRQYXJzZXIuR3JvdXBEZXNjcmlwdG9yLnRlc3QobGluZSkgfHwgU29saWRQYXJzZXIuT2JqZWN0RGVzY3JpcHRvci50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgbWVzaCBjb3JyZXNwb25kaW5nIHRvIHRoZSBuYW1lIG9mIHRoZSBncm91cC5cclxuICAgICAgICAgICAgICAgIC8vIERlZmluaXRpb24gb2YgdGhlIG1lc2hcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iak1lc2g6IE1lc2hPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbGluZS5zdWJzdHJpbmcoMikudHJpbSgpLCAvL1NldCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBvYmogbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGljZXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbHM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgdXZzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yczogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbE5hbWU6IHRoaXMuX21hdGVyaWFsTmFtZUZyb21PYmosXHJcbiAgICAgICAgICAgICAgICAgICAgaXNPYmplY3Q6IFNvbGlkUGFyc2VyLk9iamVjdERlc2NyaXB0b3IudGVzdChsaW5lKSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRQcmV2aW91c09iak1lc2goKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1B1c2ggdGhlIGxhc3QgbWVzaCBjcmVhdGVkIHdpdGggb25seSB0aGUgbmFtZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWVzaGVzRnJvbU9iai5wdXNoKG9iak1lc2gpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoaXMgdmFyaWFibGUgdG8gaW5kaWNhdGUgdGhhdCBub3cgbWVzaGVzRnJvbU9iaiBoYXMgb2JqZWN0cyBkZWZpbmVkIGluc2lkZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzTWVzaGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzRmlyc3RNYXRlcmlhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmNyZW1lbnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgLy9LZXl3b3JkIGZvciBhcHBseWluZyBhIG1hdGVyaWFsXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoU29saWRQYXJzZXIuVXNlTXRsRGVzY3JpcHRvci50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAvL0dldCB0aGUgbmFtZSBvZiB0aGUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsTmFtZUZyb21PYmogPSBsaW5lLnN1YnN0cmluZyg3KS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JZiB0aGlzIG5ldyBtYXRlcmlhbCBpcyBpbiB0aGUgc2FtZSBtZXNoXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0ZpcnN0TWF0ZXJpYWwgfHwgIXRoaXMuX2hhc01lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGUgcHJldmlvdXMgbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFByZXZpb3VzT2JqTWVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ3JlYXRlIGEgbmV3IG1lc2hcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmpNZXNoOiBNZXNoT2JqZWN0ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgb2JqIG1lc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogKHRoaXMuX29iak1lc2hOYW1lIHx8IFwibWVzaFwiKSArIFwiX21tXCIgKyB0aGlzLl9pbmNyZW1lbnQudG9TdHJpbmcoKSwgLy9TZXQgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgb2JqIG1lc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGljZXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXZzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxOYW1lOiB0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNPYmplY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luY3JlbWVudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vSWYgbWVzaGVzIGFyZSBhbHJlYWR5IGRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXNoZXNGcm9tT2JqLnB1c2gob2JqTWVzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFzTWVzaGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBtYXRlcmlhbCBuYW1lIGlmIHRoZSBwcmV2aW91cyBsaW5lIGRlZmluZSBhIG1lc2hcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faGFzTWVzaGVzICYmIHRoaXMuX2lzRmlyc3RNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBtYXRlcmlhbCBuYW1lIHRvIHRoZSBwcmV2aW91cyBtZXNoICgxIG1hdGVyaWFsIHBlciBtZXNoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc2hlc0Zyb21PYmpbdGhpcy5fbWVzaGVzRnJvbU9iai5sZW5ndGggLSAxXS5tYXRlcmlhbE5hbWUgPSB0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRmlyc3RNYXRlcmlhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gS2V5d29yZCBmb3IgbG9hZGluZyB0aGUgbXRsIGZpbGVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChTb2xpZFBhcnNlci5NdGxMaWJHcm91cERlc2NyaXB0b3IudGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIG10bCBmaWxlXHJcbiAgICAgICAgICAgICAgICBvbkZpbGVUb0xvYWRGb3VuZChsaW5lLnN1YnN0cmluZyg3KS50cmltKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFwcGx5IHNtb290aGluZ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFNvbGlkUGFyc2VyLlNtb290aERlc2NyaXB0b3IudGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc21vb3RoIHNoYWRpbmcgPT4gYXBwbHkgc21vb3RoaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBUb2RheSBJIGRvbid0IGtub3cgaXQgd29yayB3aXRoIGJhYnlsb24gYW5kIHdpdGggb2JqLlxyXG4gICAgICAgICAgICAgICAgLy8gV2l0aCB0aGUgb2JqIGZpbGUgIGFuIGludGVnZXIgaXMgc2V0XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZXJlIGlzIGFub3RoZXIgcG9zc2liaWxpdHlcclxuICAgICAgICAgICAgICAgIExvZ2dlci5Mb2coXCJVbmhhbmRsZWQgZXhwcmVzc2lvbiBhdCBsaW5lIDogXCIgKyBsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXQgdGhlIGVuZCBvZiB0aGUgZmlsZSwgYWRkIHRoZSBsYXN0IG1lc2ggaW50byB0aGUgbWVzaGVzRnJvbU9iaiBhcnJheVxyXG4gICAgICAgIGlmICh0aGlzLl9oYXNNZXNoZXMpIHtcclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBkYXRhIGZvciB0aGUgbGFzdCBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoID0gdGhpcy5fbWVzaGVzRnJvbU9ialt0aGlzLl9tZXNoZXNGcm9tT2JqLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLnVzZUxlZ2FjeUJlaGF2aW9yKSB7XHJcbiAgICAgICAgICAgICAgICAvL1JldmVyc2UgaW5kaWNlcyBmb3IgZGlzcGxheWluZyBmYWNlcyBpbiB0aGUgZ29vZCBzZW5zZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlc0ZvckJhYnlsb24ucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0dldCB0aGUgZ29vZCBhcnJheVxyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBEYXRhKCk7XHJcbiAgICAgICAgICAgIC8vU2V0IGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLmluZGljZXMgPSB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbjtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zID0gdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbjtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2gubm9ybWFscyA9IHRoaXMuX3Vud3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC51dnMgPSB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb247XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLmhhc0xpbmVzID0gdGhpcy5faGFzTGluZURhdGE7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5jb2xvcnMgPSB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiBhbnkgbyBvciBnIGtleXdvcmQgbm90IGZvdW5kLCBjcmVhdGUgYSBtZXNoIHdpdGggYSByYW5kb20gaWRcclxuICAgICAgICBpZiAoIXRoaXMuX2hhc01lc2hlcykge1xyXG4gICAgICAgICAgICBsZXQgbmV3TWF0ZXJpYWw6IE51bGxhYmxlPFN0YW5kYXJkTWF0ZXJpYWw+ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLnVzZUxlZ2FjeUJlaGF2aW9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV2ZXJzZSB0YWIgb2YgaW5kaWNlc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0dldCBwb3NpdGlvbnMgbm9ybWFscyB1dnNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Vud3JhcERhdGEoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZXJlIGlzIG5vIGluZGljZXMgaW4gdGhlIGZpbGUuIFdlIHdpbGwgaGF2ZSB0byBzd2l0Y2ggdG8gcG9pbnQgY2xvdWQgcmVuZGVyaW5nXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBvcyBvZiB0aGlzLl9wb3NpdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uLnB1c2gocG9zLngsIHBvcy55LCBwb3Mueik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX25vcm1hbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBub3JtYWwgb2YgdGhpcy5fbm9ybWFscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWROb3JtYWxzRm9yQmFieWxvbi5wdXNoKG5vcm1hbC54LCBub3JtYWwueSwgbm9ybWFsLnopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdXZzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdXYgb2YgdGhpcy5fdXZzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZFVWRm9yQmFieWxvbi5wdXNoKHV2LngsIHV2LnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29sb3JzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY29sb3Igb2YgdGhpcy5fY29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZENvbG9yc0ZvckJhYnlsb24ucHVzaChjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbWF0ZXJpYWwgd2l0aCBwb2ludCBjbG91ZCBvblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld01hdGVyaWFsID0gbmV3IFN0YW5kYXJkTWF0ZXJpYWwoR2VvbWV0cnkuUmFuZG9tSWQoKSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbC5wb2ludHNDbG91ZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsTmFtZUZyb21PYmogPSBuZXdNYXRlcmlhbC5uYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX25vcm1hbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld01hdGVyaWFsLmRpc2FibGVMaWdodGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld01hdGVyaWFsLmVtaXNzaXZlQ29sb3IgPSBDb2xvcjMuV2hpdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vU2V0IGRhdGEgZm9yIG9uZSBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX21lc2hlc0Zyb21PYmoucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBHZW9tZXRyeS5SYW5kb21JZCgpLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlczogdGhpcy5faW5kaWNlc0ZvckJhYnlsb24sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IHRoaXMuX3Vud3JhcHBlZFBvc2l0aW9uc0ZvckJhYnlsb24sXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6IHRoaXMuX3Vud3JhcHBlZENvbG9yc0ZvckJhYnlsb24sXHJcbiAgICAgICAgICAgICAgICBub3JtYWxzOiB0aGlzLl91bndyYXBwZWROb3JtYWxzRm9yQmFieWxvbixcclxuICAgICAgICAgICAgICAgIHV2czogdGhpcy5fdW53cmFwcGVkVVZGb3JCYWJ5bG9uLFxyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWxOYW1lOiB0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0TWF0ZXJpYWw6IG5ld01hdGVyaWFsLFxyXG4gICAgICAgICAgICAgICAgaXNPYmplY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9TZXQgZGF0YSBmb3IgZWFjaCBtZXNoXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9tZXNoZXNGcm9tT2JqLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIC8vY2hlY2sgbWVzaGVzTmFtZXMgKHN0bEZpbGVMb2FkZXIpXHJcbiAgICAgICAgICAgIGlmIChtZXNoZXNOYW1lcyAmJiB0aGlzLl9tZXNoZXNGcm9tT2JqW2pdLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNoZXNOYW1lcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc2hlc05hbWVzLmluZGV4T2YodGhpcy5fbWVzaGVzRnJvbU9ialtqXS5uYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWVzaGVzRnJvbU9ialtqXS5uYW1lICE9PSBtZXNoZXNOYW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vR2V0IHRoZSBjdXJyZW50IG1lc2hcclxuICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgd2l0aCBWZXJ0ZXhCdWZmZXIgZm9yIGVhY2ggbWVzaFxyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaCA9IHRoaXMuX21lc2hlc0Zyb21PYmpbal07XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgTWVzaCB3aXRoIHRoZSBuYW1lIG9mIHRoZSBvYmogbWVzaFxyXG5cclxuICAgICAgICAgICAgc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhYnlsb25NZXNoID0gbmV3IE1lc2godGhpcy5fbWVzaGVzRnJvbU9ialtqXS5uYW1lLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIGJhYnlsb25NZXNoLl9wYXJlbnRDb250YWluZXIgPSBhc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5fYmFieWxvbk1lc2ggPSBiYWJ5bG9uTWVzaDtcclxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBhIGdyb3VwIG1lc2gsIGl0IHNob3VsZCBoYXZlIGFuIG9iamVjdCBtZXNoIGFzIGEgcGFyZW50LiBTbyBsb29rIGZvciB0aGUgZmlyc3Qgb2JqZWN0IG1lc2ggdGhhdCBhcHBlYXJzIGJlZm9yZSBpdC5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9oYW5kbGVkTWVzaC5pc09iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IGogLSAxOyBrID49IDA7IC0taykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXNoZXNGcm9tT2JqW2tdLmlzT2JqZWN0ICYmIHRoaXMuX21lc2hlc0Zyb21PYmpba10uX2JhYnlsb25NZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25NZXNoLnBhcmVudCA9IHRoaXMuX21lc2hlc0Zyb21PYmpba10uX2JhYnlsb25NZXNoITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1B1c2ggdGhlIG5hbWUgb2YgdGhlIG1hdGVyaWFsIHRvIGFuIGFycmF5XHJcbiAgICAgICAgICAgIC8vVGhpcyBpcyBpbmRpc3BlbnNhYmxlIGZvciB0aGUgaW1wb3J0TWVzaCBmdW5jdGlvblxyXG4gICAgICAgICAgICB0aGlzLl9tYXRlcmlhbFRvVXNlLnB1c2godGhpcy5fbWVzaGVzRnJvbU9ialtqXS5tYXRlcmlhbE5hbWUpO1xyXG4gICAgICAgICAgICAvL0lmIHRoZSBtZXNoIGlzIGEgbGluZSBtZXNoXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYW5kbGVkTWVzaC5oYXNMaW5lcykge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1lc2guX2ludGVybmFsTWV0YWRhdGEgPz89IHt9O1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1lc2guX2ludGVybmFsTWV0YWRhdGFbXCJfaXNMaW5lXCJdID0gdHJ1ZTsgLy90aGlzIGlzIGEgbGluZSBtZXNoXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYW5kbGVkTWVzaC5wb3NpdGlvbnM/Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9QdXNoIHRoZSBtZXNoIGludG8gYW4gYXJyYXlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JhYnlsb25NZXNoZXNBcnJheS5wdXNoKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhOiBWZXJ0ZXhEYXRhID0gbmV3IFZlcnRleERhdGEoKTsgLy9UaGUgY29udGFpbmVyIGZvciB0aGUgdmFsdWVzXHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGUgYmFieWxvbk1lc2hcclxuICAgICAgICAgICAgdmVydGV4RGF0YS51dnMgPSB0aGlzLl9oYW5kbGVkTWVzaC51dnM7XHJcbiAgICAgICAgICAgIHZlcnRleERhdGEuaW5kaWNlcyA9IHRoaXMuX2hhbmRsZWRNZXNoLmluZGljZXM7XHJcbiAgICAgICAgICAgIHZlcnRleERhdGEucG9zaXRpb25zID0gdGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuY29tcHV0ZU5vcm1hbHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbHM6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgICAgICAgICAgVmVydGV4RGF0YS5Db21wdXRlTm9ybWFscyh0aGlzLl9oYW5kbGVkTWVzaC5wb3NpdGlvbnMsIHRoaXMuX2hhbmRsZWRNZXNoLmluZGljZXMsIG5vcm1hbHMpO1xyXG4gICAgICAgICAgICAgICAgdmVydGV4RGF0YS5ub3JtYWxzID0gbm9ybWFscztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZlcnRleERhdGEubm9ybWFscyA9IHRoaXMuX2hhbmRsZWRNZXNoLm5vcm1hbHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgdmVydGV4RGF0YS5jb2xvcnMgPSB0aGlzLl9oYW5kbGVkTWVzaC5jb2xvcnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZnJvbSB0aGUgVmVydGV4QnVmZmVyIHRvIHRoZSBjdXJyZW50IE1lc2hcclxuICAgICAgICAgICAgdmVydGV4RGF0YS5hcHBseVRvTWVzaChiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbnZlcnRZKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5zY2FsaW5nLnkgKj0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLm9wdGltaXplTm9ybWFscykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW1pemVOb3JtYWxzKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9QdXNoIHRoZSBtZXNoIGludG8gYW4gYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5fYmFieWxvbk1lc2hlc0FycmF5LnB1c2goYmFieWxvbk1lc2gpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2hhbmRsZWRNZXNoLmRpcmVjdE1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5tYXRlcmlhbCA9IHRoaXMuX2hhbmRsZWRNZXNoLmRpcmVjdE1hdGVyaWFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCAqIGFzIExvYWRlcnMgZnJvbSBcImxvYWRlcnMvT0JKL2luZGV4XCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBVTUQgbW9kdWxlLlxyXG4gKiBUaGUgZW50cnkgcG9pbnQgZm9yIGEgZnV0dXJlIEVTTSBwYWNrYWdlIHNob3VsZCBiZSBpbmRleC50c1xyXG4gKi9cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBMb2FkZXJzKSB7XHJcbiAgICAgICAgaWYgKCEoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT05ba2V5XSkge1xyXG4gICAgICAgICAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT05ba2V5XSA9ICg8YW55PkxvYWRlcnMpW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgKiBmcm9tIFwibG9hZGVycy9PQkovaW5kZXhcIjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NaXNjX29ic2VydmFibGVfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBsb2FkZXJzIGZyb20gXCJAbHRzL2xvYWRlcnMvbGVnYWN5L2xlZ2FjeS1vYmpGaWxlTG9hZGVyXCI7XHJcbmV4cG9ydCB7IGxvYWRlcnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgbG9hZGVycztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9