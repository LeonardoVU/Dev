(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-serializers", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-serializers"] = factory(require("babylonjs"));
	else
		root["SERIALIZERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Maths_math_vector__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.ts":
/*!***********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* binding */ EXT_mesh_gpu_instancing)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Buffers/buffer */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__);





var NAME = "EXT_mesh_gpu_instancing";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var EXT_mesh_gpu_instancing = /** @class */ (function () {
    function EXT_mesh_gpu_instancing(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    EXT_mesh_gpu_instancing.prototype.dispose = function () { };
    Object.defineProperty(EXT_mesh_gpu_instancing.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    EXT_mesh_gpu_instancing.prototype.postExportNodeAsync = function (context, node, babylonNode, nodeMap, binaryWriter) {
        var _this = this;
        return new Promise(function (resolve) {
            if (node && babylonNode instanceof babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Mesh) {
                if (babylonNode.hasThinInstances && binaryWriter) {
                    _this._wasUsed = true;
                    var noTranslation = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero();
                    var noRotation = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Quaternion.Identity();
                    var noScale = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Vector3.One();
                    // retrieve all the instance world matrix
                    var matrix = babylonNode.thinInstanceGetWorldMatrices();
                    var iwt = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.TmpVectors.Vector3[2];
                    var iwr = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.TmpVectors.Quaternion[1];
                    var iws = babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.TmpVectors.Vector3[3];
                    var hasAnyInstanceWorldTranslation = false;
                    var hasAnyInstanceWorldRotation = false;
                    var hasAnyInstanceWorldScale = false;
                    // prepare temp buffers
                    var translationBuffer = new Float32Array(babylonNode.thinInstanceCount * 3);
                    var rotationBuffer = new Float32Array(babylonNode.thinInstanceCount * 4);
                    var scaleBuffer = new Float32Array(babylonNode.thinInstanceCount * 3);
                    var i = 0;
                    for (var _i = 0, matrix_1 = matrix; _i < matrix_1.length; _i++) {
                        var m = matrix_1[_i];
                        m.decompose(iws, iwr, iwt);
                        // fill the temp buffer
                        translationBuffer.set(iwt.asArray(), i * 3);
                        rotationBuffer.set(iwr.normalize().asArray(), i * 4); // ensure the quaternion is normalized
                        scaleBuffer.set(iws.asArray(), i * 3);
                        // this is where we decide if there is any transformation
                        hasAnyInstanceWorldTranslation = hasAnyInstanceWorldTranslation || !iwt.equalsWithEpsilon(noTranslation);
                        hasAnyInstanceWorldRotation = hasAnyInstanceWorldRotation || !iwr.equalsWithEpsilon(noRotation);
                        hasAnyInstanceWorldScale = hasAnyInstanceWorldScale || !iws.equalsWithEpsilon(noScale);
                        i++;
                    }
                    var extension = {
                        attributes: {},
                    };
                    // do we need to write TRANSLATION ?
                    if (hasAnyInstanceWorldTranslation) {
                        extension.attributes["TRANSLATION"] = _this._buildAccessor(translationBuffer, "VEC3" /* AccessorType.VEC3 */, babylonNode.thinInstanceCount, binaryWriter, 5126 /* AccessorComponentType.FLOAT */);
                    }
                    // do we need to write ROTATION ?
                    if (hasAnyInstanceWorldRotation) {
                        var componentType = 5126 /* AccessorComponentType.FLOAT */; // we decided to stay on FLOAT for now see https://github.com/BabylonJS/Babylon.js/pull/12495
                        extension.attributes["ROTATION"] = _this._buildAccessor(rotationBuffer, "VEC4" /* AccessorType.VEC4 */, babylonNode.thinInstanceCount, binaryWriter, componentType);
                    }
                    // do we need to write SCALE ?
                    if (hasAnyInstanceWorldScale) {
                        extension.attributes["SCALE"] = _this._buildAccessor(scaleBuffer, "VEC3" /* AccessorType.VEC3 */, babylonNode.thinInstanceCount, binaryWriter, 5126 /* AccessorComponentType.FLOAT */);
                    }
                    /* eslint-enable @typescript-eslint/naming-convention*/
                    node.extensions = node.extensions || {};
                    node.extensions[NAME] = extension;
                }
            }
            resolve(node);
        });
    };
    EXT_mesh_gpu_instancing.prototype._buildAccessor = function (buffer, type, count, binaryWriter, componentType) {
        // write the buffer
        var bufferOffset = binaryWriter.getByteOffset();
        switch (componentType) {
            case 5126 /* AccessorComponentType.FLOAT */: {
                for (var i = 0; i != buffer.length; i++) {
                    binaryWriter.setFloat32(buffer[i]);
                }
                break;
            }
            case 5120 /* AccessorComponentType.BYTE */: {
                for (var i = 0; i != buffer.length; i++) {
                    binaryWriter.setByte(buffer[i] * 127);
                }
                break;
            }
            case 5122 /* AccessorComponentType.SHORT */: {
                for (var i = 0; i != buffer.length; i++) {
                    binaryWriter.setInt16(buffer[i] * 32767);
                }
                break;
            }
        }
        // build the buffer view
        var bv = { buffer: 0, byteOffset: bufferOffset, byteLength: buffer.length * babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.VertexBuffer.GetTypeByteLength(componentType) };
        var bufferViewIndex = this._exporter._bufferViews.length;
        this._exporter._bufferViews.push(bv);
        // finally build the accessor
        var accessorIndex = this._exporter._accessors.length;
        var accessor = {
            bufferView: bufferViewIndex,
            componentType: componentType,
            count: count,
            type: type,
            normalized: componentType == 5120 /* AccessorComponentType.BYTE */ || componentType == 5122 /* AccessorComponentType.SHORT */,
        };
        this._exporter._accessors.push(accessor);
        return accessorIndex;
    };
    return EXT_mesh_gpu_instancing;
}());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new EXT_mesh_gpu_instancing(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_lights_punctual.ts":
/*!*******************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_lights_punctual.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_lights_punctual: () => (/* binding */ KHR_lights_punctual)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");






var NAME = "KHR_lights_punctual";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_lights_punctual = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_lights_punctual(exporter) {
        /** The name of this extension. */
        this.name = NAME;
        /** Defines whether this extension is enabled. */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._exporter = exporter;
    }
    /** @internal */
    KHR_lights_punctual.prototype.dispose = function () {
        this._lights = null;
    };
    Object.defineProperty(KHR_lights_punctual.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return !!this._lights;
        },
        enumerable: false,
        configurable: true
    });
    /** @internal */
    KHR_lights_punctual.prototype.onExporting = function () {
        this._exporter._glTF.extensions[NAME] = this._lights;
    };
    /**
     * Define this method to modify the default behavior when exporting a node
     * @param context The context when exporting the node
     * @param node glTF node
     * @param babylonNode BabylonJS node
     * @param nodeMap Node mapping of unique id to glTF node index
     * @returns nullable INode promise
     */
    KHR_lights_punctual.prototype.postExportNodeAsync = function (context, node, babylonNode, nodeMap) {
        var _this = this;
        return new Promise(function (resolve) {
            if (node && babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.ShadowLight) {
                var light = void 0;
                var lightType = babylonNode.getTypeID() == babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.LIGHTTYPEID_POINTLIGHT
                    ? "point" /* KHRLightsPunctual_LightType.POINT */
                    : babylonNode.getTypeID() == babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.LIGHTTYPEID_DIRECTIONALLIGHT
                        ? "directional" /* KHRLightsPunctual_LightType.DIRECTIONAL */
                        : babylonNode.getTypeID() == babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.LIGHTTYPEID_SPOTLIGHT
                            ? "spot" /* KHRLightsPunctual_LightType.SPOT */
                            : null;
                if (lightType == null) {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, ": Light ").concat(babylonNode.name, " is not supported in ").concat(NAME));
                }
                else {
                    if (!babylonNode.position.equalsToFloats(0, 0, 0)) {
                        node.translation = babylonNode.position.asArray();
                    }
                    if (lightType !== "point" /* KHRLightsPunctual_LightType.POINT */) {
                        var localAxis = babylonNode.direction;
                        var yaw = -Math.atan2(localAxis.z, localAxis.x) + Math.PI / 2;
                        var len = Math.sqrt(localAxis.x * localAxis.x + localAxis.z * localAxis.z);
                        var pitch = -Math.atan2(localAxis.y, len);
                        var lightRotationQuaternion = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRoll(yaw + Math.PI, pitch, 0);
                        if (!babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(lightRotationQuaternion)) {
                            node.rotation = lightRotationQuaternion.asArray();
                        }
                    }
                    if (babylonNode.falloffType !== babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.FALLOFF_GLTF) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, ": Light falloff for ").concat(babylonNode.name, " does not match the ").concat(NAME, " specification!"));
                    }
                    light = {
                        type: lightType,
                    };
                    if (!babylonNode.diffuse.equals(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White())) {
                        light.color = babylonNode.diffuse.asArray();
                    }
                    if (babylonNode.intensity !== 1.0) {
                        light.intensity = babylonNode.intensity;
                    }
                    if (babylonNode.range !== Number.MAX_VALUE) {
                        light.range = babylonNode.range;
                    }
                    if (lightType === "spot" /* KHRLightsPunctual_LightType.SPOT */) {
                        var babylonSpotLight = babylonNode;
                        if (babylonSpotLight.angle !== Math.PI / 2.0) {
                            if (light.spot == null) {
                                light.spot = {};
                            }
                            light.spot.outerConeAngle = babylonSpotLight.angle / 2.0;
                        }
                        if (babylonSpotLight.innerAngle !== 0) {
                            if (light.spot == null) {
                                light.spot = {};
                            }
                            light.spot.innerConeAngle = babylonSpotLight.innerAngle / 2.0;
                        }
                    }
                    _this._lights || (_this._lights = {
                        lights: [],
                    });
                    _this._lights.lights.push(light);
                    var lightReference = {
                        light: _this._lights.lights.length - 1,
                    };
                    // Avoid duplicating the Light's parent node if possible.
                    var parentBabylonNode = babylonNode.parent;
                    if (parentBabylonNode && parentBabylonNode.getChildren().length == 1) {
                        var parentNode = _this._exporter._nodes[nodeMap[parentBabylonNode.uniqueId]];
                        if (parentNode) {
                            var parentTranslation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(parentNode.translation || [0, 0, 0], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0]);
                            var parentRotation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArrayToRef(parentNode.rotation || [0, 0, 0, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0]);
                            var parentScale = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(parentNode.scale || [1, 1, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1]);
                            var parentMatrix = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.ComposeToRef(parentScale, parentRotation, parentTranslation, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]);
                            var translation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(node.translation || [0, 0, 0], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[2]);
                            var rotation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArrayToRef(node.rotation || [0, 0, 0, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[1]);
                            var matrix = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.ComposeToRef(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.OneReadOnly, rotation, translation, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[1]);
                            parentMatrix.multiplyToRef(matrix, matrix);
                            matrix.decompose(parentScale, parentRotation, parentTranslation);
                            if (parentTranslation.equalsToFloats(0, 0, 0)) {
                                delete parentNode.translation;
                            }
                            else {
                                parentNode.translation = parentTranslation.asArray();
                            }
                            if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(parentRotation)) {
                                delete parentNode.rotation;
                            }
                            else {
                                parentNode.rotation = parentRotation.asArray();
                            }
                            if (parentScale.equalsToFloats(1, 1, 1)) {
                                delete parentNode.scale;
                            }
                            else {
                                parentNode.scale = parentScale.asArray();
                            }
                            parentNode.extensions || (parentNode.extensions = {});
                            parentNode.extensions[NAME] = lightReference;
                            // Do not export the original node
                            resolve(null);
                            return;
                        }
                    }
                    node.extensions || (node.extensions = {});
                    node.extensions[NAME] = lightReference;
                }
            }
            resolve(node);
        });
    };
    return KHR_lights_punctual;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_1__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_lights_punctual(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_anisotropy.ts":
/*!************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_anisotropy.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_anisotropy: () => (/* binding */ KHR_materials_anisotropy)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrBaseMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_anisotropy";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_anisotropy = /** @class */ (function () {
    function KHR_materials_anisotropy(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_anisotropy.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_anisotropy.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_anisotropy.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
            if (babylonMaterial.anisotropy.isEnabled && !babylonMaterial.anisotropy.legacy) {
                if (babylonMaterial.anisotropy.texture) {
                    additionalTextures.push(babylonMaterial.anisotropy.texture);
                }
                return additionalTextures;
            }
        }
        return [];
    };
    KHR_materials_anisotropy.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
                if (!babylonMaterial.anisotropy.isEnabled || babylonMaterial.anisotropy.legacy) {
                    resolve(node);
                    return;
                }
                _this._wasUsed = true;
                node.extensions = node.extensions || {};
                var anisotropyTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.anisotropy.texture);
                var anisotropyInfo_1 = {
                    anisotropyStrength: babylonMaterial.anisotropy.intensity,
                    anisotropyRotation: babylonMaterial.anisotropy.angle,
                    anisotropyTexture: anisotropyTextureInfo !== null && anisotropyTextureInfo !== void 0 ? anisotropyTextureInfo : undefined,
                    hasTextures: function () {
                        return anisotropyInfo_1.anisotropyTexture !== null;
                    },
                };
                node.extensions[NAME] = anisotropyInfo_1;
            }
            resolve(node);
        });
    };
    return KHR_materials_anisotropy;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_anisotropy(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_clearcoat.ts":
/*!***********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_clearcoat.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_clearcoat: () => (/* binding */ KHR_materials_clearcoat)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__);



var NAME = "KHR_materials_clearcoat";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_clearcoat = /** @class */ (function () {
    function KHR_materials_clearcoat(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_clearcoat.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_clearcoat.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_clearcoat.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
            if (babylonMaterial.clearCoat.isEnabled) {
                if (babylonMaterial.clearCoat.texture) {
                    additionalTextures.push(babylonMaterial.clearCoat.texture);
                }
                if (!babylonMaterial.clearCoat.useRoughnessFromMainTexture && babylonMaterial.clearCoat.textureRoughness) {
                    additionalTextures.push(babylonMaterial.clearCoat.textureRoughness);
                }
                if (babylonMaterial.clearCoat.bumpTexture) {
                    additionalTextures.push(babylonMaterial.clearCoat.bumpTexture);
                }
                return additionalTextures;
            }
        }
        return [];
    };
    KHR_materials_clearcoat.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
                if (!babylonMaterial.clearCoat.isEnabled) {
                    resolve(node);
                    return;
                }
                _this._wasUsed = true;
                node.extensions = node.extensions || {};
                var clearCoatTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.clearCoat.texture);
                var clearCoatTextureRoughnessInfo = void 0;
                if (babylonMaterial.clearCoat.useRoughnessFromMainTexture) {
                    clearCoatTextureRoughnessInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.clearCoat.texture);
                }
                else {
                    clearCoatTextureRoughnessInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.clearCoat.textureRoughness);
                }
                if (babylonMaterial.clearCoat.isTintEnabled) {
                    babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Clear Color tint is not supported for glTF export. Ignoring for: ".concat(babylonMaterial.name));
                }
                if (babylonMaterial.clearCoat.remapF0OnInterfaceChange) {
                    babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Clear Color F0 remapping is not supported for glTF export. Ignoring for: ".concat(babylonMaterial.name));
                }
                var clearCoatNormalTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.clearCoat.bumpTexture);
                var clearCoatInfo_1 = {
                    clearcoatFactor: babylonMaterial.clearCoat.intensity,
                    clearcoatTexture: clearCoatTextureInfo !== null && clearCoatTextureInfo !== void 0 ? clearCoatTextureInfo : undefined,
                    clearcoatRoughnessFactor: babylonMaterial.clearCoat.roughness,
                    clearcoatRoughnessTexture: clearCoatTextureRoughnessInfo !== null && clearCoatTextureRoughnessInfo !== void 0 ? clearCoatTextureRoughnessInfo : undefined,
                    clearcoatNormalTexture: clearCoatNormalTextureInfo !== null && clearCoatNormalTextureInfo !== void 0 ? clearCoatNormalTextureInfo : undefined,
                    hasTextures: function () {
                        return clearCoatInfo_1.clearcoatTexture !== null || clearCoatInfo_1.clearcoatRoughnessTexture !== null || clearCoatInfo_1.clearcoatRoughnessTexture !== null;
                    },
                };
                node.extensions[NAME] = clearCoatInfo_1;
            }
            resolve(node);
        });
    };
    return KHR_materials_clearcoat;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_clearcoat(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_emissive_strength.ts":
/*!*******************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_emissive_strength.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_emissive_strength: () => (/* binding */ KHR_materials_emissive_strength)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_emissive_strength";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_emissive_strength = /** @class */ (function () {
    function KHR_materials_emissive_strength() {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
    }
    KHR_materials_emissive_strength.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_emissive_strength.prototype, "wasUsed", {
        /** @interal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_emissive_strength.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial)) {
                return resolve(node);
            }
            var emissiveColor = babylonMaterial.emissiveColor.asArray();
            var tempEmissiveStrength = Math.max.apply(Math, emissiveColor);
            if (tempEmissiveStrength > 1) {
                _this._wasUsed = true;
                node.extensions || (node.extensions = {});
                var emissiveStrengthInfo = {
                    emissiveStrength: tempEmissiveStrength,
                };
                // Normalize each value of the emissive factor to have a max value of 1
                var newEmissiveFactor = babylonMaterial.emissiveColor.scale(1 / emissiveStrengthInfo.emissiveStrength);
                node.emissiveFactor = newEmissiveFactor.asArray();
                node.extensions[NAME] = emissiveStrengthInfo;
            }
            return resolve(node);
        });
    };
    return KHR_materials_emissive_strength;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_emissive_strength(); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_ior.ts":
/*!*****************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_ior.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_ior: () => (/* binding */ KHR_materials_ior)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_ior";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_ior/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_ior = /** @class */ (function () {
    function KHR_materials_ior() {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
    }
    KHR_materials_ior.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_ior.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_ior.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        return mat.indexOfRefraction != undefined && mat.indexOfRefraction != 1.5; // 1.5 is normative default value.
    };
    KHR_materials_ior.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && _this._isExtensionEnabled(babylonMaterial)) {
                _this._wasUsed = true;
                var iorInfo = {
                    ior: babylonMaterial.indexOfRefraction,
                };
                node.extensions = node.extensions || {};
                node.extensions[NAME] = iorInfo;
            }
            resolve(node);
        });
    };
    return KHR_materials_ior;
}());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_ior(); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_iridescence.ts":
/*!*************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_iridescence.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_iridescence: () => (/* binding */ KHR_materials_iridescence)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrBaseMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_iridescence";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_iridescence = /** @class */ (function () {
    function KHR_materials_iridescence(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_iridescence.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_iridescence.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_iridescence.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
            if (babylonMaterial.iridescence.isEnabled) {
                if (babylonMaterial.iridescence.texture) {
                    additionalTextures.push(babylonMaterial.iridescence.texture);
                }
                if (babylonMaterial.iridescence.thicknessTexture && babylonMaterial.iridescence.thicknessTexture !== babylonMaterial.iridescence.texture) {
                    additionalTextures.push(babylonMaterial.iridescence.thicknessTexture);
                }
                return additionalTextures;
            }
        }
        return [];
    };
    KHR_materials_iridescence.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrBaseMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRBaseMaterial) {
                if (!babylonMaterial.iridescence.isEnabled) {
                    resolve(node);
                    return;
                }
                _this._wasUsed = true;
                node.extensions = node.extensions || {};
                var iridescenceTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.iridescence.texture);
                var iridescenceThicknessTextureInfo = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.iridescence.thicknessTexture);
                var iridescenceInfo_1 = {
                    iridescenceFactor: babylonMaterial.iridescence.intensity,
                    iridescenceIor: babylonMaterial.iridescence.indexOfRefraction,
                    iridescenceThicknessMinimum: babylonMaterial.iridescence.minimumThickness,
                    iridescenceThicknessMaximum: babylonMaterial.iridescence.maximumThickness,
                    iridescenceTexture: iridescenceTextureInfo !== null && iridescenceTextureInfo !== void 0 ? iridescenceTextureInfo : undefined,
                    iridescenceThicknessTexture: iridescenceThicknessTextureInfo !== null && iridescenceThicknessTextureInfo !== void 0 ? iridescenceThicknessTextureInfo : undefined,
                    hasTextures: function () {
                        return iridescenceInfo_1.iridescenceTexture !== null || iridescenceInfo_1.iridescenceThicknessTexture !== null;
                    },
                };
                node.extensions[NAME] = iridescenceInfo_1;
            }
            resolve(node);
        });
    };
    return KHR_materials_iridescence;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_iridescence(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_sheen.ts":
/*!*******************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_sheen.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_sheen: () => (/* binding */ KHR_materials_sheen)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_sheen";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_sheen = /** @class */ (function () {
    function KHR_materials_sheen(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_sheen.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_sheen.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_sheen.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (babylonMaterial.sheen.isEnabled && babylonMaterial.sheen.texture) {
                return [babylonMaterial.sheen.texture];
            }
        }
        return [];
    };
    KHR_materials_sheen.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b, _c, _d;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
                if (!babylonMaterial.sheen.isEnabled) {
                    resolve(node);
                    return;
                }
                _this._wasUsed = true;
                if (node.extensions == null) {
                    node.extensions = {};
                }
                var sheenInfo_1 = {
                    sheenColorFactor: babylonMaterial.sheen.color.asArray(),
                    sheenRoughnessFactor: (_a = babylonMaterial.sheen.roughness) !== null && _a !== void 0 ? _a : 0,
                    hasTextures: function () {
                        return sheenInfo_1.sheenColorTexture !== null || sheenInfo_1.sheenRoughnessTexture !== null;
                    },
                };
                if (babylonMaterial.sheen.texture) {
                    sheenInfo_1.sheenColorTexture = (_b = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.sheen.texture)) !== null && _b !== void 0 ? _b : undefined;
                }
                if (babylonMaterial.sheen.textureRoughness && !babylonMaterial.sheen.useRoughnessFromMainTexture) {
                    sheenInfo_1.sheenRoughnessTexture = (_c = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.sheen.textureRoughness)) !== null && _c !== void 0 ? _c : undefined;
                }
                else if (babylonMaterial.sheen.texture && babylonMaterial.sheen.useRoughnessFromMainTexture) {
                    sheenInfo_1.sheenRoughnessTexture = (_d = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.sheen.texture)) !== null && _d !== void 0 ? _d : undefined;
                }
                node.extensions[NAME] = sheenInfo_1;
            }
            resolve(node);
        });
    };
    return KHR_materials_sheen;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_sheen(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_specular.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_specular.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_specular: () => (/* binding */ KHR_materials_specular)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_specular";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_specular = /** @class */ (function () {
    function KHR_materials_specular(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_specular.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_specular.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_specular.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (this._isExtensionEnabled(babylonMaterial)) {
                if (babylonMaterial.metallicReflectanceTexture) {
                    additionalTextures.push(babylonMaterial.metallicReflectanceTexture);
                }
                if (babylonMaterial.reflectanceTexture) {
                    additionalTextures.push(babylonMaterial.reflectanceTexture);
                }
                return additionalTextures;
            }
        }
        return additionalTextures;
    };
    KHR_materials_specular.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        return ((mat.metallicF0Factor != undefined && mat.metallicF0Factor != 1.0) ||
            (mat.metallicReflectanceColor != undefined && !mat.metallicReflectanceColor.equalsFloats(1.0, 1.0, 1.0)) ||
            this._hasTexturesExtension(mat));
    };
    KHR_materials_specular.prototype._hasTexturesExtension = function (mat) {
        return mat.metallicReflectanceTexture != null || mat.reflectanceTexture != null;
    };
    KHR_materials_specular.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var _a, _b;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && _this._isExtensionEnabled(babylonMaterial)) {
                _this._wasUsed = true;
                node.extensions = node.extensions || {};
                var metallicReflectanceTexture = (_a = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.metallicReflectanceTexture)) !== null && _a !== void 0 ? _a : undefined;
                var reflectanceTexture = (_b = _this._exporter._glTFMaterialExporter._getTextureInfo(babylonMaterial.reflectanceTexture)) !== null && _b !== void 0 ? _b : undefined;
                var metallicF0Factor = babylonMaterial.metallicF0Factor == 1.0 ? undefined : babylonMaterial.metallicF0Factor;
                var metallicReflectanceColor = babylonMaterial.metallicReflectanceColor.equalsFloats(1.0, 1.0, 1.0)
                    ? undefined
                    : babylonMaterial.metallicReflectanceColor.asArray();
                var specularInfo = {
                    specularFactor: metallicF0Factor,
                    specularTexture: metallicReflectanceTexture,
                    specularColorFactor: metallicReflectanceColor,
                    specularColorTexture: reflectanceTexture,
                    hasTextures: function () {
                        return _this._hasTexturesExtension(babylonMaterial);
                    },
                };
                node.extensions[NAME] = specularInfo;
            }
            resolve(node);
        });
    };
    return KHR_materials_specular;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_specular(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_transmission.ts":
/*!**************************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_transmission.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_transmission: () => (/* binding */ KHR_materials_transmission)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_transmission";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_transmission = /** @class */ (function () {
    function KHR_materials_transmission(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_transmission.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_transmission.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_transmission.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (this._isExtensionEnabled(babylonMaterial)) {
                if (babylonMaterial.subSurface.thicknessTexture) {
                    additionalTextures.push(babylonMaterial.subSurface.thicknessTexture);
                }
                return additionalTextures;
            }
        }
        return additionalTextures;
    };
    KHR_materials_transmission.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        var subs = mat.subSurface;
        return (subs.isRefractionEnabled && subs.refractionIntensity != undefined && subs.refractionIntensity != 0) || this._hasTexturesExtension(mat);
    };
    KHR_materials_transmission.prototype._hasTexturesExtension = function (mat) {
        return mat.subSurface.refractionIntensityTexture != null;
    };
    KHR_materials_transmission.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var _a;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && _this._isExtensionEnabled(babylonMaterial)) {
                _this._wasUsed = true;
                var subs = babylonMaterial.subSurface;
                var transmissionFactor = subs.refractionIntensity === 0 ? undefined : subs.refractionIntensity;
                var transmissionTexture = (_a = _this._exporter._glTFMaterialExporter._getTextureInfo(subs.refractionIntensityTexture)) !== null && _a !== void 0 ? _a : undefined;
                var volumeInfo = {
                    transmissionFactor: transmissionFactor,
                    transmissionTexture: transmissionTexture,
                    hasTextures: function () {
                        return _this._hasTexturesExtension(babylonMaterial);
                    },
                };
                node.extensions = node.extensions || {};
                node.extensions[NAME] = volumeInfo;
            }
            resolve(node);
        });
    };
    return KHR_materials_transmission;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_transmission(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_unlit.ts":
/*!*******************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_unlit.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_unlit: () => (/* binding */ KHR_materials_unlit)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);



var NAME = "KHR_materials_unlit";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_unlit = /** @class */ (function () {
    function KHR_materials_unlit() {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
    }
    Object.defineProperty(KHR_materials_unlit.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_unlit.prototype.dispose = function () { };
    KHR_materials_unlit.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var unlitMaterial = false;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
                unlitMaterial = babylonMaterial.unlit;
            }
            else if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial) {
                unlitMaterial = babylonMaterial.disableLighting;
            }
            if (unlitMaterial) {
                _this._wasUsed = true;
                if (node.extensions == null) {
                    node.extensions = {};
                }
                node.extensions[NAME] = {};
            }
            resolve(node);
        });
    };
    return KHR_materials_unlit;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function () { return new KHR_materials_unlit(); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_volume.ts":
/*!********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_volume.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_volume: () => (/* binding */ KHR_materials_volume)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Maths/math.color */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__);



var NAME = "KHR_materials_volume";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_volume = /** @class */ (function () {
    function KHR_materials_volume(exporter) {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        this._wasUsed = false;
        this._exporter = exporter;
    }
    KHR_materials_volume.prototype.dispose = function () { };
    Object.defineProperty(KHR_materials_volume.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_materials_volume.prototype.postExportMaterialAdditionalTextures = function (context, node, babylonMaterial) {
        var additionalTextures = [];
        if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial) {
            if (this._isExtensionEnabled(babylonMaterial)) {
                if (babylonMaterial.subSurface.thicknessTexture) {
                    additionalTextures.push(babylonMaterial.subSurface.thicknessTexture);
                }
                return additionalTextures;
            }
        }
        return additionalTextures;
    };
    KHR_materials_volume.prototype._isExtensionEnabled = function (mat) {
        // This extension must not be used on a material that also uses KHR_materials_unlit
        if (mat.unlit) {
            return false;
        }
        var subs = mat.subSurface;
        // this extension requires either the KHR_materials_transmission or KHR_materials_translucency extensions.
        if (!subs.isRefractionEnabled && !subs.isTranslucencyEnabled) {
            return false;
        }
        return ((subs.maximumThickness != undefined && subs.maximumThickness != 0) ||
            (subs.tintColorAtDistance != undefined && subs.tintColorAtDistance != Number.POSITIVE_INFINITY) ||
            (subs.tintColor != undefined && subs.tintColor != babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.Color3.White()) ||
            this._hasTexturesExtension(mat));
    };
    KHR_materials_volume.prototype._hasTexturesExtension = function (mat) {
        return mat.subSurface.thicknessTexture != null;
    };
    KHR_materials_volume.prototype.postExportMaterialAsync = function (context, node, babylonMaterial) {
        var _this = this;
        return new Promise(function (resolve) {
            var _a;
            if (babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRMaterial && _this._isExtensionEnabled(babylonMaterial)) {
                _this._wasUsed = true;
                var subs = babylonMaterial.subSurface;
                var thicknessFactor = subs.maximumThickness == 0 ? undefined : subs.maximumThickness;
                var thicknessTexture = (_a = _this._exporter._glTFMaterialExporter._getTextureInfo(subs.thicknessTexture)) !== null && _a !== void 0 ? _a : undefined;
                var attenuationDistance = subs.tintColorAtDistance == Number.POSITIVE_INFINITY ? undefined : subs.tintColorAtDistance;
                var attenuationColor = subs.tintColor.equalsFloats(1.0, 1.0, 1.0) ? undefined : subs.tintColor.asArray();
                var volumeInfo = {
                    thicknessFactor: thicknessFactor,
                    thicknessTexture: thicknessTexture,
                    attenuationDistance: attenuationDistance,
                    attenuationColor: attenuationColor,
                    hasTextures: function () {
                        return _this._hasTexturesExtension(babylonMaterial);
                    },
                };
                node.extensions = node.extensions || {};
                node.extensions[NAME] = volumeInfo;
            }
            resolve(node);
        });
    };
    return KHR_materials_volume;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter.RegisterExtension(NAME, function (exporter) { return new KHR_materials_volume(exporter); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_texture_transform.ts":
/*!*********************************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/KHR_texture_transform.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_texture_transform: () => (/* binding */ KHR_texture_transform)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");


var NAME = "KHR_texture_transform";
/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_texture_transform = /** @class */ (function () {
    function KHR_texture_transform() {
        /** Name of this extension */
        this.name = NAME;
        /** Defines whether this extension is enabled */
        this.enabled = true;
        /** Defines whether this extension is required */
        this.required = false;
        /** Reference to the glTF exporter */
        this._wasUsed = false;
    }
    KHR_texture_transform.prototype.dispose = function () { };
    Object.defineProperty(KHR_texture_transform.prototype, "wasUsed", {
        /** @internal */
        get: function () {
            return this._wasUsed;
        },
        enumerable: false,
        configurable: true
    });
    KHR_texture_transform.prototype.postExportTexture = function (context, textureInfo, babylonTexture) {
        var canUseExtension = babylonTexture &&
            ((babylonTexture.uAng === 0 && babylonTexture.wAng === 0 && babylonTexture.vAng === 0) ||
                (babylonTexture.uRotationCenter === 0 && babylonTexture.vRotationCenter === 0));
        if (canUseExtension) {
            var textureTransform = {};
            var transformIsRequired = false;
            if (babylonTexture.uOffset !== 0 || babylonTexture.vOffset !== 0) {
                textureTransform.offset = [babylonTexture.uOffset, babylonTexture.vOffset];
                transformIsRequired = true;
            }
            if (babylonTexture.uScale !== 1 || babylonTexture.vScale !== 1) {
                textureTransform.scale = [babylonTexture.uScale, babylonTexture.vScale];
                transformIsRequired = true;
            }
            if (babylonTexture.wAng !== 0) {
                textureTransform.rotation = -babylonTexture.wAng;
                transformIsRequired = true;
            }
            if (babylonTexture.coordinatesIndex !== 0) {
                textureTransform.texCoord = babylonTexture.coordinatesIndex;
                transformIsRequired = true;
            }
            if (!transformIsRequired) {
                return;
            }
            this._wasUsed = true;
            if (!textureInfo.extensions) {
                textureInfo.extensions = {};
            }
            textureInfo.extensions[NAME] = textureTransform;
        }
    };
    KHR_texture_transform.prototype.preExportTextureAsync = function (context, babylonTexture) {
        return new Promise(function (resolve, reject) {
            var scene = babylonTexture.getScene();
            if (!scene) {
                reject("".concat(context, ": \"scene\" is not defined for Babylon texture ").concat(babylonTexture.name, "!"));
                return;
            }
            /*
             * The KHR_texture_transform schema only supports w rotation around the origin.
             * See https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_transform#gltf-schema-updates.
             */
            if (babylonTexture.uAng !== 0 || babylonTexture.vAng !== 0) {
                babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("".concat(context, ": Texture ").concat(babylonTexture.name, " with rotation in the u or v axis is not supported in glTF."));
                resolve(null);
            }
            else if (babylonTexture.wAng !== 0 && (babylonTexture.uRotationCenter !== 0 || babylonTexture.vRotationCenter !== 0)) {
                babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("".concat(context, ": Texture ").concat(babylonTexture.name, " with rotation not centered at the origin cannot be exported with ").concat(NAME));
                resolve(null);
            }
            else {
                resolve(babylonTexture);
            }
        });
    };
    return KHR_texture_transform;
}());

_glTFExporter__WEBPACK_IMPORTED_MODULE_1__._Exporter.RegisterExtension(NAME, function () { return new KHR_texture_transform(); });


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/Extensions/index.ts":
/*!*****************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/Extensions/index.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ _EXT_mesh_gpu_instancing__WEBPACK_IMPORTED_MODULE_11__.EXT_mesh_gpu_instancing),
/* harmony export */   KHR_lights_punctual: () => (/* reexport safe */ _KHR_lights_punctual__WEBPACK_IMPORTED_MODULE_1__.KHR_lights_punctual),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ _KHR_materials_anisotropy__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ _KHR_materials_clearcoat__WEBPACK_IMPORTED_MODULE_2__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ _KHR_materials_emissive_strength__WEBPACK_IMPORTED_MODULE_12__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ _KHR_materials_ior__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ _KHR_materials_iridescence__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ _KHR_materials_sheen__WEBPACK_IMPORTED_MODULE_5__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ _KHR_materials_specular__WEBPACK_IMPORTED_MODULE_8__.KHR_materials_specular),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ _KHR_materials_transmission__WEBPACK_IMPORTED_MODULE_10__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ _KHR_materials_unlit__WEBPACK_IMPORTED_MODULE_6__.KHR_materials_unlit),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ _KHR_materials_volume__WEBPACK_IMPORTED_MODULE_9__.KHR_materials_volume),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ _KHR_texture_transform__WEBPACK_IMPORTED_MODULE_0__.KHR_texture_transform)
/* harmony export */ });
/* harmony import */ var _KHR_texture_transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KHR_texture_transform */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_texture_transform.ts");
/* harmony import */ var _KHR_lights_punctual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KHR_lights_punctual */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_lights_punctual.ts");
/* harmony import */ var _KHR_materials_clearcoat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./KHR_materials_clearcoat */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_clearcoat.ts");
/* harmony import */ var _KHR_materials_iridescence__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./KHR_materials_iridescence */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_iridescence.ts");
/* harmony import */ var _KHR_materials_anisotropy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./KHR_materials_anisotropy */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_anisotropy.ts");
/* harmony import */ var _KHR_materials_sheen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./KHR_materials_sheen */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_sheen.ts");
/* harmony import */ var _KHR_materials_unlit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./KHR_materials_unlit */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_unlit.ts");
/* harmony import */ var _KHR_materials_ior__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./KHR_materials_ior */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_ior.ts");
/* harmony import */ var _KHR_materials_specular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./KHR_materials_specular */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_specular.ts");
/* harmony import */ var _KHR_materials_volume__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./KHR_materials_volume */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_volume.ts");
/* harmony import */ var _KHR_materials_transmission__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./KHR_materials_transmission */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_transmission.ts");
/* harmony import */ var _EXT_mesh_gpu_instancing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./EXT_mesh_gpu_instancing */ "../../../dev/serializers/src/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.ts");
/* harmony import */ var _KHR_materials_emissive_strength__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./KHR_materials_emissive_strength */ "../../../dev/serializers/src/glTF/2.0/Extensions/KHR_materials_emissive_strength.ts");















/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFAnimation.ts":
/*!**************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFAnimation.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _GLTFAnimation: () => (/* binding */ _GLTFAnimation)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Lights/light */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFUtilities */ "../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts");










/**
 * @internal
 * Enum for handling in tangent and out tangent.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var _TangentType;
(function (_TangentType) {
    /**
     * Specifies that input tangents are used.
     */
    _TangentType[_TangentType["INTANGENT"] = 0] = "INTANGENT";
    /**
     * Specifies that output tangents are used.
     */
    _TangentType[_TangentType["OUTTANGENT"] = 1] = "OUTTANGENT";
})(_TangentType || (_TangentType = {}));
/**
 * @internal
 * Utility class for generating glTF animation data from BabylonJS.
 */
var _GLTFAnimation = /** @class */ (function () {
    function _GLTFAnimation() {
    }
    /**
     * Determine if a node is transformable - ie has properties it should be part of animation of transformation.
     * @param babylonNode the node to test
     * @returns true if can be animated, false otherwise. False if the parameter is null or undefined.
     */
    _GLTFAnimation._IsTransformable = function (babylonNode) {
        return babylonNode && (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TransformNode || babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera || babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light);
    };
    /**
     * @ignore
     *
     * Creates glTF channel animation from BabylonJS animation.
     * @param babylonTransformNode - BabylonJS mesh.
     * @param animation - animation.
     * @param animationChannelTargetPath - The target animation channel.
     * @param useQuaternion - Specifies if quaternions are used.
     * @returns nullable IAnimationData
     */
    _GLTFAnimation._CreateNodeAnimation = function (babylonTransformNode, animation, animationChannelTargetPath, useQuaternion, animationSampleRate) {
        if (this._IsTransformable(babylonTransformNode)) {
            var inputs = [];
            var outputs = [];
            var keyFrames = animation.getKeys();
            var minMaxKeyFrames = _GLTFAnimation._CalculateMinMaxKeyFrames(keyFrames);
            var interpolationOrBake = _GLTFAnimation._DeduceInterpolation(keyFrames, animationChannelTargetPath, useQuaternion);
            var interpolation = interpolationOrBake.interpolationType;
            var shouldBakeAnimation = interpolationOrBake.shouldBakeAnimation;
            if (shouldBakeAnimation) {
                _GLTFAnimation._CreateBakedAnimation(babylonTransformNode, animation, animationChannelTargetPath, minMaxKeyFrames.min, minMaxKeyFrames.max, animation.framePerSecond, animationSampleRate, inputs, outputs, minMaxKeyFrames, useQuaternion);
            }
            else {
                if (interpolation === "LINEAR" /* AnimationSamplerInterpolation.LINEAR */ || interpolation === "STEP" /* AnimationSamplerInterpolation.STEP */) {
                    _GLTFAnimation._CreateLinearOrStepAnimation(babylonTransformNode, animation, animationChannelTargetPath, inputs, outputs, useQuaternion);
                }
                else if (interpolation === "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */) {
                    _GLTFAnimation._CreateCubicSplineAnimation(babylonTransformNode, animation, animationChannelTargetPath, inputs, outputs, useQuaternion);
                }
                else {
                    _GLTFAnimation._CreateBakedAnimation(babylonTransformNode, animation, animationChannelTargetPath, minMaxKeyFrames.min, minMaxKeyFrames.max, animation.framePerSecond, animationSampleRate, inputs, outputs, minMaxKeyFrames, useQuaternion);
                }
            }
            if (inputs.length && outputs.length) {
                var result = {
                    inputs: inputs,
                    outputs: outputs,
                    samplerInterpolation: interpolation,
                    inputsMin: shouldBakeAnimation ? minMaxKeyFrames.min : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.FloatRound(minMaxKeyFrames.min / animation.framePerSecond),
                    inputsMax: shouldBakeAnimation ? minMaxKeyFrames.max : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.FloatRound(minMaxKeyFrames.max / animation.framePerSecond),
                };
                return result;
            }
        }
        return null;
    };
    _GLTFAnimation._DeduceAnimationInfo = function (animation) {
        var animationChannelTargetPath = null;
        var dataAccessorType = "VEC3" /* AccessorType.VEC3 */;
        var useQuaternion = false;
        var property = animation.targetProperty.split(".");
        switch (property[0]) {
            case "scaling": {
                animationChannelTargetPath = "scale" /* AnimationChannelTargetPath.SCALE */;
                break;
            }
            case "position": {
                animationChannelTargetPath = "translation" /* AnimationChannelTargetPath.TRANSLATION */;
                break;
            }
            case "rotation": {
                dataAccessorType = "VEC4" /* AccessorType.VEC4 */;
                animationChannelTargetPath = "rotation" /* AnimationChannelTargetPath.ROTATION */;
                break;
            }
            case "rotationQuaternion": {
                dataAccessorType = "VEC4" /* AccessorType.VEC4 */;
                useQuaternion = true;
                animationChannelTargetPath = "rotation" /* AnimationChannelTargetPath.ROTATION */;
                break;
            }
            case "influence": {
                dataAccessorType = "SCALAR" /* AccessorType.SCALAR */;
                animationChannelTargetPath = "weights" /* AnimationChannelTargetPath.WEIGHTS */;
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported animatable property ".concat(property[0]));
            }
        }
        if (animationChannelTargetPath) {
            return { animationChannelTargetPath: animationChannelTargetPath, dataAccessorType: dataAccessorType, useQuaternion: useQuaternion };
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("animation channel target path and data accessor type could be deduced");
        }
        return null;
    };
    /**
     * @ignore
     * Create node animations from the transform node animations
     * @param babylonNode
     * @param runtimeGLTFAnimation
     * @param idleGLTFAnimations
     * @param nodeMap
     * @param nodes
     * @param binaryWriter
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    _GLTFAnimation._CreateNodeAnimationFromNodeAnimations = function (babylonNode, runtimeGLTFAnimation, idleGLTFAnimations, nodeMap, nodes, binaryWriter, bufferViews, accessors, animationSampleRate, shouldExportAnimation) {
        var glTFAnimation;
        if (_GLTFAnimation._IsTransformable(babylonNode)) {
            if (babylonNode.animations) {
                for (var _i = 0, _a = babylonNode.animations; _i < _a.length; _i++) {
                    var animation = _a[_i];
                    if (shouldExportAnimation && !shouldExportAnimation(animation)) {
                        continue;
                    }
                    var animationInfo = _GLTFAnimation._DeduceAnimationInfo(animation);
                    if (animationInfo) {
                        glTFAnimation = {
                            name: animation.name,
                            samplers: [],
                            channels: [],
                        };
                        _GLTFAnimation._AddAnimation("".concat(animation.name), animation.hasRunningRuntimeAnimations ? runtimeGLTFAnimation : glTFAnimation, babylonNode, animation, animationInfo.dataAccessorType, animationInfo.animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, animationInfo.useQuaternion, animationSampleRate);
                        if (glTFAnimation.samplers.length && glTFAnimation.channels.length) {
                            idleGLTFAnimations.push(glTFAnimation);
                        }
                    }
                }
            }
        }
    };
    /**
     * @ignore
     * Create individual morph animations from the mesh's morph target animation tracks
     * @param babylonNode
     * @param runtimeGLTFAnimation
     * @param idleGLTFAnimations
     * @param nodeMap
     * @param nodes
     * @param binaryWriter
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    _GLTFAnimation._CreateMorphTargetAnimationFromMorphTargetAnimations = function (babylonNode, runtimeGLTFAnimation, idleGLTFAnimations, nodeMap, nodes, binaryWriter, bufferViews, accessors, animationSampleRate, shouldExportAnimation) {
        var glTFAnimation;
        if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
            var morphTargetManager = babylonNode.morphTargetManager;
            if (morphTargetManager) {
                for (var i = 0; i < morphTargetManager.numTargets; ++i) {
                    var morphTarget = morphTargetManager.getTarget(i);
                    for (var _i = 0, _a = morphTarget.animations; _i < _a.length; _i++) {
                        var animation = _a[_i];
                        if (shouldExportAnimation && !shouldExportAnimation(animation)) {
                            continue;
                        }
                        var combinedAnimation = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation("".concat(animation.name), "influence", animation.framePerSecond, animation.dataType, animation.loopMode, animation.enableBlending);
                        var combinedAnimationKeys = [];
                        var animationKeys = animation.getKeys();
                        for (var j = 0; j < animationKeys.length; ++j) {
                            var animationKey = animationKeys[j];
                            for (var k = 0; k < morphTargetManager.numTargets; ++k) {
                                if (k == i) {
                                    combinedAnimationKeys.push(animationKey);
                                }
                                else {
                                    combinedAnimationKeys.push({ frame: animationKey.frame, value: 0 });
                                }
                            }
                        }
                        combinedAnimation.setKeys(combinedAnimationKeys);
                        var animationInfo = _GLTFAnimation._DeduceAnimationInfo(combinedAnimation);
                        if (animationInfo) {
                            glTFAnimation = {
                                name: combinedAnimation.name,
                                samplers: [],
                                channels: [],
                            };
                            _GLTFAnimation._AddAnimation(animation.name, animation.hasRunningRuntimeAnimations ? runtimeGLTFAnimation : glTFAnimation, babylonNode, combinedAnimation, animationInfo.dataAccessorType, animationInfo.animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, animationInfo.useQuaternion, animationSampleRate, morphTargetManager.numTargets);
                            if (glTFAnimation.samplers.length && glTFAnimation.channels.length) {
                                idleGLTFAnimations.push(glTFAnimation);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * @ignore
     * Create node and morph animations from the animation groups
     * @param babylonScene
     * @param glTFAnimations
     * @param nodeMap
     * @param nodes
     * @param binaryWriter
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    _GLTFAnimation._CreateNodeAndMorphAnimationFromAnimationGroups = function (babylonScene, glTFAnimations, nodeMap, binaryWriter, bufferViews, accessors, animationSampleRate, shouldExportAnimation) {
        var _a;
        var glTFAnimation;
        if (babylonScene.animationGroups) {
            var animationGroups = babylonScene.animationGroups;
            var _loop_1 = function (animationGroup) {
                var morphAnimations = new Map();
                var sampleAnimations = new Map();
                var morphAnimationMeshes = new Set();
                var animationGroupFrameDiff = animationGroup.to - animationGroup.from;
                glTFAnimation = {
                    name: animationGroup.name,
                    channels: [],
                    samplers: [],
                };
                var _loop_2 = function (i) {
                    var targetAnimation = animationGroup.targetedAnimations[i];
                    var target = targetAnimation.target;
                    var animation = targetAnimation.animation;
                    if (shouldExportAnimation && !shouldExportAnimation(animation)) {
                        return "continue";
                    }
                    if (this_1._IsTransformable(target) || (target.length === 1 && this_1._IsTransformable(target[0]))) {
                        var animationInfo = _GLTFAnimation._DeduceAnimationInfo(targetAnimation.animation);
                        if (animationInfo) {
                            var babylonTransformNode = this_1._IsTransformable(target) ? target : this_1._IsTransformable(target[0]) ? target[0] : null;
                            if (babylonTransformNode) {
                                _GLTFAnimation._AddAnimation("".concat(animation.name), glTFAnimation, babylonTransformNode, animation, animationInfo.dataAccessorType, animationInfo.animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, animationInfo.useQuaternion, animationSampleRate);
                            }
                        }
                    }
                    else if (target instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MorphTarget || (target.length === 1 && target[0] instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MorphTarget)) {
                        var animationInfo = _GLTFAnimation._DeduceAnimationInfo(targetAnimation.animation);
                        if (animationInfo) {
                            var babylonMorphTarget_1 = target instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MorphTarget ? target : target[0];
                            if (babylonMorphTarget_1) {
                                var babylonMorphTargetManager_1 = babylonScene.morphTargetManagers.find(function (morphTargetManager) {
                                    for (var j = 0; j < morphTargetManager.numTargets; ++j) {
                                        if (morphTargetManager.getTarget(j) === babylonMorphTarget_1) {
                                            return true;
                                        }
                                    }
                                    return false;
                                });
                                if (babylonMorphTargetManager_1) {
                                    var babylonMesh = babylonScene.meshes.find(function (mesh) {
                                        return mesh.morphTargetManager === babylonMorphTargetManager_1;
                                    });
                                    if (babylonMesh) {
                                        if (!morphAnimations.has(babylonMesh)) {
                                            morphAnimations.set(babylonMesh, new Map());
                                        }
                                        (_a = morphAnimations.get(babylonMesh)) === null || _a === void 0 ? void 0 : _a.set(babylonMorphTarget_1, animation);
                                        morphAnimationMeshes.add(babylonMesh);
                                        sampleAnimations.set(babylonMesh, animation);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        // this is the place for the KHR_animation_pointer.
                    }
                };
                for (var i = 0; i < animationGroup.targetedAnimations.length; ++i) {
                    _loop_2(i);
                }
                morphAnimationMeshes.forEach(function (mesh) {
                    var morphTargetManager = mesh.morphTargetManager;
                    var combinedAnimationGroup = null;
                    var animationKeys = [];
                    var sampleAnimation = sampleAnimations.get(mesh);
                    var sampleAnimationKeys = sampleAnimation.getKeys();
                    var numAnimationKeys = sampleAnimationKeys.length;
                    /*
                        Due to how glTF expects morph target animation data to be formatted, we need to rearrange the individual morph target animation tracks,
                        such that we have a single animation, where a given keyframe input value has successive output values for each morph target belonging to the manager.
                        See: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations

                        We do this via constructing a new Animation track, and interleaving the frames of each morph target animation track in the current Animation Group
                        We reuse the Babylon Animation data structure for ease of handling export of cubic spline animation keys, and to reuse the
                        existing _GLTFAnimation.AddAnimation codepath with minimal modification, however the constructed Babylon Animation is NOT intended for use in-engine.
                    */
                    for (var i = 0; i < numAnimationKeys; ++i) {
                        for (var j = 0; j < morphTargetManager.numTargets; ++j) {
                            var morphTarget = morphTargetManager.getTarget(j);
                            var animationsByMorphTarget = morphAnimations.get(mesh);
                            if (animationsByMorphTarget) {
                                var morphTargetAnimation = animationsByMorphTarget.get(morphTarget);
                                if (morphTargetAnimation) {
                                    if (!combinedAnimationGroup) {
                                        combinedAnimationGroup = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation("".concat(animationGroup.name, "_").concat(mesh.name, "_MorphWeightAnimation"), "influence", morphTargetAnimation.framePerSecond, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, morphTargetAnimation.loopMode, morphTargetAnimation.enableBlending);
                                    }
                                    animationKeys.push(morphTargetAnimation.getKeys()[i]);
                                }
                                else {
                                    animationKeys.push({
                                        frame: animationGroup.from + (animationGroupFrameDiff / numAnimationKeys) * i,
                                        value: morphTarget.influence,
                                        inTangent: sampleAnimationKeys[0].inTangent ? 0 : undefined,
                                        outTangent: sampleAnimationKeys[0].outTangent ? 0 : undefined,
                                    });
                                }
                            }
                        }
                    }
                    combinedAnimationGroup.setKeys(animationKeys);
                    var animationInfo = _GLTFAnimation._DeduceAnimationInfo(combinedAnimationGroup);
                    if (animationInfo) {
                        _GLTFAnimation._AddAnimation("".concat(animationGroup.name, "_").concat(mesh.name, "_MorphWeightAnimation"), glTFAnimation, mesh, combinedAnimationGroup, animationInfo.dataAccessorType, animationInfo.animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, animationInfo.useQuaternion, animationSampleRate, morphTargetManager === null || morphTargetManager === void 0 ? void 0 : morphTargetManager.numTargets);
                    }
                });
                if (glTFAnimation.channels.length && glTFAnimation.samplers.length) {
                    glTFAnimations.push(glTFAnimation);
                }
            };
            var this_1 = this;
            for (var _i = 0, animationGroups_1 = animationGroups; _i < animationGroups_1.length; _i++) {
                var animationGroup = animationGroups_1[_i];
                _loop_1(animationGroup);
            }
        }
    };
    _GLTFAnimation._AddAnimation = function (name, glTFAnimation, babylonTransformNode, animation, dataAccessorType, animationChannelTargetPath, nodeMap, binaryWriter, bufferViews, accessors, useQuaternion, animationSampleRate, morphAnimationChannels) {
        var animationData = _GLTFAnimation._CreateNodeAnimation(babylonTransformNode, animation, animationChannelTargetPath, useQuaternion, animationSampleRate);
        var bufferView;
        var accessor;
        var keyframeAccessorIndex;
        var dataAccessorIndex;
        var outputLength;
        var animationSampler;
        var animationChannel;
        if (animationData) {
            /*
             * Now that we have the glTF converted morph target animation data,
             * we can remove redundant input data so that we have n input frames,
             * and morphAnimationChannels * n output frames
             */
            if (morphAnimationChannels) {
                var index = 0;
                var currentInput = 0;
                var newInputs = [];
                while (animationData.inputs.length > 0) {
                    currentInput = animationData.inputs.shift();
                    if (index % morphAnimationChannels == 0) {
                        newInputs.push(currentInput);
                    }
                    index++;
                }
                animationData.inputs = newInputs;
            }
            var nodeIndex = nodeMap[babylonTransformNode.uniqueId];
            // Creates buffer view and accessor for key frames.
            var byteLength = animationData.inputs.length * 4;
            bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, undefined, "".concat(name, "  keyframe data view"));
            bufferViews.push(bufferView);
            animationData.inputs.forEach(function (input) {
                binaryWriter.setFloat32(input);
            });
            accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._CreateAccessor(bufferViews.length - 1, "".concat(name, "  keyframes"), "SCALAR" /* AccessorType.SCALAR */, 5126 /* AccessorComponentType.FLOAT */, animationData.inputs.length, null, [animationData.inputsMin], [animationData.inputsMax]);
            accessors.push(accessor);
            keyframeAccessorIndex = accessors.length - 1;
            // create bufferview and accessor for keyed values.
            outputLength = animationData.outputs.length;
            byteLength = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._GetDataAccessorElementCount(dataAccessorType) * 4 * animationData.outputs.length;
            // check for in and out tangents
            bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, undefined, "".concat(name, "  data view"));
            bufferViews.push(bufferView);
            animationData.outputs.forEach(function (output) {
                output.forEach(function (entry) {
                    binaryWriter.setFloat32(entry);
                });
            });
            accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_1__._GLTFUtilities._CreateAccessor(bufferViews.length - 1, "".concat(name, "  data"), dataAccessorType, 5126 /* AccessorComponentType.FLOAT */, outputLength, null, null, null);
            accessors.push(accessor);
            dataAccessorIndex = accessors.length - 1;
            // create sampler
            animationSampler = {
                interpolation: animationData.samplerInterpolation,
                input: keyframeAccessorIndex,
                output: dataAccessorIndex,
            };
            glTFAnimation.samplers.push(animationSampler);
            // create channel
            animationChannel = {
                sampler: glTFAnimation.samplers.length - 1,
                target: {
                    node: nodeIndex,
                    path: animationChannelTargetPath,
                },
            };
            glTFAnimation.channels.push(animationChannel);
        }
    };
    /**
     * Create a baked animation
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation corresponding to the BabylonJS mesh
     * @param animationChannelTargetPath animation target channel
     * @param minFrame minimum animation frame
     * @param maxFrame maximum animation frame
     * @param fps frames per second of the animation
     * @param sampleRate
     * @param inputs input key frames of the animation
     * @param outputs output key frame data of the animation
     * @param minMaxFrames
     * @param minMaxFrames.min
     * @param minMaxFrames.max
     * @param useQuaternion specifies if quaternions should be used
     */
    _GLTFAnimation._CreateBakedAnimation = function (babylonTransformNode, animation, animationChannelTargetPath, minFrame, maxFrame, fps, sampleRate, inputs, outputs, minMaxFrames, useQuaternion) {
        var value;
        var quaternionCache = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity();
        var previousTime = null;
        var time;
        var maxUsedFrame = null;
        var currKeyFrame = null;
        var nextKeyFrame = null;
        var prevKeyFrame = null;
        var endFrame = null;
        minMaxFrames.min = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.FloatRound(minFrame / fps);
        var keyFrames = animation.getKeys();
        for (var i = 0, length_1 = keyFrames.length; i < length_1; ++i) {
            endFrame = null;
            currKeyFrame = keyFrames[i];
            if (i + 1 < length_1) {
                nextKeyFrame = keyFrames[i + 1];
                if ((currKeyFrame.value.equals && currKeyFrame.value.equals(nextKeyFrame.value)) || currKeyFrame.value === nextKeyFrame.value) {
                    if (i === 0) {
                        // set the first frame to itself
                        endFrame = currKeyFrame.frame;
                    }
                    else {
                        continue;
                    }
                }
                else {
                    endFrame = nextKeyFrame.frame;
                }
            }
            else {
                // at the last key frame
                prevKeyFrame = keyFrames[i - 1];
                if ((currKeyFrame.value.equals && currKeyFrame.value.equals(prevKeyFrame.value)) || currKeyFrame.value === prevKeyFrame.value) {
                    continue;
                }
                else {
                    endFrame = maxFrame;
                }
            }
            if (endFrame) {
                for (var f = currKeyFrame.frame; f <= endFrame; f += sampleRate) {
                    time = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.FloatRound(f / fps);
                    if (time === previousTime) {
                        continue;
                    }
                    previousTime = time;
                    maxUsedFrame = time;
                    var state = {
                        key: 0,
                        repeatCount: 0,
                        loopMode: animation.loopMode,
                    };
                    value = animation._interpolate(f, state);
                    _GLTFAnimation._SetInterpolatedValue(babylonTransformNode, value, time, animation, animationChannelTargetPath, quaternionCache, inputs, outputs, useQuaternion);
                }
            }
        }
        if (maxUsedFrame) {
            minMaxFrames.max = maxUsedFrame;
        }
    };
    _GLTFAnimation._ConvertFactorToVector3OrQuaternion = function (factor, babylonTransformNode, animation, animationChannelTargetPath, useQuaternion) {
        var basePositionRotationOrScale = _GLTFAnimation._GetBasePositionRotationOrScale(babylonTransformNode, animationChannelTargetPath, useQuaternion);
        // handles single component x, y, z or w component animation by using a base property and animating over a component.
        var property = animation.targetProperty.split(".");
        var componentName = property ? property[1] : ""; // x, y, z, or w component
        var value = useQuaternion ? babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(basePositionRotationOrScale).normalize() : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(basePositionRotationOrScale);
        switch (componentName) {
            case "x":
            case "y":
            case "z": {
                value[componentName] = factor;
                break;
            }
            case "w": {
                value.w = factor;
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("glTFAnimation: Unsupported component name \"".concat(componentName, "\"!"));
            }
        }
        return value;
    };
    _GLTFAnimation._SetInterpolatedValue = function (babylonTransformNode, value, time, animation, animationChannelTargetPath, quaternionCache, inputs, outputs, useQuaternion) {
        var cacheValue;
        inputs.push(time);
        if (animationChannelTargetPath === "weights" /* AnimationChannelTargetPath.WEIGHTS */) {
            outputs.push([value]);
            return;
        }
        if (animation.dataType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT) {
            value = this._ConvertFactorToVector3OrQuaternion(value, babylonTransformNode, animation, animationChannelTargetPath, useQuaternion);
        }
        if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
            if (useQuaternion) {
                quaternionCache = value;
            }
            else {
                cacheValue = value;
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRollToRef(cacheValue.y, cacheValue.x, cacheValue.z, quaternionCache);
            }
            outputs.push(quaternionCache.asArray());
        }
        else {
            // scaling and position animation
            cacheValue = value;
            outputs.push(cacheValue.asArray());
        }
    };
    /**
     * Creates linear animation from the animation key frames
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation
     * @param animationChannelTargetPath The target animation channel
     * @param inputs Array to store the key frame times
     * @param outputs Array to store the key frame data
     * @param useQuaternion Specifies if quaternions are used in the animation
     */
    _GLTFAnimation._CreateLinearOrStepAnimation = function (babylonTransformNode, animation, animationChannelTargetPath, inputs, outputs, useQuaternion) {
        for (var _i = 0, _a = animation.getKeys(); _i < _a.length; _i++) {
            var keyFrame = _a[_i];
            inputs.push(keyFrame.frame / animation.framePerSecond); // keyframes in seconds.
            _GLTFAnimation._AddKeyframeValue(keyFrame, animation, outputs, animationChannelTargetPath, babylonTransformNode, useQuaternion);
        }
    };
    /**
     * Creates cubic spline animation from the animation key frames
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation
     * @param animationChannelTargetPath The target animation channel
     * @param frameDelta The difference between the last and first frame of the animation
     * @param inputs Array to store the key frame times
     * @param outputs Array to store the key frame data
     * @param useQuaternion Specifies if quaternions are used in the animation
     */
    _GLTFAnimation._CreateCubicSplineAnimation = function (babylonTransformNode, animation, animationChannelTargetPath, inputs, outputs, useQuaternion) {
        animation.getKeys().forEach(function (keyFrame) {
            inputs.push(keyFrame.frame / animation.framePerSecond); // keyframes in seconds.
            _GLTFAnimation._AddSplineTangent(_TangentType.INTANGENT, outputs, animationChannelTargetPath, "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */, keyFrame, useQuaternion);
            _GLTFAnimation._AddKeyframeValue(keyFrame, animation, outputs, animationChannelTargetPath, babylonTransformNode, useQuaternion);
            _GLTFAnimation._AddSplineTangent(_TangentType.OUTTANGENT, outputs, animationChannelTargetPath, "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */, keyFrame, useQuaternion);
        });
    };
    _GLTFAnimation._GetBasePositionRotationOrScale = function (babylonTransformNode, animationChannelTargetPath, useQuaternion) {
        var basePositionRotationOrScale;
        if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
            if (useQuaternion) {
                var q = babylonTransformNode.rotationQuaternion;
                basePositionRotationOrScale = (q !== null && q !== void 0 ? q : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity()).asArray();
            }
            else {
                var r = babylonTransformNode.rotation;
                basePositionRotationOrScale = (r !== null && r !== void 0 ? r : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero()).asArray();
            }
        }
        else if (animationChannelTargetPath === "translation" /* AnimationChannelTargetPath.TRANSLATION */) {
            var p = babylonTransformNode.position;
            basePositionRotationOrScale = (p !== null && p !== void 0 ? p : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero()).asArray();
        }
        else {
            // scale
            var s = babylonTransformNode.scaling;
            basePositionRotationOrScale = (s !== null && s !== void 0 ? s : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.One()).asArray();
        }
        return basePositionRotationOrScale;
    };
    /**
     * Adds a key frame value
     * @param keyFrame
     * @param animation
     * @param outputs
     * @param animationChannelTargetPath
     * @param babylonTransformNode
     * @param useQuaternion
     */
    _GLTFAnimation._AddKeyframeValue = function (keyFrame, animation, outputs, animationChannelTargetPath, babylonTransformNode, useQuaternion) {
        var newPositionRotationOrScale;
        var animationType = animation.dataType;
        if (animationType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_VECTOR3) {
            var value = keyFrame.value.asArray();
            if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
                var array = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(value);
                var rotationQuaternion = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRoll(array.y, array.x, array.z);
                value = rotationQuaternion.asArray();
            }
            outputs.push(value); // scale  vector.
        }
        else if (animationType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT) {
            if (animationChannelTargetPath === "weights" /* AnimationChannelTargetPath.WEIGHTS */) {
                outputs.push([keyFrame.value]);
            }
            else {
                // handles single component x, y, z or w component animation by using a base property and animating over a component.
                newPositionRotationOrScale = this._ConvertFactorToVector3OrQuaternion(keyFrame.value, babylonTransformNode, animation, animationChannelTargetPath, useQuaternion);
                if (newPositionRotationOrScale) {
                    if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
                        var posRotScale = useQuaternion
                            ? newPositionRotationOrScale
                            : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRoll(newPositionRotationOrScale.y, newPositionRotationOrScale.x, newPositionRotationOrScale.z).normalize();
                        outputs.push(posRotScale.asArray());
                    }
                    outputs.push(newPositionRotationOrScale.asArray());
                }
            }
        }
        else if (animationType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_QUATERNION) {
            outputs.push(keyFrame.value.normalize().asArray());
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("glTFAnimation: Unsupported key frame values for animation!");
        }
    };
    /**
     * Determine the interpolation based on the key frames
     * @param keyFrames
     * @param animationChannelTargetPath
     * @param useQuaternion
     */
    _GLTFAnimation._DeduceInterpolation = function (keyFrames, animationChannelTargetPath, useQuaternion) {
        var interpolationType;
        var shouldBakeAnimation = false;
        var key;
        if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */ && !useQuaternion) {
            return { interpolationType: "LINEAR" /* AnimationSamplerInterpolation.LINEAR */, shouldBakeAnimation: true };
        }
        for (var i = 0, length_2 = keyFrames.length; i < length_2; ++i) {
            key = keyFrames[i];
            if (key.inTangent || key.outTangent) {
                if (interpolationType) {
                    if (interpolationType !== "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */) {
                        interpolationType = "LINEAR" /* AnimationSamplerInterpolation.LINEAR */;
                        shouldBakeAnimation = true;
                        break;
                    }
                }
                else {
                    interpolationType = "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */;
                }
            }
            else {
                if (interpolationType) {
                    if (interpolationType === "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */ ||
                        (key.interpolation && key.interpolation === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.AnimationKeyInterpolation.STEP && interpolationType !== "STEP" /* AnimationSamplerInterpolation.STEP */)) {
                        interpolationType = "LINEAR" /* AnimationSamplerInterpolation.LINEAR */;
                        shouldBakeAnimation = true;
                        break;
                    }
                }
                else {
                    if (key.interpolation && key.interpolation === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.AnimationKeyInterpolation.STEP) {
                        interpolationType = "STEP" /* AnimationSamplerInterpolation.STEP */;
                    }
                    else {
                        interpolationType = "LINEAR" /* AnimationSamplerInterpolation.LINEAR */;
                    }
                }
            }
        }
        if (!interpolationType) {
            interpolationType = "LINEAR" /* AnimationSamplerInterpolation.LINEAR */;
        }
        return { interpolationType: interpolationType, shouldBakeAnimation: shouldBakeAnimation };
    };
    /**
     * Adds an input tangent or output tangent to the output data
     * If an input tangent or output tangent is missing, it uses the zero vector or zero quaternion
     * @param babylonTransformNode
     * @param tangentType Specifies which type of tangent to handle (inTangent or outTangent)
     * @param outputs The animation data by keyframe
     * @param animationChannelTargetPath The target animation channel
     * @param interpolation The interpolation type
     * @param keyFrame The key frame with the animation data
     * @param frameDelta Time difference between two frames used to scale the tangent by the frame delta
     * @param useQuaternion Specifies if quaternions are used
     */
    _GLTFAnimation._AddSplineTangent = function (tangentType, outputs, animationChannelTargetPath, interpolation, keyFrame, useQuaternion) {
        var tangent;
        var tangentValue = tangentType === _TangentType.INTANGENT ? keyFrame.inTangent : keyFrame.outTangent;
        if (interpolation === "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */) {
            if (animationChannelTargetPath === "rotation" /* AnimationChannelTargetPath.ROTATION */) {
                if (tangentValue) {
                    if (useQuaternion) {
                        tangent = tangentValue.asArray();
                    }
                    else {
                        var array = tangentValue;
                        tangent = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRoll(array.y, array.x, array.z).asArray();
                    }
                }
                else {
                    tangent = [0, 0, 0, 0];
                }
            }
            else if (animationChannelTargetPath === "weights" /* AnimationChannelTargetPath.WEIGHTS */) {
                if (tangentValue) {
                    tangent = [tangentValue];
                }
                else {
                    tangent = [0];
                }
            }
            else {
                if (tangentValue) {
                    tangent = tangentValue.asArray();
                }
                else {
                    tangent = [0, 0, 0];
                }
            }
            outputs.push(tangent);
        }
    };
    /**
     * Get the minimum and maximum key frames' frame values
     * @param keyFrames animation key frames
     * @returns the minimum and maximum key frame value
     */
    _GLTFAnimation._CalculateMinMaxKeyFrames = function (keyFrames) {
        var min = Infinity;
        var max = -Infinity;
        keyFrames.forEach(function (keyFrame) {
            min = Math.min(min, keyFrame.frame);
            max = Math.max(max, keyFrame.frame);
        });
        return { min: min, max: max };
    };
    return _GLTFAnimation;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFData.ts":
/*!*********************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFData.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFData: () => (/* binding */ GLTFData)
/* harmony export */ });
/**
 * Class for holding and downloading glTF file data
 */
var GLTFData = /** @class */ (function () {
    /**
     * Initializes the glTF file object
     */
    function GLTFData() {
        this.glTFFiles = {};
    }
    /**
     * Downloads the glTF data as files based on their names and data
     */
    GLTFData.prototype.downloadFiles = function () {
        /**
         * Checks for a matching suffix at the end of a string (for ES5 and lower)
         * @param str Source string
         * @param suffix Suffix to search for in the source string
         * @returns Boolean indicating whether the suffix was found (true) or not (false)
         */
        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        for (var key in this.glTFFiles) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.setAttribute("type", "hidden");
            link.download = key;
            var blob = this.glTFFiles[key];
            var mimeType = void 0;
            if (endsWith(key, ".glb")) {
                mimeType = { type: "model/gltf-binary" };
            }
            else if (endsWith(key, ".bin")) {
                mimeType = { type: "application/octet-stream" };
            }
            else if (endsWith(key, ".gltf")) {
                mimeType = { type: "model/gltf+json" };
            }
            else if (endsWith(key, ".jpeg") || endsWith(key, ".jpg")) {
                mimeType = { type: "image/jpeg" /* ImageMimeType.JPEG */ };
            }
            else if (endsWith(key, ".png")) {
                mimeType = { type: "image/png" /* ImageMimeType.PNG */ };
            }
            link.href = window.URL.createObjectURL(new Blob([blob], mimeType));
            link.click();
        }
    };
    return GLTFData;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts":
/*!*************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFExporter.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _BinaryWriter: () => (/* binding */ _BinaryWriter),
/* harmony export */   _Exporter: () => (/* binding */ _Exporter)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/multiMaterial */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFMaterialExporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFMaterialExporter */ "../../../dev/serializers/src/glTF/2.0/glTFMaterialExporter.ts");
/* harmony import */ var _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFUtilities */ "../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts");
/* harmony import */ var _glTFData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./glTFData */ "../../../dev/serializers/src/glTF/2.0/glTFData.ts");
/* harmony import */ var _glTFAnimation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./glTFAnimation */ "../../../dev/serializers/src/glTF/2.0/glTFAnimation.ts");



















// Matrix that converts handedness on the X-axis.
var convertHandednessMatrix = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.Compose(new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3(-1, 1, 1), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity(), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero());
function isNoopNode(node, useRightHandedSystem) {
    if (!(node instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TransformNode)) {
        return false;
    }
    // Transform
    if (useRightHandedSystem) {
        var matrix = node.getWorldMatrix();
        if (!matrix.isIdentity()) {
            return false;
        }
    }
    else {
        var matrix = node.getWorldMatrix().multiplyToRef(convertHandednessMatrix, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]);
        if (!matrix.isIdentity()) {
            return false;
        }
    }
    // Geometry
    if ((node instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh && node.geometry) || (node instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh && node.sourceMesh.geometry)) {
        return false;
    }
    return true;
}
function convertNodeHandedness(node) {
    var translation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(node.translation || [0, 0, 0], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0]);
    var rotation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArrayToRef(node.rotation || [0, 0, 0, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0]);
    var scale = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(node.scale || [1, 1, 1], 0, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1]);
    var matrix = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.ComposeToRef(scale, rotation, translation, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]).multiplyToRef(convertHandednessMatrix, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]);
    matrix.decompose(scale, rotation, translation);
    if (translation.equalsToFloats(0, 0, 0)) {
        delete node.translation;
    }
    else {
        node.translation = translation.asArray();
    }
    if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(rotation)) {
        delete node.rotation;
    }
    else {
        node.rotation = rotation.asArray();
    }
    if (scale.equalsToFloats(1, 1, 1)) {
        delete node.scale;
    }
    else {
        node.scale = scale.asArray();
    }
}
/**
 * Converts Babylon Scene into glTF 2.0.
 * @internal
 */
var _Exporter = /** @class */ (function () {
    /**
     * Creates a glTF Exporter instance, which can accept optional exporter options
     * @param babylonScene Babylon scene object
     * @param options Options to modify the behavior of the exporter
     */
    function _Exporter(babylonScene, options) {
        this._extensions = {};
        this._glTF = {
            asset: { generator: "Babylon.js v".concat(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Engine.Version), version: "2.0" },
        };
        babylonScene = babylonScene || babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.EngineStore.LastCreatedScene;
        if (!babylonScene) {
            return;
        }
        this._babylonScene = babylonScene;
        this._bufferViews = [];
        this._accessors = [];
        this._meshes = [];
        this._scenes = [];
        this._cameras = [];
        this._nodes = [];
        this._images = [];
        this._materials = [];
        this._materialMap = [];
        this._textures = [];
        this._samplers = [];
        this._skins = [];
        this._animations = [];
        this._imageData = {};
        this._orderedImageData = [];
        this._options = options || {};
        this._animationSampleRate = this._options.animationSampleRate || 1 / 60;
        this._glTFMaterialExporter = new _glTFMaterialExporter__WEBPACK_IMPORTED_MODULE_1__._GLTFMaterialExporter(this);
        this._loadExtensions();
    }
    _Exporter.prototype._applyExtension = function (node, extensions, index, actionAsync) {
        var _this = this;
        if (index >= extensions.length) {
            return Promise.resolve(node);
        }
        var currentPromise = actionAsync(extensions[index], node);
        if (!currentPromise) {
            return this._applyExtension(node, extensions, index + 1, actionAsync);
        }
        return currentPromise.then(function (newNode) { return _this._applyExtension(newNode, extensions, index + 1, actionAsync); });
    };
    _Exporter.prototype._applyExtensions = function (node, actionAsync) {
        var extensions = [];
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            extensions.push(this._extensions[name_1]);
        }
        return this._applyExtension(node, extensions, 0, actionAsync);
    };
    _Exporter.prototype._extensionsPreExportTextureAsync = function (context, babylonTexture, mimeType) {
        return this._applyExtensions(babylonTexture, function (extension, node) { return extension.preExportTextureAsync && extension.preExportTextureAsync(context, node, mimeType); });
    };
    _Exporter.prototype._extensionsPostExportMeshPrimitiveAsync = function (context, meshPrimitive, babylonSubMesh, binaryWriter) {
        return this._applyExtensions(meshPrimitive, function (extension, node) { return extension.postExportMeshPrimitiveAsync && extension.postExportMeshPrimitiveAsync(context, node, babylonSubMesh, binaryWriter); });
    };
    _Exporter.prototype._extensionsPostExportNodeAsync = function (context, node, babylonNode, nodeMap, binaryWriter) {
        return this._applyExtensions(node, function (extension, node) { return extension.postExportNodeAsync && extension.postExportNodeAsync(context, node, babylonNode, nodeMap, binaryWriter); });
    };
    _Exporter.prototype._extensionsPostExportMaterialAsync = function (context, material, babylonMaterial) {
        return this._applyExtensions(material, function (extension, node) { return extension.postExportMaterialAsync && extension.postExportMaterialAsync(context, node, babylonMaterial); });
    };
    _Exporter.prototype._extensionsPostExportMaterialAdditionalTextures = function (context, material, babylonMaterial) {
        var output = [];
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_2 = _a[_i];
            var extension = this._extensions[name_2];
            if (extension.postExportMaterialAdditionalTextures) {
                output.push.apply(output, extension.postExportMaterialAdditionalTextures(context, material, babylonMaterial));
            }
        }
        return output;
    };
    _Exporter.prototype._extensionsPostExportTextures = function (context, textureInfo, babylonTexture) {
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_3 = _a[_i];
            var extension = this._extensions[name_3];
            if (extension.postExportTexture) {
                extension.postExportTexture(context, textureInfo, babylonTexture);
            }
        }
    };
    _Exporter.prototype._forEachExtensions = function (action) {
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_4 = _a[_i];
            var extension = this._extensions[name_4];
            if (extension.enabled) {
                action(extension);
            }
        }
    };
    _Exporter.prototype._extensionsOnExporting = function () {
        var _this = this;
        this._forEachExtensions(function (extension) {
            if (extension.wasUsed) {
                if (_this._glTF.extensionsUsed == null) {
                    _this._glTF.extensionsUsed = [];
                }
                if (_this._glTF.extensionsUsed.indexOf(extension.name) === -1) {
                    _this._glTF.extensionsUsed.push(extension.name);
                }
                if (extension.required) {
                    if (_this._glTF.extensionsRequired == null) {
                        _this._glTF.extensionsRequired = [];
                    }
                    if (_this._glTF.extensionsRequired.indexOf(extension.name) === -1) {
                        _this._glTF.extensionsRequired.push(extension.name);
                    }
                }
                if (_this._glTF.extensions == null) {
                    _this._glTF.extensions = {};
                }
                if (extension.onExporting) {
                    extension.onExporting();
                }
            }
        });
    };
    /**
     * Load glTF serializer extensions
     */
    _Exporter.prototype._loadExtensions = function () {
        for (var _i = 0, _a = _Exporter._ExtensionNames; _i < _a.length; _i++) {
            var name_5 = _a[_i];
            var extension = _Exporter._ExtensionFactories[name_5](this);
            this._extensions[name_5] = extension;
        }
    };
    _Exporter.prototype.dispose = function () {
        for (var extensionKey in this._extensions) {
            var extension = this._extensions[extensionKey];
            extension.dispose();
        }
    };
    Object.defineProperty(_Exporter.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Registers a glTF exporter extension
     * @param name Name of the extension to export
     * @param factory The factory function that creates the exporter extension
     */
    _Exporter.RegisterExtension = function (name, factory) {
        if (_Exporter.UnregisterExtension(name)) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Extension with the name ".concat(name, " already exists"));
        }
        _Exporter._ExtensionFactories[name] = factory;
        _Exporter._ExtensionNames.push(name);
    };
    /**
     * Un-registers an exporter extension
     * @param name The name fo the exporter extension
     * @returns A boolean indicating whether the extension has been un-registered
     */
    _Exporter.UnregisterExtension = function (name) {
        if (!_Exporter._ExtensionFactories[name]) {
            return false;
        }
        delete _Exporter._ExtensionFactories[name];
        var index = _Exporter._ExtensionNames.indexOf(name);
        if (index !== -1) {
            _Exporter._ExtensionNames.splice(index, 1);
        }
        return true;
    };
    _Exporter.prototype._reorderIndicesBasedOnPrimitiveMode = function (submesh, primitiveMode, babylonIndices, byteOffset, binaryWriter) {
        switch (primitiveMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode: {
                if (!byteOffset) {
                    byteOffset = 0;
                }
                for (var i = submesh.indexStart, length_1 = submesh.indexStart + submesh.indexCount; i < length_1; i = i + 3) {
                    var index = byteOffset + i * 4;
                    // swap the second and third indices
                    var secondIndex = binaryWriter.getUInt32(index + 4);
                    var thirdIndex = binaryWriter.getUInt32(index + 8);
                    binaryWriter.setUInt32(thirdIndex, index + 4);
                    binaryWriter.setUInt32(secondIndex, index + 8);
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFanDrawMode: {
                for (var i = submesh.indexStart + submesh.indexCount - 1, start = submesh.indexStart; i >= start; --i) {
                    binaryWriter.setUInt32(babylonIndices[i], byteOffset);
                    byteOffset += 4;
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleStripDrawMode: {
                if (submesh.indexCount >= 3) {
                    binaryWriter.setUInt32(babylonIndices[submesh.indexStart + 2], byteOffset + 4);
                    binaryWriter.setUInt32(babylonIndices[submesh.indexStart + 1], byteOffset + 8);
                }
                break;
            }
        }
    };
    /**
     * Reorders the vertex attribute data based on the primitive mode.  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param primitiveMode Primitive mode of the mesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    _Exporter.prototype._reorderVertexAttributeDataBasedOnPrimitiveMode = function (submesh, primitiveMode, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter) {
        switch (primitiveMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode: {
                this._reorderTriangleFillMode(submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter);
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleStripDrawMode: {
                this._reorderTriangleStripDrawMode(submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter);
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFanDrawMode: {
                this._reorderTriangleFanMode(submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter);
                break;
            }
        }
    };
    /**
     * Reorders the vertex attributes in the correct triangle mode order .  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    _Exporter.prototype._reorderTriangleFillMode = function (submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter) {
        var vertexBuffer = this._getVertexBufferFromMesh(vertexBufferKind, submesh.getMesh());
        if (vertexBuffer) {
            var stride = vertexBuffer.byteStride / babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(vertexBuffer.type);
            if (submesh.verticesCount % 3 !== 0) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("The submesh vertices for the triangle fill mode is not divisible by 3!");
            }
            else {
                var vertexData = [];
                var index = 0;
                switch (vertexBufferKind) {
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind:
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                        for (var x = submesh.verticesStart; x < submesh.verticesStart + submesh.verticesCount; x = x + 3) {
                            index = x * stride;
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + 2 * stride));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + stride));
                        }
                        break;
                    }
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                        for (var x = submesh.verticesStart; x < submesh.verticesStart + submesh.verticesCount; x = x + 3) {
                            index = x * stride;
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index + 2 * stride));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index + stride));
                        }
                        break;
                    }
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                        var size = vertexBuffer.getSize();
                        for (var x = submesh.verticesStart; x < submesh.verticesStart + submesh.verticesCount; x = x + size) {
                            index = x * stride;
                            if (size === 4) {
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index + 2 * stride));
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index + stride));
                            }
                            else {
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + 2 * stride));
                                vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + stride));
                            }
                        }
                        break;
                    }
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind:
                    case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                        for (var x = submesh.verticesStart; x < submesh.verticesStart + submesh.verticesCount; x = x + 3) {
                            index = x * stride;
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index + 2 * stride));
                            vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index + stride));
                        }
                        break;
                    }
                    default: {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported Vertex Buffer type: ".concat(vertexBufferKind));
                    }
                }
                this._writeVertexAttributeData(vertexData, byteOffset, vertexBufferKind, binaryWriter);
            }
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("reorderTriangleFillMode: Vertex Buffer Kind ".concat(vertexBufferKind, " not present!"));
        }
    };
    /**
     * Reorders the vertex attributes in the correct triangle strip order.  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    _Exporter.prototype._reorderTriangleStripDrawMode = function (submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter) {
        var vertexBuffer = this._getVertexBufferFromMesh(vertexBufferKind, submesh.getMesh());
        if (vertexBuffer) {
            var stride = vertexBuffer.byteStride / babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(vertexBuffer.type);
            var vertexData = [];
            var index = 0;
            switch (vertexBufferKind) {
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind:
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                    index = submesh.verticesStart;
                    vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + 2 * stride));
                    vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index + stride));
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexBuffer.getSize() === 4
                            ? vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index))
                            : vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind:
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                default: {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported Vertex Buffer type: ".concat(vertexBufferKind));
                }
            }
            this._writeVertexAttributeData(vertexData, byteOffset + 12, vertexBufferKind, binaryWriter);
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("reorderTriangleStripDrawMode: Vertex buffer kind ".concat(vertexBufferKind, " not present!"));
        }
    };
    /**
     * Reorders the vertex attributes in the correct triangle fan order.  This is necessary when indices are not available and the winding order is
     * clock-wise during export to glTF
     * @param submesh BabylonJS submesh
     * @param vertexBufferKind The type of vertex attribute
     * @param meshAttributeArray The vertex attribute data
     * @param byteOffset The offset to the binary data
     * @param binaryWriter The binary data for the glTF file
     */
    _Exporter.prototype._reorderTriangleFanMode = function (submesh, vertexBufferKind, meshAttributeArray, byteOffset, binaryWriter) {
        var vertexBuffer = this._getVertexBufferFromMesh(vertexBufferKind, submesh.getMesh());
        if (vertexBuffer) {
            var stride = vertexBuffer.byteStride / babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(vertexBuffer.type);
            var vertexData = [];
            var index = 0;
            switch (vertexBufferKind) {
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind:
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index));
                        vertexBuffer.getSize() === 4
                            ? vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index))
                            : vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind:
                case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                    for (var x = submesh.verticesStart + submesh.verticesCount - 1; x >= submesh.verticesStart; --x) {
                        index = x * stride;
                        vertexData.push(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index));
                    }
                    break;
                }
                default: {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported Vertex Buffer type: ".concat(vertexBufferKind));
                }
            }
            this._writeVertexAttributeData(vertexData, byteOffset, vertexBufferKind, binaryWriter);
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("reorderTriangleFanMode: Vertex buffer kind ".concat(vertexBufferKind, " not present!"));
        }
    };
    /**
     * Writes the vertex attribute data to binary
     * @param vertices The vertices to write to the binary writer
     * @param byteOffset The offset into the binary writer to overwrite binary data
     * @param vertexAttributeKind The vertex attribute type
     * @param binaryWriter The writer containing the binary data
     */
    _Exporter.prototype._writeVertexAttributeData = function (vertices, byteOffset, vertexAttributeKind, binaryWriter) {
        for (var _i = 0, vertices_1 = vertices; _i < vertices_1.length; _i++) {
            var vertex = vertices_1[_i];
            if (vertexAttributeKind === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind) {
                vertex.normalize();
            }
            else if (vertexAttributeKind === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind && vertex instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4) {
                _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._NormalizeTangentFromRef(vertex);
            }
            for (var _a = 0, _b = vertex.asArray(); _a < _b.length; _a++) {
                var component = _b[_a];
                binaryWriter.setFloat32(component, byteOffset);
                byteOffset += 4;
            }
        }
    };
    /**
     * Writes mesh attribute data to a data buffer
     * Returns the bytelength of the data
     * @param vertexBufferKind Indicates what kind of vertex data is being passed in
     * @param attributeComponentKind
     * @param meshAttributeArray Array containing the attribute data
     * @param stride Specifies the space between data
     * @param binaryWriter The buffer to write the binary data to
     * @param babylonTransformNode
     */
    _Exporter.prototype._writeAttributeData = function (vertexBufferKind, attributeComponentKind, meshAttributeArray, stride, binaryWriter, babylonTransformNode) {
        var vertexAttributes = [];
        var index;
        switch (vertexBufferKind) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind: {
                for (var k = 0, length_2 = meshAttributeArray.length / stride; k < length_2; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                for (var k = 0, length_3 = meshAttributeArray.length / stride; k < length_3; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.normalize().asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                for (var k = 0, length_4 = meshAttributeArray.length / stride; k < length_4; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index);
                    _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._NormalizeTangentFromRef(vertexData);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                var meshMaterial = babylonTransformNode.material;
                var convertToLinear = meshMaterial ? meshMaterial.getClassName() === "StandardMaterial" : true;
                var vertexData = stride === 3 ? new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3() : new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color4();
                var useExactSrgbConversions = this._babylonScene.getEngine().useExactSrgbConversions;
                for (var k = 0, length_5 = meshAttributeArray.length / stride; k < length_5; ++k) {
                    index = k * stride;
                    if (stride === 3) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArrayToRef(meshAttributeArray, index, vertexData);
                        if (convertToLinear) {
                            vertexData.toLinearSpaceToRef(vertexData, useExactSrgbConversions);
                        }
                    }
                    else {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color4.FromArrayToRef(meshAttributeArray, index, vertexData);
                        if (convertToLinear) {
                            vertexData.toLinearSpaceToRef(vertexData, useExactSrgbConversions);
                        }
                    }
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind:
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                for (var k = 0, length_6 = meshAttributeArray.length / stride; k < length_6; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind:
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind: {
                for (var k = 0, length_7 = meshAttributeArray.length / stride; k < length_7; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind:
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsExtraKind: {
                for (var k = 0, length_8 = meshAttributeArray.length / stride; k < length_8; ++k) {
                    index = k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index);
                    vertexAttributes.push(vertexData.asArray());
                }
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported Vertex Buffer Type: " + vertexBufferKind);
                vertexAttributes = [];
            }
        }
        var writeBinaryFunc;
        switch (attributeComponentKind) {
            case 5121 /* AccessorComponentType.UNSIGNED_BYTE */: {
                writeBinaryFunc = binaryWriter.setUInt8.bind(binaryWriter);
                break;
            }
            case 5123 /* AccessorComponentType.UNSIGNED_SHORT */: {
                writeBinaryFunc = binaryWriter.setUInt16.bind(binaryWriter);
                break;
            }
            case 5125 /* AccessorComponentType.UNSIGNED_INT */: {
                writeBinaryFunc = binaryWriter.setUInt32.bind(binaryWriter);
                break;
            }
            case 5126 /* AccessorComponentType.FLOAT */: {
                writeBinaryFunc = binaryWriter.setFloat32.bind(binaryWriter);
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported Attribute Component kind: " + attributeComponentKind);
                return;
            }
        }
        for (var _i = 0, vertexAttributes_1 = vertexAttributes; _i < vertexAttributes_1.length; _i++) {
            var vertexAttribute = vertexAttributes_1[_i];
            for (var _a = 0, vertexAttribute_1 = vertexAttribute; _a < vertexAttribute_1.length; _a++) {
                var component = vertexAttribute_1[_a];
                writeBinaryFunc(component);
            }
        }
    };
    /**
     * Writes mesh attribute data to a data buffer
     * Returns the bytelength of the data
     * @param vertexBufferKind Indicates what kind of vertex data is being passed in
     * @param attributeComponentKind
     * @param meshPrimitive
     * @param morphTarget
     * @param meshAttributeArray Array containing the attribute data
     * @param morphTargetAttributeArray
     * @param stride Specifies the space between data
     * @param binaryWriter The buffer to write the binary data to
     * @param minMax
     */
    _Exporter.prototype.writeMorphTargetAttributeData = function (vertexBufferKind, attributeComponentKind, meshPrimitive, meshAttributeArray, morphTargetAttributeArray, stride, binaryWriter, minMax) {
        var vertexAttributes = [];
        var index;
        var difference = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        var difference4 = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4(0, 0, 0, 0);
        switch (vertexBufferKind) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind: {
                for (var k = meshPrimitive.verticesStart; k < meshPrimitive.verticesCount; ++k) {
                    index = meshPrimitive.indexStart + k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index);
                    var morphData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(morphTargetAttributeArray, index);
                    difference = morphData.subtractToRef(vertexData, difference);
                    if (minMax) {
                        minMax.min.copyFromFloats(Math.min(difference.x, minMax.min.x), Math.min(difference.y, minMax.min.y), Math.min(difference.z, minMax.min.z));
                        minMax.max.copyFromFloats(Math.max(difference.x, minMax.max.x), Math.max(difference.y, minMax.max.y), Math.max(difference.z, minMax.max.z));
                    }
                    vertexAttributes.push(difference.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                for (var k = meshPrimitive.verticesStart; k < meshPrimitive.verticesCount; ++k) {
                    index = meshPrimitive.indexStart + k * stride;
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(meshAttributeArray, index).normalize();
                    var morphData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(morphTargetAttributeArray, index).normalize();
                    difference = morphData.subtractToRef(vertexData, difference);
                    vertexAttributes.push(difference.asArray());
                }
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                for (var k = meshPrimitive.verticesStart; k < meshPrimitive.verticesCount; ++k) {
                    index = meshPrimitive.indexStart + k * (stride + 1);
                    var vertexData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(meshAttributeArray, index);
                    _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._NormalizeTangentFromRef(vertexData);
                    var morphData = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector4.FromArray(morphTargetAttributeArray, index);
                    _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._NormalizeTangentFromRef(morphData);
                    difference4 = morphData.subtractToRef(vertexData, difference4);
                    vertexAttributes.push([difference4.x, difference4.y, difference4.z]);
                }
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported Vertex Buffer Type: " + vertexBufferKind);
                vertexAttributes = [];
            }
        }
        var writeBinaryFunc;
        switch (attributeComponentKind) {
            case 5121 /* AccessorComponentType.UNSIGNED_BYTE */: {
                writeBinaryFunc = binaryWriter.setUInt8.bind(binaryWriter);
                break;
            }
            case 5123 /* AccessorComponentType.UNSIGNED_SHORT */: {
                writeBinaryFunc = binaryWriter.setUInt16.bind(binaryWriter);
                break;
            }
            case 5125 /* AccessorComponentType.UNSIGNED_INT */: {
                writeBinaryFunc = binaryWriter.setUInt32.bind(binaryWriter);
                break;
            }
            case 5126 /* AccessorComponentType.FLOAT */: {
                writeBinaryFunc = binaryWriter.setFloat32.bind(binaryWriter);
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported Attribute Component kind: " + attributeComponentKind);
                return;
            }
        }
        for (var _i = 0, vertexAttributes_2 = vertexAttributes; _i < vertexAttributes_2.length; _i++) {
            var vertexAttribute = vertexAttributes_2[_i];
            for (var _a = 0, vertexAttribute_2 = vertexAttribute; _a < vertexAttribute_2.length; _a++) {
                var component = vertexAttribute_2[_a];
                writeBinaryFunc(component);
            }
        }
    };
    /**
     * Generates glTF json data
     * @param shouldUseGlb Indicates whether the json should be written for a glb file
     * @param glTFPrefix Text to use when prefixing a glTF file
     * @param prettyPrint Indicates whether the json file should be pretty printed (true) or not (false)
     * @returns json data as string
     */
    _Exporter.prototype._generateJSON = function (shouldUseGlb, glTFPrefix, prettyPrint) {
        var _this = this;
        var buffer = { byteLength: this._totalByteLength };
        var imageName;
        var imageData;
        var bufferView;
        var byteOffset = this._totalByteLength;
        if (buffer.byteLength) {
            this._glTF.buffers = [buffer];
        }
        if (this._nodes && this._nodes.length) {
            this._glTF.nodes = this._nodes;
        }
        if (this._meshes && this._meshes.length) {
            this._glTF.meshes = this._meshes;
        }
        if (this._scenes && this._scenes.length) {
            this._glTF.scenes = this._scenes;
            this._glTF.scene = 0;
        }
        if (this._cameras && this._cameras.length) {
            this._glTF.cameras = this._cameras;
        }
        if (this._bufferViews && this._bufferViews.length) {
            this._glTF.bufferViews = this._bufferViews;
        }
        if (this._accessors && this._accessors.length) {
            this._glTF.accessors = this._accessors;
        }
        if (this._animations && this._animations.length) {
            this._glTF.animations = this._animations;
        }
        if (this._materials && this._materials.length) {
            this._glTF.materials = this._materials;
        }
        if (this._textures && this._textures.length) {
            this._glTF.textures = this._textures;
        }
        if (this._samplers && this._samplers.length) {
            this._glTF.samplers = this._samplers;
        }
        if (this._skins && this._skins.length) {
            this._glTF.skins = this._skins;
        }
        if (this._images && this._images.length) {
            if (!shouldUseGlb) {
                this._glTF.images = this._images;
            }
            else {
                this._glTF.images = [];
                this._images.forEach(function (image) {
                    if (image.uri) {
                        imageData = _this._imageData[image.uri];
                        _this._orderedImageData.push(imageData);
                        imageName = image.uri.split(".")[0] + " image";
                        bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, byteOffset, imageData.data.byteLength, undefined, imageName);
                        byteOffset += imageData.data.byteLength;
                        _this._bufferViews.push(bufferView);
                        image.bufferView = _this._bufferViews.length - 1;
                        image.name = imageName;
                        image.mimeType = imageData.mimeType;
                        image.uri = undefined;
                        if (!_this._glTF.images) {
                            _this._glTF.images = [];
                        }
                        _this._glTF.images.push(image);
                    }
                });
                // Replace uri with bufferview and mime type for glb
                buffer.byteLength = byteOffset;
            }
        }
        if (!shouldUseGlb) {
            buffer.uri = glTFPrefix + ".bin";
        }
        var jsonText = prettyPrint ? JSON.stringify(this._glTF, null, 2) : JSON.stringify(this._glTF);
        return jsonText;
    };
    /**
     * Generates data for .gltf and .bin files based on the glTF prefix string
     * @param glTFPrefix Text to use when prefixing a glTF file
     * @param dispose Dispose the exporter
     * @returns GLTFData with glTF file data
     */
    _Exporter.prototype._generateGLTFAsync = function (glTFPrefix, dispose) {
        var _this = this;
        if (dispose === void 0) { dispose = true; }
        return this._generateBinaryAsync().then(function (binaryBuffer) {
            _this._extensionsOnExporting();
            var jsonText = _this._generateJSON(false, glTFPrefix, true);
            var bin = new Blob([binaryBuffer], { type: "application/octet-stream" });
            var glTFFileName = glTFPrefix + ".gltf";
            var glTFBinFile = glTFPrefix + ".bin";
            var container = new _glTFData__WEBPACK_IMPORTED_MODULE_3__.GLTFData();
            container.glTFFiles[glTFFileName] = jsonText;
            container.glTFFiles[glTFBinFile] = bin;
            if (_this._imageData) {
                for (var image in _this._imageData) {
                    container.glTFFiles[image] = new Blob([_this._imageData[image].data], { type: _this._imageData[image].mimeType });
                }
            }
            if (dispose) {
                _this.dispose();
            }
            return container;
        });
    };
    /**
     * Creates a binary buffer for glTF
     * @returns array buffer for binary data
     */
    _Exporter.prototype._generateBinaryAsync = function () {
        var _this = this;
        var binaryWriter = new _BinaryWriter(4);
        return this._createSceneAsync(binaryWriter).then(function () {
            if (_this._localEngine) {
                _this._localEngine.dispose();
            }
            return binaryWriter.getArrayBuffer();
        });
    };
    /**
     * Pads the number to a multiple of 4
     * @param num number to pad
     * @returns padded number
     */
    _Exporter.prototype._getPadding = function (num) {
        var remainder = num % 4;
        var padding = remainder === 0 ? remainder : 4 - remainder;
        return padding;
    };
    /**
     * @internal
     */
    _Exporter.prototype._generateGLBAsync = function (glTFPrefix, dispose) {
        var _this = this;
        if (dispose === void 0) { dispose = true; }
        return this._generateBinaryAsync().then(function (binaryBuffer) {
            _this._extensionsOnExporting();
            var jsonText = _this._generateJSON(true);
            var glbFileName = glTFPrefix + ".glb";
            var headerLength = 12;
            var chunkLengthPrefix = 8;
            var jsonLength = jsonText.length;
            var encodedJsonText;
            var imageByteLength = 0;
            // make use of TextEncoder when available
            if (typeof TextEncoder !== "undefined") {
                var encoder = new TextEncoder();
                encodedJsonText = encoder.encode(jsonText);
                jsonLength = encodedJsonText.length;
            }
            for (var i = 0; i < _this._orderedImageData.length; ++i) {
                imageByteLength += _this._orderedImageData[i].data.byteLength;
            }
            var jsonPadding = _this._getPadding(jsonLength);
            var binPadding = _this._getPadding(binaryBuffer.byteLength);
            var imagePadding = _this._getPadding(imageByteLength);
            var byteLength = headerLength + 2 * chunkLengthPrefix + jsonLength + jsonPadding + binaryBuffer.byteLength + binPadding + imageByteLength + imagePadding;
            //header
            var headerBuffer = new ArrayBuffer(headerLength);
            var headerBufferView = new DataView(headerBuffer);
            headerBufferView.setUint32(0, 0x46546c67, true); //glTF
            headerBufferView.setUint32(4, 2, true); // version
            headerBufferView.setUint32(8, byteLength, true); // total bytes in file
            //json chunk
            var jsonChunkBuffer = new ArrayBuffer(chunkLengthPrefix + jsonLength + jsonPadding);
            var jsonChunkBufferView = new DataView(jsonChunkBuffer);
            jsonChunkBufferView.setUint32(0, jsonLength + jsonPadding, true);
            jsonChunkBufferView.setUint32(4, 0x4e4f534a, true);
            //json chunk bytes
            var jsonData = new Uint8Array(jsonChunkBuffer, chunkLengthPrefix);
            // if TextEncoder was available, we can simply copy the encoded array
            if (encodedJsonText) {
                jsonData.set(encodedJsonText);
            }
            else {
                var blankCharCode = "_".charCodeAt(0);
                for (var i = 0; i < jsonLength; ++i) {
                    var charCode = jsonText.charCodeAt(i);
                    // if the character doesn't fit into a single UTF-16 code unit, just put a blank character
                    if (charCode != jsonText.codePointAt(i)) {
                        jsonData[i] = blankCharCode;
                    }
                    else {
                        jsonData[i] = charCode;
                    }
                }
            }
            //json padding
            var jsonPaddingView = new Uint8Array(jsonChunkBuffer, chunkLengthPrefix + jsonLength);
            for (var i = 0; i < jsonPadding; ++i) {
                jsonPaddingView[i] = 0x20;
            }
            //binary chunk
            var binaryChunkBuffer = new ArrayBuffer(chunkLengthPrefix);
            var binaryChunkBufferView = new DataView(binaryChunkBuffer);
            binaryChunkBufferView.setUint32(0, binaryBuffer.byteLength + imageByteLength + imagePadding, true);
            binaryChunkBufferView.setUint32(4, 0x004e4942, true);
            // binary padding
            var binPaddingBuffer = new ArrayBuffer(binPadding);
            var binPaddingView = new Uint8Array(binPaddingBuffer);
            for (var i = 0; i < binPadding; ++i) {
                binPaddingView[i] = 0;
            }
            var imagePaddingBuffer = new ArrayBuffer(imagePadding);
            var imagePaddingView = new Uint8Array(imagePaddingBuffer);
            for (var i = 0; i < imagePadding; ++i) {
                imagePaddingView[i] = 0;
            }
            var glbData = [headerBuffer, jsonChunkBuffer, binaryChunkBuffer, binaryBuffer];
            // binary data
            for (var i = 0; i < _this._orderedImageData.length; ++i) {
                glbData.push(_this._orderedImageData[i].data);
            }
            glbData.push(binPaddingBuffer);
            glbData.push(imagePaddingBuffer);
            var glbFile = new Blob(glbData, { type: "application/octet-stream" });
            var container = new _glTFData__WEBPACK_IMPORTED_MODULE_3__.GLTFData();
            container.glTFFiles[glbFileName] = glbFile;
            if (_this._localEngine != null) {
                _this._localEngine.dispose();
            }
            if (dispose) {
                _this.dispose();
            }
            return container;
        });
    };
    /**
     * Sets the TRS for each node
     * @param node glTF Node for storing the transformation data
     * @param babylonTransformNode Babylon mesh used as the source for the transformation data
     */
    _Exporter.prototype._setNodeTransformation = function (node, babylonTransformNode) {
        if (!babylonTransformNode.getPivotPoint().equalsToFloats(0, 0, 0)) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Pivot points are not supported in the glTF serializer");
        }
        if (!babylonTransformNode.position.equalsToFloats(0, 0, 0)) {
            node.translation = babylonTransformNode.position.asArray();
        }
        if (!babylonTransformNode.scaling.equalsToFloats(1, 1, 1)) {
            node.scale = babylonTransformNode.scaling.asArray();
        }
        var rotationQuaternion = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.RotationYawPitchRoll(babylonTransformNode.rotation.y, babylonTransformNode.rotation.x, babylonTransformNode.rotation.z);
        if (babylonTransformNode.rotationQuaternion) {
            rotationQuaternion.multiplyInPlace(babylonTransformNode.rotationQuaternion);
        }
        if (!babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(rotationQuaternion)) {
            node.rotation = rotationQuaternion.normalize().asArray();
        }
    };
    _Exporter.prototype._setCameraTransformation = function (node, babylonCamera) {
        if (!babylonCamera.position.equalsToFloats(0, 0, 0)) {
            node.translation = babylonCamera.position.asArray();
        }
        var rotationQuaternion = babylonCamera.rotationQuaternion; // we target the local transformation if one.
        if (rotationQuaternion && !babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.IsIdentity(rotationQuaternion)) {
            node.rotation = rotationQuaternion.normalize().asArray();
        }
    };
    _Exporter.prototype._getVertexBufferFromMesh = function (attributeKind, bufferMesh) {
        if (bufferMesh.isVerticesDataPresent(attributeKind, true)) {
            var vertexBuffer = bufferMesh.getVertexBuffer(attributeKind, true);
            if (vertexBuffer) {
                return vertexBuffer;
            }
        }
        return null;
    };
    /**
     * Creates a bufferview based on the vertices type for the Babylon mesh
     * @param kind Indicates the type of vertices data
     * @param attributeComponentKind Indicates the numerical type used to store the data
     * @param babylonTransformNode The Babylon mesh to get the vertices data from
     * @param binaryWriter The buffer to write the bufferview data to
     * @param byteStride
     */
    _Exporter.prototype._createBufferViewKind = function (kind, attributeComponentKind, babylonTransformNode, binaryWriter, byteStride) {
        var bufferMesh = babylonTransformNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh
            ? babylonTransformNode
            : babylonTransformNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh
                ? babylonTransformNode.sourceMesh
                : null;
        if (bufferMesh) {
            var vertexBuffer = bufferMesh.getVertexBuffer(kind, true);
            var vertexData = bufferMesh.getVerticesData(kind, undefined, undefined, true);
            if (vertexBuffer && vertexData) {
                var typeByteLength = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(attributeComponentKind);
                var byteLength = vertexData.length * typeByteLength;
                var bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, byteStride, kind + " - " + bufferMesh.name);
                this._bufferViews.push(bufferView);
                this._writeAttributeData(kind, attributeComponentKind, vertexData, byteStride / typeByteLength, binaryWriter, babylonTransformNode);
            }
        }
    };
    /**
     * Creates a bufferview based on the vertices type for the Babylon mesh
     * @param babylonSubMesh The Babylon submesh that the morph target is applied to
     * @param meshPrimitive
     * @param babylonMorphTarget the morph target to be exported
     * @param binaryWriter The buffer to write the bufferview data to
     */
    _Exporter.prototype._setMorphTargetAttributes = function (babylonSubMesh, meshPrimitive, babylonMorphTarget, binaryWriter) {
        if (babylonMorphTarget) {
            if (!meshPrimitive.targets) {
                meshPrimitive.targets = [];
            }
            var target = {};
            var mesh = babylonSubMesh.getMesh();
            if (babylonMorphTarget.hasNormals) {
                var vertexNormals = mesh.getVerticesData(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, undefined, undefined, true);
                var morphNormals = babylonMorphTarget.getNormals();
                var count = babylonSubMesh.verticesCount;
                var byteStride = 12; // 3 x 4 byte floats
                var byteLength = count * byteStride;
                var bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, byteStride, babylonMorphTarget.name + "_NORMAL");
                this._bufferViews.push(bufferView);
                var bufferViewIndex = this._bufferViews.length - 1;
                var accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(bufferViewIndex, babylonMorphTarget.name + " - " + "NORMAL", "VEC3" /* AccessorType.VEC3 */, 5126 /* AccessorComponentType.FLOAT */, count, 0, null, null);
                this._accessors.push(accessor);
                target.NORMAL = this._accessors.length - 1;
                this.writeMorphTargetAttributeData(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, 5126 /* AccessorComponentType.FLOAT */, babylonSubMesh, vertexNormals, morphNormals, byteStride / 4, binaryWriter);
            }
            if (babylonMorphTarget.hasPositions) {
                var vertexPositions = mesh.getVerticesData(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, undefined, undefined, true);
                var morphPositions = babylonMorphTarget.getPositions();
                var count = babylonSubMesh.verticesCount;
                var byteStride = 12; // 3 x 4 byte floats
                var byteLength = count * byteStride;
                var bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, byteStride, babylonMorphTarget.name + "_POSITION");
                this._bufferViews.push(bufferView);
                var bufferViewIndex = this._bufferViews.length - 1;
                var minMax = { min: new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3(Infinity, Infinity, Infinity), max: new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3(-Infinity, -Infinity, -Infinity) };
                var accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(bufferViewIndex, babylonMorphTarget.name + " - " + "POSITION", "VEC3" /* AccessorType.VEC3 */, 5126 /* AccessorComponentType.FLOAT */, count, 0, null, null);
                this._accessors.push(accessor);
                target.POSITION = this._accessors.length - 1;
                this.writeMorphTargetAttributeData(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, 5126 /* AccessorComponentType.FLOAT */, babylonSubMesh, vertexPositions, morphPositions, byteStride / 4, binaryWriter, minMax);
                accessor.min = minMax.min.asArray();
                accessor.max = minMax.max.asArray();
            }
            if (babylonMorphTarget.hasTangents) {
                var vertexTangents = mesh.getVerticesData(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind, undefined, undefined, true);
                var morphTangents = babylonMorphTarget.getTangents();
                var count = babylonSubMesh.verticesCount;
                var byteStride = 12; // 3 x 4 byte floats
                var byteLength = count * byteStride;
                var bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, byteStride, babylonMorphTarget.name + "_NORMAL");
                this._bufferViews.push(bufferView);
                var bufferViewIndex = this._bufferViews.length - 1;
                var accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(bufferViewIndex, babylonMorphTarget.name + " - " + "TANGENT", "VEC3" /* AccessorType.VEC3 */, 5126 /* AccessorComponentType.FLOAT */, count, 0, null, null);
                this._accessors.push(accessor);
                target.TANGENT = this._accessors.length - 1;
                this.writeMorphTargetAttributeData(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind, 5126 /* AccessorComponentType.FLOAT */, babylonSubMesh, vertexTangents, morphTangents, byteStride / 4, binaryWriter);
            }
            meshPrimitive.targets.push(target);
        }
    };
    /**
     * The primitive mode of the Babylon mesh
     * @param babylonMesh The BabylonJS mesh
     */
    _Exporter.prototype._getMeshPrimitiveMode = function (babylonMesh) {
        if (babylonMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.LinesMesh) {
            return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.LineListDrawMode;
        }
        if (babylonMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh || babylonMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
            var baseMesh = babylonMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh ? babylonMesh : babylonMesh.sourceMesh;
            if (typeof baseMesh.overrideRenderingFillMode === "number") {
                return baseMesh.overrideRenderingFillMode;
            }
        }
        return babylonMesh.material ? babylonMesh.material.fillMode : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode;
    };
    /**
     * Sets the primitive mode of the glTF mesh primitive
     * @param meshPrimitive glTF mesh primitive
     * @param primitiveMode The primitive mode
     */
    _Exporter.prototype._setPrimitiveMode = function (meshPrimitive, primitiveMode) {
        switch (primitiveMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode: {
                // glTF defaults to using Triangle Mode
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleStripDrawMode: {
                meshPrimitive.mode = 5 /* MeshPrimitiveMode.TRIANGLE_STRIP */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFanDrawMode: {
                meshPrimitive.mode = 6 /* MeshPrimitiveMode.TRIANGLE_FAN */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.PointListDrawMode: {
                meshPrimitive.mode = 0 /* MeshPrimitiveMode.POINTS */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.PointFillMode: {
                meshPrimitive.mode = 0 /* MeshPrimitiveMode.POINTS */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.LineLoopDrawMode: {
                meshPrimitive.mode = 2 /* MeshPrimitiveMode.LINE_LOOP */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.LineListDrawMode: {
                meshPrimitive.mode = 1 /* MeshPrimitiveMode.LINES */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.LineStripDrawMode: {
                meshPrimitive.mode = 3 /* MeshPrimitiveMode.LINE_STRIP */;
                break;
            }
        }
    };
    /**
     * Sets the vertex attribute accessor based of the glTF mesh primitive
     * @param meshPrimitive glTF mesh primitive
     * @param attributeKind vertex attribute
     * @returns boolean specifying if uv coordinates are present
     */
    _Exporter.prototype._setAttributeKind = function (meshPrimitive, attributeKind) {
        switch (attributeKind) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind: {
                meshPrimitive.attributes.POSITION = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind: {
                meshPrimitive.attributes.NORMAL = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind: {
                meshPrimitive.attributes.COLOR_0 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind: {
                meshPrimitive.attributes.TANGENT = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind: {
                meshPrimitive.attributes.TEXCOORD_0 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind: {
                meshPrimitive.attributes.TEXCOORD_1 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind: {
                meshPrimitive.attributes.JOINTS_0 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind: {
                meshPrimitive.attributes.JOINTS_1 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind: {
                meshPrimitive.attributes.WEIGHTS_0 = this._accessors.length - 1;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsExtraKind: {
                meshPrimitive.attributes.WEIGHTS_1 = this._accessors.length - 1;
                break;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported Vertex Buffer Type: " + attributeKind);
            }
        }
    };
    /**
     * Sets data for the primitive attributes of each submesh
     * @param mesh glTF Mesh object to store the primitive attribute information
     * @param babylonTransformNode Babylon mesh to get the primitive attribute data from
     * @param binaryWriter Buffer to write the attribute data to
     */
    _Exporter.prototype._setPrimitiveAttributesAsync = function (mesh, babylonTransformNode, binaryWriter) {
        var promises = [];
        var bufferMesh = null;
        var bufferView;
        var minMax;
        if (babylonTransformNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
            bufferMesh = babylonTransformNode;
        }
        else if (babylonTransformNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh) {
            bufferMesh = babylonTransformNode.sourceMesh;
        }
        var attributeData = [
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, accessorType: "VEC3" /* AccessorType.VEC3 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 12 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, accessorType: "VEC3" /* AccessorType.VEC3 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 12 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 16 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 16 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind, accessorType: "VEC2" /* AccessorType.VEC2 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 8 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind, accessorType: "VEC2" /* AccessorType.VEC2 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 8 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5123 /* AccessorComponentType.UNSIGNED_SHORT */, byteStride: 8 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5123 /* AccessorComponentType.UNSIGNED_SHORT */, byteStride: 8 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 16 },
            { kind: babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsExtraKind, accessorType: "VEC4" /* AccessorType.VEC4 */, accessorComponentType: 5126 /* AccessorComponentType.FLOAT */, byteStride: 16 },
        ];
        if (bufferMesh) {
            var indexBufferViewIndex = null;
            var primitiveMode = this._getMeshPrimitiveMode(bufferMesh);
            var vertexAttributeBufferViews = {};
            var morphTargetManager = bufferMesh.morphTargetManager;
            // For each BabylonMesh, create bufferviews for each 'kind'
            for (var _i = 0, attributeData_1 = attributeData; _i < attributeData_1.length; _i++) {
                var attribute = attributeData_1[_i];
                var attributeKind = attribute.kind;
                var attributeComponentKind = attribute.accessorComponentType;
                if (bufferMesh.isVerticesDataPresent(attributeKind, true)) {
                    var vertexBuffer = this._getVertexBufferFromMesh(attributeKind, bufferMesh);
                    attribute.byteStride = vertexBuffer
                        ? vertexBuffer.getSize() * babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(attribute.accessorComponentType)
                        : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.DeduceStride(attributeKind) * 4;
                    if (attribute.byteStride === 12) {
                        attribute.accessorType = "VEC3" /* AccessorType.VEC3 */;
                    }
                    this._createBufferViewKind(attributeKind, attributeComponentKind, babylonTransformNode, binaryWriter, attribute.byteStride);
                    attribute.bufferViewIndex = this._bufferViews.length - 1;
                    vertexAttributeBufferViews[attributeKind] = attribute.bufferViewIndex;
                }
            }
            if (bufferMesh.getTotalIndices()) {
                var indices = bufferMesh.getIndices();
                if (indices) {
                    var byteLength = indices.length * 4;
                    bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, binaryWriter.getByteOffset(), byteLength, undefined, "Indices - " + bufferMesh.name);
                    this._bufferViews.push(bufferView);
                    indexBufferViewIndex = this._bufferViews.length - 1;
                    for (var k = 0, length_9 = indices.length; k < length_9; ++k) {
                        binaryWriter.setUInt32(indices[k]);
                    }
                }
            }
            if (bufferMesh.subMeshes) {
                // go through all mesh primitives (submeshes)
                for (var _a = 0, _b = bufferMesh.subMeshes; _a < _b.length; _a++) {
                    var submesh = _b[_a];
                    var babylonMaterial = submesh.getMaterial() || bufferMesh.getScene().defaultMaterial;
                    var materialIndex = null;
                    if (babylonMaterial) {
                        if (bufferMesh instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.LinesMesh) {
                            // get the color from the lines mesh and set it in the material
                            var material = {
                                name: bufferMesh.name + " material",
                            };
                            if (!bufferMesh.color.equals(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White()) || bufferMesh.alpha < 1) {
                                material.pbrMetallicRoughness = {
                                    baseColorFactor: bufferMesh.color.asArray().concat([bufferMesh.alpha]),
                                };
                            }
                            this._materials.push(material);
                            materialIndex = this._materials.length - 1;
                        }
                        else if (babylonMaterial instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MultiMaterial) {
                            var subMaterial = babylonMaterial.subMaterials[submesh.materialIndex];
                            if (subMaterial) {
                                babylonMaterial = subMaterial;
                                materialIndex = this._materialMap[babylonMaterial.uniqueId];
                            }
                        }
                        else {
                            materialIndex = this._materialMap[babylonMaterial.uniqueId];
                        }
                    }
                    var glTFMaterial = materialIndex != null ? this._materials[materialIndex] : null;
                    var meshPrimitive = { attributes: {} };
                    this._setPrimitiveMode(meshPrimitive, primitiveMode);
                    for (var _c = 0, attributeData_2 = attributeData; _c < attributeData_2.length; _c++) {
                        var attribute = attributeData_2[_c];
                        var attributeKind = attribute.kind;
                        if ((attributeKind === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind || attributeKind === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind) && !this._options.exportUnusedUVs) {
                            if (!glTFMaterial || !this._glTFMaterialExporter._hasTexturesPresent(glTFMaterial)) {
                                continue;
                            }
                        }
                        var vertexData = bufferMesh.getVerticesData(attributeKind, undefined, undefined, true);
                        if (vertexData) {
                            var vertexBuffer = this._getVertexBufferFromMesh(attributeKind, bufferMesh);
                            if (vertexBuffer) {
                                var stride = vertexBuffer.getSize();
                                var bufferViewIndex = attribute.bufferViewIndex;
                                if (bufferViewIndex != undefined) {
                                    // check to see if bufferviewindex has a numeric value assigned.
                                    minMax = { min: null, max: null };
                                    if (attributeKind == babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind) {
                                        minMax = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CalculateMinMaxPositions(vertexData, 0, vertexData.length / stride);
                                    }
                                    var accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(bufferViewIndex, attributeKind + " - " + babylonTransformNode.name, attribute.accessorType, attribute.accessorComponentType, vertexData.length / stride, 0, minMax.min, minMax.max);
                                    this._accessors.push(accessor);
                                    this._setAttributeKind(meshPrimitive, attributeKind);
                                }
                            }
                        }
                    }
                    if (indexBufferViewIndex) {
                        // Create accessor
                        var accessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(indexBufferViewIndex, "indices - " + babylonTransformNode.name, "SCALAR" /* AccessorType.SCALAR */, 5125 /* AccessorComponentType.UNSIGNED_INT */, submesh.indexCount, submesh.indexStart * 4, null, null);
                        this._accessors.push(accessor);
                        meshPrimitive.indices = this._accessors.length - 1;
                    }
                    if (materialIndex != null && Object.keys(meshPrimitive.attributes).length > 0) {
                        var sideOrientation = bufferMesh.overrideMaterialSideOrientation !== null ? bufferMesh.overrideMaterialSideOrientation : babylonMaterial.sideOrientation;
                        if (sideOrientation === (this._babylonScene.useRightHandedSystem ? babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.ClockWiseSideOrientation : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.CounterClockWiseSideOrientation)) {
                            var byteOffset = indexBufferViewIndex != null ? this._bufferViews[indexBufferViewIndex].byteOffset : null;
                            if (byteOffset == null) {
                                byteOffset = 0;
                            }
                            var babylonIndices = null;
                            if (indexBufferViewIndex != null) {
                                babylonIndices = bufferMesh.getIndices();
                            }
                            if (babylonIndices) {
                                this._reorderIndicesBasedOnPrimitiveMode(submesh, primitiveMode, babylonIndices, byteOffset, binaryWriter);
                            }
                            else {
                                for (var _d = 0, attributeData_3 = attributeData; _d < attributeData_3.length; _d++) {
                                    var attribute = attributeData_3[_d];
                                    var vertexData = bufferMesh.getVerticesData(attribute.kind, undefined, undefined, true);
                                    if (vertexData) {
                                        var byteOffset_1 = this._bufferViews[vertexAttributeBufferViews[attribute.kind]].byteOffset || 0;
                                        this._reorderVertexAttributeDataBasedOnPrimitiveMode(submesh, primitiveMode, attribute.kind, vertexData, byteOffset_1, binaryWriter);
                                    }
                                }
                            }
                        }
                        meshPrimitive.material = materialIndex;
                    }
                    if (morphTargetManager) {
                        // By convention, morph target names are stored in the mesh extras.
                        if (!mesh.extras) {
                            mesh.extras = {};
                        }
                        mesh.extras.targetNames = [];
                        for (var i = 0; i < morphTargetManager.numTargets; ++i) {
                            var target = morphTargetManager.getTarget(i);
                            this._setMorphTargetAttributes(submesh, meshPrimitive, target, binaryWriter);
                            mesh.extras.targetNames.push(target.name);
                        }
                    }
                    mesh.primitives.push(meshPrimitive);
                    this._extensionsPostExportMeshPrimitiveAsync("postExport", meshPrimitive, submesh, binaryWriter);
                    promises.push();
                }
            }
        }
        return Promise.all(promises).then(function () {
            /* do nothing */
        });
    };
    /**
     * Creates a glTF scene based on the array of meshes
     * Returns the total byte offset
     * @param babylonScene Babylon scene to get the mesh data from
     * @param binaryWriter Buffer to write binary data to
     */
    _Exporter.prototype._createSceneAsync = function (binaryWriter) {
        var _a;
        var _this = this;
        var _b;
        var scene = { nodes: [] };
        var glTFNodeIndex;
        var glTFNode;
        var directDescendents;
        var nodes = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)([], this._babylonScene.transformNodes, true), this._babylonScene.meshes, true), this._babylonScene.lights, true), this._babylonScene.cameras, true);
        var removedRootNodes = new Set();
        // Scene metadata
        if (this._babylonScene.metadata) {
            if (this._options.metadataSelector) {
                scene.extras = this._options.metadataSelector(this._babylonScene.metadata);
            }
            else if (this._babylonScene.metadata.gltf) {
                scene.extras = this._babylonScene.metadata.gltf.extras;
            }
        }
        // Remove no-op root nodes
        if (((_b = this._options.removeNoopRootNodes) !== null && _b !== void 0 ? _b : true) && !this._options.includeCoordinateSystemConversionNodes) {
            for (var _i = 0, _c = this._babylonScene.rootNodes; _i < _c.length; _i++) {
                var rootNode = _c[_i];
                if (isNoopNode(rootNode, this._babylonScene.useRightHandedSystem)) {
                    removedRootNodes.add(rootNode);
                    // Exclude the node from list of nodes to export
                    nodes.splice(nodes.indexOf(rootNode), 1);
                }
            }
        }
        // Export babylon cameras to glTFCamera
        var cameraMap = new Map();
        this._babylonScene.cameras.forEach(function (camera) {
            if (!_this._options.shouldExportNode || _this._options.shouldExportNode(camera)) {
                var glTFCamera = {
                    type: camera.mode === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera.PERSPECTIVE_CAMERA ? "perspective" /* CameraType.PERSPECTIVE */ : "orthographic" /* CameraType.ORTHOGRAPHIC */,
                };
                if (camera.name) {
                    glTFCamera.name = camera.name;
                }
                if (glTFCamera.type === "perspective" /* CameraType.PERSPECTIVE */) {
                    glTFCamera.perspective = {
                        aspectRatio: camera.getEngine().getAspectRatio(camera),
                        yfov: camera.fovMode === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera.FOVMODE_VERTICAL_FIXED ? camera.fov : camera.fov * camera.getEngine().getAspectRatio(camera),
                        znear: camera.minZ,
                        zfar: camera.maxZ,
                    };
                }
                else if (glTFCamera.type === "orthographic" /* CameraType.ORTHOGRAPHIC */) {
                    var halfWidth = camera.orthoLeft && camera.orthoRight ? 0.5 * (camera.orthoRight - camera.orthoLeft) : camera.getEngine().getRenderWidth() * 0.5;
                    var halfHeight = camera.orthoBottom && camera.orthoTop ? 0.5 * (camera.orthoTop - camera.orthoBottom) : camera.getEngine().getRenderHeight() * 0.5;
                    glTFCamera.orthographic = {
                        xmag: halfWidth,
                        ymag: halfHeight,
                        znear: camera.minZ,
                        zfar: camera.maxZ,
                    };
                }
                cameraMap.set(camera, _this._cameras.length);
                _this._cameras.push(glTFCamera);
            }
        });
        var exportNodes = (_a = this._getExportNodes(nodes), _a[0]), exportMaterials = _a[1];
        return this._glTFMaterialExporter._convertMaterialsToGLTFAsync(exportMaterials, "image/png" /* ImageMimeType.PNG */, true).then(function () {
            return _this._createNodeMapAndAnimationsAsync(exportNodes, binaryWriter).then(function (nodeMap) {
                return _this._createSkinsAsync(nodeMap, binaryWriter).then(function (skinMap) {
                    _this._nodeMap = nodeMap;
                    _this._totalByteLength = binaryWriter.getByteOffset();
                    if (_this._totalByteLength == undefined) {
                        throw new Error("undefined byte length!");
                    }
                    // Build Hierarchy with the node map.
                    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                        var babylonNode = nodes_1[_i];
                        glTFNodeIndex = _this._nodeMap[babylonNode.uniqueId];
                        if (glTFNodeIndex !== undefined) {
                            glTFNode = _this._nodes[glTFNodeIndex];
                            if (babylonNode.metadata) {
                                if (_this._options.metadataSelector) {
                                    glTFNode.extras = _this._options.metadataSelector(babylonNode.metadata);
                                }
                                else if (babylonNode.metadata.gltf) {
                                    glTFNode.extras = babylonNode.metadata.gltf.extras;
                                }
                            }
                            if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera) {
                                glTFNode.camera = cameraMap.get(babylonNode);
                            }
                            if (_this._options.shouldExportNode && !_this._options.shouldExportNode(babylonNode)) {
                                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Log("Omitting " + babylonNode.name + " from scene.");
                            }
                            else {
                                if (!babylonNode.parent && !_this._babylonScene.useRightHandedSystem) {
                                    convertNodeHandedness(glTFNode);
                                }
                                if (!babylonNode.parent || removedRootNodes.has(babylonNode.parent)) {
                                    scene.nodes.push(glTFNodeIndex);
                                }
                            }
                            if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
                                if (babylonNode.skeleton) {
                                    glTFNode.skin = skinMap[babylonNode.skeleton.uniqueId];
                                }
                            }
                            directDescendents = babylonNode.getDescendants(true);
                            if (!glTFNode.children && directDescendents && directDescendents.length) {
                                var children = [];
                                for (var _a = 0, directDescendents_1 = directDescendents; _a < directDescendents_1.length; _a++) {
                                    var descendent = directDescendents_1[_a];
                                    if (_this._nodeMap[descendent.uniqueId] != null) {
                                        children.push(_this._nodeMap[descendent.uniqueId]);
                                    }
                                }
                                if (children.length) {
                                    glTFNode.children = children;
                                }
                            }
                        }
                    }
                    if (scene.nodes.length) {
                        _this._scenes.push(scene);
                    }
                });
            });
        });
    };
    /**
     * Getting the nodes and materials that would be exported.
     * @param nodes Babylon transform nodes
     * @returns Array of nodes which would be exported.
     * @returns Set of materials which would be exported.
     */
    _Exporter.prototype._getExportNodes = function (nodes) {
        var exportNodes = [];
        var exportMaterials = new Set();
        for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
            var babylonNode = nodes_2[_i];
            if (!this._options.shouldExportNode || this._options.shouldExportNode(babylonNode)) {
                exportNodes.push(babylonNode);
                var babylonMesh = babylonNode;
                if (babylonMesh.subMeshes && babylonMesh.subMeshes.length > 0) {
                    var material = babylonMesh.material || babylonMesh.getScene().defaultMaterial;
                    if (material instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.MultiMaterial) {
                        for (var _a = 0, _b = material.subMaterials; _a < _b.length; _a++) {
                            var subMaterial = _b[_a];
                            if (subMaterial) {
                                exportMaterials.add(subMaterial);
                            }
                        }
                    }
                    else {
                        exportMaterials.add(material);
                    }
                }
            }
            else {
                "Excluding node ".concat(babylonNode.name);
            }
        }
        return [exportNodes, exportMaterials];
    };
    /**
     * Creates a mapping of Node unique id to node index and handles animations
     * @param nodes Babylon transform nodes
     * @param binaryWriter Buffer to write binary data to
     * @returns Node mapping of unique id to index
     */
    _Exporter.prototype._createNodeMapAndAnimationsAsync = function (nodes, binaryWriter) {
        var _this = this;
        var promiseChain = Promise.resolve();
        var nodeMap = {};
        var nodeIndex;
        var runtimeGLTFAnimation = {
            name: "runtime animations",
            channels: [],
            samplers: [],
        };
        var idleGLTFAnimations = [];
        var _loop_1 = function (babylonNode) {
            promiseChain = promiseChain.then(function () {
                return _this._createNodeAsync(babylonNode, binaryWriter).then(function (node) {
                    var promise = _this._extensionsPostExportNodeAsync("createNodeAsync", node, babylonNode, nodeMap, binaryWriter);
                    if (promise == null) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Not exporting node ".concat(babylonNode.name));
                        return Promise.resolve();
                    }
                    else {
                        return promise.then(function (node) {
                            if (!node) {
                                return;
                            }
                            _this._nodes.push(node);
                            nodeIndex = _this._nodes.length - 1;
                            nodeMap[babylonNode.uniqueId] = nodeIndex;
                            if (!_this._babylonScene.animationGroups.length) {
                                _glTFAnimation__WEBPACK_IMPORTED_MODULE_4__._GLTFAnimation._CreateMorphTargetAnimationFromMorphTargetAnimations(babylonNode, runtimeGLTFAnimation, idleGLTFAnimations, nodeMap, _this._nodes, binaryWriter, _this._bufferViews, _this._accessors, _this._animationSampleRate, _this._options.shouldExportAnimation);
                                if (babylonNode.animations.length) {
                                    _glTFAnimation__WEBPACK_IMPORTED_MODULE_4__._GLTFAnimation._CreateNodeAnimationFromNodeAnimations(babylonNode, runtimeGLTFAnimation, idleGLTFAnimations, nodeMap, _this._nodes, binaryWriter, _this._bufferViews, _this._accessors, _this._animationSampleRate, _this._options.shouldExportAnimation);
                                }
                            }
                        });
                    }
                });
            });
        };
        for (var _i = 0, nodes_3 = nodes; _i < nodes_3.length; _i++) {
            var babylonNode = nodes_3[_i];
            _loop_1(babylonNode);
        }
        return promiseChain.then(function () {
            if (runtimeGLTFAnimation.channels.length && runtimeGLTFAnimation.samplers.length) {
                _this._animations.push(runtimeGLTFAnimation);
            }
            idleGLTFAnimations.forEach(function (idleGLTFAnimation) {
                if (idleGLTFAnimation.channels.length && idleGLTFAnimation.samplers.length) {
                    _this._animations.push(idleGLTFAnimation);
                }
            });
            if (_this._babylonScene.animationGroups.length) {
                _glTFAnimation__WEBPACK_IMPORTED_MODULE_4__._GLTFAnimation._CreateNodeAndMorphAnimationFromAnimationGroups(_this._babylonScene, _this._animations, nodeMap, binaryWriter, _this._bufferViews, _this._accessors, _this._animationSampleRate, _this._options.shouldExportAnimation);
            }
            return nodeMap;
        });
    };
    /**
     * Creates a glTF node from a Babylon mesh
     * @param babylonNode Source Babylon mesh
     * @param binaryWriter Buffer for storing geometry data
     * @returns glTF node
     */
    _Exporter.prototype._createNodeAsync = function (babylonNode, binaryWriter) {
        var _this = this;
        return Promise.resolve().then(function () {
            // create node to hold translation/rotation/scale and the mesh
            var node = {};
            // create mesh
            var mesh = { primitives: [] };
            if (babylonNode.name) {
                node.name = babylonNode.name;
            }
            if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TransformNode) {
                // Set transformation
                _this._setNodeTransformation(node, babylonNode);
                if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
                    var morphTargetManager = babylonNode.morphTargetManager;
                    if (morphTargetManager && morphTargetManager.numTargets > 0) {
                        mesh.weights = [];
                        for (var i = 0; i < morphTargetManager.numTargets; ++i) {
                            mesh.weights.push(morphTargetManager.getTarget(i).influence);
                        }
                    }
                }
                return _this._setPrimitiveAttributesAsync(mesh, babylonNode, binaryWriter).then(function () {
                    if (mesh.primitives.length) {
                        _this._meshes.push(mesh);
                        node.mesh = _this._meshes.length - 1;
                    }
                    return node;
                });
            }
            else if (babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Camera) {
                _this._setCameraTransformation(node, babylonNode);
                return node;
            }
            else {
                return node;
            }
        });
    };
    /**
     * Creates a glTF skin from a Babylon skeleton
     * @param babylonScene Babylon Scene
     * @param nodeMap Babylon transform nodes
     * @param binaryWriter Buffer to write binary data to
     * @returns Node mapping of unique id to index
     */
    _Exporter.prototype._createSkinsAsync = function (nodeMap, binaryWriter) {
        var _a;
        var promiseChain = Promise.resolve();
        var skinMap = {};
        for (var _i = 0, _b = this._babylonScene.skeletons; _i < _b.length; _i++) {
            var skeleton = _b[_i];
            if (skeleton.bones.length <= 0) {
                continue;
            }
            // create skin
            var skin = { joints: [] };
            var inverseBindMatrices = [];
            var boneIndexMap = {};
            var maxBoneIndex = -1;
            for (var i = 0; i < skeleton.bones.length; ++i) {
                var bone = skeleton.bones[i];
                var boneIndex = (_a = bone.getIndex()) !== null && _a !== void 0 ? _a : i;
                if (boneIndex !== -1) {
                    boneIndexMap[boneIndex] = bone;
                    if (boneIndex > maxBoneIndex) {
                        maxBoneIndex = boneIndex;
                    }
                }
            }
            for (var boneIndex = 0; boneIndex <= maxBoneIndex; ++boneIndex) {
                var bone = boneIndexMap[boneIndex];
                inverseBindMatrices.push(bone.getInvertedAbsoluteTransform());
                var transformNode = bone.getTransformNode();
                if (transformNode && nodeMap[transformNode.uniqueId] !== null && nodeMap[transformNode.uniqueId] !== undefined) {
                    skin.joints.push(nodeMap[transformNode.uniqueId]);
                }
                else {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Exporting a bone without a linked transform node is currently unsupported");
                }
            }
            if (skin.joints.length > 0) {
                // create buffer view for inverse bind matrices
                var byteStride = 64; // 4 x 4 matrix of 32 bit float
                var byteLength = inverseBindMatrices.length * byteStride;
                var bufferViewOffset = binaryWriter.getByteOffset();
                var bufferView = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateBufferView(0, bufferViewOffset, byteLength, undefined, "InverseBindMatrices" + " - " + skeleton.name);
                this._bufferViews.push(bufferView);
                var bufferViewIndex = this._bufferViews.length - 1;
                var bindMatrixAccessor = _glTFUtilities__WEBPACK_IMPORTED_MODULE_2__._GLTFUtilities._CreateAccessor(bufferViewIndex, "InverseBindMatrices" + " - " + skeleton.name, "MAT4" /* AccessorType.MAT4 */, 5126 /* AccessorComponentType.FLOAT */, inverseBindMatrices.length, null, null, null);
                var inverseBindAccessorIndex = this._accessors.push(bindMatrixAccessor) - 1;
                skin.inverseBindMatrices = inverseBindAccessorIndex;
                this._skins.push(skin);
                skinMap[skeleton.uniqueId] = this._skins.length - 1;
                inverseBindMatrices.forEach(function (mat) {
                    mat.m.forEach(function (cell) {
                        binaryWriter.setFloat32(cell);
                    });
                });
            }
        }
        return promiseChain.then(function () {
            return skinMap;
        });
    };
    _Exporter._ExtensionNames = new Array();
    _Exporter._ExtensionFactories = {};
    return _Exporter;
}());
/**
 * @internal
 *
 * Stores glTF binary data.  If the array buffer byte length is exceeded, it doubles in size dynamically
 */
var _BinaryWriter = /** @class */ (function () {
    /**
     * Initialize binary writer with an initial byte length
     * @param byteLength Initial byte length of the array buffer
     */
    function _BinaryWriter(byteLength) {
        this._arrayBuffer = new ArrayBuffer(byteLength);
        this._dataView = new DataView(this._arrayBuffer);
        this._byteOffset = 0;
    }
    /**
     * Resize the array buffer to the specified byte length
     * @param byteLength
     */
    _BinaryWriter.prototype._resizeBuffer = function (byteLength) {
        var newBuffer = new ArrayBuffer(byteLength);
        var copyOldBufferSize = Math.min(this._arrayBuffer.byteLength, byteLength);
        var oldUint8Array = new Uint8Array(this._arrayBuffer, 0, copyOldBufferSize);
        var newUint8Array = new Uint8Array(newBuffer);
        newUint8Array.set(oldUint8Array, 0);
        this._arrayBuffer = newBuffer;
        this._dataView = new DataView(this._arrayBuffer);
        return newBuffer;
    };
    /**
     * Get an array buffer with the length of the byte offset
     * @returns ArrayBuffer resized to the byte offset
     */
    _BinaryWriter.prototype.getArrayBuffer = function () {
        return this._resizeBuffer(this.getByteOffset());
    };
    /**
     * Get the byte offset of the array buffer
     * @returns byte offset
     */
    _BinaryWriter.prototype.getByteOffset = function () {
        if (this._byteOffset == undefined) {
            throw new Error("Byte offset is undefined!");
        }
        return this._byteOffset;
    };
    /**
     * Stores an UInt8 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setUInt8 = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setUint8(byteOffset, entry);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 1 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setUint8(this._byteOffset, entry);
            this._byteOffset += 1;
        }
    };
    /**
     * Stores an UInt16 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setUInt16 = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setUint16(byteOffset, entry, true);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 2 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setUint16(this._byteOffset, entry, true);
            this._byteOffset += 2;
        }
    };
    /**
     * Gets an UInt32 in the array buffer
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.getUInt32 = function (byteOffset) {
        if (byteOffset < this._byteOffset) {
            return this._dataView.getUint32(byteOffset, true);
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            throw new Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
    };
    _BinaryWriter.prototype.getVector3Float32FromRef = function (vector3, byteOffset) {
        if (byteOffset + 8 > this._byteOffset) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
        else {
            vector3.x = this._dataView.getFloat32(byteOffset, true);
            vector3.y = this._dataView.getFloat32(byteOffset + 4, true);
            vector3.z = this._dataView.getFloat32(byteOffset + 8, true);
        }
    };
    _BinaryWriter.prototype.setVector3Float32FromRef = function (vector3, byteOffset) {
        if (byteOffset + 8 > this._byteOffset) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
        else {
            this._dataView.setFloat32(byteOffset, vector3.x, true);
            this._dataView.setFloat32(byteOffset + 4, vector3.y, true);
            this._dataView.setFloat32(byteOffset + 8, vector3.z, true);
        }
    };
    _BinaryWriter.prototype.getVector4Float32FromRef = function (vector4, byteOffset) {
        if (byteOffset + 12 > this._byteOffset) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
        else {
            vector4.x = this._dataView.getFloat32(byteOffset, true);
            vector4.y = this._dataView.getFloat32(byteOffset + 4, true);
            vector4.z = this._dataView.getFloat32(byteOffset + 8, true);
            vector4.w = this._dataView.getFloat32(byteOffset + 12, true);
        }
    };
    _BinaryWriter.prototype.setVector4Float32FromRef = function (vector4, byteOffset) {
        if (byteOffset + 12 > this._byteOffset) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
        }
        else {
            this._dataView.setFloat32(byteOffset, vector4.x, true);
            this._dataView.setFloat32(byteOffset + 4, vector4.y, true);
            this._dataView.setFloat32(byteOffset + 8, vector4.z, true);
            this._dataView.setFloat32(byteOffset + 12, vector4.w, true);
        }
    };
    /**
     * Stores a Float32 in the array buffer
     * @param entry
     * @param byteOffset
     */
    _BinaryWriter.prototype.setFloat32 = function (entry, byteOffset) {
        if (isNaN(entry)) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Invalid data being written!");
        }
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setFloat32(byteOffset, entry, true);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary length!");
            }
        }
        if (this._byteOffset + 4 > this._arrayBuffer.byteLength) {
            this._resizeBuffer(this._arrayBuffer.byteLength * 2);
        }
        this._dataView.setFloat32(this._byteOffset, entry, true);
        this._byteOffset += 4;
    };
    /**
     * Stores an UInt32 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setUInt32 = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setUint32(byteOffset, entry, true);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 4 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setUint32(this._byteOffset, entry, true);
            this._byteOffset += 4;
        }
    };
    /**
     * Stores an Int16 in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setInt16 = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setInt16(byteOffset, entry, true);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 2 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setInt16(this._byteOffset, entry, true);
            this._byteOffset += 2;
        }
    };
    /**
     * Stores a byte in the array buffer
     * @param entry
     * @param byteOffset If defined, specifies where to set the value as an offset.
     */
    _BinaryWriter.prototype.setByte = function (entry, byteOffset) {
        if (byteOffset != null) {
            if (byteOffset < this._byteOffset) {
                this._dataView.setInt8(byteOffset, entry);
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("BinaryWriter: byteoffset is greater than the current binary buffer length!");
            }
        }
        else {
            if (this._byteOffset + 1 > this._arrayBuffer.byteLength) {
                this._resizeBuffer(this._arrayBuffer.byteLength * 2);
            }
            this._dataView.setInt8(this._byteOffset, entry);
            this._byteOffset++;
        }
    };
    return _BinaryWriter;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFExporterExtension.ts":
/*!**********************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFExporterExtension.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __IGLTFExporterExtensionV2: () => (/* binding */ __IGLTFExporterExtensionV2)
/* harmony export */ });
/** @internal */
// eslint-disable-next-line no-var, @typescript-eslint/naming-convention
var __IGLTFExporterExtensionV2 = 0; // I am here to allow dts to be created


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFMaterialExporter.ts":
/*!*********************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFMaterialExporter.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _GLTFMaterialExporter: () => (/* binding */ _GLTFMaterialExporter)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/dumpTools */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);










function getFileExtensionFromMimeType(mimeType) {
    switch (mimeType) {
        case "image/jpeg" /* ImageMimeType.JPEG */:
            return ".jpg";
        case "image/png" /* ImageMimeType.PNG */:
            return ".png";
        case "image/webp" /* ImageMimeType.WEBP */:
            return ".webp";
    }
}
/**
 * Utility methods for working with glTF material conversion properties.  This class should only be used internally
 * @internal
 */
var _GLTFMaterialExporter = /** @class */ (function () {
    function _GLTFMaterialExporter(exporter) {
        /**
         * Mapping to store textures
         */
        this._textureMap = {};
        // Mapping of internal textures to images to avoid exporting duplicate images.
        this._internalTextureToImage = {};
        this._textureMap = {};
        this._exporter = exporter;
    }
    /**
     * Specifies if two colors are approximately equal in value
     * @param color1 first color to compare to
     * @param color2 second color to compare to
     * @param epsilon threshold value
     */
    _GLTFMaterialExporter._FuzzyEquals = function (color1, color2, epsilon) {
        return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.WithinEpsilon(color1.r, color2.r, epsilon) && babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.WithinEpsilon(color1.g, color2.g, epsilon) && babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.WithinEpsilon(color1.b, color2.b, epsilon);
    };
    /**
     * Gets the materials from a Babylon scene and converts them to glTF materials
     * @param exportMaterials
     * @param mimeType texture mime type
     * @param hasTextureCoords specifies if texture coordinates are present on the material
     */
    _GLTFMaterialExporter.prototype._convertMaterialsToGLTFAsync = function (exportMaterials, mimeType, hasTextureCoords) {
        var _this = this;
        var promises = [];
        exportMaterials.forEach(function (material) {
            if (material.getClassName() === "StandardMaterial") {
                promises.push(_this._convertStandardMaterialAsync(material, mimeType, hasTextureCoords));
            }
            else if (material.getClassName().indexOf("PBR") !== -1) {
                promises.push(_this._convertPBRMaterialAsync(material, mimeType, hasTextureCoords));
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported material type: ".concat(material.name));
            }
        });
        return Promise.all(promises).then(function () {
            /* do nothing */
        });
    };
    /**
     * Makes a copy of the glTF material without the texture parameters
     * @param originalMaterial original glTF material
     * @returns glTF material without texture parameters
     */
    _GLTFMaterialExporter.prototype._stripTexturesFromMaterial = function (originalMaterial) {
        var newMaterial = {};
        if (originalMaterial) {
            newMaterial.name = originalMaterial.name;
            newMaterial.doubleSided = originalMaterial.doubleSided;
            newMaterial.alphaMode = originalMaterial.alphaMode;
            newMaterial.alphaCutoff = originalMaterial.alphaCutoff;
            newMaterial.emissiveFactor = originalMaterial.emissiveFactor;
            var originalPBRMetallicRoughness = originalMaterial.pbrMetallicRoughness;
            if (originalPBRMetallicRoughness) {
                newMaterial.pbrMetallicRoughness = {};
                newMaterial.pbrMetallicRoughness.baseColorFactor = originalPBRMetallicRoughness.baseColorFactor;
                newMaterial.pbrMetallicRoughness.metallicFactor = originalPBRMetallicRoughness.metallicFactor;
                newMaterial.pbrMetallicRoughness.roughnessFactor = originalPBRMetallicRoughness.roughnessFactor;
            }
        }
        return newMaterial;
    };
    /**
     * Specifies if the material has any texture parameters present
     * @param material glTF Material
     * @returns boolean specifying if texture parameters are present
     */
    _GLTFMaterialExporter.prototype._hasTexturesPresent = function (material) {
        var _a;
        if (material.emissiveTexture || material.normalTexture || material.occlusionTexture) {
            return true;
        }
        var pbrMat = material.pbrMetallicRoughness;
        if (pbrMat) {
            if (pbrMat.baseColorTexture || pbrMat.metallicRoughnessTexture) {
                return true;
            }
        }
        if (material.extensions) {
            for (var extension in material.extensions) {
                var extensionObject = material.extensions[extension];
                if (extensionObject) {
                    return (_a = extensionObject.hasTextures) === null || _a === void 0 ? void 0 : _a.call(extensionObject);
                }
            }
        }
        return false;
    };
    _GLTFMaterialExporter.prototype._getTextureInfo = function (babylonTexture) {
        if (babylonTexture) {
            var textureUid = babylonTexture.uid;
            if (textureUid in this._textureMap) {
                return this._textureMap[textureUid];
            }
        }
        return null;
    };
    /**
     * Converts a Babylon StandardMaterial to a glTF Metallic Roughness Material
     * @param babylonStandardMaterial
     * @returns glTF Metallic Roughness Material representation
     */
    _GLTFMaterialExporter.prototype._convertToGLTFPBRMetallicRoughness = function (babylonStandardMaterial) {
        // Defines a cubic bezier curve where x is specular power and y is roughness
        var P0 = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(0, 1);
        var P1 = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(0, 0.1);
        var P2 = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(0, 0.1);
        var P3 = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(1300, 0.1);
        /**
         * Given the control points, solve for x based on a given t for a cubic bezier curve
         * @param t a value between 0 and 1
         * @param p0 first control point
         * @param p1 second control point
         * @param p2 third control point
         * @param p3 fourth control point
         * @returns number result of cubic bezier curve at the specified t
         */
        function cubicBezierCurve(t, p0, p1, p2, p3) {
            return (1 - t) * (1 - t) * (1 - t) * p0 + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * p3;
        }
        /**
         * Evaluates a specified specular power value to determine the appropriate roughness value,
         * based on a pre-defined cubic bezier curve with specular on the abscissa axis (x-axis)
         * and roughness on the ordinant axis (y-axis)
         * @param specularPower specular power of standard material
         * @returns Number representing the roughness value
         */
        function solveForRoughness(specularPower) {
            // Given P0.x = 0, P1.x = 0, P2.x = 0
            //   x = t * t * t * P3.x
            //   t = (x / P3.x)^(1/3)
            var t = Math.pow(specularPower / P3.x, 0.333333);
            return cubicBezierCurve(t, P0.y, P1.y, P2.y, P3.y);
        }
        var diffuse = babylonStandardMaterial.diffuseColor.toLinearSpace(babylonStandardMaterial.getScene().getEngine().useExactSrgbConversions).scale(0.5);
        var opacity = babylonStandardMaterial.alpha;
        var specularPower = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.Clamp(babylonStandardMaterial.specularPower, 0, _GLTFMaterialExporter._MaxSpecularPower);
        var roughness = solveForRoughness(specularPower);
        var glTFPbrMetallicRoughness = {
            baseColorFactor: [diffuse.r, diffuse.g, diffuse.b, opacity],
            metallicFactor: 0,
            roughnessFactor: roughness,
        };
        return glTFPbrMetallicRoughness;
    };
    /**
     * Computes the metallic factor
     * @param diffuse diffused value
     * @param specular specular value
     * @param oneMinusSpecularStrength one minus the specular strength
     * @returns metallic value
     */
    _GLTFMaterialExporter._SolveMetallic = function (diffuse, specular, oneMinusSpecularStrength) {
        if (specular < this._DielectricSpecular.r) {
            this._DielectricSpecular;
            return 0;
        }
        var a = this._DielectricSpecular.r;
        var b = (diffuse * oneMinusSpecularStrength) / (1.0 - this._DielectricSpecular.r) + specular - 2.0 * this._DielectricSpecular.r;
        var c = this._DielectricSpecular.r - specular;
        var D = b * b - 4.0 * a * c;
        return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Scalar.Clamp((-b + Math.sqrt(D)) / (2.0 * a), 0, 1);
    };
    /**
     * Sets the glTF alpha mode to a glTF material from the Babylon Material
     * @param glTFMaterial glTF material
     * @param babylonMaterial Babylon material
     */
    _GLTFMaterialExporter._SetAlphaMode = function (glTFMaterial, babylonMaterial) {
        if (babylonMaterial.needAlphaBlending()) {
            glTFMaterial.alphaMode = "BLEND" /* MaterialAlphaMode.BLEND */;
        }
        else if (babylonMaterial.needAlphaTesting()) {
            glTFMaterial.alphaMode = "MASK" /* MaterialAlphaMode.MASK */;
            glTFMaterial.alphaCutoff = babylonMaterial.alphaCutOff;
        }
    };
    /**
     * Converts a Babylon Standard Material to a glTF Material
     * @param babylonStandardMaterial BJS Standard Material
     * @param mimeType mime type to use for the textures
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     */
    _GLTFMaterialExporter.prototype._convertStandardMaterialAsync = function (babylonStandardMaterial, mimeType, hasTextureCoords) {
        var materialMap = this._exporter._materialMap;
        var materials = this._exporter._materials;
        var promises = [];
        var pbrMetallicRoughness = this._convertToGLTFPBRMetallicRoughness(babylonStandardMaterial);
        var material = { name: babylonStandardMaterial.name };
        if (babylonStandardMaterial.backFaceCulling != null && !babylonStandardMaterial.backFaceCulling) {
            if (!babylonStandardMaterial.twoSidedLighting) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn(babylonStandardMaterial.name + ": Back-face culling disabled and two-sided lighting disabled is not supported in glTF.");
            }
            material.doubleSided = true;
        }
        if (hasTextureCoords) {
            if (babylonStandardMaterial.diffuseTexture) {
                promises.push(this._exportTextureAsync(babylonStandardMaterial.diffuseTexture, mimeType).then(function (textureInfo) {
                    if (textureInfo) {
                        pbrMetallicRoughness.baseColorTexture = textureInfo;
                    }
                }));
            }
            var bumpTexture_1 = babylonStandardMaterial.bumpTexture;
            if (bumpTexture_1) {
                promises.push(this._exportTextureAsync(bumpTexture_1, mimeType).then(function (textureInfo) {
                    if (textureInfo) {
                        material.normalTexture = textureInfo;
                        if (bumpTexture_1.level !== 1) {
                            material.normalTexture.scale = bumpTexture_1.level;
                        }
                    }
                }));
            }
            if (babylonStandardMaterial.emissiveTexture) {
                material.emissiveFactor = [1.0, 1.0, 1.0];
                promises.push(this._exportTextureAsync(babylonStandardMaterial.emissiveTexture, mimeType).then(function (textureInfo) {
                    if (textureInfo) {
                        material.emissiveTexture = textureInfo;
                    }
                }));
            }
            if (babylonStandardMaterial.ambientTexture) {
                promises.push(this._exportTextureAsync(babylonStandardMaterial.ambientTexture, mimeType).then(function (textureInfo) {
                    if (textureInfo) {
                        var occlusionTexture = {
                            index: textureInfo.index,
                        };
                        material.occlusionTexture = occlusionTexture;
                    }
                }));
            }
        }
        if (babylonStandardMaterial.alpha < 1.0 || babylonStandardMaterial.opacityTexture) {
            if (babylonStandardMaterial.alphaMode === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.ALPHA_COMBINE) {
                material.alphaMode = "BLEND" /* MaterialAlphaMode.BLEND */;
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn(babylonStandardMaterial.name + ": glTF 2.0 does not support alpha mode: " + babylonStandardMaterial.alphaMode.toString());
            }
        }
        if (babylonStandardMaterial.emissiveColor && !_GLTFMaterialExporter._FuzzyEquals(babylonStandardMaterial.emissiveColor, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.Black(), _GLTFMaterialExporter._Epsilon)) {
            material.emissiveFactor = babylonStandardMaterial.emissiveColor.asArray();
        }
        material.pbrMetallicRoughness = pbrMetallicRoughness;
        _GLTFMaterialExporter._SetAlphaMode(material, babylonStandardMaterial);
        materials.push(material);
        materialMap[babylonStandardMaterial.uniqueId] = materials.length - 1;
        return this._finishMaterial(promises, material, babylonStandardMaterial, mimeType);
    };
    _GLTFMaterialExporter.prototype._finishMaterial = function (promises, glTFMaterial, babylonMaterial, mimeType) {
        var _this = this;
        return Promise.all(promises).then(function () {
            var textures = _this._exporter._extensionsPostExportMaterialAdditionalTextures("exportMaterial", glTFMaterial, babylonMaterial);
            var tasks = null;
            for (var _i = 0, textures_1 = textures; _i < textures_1.length; _i++) {
                var texture = textures_1[_i];
                if (!tasks) {
                    tasks = [];
                }
                tasks.push(_this._exportTextureAsync(texture, mimeType));
            }
            if (!tasks) {
                tasks = [Promise.resolve(null)];
            }
            return Promise.all(tasks).then(function () {
                var extensionWork = _this._exporter._extensionsPostExportMaterialAsync("exportMaterial", glTFMaterial, babylonMaterial);
                if (!extensionWork) {
                    return glTFMaterial;
                }
                return extensionWork.then(function () { return glTFMaterial; });
            });
        });
    };
    /**
     * Converts an image typed array buffer to a base64 image
     * @param buffer typed array buffer
     * @param width width of the image
     * @param height height of the image
     * @param mimeType mimetype of the image
     * @returns base64 image string
     */
    _GLTFMaterialExporter.prototype._getImageDataAsync = function (buffer, width, height, mimeType) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            var textureType, hostingScene, engine, tempTexture, data;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        textureType = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURETYPE_UNSIGNED_INT;
                        hostingScene = this._exporter._babylonScene;
                        engine = hostingScene.getEngine();
                        tempTexture = engine.createRawTexture(buffer, width, height, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTUREFORMAT_RGBA, false, true, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_SAMPLINGMODE, null, textureType);
                        return [4 /*yield*/, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TextureTools.ApplyPostProcess("pass", tempTexture, hostingScene, textureType, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURE_NEAREST_SAMPLINGMODE, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTUREFORMAT_RGBA)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, engine._readTexturePixels(tempTexture, width, height)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.DumpTools.DumpDataAsync(width, height, data, mimeType, undefined, true, true)];
                    case 3: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    /**
     * Generates a white texture based on the specified width and height
     * @param width width of the texture in pixels
     * @param height height of the texture in pixels
     * @param scene babylonjs scene
     * @returns white texture
     */
    _GLTFMaterialExporter.prototype._createWhiteTexture = function (width, height, scene) {
        var data = new Uint8Array(width * height * 4);
        for (var i = 0; i < data.length; i = i + 4) {
            data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0xff;
        }
        var rawTexture = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.RawTexture.CreateRGBATexture(data, width, height, scene);
        return rawTexture;
    };
    /**
     * Resizes the two source textures to the same dimensions.  If a texture is null, a default white texture is generated.  If both textures are null, returns null
     * @param texture1 first texture to resize
     * @param texture2 second texture to resize
     * @param scene babylonjs scene
     * @returns resized textures or null
     */
    _GLTFMaterialExporter.prototype._resizeTexturesToSameDimensions = function (texture1, texture2, scene) {
        var texture1Size = texture1 ? texture1.getSize() : { width: 0, height: 0 };
        var texture2Size = texture2 ? texture2.getSize() : { width: 0, height: 0 };
        var resizedTexture1;
        var resizedTexture2;
        if (texture1Size.width < texture2Size.width) {
            if (texture1 && texture1 instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture) {
                resizedTexture1 = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TextureTools.CreateResizedCopy(texture1, texture2Size.width, texture2Size.height, true);
            }
            else {
                resizedTexture1 = this._createWhiteTexture(texture2Size.width, texture2Size.height, scene);
            }
            resizedTexture2 = texture2;
        }
        else if (texture1Size.width > texture2Size.width) {
            if (texture2 && texture2 instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture) {
                resizedTexture2 = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TextureTools.CreateResizedCopy(texture2, texture1Size.width, texture1Size.height, true);
            }
            else {
                resizedTexture2 = this._createWhiteTexture(texture1Size.width, texture1Size.height, scene);
            }
            resizedTexture1 = texture1;
        }
        else {
            resizedTexture1 = texture1;
            resizedTexture2 = texture2;
        }
        return {
            texture1: resizedTexture1,
            texture2: resizedTexture2,
        };
    };
    /**
     * Converts an array of pixels to a Float32Array
     * Throws an error if the pixel format is not supported
     * @param pixels - array buffer containing pixel values
     * @returns Float32 of pixels
     */
    _GLTFMaterialExporter.prototype._convertPixelArrayToFloat32 = function (pixels) {
        if (pixels instanceof Uint8Array) {
            var length_1 = pixels.length;
            var buffer = new Float32Array(pixels.length);
            for (var i = 0; i < length_1; ++i) {
                buffer[i] = pixels[i] / 255;
            }
            return buffer;
        }
        else if (pixels instanceof Float32Array) {
            return pixels;
        }
        else {
            throw new Error("Unsupported pixel format!");
        }
    };
    /**
     * Convert Specular Glossiness Textures to Metallic Roughness
     * See link below for info on the material conversions from PBR Metallic/Roughness and Specular/Glossiness
     * @link https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/examples/convert-between-workflows-bjs/js/babylon.pbrUtilities.js
     * @param diffuseTexture texture used to store diffuse information
     * @param specularGlossinessTexture texture used to store specular and glossiness information
     * @param factors specular glossiness material factors
     * @param mimeType the mime type to use for the texture
     * @returns pbr metallic roughness interface or null
     */
    _GLTFMaterialExporter.prototype._convertSpecularGlossinessTexturesToMetallicRoughnessAsync = function (diffuseTexture, specularGlossinessTexture, factors, mimeType) {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            var promises, scene, resizedTextures, diffuseSize, diffuseBuffer, specularGlossinessBuffer, width, height, diffusePixels, specularPixels, byteLength, metallicRoughnessBuffer, baseColorBuffer, strideSize, maxBaseColor, maxMetallic, maxRoughness, h, w, offset, diffuseColor, specularColor, glossiness, specularGlossiness, metallicRoughness, metallicRoughnessFactors_1, writeOutMetallicRoughnessTexture, writeOutBaseColorTexture, h, w, destinationOffset, linearBaseColorPixel, sRGBBaseColorPixel, metallicRoughnessPixel;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promises = new Array();
                        if (!(diffuseTexture || specularGlossinessTexture)) {
                            return [2 /*return*/, Promise.reject("_ConvertSpecularGlosinessTexturesToMetallicRoughness: diffuse and specular glossiness textures are not defined!")];
                        }
                        scene = diffuseTexture ? diffuseTexture.getScene() : specularGlossinessTexture ? specularGlossinessTexture.getScene() : null;
                        if (!scene) return [3 /*break*/, 3];
                        resizedTextures = this._resizeTexturesToSameDimensions(diffuseTexture, specularGlossinessTexture, scene);
                        diffuseSize = (_a = resizedTextures.texture1) === null || _a === void 0 ? void 0 : _a.getSize();
                        diffuseBuffer = void 0;
                        specularGlossinessBuffer = void 0;
                        width = diffuseSize.width;
                        height = diffuseSize.height;
                        return [4 /*yield*/, resizedTextures.texture1.readPixels()];
                    case 1:
                        diffusePixels = _b.sent();
                        return [4 /*yield*/, resizedTextures.texture2.readPixels()];
                    case 2:
                        specularPixels = _b.sent();
                        if (diffusePixels) {
                            diffuseBuffer = this._convertPixelArrayToFloat32(diffusePixels);
                        }
                        else {
                            return [2 /*return*/, Promise.reject("Failed to retrieve pixels from diffuse texture!")];
                        }
                        if (specularPixels) {
                            specularGlossinessBuffer = this._convertPixelArrayToFloat32(specularPixels);
                        }
                        else {
                            return [2 /*return*/, Promise.reject("Failed to retrieve pixels from specular glossiness texture!")];
                        }
                        byteLength = specularGlossinessBuffer.byteLength;
                        metallicRoughnessBuffer = new Uint8Array(byteLength);
                        baseColorBuffer = new Uint8Array(byteLength);
                        strideSize = 4;
                        maxBaseColor = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.Black();
                        maxMetallic = 0;
                        maxRoughness = 0;
                        for (h = 0; h < height; ++h) {
                            for (w = 0; w < width; ++w) {
                                offset = (width * h + w) * strideSize;
                                diffuseColor = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3(diffuseBuffer[offset], diffuseBuffer[offset + 1], diffuseBuffer[offset + 2])
                                    .toLinearSpace(scene.getEngine().useExactSrgbConversions)
                                    .multiply(factors.diffuseColor);
                                specularColor = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3(specularGlossinessBuffer[offset], specularGlossinessBuffer[offset + 1], specularGlossinessBuffer[offset + 2])
                                    .toLinearSpace(scene.getEngine().useExactSrgbConversions)
                                    .multiply(factors.specularColor);
                                glossiness = specularGlossinessBuffer[offset + 3] * factors.glossiness;
                                specularGlossiness = {
                                    diffuseColor: diffuseColor,
                                    specularColor: specularColor,
                                    glossiness: glossiness,
                                };
                                metallicRoughness = this._convertSpecularGlossinessToMetallicRoughness(specularGlossiness);
                                maxBaseColor.r = Math.max(maxBaseColor.r, metallicRoughness.baseColor.r);
                                maxBaseColor.g = Math.max(maxBaseColor.g, metallicRoughness.baseColor.g);
                                maxBaseColor.b = Math.max(maxBaseColor.b, metallicRoughness.baseColor.b);
                                maxMetallic = Math.max(maxMetallic, metallicRoughness.metallic);
                                maxRoughness = Math.max(maxRoughness, metallicRoughness.roughness);
                                baseColorBuffer[offset] = metallicRoughness.baseColor.r * 255;
                                baseColorBuffer[offset + 1] = metallicRoughness.baseColor.g * 255;
                                baseColorBuffer[offset + 2] = metallicRoughness.baseColor.b * 255;
                                baseColorBuffer[offset + 3] = resizedTextures.texture1.hasAlpha ? diffuseBuffer[offset + 3] * 255 : 255;
                                metallicRoughnessBuffer[offset] = 0;
                                metallicRoughnessBuffer[offset + 1] = metallicRoughness.roughness * 255;
                                metallicRoughnessBuffer[offset + 2] = metallicRoughness.metallic * 255;
                                metallicRoughnessBuffer[offset + 3] = 255;
                            }
                        }
                        metallicRoughnessFactors_1 = {
                            baseColor: maxBaseColor,
                            metallic: maxMetallic,
                            roughness: maxRoughness,
                        };
                        writeOutMetallicRoughnessTexture = false;
                        writeOutBaseColorTexture = false;
                        for (h = 0; h < height; ++h) {
                            for (w = 0; w < width; ++w) {
                                destinationOffset = (width * h + w) * strideSize;
                                baseColorBuffer[destinationOffset] /= metallicRoughnessFactors_1.baseColor.r > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.baseColor.r : 1;
                                baseColorBuffer[destinationOffset + 1] /= metallicRoughnessFactors_1.baseColor.g > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.baseColor.g : 1;
                                baseColorBuffer[destinationOffset + 2] /= metallicRoughnessFactors_1.baseColor.b > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.baseColor.b : 1;
                                linearBaseColorPixel = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.FromInts(baseColorBuffer[destinationOffset], baseColorBuffer[destinationOffset + 1], baseColorBuffer[destinationOffset + 2]);
                                sRGBBaseColorPixel = linearBaseColorPixel.toGammaSpace(scene.getEngine().useExactSrgbConversions);
                                baseColorBuffer[destinationOffset] = sRGBBaseColorPixel.r * 255;
                                baseColorBuffer[destinationOffset + 1] = sRGBBaseColorPixel.g * 255;
                                baseColorBuffer[destinationOffset + 2] = sRGBBaseColorPixel.b * 255;
                                if (!_GLTFMaterialExporter._FuzzyEquals(sRGBBaseColorPixel, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White(), _GLTFMaterialExporter._Epsilon)) {
                                    writeOutBaseColorTexture = true;
                                }
                                metallicRoughnessBuffer[destinationOffset + 1] /=
                                    metallicRoughnessFactors_1.roughness > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.roughness : 1;
                                metallicRoughnessBuffer[destinationOffset + 2] /= metallicRoughnessFactors_1.metallic > _GLTFMaterialExporter._Epsilon ? metallicRoughnessFactors_1.metallic : 1;
                                metallicRoughnessPixel = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.FromInts(255, metallicRoughnessBuffer[destinationOffset + 1], metallicRoughnessBuffer[destinationOffset + 2]);
                                if (!_GLTFMaterialExporter._FuzzyEquals(metallicRoughnessPixel, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White(), _GLTFMaterialExporter._Epsilon)) {
                                    writeOutMetallicRoughnessTexture = true;
                                }
                            }
                        }
                        if (writeOutMetallicRoughnessTexture) {
                            promises.push(this._getImageDataAsync(metallicRoughnessBuffer, width, height, mimeType).then(function (data) {
                                metallicRoughnessFactors_1.metallicRoughnessTextureData = data;
                            }));
                        }
                        if (writeOutBaseColorTexture) {
                            promises.push(this._getImageDataAsync(baseColorBuffer, width, height, mimeType).then(function (data) {
                                metallicRoughnessFactors_1.baseColorTextureData = data;
                            }));
                        }
                        return [2 /*return*/, Promise.all(promises).then(function () {
                                return metallicRoughnessFactors_1;
                            })];
                    case 3: return [2 /*return*/, Promise.reject("_ConvertSpecularGlossinessTexturesToMetallicRoughness: Scene from textures is missing!")];
                }
            });
        });
    };
    /**
     * Converts specular glossiness material properties to metallic roughness
     * @param specularGlossiness interface with specular glossiness material properties
     * @returns interface with metallic roughness material properties
     */
    _GLTFMaterialExporter.prototype._convertSpecularGlossinessToMetallicRoughness = function (specularGlossiness) {
        var diffusePerceivedBrightness = this._getPerceivedBrightness(specularGlossiness.diffuseColor);
        var specularPerceivedBrightness = this._getPerceivedBrightness(specularGlossiness.specularColor);
        var oneMinusSpecularStrength = 1 - this._getMaxComponent(specularGlossiness.specularColor);
        var metallic = _GLTFMaterialExporter._SolveMetallic(diffusePerceivedBrightness, specularPerceivedBrightness, oneMinusSpecularStrength);
        var baseColorFromDiffuse = specularGlossiness.diffuseColor.scale(oneMinusSpecularStrength / (1.0 - _GLTFMaterialExporter._DielectricSpecular.r) / Math.max(1 - metallic, _GLTFMaterialExporter._Epsilon));
        var baseColorFromSpecular = specularGlossiness.specularColor
            .subtract(_GLTFMaterialExporter._DielectricSpecular.scale(1 - metallic))
            .scale(1 / Math.max(metallic, _GLTFMaterialExporter._Epsilon));
        var baseColor = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.Lerp(baseColorFromDiffuse, baseColorFromSpecular, metallic * metallic);
        baseColor = baseColor.clampToRef(0, 1, baseColor);
        var metallicRoughness = {
            baseColor: baseColor,
            metallic: metallic,
            roughness: 1 - specularGlossiness.glossiness,
        };
        return metallicRoughness;
    };
    /**
     * Calculates the surface reflectance, independent of lighting conditions
     * @param color Color source to calculate brightness from
     * @returns number representing the perceived brightness, or zero if color is undefined
     */
    _GLTFMaterialExporter.prototype._getPerceivedBrightness = function (color) {
        if (color) {
            return Math.sqrt(0.299 * color.r * color.r + 0.587 * color.g * color.g + 0.114 * color.b * color.b);
        }
        return 0;
    };
    /**
     * Returns the maximum color component value
     * @param color
     * @returns maximum color component value, or zero if color is null or undefined
     */
    _GLTFMaterialExporter.prototype._getMaxComponent = function (color) {
        if (color) {
            return Math.max(color.r, Math.max(color.g, color.b));
        }
        return 0;
    };
    /**
     * Convert a PBRMaterial (Metallic/Roughness) to Metallic Roughness factors
     * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
     * @param mimeType mime type to use for the textures
     * @param glTFPbrMetallicRoughness glTF PBR Metallic Roughness interface
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns glTF PBR Metallic Roughness factors
     */
    _GLTFMaterialExporter.prototype._convertMetalRoughFactorsToMetallicRoughnessAsync = function (babylonPBRMaterial, mimeType, glTFPbrMetallicRoughness, hasTextureCoords) {
        var promises = [];
        var baseColor = babylonPBRMaterial._albedoColor;
        var metallic = babylonPBRMaterial._metallic;
        var roughness = babylonPBRMaterial._roughness;
        var metallicRoughness = {
            baseColor: baseColor,
            metallic: metallic,
            roughness: roughness,
        };
        if (hasTextureCoords) {
            var albedoTexture = babylonPBRMaterial._albedoTexture;
            if (albedoTexture) {
                promises.push(this._exportTextureAsync(babylonPBRMaterial._albedoTexture, mimeType).then(function (glTFTexture) {
                    if (glTFTexture) {
                        glTFPbrMetallicRoughness.baseColorTexture = glTFTexture;
                    }
                }));
            }
            var metallicTexture = babylonPBRMaterial._metallicTexture;
            if (metallicTexture) {
                promises.push(this._exportTextureAsync(metallicTexture, mimeType).then(function (glTFTexture) {
                    if (glTFTexture) {
                        glTFPbrMetallicRoughness.metallicRoughnessTexture = glTFTexture;
                    }
                }));
            }
        }
        return Promise.all(promises).then(function () {
            return metallicRoughness;
        });
    };
    _GLTFMaterialExporter.prototype._getTextureSampler = function (texture) {
        var sampler = {};
        if (!texture || !(texture instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture)) {
            return sampler;
        }
        var wrapS = this._getGLTFTextureWrapMode(texture.wrapU);
        if (wrapS !== 10497 /* TextureWrapMode.REPEAT */) {
            sampler.wrapS = wrapS;
        }
        var wrapT = this._getGLTFTextureWrapMode(texture.wrapV);
        if (wrapT !== 10497 /* TextureWrapMode.REPEAT */) {
            sampler.wrapT = wrapT;
        }
        switch (texture.samplingMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9729 /* TextureMinFilter.LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9728 /* TextureMinFilter.NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9729 /* TextureMinFilter.LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR_MIPLINEAR: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9987 /* TextureMinFilter.LINEAR_MIPMAP_LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9728 /* TextureMinFilter.NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR_MIPNEAREST: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9985 /* TextureMinFilter.LINEAR_MIPMAP_NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST_MIPNEAREST: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9984 /* TextureMinFilter.NEAREST_MIPMAP_NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST_MIPLINEAR: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9986 /* TextureMinFilter.NEAREST_MIPMAP_LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPLINEAR: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9986 /* TextureMinFilter.NEAREST_MIPMAP_LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPLINEAR: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9987 /* TextureMinFilter.LINEAR_MIPMAP_LINEAR */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPNEAREST: {
                sampler.magFilter = 9729 /* TextureMagFilter.LINEAR */;
                sampler.minFilter = 9985 /* TextureMinFilter.LINEAR_MIPMAP_NEAREST */;
                break;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPNEAREST: {
                sampler.magFilter = 9728 /* TextureMagFilter.NEAREST */;
                sampler.minFilter = 9984 /* TextureMinFilter.NEAREST_MIPMAP_NEAREST */;
                break;
            }
        }
        return sampler;
    };
    _GLTFMaterialExporter.prototype._getGLTFTextureWrapMode = function (wrapMode) {
        switch (wrapMode) {
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.WRAP_ADDRESSMODE: {
                return 10497 /* TextureWrapMode.REPEAT */;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE: {
                return 33071 /* TextureWrapMode.CLAMP_TO_EDGE */;
            }
            case babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Texture.MIRROR_ADDRESSMODE: {
                return 33648 /* TextureWrapMode.MIRRORED_REPEAT */;
            }
            default: {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Unsupported Texture Wrap Mode ".concat(wrapMode, "!"));
                return 10497 /* TextureWrapMode.REPEAT */;
            }
        }
    };
    /**
     * Convert a PBRMaterial (Specular/Glossiness) to Metallic Roughness factors
     * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
     * @param mimeType mime type to use for the textures
     * @param glTFPbrMetallicRoughness glTF PBR Metallic Roughness interface
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns glTF PBR Metallic Roughness factors
     */
    _GLTFMaterialExporter.prototype._convertSpecGlossFactorsToMetallicRoughnessAsync = function (babylonPBRMaterial, mimeType, pbrMetallicRoughness, hasTextureCoords) {
        var _this = this;
        return Promise.resolve().then(function () {
            var specGloss = {
                diffuseColor: babylonPBRMaterial._albedoColor,
                specularColor: babylonPBRMaterial._reflectivityColor,
                glossiness: babylonPBRMaterial._microSurface,
            };
            var albedoTexture = babylonPBRMaterial._albedoTexture;
            var reflectivityTexture = babylonPBRMaterial._reflectivityTexture;
            var useMicrosurfaceFromReflectivityMapAlpha = babylonPBRMaterial._useMicroSurfaceFromReflectivityMapAlpha;
            if (reflectivityTexture && !useMicrosurfaceFromReflectivityMapAlpha) {
                return Promise.reject("_ConvertPBRMaterial: Glossiness values not included in the reflectivity texture are currently not supported");
            }
            if ((albedoTexture || reflectivityTexture) && hasTextureCoords) {
                var samplerIndex_1 = _this._exportTextureSampler(albedoTexture || reflectivityTexture);
                return _this._convertSpecularGlossinessTexturesToMetallicRoughnessAsync(albedoTexture, reflectivityTexture, specGloss, mimeType).then(function (metallicRoughnessFactors) {
                    var textures = _this._exporter._textures;
                    if (metallicRoughnessFactors.baseColorTextureData) {
                        var imageIndex = _this._exportImage("baseColor".concat(textures.length), mimeType, metallicRoughnessFactors.baseColorTextureData);
                        pbrMetallicRoughness.baseColorTexture = _this._exportTextureInfo(imageIndex, samplerIndex_1, albedoTexture === null || albedoTexture === void 0 ? void 0 : albedoTexture.coordinatesIndex);
                    }
                    if (metallicRoughnessFactors.metallicRoughnessTextureData) {
                        var imageIndex = _this._exportImage("metallicRoughness".concat(textures.length), mimeType, metallicRoughnessFactors.metallicRoughnessTextureData);
                        pbrMetallicRoughness.metallicRoughnessTexture = _this._exportTextureInfo(imageIndex, samplerIndex_1, reflectivityTexture === null || reflectivityTexture === void 0 ? void 0 : reflectivityTexture.coordinatesIndex);
                    }
                    return metallicRoughnessFactors;
                });
            }
            else {
                return _this._convertSpecularGlossinessToMetallicRoughness(specGloss);
            }
        });
    };
    /**
     * Converts a Babylon PBR Base Material to a glTF Material
     * @param babylonPBRMaterial BJS PBR Base Material
     * @param mimeType mime type to use for the textures
     * @param hasTextureCoords specifies if texture coordinates are present on the submesh to determine if textures should be applied
     */
    _GLTFMaterialExporter.prototype._convertPBRMaterialAsync = function (babylonPBRMaterial, mimeType, hasTextureCoords) {
        var _this = this;
        var glTFPbrMetallicRoughness = {};
        var glTFMaterial = {
            name: babylonPBRMaterial.name,
        };
        var useMetallicRoughness = babylonPBRMaterial.isMetallicWorkflow();
        if (useMetallicRoughness) {
            var albedoColor = babylonPBRMaterial._albedoColor;
            var alpha = babylonPBRMaterial.alpha;
            if (albedoColor) {
                glTFPbrMetallicRoughness.baseColorFactor = [albedoColor.r, albedoColor.g, albedoColor.b, alpha];
            }
            return this._convertMetalRoughFactorsToMetallicRoughnessAsync(babylonPBRMaterial, mimeType, glTFPbrMetallicRoughness, hasTextureCoords).then(function (metallicRoughness) {
                return _this._setMetallicRoughnessPbrMaterial(metallicRoughness, babylonPBRMaterial, glTFMaterial, glTFPbrMetallicRoughness, mimeType, hasTextureCoords);
            });
        }
        else {
            return this._convertSpecGlossFactorsToMetallicRoughnessAsync(babylonPBRMaterial, mimeType, glTFPbrMetallicRoughness, hasTextureCoords).then(function (metallicRoughness) {
                return _this._setMetallicRoughnessPbrMaterial(metallicRoughness, babylonPBRMaterial, glTFMaterial, glTFPbrMetallicRoughness, mimeType, hasTextureCoords);
            });
        }
    };
    _GLTFMaterialExporter.prototype._setMetallicRoughnessPbrMaterial = function (metallicRoughness, babylonPBRMaterial, glTFMaterial, glTFPbrMetallicRoughness, mimeType, hasTextureCoords) {
        var materialMap = this._exporter._materialMap;
        var materials = this._exporter._materials;
        var promises = [];
        if (metallicRoughness) {
            _GLTFMaterialExporter._SetAlphaMode(glTFMaterial, babylonPBRMaterial);
            if (!(_GLTFMaterialExporter._FuzzyEquals(metallicRoughness.baseColor, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White(), _GLTFMaterialExporter._Epsilon) &&
                babylonPBRMaterial.alpha >= _GLTFMaterialExporter._Epsilon)) {
                glTFPbrMetallicRoughness.baseColorFactor = [metallicRoughness.baseColor.r, metallicRoughness.baseColor.g, metallicRoughness.baseColor.b, babylonPBRMaterial.alpha];
            }
            if (metallicRoughness.metallic != null && metallicRoughness.metallic !== 1) {
                glTFPbrMetallicRoughness.metallicFactor = metallicRoughness.metallic;
            }
            if (metallicRoughness.roughness != null && metallicRoughness.roughness !== 1) {
                glTFPbrMetallicRoughness.roughnessFactor = metallicRoughness.roughness;
            }
            if (babylonPBRMaterial.backFaceCulling != null && !babylonPBRMaterial.backFaceCulling) {
                if (!babylonPBRMaterial._twoSidedLighting) {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn(babylonPBRMaterial.name + ": Back-face culling disabled and two-sided lighting disabled is not supported in glTF.");
                }
                glTFMaterial.doubleSided = true;
            }
            if (hasTextureCoords) {
                var bumpTexture_2 = babylonPBRMaterial._bumpTexture;
                if (bumpTexture_2) {
                    var promise = this._exportTextureAsync(bumpTexture_2, mimeType).then(function (glTFTexture) {
                        if (glTFTexture) {
                            glTFMaterial.normalTexture = glTFTexture;
                            if (bumpTexture_2.level !== 1) {
                                glTFMaterial.normalTexture.scale = bumpTexture_2.level;
                            }
                        }
                    });
                    promises.push(promise);
                }
                var ambientTexture = babylonPBRMaterial._ambientTexture;
                if (ambientTexture) {
                    var promise = this._exportTextureAsync(ambientTexture, mimeType).then(function (glTFTexture) {
                        if (glTFTexture) {
                            var occlusionTexture = {
                                index: glTFTexture.index,
                                texCoord: glTFTexture.texCoord,
                                extensions: glTFTexture.extensions,
                            };
                            glTFMaterial.occlusionTexture = occlusionTexture;
                            var ambientTextureStrength = babylonPBRMaterial._ambientTextureStrength;
                            if (ambientTextureStrength) {
                                occlusionTexture.strength = ambientTextureStrength;
                            }
                        }
                    });
                    promises.push(promise);
                }
                var emissiveTexture = babylonPBRMaterial._emissiveTexture;
                if (emissiveTexture) {
                    var promise = this._exportTextureAsync(emissiveTexture, mimeType).then(function (glTFTexture) {
                        if (glTFTexture) {
                            glTFMaterial.emissiveTexture = glTFTexture;
                        }
                    });
                    promises.push(promise);
                }
            }
            var emissiveColor = babylonPBRMaterial._emissiveColor;
            if (!_GLTFMaterialExporter._FuzzyEquals(emissiveColor, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.Black(), _GLTFMaterialExporter._Epsilon)) {
                glTFMaterial.emissiveFactor = emissiveColor.asArray();
            }
            glTFMaterial.pbrMetallicRoughness = glTFPbrMetallicRoughness;
            materials.push(glTFMaterial);
            materialMap[babylonPBRMaterial.uniqueId] = materials.length - 1;
        }
        return this._finishMaterial(promises, glTFMaterial, babylonPBRMaterial, mimeType);
    };
    _GLTFMaterialExporter.prototype._getPixelsFromTexture = function (babylonTexture) {
        var pixels = babylonTexture.textureType === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURETYPE_UNSIGNED_INT
            ? babylonTexture.readPixels()
            : babylonTexture.readPixels();
        return pixels;
    };
    /**
     * Extracts a texture from a Babylon texture into file data and glTF data
     * @param babylonTexture Babylon texture to extract
     * @param mimeType Mime Type of the babylonTexture
     * @returns glTF texture info, or null if the texture format is not supported
     */
    _GLTFMaterialExporter.prototype._exportTextureAsync = function (babylonTexture, mimeType) {
        var _this = this;
        var extensionPromise = this._exporter._extensionsPreExportTextureAsync("exporter", babylonTexture, mimeType);
        if (!extensionPromise) {
            return this._exportTextureInfoAsync(babylonTexture, mimeType);
        }
        return extensionPromise.then(function (texture) {
            if (!texture) {
                return _this._exportTextureInfoAsync(babylonTexture, mimeType);
            }
            return _this._exportTextureInfoAsync(texture, mimeType);
        });
    };
    _GLTFMaterialExporter.prototype._exportTextureInfoAsync = function (babylonTexture, mimeType) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
            var textureUid, pixels_1, samplerIndex, textureMimeType, internalTextureToImage, internalTextureUniqueId, imageIndexPromise, size_1, textureInfo, _a;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        textureUid = babylonTexture.uid;
                        if (!!(textureUid in this._textureMap)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._getPixelsFromTexture(babylonTexture)];
                    case 1:
                        pixels_1 = _b.sent();
                        if (!pixels_1) {
                            return [2 /*return*/, null];
                        }
                        samplerIndex = this._exportTextureSampler(babylonTexture);
                        textureMimeType = babylonTexture.mimeType;
                        if (textureMimeType) {
                            switch (textureMimeType) {
                                case "image/jpeg":
                                case "image/png":
                                case "image/webp":
                                    mimeType = textureMimeType;
                                    break;
                                default:
                                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Unsupported media type: ".concat(textureMimeType));
                                    break;
                            }
                        }
                        internalTextureToImage = this._internalTextureToImage;
                        internalTextureUniqueId = babylonTexture.getInternalTexture().uniqueId;
                        internalTextureToImage[internalTextureUniqueId] || (internalTextureToImage[internalTextureUniqueId] = {});
                        imageIndexPromise = internalTextureToImage[internalTextureUniqueId][mimeType];
                        if (imageIndexPromise === undefined) {
                            size_1 = babylonTexture.getSize();
                            imageIndexPromise = (function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(_this, void 0, void 0, function () {
                                var data;
                                return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._getImageDataAsync(pixels_1, size_1.width, size_1.height, mimeType)];
                                        case 1:
                                            data = _a.sent();
                                            return [2 /*return*/, this._exportImage(babylonTexture.name, mimeType, data)];
                                    }
                                });
                            }); })();
                            internalTextureToImage[internalTextureUniqueId][mimeType] = imageIndexPromise;
                        }
                        _a = this._exportTextureInfo;
                        return [4 /*yield*/, imageIndexPromise];
                    case 2:
                        textureInfo = _a.apply(this, [_b.sent(), samplerIndex, babylonTexture.coordinatesIndex]);
                        this._textureMap[textureUid] = textureInfo;
                        this._exporter._extensionsPostExportTextures("exporter", this._textureMap[textureUid], babylonTexture);
                        _b.label = 3;
                    case 3: return [2 /*return*/, this._textureMap[textureUid]];
                }
            });
        });
    };
    _GLTFMaterialExporter.prototype._exportImage = function (name, mimeType, data) {
        var imageData = this._exporter._imageData;
        var baseName = name.replace(/\.\/|\/|\.\\|\\/g, "_");
        var extension = getFileExtensionFromMimeType(mimeType);
        var fileName = baseName + extension;
        if (fileName in imageData) {
            fileName = "".concat(baseName, "_").concat(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.RandomId()).concat(extension);
        }
        imageData[fileName] = {
            data: data,
            mimeType: mimeType,
        };
        var images = this._exporter._images;
        images.push({
            name: name,
            uri: fileName,
        });
        return images.length - 1;
    };
    _GLTFMaterialExporter.prototype._exportTextureInfo = function (imageIndex, samplerIndex, coordinatesIndex) {
        var textures = this._exporter._textures;
        var textureIndex = textures.findIndex(function (t) { return t.sampler == samplerIndex && t.source === imageIndex; });
        if (textureIndex === -1) {
            textureIndex = textures.length;
            textures.push({
                source: imageIndex,
                sampler: samplerIndex,
            });
        }
        var textureInfo = { index: textureIndex };
        if (coordinatesIndex) {
            textureInfo.texCoord = coordinatesIndex;
        }
        return textureInfo;
    };
    _GLTFMaterialExporter.prototype._exportTextureSampler = function (texture) {
        var sampler = this._getTextureSampler(texture);
        // if a pre-existing sampler with identical parameters exists, then reuse the previous sampler
        var samplers = this._exporter._samplers;
        var samplerIndex = samplers.findIndex(function (s) { return s.minFilter === sampler.minFilter && s.magFilter === sampler.magFilter && s.wrapS === sampler.wrapS && s.wrapT === sampler.wrapT; });
        if (samplerIndex !== -1) {
            return samplerIndex;
        }
        samplers.push(sampler);
        return samplers.length - 1;
    };
    /**
     * Represents the dielectric specular values for R, G and B
     */
    _GLTFMaterialExporter._DielectricSpecular = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3(0.04, 0.04, 0.04);
    /**
     * Allows the maximum specular power to be defined for material calculations
     */
    _GLTFMaterialExporter._MaxSpecularPower = 1024;
    /**
     * Numeric tolerance value
     */
    _GLTFMaterialExporter._Epsilon = 1e-6;
    return _GLTFMaterialExporter;
}());


/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFSerializer.ts":
/*!***************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFSerializer.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTF2Export: () => (/* binding */ GLTF2Export)
/* harmony export */ });
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");

/**
 * Class for generating glTF data from a Babylon scene.
 */
var GLTF2Export = /** @class */ (function () {
    function GLTF2Export() {
    }
    /**
     * Exports the geometry of the scene to .gltf file format asynchronously
     * @param scene Babylon scene with scene hierarchy information
     * @param filePrefix File prefix to use when generating the glTF file
     * @param options Exporter options
     * @returns Returns an object with a .gltf file and associates texture names
     * as keys and their data and paths as values
     */
    GLTF2Export.GLTFAsync = function (scene, filePrefix, options) {
        return scene.whenReadyAsync().then(function () {
            var glTFPrefix = filePrefix.replace(/\.[^/.]+$/, "");
            var gltfGenerator = new _glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter(scene, options);
            return gltfGenerator._generateGLTFAsync(glTFPrefix);
        });
    };
    GLTF2Export._PreExportAsync = function (scene, options) {
        return Promise.resolve().then(function () {
            if (options && options.exportWithoutWaitingForScene) {
                return Promise.resolve();
            }
            else {
                return scene.whenReadyAsync();
            }
        });
    };
    GLTF2Export._PostExportAsync = function (scene, glTFData, options) {
        return Promise.resolve().then(function () {
            if (options && options.exportWithoutWaitingForScene) {
                return glTFData;
            }
            else {
                return glTFData;
            }
        });
    };
    /**
     * Exports the geometry of the scene to .glb file format asychronously
     * @param scene Babylon scene with scene hierarchy information
     * @param filePrefix File prefix to use when generating glb file
     * @param options Exporter options
     * @returns Returns an object with a .glb filename as key and data as value
     */
    GLTF2Export.GLBAsync = function (scene, filePrefix, options) {
        var _this = this;
        return this._PreExportAsync(scene, options).then(function () {
            var glTFPrefix = filePrefix.replace(/\.[^/.]+$/, "");
            var gltfGenerator = new _glTFExporter__WEBPACK_IMPORTED_MODULE_0__._Exporter(scene, options);
            return gltfGenerator._generateGLBAsync(glTFPrefix).then(function (glTFData) {
                return _this._PostExportAsync(scene, glTFData, options);
            });
        });
    };
    return GLTF2Export;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts":
/*!**************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _GLTFUtilities: () => (/* binding */ _GLTFUtilities)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Maths/math.vector */ "babylonjs/Maths/math.vector");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @internal
 */
var _GLTFUtilities = /** @class */ (function () {
    function _GLTFUtilities() {
    }
    /**
     * Creates a buffer view based on the supplied arguments
     * @param bufferIndex index value of the specified buffer
     * @param byteOffset byte offset value
     * @param byteLength byte length of the bufferView
     * @param byteStride byte distance between conequential elements
     * @param name name of the buffer view
     * @returns bufferView for glTF
     */
    _GLTFUtilities._CreateBufferView = function (bufferIndex, byteOffset, byteLength, byteStride, name) {
        var bufferview = { buffer: bufferIndex, byteLength: byteLength };
        if (byteOffset) {
            bufferview.byteOffset = byteOffset;
        }
        if (name) {
            bufferview.name = name;
        }
        if (byteStride) {
            bufferview.byteStride = byteStride;
        }
        return bufferview;
    };
    /**
     * Creates an accessor based on the supplied arguments
     * @param bufferviewIndex The index of the bufferview referenced by this accessor
     * @param name The name of the accessor
     * @param type The type of the accessor
     * @param componentType The datatype of components in the attribute
     * @param count The number of attributes referenced by this accessor
     * @param byteOffset The offset relative to the start of the bufferView in bytes
     * @param min Minimum value of each component in this attribute
     * @param max Maximum value of each component in this attribute
     * @returns accessor for glTF
     */
    _GLTFUtilities._CreateAccessor = function (bufferviewIndex, name, type, componentType, count, byteOffset, min, max) {
        var accessor = { name: name, bufferView: bufferviewIndex, componentType: componentType, count: count, type: type };
        if (min != null) {
            accessor.min = min;
        }
        if (max != null) {
            accessor.max = max;
        }
        if (byteOffset != null) {
            accessor.byteOffset = byteOffset;
        }
        return accessor;
    };
    /**
     * Calculates the minimum and maximum values of an array of position floats
     * @param positions Positions array of a mesh
     * @param vertexStart Starting vertex offset to calculate min and max values
     * @param vertexCount Number of vertices to check for min and max values
     * @returns min number array and max number array
     */
    _GLTFUtilities._CalculateMinMaxPositions = function (positions, vertexStart, vertexCount) {
        var min = [Infinity, Infinity, Infinity];
        var max = [-Infinity, -Infinity, -Infinity];
        var positionStrideSize = 3;
        var indexOffset;
        var position;
        var vector;
        if (vertexCount) {
            for (var i = vertexStart, length_1 = vertexStart + vertexCount; i < length_1; ++i) {
                indexOffset = positionStrideSize * i;
                position = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(positions, indexOffset);
                vector = position.asArray();
                for (var j = 0; j < positionStrideSize; ++j) {
                    var num = vector[j];
                    if (num < min[j]) {
                        min[j] = num;
                    }
                    if (num > max[j]) {
                        max[j] = num;
                    }
                    ++indexOffset;
                }
            }
        }
        return { min: min, max: max };
    };
    _GLTFUtilities._NormalizeTangentFromRef = function (tangent) {
        var length = Math.sqrt(tangent.x * tangent.x + tangent.y * tangent.y + tangent.z * tangent.z);
        if (length > 0) {
            tangent.x /= length;
            tangent.y /= length;
            tangent.z /= length;
        }
    };
    _GLTFUtilities._GetDataAccessorElementCount = function (accessorType) {
        switch (accessorType) {
            case "MAT2" /* AccessorType.MAT2 */:
                return 4;
            case "MAT3" /* AccessorType.MAT3 */:
                return 9;
            case "MAT4" /* AccessorType.MAT4 */:
                return 16;
            case "SCALAR" /* AccessorType.SCALAR */:
                return 1;
            case "VEC2" /* AccessorType.VEC2 */:
                return 2;
            case "VEC3" /* AccessorType.VEC3 */:
                return 3;
            case "VEC4" /* AccessorType.VEC4 */:
                return 4;
        }
    };
    return _GLTFUtilities;
}());



/***/ }),

/***/ "../../../dev/serializers/src/glTF/2.0/index.ts":
/*!******************************************************!*\
  !*** ../../../dev/serializers/src/glTF/2.0/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.EXT_mesh_gpu_instancing),
/* harmony export */   GLTF2Export: () => (/* reexport safe */ _glTFSerializer__WEBPACK_IMPORTED_MODULE_5__.GLTF2Export),
/* harmony export */   GLTFData: () => (/* reexport safe */ _glTFData__WEBPACK_IMPORTED_MODULE_1__.GLTFData),
/* harmony export */   KHR_lights_punctual: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_lights_punctual),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_specular),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_unlit),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_volume),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_7__.KHR_texture_transform),
/* harmony export */   _BinaryWriter: () => (/* reexport safe */ _glTFExporter__WEBPACK_IMPORTED_MODULE_2__._BinaryWriter),
/* harmony export */   _Exporter: () => (/* reexport safe */ _glTFExporter__WEBPACK_IMPORTED_MODULE_2__._Exporter),
/* harmony export */   _GLTFAnimation: () => (/* reexport safe */ _glTFAnimation__WEBPACK_IMPORTED_MODULE_0__._GLTFAnimation),
/* harmony export */   _GLTFMaterialExporter: () => (/* reexport safe */ _glTFMaterialExporter__WEBPACK_IMPORTED_MODULE_4__._GLTFMaterialExporter),
/* harmony export */   _GLTFUtilities: () => (/* reexport safe */ _glTFUtilities__WEBPACK_IMPORTED_MODULE_6__._GLTFUtilities),
/* harmony export */   __IGLTFExporterExtensionV2: () => (/* reexport safe */ _glTFExporterExtension__WEBPACK_IMPORTED_MODULE_3__.__IGLTFExporterExtensionV2)
/* harmony export */ });
/* harmony import */ var _glTFAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFAnimation */ "../../../dev/serializers/src/glTF/2.0/glTFAnimation.ts");
/* harmony import */ var _glTFData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFData */ "../../../dev/serializers/src/glTF/2.0/glTFData.ts");
/* harmony import */ var _glTFExporter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFExporter */ "../../../dev/serializers/src/glTF/2.0/glTFExporter.ts");
/* harmony import */ var _glTFExporterExtension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./glTFExporterExtension */ "../../../dev/serializers/src/glTF/2.0/glTFExporterExtension.ts");
/* harmony import */ var _glTFMaterialExporter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./glTFMaterialExporter */ "../../../dev/serializers/src/glTF/2.0/glTFMaterialExporter.ts");
/* harmony import */ var _glTFSerializer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./glTFSerializer */ "../../../dev/serializers/src/glTF/2.0/glTFSerializer.ts");
/* harmony import */ var _glTFUtilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./glTFUtilities */ "../../../dev/serializers/src/glTF/2.0/glTFUtilities.ts");
/* harmony import */ var _Extensions_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Extensions/index */ "../../../dev/serializers/src/glTF/2.0/Extensions/index.ts");
/* eslint-disable import/no-internal-modules */










/***/ }),

/***/ "../../../dev/serializers/src/glTF/glTFFileExporter.ts":
/*!*************************************************************!*\
  !*** ../../../dev/serializers/src/glTF/glTFFileExporter.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __IGLTFExporterExtension: () => (/* binding */ __IGLTFExporterExtension)
/* harmony export */ });
/** @internal */
// eslint-disable-next-line no-var, @typescript-eslint/naming-convention
var __IGLTFExporterExtension = 0; // I am here to allow dts to be created


/***/ }),

/***/ "../../../lts/serializers/src/legacy/legacy-glTF2Serializer.ts":
/*!*********************************************************************!*\
  !*** ../../../lts/serializers/src/legacy/legacy-glTF2Serializer.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.EXT_mesh_gpu_instancing),
/* harmony export */   GLTF2Export: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.GLTF2Export),
/* harmony export */   GLTFData: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.GLTFData),
/* harmony export */   KHR_lights_punctual: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_lights_punctual),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_specular),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_unlit),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_materials_volume),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.KHR_texture_transform),
/* harmony export */   _BinaryWriter: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._BinaryWriter),
/* harmony export */   _Exporter: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._Exporter),
/* harmony export */   _GLTFAnimation: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._GLTFAnimation),
/* harmony export */   _GLTFMaterialExporter: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._GLTFMaterialExporter),
/* harmony export */   _GLTFUtilities: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__._GLTFUtilities),
/* harmony export */   __IGLTFExporterExtension: () => (/* reexport safe */ serializers_glTF_glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__.__IGLTFExporterExtension),
/* harmony export */   __IGLTFExporterExtensionV2: () => (/* reexport safe */ serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__.__IGLTFExporterExtensionV2)
/* harmony export */ });
/* harmony import */ var serializers_glTF_glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/glTF/glTFFileExporter */ "../../../dev/serializers/src/glTF/glTFFileExporter.ts");
/* harmony import */ var serializers_glTF_2_0_glTFData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! serializers/glTF/2.0/glTFData */ "../../../dev/serializers/src/glTF/2.0/glTFData.ts");
/* harmony import */ var serializers_glTF_2_0_glTFSerializer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! serializers/glTF/2.0/glTFSerializer */ "../../../dev/serializers/src/glTF/2.0/glTFSerializer.ts");
/* harmony import */ var serializers_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! serializers/glTF/2.0/Extensions/index */ "../../../dev/serializers/src/glTF/2.0/Extensions/index.ts");
/* harmony import */ var serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! serializers/glTF/2.0/index */ "../../../dev/serializers/src/glTF/2.0/index.ts");
/* eslint-disable import/no-internal-modules */





/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    var BABYLON_1 = globalObject.BABYLON;
    BABYLON_1.GLTF2 = BABYLON_1.GLTF2 || {};
    BABYLON_1.GLTF2.Exporter = BABYLON_1.GLTF2.Exporter || {};
    BABYLON_1.GLTF2.Exporter.Extensions = BABYLON_1.GLTF2.Exporter.Extensions || {};
    var keys = [];
    for (var key in serializers_glTF_glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__) {
        BABYLON_1[key] = serializers_glTF_glTFFileExporter__WEBPACK_IMPORTED_MODULE_0__[key];
        keys.push(key);
    }
    for (var key in serializers_glTF_2_0_glTFData__WEBPACK_IMPORTED_MODULE_1__) {
        BABYLON_1[key] = serializers_glTF_2_0_glTFData__WEBPACK_IMPORTED_MODULE_1__[key];
        keys.push(key);
    }
    for (var key in serializers_glTF_2_0_glTFSerializer__WEBPACK_IMPORTED_MODULE_2__) {
        BABYLON_1[key] = serializers_glTF_2_0_glTFSerializer__WEBPACK_IMPORTED_MODULE_2__[key];
        keys.push(key);
    }
    for (var key in serializers_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_3__) {
        BABYLON_1.GLTF2.Exporter.Extensions[key] = serializers_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_3__[key];
        keys.push(key);
    }
    for (var key in serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__) {
        // Prevent Reassignment.
        if (keys.indexOf(key) > -1) {
            continue;
        }
        BABYLON_1.GLTF2.Exporter[key] = serializers_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_4__[key];
    }
}




/***/ }),

/***/ "babylonjs/Maths/math.vector":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Maths_math_vector__;

/***/ }),

/***/ "../../../../node_modules/tslib/tslib.es6.mjs":
/*!****************************************************!*\
  !*** ../../../../node_modules/tslib/tslib.es6.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


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
/*!**********************!*\
  !*** ./src/glTF2.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   serializers: () => (/* reexport module object */ _lts_serializers_legacy_legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_serializers_legacy_legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/serializers/legacy/legacy-glTF2Serializer */ "../../../lts/serializers/src/legacy/legacy-glTF2Serializer.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_serializers_legacy_legacy_glTF2Serializer__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5nbFRGMlNlcmlhbGl6ZXIuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUFBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3S0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBR0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFlQTs7QUFFQTtBQUNBO0FBakJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQVdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBREE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzTEE7QUFFQTtBQUdBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBY0E7QUFiQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFJQTtBQUdBO0FBQ0E7QUFFQTtBQUdBO0FBREE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBO0FBRUE7QUFHQTtBQUVBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBY0E7QUFiQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFJQTtBQUdBO0FBQ0E7QUFFQTtBQUdBO0FBREE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzR0E7QUFFQTtBQUdBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQXFDQTtBQW5DQTtBQUdBO0FBREE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzREE7QUFFQTtBQUVBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBWUE7QUFYQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFHQTtBQURBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERBO0FBRUE7QUFHQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQWNBO0FBYkE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFHQTtBQUNBO0FBRUE7QUFHQTtBQURBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEZBO0FBRUE7QUFHQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQWNBO0FBYkE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFLQTtBQUNBO0FBRUE7QUFHQTtBQURBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEZBO0FBRUE7QUFHQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQWNBO0FBYkE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFHQTtBQUNBO0FBRUE7QUFHQTtBQURBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTs7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEdBO0FBRUE7QUFHQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQWNBO0FBYkE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFHQTtBQUNBO0FBRUE7QUFHQTtBQURBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekZBO0FBRUE7QUFDQTtBQUVBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBWUE7QUFYQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFFQTtBQUVBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTtBQWJBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBR0E7QUFDQTtBQUVBO0FBR0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2R0E7QUFJQTtBQUVBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBYUE7QUFaQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUdBO0FBREE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBRUE7QUFFQTtBQUNBO0FBaURBOzs7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUFBO0FBczhCQTtBQXI4QkE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFhQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQWFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7OztBQVlBO0FBQ0E7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQVdBO0FBQ0E7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTs7QUExREE7QUFBQTtBQTJEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUF6SUE7QUFBQTtBQUFBO0FBMElBO0FBQ0E7QUFDQTtBQUVBO0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBVUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7QUFDQTtBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBV0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBUUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzaENBOztBQUVBO0FBQ0E7QUFNQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBRUE7QUFDQTtBQUlBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUE4QkE7OztBQUdBO0FBQ0E7QUF1T0E7Ozs7QUFJQTtBQUNBO0FBakpBO0FBa0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBektBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFNQTtBQUlBO0FBRUE7QUFPQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFzQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFRQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7O0FBWUE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBVUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBVUE7QUFDQTtBQUVBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFVQTtBQUNBO0FBRUE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7O0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQVlBO0FBQ0E7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBL0NBO0FBQUE7QUFBQTtBQWdEQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFVQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbDNEQTtBQUNBO0FBazNEQTtBQUFBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBYUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN3pFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUF1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQTZCQTtBQWxCQTs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQWFBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBOzs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUVBOztBQUFBO0FBRUE7O0FBQUE7QUFFQTtBQUFBOzs7O0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7O0FBU0E7QUFDQTs7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBOztBQUFBO0FBQ0E7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUVBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBQ0E7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTs7QUFBQTtBQUNBO0FBQ0E7O0FBR0E7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBcmtDQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQVVBOztBQUVBO0FBQ0E7QUFpakNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxcENBO0FBc0RBOztBQUVBO0FBQ0E7QUFBQTtBQXFEQTtBQXBEQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3R0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUE4SEE7QUE3SEE7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQVdBO0FBQ0E7QUFVQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ2pEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9FWFRfbWVzaF9ncHVfaW5zdGFuY2luZy50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX2xpZ2h0c19wdW5jdHVhbC50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc19hbmlzb3Ryb3B5LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX2NsZWFyY29hdC50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aC50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc19pb3IudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfaXJpZGVzY2VuY2UudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfc2hlZW4udHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfc3BlY3VsYXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfdHJhbnNtaXNzaW9uLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX3VubGl0LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX3ZvbHVtZS50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX3RleHR1cmVfdHJhbnNmb3JtLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL2dsVEZBbmltYXRpb24udHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9nbFRGRGF0YS50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL2dsVEZFeHBvcnRlci50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL2dsVEZFeHBvcnRlckV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL2dsVEYvMi4wL2dsVEZNYXRlcmlhbEV4cG9ydGVyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvZ2xURlNlcmlhbGl6ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGLzIuMC9nbFRGVXRpbGl0aWVzLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvZ2xURi8yLjAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9nbFRGL2dsVEZGaWxlRXhwb3J0ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vbHRzL3NlcmlhbGl6ZXJzL3NyYy9sZWdhY3kvbGVnYWN5LWdsVEYyU2VyaWFsaXplci50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy9leHRlcm5hbCB1bWQge1wicm9vdFwiOlwiQkFCWUxPTlwiLFwiY29tbW9uanNcIjpcImJhYnlsb25qc1wiLFwiY29tbW9uanMyXCI6XCJiYWJ5bG9uanNcIixcImFtZFwiOlwiYmFieWxvbmpzXCJ9Iiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uL3NyYy9nbFRGMi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYWJ5bG9uanMtc2VyaWFsaXplcnNcIiwgW1wiYmFieWxvbmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJhYnlsb25qcy1zZXJpYWxpemVyc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiU0VSSUFMSVpFUlNcIl0gPSBmYWN0b3J5KHJvb3RbXCJCQUJZTE9OXCJdKTtcbn0pKCh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyksIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NYXRoc19tYXRoX3ZlY3Rvcl9fKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHR5cGUgeyBJQnVmZmVyVmlldywgSUFjY2Vzc29yLCBJTm9kZSwgSUVYVE1lc2hHcHVJbnN0YW5jaW5nIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBY2Nlc3NvclR5cGUsIEFjY2Vzc29yQ29tcG9uZW50VHlwZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB0eXBlIHsgX0JpbmFyeVdyaXRlciB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSBcImNvcmUvbm9kZVwiO1xyXG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuaW1wb3J0IFwiY29yZS9NZXNoZXMvdGhpbkluc3RhbmNlTWVzaFwiO1xyXG5pbXBvcnQgeyBUbXBWZWN0b3JzLCBRdWF0ZXJuaW9uLCBWZWN0b3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgVmVydGV4QnVmZmVyIH0gZnJvbSBcImNvcmUvQnVmZmVycy9idWZmZXJcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIkVYVF9tZXNoX2dwdV9pbnN0YW5jaW5nXCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvVmVuZG9yL0VYVF9tZXNoX2dwdV9pbnN0YW5jaW5nL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEVYVF9tZXNoX2dwdV9pbnN0YW5jaW5nIGltcGxlbWVudHMgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIHtcclxuICAgIC8qKiBOYW1lIG9mIHRoaXMgZXh0ZW5zaW9uICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyByZXF1aXJlZCAqL1xyXG4gICAgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0ZXI6IF9FeHBvcnRlcjtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZXhwb3J0ZXI6IF9FeHBvcnRlcikge1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydGVyID0gZXhwb3J0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7fVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE5vZGVBc3luYyhcclxuICAgICAgICBjb250ZXh0OiBzdHJpbmcsXHJcbiAgICAgICAgbm9kZTogTnVsbGFibGU8SU5vZGU+LFxyXG4gICAgICAgIGJhYnlsb25Ob2RlOiBOb2RlLFxyXG4gICAgICAgIG5vZGVNYXA6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0sXHJcbiAgICAgICAgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyXHJcbiAgICApOiBQcm9taXNlPE51bGxhYmxlPElOb2RlPj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobm9kZSAmJiBiYWJ5bG9uTm9kZSBpbnN0YW5jZW9mIE1lc2gpIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTm9kZS5oYXNUaGluSW5zdGFuY2VzICYmIGJpbmFyeVdyaXRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhc1VzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub1RyYW5zbGF0aW9uID0gVmVjdG9yMy5aZXJvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9Sb3RhdGlvbiA9IFF1YXRlcm5pb24uSWRlbnRpdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub1NjYWxlID0gVmVjdG9yMy5PbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0cmlldmUgYWxsIHRoZSBpbnN0YW5jZSB3b3JsZCBtYXRyaXhcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRyaXggPSBiYWJ5bG9uTm9kZS50aGluSW5zdGFuY2VHZXRXb3JsZE1hdHJpY2VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl3dCA9IFRtcFZlY3RvcnMuVmVjdG9yM1syXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpd3IgPSBUbXBWZWN0b3JzLlF1YXRlcm5pb25bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXdzID0gVG1wVmVjdG9ycy5WZWN0b3IzWzNdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGFzQW55SW5zdGFuY2VXb3JsZFRyYW5zbGF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhc0FueUluc3RhbmNlV29ybGRSb3RhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoYXNBbnlJbnN0YW5jZVdvcmxkU2NhbGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlcGFyZSB0ZW1wIGJ1ZmZlcnNcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2xhdGlvbkJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoYmFieWxvbk5vZGUudGhpbkluc3RhbmNlQ291bnQgKiAzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3RhdGlvbkJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoYmFieWxvbk5vZGUudGhpbkluc3RhbmNlQ291bnQgKiA0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2FsZUJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoYmFieWxvbk5vZGUudGhpbkluc3RhbmNlQ291bnQgKiAzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbSBvZiBtYXRyaXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbS5kZWNvbXBvc2UoaXdzLCBpd3IsIGl3dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmaWxsIHRoZSB0ZW1wIGJ1ZmZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbkJ1ZmZlci5zZXQoaXd0LmFzQXJyYXkoKSwgaSAqIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3RhdGlvbkJ1ZmZlci5zZXQoaXdyLm5vcm1hbGl6ZSgpLmFzQXJyYXkoKSwgaSAqIDQpOyAvLyBlbnN1cmUgdGhlIHF1YXRlcm5pb24gaXMgbm9ybWFsaXplZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZUJ1ZmZlci5zZXQoaXdzLmFzQXJyYXkoKSwgaSAqIDMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyB3aGVyZSB3ZSBkZWNpZGUgaWYgdGhlcmUgaXMgYW55IHRyYW5zZm9ybWF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0FueUluc3RhbmNlV29ybGRUcmFuc2xhdGlvbiA9IGhhc0FueUluc3RhbmNlV29ybGRUcmFuc2xhdGlvbiB8fCAhaXd0LmVxdWFsc1dpdGhFcHNpbG9uKG5vVHJhbnNsYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNBbnlJbnN0YW5jZVdvcmxkUm90YXRpb24gPSBoYXNBbnlJbnN0YW5jZVdvcmxkUm90YXRpb24gfHwgIWl3ci5lcXVhbHNXaXRoRXBzaWxvbihub1JvdGF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzQW55SW5zdGFuY2VXb3JsZFNjYWxlID0gaGFzQW55SW5zdGFuY2VXb3JsZFNjYWxlIHx8ICFpd3MuZXF1YWxzV2l0aEVwc2lsb24obm9TY2FsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHRlbnNpb246IElFWFRNZXNoR3B1SW5zdGFuY2luZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gd2UgbmVlZCB0byB3cml0ZSBUUkFOU0xBVElPTiA/XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0FueUluc3RhbmNlV29ybGRUcmFuc2xhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb24uYXR0cmlidXRlc1tcIlRSQU5TTEFUSU9OXCJdID0gdGhpcy5fYnVpbGRBY2Nlc3NvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uQnVmZmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjZXNzb3JUeXBlLlZFQzMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTm9kZS50aGluSW5zdGFuY2VDb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBkbyB3ZSBuZWVkIHRvIHdyaXRlIFJPVEFUSU9OID9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzQW55SW5zdGFuY2VXb3JsZFJvdGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFR5cGUgPSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVQ7IC8vIHdlIGRlY2lkZWQgdG8gc3RheSBvbiBGTE9BVCBmb3Igbm93IHNlZSBodHRwczovL2dpdGh1Yi5jb20vQmFieWxvbkpTL0JhYnlsb24uanMvcHVsbC8xMjQ5NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb24uYXR0cmlidXRlc1tcIlJPVEFUSU9OXCJdID0gdGhpcy5fYnVpbGRBY2Nlc3Nvcihyb3RhdGlvbkJ1ZmZlciwgQWNjZXNzb3JUeXBlLlZFQzQsIGJhYnlsb25Ob2RlLnRoaW5JbnN0YW5jZUNvdW50LCBiaW5hcnlXcml0ZXIsIGNvbXBvbmVudFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBkbyB3ZSBuZWVkIHRvIHdyaXRlIFNDQUxFID9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzQW55SW5zdGFuY2VXb3JsZFNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbi5hdHRyaWJ1dGVzW1wiU0NBTEVcIl0gPSB0aGlzLl9idWlsZEFjY2Vzc29yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVCdWZmZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2Nlc3NvclR5cGUuVkVDMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25Ob2RlLnRoaW5JbnN0YW5jZUNvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiovXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zID0gbm9kZS5leHRlbnNpb25zIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IGV4dGVuc2lvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2J1aWxkQWNjZXNzb3IoYnVmZmVyOiBGbG9hdDMyQXJyYXksIHR5cGU6IEFjY2Vzc29yVHlwZSwgY291bnQ6IG51bWJlciwgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyLCBjb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUpOiBudW1iZXIge1xyXG4gICAgICAgIC8vIHdyaXRlIHRoZSBidWZmZXJcclxuICAgICAgICBjb25zdCBidWZmZXJPZmZzZXQgPSBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpO1xyXG4gICAgICAgIHN3aXRjaCAoY29tcG9uZW50VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgIT0gYnVmZmVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLnNldEZsb2F0MzIoYnVmZmVyW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLkJZVEU6IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpICE9IGJ1ZmZlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRCeXRlKGJ1ZmZlcltpXSAqIDEyNyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5TSE9SVDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgIT0gYnVmZmVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLnNldEludDE2KGJ1ZmZlcltpXSAqIDMyNzY3KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBidWlsZCB0aGUgYnVmZmVyIHZpZXdcclxuICAgICAgICBjb25zdCBidjogSUJ1ZmZlclZpZXcgPSB7IGJ1ZmZlcjogMCwgYnl0ZU9mZnNldDogYnVmZmVyT2Zmc2V0LCBieXRlTGVuZ3RoOiBidWZmZXIubGVuZ3RoICogVmVydGV4QnVmZmVyLkdldFR5cGVCeXRlTGVuZ3RoKGNvbXBvbmVudFR5cGUpIH07XHJcbiAgICAgICAgY29uc3QgYnVmZmVyVmlld0luZGV4ID0gdGhpcy5fZXhwb3J0ZXIuX2J1ZmZlclZpZXdzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9leHBvcnRlci5fYnVmZmVyVmlld3MucHVzaChidik7XHJcblxyXG4gICAgICAgIC8vIGZpbmFsbHkgYnVpbGQgdGhlIGFjY2Vzc29yXHJcbiAgICAgICAgY29uc3QgYWNjZXNzb3JJbmRleCA9IHRoaXMuX2V4cG9ydGVyLl9hY2Nlc3NvcnMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc29yOiBJQWNjZXNzb3IgPSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlclZpZXc6IGJ1ZmZlclZpZXdJbmRleCxcclxuICAgICAgICAgICAgY29tcG9uZW50VHlwZTogY29tcG9uZW50VHlwZSxcclxuICAgICAgICAgICAgY291bnQ6IGNvdW50LFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBub3JtYWxpemVkOiBjb21wb25lbnRUeXBlID09IEFjY2Vzc29yQ29tcG9uZW50VHlwZS5CWVRFIHx8IGNvbXBvbmVudFR5cGUgPT0gQWNjZXNzb3JDb21wb25lbnRUeXBlLlNIT1JULFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIuX2FjY2Vzc29ycy5wdXNoKGFjY2Vzc29yKTtcclxuICAgICAgICByZXR1cm4gYWNjZXNzb3JJbmRleDtcclxuICAgIH1cclxufVxyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgRVhUX21lc2hfZ3B1X2luc3RhbmNpbmcoZXhwb3J0ZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBTcG90TGlnaHQgfSBmcm9tIFwiY29yZS9MaWdodHMvc3BvdExpZ2h0XCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBWZWN0b3IzLCBRdWF0ZXJuaW9uLCBUbXBWZWN0b3JzLCBNYXRyaXggfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB7IExpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL2xpZ2h0XCI7XHJcbmltcG9ydCB0eXBlIHsgTm9kZSB9IGZyb20gXCJjb3JlL25vZGVcIjtcclxuaW1wb3J0IHsgU2hhZG93TGlnaHQgfSBmcm9tIFwiY29yZS9MaWdodHMvc2hhZG93TGlnaHRcIjtcclxuaW1wb3J0IHR5cGUgeyBJTm9kZSwgSUtIUkxpZ2h0c1B1bmN0dWFsX0xpZ2h0UmVmZXJlbmNlLCBJS0hSTGlnaHRzUHVuY3R1YWxfTGlnaHQsIElLSFJMaWdodHNQdW5jdHVhbCB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgS0hSTGlnaHRzUHVuY3R1YWxfTGlnaHRUeXBlIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZS9NaXNjL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBfR0xURlV0aWxpdGllcyB9IGZyb20gXCIuLi9nbFRGVXRpbGl0aWVzXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbGlnaHRzX3B1bmN0dWFsXCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21hc3Rlci9leHRlbnNpb25zLzIuMC9LaHJvbm9zL0tIUl9saWdodHNfcHVuY3R1YWwvUkVBRE1FLm1kKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX2xpZ2h0c19wdW5jdHVhbCBpbXBsZW1lbnRzIElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB7XHJcbiAgICAvKiogVGhlIG5hbWUgb2YgdGhpcyBleHRlbnNpb24uICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkLiAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgcmVxdWlyZWQgKi9cclxuICAgIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGdsVEYgZXhwb3J0ZXIgKi9cclxuICAgIHByaXZhdGUgX2V4cG9ydGVyOiBfRXhwb3J0ZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlnaHRzOiBJS0hSTGlnaHRzUHVuY3R1YWw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXhwb3J0ZXI6IF9FeHBvcnRlcikge1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydGVyID0gZXhwb3J0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xpZ2h0cyBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZ2V0IHdhc1VzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fbGlnaHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBvbkV4cG9ydGluZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9leHBvcnRlciEuX2dsVEYuZXh0ZW5zaW9ucyFbTkFNRV0gPSB0aGlzLl9saWdodHM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIERlZmluZSB0aGlzIG1ldGhvZCB0byBtb2RpZnkgdGhlIGRlZmF1bHQgYmVoYXZpb3Igd2hlbiBleHBvcnRpbmcgYSBub2RlXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGV4cG9ydGluZyB0aGUgbm9kZVxyXG4gICAgICogQHBhcmFtIG5vZGUgZ2xURiBub2RlXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk5vZGUgQmFieWxvbkpTIG5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlTWFwIE5vZGUgbWFwcGluZyBvZiB1bmlxdWUgaWQgdG8gZ2xURiBub2RlIGluZGV4XHJcbiAgICAgKiBAcmV0dXJucyBudWxsYWJsZSBJTm9kZSBwcm9taXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0Tm9kZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgbm9kZTogTnVsbGFibGU8SU5vZGU+LCBiYWJ5bG9uTm9kZTogTm9kZSwgbm9kZU1hcDogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSk6IFByb21pc2U8TnVsbGFibGU8SU5vZGU+PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChub2RlICYmIGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgU2hhZG93TGlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaWdodDogSUtIUkxpZ2h0c1B1bmN0dWFsX0xpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpZ2h0VHlwZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk5vZGUuZ2V0VHlwZUlEKCkgPT0gTGlnaHQuTElHSFRUWVBFSURfUE9JTlRMSUdIVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IEtIUkxpZ2h0c1B1bmN0dWFsX0xpZ2h0VHlwZS5QT0lOVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGJhYnlsb25Ob2RlLmdldFR5cGVJRCgpID09IExpZ2h0LkxJR0hUVFlQRUlEX0RJUkVDVElPTkFMTElHSFRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBLSFJMaWdodHNQdW5jdHVhbF9MaWdodFR5cGUuRElSRUNUSU9OQUxcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBiYWJ5bG9uTm9kZS5nZXRUeXBlSUQoKSA9PSBMaWdodC5MSUdIVFRZUEVJRF9TUE9UTElHSFRcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBLSFJMaWdodHNQdW5jdHVhbF9MaWdodFR5cGUuU1BPVFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlnaHRUeXBlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuV2FybihgJHtjb250ZXh0fTogTGlnaHQgJHtiYWJ5bG9uTm9kZS5uYW1lfSBpcyBub3Qgc3VwcG9ydGVkIGluICR7TkFNRX1gKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFiYWJ5bG9uTm9kZS5wb3NpdGlvbi5lcXVhbHNUb0Zsb2F0cygwLCAwLCAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRyYW5zbGF0aW9uID0gYmFieWxvbk5vZGUucG9zaXRpb24uYXNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobGlnaHRUeXBlICE9PSBLSFJMaWdodHNQdW5jdHVhbF9MaWdodFR5cGUuUE9JTlQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYWxBeGlzID0gYmFieWxvbk5vZGUuZGlyZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB5YXcgPSAtTWF0aC5hdGFuMihsb2NhbEF4aXMueiwgbG9jYWxBeGlzLngpICsgTWF0aC5QSSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGguc3FydChsb2NhbEF4aXMueCAqIGxvY2FsQXhpcy54ICsgbG9jYWxBeGlzLnogKiBsb2NhbEF4aXMueik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBpdGNoID0gLU1hdGguYXRhbjIobG9jYWxBeGlzLnksIGxlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpZ2h0Um90YXRpb25RdWF0ZXJuaW9uID0gUXVhdGVybmlvbi5Sb3RhdGlvbllhd1BpdGNoUm9sbCh5YXcgKyBNYXRoLlBJLCBwaXRjaCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghUXVhdGVybmlvbi5Jc0lkZW50aXR5KGxpZ2h0Um90YXRpb25RdWF0ZXJuaW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yb3RhdGlvbiA9IGxpZ2h0Um90YXRpb25RdWF0ZXJuaW9uLmFzQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25Ob2RlLmZhbGxvZmZUeXBlICE9PSBMaWdodC5GQUxMT0ZGX0dMVEYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLldhcm4oYCR7Y29udGV4dH06IExpZ2h0IGZhbGxvZmYgZm9yICR7YmFieWxvbk5vZGUubmFtZX0gZG9lcyBub3QgbWF0Y2ggdGhlICR7TkFNRX0gc3BlY2lmaWNhdGlvbiFgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGlnaHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGxpZ2h0VHlwZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYmFieWxvbk5vZGUuZGlmZnVzZS5lcXVhbHMoQ29sb3IzLldoaXRlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0LmNvbG9yID0gYmFieWxvbk5vZGUuZGlmZnVzZS5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTm9kZS5pbnRlbnNpdHkgIT09IDEuMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodC5pbnRlbnNpdHkgPSBiYWJ5bG9uTm9kZS5pbnRlbnNpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTm9kZS5yYW5nZSAhPT0gTnVtYmVyLk1BWF9WQUxVRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodC5yYW5nZSA9IGJhYnlsb25Ob2RlLnJhbmdlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpZ2h0VHlwZSA9PT0gS0hSTGlnaHRzUHVuY3R1YWxfTGlnaHRUeXBlLlNQT1QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFieWxvblNwb3RMaWdodCA9IGJhYnlsb25Ob2RlIGFzIFNwb3RMaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25TcG90TGlnaHQuYW5nbGUgIT09IE1hdGguUEkgLyAyLjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaWdodC5zcG90ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodC5zcG90ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodC5zcG90Lm91dGVyQ29uZUFuZ2xlID0gYmFieWxvblNwb3RMaWdodC5hbmdsZSAvIDIuMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvblNwb3RMaWdodC5pbm5lckFuZ2xlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlnaHQuc3BvdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQuc3BvdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQuc3BvdC5pbm5lckNvbmVBbmdsZSA9IGJhYnlsb25TcG90TGlnaHQuaW5uZXJBbmdsZSAvIDIuMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlnaHRzIHx8PSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0czogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlnaHRzLmxpZ2h0cy5wdXNoKGxpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlnaHRSZWZlcmVuY2U6IElLSFJMaWdodHNQdW5jdHVhbF9MaWdodFJlZmVyZW5jZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQ6IHRoaXMuX2xpZ2h0cy5saWdodHMubGVuZ3RoIC0gMSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBdm9pZCBkdXBsaWNhdGluZyB0aGUgTGlnaHQncyBwYXJlbnQgbm9kZSBpZiBwb3NzaWJsZS5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRCYWJ5bG9uTm9kZSA9IGJhYnlsb25Ob2RlLnBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50QmFieWxvbk5vZGUgJiYgcGFyZW50QmFieWxvbk5vZGUuZ2V0Q2hpbGRyZW4oKS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5fZXhwb3J0ZXIuX25vZGVzW25vZGVNYXBbcGFyZW50QmFieWxvbk5vZGUudW5pcXVlSWRdXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFRyYW5zbGF0aW9uID0gVmVjdG9yMy5Gcm9tQXJyYXlUb1JlZihwYXJlbnROb2RlLnRyYW5zbGF0aW9uIHx8IFswLCAwLCAwXSwgMCwgVG1wVmVjdG9ycy5WZWN0b3IzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFJvdGF0aW9uID0gUXVhdGVybmlvbi5Gcm9tQXJyYXlUb1JlZihwYXJlbnROb2RlLnJvdGF0aW9uIHx8IFswLCAwLCAwLCAxXSwgMCwgVG1wVmVjdG9ycy5RdWF0ZXJuaW9uWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFNjYWxlID0gVmVjdG9yMy5Gcm9tQXJyYXlUb1JlZihwYXJlbnROb2RlLnNjYWxlIHx8IFsxLCAxLCAxXSwgMCwgVG1wVmVjdG9ycy5WZWN0b3IzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudE1hdHJpeCA9IE1hdHJpeC5Db21wb3NlVG9SZWYocGFyZW50U2NhbGUsIHBhcmVudFJvdGF0aW9uLCBwYXJlbnRUcmFuc2xhdGlvbiwgVG1wVmVjdG9ycy5NYXRyaXhbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gVmVjdG9yMy5Gcm9tQXJyYXlUb1JlZihub2RlLnRyYW5zbGF0aW9uIHx8IFswLCAwLCAwXSwgMCwgVG1wVmVjdG9ycy5WZWN0b3IzWzJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdGF0aW9uID0gUXVhdGVybmlvbi5Gcm9tQXJyYXlUb1JlZihub2RlLnJvdGF0aW9uIHx8IFswLCAwLCAwLCAxXSwgMCwgVG1wVmVjdG9ycy5RdWF0ZXJuaW9uWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdHJpeCA9IE1hdHJpeC5Db21wb3NlVG9SZWYoVmVjdG9yMy5PbmVSZWFkT25seSwgcm90YXRpb24sIHRyYW5zbGF0aW9uLCBUbXBWZWN0b3JzLk1hdHJpeFsxXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50TWF0cml4Lm11bHRpcGx5VG9SZWYobWF0cml4LCBtYXRyaXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0cml4LmRlY29tcG9zZShwYXJlbnRTY2FsZSwgcGFyZW50Um90YXRpb24sIHBhcmVudFRyYW5zbGF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50VHJhbnNsYXRpb24uZXF1YWxzVG9GbG9hdHMoMCwgMCwgMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyZW50Tm9kZS50cmFuc2xhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS50cmFuc2xhdGlvbiA9IHBhcmVudFRyYW5zbGF0aW9uLmFzQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUXVhdGVybmlvbi5Jc0lkZW50aXR5KHBhcmVudFJvdGF0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJlbnROb2RlLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnJvdGF0aW9uID0gcGFyZW50Um90YXRpb24uYXNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRTY2FsZS5lcXVhbHNUb0Zsb2F0cygxLCAxLCAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwYXJlbnROb2RlLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnNjYWxlID0gcGFyZW50U2NhbGUuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuZXh0ZW5zaW9ucyB8fD0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmV4dGVuc2lvbnNbTkFNRV0gPSBsaWdodFJlZmVyZW5jZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBub3QgZXhwb3J0IHRoZSBvcmlnaW5hbCBub2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnMgfHw9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IGxpZ2h0UmVmZXJlbmNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbl9FeHBvcnRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAoZXhwb3J0ZXIpID0+IG5ldyBLSFJfbGlnaHRzX3B1bmN0dWFsKGV4cG9ydGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJS0hSTWF0ZXJpYWxzQW5pc290cm9weSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IF9FeHBvcnRlciB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBQQlJCYXNlTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3BickJhc2VNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX2FuaXNvdHJvcHlcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfYW5pc290cm9weSBpbXBsZW1lbnRzIElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB7XHJcbiAgICAvKiogTmFtZSBvZiB0aGlzIGV4dGVuc2lvbiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZCAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgcmVxdWlyZWQgKi9cclxuICAgIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX2V4cG9ydGVyOiBfRXhwb3J0ZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2FzVXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4cG9ydGVyOiBfRXhwb3J0ZXIpIHtcclxuICAgICAgICB0aGlzLl9leHBvcnRlciA9IGV4cG9ydGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZ2V0IHdhc1VzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhc1VzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFkZGl0aW9uYWxUZXh0dXJlcz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBCYXNlVGV4dHVyZVtdIHtcclxuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVGV4dHVyZXM6IEJhc2VUZXh0dXJlW10gPSBbXTtcclxuICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSQmFzZU1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuYW5pc290cm9weS5pc0VuYWJsZWQgJiYgIWJhYnlsb25NYXRlcmlhbC5hbmlzb3Ryb3B5LmxlZ2FjeSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5hbmlzb3Ryb3B5LnRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVGV4dHVyZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwuYW5pc290cm9weS50ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhZGRpdGlvbmFsVGV4dHVyZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUkJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFiYWJ5bG9uTWF0ZXJpYWwuYW5pc290cm9weS5pc0VuYWJsZWQgfHwgYmFieWxvbk1hdGVyaWFsLmFuaXNvdHJvcHkubGVnYWN5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FzVXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zID0gbm9kZS5leHRlbnNpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuaXNvdHJvcHlUZXh0dXJlSW5mbyA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oYmFieWxvbk1hdGVyaWFsLmFuaXNvdHJvcHkudGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5pc290cm9weUluZm86IElLSFJNYXRlcmlhbHNBbmlzb3Ryb3B5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaXNvdHJvcHlTdHJlbmd0aDogYmFieWxvbk1hdGVyaWFsLmFuaXNvdHJvcHkuaW50ZW5zaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaXNvdHJvcHlSb3RhdGlvbjogYmFieWxvbk1hdGVyaWFsLmFuaXNvdHJvcHkuYW5nbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pc290cm9weVRleHR1cmU6IGFuaXNvdHJvcHlUZXh0dXJlSW5mbyA/PyB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVGV4dHVyZXM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuaXNvdHJvcHlJbmZvLmFuaXNvdHJvcHlUZXh0dXJlICE9PSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IGFuaXNvdHJvcHlJbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbl9FeHBvcnRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAoZXhwb3J0ZXIpID0+IG5ldyBLSFJfbWF0ZXJpYWxzX2FuaXNvdHJvcHkoZXhwb3J0ZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwsIElLSFJNYXRlcmlhbHNDbGVhcmNvYXQgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgUEJSQmFzZU1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJCYXNlTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5cclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX2NsZWFyY29hdFwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc19jbGVhcmNvYXQgaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9leHBvcnRlcjogX0V4cG9ydGVyO1xyXG5cclxuICAgIHByaXZhdGUgX3dhc1VzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihleHBvcnRlcjogX0V4cG9ydGVyKSB7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIgPSBleHBvcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHt9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGdldCB3YXNVc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXNVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogQmFzZVRleHR1cmVbXSB7XHJcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFRleHR1cmVzOiBCYXNlVGV4dHVyZVtdID0gW107XHJcbiAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUkJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5pc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVGV4dHVyZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnVzZVJvdWdobmVzc0Zyb21NYWluVGV4dHVyZSAmJiBiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnRleHR1cmVSb3VnaG5lc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVGV4dHVyZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnRleHR1cmVSb3VnaG5lc3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5jbGVhckNvYXQuYnVtcFRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVGV4dHVyZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LmJ1bXBUZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhZGRpdGlvbmFsVGV4dHVyZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUkJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LmlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dhc1VzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyA9IG5vZGUuZXh0ZW5zaW9ucyB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhckNvYXRUZXh0dXJlSW5mbyA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC50ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIGxldCBjbGVhckNvYXRUZXh0dXJlUm91Z2huZXNzSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnVzZVJvdWdobmVzc0Zyb21NYWluVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ29hdFRleHR1cmVSb3VnaG5lc3NJbmZvID0gdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9nZXRUZXh0dXJlSW5mbyhiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckNvYXRUZXh0dXJlUm91Z2huZXNzSW5mbyA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC50ZXh0dXJlUm91Z2huZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5pc1RpbnRFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9vbHMuV2FybihgQ2xlYXIgQ29sb3IgdGludCBpcyBub3Qgc3VwcG9ydGVkIGZvciBnbFRGIGV4cG9ydC4gSWdub3JpbmcgZm9yOiAke2JhYnlsb25NYXRlcmlhbC5uYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnJlbWFwRjBPbkludGVyZmFjZUNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oYENsZWFyIENvbG9yIEYwIHJlbWFwcGluZyBpcyBub3Qgc3VwcG9ydGVkIGZvciBnbFRGIGV4cG9ydC4gSWdub3JpbmcgZm9yOiAke2JhYnlsb25NYXRlcmlhbC5uYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFyQ29hdE5vcm1hbFRleHR1cmVJbmZvID0gdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9nZXRUZXh0dXJlSW5mbyhiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LmJ1bXBUZXh0dXJlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhckNvYXRJbmZvOiBJS0hSTWF0ZXJpYWxzQ2xlYXJjb2F0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyY29hdEZhY3RvcjogYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5pbnRlbnNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJjb2F0VGV4dHVyZTogY2xlYXJDb2F0VGV4dHVyZUluZm8gPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyY29hdFJvdWdobmVzc0ZhY3RvcjogYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5yb3VnaG5lc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJjb2F0Um91Z2huZXNzVGV4dHVyZTogY2xlYXJDb2F0VGV4dHVyZVJvdWdobmVzc0luZm8gPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyY29hdE5vcm1hbFRleHR1cmU6IGNsZWFyQ29hdE5vcm1hbFRleHR1cmVJbmZvID8/IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBoYXNUZXh0dXJlczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xlYXJDb2F0SW5mby5jbGVhcmNvYXRUZXh0dXJlICE9PSBudWxsIHx8IGNsZWFyQ29hdEluZm8uY2xlYXJjb2F0Um91Z2huZXNzVGV4dHVyZSAhPT0gbnVsbCB8fCBjbGVhckNvYXRJbmZvLmNsZWFyY29hdFJvdWdobmVzc1RleHR1cmUgIT09IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zW05BTUVdID0gY2xlYXJDb2F0SW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc19jbGVhcmNvYXQoZXhwb3J0ZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IF9FeHBvcnRlciB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwsIElLSFJNYXRlcmlhbHNFbWlzc2l2ZVN0cmVuZ3RoIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aFwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aC9SRUFETUUubWQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX2VtaXNzaXZlX3N0cmVuZ3RoIGltcGxlbWVudHMgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIHtcclxuICAgIC8qKiBOYW1lIG9mIHRoaXMgZXh0ZW5zaW9uICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyByZXF1aXJlZCAqL1xyXG4gICAgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2FzVXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICAvKiogQGludGVyYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmMoY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPElNYXRlcmlhbD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIShiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbWlzc2l2ZUNvbG9yID0gYmFieWxvbk1hdGVyaWFsLmVtaXNzaXZlQ29sb3IuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wRW1pc3NpdmVTdHJlbmd0aCA9IE1hdGgubWF4KC4uLmVtaXNzaXZlQ29sb3IpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRlbXBFbWlzc2l2ZVN0cmVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FzVXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zIHx8PSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbWlzc2l2ZVN0cmVuZ3RoSW5mbzogSUtIUk1hdGVyaWFsc0VtaXNzaXZlU3RyZW5ndGggPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pc3NpdmVTdHJlbmd0aDogdGVtcEVtaXNzaXZlU3RyZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSBlYWNoIHZhbHVlIG9mIHRoZSBlbWlzc2l2ZSBmYWN0b3IgdG8gaGF2ZSBhIG1heCB2YWx1ZSBvZiAxXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFbWlzc2l2ZUZhY3RvciA9IGJhYnlsb25NYXRlcmlhbC5lbWlzc2l2ZUNvbG9yLnNjYWxlKDEgLyBlbWlzc2l2ZVN0cmVuZ3RoSW5mby5lbWlzc2l2ZVN0cmVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBub2RlLmVtaXNzaXZlRmFjdG9yID0gbmV3RW1pc3NpdmVGYWN0b3IuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zW05BTUVdID0gZW1pc3NpdmVTdHJlbmd0aEluZm87XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aCgpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwsIElLSFJNYXRlcmlhbHNJb3IgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX2lvclwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc19pb3IvUkVBRE1FLm1kKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc19pb3IgaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZ2V0IHdhc1VzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhc1VzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNFeHRlbnNpb25FbmFibGVkKG1hdDogUEJSTWF0ZXJpYWwpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBUaGlzIGV4dGVuc2lvbiBtdXN0IG5vdCBiZSB1c2VkIG9uIGEgbWF0ZXJpYWwgdGhhdCBhbHNvIHVzZXMgS0hSX21hdGVyaWFsc191bmxpdFxyXG4gICAgICAgIGlmIChtYXQudW5saXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF0LmluZGV4T2ZSZWZyYWN0aW9uICE9IHVuZGVmaW5lZCAmJiBtYXQuaW5kZXhPZlJlZnJhY3Rpb24gIT0gMS41OyAvLyAxLjUgaXMgbm9ybWF0aXZlIGRlZmF1bHQgdmFsdWUuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IFByb21pc2U8SU1hdGVyaWFsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCAmJiB0aGlzLl9pc0V4dGVuc2lvbkVuYWJsZWQoYmFieWxvbk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FzVXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW9ySW5mbzogSUtIUk1hdGVyaWFsc0lvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpb3I6IGJhYnlsb25NYXRlcmlhbC5pbmRleE9mUmVmcmFjdGlvbixcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnMgPSBub2RlLmV4dGVuc2lvbnMgfHwge307XHJcbiAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnNbTkFNRV0gPSBpb3JJbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChleHBvcnRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfaW9yKCkpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IElNYXRlcmlhbCwgSUtIUk1hdGVyaWFsc0lyaWRlc2NlbmNlIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUkJhc2VNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyQmFzZU1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9tYXRlcmlhbHNfaXJpZGVzY2VuY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfaXJpZGVzY2VuY2UgaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9leHBvcnRlcjogX0V4cG9ydGVyO1xyXG5cclxuICAgIHByaXZhdGUgX3dhc1VzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihleHBvcnRlcjogX0V4cG9ydGVyKSB7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIgPSBleHBvcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHt9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGdldCB3YXNVc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXNVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogQmFzZVRleHR1cmVbXSB7XHJcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFRleHR1cmVzOiBCYXNlVGV4dHVyZVtdID0gW107XHJcbiAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUkJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLmlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS50ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFRleHR1cmVzLnB1c2goYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLnRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS50aGlja25lc3NUZXh0dXJlICYmIGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS50aGlja25lc3NUZXh0dXJlICE9PSBiYWJ5bG9uTWF0ZXJpYWwuaXJpZGVzY2VuY2UudGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxUZXh0dXJlcy5wdXNoKGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS50aGlja25lc3NUZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhZGRpdGlvbmFsVGV4dHVyZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUkJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFiYWJ5bG9uTWF0ZXJpYWwuaXJpZGVzY2VuY2UuaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FzVXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zID0gbm9kZS5leHRlbnNpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGlyaWRlc2NlbmNlVGV4dHVyZUluZm8gPSB0aGlzLl9leHBvcnRlci5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2dldFRleHR1cmVJbmZvKGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS50ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlyaWRlc2NlbmNlVGhpY2tuZXNzVGV4dHVyZUluZm8gPSB0aGlzLl9leHBvcnRlci5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2dldFRleHR1cmVJbmZvKGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS50aGlja25lc3NUZXh0dXJlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpcmlkZXNjZW5jZUluZm86IElLSFJNYXRlcmlhbHNJcmlkZXNjZW5jZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpcmlkZXNjZW5jZUZhY3RvcjogYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLmludGVuc2l0eSxcclxuICAgICAgICAgICAgICAgICAgICBpcmlkZXNjZW5jZUlvcjogYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLmluZGV4T2ZSZWZyYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGlyaWRlc2NlbmNlVGhpY2tuZXNzTWluaW11bTogYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLm1pbmltdW1UaGlja25lc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgaXJpZGVzY2VuY2VUaGlja25lc3NNYXhpbXVtOiBiYWJ5bG9uTWF0ZXJpYWwuaXJpZGVzY2VuY2UubWF4aW11bVRoaWNrbmVzcyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXJpZGVzY2VuY2VUZXh0dXJlOiBpcmlkZXNjZW5jZVRleHR1cmVJbmZvID8/IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBpcmlkZXNjZW5jZVRoaWNrbmVzc1RleHR1cmU6IGlyaWRlc2NlbmNlVGhpY2tuZXNzVGV4dHVyZUluZm8gPz8gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhc1RleHR1cmVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpcmlkZXNjZW5jZUluZm8uaXJpZGVzY2VuY2VUZXh0dXJlICE9PSBudWxsIHx8IGlyaWRlc2NlbmNlSW5mby5pcmlkZXNjZW5jZVRoaWNrbmVzc1RleHR1cmUgIT09IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zW05BTUVdID0gaXJpZGVzY2VuY2VJbmZvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbl9FeHBvcnRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAoZXhwb3J0ZXIpID0+IG5ldyBLSFJfbWF0ZXJpYWxzX2lyaWRlc2NlbmNlKGV4cG9ydGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJS0hSTWF0ZXJpYWxzU2hlZW4gfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9tYXRlcmlhbHNfc2hlZW5cIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfc2hlZW4gaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0ZXI6IF9FeHBvcnRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihleHBvcnRlcjogX0V4cG9ydGVyKSB7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIgPSBleHBvcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHt9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGdldCB3YXNVc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXNVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXMoY29udGV4dDogc3RyaW5nLCBub2RlOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBCYXNlVGV4dHVyZVtdIHtcclxuICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5zaGVlbi5pc0VuYWJsZWQgJiYgYmFieWxvbk1hdGVyaWFsLnNoZWVuLnRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbYmFieWxvbk1hdGVyaWFsLnNoZWVuLnRleHR1cmVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jKGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJhYnlsb25NYXRlcmlhbC5zaGVlbi5pc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5leHRlbnNpb25zID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNoZWVuSW5mbzogSUtIUk1hdGVyaWFsc1NoZWVuID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNoZWVuQ29sb3JGYWN0b3I6IGJhYnlsb25NYXRlcmlhbC5zaGVlbi5jb2xvci5hc0FycmF5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2hlZW5Sb3VnaG5lc3NGYWN0b3I6IGJhYnlsb25NYXRlcmlhbC5zaGVlbi5yb3VnaG5lc3MgPz8gMCxcclxuICAgICAgICAgICAgICAgICAgICBoYXNUZXh0dXJlczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hlZW5JbmZvLnNoZWVuQ29sb3JUZXh0dXJlICE9PSBudWxsIHx8IHNoZWVuSW5mby5zaGVlblJvdWdobmVzc1RleHR1cmUgIT09IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5zaGVlbi50ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hlZW5JbmZvLnNoZWVuQ29sb3JUZXh0dXJlID0gdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9nZXRUZXh0dXJlSW5mbyhiYWJ5bG9uTWF0ZXJpYWwuc2hlZW4udGV4dHVyZSkgPz8gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuc2hlZW4udGV4dHVyZVJvdWdobmVzcyAmJiAhYmFieWxvbk1hdGVyaWFsLnNoZWVuLnVzZVJvdWdobmVzc0Zyb21NYWluVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNoZWVuSW5mby5zaGVlblJvdWdobmVzc1RleHR1cmUgPSB0aGlzLl9leHBvcnRlci5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2dldFRleHR1cmVJbmZvKGJhYnlsb25NYXRlcmlhbC5zaGVlbi50ZXh0dXJlUm91Z2huZXNzKSA/PyB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJhYnlsb25NYXRlcmlhbC5zaGVlbi50ZXh0dXJlICYmIGJhYnlsb25NYXRlcmlhbC5zaGVlbi51c2VSb3VnaG5lc3NGcm9tTWFpblRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGVlbkluZm8uc2hlZW5Sb3VnaG5lc3NUZXh0dXJlID0gdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9nZXRUZXh0dXJlSW5mbyhiYWJ5bG9uTWF0ZXJpYWwuc2hlZW4udGV4dHVyZSkgPz8gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IHNoZWVuSW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc19zaGVlbihleHBvcnRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IElNYXRlcmlhbCwgSUtIUk1hdGVyaWFsc1NwZWN1bGFyIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX3NwZWN1bGFyXCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfbWF0ZXJpYWxzX3NwZWN1bGFyL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfc3BlY3VsYXIgaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9leHBvcnRlcjogX0V4cG9ydGVyO1xyXG5cclxuICAgIHByaXZhdGUgX3dhc1VzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihleHBvcnRlcjogX0V4cG9ydGVyKSB7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIgPSBleHBvcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHt9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGdldCB3YXNVc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXNVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogQmFzZVRleHR1cmVbXSB7XHJcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFRleHR1cmVzOiBCYXNlVGV4dHVyZVtdID0gW107XHJcblxyXG4gICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNFeHRlbnNpb25FbmFibGVkKGJhYnlsb25NYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwubWV0YWxsaWNSZWZsZWN0YW5jZVRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVGV4dHVyZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwubWV0YWxsaWNSZWZsZWN0YW5jZVRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5yZWZsZWN0YW5jZVRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsVGV4dHVyZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwucmVmbGVjdGFuY2VUZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhZGRpdGlvbmFsVGV4dHVyZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhZGRpdGlvbmFsVGV4dHVyZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNFeHRlbnNpb25FbmFibGVkKG1hdDogUEJSTWF0ZXJpYWwpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBUaGlzIGV4dGVuc2lvbiBtdXN0IG5vdCBiZSB1c2VkIG9uIGEgbWF0ZXJpYWwgdGhhdCBhbHNvIHVzZXMgS0hSX21hdGVyaWFsc191bmxpdFxyXG4gICAgICAgIGlmIChtYXQudW5saXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAobWF0Lm1ldGFsbGljRjBGYWN0b3IgIT0gdW5kZWZpbmVkICYmIG1hdC5tZXRhbGxpY0YwRmFjdG9yICE9IDEuMCkgfHxcclxuICAgICAgICAgICAgKG1hdC5tZXRhbGxpY1JlZmxlY3RhbmNlQ29sb3IgIT0gdW5kZWZpbmVkICYmICFtYXQubWV0YWxsaWNSZWZsZWN0YW5jZUNvbG9yLmVxdWFsc0Zsb2F0cygxLjAsIDEuMCwgMS4wKSkgfHxcclxuICAgICAgICAgICAgdGhpcy5faGFzVGV4dHVyZXNFeHRlbnNpb24obWF0KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFzVGV4dHVyZXNFeHRlbnNpb24obWF0OiBQQlJNYXRlcmlhbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBtYXQubWV0YWxsaWNSZWZsZWN0YW5jZVRleHR1cmUgIT0gbnVsbCB8fCBtYXQucmVmbGVjdGFuY2VUZXh0dXJlICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IFByb21pc2U8SU1hdGVyaWFsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCAmJiB0aGlzLl9pc0V4dGVuc2lvbkVuYWJsZWQoYmFieWxvbk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FzVXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zID0gbm9kZS5leHRlbnNpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFsbGljUmVmbGVjdGFuY2VUZXh0dXJlID0gdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9nZXRUZXh0dXJlSW5mbyhiYWJ5bG9uTWF0ZXJpYWwubWV0YWxsaWNSZWZsZWN0YW5jZVRleHR1cmUpID8/IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmxlY3RhbmNlVGV4dHVyZSA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oYmFieWxvbk1hdGVyaWFsLnJlZmxlY3RhbmNlVGV4dHVyZSkgPz8gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWV0YWxsaWNGMEZhY3RvciA9IGJhYnlsb25NYXRlcmlhbC5tZXRhbGxpY0YwRmFjdG9yID09IDEuMCA/IHVuZGVmaW5lZCA6IGJhYnlsb25NYXRlcmlhbC5tZXRhbGxpY0YwRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWV0YWxsaWNSZWZsZWN0YW5jZUNvbG9yID0gYmFieWxvbk1hdGVyaWFsLm1ldGFsbGljUmVmbGVjdGFuY2VDb2xvci5lcXVhbHNGbG9hdHMoMS4wLCAxLjAsIDEuMClcclxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIDogYmFieWxvbk1hdGVyaWFsLm1ldGFsbGljUmVmbGVjdGFuY2VDb2xvci5hc0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlY3VsYXJJbmZvOiBJS0hSTWF0ZXJpYWxzU3BlY3VsYXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlY3VsYXJGYWN0b3I6IG1ldGFsbGljRjBGYWN0b3IsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlY3VsYXJUZXh0dXJlOiBtZXRhbGxpY1JlZmxlY3RhbmNlVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVjdWxhckNvbG9yRmFjdG9yOiBtZXRhbGxpY1JlZmxlY3RhbmNlQ29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlY3VsYXJDb2xvclRleHR1cmU6IHJlZmxlY3RhbmNlVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgICAgICBoYXNUZXh0dXJlczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzVGV4dHVyZXNFeHRlbnNpb24oYmFieWxvbk1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IHNwZWN1bGFySW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc19zcGVjdWxhcihleHBvcnRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IElNYXRlcmlhbCwgSUtIUk1hdGVyaWFsc1RyYW5zbWlzc2lvbiB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IF9FeHBvcnRlciB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc190cmFuc21pc3Npb25cIjtcclxuXHJcbi8qKlxyXG4gKiBbU3BlY2lmaWNhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL2Jsb2IvbWFpbi9leHRlbnNpb25zLzIuMC9LaHJvbm9zL0tIUl9tYXRlcmlhbHNfdHJhbnNtaXNzaW9uL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfdHJhbnNtaXNzaW9uIGltcGxlbWVudHMgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIHtcclxuICAgIC8qKiBOYW1lIG9mIHRoaXMgZXh0ZW5zaW9uICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyByZXF1aXJlZCAqL1xyXG4gICAgcHVibGljIHJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0ZXI6IF9FeHBvcnRlcjtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZXhwb3J0ZXI6IF9FeHBvcnRlcikge1xyXG4gICAgICAgIHRoaXMuX2V4cG9ydGVyID0gZXhwb3J0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7fVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQWRkaXRpb25hbFRleHR1cmVzPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IEJhc2VUZXh0dXJlW10ge1xyXG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxUZXh0dXJlczogQmFzZVRleHR1cmVbXSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRXh0ZW5zaW9uRW5hYmxlZChiYWJ5bG9uTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2UudGhpY2tuZXNzVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxUZXh0dXJlcy5wdXNoKGJhYnlsb25NYXRlcmlhbC5zdWJTdXJmYWNlLnRoaWNrbmVzc1RleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxUZXh0dXJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxUZXh0dXJlcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc0V4dGVuc2lvbkVuYWJsZWQobWF0OiBQQlJNYXRlcmlhbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIFRoaXMgZXh0ZW5zaW9uIG11c3Qgbm90IGJlIHVzZWQgb24gYSBtYXRlcmlhbCB0aGF0IGFsc28gdXNlcyBLSFJfbWF0ZXJpYWxzX3VubGl0XHJcbiAgICAgICAgaWYgKG1hdC51bmxpdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN1YnMgPSBtYXQuc3ViU3VyZmFjZTtcclxuICAgICAgICByZXR1cm4gKHN1YnMuaXNSZWZyYWN0aW9uRW5hYmxlZCAmJiBzdWJzLnJlZnJhY3Rpb25JbnRlbnNpdHkgIT0gdW5kZWZpbmVkICYmIHN1YnMucmVmcmFjdGlvbkludGVuc2l0eSAhPSAwKSB8fCB0aGlzLl9oYXNUZXh0dXJlc0V4dGVuc2lvbihtYXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2hhc1RleHR1cmVzRXh0ZW5zaW9uKG1hdDogUEJSTWF0ZXJpYWwpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbWF0LnN1YlN1cmZhY2UucmVmcmFjdGlvbkludGVuc2l0eVRleHR1cmUgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydE1hdGVyaWFsQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsICYmIHRoaXMuX2lzRXh0ZW5zaW9uRW5hYmxlZChiYWJ5bG9uTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJzID0gYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc21pc3Npb25GYWN0b3IgPSBzdWJzLnJlZnJhY3Rpb25JbnRlbnNpdHkgPT09IDAgPyB1bmRlZmluZWQgOiBzdWJzLnJlZnJhY3Rpb25JbnRlbnNpdHk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNtaXNzaW9uVGV4dHVyZSA9IHRoaXMuX2V4cG9ydGVyLl9nbFRGTWF0ZXJpYWxFeHBvcnRlci5fZ2V0VGV4dHVyZUluZm8oc3Vicy5yZWZyYWN0aW9uSW50ZW5zaXR5VGV4dHVyZSkgPz8gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHZvbHVtZUluZm86IElLSFJNYXRlcmlhbHNUcmFuc21pc3Npb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNtaXNzaW9uRmFjdG9yOiB0cmFuc21pc3Npb25GYWN0b3IsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNtaXNzaW9uVGV4dHVyZTogdHJhbnNtaXNzaW9uVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgICAgICBoYXNUZXh0dXJlczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzVGV4dHVyZXNFeHRlbnNpb24oYmFieWxvbk1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9ucyA9IG5vZGUuZXh0ZW5zaW9ucyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXh0ZW5zaW9uc1tOQU1FXSA9IHZvbHVtZUluZm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChleHBvcnRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfdHJhbnNtaXNzaW9uKGV4cG9ydGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSU1hdGVyaWFsIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgX0V4cG9ydGVyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9tYXRlcmlhbHNfdW5saXRcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfdW5saXQgaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF93YXNVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHt9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IFByb21pc2U8SU1hdGVyaWFsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1bmxpdE1hdGVyaWFsID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIHVubGl0TWF0ZXJpYWwgPSBiYWJ5bG9uTWF0ZXJpYWwudW5saXQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgU3RhbmRhcmRNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgdW5saXRNYXRlcmlhbCA9IGJhYnlsb25NYXRlcmlhbC5kaXNhYmxlTGlnaHRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh1bmxpdE1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5leHRlbnNpb25zID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBub2RlLmV4dGVuc2lvbnNbTkFNRV0gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZShub2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuX0V4cG9ydGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsICgpID0+IG5ldyBLSFJfbWF0ZXJpYWxzX3VubGl0KCkpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IElNYXRlcmlhbCwgSUtIUk1hdGVyaWFsc1ZvbHVtZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IF9FeHBvcnRlciB9IGZyb20gXCIuLi9nbFRGRXhwb3J0ZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX3ZvbHVtZVwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc192b2x1bWUvUkVBRE1FLm1kKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc192b2x1bWUgaW1wbGVtZW50cyBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIge1xyXG4gICAgLyoqIE5hbWUgb2YgdGhpcyBleHRlbnNpb24gKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIHJlcXVpcmVkICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9leHBvcnRlcjogX0V4cG9ydGVyO1xyXG5cclxuICAgIHByaXZhdGUgX3dhc1VzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihleHBvcnRlcjogX0V4cG9ydGVyKSB7XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIgPSBleHBvcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHt9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGdldCB3YXNVc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93YXNVc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogQmFzZVRleHR1cmVbXSB7XHJcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFRleHR1cmVzOiBCYXNlVGV4dHVyZVtdID0gW107XHJcblxyXG4gICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNFeHRlbnNpb25FbmFibGVkKGJhYnlsb25NYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZS50aGlja25lc3NUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFRleHR1cmVzLnB1c2goYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2UudGhpY2tuZXNzVGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRkaXRpb25hbFRleHR1cmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWRkaXRpb25hbFRleHR1cmVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lzRXh0ZW5zaW9uRW5hYmxlZChtYXQ6IFBCUk1hdGVyaWFsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gVGhpcyBleHRlbnNpb24gbXVzdCBub3QgYmUgdXNlZCBvbiBhIG1hdGVyaWFsIHRoYXQgYWxzbyB1c2VzIEtIUl9tYXRlcmlhbHNfdW5saXRcclxuICAgICAgICBpZiAobWF0LnVubGl0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3VicyA9IG1hdC5zdWJTdXJmYWNlO1xyXG4gICAgICAgIC8vIHRoaXMgZXh0ZW5zaW9uIHJlcXVpcmVzIGVpdGhlciB0aGUgS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24gb3IgS0hSX21hdGVyaWFsc190cmFuc2x1Y2VuY3kgZXh0ZW5zaW9ucy5cclxuICAgICAgICBpZiAoIXN1YnMuaXNSZWZyYWN0aW9uRW5hYmxlZCAmJiAhc3Vicy5pc1RyYW5zbHVjZW5jeUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAoc3Vicy5tYXhpbXVtVGhpY2tuZXNzICE9IHVuZGVmaW5lZCAmJiBzdWJzLm1heGltdW1UaGlja25lc3MgIT0gMCkgfHxcclxuICAgICAgICAgICAgKHN1YnMudGludENvbG9yQXREaXN0YW5jZSAhPSB1bmRlZmluZWQgJiYgc3Vicy50aW50Q29sb3JBdERpc3RhbmNlICE9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkgfHxcclxuICAgICAgICAgICAgKHN1YnMudGludENvbG9yICE9IHVuZGVmaW5lZCAmJiBzdWJzLnRpbnRDb2xvciAhPSBDb2xvcjMuV2hpdGUoKSkgfHxcclxuICAgICAgICAgICAgdGhpcy5faGFzVGV4dHVyZXNFeHRlbnNpb24obWF0KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaGFzVGV4dHVyZXNFeHRlbnNpb24obWF0OiBQQlJNYXRlcmlhbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBtYXQuc3ViU3VyZmFjZS50aGlja25lc3NUZXh0dXJlICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IFByb21pc2U8SU1hdGVyaWFsPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCAmJiB0aGlzLl9pc0V4dGVuc2lvbkVuYWJsZWQoYmFieWxvbk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FzVXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VicyA9IGJhYnlsb25NYXRlcmlhbC5zdWJTdXJmYWNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhpY2tuZXNzRmFjdG9yID0gc3Vicy5tYXhpbXVtVGhpY2tuZXNzID09IDAgPyB1bmRlZmluZWQgOiBzdWJzLm1heGltdW1UaGlja25lc3M7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aGlja25lc3NUZXh0dXJlID0gdGhpcy5fZXhwb3J0ZXIuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9nZXRUZXh0dXJlSW5mbyhzdWJzLnRoaWNrbmVzc1RleHR1cmUpID8/IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dGVudWF0aW9uRGlzdGFuY2UgPSBzdWJzLnRpbnRDb2xvckF0RGlzdGFuY2UgPT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZID8gdW5kZWZpbmVkIDogc3Vicy50aW50Q29sb3JBdERpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0ZW51YXRpb25Db2xvciA9IHN1YnMudGludENvbG9yLmVxdWFsc0Zsb2F0cygxLjAsIDEuMCwgMS4wKSA/IHVuZGVmaW5lZCA6IHN1YnMudGludENvbG9yLmFzQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2b2x1bWVJbmZvOiBJS0hSTWF0ZXJpYWxzVm9sdW1lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaWNrbmVzc0ZhY3RvcjogdGhpY2tuZXNzRmFjdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaWNrbmVzc1RleHR1cmU6IHRoaWNrbmVzc1RleHR1cmUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW51YXRpb25EaXN0YW5jZTogYXR0ZW51YXRpb25EaXN0YW5jZSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRlbnVhdGlvbkNvbG9yOiBhdHRlbnVhdGlvbkNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhc1RleHR1cmVzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNUZXh0dXJlc0V4dGVuc2lvbihiYWJ5bG9uTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zID0gbm9kZS5leHRlbnNpb25zIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5leHRlbnNpb25zW05BTUVdID0gdm9sdW1lSW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGV4cG9ydGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc192b2x1bWUoZXhwb3J0ZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBJVGV4dHVyZUluZm8sIElLSFJUZXh0dXJlVHJhbnNmb3JtIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gZnJvbSBcIi4uL2dsVEZFeHBvcnRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBfRXhwb3J0ZXIgfSBmcm9tIFwiLi4vZ2xURkV4cG9ydGVyXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfdGV4dHVyZV90cmFuc2Zvcm1cIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl90ZXh0dXJlX3RyYW5zZm9ybSBpbXBsZW1lbnRzIElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiB7XHJcbiAgICAvKiogTmFtZSBvZiB0aGlzIGV4dGVuc2lvbiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZCAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgcmVxdWlyZWQgKi9cclxuICAgIHB1YmxpYyByZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGdsVEYgZXhwb3J0ZXIgKi9cclxuICAgIHByaXZhdGUgX3dhc1VzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7fVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBnZXQgd2FzVXNlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2FzVXNlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zdEV4cG9ydFRleHR1cmU/KGNvbnRleHQ6IHN0cmluZywgdGV4dHVyZUluZm86IElUZXh0dXJlSW5mbywgYmFieWxvblRleHR1cmU6IFRleHR1cmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjYW5Vc2VFeHRlbnNpb24gPVxyXG4gICAgICAgICAgICBiYWJ5bG9uVGV4dHVyZSAmJlxyXG4gICAgICAgICAgICAoKGJhYnlsb25UZXh0dXJlLnVBbmcgPT09IDAgJiYgYmFieWxvblRleHR1cmUud0FuZyA9PT0gMCAmJiBiYWJ5bG9uVGV4dHVyZS52QW5nID09PSAwKSB8fFxyXG4gICAgICAgICAgICAgICAgKGJhYnlsb25UZXh0dXJlLnVSb3RhdGlvbkNlbnRlciA9PT0gMCAmJiBiYWJ5bG9uVGV4dHVyZS52Um90YXRpb25DZW50ZXIgPT09IDApKTtcclxuXHJcbiAgICAgICAgaWYgKGNhblVzZUV4dGVuc2lvbikge1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlVHJhbnNmb3JtOiBJS0hSVGV4dHVyZVRyYW5zZm9ybSA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtSXNSZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJhYnlsb25UZXh0dXJlLnVPZmZzZXQgIT09IDAgfHwgYmFieWxvblRleHR1cmUudk9mZnNldCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZVRyYW5zZm9ybS5vZmZzZXQgPSBbYmFieWxvblRleHR1cmUudU9mZnNldCwgYmFieWxvblRleHR1cmUudk9mZnNldF07XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1Jc1JlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGJhYnlsb25UZXh0dXJlLnVTY2FsZSAhPT0gMSB8fCBiYWJ5bG9uVGV4dHVyZS52U2NhbGUgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRleHR1cmVUcmFuc2Zvcm0uc2NhbGUgPSBbYmFieWxvblRleHR1cmUudVNjYWxlLCBiYWJ5bG9uVGV4dHVyZS52U2NhbGVdO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtSXNSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uVGV4dHVyZS53QW5nICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlVHJhbnNmb3JtLnJvdGF0aW9uID0gLWJhYnlsb25UZXh0dXJlLndBbmc7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1Jc1JlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGJhYnlsb25UZXh0dXJlLmNvb3JkaW5hdGVzSW5kZXggIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRleHR1cmVUcmFuc2Zvcm0udGV4Q29vcmQgPSBiYWJ5bG9uVGV4dHVyZS5jb29yZGluYXRlc0luZGV4O1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtSXNSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdHJhbnNmb3JtSXNSZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl93YXNVc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKCF0ZXh0dXJlSW5mby5leHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlSW5mby5leHRlbnNpb25zID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGV4dHVyZUluZm8uZXh0ZW5zaW9uc1tOQU1FXSA9IHRleHR1cmVUcmFuc2Zvcm07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVFeHBvcnRUZXh0dXJlQXN5bmMoY29udGV4dDogc3RyaW5nLCBiYWJ5bG9uVGV4dHVyZTogVGV4dHVyZSk6IFByb21pc2U8TnVsbGFibGU8VGV4dHVyZT4+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzY2VuZSA9IGJhYnlsb25UZXh0dXJlLmdldFNjZW5lKCk7XHJcbiAgICAgICAgICAgIGlmICghc2NlbmUpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChgJHtjb250ZXh0fTogXCJzY2VuZVwiIGlzIG5vdCBkZWZpbmVkIGZvciBCYWJ5bG9uIHRleHR1cmUgJHtiYWJ5bG9uVGV4dHVyZS5uYW1lfSFgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICogVGhlIEtIUl90ZXh0dXJlX3RyYW5zZm9ybSBzY2hlbWEgb25seSBzdXBwb3J0cyB3IHJvdGF0aW9uIGFyb3VuZCB0aGUgb3JpZ2luLlxyXG4gICAgICAgICAgICAgKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL3RyZWUvbWFpbi9leHRlbnNpb25zLzIuMC9LaHJvbm9zL0tIUl90ZXh0dXJlX3RyYW5zZm9ybSNnbHRmLXNjaGVtYS11cGRhdGVzLlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKGJhYnlsb25UZXh0dXJlLnVBbmcgIT09IDAgfHwgYmFieWxvblRleHR1cmUudkFuZyAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuV2FybihgJHtjb250ZXh0fTogVGV4dHVyZSAke2JhYnlsb25UZXh0dXJlLm5hbWV9IHdpdGggcm90YXRpb24gaW4gdGhlIHUgb3IgdiBheGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gZ2xURi5gKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmFieWxvblRleHR1cmUud0FuZyAhPT0gMCAmJiAoYmFieWxvblRleHR1cmUudVJvdGF0aW9uQ2VudGVyICE9PSAwIHx8IGJhYnlsb25UZXh0dXJlLnZSb3RhdGlvbkNlbnRlciAhPT0gMCkpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oYCR7Y29udGV4dH06IFRleHR1cmUgJHtiYWJ5bG9uVGV4dHVyZS5uYW1lfSB3aXRoIHJvdGF0aW9uIG5vdCBjZW50ZXJlZCBhdCB0aGUgb3JpZ2luIGNhbm5vdCBiZSBleHBvcnRlZCB3aXRoICR7TkFNRX1gKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJhYnlsb25UZXh0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5fRXhwb3J0ZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKCkgPT4gbmV3IEtIUl90ZXh0dXJlX3RyYW5zZm9ybSgpKTtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vS0hSX3RleHR1cmVfdHJhbnNmb3JtXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9saWdodHNfcHVuY3R1YWxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc19jbGVhcmNvYXRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc19pcmlkZXNjZW5jZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX2FuaXNvdHJvcHlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc19zaGVlblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX3VubGl0XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfaW9yXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfc3BlY3VsYXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc192b2x1bWVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc190cmFuc21pc3Npb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vRVhUX21lc2hfZ3B1X2luc3RhbmNpbmdcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aFwiO1xyXG4iLCJpbXBvcnQgdHlwZSB7IElBbmltYXRpb24sIElOb2RlLCBJQnVmZmVyVmlldywgSUFjY2Vzc29yLCBJQW5pbWF0aW9uU2FtcGxlciwgSUFuaW1hdGlvbkNoYW5uZWwgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLCBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgQWNjZXNzb3JUeXBlLCBBY2Nlc3NvckNvbXBvbmVudFR5cGUgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgTm9kZSB9IGZyb20gXCJjb3JlL25vZGVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IFZlY3RvcjMsIFF1YXRlcm5pb24gfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gXCJjb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBNb3JwaFRhcmdldCB9IGZyb20gXCJjb3JlL01vcnBoL21vcnBoVGFyZ2V0XCI7XHJcbmltcG9ydCB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBfQmluYXJ5V3JpdGVyIH0gZnJvbSBcIi4vZ2xURkV4cG9ydGVyXCI7XHJcbmltcG9ydCB7IF9HTFRGVXRpbGl0aWVzIH0gZnJvbSBcIi4vZ2xURlV0aWxpdGllc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElBbmltYXRpb25LZXkgfSBmcm9tIFwiY29yZS9BbmltYXRpb25zL2FuaW1hdGlvbktleVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb25LZXlJbnRlcnBvbGF0aW9uIH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25LZXlcIjtcclxuXHJcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gXCJjb3JlL0NhbWVyYXMvY2FtZXJhXCI7XHJcbmltcG9ydCB7IExpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL2xpZ2h0XCI7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqIEludGVyZmFjZSB0byBzdG9yZSBhbmltYXRpb24gZGF0YS5cclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGludGVyZmFjZSBfSUFuaW1hdGlvbkRhdGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBLZXlmcmFtZSBkYXRhLlxyXG4gICAgICovXHJcbiAgICBpbnB1dHM6IG51bWJlcltdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBWYWx1ZSBkYXRhLlxyXG4gICAgICovXHJcbiAgICBvdXRwdXRzOiBudW1iZXJbXVtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRpb24gaW50ZXJwb2xhdGlvbiBkYXRhLlxyXG4gICAgICovXHJcbiAgICBzYW1wbGVySW50ZXJwb2xhdGlvbjogQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb247XHJcbiAgICAvKipcclxuICAgICAqIE1pbmltdW0ga2V5ZnJhbWUgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGlucHV0c01pbjogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBNYXhpbXVtIGtleWZyYW1lIHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBpbnB1dHNNYXg6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgaW50ZXJmYWNlIF9JQW5pbWF0aW9uSW5mbyB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0YXJnZXQgY2hhbm5lbCBmb3IgdGhlIGFuaW1hdGlvblxyXG4gICAgICovXHJcbiAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGg7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBnbFRGIGFjY2Vzc29yIHR5cGUgZm9yIHRoZSBkYXRhLlxyXG4gICAgICovXHJcbiAgICBkYXRhQWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGUuVkVDMyB8IEFjY2Vzc29yVHlwZS5WRUM0IHwgQWNjZXNzb3JUeXBlLlNDQUxBUjtcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIHNob3VsZCBiZSB1c2VkLlxyXG4gICAgICovXHJcbiAgICB1c2VRdWF0ZXJuaW9uOiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqIEVudW0gZm9yIGhhbmRsaW5nIGluIHRhbmdlbnQgYW5kIG91dCB0YW5nZW50LlxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5lbnVtIF9UYW5nZW50VHlwZSB7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmllcyB0aGF0IGlucHV0IHRhbmdlbnRzIGFyZSB1c2VkLlxyXG4gICAgICovXHJcbiAgICBJTlRBTkdFTlQsXHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmllcyB0aGF0IG91dHB1dCB0YW5nZW50cyBhcmUgdXNlZC5cclxuICAgICAqL1xyXG4gICAgT1VUVEFOR0VOVCxcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKiBVdGlsaXR5IGNsYXNzIGZvciBnZW5lcmF0aW5nIGdsVEYgYW5pbWF0aW9uIGRhdGEgZnJvbSBCYWJ5bG9uSlMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgX0dMVEZBbmltYXRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmUgaWYgYSBub2RlIGlzIHRyYW5zZm9ybWFibGUgLSBpZSBoYXMgcHJvcGVydGllcyBpdCBzaG91bGQgYmUgcGFydCBvZiBhbmltYXRpb24gb2YgdHJhbnNmb3JtYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk5vZGUgdGhlIG5vZGUgdG8gdGVzdFxyXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBjYW4gYmUgYW5pbWF0ZWQsIGZhbHNlIG90aGVyd2lzZS4gRmFsc2UgaWYgdGhlIHBhcmFtZXRlciBpcyBudWxsIG9yIHVuZGVmaW5lZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0lzVHJhbnNmb3JtYWJsZShiYWJ5bG9uTm9kZTogTm9kZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBiYWJ5bG9uTm9kZSAmJiAoYmFieWxvbk5vZGUgaW5zdGFuY2VvZiBUcmFuc2Zvcm1Ob2RlIHx8IGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgQ2FtZXJhIHx8IGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgTGlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICpcclxuICAgICAqIENyZWF0ZXMgZ2xURiBjaGFubmVsIGFuaW1hdGlvbiBmcm9tIEJhYnlsb25KUyBhbmltYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblRyYW5zZm9ybU5vZGUgLSBCYWJ5bG9uSlMgbWVzaC5cclxuICAgICAqIEBwYXJhbSBhbmltYXRpb24gLSBhbmltYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggLSBUaGUgdGFyZ2V0IGFuaW1hdGlvbiBjaGFubmVsLlxyXG4gICAgICogQHBhcmFtIHVzZVF1YXRlcm5pb24gLSBTcGVjaWZpZXMgaWYgcXVhdGVybmlvbnMgYXJlIHVzZWQuXHJcbiAgICAgKiBAcmV0dXJucyBudWxsYWJsZSBJQW5pbWF0aW9uRGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIF9DcmVhdGVOb2RlQW5pbWF0aW9uKFxyXG4gICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBOb2RlLFxyXG4gICAgICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uLFxyXG4gICAgICAgIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoOiBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICB1c2VRdWF0ZXJuaW9uOiBib29sZWFuLFxyXG4gICAgICAgIGFuaW1hdGlvblNhbXBsZVJhdGU6IG51bWJlclxyXG4gICAgKTogTnVsbGFibGU8X0lBbmltYXRpb25EYXRhPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0lzVHJhbnNmb3JtYWJsZShiYWJ5bG9uVHJhbnNmb3JtTm9kZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXRzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBvdXRwdXRzOiBudW1iZXJbXVtdID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IGtleUZyYW1lcyA9IGFuaW1hdGlvbi5nZXRLZXlzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbk1heEtleUZyYW1lcyA9IF9HTFRGQW5pbWF0aW9uLl9DYWxjdWxhdGVNaW5NYXhLZXlGcmFtZXMoa2V5RnJhbWVzKTtcclxuICAgICAgICAgICAgY29uc3QgaW50ZXJwb2xhdGlvbk9yQmFrZSA9IF9HTFRGQW5pbWF0aW9uLl9EZWR1Y2VJbnRlcnBvbGF0aW9uKGtleUZyYW1lcywgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsIHVzZVF1YXRlcm5pb24pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaW50ZXJwb2xhdGlvbiA9IGludGVycG9sYXRpb25PckJha2UuaW50ZXJwb2xhdGlvblR5cGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZEJha2VBbmltYXRpb24gPSBpbnRlcnBvbGF0aW9uT3JCYWtlLnNob3VsZEJha2VBbmltYXRpb247XHJcblxyXG4gICAgICAgICAgICBpZiAoc2hvdWxkQmFrZUFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0NyZWF0ZUJha2VkQW5pbWF0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5NYXhLZXlGcmFtZXMubWluLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbk1heEtleUZyYW1lcy5tYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZyYW1lUGVyU2Vjb25kLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblNhbXBsZVJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzLFxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dHMsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTWF4S2V5RnJhbWVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZVF1YXRlcm5pb25cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJwb2xhdGlvbiA9PT0gQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uTElORUFSIHx8IGludGVycG9sYXRpb24gPT09IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLlNURVApIHtcclxuICAgICAgICAgICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQ3JlYXRlTGluZWFyT3JTdGVwQW5pbWF0aW9uKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLCBhbmltYXRpb24sIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLCBpbnB1dHMsIG91dHB1dHMsIHVzZVF1YXRlcm5pb24pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnRlcnBvbGF0aW9uID09PSBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5DVUJJQ1NQTElORSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9HTFRGQW5pbWF0aW9uLl9DcmVhdGVDdWJpY1NwbGluZUFuaW1hdGlvbihiYWJ5bG9uVHJhbnNmb3JtTm9kZSwgYW5pbWF0aW9uLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgaW5wdXRzLCBvdXRwdXRzLCB1c2VRdWF0ZXJuaW9uKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0NyZWF0ZUJha2VkQW5pbWF0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluTWF4S2V5RnJhbWVzLm1pbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluTWF4S2V5RnJhbWVzLm1heCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZyYW1lUGVyU2Vjb25kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbk1heEtleUZyYW1lcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlUXVhdGVybmlvblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbnB1dHMubGVuZ3RoICYmIG91dHB1dHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IF9JQW5pbWF0aW9uRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHM6IGlucHV0cyxcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRzOiBvdXRwdXRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhbXBsZXJJbnRlcnBvbGF0aW9uOiBpbnRlcnBvbGF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0c01pbjogc2hvdWxkQmFrZUFuaW1hdGlvbiA/IG1pbk1heEtleUZyYW1lcy5taW4gOiBUb29scy5GbG9hdFJvdW5kKG1pbk1heEtleUZyYW1lcy5taW4gLyBhbmltYXRpb24uZnJhbWVQZXJTZWNvbmQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0c01heDogc2hvdWxkQmFrZUFuaW1hdGlvbiA/IG1pbk1heEtleUZyYW1lcy5tYXggOiBUb29scy5GbG9hdFJvdW5kKG1pbk1heEtleUZyYW1lcy5tYXggLyBhbmltYXRpb24uZnJhbWVQZXJTZWNvbmQpLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRGVkdWNlQW5pbWF0aW9uSW5mbyhhbmltYXRpb246IEFuaW1hdGlvbik6IE51bGxhYmxlPF9JQW5pbWF0aW9uSW5mbz4ge1xyXG4gICAgICAgIGxldCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogTnVsbGFibGU8QW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGg+ID0gbnVsbDtcclxuICAgICAgICBsZXQgZGF0YUFjY2Vzc29yVHlwZSA9IEFjY2Vzc29yVHlwZS5WRUMzO1xyXG4gICAgICAgIGxldCB1c2VRdWF0ZXJuaW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBhbmltYXRpb24udGFyZ2V0UHJvcGVydHkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIHN3aXRjaCAocHJvcGVydHlbMF0pIHtcclxuICAgICAgICAgICAgY2FzZSBcInNjYWxpbmdcIjoge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5TQ0FMRTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJwb3NpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLlRSQU5TTEFUSU9OO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcInJvdGF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIGRhdGFBY2Nlc3NvclR5cGUgPSBBY2Nlc3NvclR5cGUuVkVDNDtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoID0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguUk9UQVRJT047XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwicm90YXRpb25RdWF0ZXJuaW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIGRhdGFBY2Nlc3NvclR5cGUgPSBBY2Nlc3NvclR5cGUuVkVDNDtcclxuICAgICAgICAgICAgICAgIHVzZVF1YXRlcm5pb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5ST1RBVElPTjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbmZsdWVuY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgZGF0YUFjY2Vzc29yVHlwZSA9IEFjY2Vzc29yVHlwZS5TQ0FMQVI7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLldFSUdIVFM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihgVW5zdXBwb3J0ZWQgYW5pbWF0YWJsZSBwcm9wZXJ0eSAke3Byb3BlcnR5WzBdfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsIGRhdGFBY2Nlc3NvclR5cGU6IGRhdGFBY2Nlc3NvclR5cGUsIHVzZVF1YXRlcm5pb246IHVzZVF1YXRlcm5pb24gfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBUb29scy5FcnJvcihcImFuaW1hdGlvbiBjaGFubmVsIHRhcmdldCBwYXRoIGFuZCBkYXRhIGFjY2Vzc29yIHR5cGUgY291bGQgYmUgZGVkdWNlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBDcmVhdGUgbm9kZSBhbmltYXRpb25zIGZyb20gdGhlIHRyYW5zZm9ybSBub2RlIGFuaW1hdGlvbnNcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTm9kZVxyXG4gICAgICogQHBhcmFtIHJ1bnRpbWVHTFRGQW5pbWF0aW9uXHJcbiAgICAgKiBAcGFyYW0gaWRsZUdMVEZBbmltYXRpb25zXHJcbiAgICAgKiBAcGFyYW0gbm9kZU1hcFxyXG4gICAgICogQHBhcmFtIG5vZGVzXHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyXHJcbiAgICAgKiBAcGFyYW0gYnVmZmVyVmlld3NcclxuICAgICAqIEBwYXJhbSBhY2Nlc3NvcnNcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25TYW1wbGVSYXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgX0NyZWF0ZU5vZGVBbmltYXRpb25Gcm9tTm9kZUFuaW1hdGlvbnMoXHJcbiAgICAgICAgYmFieWxvbk5vZGU6IE5vZGUsXHJcbiAgICAgICAgcnVudGltZUdMVEZBbmltYXRpb246IElBbmltYXRpb24sXHJcbiAgICAgICAgaWRsZUdMVEZBbmltYXRpb25zOiBJQW5pbWF0aW9uW10sXHJcbiAgICAgICAgbm9kZU1hcDogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSxcclxuICAgICAgICBub2RlczogSU5vZGVbXSxcclxuICAgICAgICBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgYnVmZmVyVmlld3M6IElCdWZmZXJWaWV3W10sXHJcbiAgICAgICAgYWNjZXNzb3JzOiBJQWNjZXNzb3JbXSxcclxuICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlOiBudW1iZXIsXHJcbiAgICAgICAgc2hvdWxkRXhwb3J0QW5pbWF0aW9uPzogKGFuaW1hdGlvbjogQW5pbWF0aW9uKSA9PiBib29sZWFuXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgZ2xURkFuaW1hdGlvbjogSUFuaW1hdGlvbjtcclxuICAgICAgICBpZiAoX0dMVEZBbmltYXRpb24uX0lzVHJhbnNmb3JtYWJsZShiYWJ5bG9uTm9kZSkpIHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25Ob2RlLmFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYW5pbWF0aW9uIG9mIGJhYnlsb25Ob2RlLmFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkRXhwb3J0QW5pbWF0aW9uICYmICFzaG91bGRFeHBvcnRBbmltYXRpb24oYW5pbWF0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uSW5mbyA9IF9HTFRGQW5pbWF0aW9uLl9EZWR1Y2VBbmltYXRpb25JbmZvKGFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xURkFuaW1hdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGFuaW1hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlcnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQWRkQW5pbWF0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7YW5pbWF0aW9uLm5hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5oYXNSdW5uaW5nUnVudGltZUFuaW1hdGlvbnMgPyBydW50aW1lR0xURkFuaW1hdGlvbiA6IGdsVEZBbmltYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uZGF0YUFjY2Vzc29yVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyVmlld3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JbmZvLnVzZVF1YXRlcm5pb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGQW5pbWF0aW9uLnNhbXBsZXJzLmxlbmd0aCAmJiBnbFRGQW5pbWF0aW9uLmNoYW5uZWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRsZUdMVEZBbmltYXRpb25zLnB1c2goZ2xURkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBDcmVhdGUgaW5kaXZpZHVhbCBtb3JwaCBhbmltYXRpb25zIGZyb20gdGhlIG1lc2gncyBtb3JwaCB0YXJnZXQgYW5pbWF0aW9uIHRyYWNrc1xyXG4gICAgICogQHBhcmFtIGJhYnlsb25Ob2RlXHJcbiAgICAgKiBAcGFyYW0gcnVudGltZUdMVEZBbmltYXRpb25cclxuICAgICAqIEBwYXJhbSBpZGxlR0xURkFuaW1hdGlvbnNcclxuICAgICAqIEBwYXJhbSBub2RlTWFwXHJcbiAgICAgKiBAcGFyYW0gbm9kZXNcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXJcclxuICAgICAqIEBwYXJhbSBidWZmZXJWaWV3c1xyXG4gICAgICogQHBhcmFtIGFjY2Vzc29yc1xyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvblNhbXBsZVJhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfQ3JlYXRlTW9ycGhUYXJnZXRBbmltYXRpb25Gcm9tTW9ycGhUYXJnZXRBbmltYXRpb25zKFxyXG4gICAgICAgIGJhYnlsb25Ob2RlOiBOb2RlLFxyXG4gICAgICAgIHJ1bnRpbWVHTFRGQW5pbWF0aW9uOiBJQW5pbWF0aW9uLFxyXG4gICAgICAgIGlkbGVHTFRGQW5pbWF0aW9uczogSUFuaW1hdGlvbltdLFxyXG4gICAgICAgIG5vZGVNYXA6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0sXHJcbiAgICAgICAgbm9kZXM6IElOb2RlW10sXHJcbiAgICAgICAgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyLFxyXG4gICAgICAgIGJ1ZmZlclZpZXdzOiBJQnVmZmVyVmlld1tdLFxyXG4gICAgICAgIGFjY2Vzc29yczogSUFjY2Vzc29yW10sXHJcbiAgICAgICAgYW5pbWF0aW9uU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gICAgICAgIHNob3VsZEV4cG9ydEFuaW1hdGlvbj86IChhbmltYXRpb246IEFuaW1hdGlvbikgPT4gYm9vbGVhblxyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IGdsVEZBbmltYXRpb246IElBbmltYXRpb247XHJcbiAgICAgICAgaWYgKGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgTWVzaCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldE1hbmFnZXIgPSBiYWJ5bG9uTm9kZS5tb3JwaFRhcmdldE1hbmFnZXI7XHJcbiAgICAgICAgICAgIGlmIChtb3JwaFRhcmdldE1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9ycGhUYXJnZXRNYW5hZ2VyLm51bVRhcmdldHM7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0ID0gbW9ycGhUYXJnZXRNYW5hZ2VyLmdldFRhcmdldChpKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGFuaW1hdGlvbiBvZiBtb3JwaFRhcmdldC5hbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRFeHBvcnRBbmltYXRpb24gJiYgIXNob3VsZEV4cG9ydEFuaW1hdGlvbihhbmltYXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZEFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHthbmltYXRpb24ubmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZsdWVuY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZVBlclNlY29uZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5kYXRhVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5sb29wTW9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5lbmFibGVCbGVuZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21iaW5lZEFuaW1hdGlvbktleXM6IElBbmltYXRpb25LZXlbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb25LZXlzID0gYW5pbWF0aW9uLmdldEtleXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYW5pbWF0aW9uS2V5cy5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uS2V5ID0gYW5pbWF0aW9uS2V5c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbW9ycGhUYXJnZXRNYW5hZ2VyLm51bVRhcmdldHM7ICsraykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrID09IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRBbmltYXRpb25LZXlzLnB1c2goYW5pbWF0aW9uS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZEFuaW1hdGlvbktleXMucHVzaCh7IGZyYW1lOiBhbmltYXRpb25LZXkuZnJhbWUsIHZhbHVlOiAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZEFuaW1hdGlvbi5zZXRLZXlzKGNvbWJpbmVkQW5pbWF0aW9uS2V5cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkluZm8gPSBfR0xURkFuaW1hdGlvbi5fRGVkdWNlQW5pbWF0aW9uSW5mbyhjb21iaW5lZEFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGQW5pbWF0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbWJpbmVkQW5pbWF0aW9uLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlcnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQWRkQW5pbWF0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5oYXNSdW5uaW5nUnVudGltZUFuaW1hdGlvbnMgPyBydW50aW1lR0xURkFuaW1hdGlvbiA6IGdsVEZBbmltYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZWRBbmltYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uSW5mby5kYXRhQWNjZXNzb3JUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZU1hcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyVmlld3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3JzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8udXNlUXVhdGVybmlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0TWFuYWdlci5udW1UYXJnZXRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdsVEZBbmltYXRpb24uc2FtcGxlcnMubGVuZ3RoICYmIGdsVEZBbmltYXRpb24uY2hhbm5lbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRsZUdMVEZBbmltYXRpb25zLnB1c2goZ2xURkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBDcmVhdGUgbm9kZSBhbmQgbW9ycGggYW5pbWF0aW9ucyBmcm9tIHRoZSBhbmltYXRpb24gZ3JvdXBzXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblNjZW5lXHJcbiAgICAgKiBAcGFyYW0gZ2xURkFuaW1hdGlvbnNcclxuICAgICAqIEBwYXJhbSBub2RlTWFwXHJcbiAgICAgKiBAcGFyYW0gbm9kZXNcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXJcclxuICAgICAqIEBwYXJhbSBidWZmZXJWaWV3c1xyXG4gICAgICogQHBhcmFtIGFjY2Vzc29yc1xyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvblNhbXBsZVJhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfQ3JlYXRlTm9kZUFuZE1vcnBoQW5pbWF0aW9uRnJvbUFuaW1hdGlvbkdyb3VwcyhcclxuICAgICAgICBiYWJ5bG9uU2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIGdsVEZBbmltYXRpb25zOiBJQW5pbWF0aW9uW10sXHJcbiAgICAgICAgbm9kZU1hcDogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSxcclxuICAgICAgICBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgYnVmZmVyVmlld3M6IElCdWZmZXJWaWV3W10sXHJcbiAgICAgICAgYWNjZXNzb3JzOiBJQWNjZXNzb3JbXSxcclxuICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlOiBudW1iZXIsXHJcbiAgICAgICAgc2hvdWxkRXhwb3J0QW5pbWF0aW9uPzogKGFuaW1hdGlvbjogQW5pbWF0aW9uKSA9PiBib29sZWFuXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgZ2xURkFuaW1hdGlvbjogSUFuaW1hdGlvbjtcclxuICAgICAgICBpZiAoYmFieWxvblNjZW5lLmFuaW1hdGlvbkdyb3Vwcykge1xyXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb25Hcm91cHMgPSBiYWJ5bG9uU2NlbmUuYW5pbWF0aW9uR3JvdXBzO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFuaW1hdGlvbkdyb3VwIG9mIGFuaW1hdGlvbkdyb3Vwcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9ycGhBbmltYXRpb25zOiBNYXA8TWVzaCwgTWFwPE1vcnBoVGFyZ2V0LCBBbmltYXRpb24+PiA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZUFuaW1hdGlvbnM6IE1hcDxNZXNoLCBBbmltYXRpb24+ID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9ycGhBbmltYXRpb25NZXNoZXM6IFNldDxNZXNoPiA9IG5ldyBTZXQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkdyb3VwRnJhbWVEaWZmID0gYW5pbWF0aW9uR3JvdXAudG8gLSBhbmltYXRpb25Hcm91cC5mcm9tO1xyXG4gICAgICAgICAgICAgICAgZ2xURkFuaW1hdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBhbmltYXRpb25Hcm91cC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBzYW1wbGVyczogW10sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbmltYXRpb25Hcm91cC50YXJnZXRlZEFuaW1hdGlvbnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRBbmltYXRpb24gPSBhbmltYXRpb25Hcm91cC50YXJnZXRlZEFuaW1hdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0QW5pbWF0aW9uLnRhcmdldDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0YXJnZXRBbmltYXRpb24uYW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRFeHBvcnRBbmltYXRpb24gJiYgIXNob3VsZEV4cG9ydEFuaW1hdGlvbihhbmltYXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fSXNUcmFuc2Zvcm1hYmxlKHRhcmdldCkgfHwgKHRhcmdldC5sZW5ndGggPT09IDEgJiYgdGhpcy5fSXNUcmFuc2Zvcm1hYmxlKHRhcmdldFswXSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkluZm8gPSBfR0xURkFuaW1hdGlvbi5fRGVkdWNlQW5pbWF0aW9uSW5mbyh0YXJnZXRBbmltYXRpb24uYW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25UcmFuc2Zvcm1Ob2RlID0gdGhpcy5fSXNUcmFuc2Zvcm1hYmxlKHRhcmdldCkgPyB0YXJnZXQgOiB0aGlzLl9Jc1RyYW5zZm9ybWFibGUodGFyZ2V0WzBdKSA/IHRhcmdldFswXSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvblRyYW5zZm9ybU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQWRkQW5pbWF0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHthbmltYXRpb24ubmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGQW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JbmZvLmRhdGFBY2Nlc3NvclR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVNYXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyVmlld3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uSW5mby51c2VRdWF0ZXJuaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgTW9ycGhUYXJnZXQgfHwgKHRhcmdldC5sZW5ndGggPT09IDEgJiYgdGFyZ2V0WzBdIGluc3RhbmNlb2YgTW9ycGhUYXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkluZm8gPSBfR0xURkFuaW1hdGlvbi5fRGVkdWNlQW5pbWF0aW9uSW5mbyh0YXJnZXRBbmltYXRpb24uYW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25Nb3JwaFRhcmdldCA9IHRhcmdldCBpbnN0YW5jZW9mIE1vcnBoVGFyZ2V0ID8gKHRhcmdldCBhcyBNb3JwaFRhcmdldCkgOiAodGFyZ2V0WzBdIGFzIE1vcnBoVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTW9ycGhUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uTW9ycGhUYXJnZXRNYW5hZ2VyID0gYmFieWxvblNjZW5lLm1vcnBoVGFyZ2V0TWFuYWdlcnMuZmluZCgobW9ycGhUYXJnZXRNYW5hZ2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbW9ycGhUYXJnZXRNYW5hZ2VyLm51bVRhcmdldHM7ICsraikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vcnBoVGFyZ2V0TWFuYWdlci5nZXRUYXJnZXQoaikgPT09IGJhYnlsb25Nb3JwaFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1vcnBoVGFyZ2V0TWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaCA9IGJhYnlsb25TY2VuZS5tZXNoZXMuZmluZCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChtZXNoIGFzIE1lc2gpLm1vcnBoVGFyZ2V0TWFuYWdlciA9PT0gYmFieWxvbk1vcnBoVGFyZ2V0TWFuYWdlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgYXMgTWVzaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1vcnBoQW5pbWF0aW9ucy5oYXMoYmFieWxvbk1lc2gpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhBbmltYXRpb25zLnNldChiYWJ5bG9uTWVzaCwgbmV3IE1hcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoQW5pbWF0aW9ucy5nZXQoYmFieWxvbk1lc2gpPy5zZXQoYmFieWxvbk1vcnBoVGFyZ2V0LCBhbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhBbmltYXRpb25NZXNoZXMuYWRkKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZUFuaW1hdGlvbnMuc2V0KGJhYnlsb25NZXNoLCBhbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgcGxhY2UgZm9yIHRoZSBLSFJfYW5pbWF0aW9uX3BvaW50ZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW9ycGhBbmltYXRpb25NZXNoZXMuZm9yRWFjaCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0TWFuYWdlciA9IG1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyITtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29tYmluZWRBbmltYXRpb25Hcm91cDogTnVsbGFibGU8QW5pbWF0aW9uPiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uS2V5czogSUFuaW1hdGlvbktleVtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2FtcGxlQW5pbWF0aW9uID0gc2FtcGxlQW5pbWF0aW9ucy5nZXQobWVzaCkhO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZUFuaW1hdGlvbktleXMgPSBzYW1wbGVBbmltYXRpb24uZ2V0S2V5cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bUFuaW1hdGlvbktleXMgPSBzYW1wbGVBbmltYXRpb25LZXlzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEdWUgdG8gaG93IGdsVEYgZXhwZWN0cyBtb3JwaCB0YXJnZXQgYW5pbWF0aW9uIGRhdGEgdG8gYmUgZm9ybWF0dGVkLCB3ZSBuZWVkIHRvIHJlYXJyYW5nZSB0aGUgaW5kaXZpZHVhbCBtb3JwaCB0YXJnZXQgYW5pbWF0aW9uIHRyYWNrcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjaCB0aGF0IHdlIGhhdmUgYSBzaW5nbGUgYW5pbWF0aW9uLCB3aGVyZSBhIGdpdmVuIGtleWZyYW1lIGlucHV0IHZhbHVlIGhhcyBzdWNjZXNzaXZlIG91dHB1dCB2YWx1ZXMgZm9yIGVhY2ggbW9ycGggdGFyZ2V0IGJlbG9uZ2luZyB0byB0aGUgbWFuYWdlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgU2VlOiBodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8yLjAjYW5pbWF0aW9uc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgZG8gdGhpcyB2aWEgY29uc3RydWN0aW5nIGEgbmV3IEFuaW1hdGlvbiB0cmFjaywgYW5kIGludGVybGVhdmluZyB0aGUgZnJhbWVzIG9mIGVhY2ggbW9ycGggdGFyZ2V0IGFuaW1hdGlvbiB0cmFjayBpbiB0aGUgY3VycmVudCBBbmltYXRpb24gR3JvdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2UgcmV1c2UgdGhlIEJhYnlsb24gQW5pbWF0aW9uIGRhdGEgc3RydWN0dXJlIGZvciBlYXNlIG9mIGhhbmRsaW5nIGV4cG9ydCBvZiBjdWJpYyBzcGxpbmUgYW5pbWF0aW9uIGtleXMsIGFuZCB0byByZXVzZSB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcgX0dMVEZBbmltYXRpb24uQWRkQW5pbWF0aW9uIGNvZGVwYXRoIHdpdGggbWluaW1hbCBtb2RpZmljYXRpb24sIGhvd2V2ZXIgdGhlIGNvbnN0cnVjdGVkIEJhYnlsb24gQW5pbWF0aW9uIGlzIE5PVCBpbnRlbmRlZCBmb3IgdXNlIGluLWVuZ2luZS5cclxuICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQW5pbWF0aW9uS2V5czsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbW9ycGhUYXJnZXRNYW5hZ2VyLm51bVRhcmdldHM7ICsraikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXQgPSBtb3JwaFRhcmdldE1hbmFnZXIuZ2V0VGFyZ2V0KGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uc0J5TW9ycGhUYXJnZXQgPSBtb3JwaEFuaW1hdGlvbnMuZ2V0KG1lc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbnNCeU1vcnBoVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRBbmltYXRpb24gPSBhbmltYXRpb25zQnlNb3JwaFRhcmdldC5nZXQobW9ycGhUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb3JwaFRhcmdldEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbWJpbmVkQW5pbWF0aW9uR3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkQW5pbWF0aW9uR3JvdXAgPSBuZXcgQW5pbWF0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke2FuaW1hdGlvbkdyb3VwLm5hbWV9XyR7bWVzaC5uYW1lfV9Nb3JwaFdlaWdodEFuaW1hdGlvbmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZsdWVuY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEFuaW1hdGlvbi5mcmFtZVBlclNlY29uZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEFuaW1hdGlvbi5sb29wTW9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaFRhcmdldEFuaW1hdGlvbi5lbmFibGVCbGVuZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25LZXlzLnB1c2gobW9ycGhUYXJnZXRBbmltYXRpb24uZ2V0S2V5cygpW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25LZXlzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWU6IGFuaW1hdGlvbkdyb3VwLmZyb20gKyAoYW5pbWF0aW9uR3JvdXBGcmFtZURpZmYgLyBudW1BbmltYXRpb25LZXlzKSAqIGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbW9ycGhUYXJnZXQuaW5mbHVlbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5UYW5nZW50OiBzYW1wbGVBbmltYXRpb25LZXlzWzBdLmluVGFuZ2VudCA/IDAgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRUYW5nZW50OiBzYW1wbGVBbmltYXRpb25LZXlzWzBdLm91dFRhbmdlbnQgPyAwIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29tYmluZWRBbmltYXRpb25Hcm91cCEuc2V0S2V5cyhhbmltYXRpb25LZXlzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb25JbmZvID0gX0dMVEZBbmltYXRpb24uX0RlZHVjZUFuaW1hdGlvbkluZm8oY29tYmluZWRBbmltYXRpb25Hcm91cCEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9HTFRGQW5pbWF0aW9uLl9BZGRBbmltYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHthbmltYXRpb25Hcm91cC5uYW1lfV8ke21lc2gubmFtZX1fTW9ycGhXZWlnaHRBbmltYXRpb25gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURkFuaW1hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZEFuaW1hdGlvbkdyb3VwISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uZGF0YUFjY2Vzc29yVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkluZm8uYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyVmlld3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JbmZvLnVzZVF1YXRlcm5pb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TYW1wbGVSYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRNYW5hZ2VyPy5udW1UYXJnZXRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xURkFuaW1hdGlvbi5jaGFubmVscy5sZW5ndGggJiYgZ2xURkFuaW1hdGlvbi5zYW1wbGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbFRGQW5pbWF0aW9ucy5wdXNoKGdsVEZBbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9BZGRBbmltYXRpb24oXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGdsVEZBbmltYXRpb246IElBbmltYXRpb24sXHJcbiAgICAgICAgYmFieWxvblRyYW5zZm9ybU5vZGU6IE5vZGUsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBBbmltYXRpb24sXHJcbiAgICAgICAgZGF0YUFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLFxyXG4gICAgICAgIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoOiBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICBub2RlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9LFxyXG4gICAgICAgIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcixcclxuICAgICAgICBidWZmZXJWaWV3czogSUJ1ZmZlclZpZXdbXSxcclxuICAgICAgICBhY2Nlc3NvcnM6IElBY2Nlc3NvcltdLFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW4sXHJcbiAgICAgICAgYW5pbWF0aW9uU2FtcGxlUmF0ZTogbnVtYmVyLFxyXG4gICAgICAgIG1vcnBoQW5pbWF0aW9uQ2hhbm5lbHM/OiBudW1iZXJcclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbkRhdGEgPSBfR0xURkFuaW1hdGlvbi5fQ3JlYXRlTm9kZUFuaW1hdGlvbihiYWJ5bG9uVHJhbnNmb3JtTm9kZSwgYW5pbWF0aW9uLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgdXNlUXVhdGVybmlvbiwgYW5pbWF0aW9uU2FtcGxlUmF0ZSk7XHJcbiAgICAgICAgbGV0IGJ1ZmZlclZpZXc6IElCdWZmZXJWaWV3O1xyXG4gICAgICAgIGxldCBhY2Nlc3NvcjogSUFjY2Vzc29yO1xyXG4gICAgICAgIGxldCBrZXlmcmFtZUFjY2Vzc29ySW5kZXg6IG51bWJlcjtcclxuICAgICAgICBsZXQgZGF0YUFjY2Vzc29ySW5kZXg6IG51bWJlcjtcclxuICAgICAgICBsZXQgb3V0cHV0TGVuZ3RoOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvblNhbXBsZXI6IElBbmltYXRpb25TYW1wbGVyO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25DaGFubmVsOiBJQW5pbWF0aW9uQ2hhbm5lbDtcclxuXHJcbiAgICAgICAgaWYgKGFuaW1hdGlvbkRhdGEpIHtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICogTm93IHRoYXQgd2UgaGF2ZSB0aGUgZ2xURiBjb252ZXJ0ZWQgbW9ycGggdGFyZ2V0IGFuaW1hdGlvbiBkYXRhLFxyXG4gICAgICAgICAgICAgKiB3ZSBjYW4gcmVtb3ZlIHJlZHVuZGFudCBpbnB1dCBkYXRhIHNvIHRoYXQgd2UgaGF2ZSBuIGlucHV0IGZyYW1lcyxcclxuICAgICAgICAgICAgICogYW5kIG1vcnBoQW5pbWF0aW9uQ2hhbm5lbHMgKiBuIG91dHB1dCBmcmFtZXNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmIChtb3JwaEFuaW1hdGlvbkNoYW5uZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRJbnB1dDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0lucHV0czogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChhbmltYXRpb25EYXRhLmlucHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudElucHV0ID0gYW5pbWF0aW9uRGF0YS5pbnB1dHMuc2hpZnQoKSE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICUgbW9ycGhBbmltYXRpb25DaGFubmVscyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0lucHV0cy5wdXNoKGN1cnJlbnRJbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25EYXRhLmlucHV0cyA9IG5ld0lucHV0cztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gbm9kZU1hcFtiYWJ5bG9uVHJhbnNmb3JtTm9kZS51bmlxdWVJZF07XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGVzIGJ1ZmZlciB2aWV3IGFuZCBhY2Nlc3NvciBmb3Iga2V5IGZyYW1lcy5cclxuICAgICAgICAgICAgbGV0IGJ5dGVMZW5ndGggPSBhbmltYXRpb25EYXRhLmlucHV0cy5sZW5ndGggKiA0O1xyXG4gICAgICAgICAgICBidWZmZXJWaWV3ID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUJ1ZmZlclZpZXcoMCwgYmluYXJ5V3JpdGVyLmdldEJ5dGVPZmZzZXQoKSwgYnl0ZUxlbmd0aCwgdW5kZWZpbmVkLCBgJHtuYW1lfSAga2V5ZnJhbWUgZGF0YSB2aWV3YCk7XHJcbiAgICAgICAgICAgIGJ1ZmZlclZpZXdzLnB1c2goYnVmZmVyVmlldyk7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkRhdGEuaW5wdXRzLmZvckVhY2goZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIuc2V0RmxvYXQzMihpbnB1dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQWNjZXNzb3IoXHJcbiAgICAgICAgICAgICAgICBidWZmZXJWaWV3cy5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgICAgICAgYCR7bmFtZX0gIGtleWZyYW1lc2AsXHJcbiAgICAgICAgICAgICAgICBBY2Nlc3NvclR5cGUuU0NBTEFSLFxyXG4gICAgICAgICAgICAgICAgQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRGF0YS5pbnB1dHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgICAgIFthbmltYXRpb25EYXRhLmlucHV0c01pbl0sXHJcbiAgICAgICAgICAgICAgICBbYW5pbWF0aW9uRGF0YS5pbnB1dHNNYXhdXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGFjY2Vzc29ycy5wdXNoKGFjY2Vzc29yKTtcclxuICAgICAgICAgICAga2V5ZnJhbWVBY2Nlc3NvckluZGV4ID0gYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYnVmZmVydmlldyBhbmQgYWNjZXNzb3IgZm9yIGtleWVkIHZhbHVlcy5cclxuICAgICAgICAgICAgb3V0cHV0TGVuZ3RoID0gYW5pbWF0aW9uRGF0YS5vdXRwdXRzLmxlbmd0aDtcclxuICAgICAgICAgICAgYnl0ZUxlbmd0aCA9IF9HTFRGVXRpbGl0aWVzLl9HZXREYXRhQWNjZXNzb3JFbGVtZW50Q291bnQoZGF0YUFjY2Vzc29yVHlwZSkgKiA0ICogYW5pbWF0aW9uRGF0YS5vdXRwdXRzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBpbiBhbmQgb3V0IHRhbmdlbnRzXHJcbiAgICAgICAgICAgIGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpLCBieXRlTGVuZ3RoLCB1bmRlZmluZWQsIGAke25hbWV9ICBkYXRhIHZpZXdgKTtcclxuICAgICAgICAgICAgYnVmZmVyVmlld3MucHVzaChidWZmZXJWaWV3KTtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkRhdGEub3V0cHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRGbG9hdDMyKGVudHJ5KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFjY2Vzc29yID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUFjY2Vzc29yKGJ1ZmZlclZpZXdzLmxlbmd0aCAtIDEsIGAke25hbWV9ICBkYXRhYCwgZGF0YUFjY2Vzc29yVHlwZSwgQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBvdXRwdXRMZW5ndGgsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBhY2Nlc3NvcnMucHVzaChhY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIGRhdGFBY2Nlc3NvckluZGV4ID0gYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgc2FtcGxlclxyXG4gICAgICAgICAgICBhbmltYXRpb25TYW1wbGVyID0ge1xyXG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGlvbjogYW5pbWF0aW9uRGF0YS5zYW1wbGVySW50ZXJwb2xhdGlvbixcclxuICAgICAgICAgICAgICAgIGlucHV0OiBrZXlmcmFtZUFjY2Vzc29ySW5kZXgsXHJcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IGRhdGFBY2Nlc3NvckluZGV4LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBnbFRGQW5pbWF0aW9uLnNhbXBsZXJzLnB1c2goYW5pbWF0aW9uU2FtcGxlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgY2hhbm5lbFxyXG4gICAgICAgICAgICBhbmltYXRpb25DaGFubmVsID0ge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlcjogZ2xURkFuaW1hdGlvbi5zYW1wbGVycy5sZW5ndGggLSAxLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogbm9kZUluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZ2xURkFuaW1hdGlvbi5jaGFubmVscy5wdXNoKGFuaW1hdGlvbkNoYW5uZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGJha2VkIGFuaW1hdGlvblxyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlIEJhYnlsb25KUyBtZXNoXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uIEJhYnlsb25KUyBhbmltYXRpb24gY29ycmVzcG9uZGluZyB0byB0aGUgQmFieWxvbkpTIG1lc2hcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCBhbmltYXRpb24gdGFyZ2V0IGNoYW5uZWxcclxuICAgICAqIEBwYXJhbSBtaW5GcmFtZSBtaW5pbXVtIGFuaW1hdGlvbiBmcmFtZVxyXG4gICAgICogQHBhcmFtIG1heEZyYW1lIG1heGltdW0gYW5pbWF0aW9uIGZyYW1lXHJcbiAgICAgKiBAcGFyYW0gZnBzIGZyYW1lcyBwZXIgc2Vjb25kIG9mIHRoZSBhbmltYXRpb25cclxuICAgICAqIEBwYXJhbSBzYW1wbGVSYXRlXHJcbiAgICAgKiBAcGFyYW0gaW5wdXRzIGlucHV0IGtleSBmcmFtZXMgb2YgdGhlIGFuaW1hdGlvblxyXG4gICAgICogQHBhcmFtIG91dHB1dHMgb3V0cHV0IGtleSBmcmFtZSBkYXRhIG9mIHRoZSBhbmltYXRpb25cclxuICAgICAqIEBwYXJhbSBtaW5NYXhGcmFtZXNcclxuICAgICAqIEBwYXJhbSBtaW5NYXhGcmFtZXMubWluXHJcbiAgICAgKiBAcGFyYW0gbWluTWF4RnJhbWVzLm1heFxyXG4gICAgICogQHBhcmFtIHVzZVF1YXRlcm5pb24gc3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIHNob3VsZCBiZSB1c2VkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9DcmVhdGVCYWtlZEFuaW1hdGlvbihcclxuICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZTogTm9kZSxcclxuICAgICAgICBhbmltYXRpb246IEFuaW1hdGlvbixcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgbWluRnJhbWU6IG51bWJlcixcclxuICAgICAgICBtYXhGcmFtZTogbnVtYmVyLFxyXG4gICAgICAgIGZwczogbnVtYmVyLFxyXG4gICAgICAgIHNhbXBsZVJhdGU6IG51bWJlcixcclxuICAgICAgICBpbnB1dHM6IG51bWJlcltdLFxyXG4gICAgICAgIG91dHB1dHM6IG51bWJlcltdW10sXHJcbiAgICAgICAgbWluTWF4RnJhbWVzOiB7IG1pbjogbnVtYmVyOyBtYXg6IG51bWJlciB9LFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW5cclxuICAgICkge1xyXG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyIHwgVmVjdG9yMyB8IFF1YXRlcm5pb247XHJcbiAgICAgICAgY29uc3QgcXVhdGVybmlvbkNhY2hlOiBRdWF0ZXJuaW9uID0gUXVhdGVybmlvbi5JZGVudGl0eSgpO1xyXG4gICAgICAgIGxldCBwcmV2aW91c1RpbWU6IE51bGxhYmxlPG51bWJlcj4gPSBudWxsO1xyXG4gICAgICAgIGxldCB0aW1lOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IG1heFVzZWRGcmFtZTogTnVsbGFibGU8bnVtYmVyPiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJLZXlGcmFtZTogTnVsbGFibGU8SUFuaW1hdGlvbktleT4gPSBudWxsO1xyXG4gICAgICAgIGxldCBuZXh0S2V5RnJhbWU6IE51bGxhYmxlPElBbmltYXRpb25LZXk+ID0gbnVsbDtcclxuICAgICAgICBsZXQgcHJldktleUZyYW1lOiBOdWxsYWJsZTxJQW5pbWF0aW9uS2V5PiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGVuZEZyYW1lOiBOdWxsYWJsZTxudW1iZXI+ID0gbnVsbDtcclxuICAgICAgICBtaW5NYXhGcmFtZXMubWluID0gVG9vbHMuRmxvYXRSb3VuZChtaW5GcmFtZSAvIGZwcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGtleUZyYW1lcyA9IGFuaW1hdGlvbi5nZXRLZXlzKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBrZXlGcmFtZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgZW5kRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICBjdXJyS2V5RnJhbWUgPSBrZXlGcmFtZXNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaSArIDEgPCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG5leHRLZXlGcmFtZSA9IGtleUZyYW1lc1tpICsgMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoKGN1cnJLZXlGcmFtZS52YWx1ZS5lcXVhbHMgJiYgY3VycktleUZyYW1lLnZhbHVlLmVxdWFscyhuZXh0S2V5RnJhbWUudmFsdWUpKSB8fCBjdXJyS2V5RnJhbWUudmFsdWUgPT09IG5leHRLZXlGcmFtZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgZmlyc3QgZnJhbWUgdG8gaXRzZWxmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZEZyYW1lID0gY3VycktleUZyYW1lLmZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kRnJhbWUgPSBuZXh0S2V5RnJhbWUuZnJhbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhdCB0aGUgbGFzdCBrZXkgZnJhbWVcclxuICAgICAgICAgICAgICAgIHByZXZLZXlGcmFtZSA9IGtleUZyYW1lc1tpIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoKGN1cnJLZXlGcmFtZS52YWx1ZS5lcXVhbHMgJiYgY3VycktleUZyYW1lLnZhbHVlLmVxdWFscyhwcmV2S2V5RnJhbWUudmFsdWUpKSB8fCBjdXJyS2V5RnJhbWUudmFsdWUgPT09IHByZXZLZXlGcmFtZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmRGcmFtZSA9IG1heEZyYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbmRGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZiA9IGN1cnJLZXlGcmFtZS5mcmFtZTsgZiA8PSBlbmRGcmFtZTsgZiArPSBzYW1wbGVSYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZSA9IFRvb2xzLkZsb2F0Um91bmQoZiAvIGZwcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWUgPT09IHByZXZpb3VzVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgICAgICAgICBtYXhVc2VkRnJhbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29wTW9kZTogYW5pbWF0aW9uLmxvb3BNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBhbmltYXRpb24uX2ludGVycG9sYXRlKGYsIHN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX1NldEludGVycG9sYXRlZFZhbHVlKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLCB2YWx1ZSwgdGltZSwgYW5pbWF0aW9uLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgcXVhdGVybmlvbkNhY2hlLCBpbnB1dHMsIG91dHB1dHMsIHVzZVF1YXRlcm5pb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXhVc2VkRnJhbWUpIHtcclxuICAgICAgICAgICAgbWluTWF4RnJhbWVzLm1heCA9IG1heFVzZWRGcmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0NvbnZlcnRGYWN0b3JUb1ZlY3RvcjNPclF1YXRlcm5pb24oXHJcbiAgICAgICAgZmFjdG9yOiBudW1iZXIsXHJcbiAgICAgICAgYmFieWxvblRyYW5zZm9ybU5vZGU6IE5vZGUsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBBbmltYXRpb24sXHJcbiAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGg6IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW5cclxuICAgICk6IFZlY3RvcjMgfCBRdWF0ZXJuaW9uIHtcclxuICAgICAgICBjb25zdCBiYXNlUG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUgPSBfR0xURkFuaW1hdGlvbi5fR2V0QmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgdXNlUXVhdGVybmlvbik7XHJcbiAgICAgICAgLy8gaGFuZGxlcyBzaW5nbGUgY29tcG9uZW50IHgsIHksIHogb3IgdyBjb21wb25lbnQgYW5pbWF0aW9uIGJ5IHVzaW5nIGEgYmFzZSBwcm9wZXJ0eSBhbmQgYW5pbWF0aW5nIG92ZXIgYSBjb21wb25lbnQuXHJcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBhbmltYXRpb24udGFyZ2V0UHJvcGVydHkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudE5hbWUgPSBwcm9wZXJ0eSA/IHByb3BlcnR5WzFdIDogXCJcIjsgLy8geCwgeSwgeiwgb3IgdyBjb21wb25lbnRcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHVzZVF1YXRlcm5pb24gPyBRdWF0ZXJuaW9uLkZyb21BcnJheShiYXNlUG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUpLm5vcm1hbGl6ZSgpIDogVmVjdG9yMy5Gcm9tQXJyYXkoYmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChjb21wb25lbnROYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJ5XCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6XCI6IHtcclxuICAgICAgICAgICAgICAgIHZhbHVlW2NvbXBvbmVudE5hbWVdID0gZmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIndcIjoge1xyXG4gICAgICAgICAgICAgICAgKHZhbHVlIGFzIFF1YXRlcm5pb24pLncgPSBmYWN0b3I7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihgZ2xURkFuaW1hdGlvbjogVW5zdXBwb3J0ZWQgY29tcG9uZW50IG5hbWUgXCIke2NvbXBvbmVudE5hbWV9XCIhYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfU2V0SW50ZXJwb2xhdGVkVmFsdWUoXHJcbiAgICAgICAgYmFieWxvblRyYW5zZm9ybU5vZGU6IE5vZGUsXHJcbiAgICAgICAgdmFsdWU6IG51bWJlciB8IFZlY3RvcjMgfCBRdWF0ZXJuaW9uLFxyXG4gICAgICAgIHRpbWU6IG51bWJlcixcclxuICAgICAgICBhbmltYXRpb246IEFuaW1hdGlvbixcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgcXVhdGVybmlvbkNhY2hlOiBRdWF0ZXJuaW9uLFxyXG4gICAgICAgIGlucHV0czogbnVtYmVyW10sXHJcbiAgICAgICAgb3V0cHV0czogbnVtYmVyW11bXSxcclxuICAgICAgICB1c2VRdWF0ZXJuaW9uOiBib29sZWFuXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgY2FjaGVWYWx1ZTogVmVjdG9yMyB8IFF1YXRlcm5pb24gfCBudW1iZXI7XHJcbiAgICAgICAgaW5wdXRzLnB1c2godGltZSk7XHJcblxyXG4gICAgICAgIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9PT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguV0VJR0hUUykge1xyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2goW3ZhbHVlIGFzIG51bWJlcl0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYW5pbWF0aW9uLmRhdGFUeXBlID09PSBBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX0NvbnZlcnRGYWN0b3JUb1ZlY3RvcjNPclF1YXRlcm5pb24odmFsdWUgYXMgbnVtYmVyLCBiYWJ5bG9uVHJhbnNmb3JtTm9kZSwgYW5pbWF0aW9uLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgdXNlUXVhdGVybmlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPT09IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLlJPVEFUSU9OKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VRdWF0ZXJuaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBxdWF0ZXJuaW9uQ2FjaGUgPSB2YWx1ZSBhcyBRdWF0ZXJuaW9uO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FjaGVWYWx1ZSA9IHZhbHVlIGFzIFZlY3RvcjM7XHJcbiAgICAgICAgICAgICAgICBRdWF0ZXJuaW9uLlJvdGF0aW9uWWF3UGl0Y2hSb2xsVG9SZWYoY2FjaGVWYWx1ZS55LCBjYWNoZVZhbHVlLngsIGNhY2hlVmFsdWUueiwgcXVhdGVybmlvbkNhY2hlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2gocXVhdGVybmlvbkNhY2hlLmFzQXJyYXkoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gc2NhbGluZyBhbmQgcG9zaXRpb24gYW5pbWF0aW9uXHJcbiAgICAgICAgICAgIGNhY2hlVmFsdWUgPSB2YWx1ZSBhcyBWZWN0b3IzO1xyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2goY2FjaGVWYWx1ZS5hc0FycmF5KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgbGluZWFyIGFuaW1hdGlvbiBmcm9tIHRoZSBhbmltYXRpb24ga2V5IGZyYW1lc1xyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlIEJhYnlsb25KUyBtZXNoXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uIEJhYnlsb25KUyBhbmltYXRpb25cclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCBUaGUgdGFyZ2V0IGFuaW1hdGlvbiBjaGFubmVsXHJcbiAgICAgKiBAcGFyYW0gaW5wdXRzIEFycmF5IHRvIHN0b3JlIHRoZSBrZXkgZnJhbWUgdGltZXNcclxuICAgICAqIEBwYXJhbSBvdXRwdXRzIEFycmF5IHRvIHN0b3JlIHRoZSBrZXkgZnJhbWUgZGF0YVxyXG4gICAgICogQHBhcmFtIHVzZVF1YXRlcm5pb24gU3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIGFyZSB1c2VkIGluIHRoZSBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0NyZWF0ZUxpbmVhck9yU3RlcEFuaW1hdGlvbihcclxuICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZTogTm9kZSxcclxuICAgICAgICBhbmltYXRpb246IEFuaW1hdGlvbixcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgaW5wdXRzOiBudW1iZXJbXSxcclxuICAgICAgICBvdXRwdXRzOiBudW1iZXJbXVtdLFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW5cclxuICAgICkge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5RnJhbWUgb2YgYW5pbWF0aW9uLmdldEtleXMoKSkge1xyXG4gICAgICAgICAgICBpbnB1dHMucHVzaChrZXlGcmFtZS5mcmFtZSAvIGFuaW1hdGlvbi5mcmFtZVBlclNlY29uZCk7IC8vIGtleWZyYW1lcyBpbiBzZWNvbmRzLlxyXG4gICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQWRkS2V5ZnJhbWVWYWx1ZShrZXlGcmFtZSwgYW5pbWF0aW9uLCBvdXRwdXRzLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgYmFieWxvblRyYW5zZm9ybU5vZGUsIHVzZVF1YXRlcm5pb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgY3ViaWMgc3BsaW5lIGFuaW1hdGlvbiBmcm9tIHRoZSBhbmltYXRpb24ga2V5IGZyYW1lc1xyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlIEJhYnlsb25KUyBtZXNoXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uIEJhYnlsb25KUyBhbmltYXRpb25cclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCBUaGUgdGFyZ2V0IGFuaW1hdGlvbiBjaGFubmVsXHJcbiAgICAgKiBAcGFyYW0gZnJhbWVEZWx0YSBUaGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBsYXN0IGFuZCBmaXJzdCBmcmFtZSBvZiB0aGUgYW5pbWF0aW9uXHJcbiAgICAgKiBAcGFyYW0gaW5wdXRzIEFycmF5IHRvIHN0b3JlIHRoZSBrZXkgZnJhbWUgdGltZXNcclxuICAgICAqIEBwYXJhbSBvdXRwdXRzIEFycmF5IHRvIHN0b3JlIHRoZSBrZXkgZnJhbWUgZGF0YVxyXG4gICAgICogQHBhcmFtIHVzZVF1YXRlcm5pb24gU3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIGFyZSB1c2VkIGluIHRoZSBhbmltYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0NyZWF0ZUN1YmljU3BsaW5lQW5pbWF0aW9uKFxyXG4gICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBOb2RlLFxyXG4gICAgICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uLFxyXG4gICAgICAgIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoOiBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICBpbnB1dHM6IG51bWJlcltdLFxyXG4gICAgICAgIG91dHB1dHM6IG51bWJlcltdW10sXHJcbiAgICAgICAgdXNlUXVhdGVybmlvbjogYm9vbGVhblxyXG4gICAgKSB7XHJcbiAgICAgICAgYW5pbWF0aW9uLmdldEtleXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXlGcmFtZSkge1xyXG4gICAgICAgICAgICBpbnB1dHMucHVzaChrZXlGcmFtZS5mcmFtZSAvIGFuaW1hdGlvbi5mcmFtZVBlclNlY29uZCk7IC8vIGtleWZyYW1lcyBpbiBzZWNvbmRzLlxyXG4gICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQWRkU3BsaW5lVGFuZ2VudChfVGFuZ2VudFR5cGUuSU5UQU5HRU5ULCBvdXRwdXRzLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkUsIGtleUZyYW1lLCB1c2VRdWF0ZXJuaW9uKTtcclxuICAgICAgICAgICAgX0dMVEZBbmltYXRpb24uX0FkZEtleWZyYW1lVmFsdWUoa2V5RnJhbWUsIGFuaW1hdGlvbiwgb3V0cHV0cywgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLCB1c2VRdWF0ZXJuaW9uKTtcclxuXHJcbiAgICAgICAgICAgIF9HTFRGQW5pbWF0aW9uLl9BZGRTcGxpbmVUYW5nZW50KF9UYW5nZW50VHlwZS5PVVRUQU5HRU5ULCBvdXRwdXRzLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCwgQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkUsIGtleUZyYW1lLCB1c2VRdWF0ZXJuaW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfR2V0QmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlKGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBOb2RlLCBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsIHVzZVF1YXRlcm5pb246IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgYmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlOiBudW1iZXJbXTtcclxuICAgICAgICBpZiAoYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPT09IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLlJPVEFUSU9OKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VRdWF0ZXJuaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBxID0gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGFzIFRyYW5zZm9ybU5vZGUpLnJvdGF0aW9uUXVhdGVybmlvbjtcclxuICAgICAgICAgICAgICAgIGJhc2VQb3NpdGlvblJvdGF0aW9uT3JTY2FsZSA9IChxID8/IFF1YXRlcm5pb24uSWRlbnRpdHkoKSkuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcjogVmVjdG9yMyA9IChiYWJ5bG9uVHJhbnNmb3JtTm9kZSBhcyBUcmFuc2Zvcm1Ob2RlKS5yb3RhdGlvbjtcclxuICAgICAgICAgICAgICAgIGJhc2VQb3NpdGlvblJvdGF0aW9uT3JTY2FsZSA9IChyID8/IFZlY3RvcjMuWmVybygpKS5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoID09PSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5UUkFOU0xBVElPTikge1xyXG4gICAgICAgICAgICBjb25zdCBwOiBWZWN0b3IzID0gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGFzIFRyYW5zZm9ybU5vZGUpLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBiYXNlUG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUgPSAocCA/PyBWZWN0b3IzLlplcm8oKSkuYXNBcnJheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHNjYWxlXHJcbiAgICAgICAgICAgIGNvbnN0IHM6IFZlY3RvcjMgPSAoYmFieWxvblRyYW5zZm9ybU5vZGUgYXMgVHJhbnNmb3JtTm9kZSkuc2NhbGluZztcclxuICAgICAgICAgICAgYmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlID0gKHMgPz8gVmVjdG9yMy5PbmUoKSkuYXNBcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYmFzZVBvc2l0aW9uUm90YXRpb25PclNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGtleSBmcmFtZSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIGtleUZyYW1lXHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uXHJcbiAgICAgKiBAcGFyYW0gb3V0cHV0c1xyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblRyYW5zZm9ybU5vZGVcclxuICAgICAqIEBwYXJhbSB1c2VRdWF0ZXJuaW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9BZGRLZXlmcmFtZVZhbHVlKFxyXG4gICAgICAgIGtleUZyYW1lOiBJQW5pbWF0aW9uS2V5LFxyXG4gICAgICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uLFxyXG4gICAgICAgIG91dHB1dHM6IG51bWJlcltdW10sXHJcbiAgICAgICAgYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGg6IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLFxyXG4gICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBOb2RlLFxyXG4gICAgICAgIHVzZVF1YXRlcm5pb246IGJvb2xlYW5cclxuICAgICkge1xyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvblJvdGF0aW9uT3JTY2FsZTogTnVsbGFibGU8VmVjdG9yMyB8IFF1YXRlcm5pb24gfCBudW1iZXI+O1xyXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvblR5cGUgPSBhbmltYXRpb24uZGF0YVR5cGU7XHJcbiAgICAgICAgaWYgKGFuaW1hdGlvblR5cGUgPT09IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1ZFQ1RPUjMpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0ga2V5RnJhbWUudmFsdWUuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggPT09IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLlJPVEFUSU9OKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJheSA9IFZlY3RvcjMuRnJvbUFycmF5KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdGF0aW9uUXVhdGVybmlvbiA9IFF1YXRlcm5pb24uUm90YXRpb25ZYXdQaXRjaFJvbGwoYXJyYXkueSwgYXJyYXkueCwgYXJyYXkueik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJvdGF0aW9uUXVhdGVybmlvbi5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0cHV0cy5wdXNoKHZhbHVlKTsgLy8gc2NhbGUgIHZlY3Rvci5cclxuICAgICAgICB9IGVsc2UgaWYgKGFuaW1hdGlvblR5cGUgPT09IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FUKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9PT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguV0VJR0hUUykge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0cy5wdXNoKFtrZXlGcmFtZS52YWx1ZV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlcyBzaW5nbGUgY29tcG9uZW50IHgsIHksIHogb3IgdyBjb21wb25lbnQgYW5pbWF0aW9uIGJ5IHVzaW5nIGEgYmFzZSBwcm9wZXJ0eSBhbmQgYW5pbWF0aW5nIG92ZXIgYSBjb21wb25lbnQuXHJcbiAgICAgICAgICAgICAgICBuZXdQb3NpdGlvblJvdGF0aW9uT3JTY2FsZSA9IHRoaXMuX0NvbnZlcnRGYWN0b3JUb1ZlY3RvcjNPclF1YXRlcm5pb24oXHJcbiAgICAgICAgICAgICAgICAgICAga2V5RnJhbWUudmFsdWUgYXMgbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgICAgICAgICAgICAgICAgICB1c2VRdWF0ZXJuaW9uXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uUm90YXRpb25PclNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoID09PSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5ST1RBVElPTikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NSb3RTY2FsZSA9IHVzZVF1YXRlcm5pb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKG5ld1Bvc2l0aW9uUm90YXRpb25PclNjYWxlIGFzIFF1YXRlcm5pb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFF1YXRlcm5pb24uUm90YXRpb25ZYXdQaXRjaFJvbGwobmV3UG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUueSwgbmV3UG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUueCwgbmV3UG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUueikubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dHMucHVzaChwb3NSb3RTY2FsZS5hc0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRzLnB1c2gobmV3UG9zaXRpb25Sb3RhdGlvbk9yU2NhbGUuYXNBcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5pbWF0aW9uVHlwZSA9PT0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfUVVBVEVSTklPTikge1xyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2goKGtleUZyYW1lLnZhbHVlIGFzIFF1YXRlcm5pb24pLm5vcm1hbGl6ZSgpLmFzQXJyYXkoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJnbFRGQW5pbWF0aW9uOiBVbnN1cHBvcnRlZCBrZXkgZnJhbWUgdmFsdWVzIGZvciBhbmltYXRpb24hXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZSB0aGUgaW50ZXJwb2xhdGlvbiBiYXNlZCBvbiB0aGUga2V5IGZyYW1lc1xyXG4gICAgICogQHBhcmFtIGtleUZyYW1lc1xyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoXHJcbiAgICAgKiBAcGFyYW0gdXNlUXVhdGVybmlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRGVkdWNlSW50ZXJwb2xhdGlvbihcclxuICAgICAgICBrZXlGcmFtZXM6IElBbmltYXRpb25LZXlbXSxcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgdXNlUXVhdGVybmlvbjogYm9vbGVhblxyXG4gICAgKTogeyBpbnRlcnBvbGF0aW9uVHlwZTogQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb247IHNob3VsZEJha2VBbmltYXRpb246IGJvb2xlYW4gfSB7XHJcbiAgICAgICAgbGV0IGludGVycG9sYXRpb25UeXBlOiBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbiB8IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgc2hvdWxkQmFrZUFuaW1hdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBrZXk6IElBbmltYXRpb25LZXk7XHJcblxyXG4gICAgICAgIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9PT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguUk9UQVRJT04gJiYgIXVzZVF1YXRlcm5pb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgaW50ZXJwb2xhdGlvblR5cGU6IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLkxJTkVBUiwgc2hvdWxkQmFrZUFuaW1hdGlvbjogdHJ1ZSB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGtleUZyYW1lcy5sZW5ndGg7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBrZXkgPSBrZXlGcmFtZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChrZXkuaW5UYW5nZW50IHx8IGtleS5vdXRUYW5nZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJwb2xhdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW50ZXJwb2xhdGlvblR5cGUgIT09IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLkNVQklDU1BMSU5FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRpb25UeXBlID0gQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uTElORUFSO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRCYWtlQW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnRlcnBvbGF0aW9uVHlwZSA9IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLkNVQklDU1BMSU5FO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGludGVycG9sYXRpb25UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnBvbGF0aW9uVHlwZSA9PT0gQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleS5pbnRlcnBvbGF0aW9uICYmIGtleS5pbnRlcnBvbGF0aW9uID09PSBBbmltYXRpb25LZXlJbnRlcnBvbGF0aW9uLlNURVAgJiYgaW50ZXJwb2xhdGlvblR5cGUgIT09IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLlNURVApXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRpb25UeXBlID0gQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uTElORUFSO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRCYWtlQW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LmludGVycG9sYXRpb24gJiYga2V5LmludGVycG9sYXRpb24gPT09IEFuaW1hdGlvbktleUludGVycG9sYXRpb24uU1RFUCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnBvbGF0aW9uVHlwZSA9IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLlNURVA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJwb2xhdGlvblR5cGUgPSBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW50ZXJwb2xhdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgaW50ZXJwb2xhdGlvblR5cGUgPSBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5MSU5FQVI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBpbnRlcnBvbGF0aW9uVHlwZTogaW50ZXJwb2xhdGlvblR5cGUsIHNob3VsZEJha2VBbmltYXRpb246IHNob3VsZEJha2VBbmltYXRpb24gfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYW4gaW5wdXQgdGFuZ2VudCBvciBvdXRwdXQgdGFuZ2VudCB0byB0aGUgb3V0cHV0IGRhdGFcclxuICAgICAqIElmIGFuIGlucHV0IHRhbmdlbnQgb3Igb3V0cHV0IHRhbmdlbnQgaXMgbWlzc2luZywgaXQgdXNlcyB0aGUgemVybyB2ZWN0b3Igb3IgemVybyBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblRyYW5zZm9ybU5vZGVcclxuICAgICAqIEBwYXJhbSB0YW5nZW50VHlwZSBTcGVjaWZpZXMgd2hpY2ggdHlwZSBvZiB0YW5nZW50IHRvIGhhbmRsZSAoaW5UYW5nZW50IG9yIG91dFRhbmdlbnQpXHJcbiAgICAgKiBAcGFyYW0gb3V0cHV0cyBUaGUgYW5pbWF0aW9uIGRhdGEgYnkga2V5ZnJhbWVcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCBUaGUgdGFyZ2V0IGFuaW1hdGlvbiBjaGFubmVsXHJcbiAgICAgKiBAcGFyYW0gaW50ZXJwb2xhdGlvbiBUaGUgaW50ZXJwb2xhdGlvbiB0eXBlXHJcbiAgICAgKiBAcGFyYW0ga2V5RnJhbWUgVGhlIGtleSBmcmFtZSB3aXRoIHRoZSBhbmltYXRpb24gZGF0YVxyXG4gICAgICogQHBhcmFtIGZyYW1lRGVsdGEgVGltZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIGZyYW1lcyB1c2VkIHRvIHNjYWxlIHRoZSB0YW5nZW50IGJ5IHRoZSBmcmFtZSBkZWx0YVxyXG4gICAgICogQHBhcmFtIHVzZVF1YXRlcm5pb24gU3BlY2lmaWVzIGlmIHF1YXRlcm5pb25zIGFyZSB1c2VkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9BZGRTcGxpbmVUYW5nZW50KFxyXG4gICAgICAgIHRhbmdlbnRUeXBlOiBfVGFuZ2VudFR5cGUsXHJcbiAgICAgICAgb3V0cHV0czogbnVtYmVyW11bXSxcclxuICAgICAgICBhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aDogQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGgsXHJcbiAgICAgICAgaW50ZXJwb2xhdGlvbjogQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24sXHJcbiAgICAgICAga2V5RnJhbWU6IElBbmltYXRpb25LZXksXHJcbiAgICAgICAgdXNlUXVhdGVybmlvbjogYm9vbGVhblxyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IHRhbmdlbnQ6IG51bWJlcltdO1xyXG4gICAgICAgIGNvbnN0IHRhbmdlbnRWYWx1ZTogVmVjdG9yMyB8IFF1YXRlcm5pb24gfCBudW1iZXIgPSB0YW5nZW50VHlwZSA9PT0gX1RhbmdlbnRUeXBlLklOVEFOR0VOVCA/IGtleUZyYW1lLmluVGFuZ2VudCA6IGtleUZyYW1lLm91dFRhbmdlbnQ7XHJcbiAgICAgICAgaWYgKGludGVycG9sYXRpb24gPT09IEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLkNVQklDU1BMSU5FKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9PT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguUk9UQVRJT04pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YW5nZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlUXVhdGVybmlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YW5nZW50ID0gKHRhbmdlbnRWYWx1ZSBhcyBRdWF0ZXJuaW9uKS5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXkgPSB0YW5nZW50VmFsdWUgYXMgVmVjdG9yMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFuZ2VudCA9IFF1YXRlcm5pb24uUm90YXRpb25ZYXdQaXRjaFJvbGwoYXJyYXkueSwgYXJyYXkueCwgYXJyYXkueikuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFuZ2VudCA9IFswLCAwLCAwLCAwXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCA9PT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguV0VJR0hUUykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhbmdlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbmdlbnQgPSBbdGFuZ2VudFZhbHVlIGFzIG51bWJlcl07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbmdlbnQgPSBbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFuZ2VudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFuZ2VudCA9ICh0YW5nZW50VmFsdWUgYXMgVmVjdG9yMykuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0YW5nZW50ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvdXRwdXRzLnB1c2godGFuZ2VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIGtleSBmcmFtZXMnIGZyYW1lIHZhbHVlc1xyXG4gICAgICogQHBhcmFtIGtleUZyYW1lcyBhbmltYXRpb24ga2V5IGZyYW1lc1xyXG4gICAgICogQHJldHVybnMgdGhlIG1pbmltdW0gYW5kIG1heGltdW0ga2V5IGZyYW1lIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9DYWxjdWxhdGVNaW5NYXhLZXlGcmFtZXMoa2V5RnJhbWVzOiBJQW5pbWF0aW9uS2V5W10pOiB7IG1pbjogbnVtYmVyOyBtYXg6IG51bWJlciB9IHtcclxuICAgICAgICBsZXQgbWluOiBudW1iZXIgPSBJbmZpbml0eTtcclxuICAgICAgICBsZXQgbWF4OiBudW1iZXIgPSAtSW5maW5pdHk7XHJcbiAgICAgICAga2V5RnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGtleUZyYW1lKSB7XHJcbiAgICAgICAgICAgIG1pbiA9IE1hdGgubWluKG1pbiwga2V5RnJhbWUuZnJhbWUpO1xyXG4gICAgICAgICAgICBtYXggPSBNYXRoLm1heChtYXgsIGtleUZyYW1lLmZyYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgbWluOiBtaW4sIG1heDogbWF4IH07XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW1hZ2VNaW1lVHlwZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBmb3IgaG9sZGluZyBhbmQgZG93bmxvYWRpbmcgZ2xURiBmaWxlIGRhdGFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHTFRGRGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIE9iamVjdCB3aGljaCBjb250YWlucyB0aGUgZmlsZSBuYW1lIGFzIHRoZSBrZXkgYW5kIGl0cyBkYXRhIGFzIHRoZSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBnbFRGRmlsZXM6IHsgW2ZpbGVOYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBCbG9iIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgZ2xURiBmaWxlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5nbFRGRmlsZXMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERvd25sb2FkcyB0aGUgZ2xURiBkYXRhIGFzIGZpbGVzIGJhc2VkIG9uIHRoZWlyIG5hbWVzIGFuZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3dubG9hZEZpbGVzKCk6IHZvaWQge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrcyBmb3IgYSBtYXRjaGluZyBzdWZmaXggYXQgdGhlIGVuZCBvZiBhIHN0cmluZyAoZm9yIEVTNSBhbmQgbG93ZXIpXHJcbiAgICAgICAgICogQHBhcmFtIHN0ciBTb3VyY2Ugc3RyaW5nXHJcbiAgICAgICAgICogQHBhcmFtIHN1ZmZpeCBTdWZmaXggdG8gc2VhcmNoIGZvciBpbiB0aGUgc291cmNlIHN0cmluZ1xyXG4gICAgICAgICAqIEByZXR1cm5zIEJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBzdWZmaXggd2FzIGZvdW5kICh0cnVlKSBvciBub3QgKGZhbHNlKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGVuZHNXaXRoKHN0cjogc3RyaW5nLCBzdWZmaXg6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3VmZml4LCBzdHIubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgIT09IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5nbFRGRmlsZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xyXG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIGxpbmsuZG93bmxvYWQgPSBrZXk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsb2IgPSB0aGlzLmdsVEZGaWxlc1trZXldO1xyXG4gICAgICAgICAgICBsZXQgbWltZVR5cGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5kc1dpdGgoa2V5LCBcIi5nbGJcIikpIHtcclxuICAgICAgICAgICAgICAgIG1pbWVUeXBlID0geyB0eXBlOiBcIm1vZGVsL2dsdGYtYmluYXJ5XCIgfTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbmRzV2l0aChrZXksIFwiLmJpblwiKSkge1xyXG4gICAgICAgICAgICAgICAgbWltZVR5cGUgPSB7IHR5cGU6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbmRzV2l0aChrZXksIFwiLmdsdGZcIikpIHtcclxuICAgICAgICAgICAgICAgIG1pbWVUeXBlID0geyB0eXBlOiBcIm1vZGVsL2dsdGYranNvblwiIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kc1dpdGgoa2V5LCBcIi5qcGVnXCIpIHx8IGVuZHNXaXRoKGtleSwgXCIuanBnXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBtaW1lVHlwZSA9IHsgdHlwZTogSW1hZ2VNaW1lVHlwZS5KUEVHIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kc1dpdGgoa2V5LCBcIi5wbmdcIikpIHtcclxuICAgICAgICAgICAgICAgIG1pbWVUeXBlID0geyB0eXBlOiBJbWFnZU1pbWVUeXBlLlBORyB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYmxvYl0sIG1pbWVUeXBlKSk7XHJcbiAgICAgICAgICAgIGxpbmsuY2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUge1xyXG4gICAgSUJ1ZmZlclZpZXcsXHJcbiAgICBJQWNjZXNzb3IsXHJcbiAgICBJTm9kZSxcclxuICAgIElTY2VuZSxcclxuICAgIElNZXNoLFxyXG4gICAgSU1hdGVyaWFsLFxyXG4gICAgSVRleHR1cmUsXHJcbiAgICBJSW1hZ2UsXHJcbiAgICBJU2FtcGxlcixcclxuICAgIElBbmltYXRpb24sXHJcbiAgICBJTWVzaFByaW1pdGl2ZSxcclxuICAgIElCdWZmZXIsXHJcbiAgICBJR0xURixcclxuICAgIElUZXh0dXJlSW5mbyxcclxuICAgIElTa2luLFxyXG4gICAgSUNhbWVyYSxcclxufSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEFjY2Vzc29yVHlwZSwgSW1hZ2VNaW1lVHlwZSwgTWVzaFByaW1pdGl2ZU1vZGUsIEFjY2Vzc29yQ29tcG9uZW50VHlwZSwgQ2FtZXJhVHlwZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgRmxvYXRBcnJheSwgSW5kaWNlc0FycmF5LCBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IE1hdHJpeCwgVG1wVmVjdG9ycyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IFZlY3RvcjIsIFZlY3RvcjMsIFZlY3RvcjQsIFF1YXRlcm5pb24gfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBDb2xvcjMsIENvbG9yNCB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB7IFZlcnRleEJ1ZmZlciB9IGZyb20gXCJjb3JlL0J1ZmZlcnMvYnVmZmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTm9kZSB9IGZyb20gXCJjb3JlL25vZGVcIjtcclxuaW1wb3J0IHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gXCJjb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlXCI7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IFN1Yk1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvc3ViTWVzaFwiO1xyXG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuaW1wb3J0IHR5cGUgeyBNb3JwaFRhcmdldCB9IGZyb20gXCJjb3JlL01vcnBoL21vcnBoVGFyZ2V0XCI7XHJcbmltcG9ydCB7IExpbmVzTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9saW5lc01lc2hcIjtcclxuaW1wb3J0IHsgSW5zdGFuY2VkTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9pbnN0YW5jZWRNZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgQm9uZSB9IGZyb20gXCJjb3JlL0JvbmVzL2JvbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBFbmdpbmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL2VuZ2luZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gZnJvbSBcIi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IF9HTFRGTWF0ZXJpYWxFeHBvcnRlciB9IGZyb20gXCIuL2dsVEZNYXRlcmlhbEV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgSUV4cG9ydE9wdGlvbnMgfSBmcm9tIFwiLi9nbFRGU2VyaWFsaXplclwiO1xyXG5pbXBvcnQgeyBfR0xURlV0aWxpdGllcyB9IGZyb20gXCIuL2dsVEZVdGlsaXRpZXNcIjtcclxuaW1wb3J0IHsgR0xURkRhdGEgfSBmcm9tIFwiLi9nbFRGRGF0YVwiO1xyXG5pbXBvcnQgeyBfR0xURkFuaW1hdGlvbiB9IGZyb20gXCIuL2dsVEZBbmltYXRpb25cIjtcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcImNvcmUvQ2FtZXJhcy9jYW1lcmFcIjtcclxuaW1wb3J0IHsgRW5naW5lU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL2VuZ2luZVN0b3JlXCI7XHJcbmltcG9ydCB7IE11bHRpTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbXVsdGlNYXRlcmlhbFwiO1xyXG5cclxuLy8gTWF0cml4IHRoYXQgY29udmVydHMgaGFuZGVkbmVzcyBvbiB0aGUgWC1heGlzLlxyXG5jb25zdCBjb252ZXJ0SGFuZGVkbmVzc01hdHJpeCA9IE1hdHJpeC5Db21wb3NlKG5ldyBWZWN0b3IzKC0xLCAxLCAxKSwgUXVhdGVybmlvbi5JZGVudGl0eSgpLCBWZWN0b3IzLlplcm8oKSk7XHJcblxyXG5mdW5jdGlvbiBpc05vb3BOb2RlKG5vZGU6IE5vZGUsIHVzZVJpZ2h0SGFuZGVkU3lzdGVtOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgVHJhbnNmb3JtTm9kZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVHJhbnNmb3JtXHJcbiAgICBpZiAodXNlUmlnaHRIYW5kZWRTeXN0ZW0pIHtcclxuICAgICAgICBjb25zdCBtYXRyaXggPSBub2RlLmdldFdvcmxkTWF0cml4KCk7XHJcbiAgICAgICAgaWYgKCFtYXRyaXguaXNJZGVudGl0eSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1hdHJpeCA9IG5vZGUuZ2V0V29ybGRNYXRyaXgoKS5tdWx0aXBseVRvUmVmKGNvbnZlcnRIYW5kZWRuZXNzTWF0cml4LCBUbXBWZWN0b3JzLk1hdHJpeFswXSk7XHJcbiAgICAgICAgaWYgKCFtYXRyaXguaXNJZGVudGl0eSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2VvbWV0cnlcclxuICAgIGlmICgobm9kZSBpbnN0YW5jZW9mIE1lc2ggJiYgbm9kZS5nZW9tZXRyeSkgfHwgKG5vZGUgaW5zdGFuY2VvZiBJbnN0YW5jZWRNZXNoICYmIG5vZGUuc291cmNlTWVzaC5nZW9tZXRyeSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnZlcnROb2RlSGFuZGVkbmVzcyhub2RlOiBJTm9kZSk6IHZvaWQge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSBWZWN0b3IzLkZyb21BcnJheVRvUmVmKG5vZGUudHJhbnNsYXRpb24gfHwgWzAsIDAsIDBdLCAwLCBUbXBWZWN0b3JzLlZlY3RvcjNbMF0pO1xyXG4gICAgY29uc3Qgcm90YXRpb24gPSBRdWF0ZXJuaW9uLkZyb21BcnJheVRvUmVmKG5vZGUucm90YXRpb24gfHwgWzAsIDAsIDAsIDFdLCAwLCBUbXBWZWN0b3JzLlF1YXRlcm5pb25bMF0pO1xyXG4gICAgY29uc3Qgc2NhbGUgPSBWZWN0b3IzLkZyb21BcnJheVRvUmVmKG5vZGUuc2NhbGUgfHwgWzEsIDEsIDFdLCAwLCBUbXBWZWN0b3JzLlZlY3RvcjNbMV0pO1xyXG4gICAgY29uc3QgbWF0cml4ID0gTWF0cml4LkNvbXBvc2VUb1JlZihzY2FsZSwgcm90YXRpb24sIHRyYW5zbGF0aW9uLCBUbXBWZWN0b3JzLk1hdHJpeFswXSkubXVsdGlwbHlUb1JlZihjb252ZXJ0SGFuZGVkbmVzc01hdHJpeCwgVG1wVmVjdG9ycy5NYXRyaXhbMF0pO1xyXG5cclxuICAgIG1hdHJpeC5kZWNvbXBvc2Uoc2NhbGUsIHJvdGF0aW9uLCB0cmFuc2xhdGlvbik7XHJcblxyXG4gICAgaWYgKHRyYW5zbGF0aW9uLmVxdWFsc1RvRmxvYXRzKDAsIDAsIDApKSB7XHJcbiAgICAgICAgZGVsZXRlIG5vZGUudHJhbnNsYXRpb247XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vZGUudHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbi5hc0FycmF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFF1YXRlcm5pb24uSXNJZGVudGl0eShyb3RhdGlvbikpIHtcclxuICAgICAgICBkZWxldGUgbm9kZS5yb3RhdGlvbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZS5yb3RhdGlvbiA9IHJvdGF0aW9uLmFzQXJyYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2NhbGUuZXF1YWxzVG9GbG9hdHMoMSwgMSwgMSkpIHtcclxuICAgICAgICBkZWxldGUgbm9kZS5zY2FsZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9kZS5zY2FsZSA9IHNjYWxlLmFzQXJyYXkoKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgaW50ZXJmYWNlIGZvciBzdG9yaW5nIHZlcnRleCBhdHRyaWJ1dGUgZGF0YVxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuaW50ZXJmYWNlIF9JVmVydGV4QXR0cmlidXRlRGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmllcyB0aGUgQmFieWxvbiBWZXJ0ZXggQnVmZmVyIFR5cGUgKFBvc2l0aW9uLCBOb3JtYWwsIENvbG9yLCBldGMuKVxyXG4gICAgICovXHJcbiAgICBraW5kOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGdsVEYgQWNjZXNzb3IgVHlwZSAoVkVDMiwgVkVDMywgZXRjLilcclxuICAgICAqL1xyXG4gICAgYWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGdsVEYgQWNjZXNzb3IgQ29tcG9uZW50IFR5cGUgKEJZVEUsIFVOU0lHTkVEX0JZVEUsIEZMT0FULCBTSE9SVCwgSU5ULCBldGMuLilcclxuICAgICAqL1xyXG4gICAgYWNjZXNzb3JDb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZpZXMgdGhlIEJ1ZmZlclZpZXcgaW5kZXggZm9yIHRoZSB2ZXJ0ZXggYXR0cmlidXRlIGRhdGFcclxuICAgICAqL1xyXG4gICAgYnVmZmVyVmlld0luZGV4PzogbnVtYmVyO1xyXG5cclxuICAgIGJ5dGVTdHJpZGU/OiBudW1iZXI7XHJcbn1cclxuLyoqXHJcbiAqIENvbnZlcnRzIEJhYnlsb24gU2NlbmUgaW50byBnbFRGIDIuMC5cclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgX0V4cG9ydGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIHRoZSBnbFRGIHRvIGV4cG9ydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2dsVEY6IElHTFRGO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYWxsIGdlbmVyYXRlZCBidWZmZXIgdmlld3MsIHdoaWNoIHJlcHJlc2VudHMgdmlld3MgaW50byB0aGUgbWFpbiBnbFRGIGJ1ZmZlciBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfYnVmZmVyVmlld3M6IElCdWZmZXJWaWV3W107XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbGwgdGhlIGdlbmVyYXRlZCBhY2Nlc3NvcnMsIHdoaWNoIGlzIHVzZWQgZm9yIGFjY2Vzc2luZyB0aGUgZGF0YSB3aXRoaW4gdGhlIGJ1ZmZlciB2aWV3cyBpbiBnbFRGXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfYWNjZXNzb3JzOiBJQWNjZXNzb3JbXTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgZ2VuZXJhdGVkIG5vZGVzLCB3aGljaCBjb250YWlucyB0cmFuc2Zvcm0gYW5kL29yIG1lc2ggaW5mb3JtYXRpb24gcGVyIG5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9ub2RlczogSU5vZGVbXTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgZ2VuZXJhdGVkIGdsVEYgc2NlbmVzLCB3aGljaCBzdG9yZXMgbXVsdGlwbGUgbm9kZSBoaWVyYXJjaGllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zY2VuZXM6IElTY2VuZVtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYWxsIHRoZSBnZW5lcmF0ZWQgZ2xURiBjYW1lcmFzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NhbWVyYXM6IElDYW1lcmFbXTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgZ2VuZXJhdGVkIG1lc2ggaW5mb3JtYXRpb24sIGVhY2ggY29udGFpbmluZyBhIHNldCBvZiBwcmltaXRpdmVzIHRvIHJlbmRlciBpbiBnbFRGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX21lc2hlczogSU1lc2hbXTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgZ2VuZXJhdGVkIG1hdGVyaWFsIGluZm9ybWF0aW9uLCB3aGljaCByZXByZXNlbnRzIHRoZSBhcHBlYXJhbmNlIG9mIGVhY2ggcHJpbWl0aXZlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbWF0ZXJpYWxzOiBJTWF0ZXJpYWxbXTtcclxuXHJcbiAgICBwdWJsaWMgX21hdGVyaWFsTWFwOiB7IFttYXRlcmlhbElEOiBudW1iZXJdOiBudW1iZXIgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgZ2VuZXJhdGVkIHRleHR1cmUgaW5mb3JtYXRpb24sIHdoaWNoIGlzIHJlZmVyZW5jZWQgYnkgZ2xURiBtYXRlcmlhbHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIF90ZXh0dXJlczogSVRleHR1cmVbXTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgZ2VuZXJhdGVkIGltYWdlIGluZm9ybWF0aW9uLCB3aGljaCBpcyByZWZlcmVuY2VkIGJ5IGdsVEYgdGV4dHVyZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9pbWFnZXM6IElJbWFnZVtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFsbCB0aGUgdGV4dHVyZSBzYW1wbGVyc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX3NhbXBsZXJzOiBJU2FtcGxlcltdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYWxsIHRoZSBnZW5lcmF0ZWQgZ2xURiBza2luc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX3NraW5zOiBJU2tpbltdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYWxsIHRoZSBnZW5lcmF0ZWQgYW5pbWF0aW9uIHNhbXBsZXJzLCB3aGljaCBpcyByZWZlcmVuY2VkIGJ5IGdsVEYgYW5pbWF0aW9uc1xyXG4gICAgICovXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyB0aGUgYW5pbWF0aW9ucyBmb3IgZ2xURiBtb2RlbHNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uczogSUFuaW1hdGlvbltdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgdGhlIHRvdGFsIGFtb3VudCBvZiBieXRlcyBzdG9yZWQgaW4gdGhlIGdsVEYgYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3RvdGFsQnl0ZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYSByZWZlcmVuY2UgdG8gdGhlIEJhYnlsb24gc2NlbmUgY29udGFpbmluZyB0aGUgc291cmNlIGdlb21ldHJ5IGFuZCBtYXRlcmlhbCBpbmZvcm1hdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2JhYnlsb25TY2VuZTogU2NlbmU7XHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhIG1hcCBvZiB0aGUgaW1hZ2UgZGF0YSwgd2hlcmUgdGhlIGtleSBpcyB0aGUgZmlsZSBuYW1lIGFuZCB0aGUgdmFsdWVcclxuICAgICAqIGlzIHRoZSBpbWFnZSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfaW1hZ2VEYXRhOiB7IFtmaWxlTmFtZTogc3RyaW5nXTogeyBkYXRhOiBBcnJheUJ1ZmZlcjsgbWltZVR5cGU6IEltYWdlTWltZVR5cGUgfSB9O1xyXG5cclxuICAgIHByaXZhdGUgX29yZGVyZWRJbWFnZURhdGE6IEFycmF5PHsgZGF0YTogQXJyYXlCdWZmZXI7IG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlIH0+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGEgbWFwIG9mIHRoZSB1bmlxdWUgaWQgb2YgYSBub2RlIHRvIGl0cyBpbmRleCBpbiB0aGUgbm9kZSBhcnJheVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9ub2RlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmFrZWQgYW5pbWF0aW9uIHNhbXBsZSByYXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2FuaW1hdGlvblNhbXBsZVJhdGU6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBJRXhwb3J0T3B0aW9ucztcclxuXHJcbiAgICBwcml2YXRlIF9sb2NhbEVuZ2luZTogRW5naW5lO1xyXG5cclxuICAgIHB1YmxpYyBfZ2xURk1hdGVyaWFsRXhwb3J0ZXI6IF9HTFRGTWF0ZXJpYWxFeHBvcnRlcjtcclxuXHJcbiAgICBwcml2YXRlIF9leHRlbnNpb25zOiB7IFtuYW1lOiBzdHJpbmddOiBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9FeHRlbnNpb25OYW1lcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRXh0ZW5zaW9uRmFjdG9yaWVzOiB7IFtuYW1lOiBzdHJpbmddOiAoZXhwb3J0ZXI6IF9FeHBvcnRlcikgPT4gSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIH0gPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIF9hcHBseUV4dGVuc2lvbjxUPihcclxuICAgICAgICBub2RlOiBOdWxsYWJsZTxUPixcclxuICAgICAgICBleHRlbnNpb25zOiBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjJbXSxcclxuICAgICAgICBpbmRleDogbnVtYmVyLFxyXG4gICAgICAgIGFjdGlvbkFzeW5jOiAoZXh0ZW5zaW9uOiBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIsIG5vZGU6IE51bGxhYmxlPFQ+KSA9PiBQcm9taXNlPE51bGxhYmxlPFQ+PiB8IHVuZGVmaW5lZFxyXG4gICAgKTogUHJvbWlzZTxOdWxsYWJsZTxUPj4ge1xyXG4gICAgICAgIGlmIChpbmRleCA+PSBleHRlbnNpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudFByb21pc2UgPSBhY3Rpb25Bc3luYyhleHRlbnNpb25zW2luZGV4XSwgbm9kZSk7XHJcblxyXG4gICAgICAgIGlmICghY3VycmVudFByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5RXh0ZW5zaW9uKG5vZGUsIGV4dGVuc2lvbnMsIGluZGV4ICsgMSwgYWN0aW9uQXN5bmMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9taXNlLnRoZW4oKG5ld05vZGUpID0+IHRoaXMuX2FwcGx5RXh0ZW5zaW9uKG5ld05vZGUsIGV4dGVuc2lvbnMsIGluZGV4ICsgMSwgYWN0aW9uQXN5bmMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hcHBseUV4dGVuc2lvbnM8VD4oXHJcbiAgICAgICAgbm9kZTogTnVsbGFibGU8VD4sXHJcbiAgICAgICAgYWN0aW9uQXN5bmM6IChleHRlbnNpb246IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiwgbm9kZTogTnVsbGFibGU8VD4pID0+IFByb21pc2U8TnVsbGFibGU8VD4+IHwgdW5kZWZpbmVkXHJcbiAgICApOiBQcm9taXNlPE51bGxhYmxlPFQ+PiB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uczogSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyW10gPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgX0V4cG9ydGVyLl9FeHRlbnNpb25OYW1lcykge1xyXG4gICAgICAgICAgICBleHRlbnNpb25zLnB1c2godGhpcy5fZXh0ZW5zaW9uc1tuYW1lXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb24obm9kZSwgZXh0ZW5zaW9ucywgMCwgYWN0aW9uQXN5bmMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfZXh0ZW5zaW9uc1ByZUV4cG9ydFRleHR1cmVBc3luYyhjb250ZXh0OiBzdHJpbmcsIGJhYnlsb25UZXh0dXJlOiBOdWxsYWJsZTxUZXh0dXJlPiwgbWltZVR5cGU6IEltYWdlTWltZVR5cGUpOiBQcm9taXNlPE51bGxhYmxlPEJhc2VUZXh0dXJlPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBseUV4dGVuc2lvbnMoYmFieWxvblRleHR1cmUsIChleHRlbnNpb24sIG5vZGUpID0+IGV4dGVuc2lvbi5wcmVFeHBvcnRUZXh0dXJlQXN5bmMgJiYgZXh0ZW5zaW9uLnByZUV4cG9ydFRleHR1cmVBc3luYyhjb250ZXh0LCBub2RlLCBtaW1lVHlwZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfZXh0ZW5zaW9uc1Bvc3RFeHBvcnRNZXNoUHJpbWl0aXZlQXN5bmMoXHJcbiAgICAgICAgY29udGV4dDogc3RyaW5nLFxyXG4gICAgICAgIG1lc2hQcmltaXRpdmU6IElNZXNoUHJpbWl0aXZlLFxyXG4gICAgICAgIGJhYnlsb25TdWJNZXNoOiBTdWJNZXNoLFxyXG4gICAgICAgIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlclxyXG4gICAgKTogUHJvbWlzZTxOdWxsYWJsZTxJTWVzaFByaW1pdGl2ZT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKFxyXG4gICAgICAgICAgICBtZXNoUHJpbWl0aXZlLFxyXG4gICAgICAgICAgICAoZXh0ZW5zaW9uLCBub2RlKSA9PiBleHRlbnNpb24ucG9zdEV4cG9ydE1lc2hQcmltaXRpdmVBc3luYyAmJiBleHRlbnNpb24ucG9zdEV4cG9ydE1lc2hQcmltaXRpdmVBc3luYyhjb250ZXh0LCBub2RlLCBiYWJ5bG9uU3ViTWVzaCwgYmluYXJ5V3JpdGVyKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIF9leHRlbnNpb25zUG9zdEV4cG9ydE5vZGVBc3luYyhcclxuICAgICAgICBjb250ZXh0OiBzdHJpbmcsXHJcbiAgICAgICAgbm9kZTogTnVsbGFibGU8SU5vZGU+LFxyXG4gICAgICAgIGJhYnlsb25Ob2RlOiBOb2RlLFxyXG4gICAgICAgIG5vZGVNYXA6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0sXHJcbiAgICAgICAgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyXHJcbiAgICApOiBQcm9taXNlPE51bGxhYmxlPElOb2RlPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBseUV4dGVuc2lvbnMobm9kZSwgKGV4dGVuc2lvbiwgbm9kZSkgPT4gZXh0ZW5zaW9uLnBvc3RFeHBvcnROb2RlQXN5bmMgJiYgZXh0ZW5zaW9uLnBvc3RFeHBvcnROb2RlQXN5bmMoY29udGV4dCwgbm9kZSwgYmFieWxvbk5vZGUsIG5vZGVNYXAsIGJpbmFyeVdyaXRlcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfZXh0ZW5zaW9uc1Bvc3RFeHBvcnRNYXRlcmlhbEFzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IE51bGxhYmxlPElNYXRlcmlhbD4sIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPE51bGxhYmxlPElNYXRlcmlhbD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKG1hdGVyaWFsLCAoZXh0ZW5zaW9uLCBub2RlKSA9PiBleHRlbnNpb24ucG9zdEV4cG9ydE1hdGVyaWFsQXN5bmMgJiYgZXh0ZW5zaW9uLnBvc3RFeHBvcnRNYXRlcmlhbEFzeW5jKGNvbnRleHQsIG5vZGUsIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfZXh0ZW5zaW9uc1Bvc3RFeHBvcnRNYXRlcmlhbEFkZGl0aW9uYWxUZXh0dXJlcyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBCYXNlVGV4dHVyZVtdIHtcclxuICAgICAgICBjb25zdCBvdXRwdXQ6IEJhc2VUZXh0dXJlW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIF9FeHBvcnRlci5fRXh0ZW5zaW9uTmFtZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5fZXh0ZW5zaW9uc1tuYW1lXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChleHRlbnNpb24ucG9zdEV4cG9ydE1hdGVyaWFsQWRkaXRpb25hbFRleHR1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCguLi5leHRlbnNpb24ucG9zdEV4cG9ydE1hdGVyaWFsQWRkaXRpb25hbFRleHR1cmVzKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX2V4dGVuc2lvbnNQb3N0RXhwb3J0VGV4dHVyZXMoY29udGV4dDogc3RyaW5nLCB0ZXh0dXJlSW5mbzogSVRleHR1cmVJbmZvLCBiYWJ5bG9uVGV4dHVyZTogQmFzZVRleHR1cmUpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgX0V4cG9ydGVyLl9FeHRlbnNpb25OYW1lcykge1xyXG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9leHRlbnNpb25zW25hbWVdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbi5wb3N0RXhwb3J0VGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uLnBvc3RFeHBvcnRUZXh0dXJlKGNvbnRleHQsIHRleHR1cmVJbmZvLCBiYWJ5bG9uVGV4dHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9yRWFjaEV4dGVuc2lvbnMoYWN0aW9uOiAoZXh0ZW5zaW9uOiBJR0xURkV4cG9ydGVyRXh0ZW5zaW9uVjIpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgX0V4cG9ydGVyLl9FeHRlbnNpb25OYW1lcykge1xyXG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLl9leHRlbnNpb25zW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9uLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihleHRlbnNpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNPbkV4cG9ydGluZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9mb3JFYWNoRXh0ZW5zaW9ucygoZXh0ZW5zaW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChleHRlbnNpb24ud2FzVXNlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dsVEYuZXh0ZW5zaW9uc1VzZWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dsVEYuZXh0ZW5zaW9uc1VzZWQgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2xURi5leHRlbnNpb25zVXNlZC5pbmRleE9mKGV4dGVuc2lvbi5uYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbFRGLmV4dGVuc2lvbnNVc2VkLnB1c2goZXh0ZW5zaW9uLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb24ucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2xURi5leHRlbnNpb25zUmVxdWlyZWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbFRGLmV4dGVuc2lvbnNSZXF1aXJlZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2xURi5leHRlbnNpb25zUmVxdWlyZWQuaW5kZXhPZihleHRlbnNpb24ubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dsVEYuZXh0ZW5zaW9uc1JlcXVpcmVkLnB1c2goZXh0ZW5zaW9uLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2xURi5leHRlbnNpb25zID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbFRGLmV4dGVuc2lvbnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9uLm9uRXhwb3J0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uLm9uRXhwb3J0aW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgZ2xURiBzZXJpYWxpemVyIGV4dGVuc2lvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfbG9hZEV4dGVuc2lvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIF9FeHBvcnRlci5fRXh0ZW5zaW9uTmFtZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gX0V4cG9ydGVyLl9FeHRlbnNpb25GYWN0b3JpZXNbbmFtZV0odGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbnNbbmFtZV0gPSBleHRlbnNpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGdsVEYgRXhwb3J0ZXIgaW5zdGFuY2UsIHdoaWNoIGNhbiBhY2NlcHQgb3B0aW9uYWwgZXhwb3J0ZXIgb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIGJhYnlsb25TY2VuZSBCYWJ5bG9uIHNjZW5lIG9iamVjdFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyB0byBtb2RpZnkgdGhlIGJlaGF2aW9yIG9mIHRoZSBleHBvcnRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYmFieWxvblNjZW5lPzogTnVsbGFibGU8U2NlbmU+LCBvcHRpb25zPzogSUV4cG9ydE9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9nbFRGID0ge1xyXG4gICAgICAgICAgICBhc3NldDogeyBnZW5lcmF0b3I6IGBCYWJ5bG9uLmpzIHYke0VuZ2luZS5WZXJzaW9ufWAsIHZlcnNpb246IFwiMi4wXCIgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJhYnlsb25TY2VuZSA9IGJhYnlsb25TY2VuZSB8fCBFbmdpbmVTdG9yZS5MYXN0Q3JlYXRlZFNjZW5lO1xyXG4gICAgICAgIGlmICghYmFieWxvblNjZW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lID0gYmFieWxvblNjZW5lO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlclZpZXdzID0gW107XHJcbiAgICAgICAgdGhpcy5fYWNjZXNzb3JzID0gW107XHJcbiAgICAgICAgdGhpcy5fbWVzaGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fc2NlbmVzID0gW107XHJcbiAgICAgICAgdGhpcy5fY2FtZXJhcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX25vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW107XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxzID0gW107XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxNYXAgPSBbXTtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NhbXBsZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5fc2tpbnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5faW1hZ2VEYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5fb3JkZXJlZEltYWdlRGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblNhbXBsZVJhdGUgPSB0aGlzLl9vcHRpb25zLmFuaW1hdGlvblNhbXBsZVJhdGUgfHwgMSAvIDYwO1xyXG5cclxuICAgICAgICB0aGlzLl9nbFRGTWF0ZXJpYWxFeHBvcnRlciA9IG5ldyBfR0xURk1hdGVyaWFsRXhwb3J0ZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fbG9hZEV4dGVuc2lvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGV4dGVuc2lvbktleSBpbiB0aGlzLl9leHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuX2V4dGVuc2lvbnNbZXh0ZW5zaW9uS2V5XTtcclxuXHJcbiAgICAgICAgICAgIGV4dGVuc2lvbi5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb3B0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyBhIGdsVEYgZXhwb3J0ZXIgZXh0ZW5zaW9uXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBleHRlbnNpb24gdG8gZXhwb3J0XHJcbiAgICAgKiBAcGFyYW0gZmFjdG9yeSBUaGUgZmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgdGhlIGV4cG9ydGVyIGV4dGVuc2lvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFJlZ2lzdGVyRXh0ZW5zaW9uKG5hbWU6IHN0cmluZywgZmFjdG9yeTogKGV4cG9ydGVyOiBfRXhwb3J0ZXIpID0+IElHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMik6IHZvaWQge1xyXG4gICAgICAgIGlmIChfRXhwb3J0ZXIuVW5yZWdpc3RlckV4dGVuc2lvbihuYW1lKSkge1xyXG4gICAgICAgICAgICBUb29scy5XYXJuKGBFeHRlbnNpb24gd2l0aCB0aGUgbmFtZSAke25hbWV9IGFscmVhZHkgZXhpc3RzYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfRXhwb3J0ZXIuX0V4dGVuc2lvbkZhY3Rvcmllc1tuYW1lXSA9IGZhY3Rvcnk7XHJcbiAgICAgICAgX0V4cG9ydGVyLl9FeHRlbnNpb25OYW1lcy5wdXNoKG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW4tcmVnaXN0ZXJzIGFuIGV4cG9ydGVyIGV4dGVuc2lvblxyXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgZm8gdGhlIGV4cG9ydGVyIGV4dGVuc2lvblxyXG4gICAgICogQHJldHVybnMgQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZXh0ZW5zaW9uIGhhcyBiZWVuIHVuLXJlZ2lzdGVyZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVbnJlZ2lzdGVyRXh0ZW5zaW9uKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghX0V4cG9ydGVyLl9FeHRlbnNpb25GYWN0b3JpZXNbbmFtZV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgX0V4cG9ydGVyLl9FeHRlbnNpb25GYWN0b3JpZXNbbmFtZV07XHJcblxyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gX0V4cG9ydGVyLl9FeHRlbnNpb25OYW1lcy5pbmRleE9mKG5hbWUpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgX0V4cG9ydGVyLl9FeHRlbnNpb25OYW1lcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVvcmRlckluZGljZXNCYXNlZE9uUHJpbWl0aXZlTW9kZShzdWJtZXNoOiBTdWJNZXNoLCBwcmltaXRpdmVNb2RlOiBudW1iZXIsIGJhYnlsb25JbmRpY2VzOiBJbmRpY2VzQXJyYXksIGJ5dGVPZmZzZXQ6IG51bWJlciwgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChwcmltaXRpdmVNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuVHJpYW5nbGVGaWxsTW9kZToge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gc3VibWVzaC5pbmRleFN0YXJ0LCBsZW5ndGggPSBzdWJtZXNoLmluZGV4U3RhcnQgKyBzdWJtZXNoLmluZGV4Q291bnQ7IGkgPCBsZW5ndGg7IGkgPSBpICsgMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYnl0ZU9mZnNldCArIGkgKiA0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN3YXAgdGhlIHNlY29uZCBhbmQgdGhpcmQgaW5kaWNlc1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlY29uZEluZGV4ID0gYmluYXJ5V3JpdGVyLmdldFVJbnQzMihpbmRleCArIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoaXJkSW5kZXggPSBiaW5hcnlXcml0ZXIuZ2V0VUludDMyKGluZGV4ICsgOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLnNldFVJbnQzMih0aGlyZEluZGV4LCBpbmRleCArIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRVSW50MzIoc2Vjb25kSW5kZXgsIGluZGV4ICsgOCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLlRyaWFuZ2xlRmFuRHJhd01vZGU6IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdWJtZXNoLmluZGV4U3RhcnQgKyBzdWJtZXNoLmluZGV4Q291bnQgLSAxLCBzdGFydCA9IHN1Ym1lc2guaW5kZXhTdGFydDsgaSA+PSBzdGFydDsgLS1pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5V3JpdGVyLnNldFVJbnQzMihiYWJ5bG9uSW5kaWNlc1tpXSwgYnl0ZU9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCArPSA0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBNYXRlcmlhbC5UcmlhbmdsZVN0cmlwRHJhd01vZGU6IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJtZXNoLmluZGV4Q291bnQgPj0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRVSW50MzIoYmFieWxvbkluZGljZXNbc3VibWVzaC5pbmRleFN0YXJ0ICsgMl0sIGJ5dGVPZmZzZXQgKyA0KTtcclxuICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIuc2V0VUludDMyKGJhYnlsb25JbmRpY2VzW3N1Ym1lc2guaW5kZXhTdGFydCArIDFdLCBieXRlT2Zmc2V0ICsgOCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlb3JkZXJzIHRoZSB2ZXJ0ZXggYXR0cmlidXRlIGRhdGEgYmFzZWQgb24gdGhlIHByaW1pdGl2ZSBtb2RlLiAgVGhpcyBpcyBuZWNlc3Nhcnkgd2hlbiBpbmRpY2VzIGFyZSBub3QgYXZhaWxhYmxlIGFuZCB0aGUgd2luZGluZyBvcmRlciBpc1xyXG4gICAgICogY2xvY2std2lzZSBkdXJpbmcgZXhwb3J0IHRvIGdsVEZcclxuICAgICAqIEBwYXJhbSBzdWJtZXNoIEJhYnlsb25KUyBzdWJtZXNoXHJcbiAgICAgKiBAcGFyYW0gcHJpbWl0aXZlTW9kZSBQcmltaXRpdmUgbW9kZSBvZiB0aGUgbWVzaFxyXG4gICAgICogQHBhcmFtIHZlcnRleEJ1ZmZlcktpbmQgVGhlIHR5cGUgb2YgdmVydGV4IGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIG1lc2hBdHRyaWJ1dGVBcnJheSBUaGUgdmVydGV4IGF0dHJpYnV0ZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBUaGUgb2Zmc2V0IHRvIHRoZSBiaW5hcnkgZGF0YVxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBUaGUgYmluYXJ5IGRhdGEgZm9yIHRoZSBnbFRGIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVvcmRlclZlcnRleEF0dHJpYnV0ZURhdGFCYXNlZE9uUHJpbWl0aXZlTW9kZShcclxuICAgICAgICBzdWJtZXNoOiBTdWJNZXNoLFxyXG4gICAgICAgIHByaW1pdGl2ZU1vZGU6IG51bWJlcixcclxuICAgICAgICB2ZXJ0ZXhCdWZmZXJLaW5kOiBzdHJpbmcsXHJcbiAgICAgICAgbWVzaEF0dHJpYnV0ZUFycmF5OiBGbG9hdEFycmF5LFxyXG4gICAgICAgIGJ5dGVPZmZzZXQ6IG51bWJlcixcclxuICAgICAgICBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXJcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAocHJpbWl0aXZlTW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLlRyaWFuZ2xlRmlsbE1vZGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlb3JkZXJUcmlhbmdsZUZpbGxNb2RlKHN1Ym1lc2gsIHZlcnRleEJ1ZmZlcktpbmQsIG1lc2hBdHRyaWJ1dGVBcnJheSwgYnl0ZU9mZnNldCwgYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuVHJpYW5nbGVTdHJpcERyYXdNb2RlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW9yZGVyVHJpYW5nbGVTdHJpcERyYXdNb2RlKHN1Ym1lc2gsIHZlcnRleEJ1ZmZlcktpbmQsIG1lc2hBdHRyaWJ1dGVBcnJheSwgYnl0ZU9mZnNldCwgYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuVHJpYW5nbGVGYW5EcmF3TW9kZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVvcmRlclRyaWFuZ2xlRmFuTW9kZShzdWJtZXNoLCB2ZXJ0ZXhCdWZmZXJLaW5kLCBtZXNoQXR0cmlidXRlQXJyYXksIGJ5dGVPZmZzZXQsIGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlb3JkZXJzIHRoZSB2ZXJ0ZXggYXR0cmlidXRlcyBpbiB0aGUgY29ycmVjdCB0cmlhbmdsZSBtb2RlIG9yZGVyIC4gIFRoaXMgaXMgbmVjZXNzYXJ5IHdoZW4gaW5kaWNlcyBhcmUgbm90IGF2YWlsYWJsZSBhbmQgdGhlIHdpbmRpbmcgb3JkZXIgaXNcclxuICAgICAqIGNsb2NrLXdpc2UgZHVyaW5nIGV4cG9ydCB0byBnbFRGXHJcbiAgICAgKiBAcGFyYW0gc3VibWVzaCBCYWJ5bG9uSlMgc3VibWVzaFxyXG4gICAgICogQHBhcmFtIHZlcnRleEJ1ZmZlcktpbmQgVGhlIHR5cGUgb2YgdmVydGV4IGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIG1lc2hBdHRyaWJ1dGVBcnJheSBUaGUgdmVydGV4IGF0dHJpYnV0ZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBUaGUgb2Zmc2V0IHRvIHRoZSBiaW5hcnkgZGF0YVxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBUaGUgYmluYXJ5IGRhdGEgZm9yIHRoZSBnbFRGIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVvcmRlclRyaWFuZ2xlRmlsbE1vZGUoc3VibWVzaDogU3ViTWVzaCwgdmVydGV4QnVmZmVyS2luZDogc3RyaW5nLCBtZXNoQXR0cmlidXRlQXJyYXk6IEZsb2F0QXJyYXksIGJ5dGVPZmZzZXQ6IG51bWJlciwgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyKSB7XHJcbiAgICAgICAgY29uc3QgdmVydGV4QnVmZmVyID0gdGhpcy5fZ2V0VmVydGV4QnVmZmVyRnJvbU1lc2godmVydGV4QnVmZmVyS2luZCwgc3VibWVzaC5nZXRNZXNoKCkgYXMgTWVzaCk7XHJcbiAgICAgICAgaWYgKHZlcnRleEJ1ZmZlcikge1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpZGUgPSB2ZXJ0ZXhCdWZmZXIuYnl0ZVN0cmlkZSAvIFZlcnRleEJ1ZmZlci5HZXRUeXBlQnl0ZUxlbmd0aCh2ZXJ0ZXhCdWZmZXIudHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChzdWJtZXNoLnZlcnRpY2VzQ291bnQgJSAzICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihcIlRoZSBzdWJtZXNoIHZlcnRpY2VzIGZvciB0aGUgdHJpYW5nbGUgZmlsbCBtb2RlIGlzIG5vdCBkaXZpc2libGUgYnkgMyFcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhOiBWZWN0b3IyW10gfCBWZWN0b3IzW10gfCBWZWN0b3I0W10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHZlcnRleEJ1ZmZlcktpbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0OyB4IDwgc3VibWVzaC52ZXJ0aWNlc1N0YXJ0ICsgc3VibWVzaC52ZXJ0aWNlc0NvdW50OyB4ID0geCArIDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0geCAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjNbXSkucHVzaChWZWN0b3IzLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIDIgKiBzdHJpZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjNbXSkucHVzaChWZWN0b3IzLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4ICsgc3RyaWRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlRhbmdlbnRLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQ7IHggPCBzdWJtZXNoLnZlcnRpY2VzU3RhcnQgKyBzdWJtZXNoLnZlcnRpY2VzQ291bnQ7IHggPSB4ICsgMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB4ICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjRbXSkucHVzaChWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4ICsgMiAqIHN0cmlkZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXggKyBzdHJpZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuQ29sb3JLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpemUgPSB2ZXJ0ZXhCdWZmZXIuZ2V0U2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0OyB4IDwgc3VibWVzaC52ZXJ0aWNlc1N0YXJ0ICsgc3VibWVzaC52ZXJ0aWNlc0NvdW50OyB4ID0geCArIHNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0geCAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaXplID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3I0W10pLnB1c2goVmVjdG9yNC5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIDIgKiBzdHJpZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3I0W10pLnB1c2goVmVjdG9yNC5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCArIHN0cmlkZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjNbXSkucHVzaChWZWN0b3IzLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4ICsgMiAqIHN0cmlkZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjNbXSkucHVzaChWZWN0b3IzLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4ICsgc3RyaWRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlVWS2luZDpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5VVjJLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQ7IHggPCBzdWJtZXNoLnZlcnRpY2VzU3RhcnQgKyBzdWJtZXNoLnZlcnRpY2VzQ291bnQ7IHggPSB4ICsgMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB4ICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yMltdKS5wdXNoKFZlY3RvcjIuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjJbXSkucHVzaChWZWN0b3IyLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4ICsgMiAqIHN0cmlkZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yMltdKS5wdXNoKFZlY3RvcjIuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXggKyBzdHJpZGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb29scy5FcnJvcihgVW5zdXBwb3J0ZWQgVmVydGV4IEJ1ZmZlciB0eXBlOiAke3ZlcnRleEJ1ZmZlcktpbmR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdGVWZXJ0ZXhBdHRyaWJ1dGVEYXRhKHZlcnRleERhdGEsIGJ5dGVPZmZzZXQsIHZlcnRleEJ1ZmZlcktpbmQsIGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBUb29scy5XYXJuKGByZW9yZGVyVHJpYW5nbGVGaWxsTW9kZTogVmVydGV4IEJ1ZmZlciBLaW5kICR7dmVydGV4QnVmZmVyS2luZH0gbm90IHByZXNlbnQhYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVvcmRlcnMgdGhlIHZlcnRleCBhdHRyaWJ1dGVzIGluIHRoZSBjb3JyZWN0IHRyaWFuZ2xlIHN0cmlwIG9yZGVyLiAgVGhpcyBpcyBuZWNlc3Nhcnkgd2hlbiBpbmRpY2VzIGFyZSBub3QgYXZhaWxhYmxlIGFuZCB0aGUgd2luZGluZyBvcmRlciBpc1xyXG4gICAgICogY2xvY2std2lzZSBkdXJpbmcgZXhwb3J0IHRvIGdsVEZcclxuICAgICAqIEBwYXJhbSBzdWJtZXNoIEJhYnlsb25KUyBzdWJtZXNoXHJcbiAgICAgKiBAcGFyYW0gdmVydGV4QnVmZmVyS2luZCBUaGUgdHlwZSBvZiB2ZXJ0ZXggYXR0cmlidXRlXHJcbiAgICAgKiBAcGFyYW0gbWVzaEF0dHJpYnV0ZUFycmF5IFRoZSB2ZXJ0ZXggYXR0cmlidXRlIGRhdGFcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IFRoZSBvZmZzZXQgdG8gdGhlIGJpbmFyeSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyIFRoZSBiaW5hcnkgZGF0YSBmb3IgdGhlIGdsVEYgZmlsZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZW9yZGVyVHJpYW5nbGVTdHJpcERyYXdNb2RlKHN1Ym1lc2g6IFN1Yk1lc2gsIHZlcnRleEJ1ZmZlcktpbmQ6IHN0cmluZywgbWVzaEF0dHJpYnV0ZUFycmF5OiBGbG9hdEFycmF5LCBieXRlT2Zmc2V0OiBudW1iZXIsIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcikge1xyXG4gICAgICAgIGNvbnN0IHZlcnRleEJ1ZmZlciA9IHRoaXMuX2dldFZlcnRleEJ1ZmZlckZyb21NZXNoKHZlcnRleEJ1ZmZlcktpbmQsIHN1Ym1lc2guZ2V0TWVzaCgpIGFzIE1lc2gpO1xyXG4gICAgICAgIGlmICh2ZXJ0ZXhCdWZmZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RyaWRlID0gdmVydGV4QnVmZmVyLmJ5dGVTdHJpZGUgLyBWZXJ0ZXhCdWZmZXIuR2V0VHlwZUJ5dGVMZW5ndGgodmVydGV4QnVmZmVyLnR5cGUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YTogVmVjdG9yMltdIHwgVmVjdG9yM1tdIHwgVmVjdG9yNFtdID0gW107XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodmVydGV4QnVmZmVyS2luZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjNbXSkucHVzaChWZWN0b3IzLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4ICsgMiAqIHN0cmlkZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjNbXSkucHVzaChWZWN0b3IzLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4ICsgc3RyaWRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5UYW5nZW50S2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQgKyBzdWJtZXNoLnZlcnRpY2VzQ291bnQgLSAxOyB4ID49IHN1Ym1lc2gudmVydGljZXNTdGFydDsgLS14KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0geCAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5Db2xvcktpbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0ICsgc3VibWVzaC52ZXJ0aWNlc0NvdW50IC0gMTsgeCA+PSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQ7IC0teCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHggKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRleEJ1ZmZlci5nZXRTaXplKCkgPT09IDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlVWS2luZDpcclxuICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlVWMktpbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0ICsgc3VibWVzaC52ZXJ0aWNlc0NvdW50IC0gMTsgeCA+PSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQ7IC0teCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHggKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjJbXSkucHVzaChWZWN0b3IyLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFRvb2xzLkVycm9yKGBVbnN1cHBvcnRlZCBWZXJ0ZXggQnVmZmVyIHR5cGU6ICR7dmVydGV4QnVmZmVyS2luZH1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl93cml0ZVZlcnRleEF0dHJpYnV0ZURhdGEodmVydGV4RGF0YSwgYnl0ZU9mZnNldCArIDEyLCB2ZXJ0ZXhCdWZmZXJLaW5kLCBiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFRvb2xzLldhcm4oYHJlb3JkZXJUcmlhbmdsZVN0cmlwRHJhd01vZGU6IFZlcnRleCBidWZmZXIga2luZCAke3ZlcnRleEJ1ZmZlcktpbmR9IG5vdCBwcmVzZW50IWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlb3JkZXJzIHRoZSB2ZXJ0ZXggYXR0cmlidXRlcyBpbiB0aGUgY29ycmVjdCB0cmlhbmdsZSBmYW4gb3JkZXIuICBUaGlzIGlzIG5lY2Vzc2FyeSB3aGVuIGluZGljZXMgYXJlIG5vdCBhdmFpbGFibGUgYW5kIHRoZSB3aW5kaW5nIG9yZGVyIGlzXHJcbiAgICAgKiBjbG9jay13aXNlIGR1cmluZyBleHBvcnQgdG8gZ2xURlxyXG4gICAgICogQHBhcmFtIHN1Ym1lc2ggQmFieWxvbkpTIHN1Ym1lc2hcclxuICAgICAqIEBwYXJhbSB2ZXJ0ZXhCdWZmZXJLaW5kIFRoZSB0eXBlIG9mIHZlcnRleCBhdHRyaWJ1dGVcclxuICAgICAqIEBwYXJhbSBtZXNoQXR0cmlidXRlQXJyYXkgVGhlIHZlcnRleCBhdHRyaWJ1dGUgZGF0YVxyXG4gICAgICogQHBhcmFtIGJ5dGVPZmZzZXQgVGhlIG9mZnNldCB0byB0aGUgYmluYXJ5IGRhdGFcclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXIgVGhlIGJpbmFyeSBkYXRhIGZvciB0aGUgZ2xURiBmaWxlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Jlb3JkZXJUcmlhbmdsZUZhbk1vZGUoc3VibWVzaDogU3ViTWVzaCwgdmVydGV4QnVmZmVyS2luZDogc3RyaW5nLCBtZXNoQXR0cmlidXRlQXJyYXk6IEZsb2F0QXJyYXksIGJ5dGVPZmZzZXQ6IG51bWJlciwgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyKSB7XHJcbiAgICAgICAgY29uc3QgdmVydGV4QnVmZmVyID0gdGhpcy5fZ2V0VmVydGV4QnVmZmVyRnJvbU1lc2godmVydGV4QnVmZmVyS2luZCwgc3VibWVzaC5nZXRNZXNoKCkgYXMgTWVzaCk7XHJcbiAgICAgICAgaWYgKHZlcnRleEJ1ZmZlcikge1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpZGUgPSB2ZXJ0ZXhCdWZmZXIuYnl0ZVN0cmlkZSAvIFZlcnRleEJ1ZmZlci5HZXRUeXBlQnl0ZUxlbmd0aCh2ZXJ0ZXhCdWZmZXIudHlwZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhOiBWZWN0b3IyW10gfCBWZWN0b3IzW10gfCBWZWN0b3I0W10gPSBbXTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgc3dpdGNoICh2ZXJ0ZXhCdWZmZXJLaW5kKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQ6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHN1Ym1lc2gudmVydGljZXNTdGFydCArIHN1Ym1lc2gudmVydGljZXNDb3VudCAtIDE7IHggPj0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0OyAtLXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB4ICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3IzW10pLnB1c2goVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlRhbmdlbnRLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeCA9IHN1Ym1lc2gudmVydGljZXNTdGFydCArIHN1Ym1lc2gudmVydGljZXNDb3VudCAtIDE7IHggPj0gc3VibWVzaC52ZXJ0aWNlc1N0YXJ0OyAtLXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB4ICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBWZWN0b3I0W10pLnB1c2goVmVjdG9yNC5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLkNvbG9yS2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQgKyBzdWJtZXNoLnZlcnRpY2VzQ291bnQgLSAxOyB4ID49IHN1Ym1lc2gudmVydGljZXNTdGFydDsgLS14KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0geCAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yNFtdKS5wdXNoKFZlY3RvcjQuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4QnVmZmVyLmdldFNpemUoKSA9PT0gNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAodmVydGV4RGF0YSBhcyBWZWN0b3I0W10pLnB1c2goVmVjdG9yNC5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh2ZXJ0ZXhEYXRhIGFzIFZlY3RvcjNbXSkucHVzaChWZWN0b3IzLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuVVZLaW5kOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuVVYyS2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBzdWJtZXNoLnZlcnRpY2VzU3RhcnQgKyBzdWJtZXNoLnZlcnRpY2VzQ291bnQgLSAxOyB4ID49IHN1Ym1lc2gudmVydGljZXNTdGFydDsgLS14KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0geCAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgVmVjdG9yMltdKS5wdXNoKFZlY3RvcjIuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoYFVuc3VwcG9ydGVkIFZlcnRleCBCdWZmZXIgdHlwZTogJHt2ZXJ0ZXhCdWZmZXJLaW5kfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3dyaXRlVmVydGV4QXR0cmlidXRlRGF0YSh2ZXJ0ZXhEYXRhLCBieXRlT2Zmc2V0LCB2ZXJ0ZXhCdWZmZXJLaW5kLCBiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFRvb2xzLldhcm4oYHJlb3JkZXJUcmlhbmdsZUZhbk1vZGU6IFZlcnRleCBidWZmZXIga2luZCAke3ZlcnRleEJ1ZmZlcktpbmR9IG5vdCBwcmVzZW50IWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyB0aGUgdmVydGV4IGF0dHJpYnV0ZSBkYXRhIHRvIGJpbmFyeVxyXG4gICAgICogQHBhcmFtIHZlcnRpY2VzIFRoZSB2ZXJ0aWNlcyB0byB3cml0ZSB0byB0aGUgYmluYXJ5IHdyaXRlclxyXG4gICAgICogQHBhcmFtIGJ5dGVPZmZzZXQgVGhlIG9mZnNldCBpbnRvIHRoZSBiaW5hcnkgd3JpdGVyIHRvIG92ZXJ3cml0ZSBiaW5hcnkgZGF0YVxyXG4gICAgICogQHBhcmFtIHZlcnRleEF0dHJpYnV0ZUtpbmQgVGhlIHZlcnRleCBhdHRyaWJ1dGUgdHlwZVxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBUaGUgd3JpdGVyIGNvbnRhaW5pbmcgdGhlIGJpbmFyeSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3dyaXRlVmVydGV4QXR0cmlidXRlRGF0YSh2ZXJ0aWNlczogVmVjdG9yMltdIHwgVmVjdG9yM1tdIHwgVmVjdG9yNFtdLCBieXRlT2Zmc2V0OiBudW1iZXIsIHZlcnRleEF0dHJpYnV0ZUtpbmQ6IHN0cmluZywgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCB2ZXJ0ZXggb2YgdmVydGljZXMpIHtcclxuICAgICAgICAgICAgaWYgKHZlcnRleEF0dHJpYnV0ZUtpbmQgPT09IFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXgubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmVydGV4QXR0cmlidXRlS2luZCA9PT0gVmVydGV4QnVmZmVyLlRhbmdlbnRLaW5kICYmIHZlcnRleCBpbnN0YW5jZW9mIFZlY3RvcjQpIHtcclxuICAgICAgICAgICAgICAgIF9HTFRGVXRpbGl0aWVzLl9Ob3JtYWxpemVUYW5nZW50RnJvbVJlZih2ZXJ0ZXgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiB2ZXJ0ZXguYXNBcnJheSgpKSB7XHJcbiAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIuc2V0RmxvYXQzMihjb21wb25lbnQsIGJ5dGVPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgYnl0ZU9mZnNldCArPSA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIG1lc2ggYXR0cmlidXRlIGRhdGEgdG8gYSBkYXRhIGJ1ZmZlclxyXG4gICAgICogUmV0dXJucyB0aGUgYnl0ZWxlbmd0aCBvZiB0aGUgZGF0YVxyXG4gICAgICogQHBhcmFtIHZlcnRleEJ1ZmZlcktpbmQgSW5kaWNhdGVzIHdoYXQga2luZCBvZiB2ZXJ0ZXggZGF0YSBpcyBiZWluZyBwYXNzZWQgaW5cclxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVDb21wb25lbnRLaW5kXHJcbiAgICAgKiBAcGFyYW0gbWVzaEF0dHJpYnV0ZUFycmF5IEFycmF5IGNvbnRhaW5pbmcgdGhlIGF0dHJpYnV0ZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gc3RyaWRlIFNwZWNpZmllcyB0aGUgc3BhY2UgYmV0d2VlbiBkYXRhXHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyIFRoZSBidWZmZXIgdG8gd3JpdGUgdGhlIGJpbmFyeSBkYXRhIHRvXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblRyYW5zZm9ybU5vZGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIF93cml0ZUF0dHJpYnV0ZURhdGEoXHJcbiAgICAgICAgdmVydGV4QnVmZmVyS2luZDogc3RyaW5nLFxyXG4gICAgICAgIGF0dHJpYnV0ZUNvbXBvbmVudEtpbmQ6IEFjY2Vzc29yQ29tcG9uZW50VHlwZSxcclxuICAgICAgICBtZXNoQXR0cmlidXRlQXJyYXk6IEZsb2F0QXJyYXksXHJcbiAgICAgICAgc3RyaWRlOiBudW1iZXIsXHJcbiAgICAgICAgYmluYXJ5V3JpdGVyOiBfQmluYXJ5V3JpdGVyLFxyXG4gICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgdmVydGV4QXR0cmlidXRlczogbnVtYmVyW11bXSA9IFtdO1xyXG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHZlcnRleEJ1ZmZlcktpbmQpIHtcclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuZ3RoID0gbWVzaEF0dHJpYnV0ZUFycmF5Lmxlbmd0aCAvIHN0cmlkZTsgayA8IGxlbmd0aDsgKytrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBrICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleERhdGEgPSBWZWN0b3IzLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhBdHRyaWJ1dGVzLnB1c2godmVydGV4RGF0YS5hc0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDAsIGxlbmd0aCA9IG1lc2hBdHRyaWJ1dGVBcnJheS5sZW5ndGggLyBzdHJpZGU7IGsgPCBsZW5ndGg7ICsraykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gayAqIHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gVmVjdG9yMy5Gcm9tQXJyYXkobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QXR0cmlidXRlcy5wdXNoKHZlcnRleERhdGEubm9ybWFsaXplKCkuYXNBcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlRhbmdlbnRLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuZ3RoID0gbWVzaEF0dHJpYnV0ZUFycmF5Lmxlbmd0aCAvIHN0cmlkZTsgayA8IGxlbmd0aDsgKytrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBrICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleERhdGEgPSBWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBfR0xURlV0aWxpdGllcy5fTm9ybWFsaXplVGFuZ2VudEZyb21SZWYodmVydGV4RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QXR0cmlidXRlcy5wdXNoKHZlcnRleERhdGEuYXNBcnJheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLkNvbG9yS2luZDoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzaE1hdGVyaWFsID0gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGFzIE1lc2gpLm1hdGVyaWFsO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udmVydFRvTGluZWFyID0gbWVzaE1hdGVyaWFsID8gbWVzaE1hdGVyaWFsLmdldENsYXNzTmFtZSgpID09PSBcIlN0YW5kYXJkTWF0ZXJpYWxcIiA6IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhOiBDb2xvcjMgfCBDb2xvcjQgPSBzdHJpZGUgPT09IDMgPyBuZXcgQ29sb3IzKCkgOiBuZXcgQ29sb3I0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VFeGFjdFNyZ2JDb252ZXJzaW9ucyA9IHRoaXMuX2JhYnlsb25TY2VuZS5nZXRFbmdpbmUoKS51c2VFeGFjdFNyZ2JDb252ZXJzaW9ucztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwLCBsZW5ndGggPSBtZXNoQXR0cmlidXRlQXJyYXkubGVuZ3RoIC8gc3RyaWRlOyBrIDwgbGVuZ3RoOyArK2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGsgKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmlkZSA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb2xvcjMuRnJvbUFycmF5VG9SZWYobWVzaEF0dHJpYnV0ZUFycmF5LCBpbmRleCwgdmVydGV4RGF0YSBhcyBDb2xvcjMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udmVydFRvTGluZWFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmVydGV4RGF0YSBhcyBDb2xvcjMpLnRvTGluZWFyU3BhY2VUb1JlZih2ZXJ0ZXhEYXRhIGFzIENvbG9yMywgdXNlRXhhY3RTcmdiQ29udmVyc2lvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29sb3I0LkZyb21BcnJheVRvUmVmKG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgsIHZlcnRleERhdGEgYXMgQ29sb3I0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnZlcnRUb0xpbmVhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnRleERhdGEgYXMgQ29sb3I0KS50b0xpbmVhclNwYWNlVG9SZWYodmVydGV4RGF0YSBhcyBDb2xvcjQsIHVzZUV4YWN0U3JnYkNvbnZlcnNpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhBdHRyaWJ1dGVzLnB1c2godmVydGV4RGF0YS5hc0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuVVZLaW5kOlxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5VVjJLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuZ3RoID0gbWVzaEF0dHJpYnV0ZUFycmF5Lmxlbmd0aCAvIHN0cmlkZTsgayA8IGxlbmd0aDsgKytrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBrICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleERhdGEgPSBWZWN0b3IyLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhBdHRyaWJ1dGVzLnB1c2godmVydGV4RGF0YS5hc0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNJbmRpY2VzS2luZDpcclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNJbmRpY2VzRXh0cmFLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuZ3RoID0gbWVzaEF0dHJpYnV0ZUFycmF5Lmxlbmd0aCAvIHN0cmlkZTsgayA8IGxlbmd0aDsgKytrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBrICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleERhdGEgPSBWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhBdHRyaWJ1dGVzLnB1c2godmVydGV4RGF0YS5hc0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNXZWlnaHRzS2luZDpcclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNXZWlnaHRzRXh0cmFLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMCwgbGVuZ3RoID0gbWVzaEF0dHJpYnV0ZUFycmF5Lmxlbmd0aCAvIHN0cmlkZTsgayA8IGxlbmd0aDsgKytrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBrICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleERhdGEgPSBWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhBdHRyaWJ1dGVzLnB1c2godmVydGV4RGF0YS5hc0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuV2FybihcIlVuc3VwcG9ydGVkIFZlcnRleCBCdWZmZXIgVHlwZTogXCIgKyB2ZXJ0ZXhCdWZmZXJLaW5kKTtcclxuICAgICAgICAgICAgICAgIHZlcnRleEF0dHJpYnV0ZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHdyaXRlQmluYXJ5RnVuYztcclxuICAgICAgICBzd2l0Y2ggKGF0dHJpYnV0ZUNvbXBvbmVudEtpbmQpIHtcclxuICAgICAgICAgICAgY2FzZSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfQllURToge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVCaW5hcnlGdW5jID0gYmluYXJ5V3JpdGVyLnNldFVJbnQ4LmJpbmQoYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLlVOU0lHTkVEX1NIT1JUOiB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZUJpbmFyeUZ1bmMgPSBiaW5hcnlXcml0ZXIuc2V0VUludDE2LmJpbmQoYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLlVOU0lHTkVEX0lOVDoge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVCaW5hcnlGdW5jID0gYmluYXJ5V3JpdGVyLnNldFVJbnQzMi5iaW5kKGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVDoge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVCaW5hcnlGdW5jID0gYmluYXJ5V3JpdGVyLnNldEZsb2F0MzIuYmluZChiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuV2FybihcIlVuc3VwcG9ydGVkIEF0dHJpYnV0ZSBDb21wb25lbnQga2luZDogXCIgKyBhdHRyaWJ1dGVDb21wb25lbnRLaW5kKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCB2ZXJ0ZXhBdHRyaWJ1dGUgb2YgdmVydGV4QXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiB2ZXJ0ZXhBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlQmluYXJ5RnVuYyhjb21wb25lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGVzIG1lc2ggYXR0cmlidXRlIGRhdGEgdG8gYSBkYXRhIGJ1ZmZlclxyXG4gICAgICogUmV0dXJucyB0aGUgYnl0ZWxlbmd0aCBvZiB0aGUgZGF0YVxyXG4gICAgICogQHBhcmFtIHZlcnRleEJ1ZmZlcktpbmQgSW5kaWNhdGVzIHdoYXQga2luZCBvZiB2ZXJ0ZXggZGF0YSBpcyBiZWluZyBwYXNzZWQgaW5cclxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVDb21wb25lbnRLaW5kXHJcbiAgICAgKiBAcGFyYW0gbWVzaFByaW1pdGl2ZVxyXG4gICAgICogQHBhcmFtIG1vcnBoVGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0gbWVzaEF0dHJpYnV0ZUFycmF5IEFycmF5IGNvbnRhaW5pbmcgdGhlIGF0dHJpYnV0ZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gbW9ycGhUYXJnZXRBdHRyaWJ1dGVBcnJheVxyXG4gICAgICogQHBhcmFtIHN0cmlkZSBTcGVjaWZpZXMgdGhlIHNwYWNlIGJldHdlZW4gZGF0YVxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBUaGUgYnVmZmVyIHRvIHdyaXRlIHRoZSBiaW5hcnkgZGF0YSB0b1xyXG4gICAgICogQHBhcmFtIG1pbk1heFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd3JpdGVNb3JwaFRhcmdldEF0dHJpYnV0ZURhdGEoXHJcbiAgICAgICAgdmVydGV4QnVmZmVyS2luZDogc3RyaW5nLFxyXG4gICAgICAgIGF0dHJpYnV0ZUNvbXBvbmVudEtpbmQ6IEFjY2Vzc29yQ29tcG9uZW50VHlwZSxcclxuICAgICAgICBtZXNoUHJpbWl0aXZlOiBTdWJNZXNoLFxyXG4gICAgICAgIG1lc2hBdHRyaWJ1dGVBcnJheTogRmxvYXRBcnJheSxcclxuICAgICAgICBtb3JwaFRhcmdldEF0dHJpYnV0ZUFycmF5OiBGbG9hdEFycmF5LFxyXG4gICAgICAgIHN0cmlkZTogbnVtYmVyLFxyXG4gICAgICAgIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcixcclxuICAgICAgICBtaW5NYXg/OiBhbnlcclxuICAgICkge1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhBdHRyaWJ1dGVzOiBudW1iZXJbXVtdID0gW107XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGRpZmZlcmVuY2U6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygpO1xyXG4gICAgICAgIGxldCBkaWZmZXJlbmNlNDogVmVjdG9yNCA9IG5ldyBWZWN0b3I0KDAsIDAsIDAsIDApO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHZlcnRleEJ1ZmZlcktpbmQpIHtcclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gbWVzaFByaW1pdGl2ZS52ZXJ0aWNlc1N0YXJ0OyBrIDwgbWVzaFByaW1pdGl2ZS52ZXJ0aWNlc0NvdW50OyArK2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG1lc2hQcmltaXRpdmUuaW5kZXhTdGFydCArIGsgKiBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YSA9IFZlY3RvcjMuRnJvbUFycmF5KG1lc2hBdHRyaWJ1dGVBcnJheSwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoRGF0YSA9IFZlY3RvcjMuRnJvbUFycmF5KG1vcnBoVGFyZ2V0QXR0cmlidXRlQXJyYXksIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBkaWZmZXJlbmNlID0gbW9ycGhEYXRhLnN1YnRyYWN0VG9SZWYodmVydGV4RGF0YSwgZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pbk1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5NYXgubWluLmNvcHlGcm9tRmxvYXRzKE1hdGgubWluKGRpZmZlcmVuY2UueCwgbWluTWF4Lm1pbi54KSwgTWF0aC5taW4oZGlmZmVyZW5jZS55LCBtaW5NYXgubWluLnkpLCBNYXRoLm1pbihkaWZmZXJlbmNlLnosIG1pbk1heC5taW4ueikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5NYXgubWF4LmNvcHlGcm9tRmxvYXRzKE1hdGgubWF4KGRpZmZlcmVuY2UueCwgbWluTWF4Lm1heC54KSwgTWF0aC5tYXgoZGlmZmVyZW5jZS55LCBtaW5NYXgubWF4LnkpLCBNYXRoLm1heChkaWZmZXJlbmNlLnosIG1pbk1heC5tYXgueikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhBdHRyaWJ1dGVzLnB1c2goZGlmZmVyZW5jZS5hc0FycmF5KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IG1lc2hQcmltaXRpdmUudmVydGljZXNTdGFydDsgayA8IG1lc2hQcmltaXRpdmUudmVydGljZXNDb3VudDsgKytrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBtZXNoUHJpbWl0aXZlLmluZGV4U3RhcnQgKyBrICogc3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleERhdGEgPSBWZWN0b3IzLkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KS5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3JwaERhdGEgPSBWZWN0b3IzLkZyb21BcnJheShtb3JwaFRhcmdldEF0dHJpYnV0ZUFycmF5LCBpbmRleCkubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlmZmVyZW5jZSA9IG1vcnBoRGF0YS5zdWJ0cmFjdFRvUmVmKHZlcnRleERhdGEsIGRpZmZlcmVuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEF0dHJpYnV0ZXMucHVzaChkaWZmZXJlbmNlLmFzQXJyYXkoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5UYW5nZW50S2luZDoge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IG1lc2hQcmltaXRpdmUudmVydGljZXNTdGFydDsgayA8IG1lc2hQcmltaXRpdmUudmVydGljZXNDb3VudDsgKytrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBtZXNoUHJpbWl0aXZlLmluZGV4U3RhcnQgKyBrICogKHN0cmlkZSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleERhdGEgPSBWZWN0b3I0LkZyb21BcnJheShtZXNoQXR0cmlidXRlQXJyYXksIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBfR0xURlV0aWxpdGllcy5fTm9ybWFsaXplVGFuZ2VudEZyb21SZWYodmVydGV4RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhEYXRhID0gVmVjdG9yNC5Gcm9tQXJyYXkobW9ycGhUYXJnZXRBdHRyaWJ1dGVBcnJheSwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9HTFRGVXRpbGl0aWVzLl9Ob3JtYWxpemVUYW5nZW50RnJvbVJlZihtb3JwaERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZmZlcmVuY2U0ID0gbW9ycGhEYXRhLnN1YnRyYWN0VG9SZWYodmVydGV4RGF0YSwgZGlmZmVyZW5jZTQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEF0dHJpYnV0ZXMucHVzaChbZGlmZmVyZW5jZTQueCwgZGlmZmVyZW5jZTQueSwgZGlmZmVyZW5jZTQuel0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuV2FybihcIlVuc3VwcG9ydGVkIFZlcnRleCBCdWZmZXIgVHlwZTogXCIgKyB2ZXJ0ZXhCdWZmZXJLaW5kKTtcclxuICAgICAgICAgICAgICAgIHZlcnRleEF0dHJpYnV0ZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHdyaXRlQmluYXJ5RnVuYztcclxuICAgICAgICBzd2l0Y2ggKGF0dHJpYnV0ZUNvbXBvbmVudEtpbmQpIHtcclxuICAgICAgICAgICAgY2FzZSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfQllURToge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVCaW5hcnlGdW5jID0gYmluYXJ5V3JpdGVyLnNldFVJbnQ4LmJpbmQoYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLlVOU0lHTkVEX1NIT1JUOiB7XHJcbiAgICAgICAgICAgICAgICB3cml0ZUJpbmFyeUZ1bmMgPSBiaW5hcnlXcml0ZXIuc2V0VUludDE2LmJpbmQoYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLlVOU0lHTkVEX0lOVDoge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVCaW5hcnlGdW5jID0gYmluYXJ5V3JpdGVyLnNldFVJbnQzMi5iaW5kKGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVDoge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVCaW5hcnlGdW5jID0gYmluYXJ5V3JpdGVyLnNldEZsb2F0MzIuYmluZChiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuV2FybihcIlVuc3VwcG9ydGVkIEF0dHJpYnV0ZSBDb21wb25lbnQga2luZDogXCIgKyBhdHRyaWJ1dGVDb21wb25lbnRLaW5kKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCB2ZXJ0ZXhBdHRyaWJ1dGUgb2YgdmVydGV4QXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiB2ZXJ0ZXhBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlQmluYXJ5RnVuYyhjb21wb25lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIGdsVEYganNvbiBkYXRhXHJcbiAgICAgKiBAcGFyYW0gc2hvdWxkVXNlR2xiIEluZGljYXRlcyB3aGV0aGVyIHRoZSBqc29uIHNob3VsZCBiZSB3cml0dGVuIGZvciBhIGdsYiBmaWxlXHJcbiAgICAgKiBAcGFyYW0gZ2xURlByZWZpeCBUZXh0IHRvIHVzZSB3aGVuIHByZWZpeGluZyBhIGdsVEYgZmlsZVxyXG4gICAgICogQHBhcmFtIHByZXR0eVByaW50IEluZGljYXRlcyB3aGV0aGVyIHRoZSBqc29uIGZpbGUgc2hvdWxkIGJlIHByZXR0eSBwcmludGVkICh0cnVlKSBvciBub3QgKGZhbHNlKVxyXG4gICAgICogQHJldHVybnMganNvbiBkYXRhIGFzIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZW5lcmF0ZUpTT04oc2hvdWxkVXNlR2xiOiBib29sZWFuLCBnbFRGUHJlZml4Pzogc3RyaW5nLCBwcmV0dHlQcmludD86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlcjogSUJ1ZmZlciA9IHsgYnl0ZUxlbmd0aDogdGhpcy5fdG90YWxCeXRlTGVuZ3RoIH07XHJcbiAgICAgICAgbGV0IGltYWdlTmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGxldCBpbWFnZURhdGE6IHsgZGF0YTogQXJyYXlCdWZmZXI7IG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlIH07XHJcbiAgICAgICAgbGV0IGJ1ZmZlclZpZXc6IElCdWZmZXJWaWV3O1xyXG4gICAgICAgIGxldCBieXRlT2Zmc2V0OiBudW1iZXIgPSB0aGlzLl90b3RhbEJ5dGVMZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChidWZmZXIuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLmJ1ZmZlcnMgPSBbYnVmZmVyXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX25vZGVzICYmIHRoaXMuX25vZGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLm5vZGVzID0gdGhpcy5fbm9kZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tZXNoZXMgJiYgdGhpcy5fbWVzaGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLm1lc2hlcyA9IHRoaXMuX21lc2hlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3NjZW5lcyAmJiB0aGlzLl9zY2VuZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dsVEYuc2NlbmVzID0gdGhpcy5fc2NlbmVzO1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLnNjZW5lID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhbWVyYXMgJiYgdGhpcy5fY2FtZXJhcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5jYW1lcmFzID0gdGhpcy5fY2FtZXJhcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1ZmZlclZpZXdzICYmIHRoaXMuX2J1ZmZlclZpZXdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLmJ1ZmZlclZpZXdzID0gdGhpcy5fYnVmZmVyVmlld3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9hY2Nlc3NvcnMgJiYgdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLmFjY2Vzc29ycyA9IHRoaXMuX2FjY2Vzc29ycztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGlvbnMgJiYgdGhpcy5fYW5pbWF0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5hbmltYXRpb25zID0gdGhpcy5fYW5pbWF0aW9ucztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX21hdGVyaWFscyAmJiB0aGlzLl9tYXRlcmlhbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dsVEYubWF0ZXJpYWxzID0gdGhpcy5fbWF0ZXJpYWxzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZXMgJiYgdGhpcy5fdGV4dHVyZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dsVEYudGV4dHVyZXMgPSB0aGlzLl90ZXh0dXJlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3NhbXBsZXJzICYmIHRoaXMuX3NhbXBsZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nbFRGLnNhbXBsZXJzID0gdGhpcy5fc2FtcGxlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9za2lucyAmJiB0aGlzLl9za2lucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xURi5za2lucyA9IHRoaXMuX3NraW5zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faW1hZ2VzICYmIHRoaXMuX2ltYWdlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCFzaG91bGRVc2VHbGIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dsVEYuaW1hZ2VzID0gdGhpcy5faW1hZ2VzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xURi5pbWFnZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbWFnZXMuZm9yRWFjaCgoaW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2UudXJpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YSA9IHRoaXMuX2ltYWdlRGF0YVtpbWFnZS51cmldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcmRlcmVkSW1hZ2VEYXRhLnB1c2goaW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VOYW1lID0gaW1hZ2UudXJpLnNwbGl0KFwiLlwiKVswXSArIFwiIGltYWdlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBieXRlT2Zmc2V0LCBpbWFnZURhdGEuZGF0YS5ieXRlTGVuZ3RoLCB1bmRlZmluZWQsIGltYWdlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgKz0gaW1hZ2VEYXRhLmRhdGEuYnl0ZUxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyVmlld3MucHVzaChidWZmZXJWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2UuYnVmZmVyVmlldyA9IHRoaXMuX2J1ZmZlclZpZXdzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLm5hbWUgPSBpbWFnZU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLm1pbWVUeXBlID0gaW1hZ2VEYXRhLm1pbWVUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZS51cmkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZ2xURi5pbWFnZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dsVEYuaW1hZ2VzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xURi5pbWFnZXMucHVzaChpbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIHVyaSB3aXRoIGJ1ZmZlcnZpZXcgYW5kIG1pbWUgdHlwZSBmb3IgZ2xiXHJcbiAgICAgICAgICAgICAgICBidWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc2hvdWxkVXNlR2xiKSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlci51cmkgPSBnbFRGUHJlZml4ICsgXCIuYmluXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBqc29uVGV4dCA9IHByZXR0eVByaW50ID8gSlNPTi5zdHJpbmdpZnkodGhpcy5fZ2xURiwgbnVsbCwgMikgOiBKU09OLnN0cmluZ2lmeSh0aGlzLl9nbFRGKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGpzb25UZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGVzIGRhdGEgZm9yIC5nbHRmIGFuZCAuYmluIGZpbGVzIGJhc2VkIG9uIHRoZSBnbFRGIHByZWZpeCBzdHJpbmdcclxuICAgICAqIEBwYXJhbSBnbFRGUHJlZml4IFRleHQgdG8gdXNlIHdoZW4gcHJlZml4aW5nIGEgZ2xURiBmaWxlXHJcbiAgICAgKiBAcGFyYW0gZGlzcG9zZSBEaXNwb3NlIHRoZSBleHBvcnRlclxyXG4gICAgICogQHJldHVybnMgR0xURkRhdGEgd2l0aCBnbFRGIGZpbGUgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2dlbmVyYXRlR0xURkFzeW5jKGdsVEZQcmVmaXg6IHN0cmluZywgZGlzcG9zZSA9IHRydWUpOiBQcm9taXNlPEdMVEZEYXRhPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dlbmVyYXRlQmluYXJ5QXN5bmMoKS50aGVuKChiaW5hcnlCdWZmZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uc09uRXhwb3J0aW5nKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25UZXh0ID0gdGhpcy5fZ2VuZXJhdGVKU09OKGZhbHNlLCBnbFRGUHJlZml4LCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgYmluID0gbmV3IEJsb2IoW2JpbmFyeUJ1ZmZlcl0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdsVEZGaWxlTmFtZSA9IGdsVEZQcmVmaXggKyBcIi5nbHRmXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGdsVEZCaW5GaWxlID0gZ2xURlByZWZpeCArIFwiLmJpblwiO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gbmV3IEdMVEZEYXRhKCk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuZ2xURkZpbGVzW2dsVEZGaWxlTmFtZV0gPSBqc29uVGV4dDtcclxuICAgICAgICAgICAgY29udGFpbmVyLmdsVEZGaWxlc1tnbFRGQmluRmlsZV0gPSBiaW47XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5faW1hZ2VEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGltYWdlIGluIHRoaXMuX2ltYWdlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5nbFRGRmlsZXNbaW1hZ2VdID0gbmV3IEJsb2IoW3RoaXMuX2ltYWdlRGF0YVtpbWFnZV0uZGF0YV0sIHsgdHlwZTogdGhpcy5faW1hZ2VEYXRhW2ltYWdlXS5taW1lVHlwZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGJpbmFyeSBidWZmZXIgZm9yIGdsVEZcclxuICAgICAqIEByZXR1cm5zIGFycmF5IGJ1ZmZlciBmb3IgYmluYXJ5IGRhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2VuZXJhdGVCaW5hcnlBc3luYygpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XHJcbiAgICAgICAgY29uc3QgYmluYXJ5V3JpdGVyID0gbmV3IF9CaW5hcnlXcml0ZXIoNCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVNjZW5lQXN5bmMoYmluYXJ5V3JpdGVyKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvY2FsRW5naW5lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbEVuZ2luZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJpbmFyeVdyaXRlci5nZXRBcnJheUJ1ZmZlcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFkcyB0aGUgbnVtYmVyIHRvIGEgbXVsdGlwbGUgb2YgNFxyXG4gICAgICogQHBhcmFtIG51bSBudW1iZXIgdG8gcGFkXHJcbiAgICAgKiBAcmV0dXJucyBwYWRkZWQgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldFBhZGRpbmcobnVtOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHJlbWFpbmRlciA9IG51bSAlIDQ7XHJcbiAgICAgICAgY29uc3QgcGFkZGluZyA9IHJlbWFpbmRlciA9PT0gMCA/IHJlbWFpbmRlciA6IDQgLSByZW1haW5kZXI7XHJcblxyXG4gICAgICAgIHJldHVybiBwYWRkaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfZ2VuZXJhdGVHTEJBc3luYyhnbFRGUHJlZml4OiBzdHJpbmcsIGRpc3Bvc2UgPSB0cnVlKTogUHJvbWlzZTxHTFRGRGF0YT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZW5lcmF0ZUJpbmFyeUFzeW5jKCkudGhlbigoYmluYXJ5QnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbnNPbkV4cG9ydGluZygpO1xyXG4gICAgICAgICAgICBjb25zdCBqc29uVGV4dCA9IHRoaXMuX2dlbmVyYXRlSlNPTih0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgZ2xiRmlsZU5hbWUgPSBnbFRGUHJlZml4ICsgXCIuZ2xiXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckxlbmd0aCA9IDEyO1xyXG4gICAgICAgICAgICBjb25zdCBjaHVua0xlbmd0aFByZWZpeCA9IDg7XHJcbiAgICAgICAgICAgIGxldCBqc29uTGVuZ3RoID0ganNvblRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgZW5jb2RlZEpzb25UZXh0O1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VCeXRlTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgLy8gbWFrZSB1c2Ugb2YgVGV4dEVuY29kZXIgd2hlbiBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBUZXh0RW5jb2RlciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xyXG4gICAgICAgICAgICAgICAgZW5jb2RlZEpzb25UZXh0ID0gZW5jb2Rlci5lbmNvZGUoanNvblRleHQpO1xyXG4gICAgICAgICAgICAgICAganNvbkxlbmd0aCA9IGVuY29kZWRKc29uVGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcmRlcmVkSW1hZ2VEYXRhLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUJ5dGVMZW5ndGggKz0gdGhpcy5fb3JkZXJlZEltYWdlRGF0YVtpXS5kYXRhLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QganNvblBhZGRpbmcgPSB0aGlzLl9nZXRQYWRkaW5nKGpzb25MZW5ndGgpO1xyXG4gICAgICAgICAgICBjb25zdCBiaW5QYWRkaW5nID0gdGhpcy5fZ2V0UGFkZGluZyhiaW5hcnlCdWZmZXIuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlUGFkZGluZyA9IHRoaXMuX2dldFBhZGRpbmcoaW1hZ2VCeXRlTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBoZWFkZXJMZW5ndGggKyAyICogY2h1bmtMZW5ndGhQcmVmaXggKyBqc29uTGVuZ3RoICsganNvblBhZGRpbmcgKyBiaW5hcnlCdWZmZXIuYnl0ZUxlbmd0aCArIGJpblBhZGRpbmcgKyBpbWFnZUJ5dGVMZW5ndGggKyBpbWFnZVBhZGRpbmc7XHJcblxyXG4gICAgICAgICAgICAvL2hlYWRlclxyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXJCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoaGVhZGVyTGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyQnVmZmVyVmlldyA9IG5ldyBEYXRhVmlldyhoZWFkZXJCdWZmZXIpO1xyXG4gICAgICAgICAgICBoZWFkZXJCdWZmZXJWaWV3LnNldFVpbnQzMigwLCAweDQ2NTQ2YzY3LCB0cnVlKTsgLy9nbFRGXHJcbiAgICAgICAgICAgIGhlYWRlckJ1ZmZlclZpZXcuc2V0VWludDMyKDQsIDIsIHRydWUpOyAvLyB2ZXJzaW9uXHJcbiAgICAgICAgICAgIGhlYWRlckJ1ZmZlclZpZXcuc2V0VWludDMyKDgsIGJ5dGVMZW5ndGgsIHRydWUpOyAvLyB0b3RhbCBieXRlcyBpbiBmaWxlXHJcblxyXG4gICAgICAgICAgICAvL2pzb24gY2h1bmtcclxuICAgICAgICAgICAgY29uc3QganNvbkNodW5rQnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGNodW5rTGVuZ3RoUHJlZml4ICsganNvbkxlbmd0aCArIGpzb25QYWRkaW5nKTtcclxuICAgICAgICAgICAgY29uc3QganNvbkNodW5rQnVmZmVyVmlldyA9IG5ldyBEYXRhVmlldyhqc29uQ2h1bmtCdWZmZXIpO1xyXG4gICAgICAgICAgICBqc29uQ2h1bmtCdWZmZXJWaWV3LnNldFVpbnQzMigwLCBqc29uTGVuZ3RoICsganNvblBhZGRpbmcsIHRydWUpO1xyXG4gICAgICAgICAgICBqc29uQ2h1bmtCdWZmZXJWaWV3LnNldFVpbnQzMig0LCAweDRlNGY1MzRhLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vanNvbiBjaHVuayBieXRlc1xyXG4gICAgICAgICAgICBjb25zdCBqc29uRGF0YSA9IG5ldyBVaW50OEFycmF5KGpzb25DaHVua0J1ZmZlciwgY2h1bmtMZW5ndGhQcmVmaXgpO1xyXG4gICAgICAgICAgICAvLyBpZiBUZXh0RW5jb2RlciB3YXMgYXZhaWxhYmxlLCB3ZSBjYW4gc2ltcGx5IGNvcHkgdGhlIGVuY29kZWQgYXJyYXlcclxuICAgICAgICAgICAgaWYgKGVuY29kZWRKc29uVGV4dCkge1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGEuc2V0KGVuY29kZWRKc29uVGV4dCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBibGFua0NoYXJDb2RlID0gXCJfXCIuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbkxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhckNvZGUgPSBqc29uVGV4dC5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBjaGFyYWN0ZXIgZG9lc24ndCBmaXQgaW50byBhIHNpbmdsZSBVVEYtMTYgY29kZSB1bml0LCBqdXN0IHB1dCBhIGJsYW5rIGNoYXJhY3RlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSAhPSBqc29uVGV4dC5jb2RlUG9pbnRBdChpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqc29uRGF0YVtpXSA9IGJsYW5rQ2hhckNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAganNvbkRhdGFbaV0gPSBjaGFyQ29kZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vanNvbiBwYWRkaW5nXHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25QYWRkaW5nVmlldyA9IG5ldyBVaW50OEFycmF5KGpzb25DaHVua0J1ZmZlciwgY2h1bmtMZW5ndGhQcmVmaXggKyBqc29uTGVuZ3RoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBqc29uUGFkZGluZzsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBqc29uUGFkZGluZ1ZpZXdbaV0gPSAweDIwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2JpbmFyeSBjaHVua1xyXG4gICAgICAgICAgICBjb25zdCBiaW5hcnlDaHVua0J1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihjaHVua0xlbmd0aFByZWZpeCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJpbmFyeUNodW5rQnVmZmVyVmlldyA9IG5ldyBEYXRhVmlldyhiaW5hcnlDaHVua0J1ZmZlcik7XHJcbiAgICAgICAgICAgIGJpbmFyeUNodW5rQnVmZmVyVmlldy5zZXRVaW50MzIoMCwgYmluYXJ5QnVmZmVyLmJ5dGVMZW5ndGggKyBpbWFnZUJ5dGVMZW5ndGggKyBpbWFnZVBhZGRpbmcsIHRydWUpO1xyXG4gICAgICAgICAgICBiaW5hcnlDaHVua0J1ZmZlclZpZXcuc2V0VWludDMyKDQsIDB4MDA0ZTQ5NDIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gYmluYXJ5IHBhZGRpbmdcclxuICAgICAgICAgICAgY29uc3QgYmluUGFkZGluZ0J1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihiaW5QYWRkaW5nKTtcclxuICAgICAgICAgICAgY29uc3QgYmluUGFkZGluZ1ZpZXcgPSBuZXcgVWludDhBcnJheShiaW5QYWRkaW5nQnVmZmVyKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5QYWRkaW5nOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGJpblBhZGRpbmdWaWV3W2ldID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgaW1hZ2VQYWRkaW5nQnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGltYWdlUGFkZGluZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlUGFkZGluZ1ZpZXcgPSBuZXcgVWludDhBcnJheShpbWFnZVBhZGRpbmdCdWZmZXIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlUGFkZGluZzsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZVBhZGRpbmdWaWV3W2ldID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZ2xiRGF0YSA9IFtoZWFkZXJCdWZmZXIsIGpzb25DaHVua0J1ZmZlciwgYmluYXJ5Q2h1bmtCdWZmZXIsIGJpbmFyeUJ1ZmZlcl07XHJcblxyXG4gICAgICAgICAgICAvLyBiaW5hcnkgZGF0YVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29yZGVyZWRJbWFnZURhdGEubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGdsYkRhdGEucHVzaCh0aGlzLl9vcmRlcmVkSW1hZ2VEYXRhW2ldLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnbGJEYXRhLnB1c2goYmluUGFkZGluZ0J1ZmZlcik7XHJcblxyXG4gICAgICAgICAgICBnbGJEYXRhLnB1c2goaW1hZ2VQYWRkaW5nQnVmZmVyKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdsYkZpbGUgPSBuZXcgQmxvYihnbGJEYXRhLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBuZXcgR0xURkRhdGEoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmdsVEZGaWxlc1tnbGJGaWxlTmFtZV0gPSBnbGJGaWxlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvY2FsRW5naW5lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsRW5naW5lLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgVFJTIGZvciBlYWNoIG5vZGVcclxuICAgICAqIEBwYXJhbSBub2RlIGdsVEYgTm9kZSBmb3Igc3RvcmluZyB0aGUgdHJhbnNmb3JtYXRpb24gZGF0YVxyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlIEJhYnlsb24gbWVzaCB1c2VkIGFzIHRoZSBzb3VyY2UgZm9yIHRoZSB0cmFuc2Zvcm1hdGlvbiBkYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldE5vZGVUcmFuc2Zvcm1hdGlvbihub2RlOiBJTm9kZSwgYmFieWxvblRyYW5zZm9ybU5vZGU6IFRyYW5zZm9ybU5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWJhYnlsb25UcmFuc2Zvcm1Ob2RlLmdldFBpdm90UG9pbnQoKS5lcXVhbHNUb0Zsb2F0cygwLCAwLCAwKSkge1xyXG4gICAgICAgICAgICBUb29scy5XYXJuKFwiUGl2b3QgcG9pbnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluIHRoZSBnbFRGIHNlcmlhbGl6ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYmFieWxvblRyYW5zZm9ybU5vZGUucG9zaXRpb24uZXF1YWxzVG9GbG9hdHMoMCwgMCwgMCkpIHtcclxuICAgICAgICAgICAgbm9kZS50cmFuc2xhdGlvbiA9IGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnBvc2l0aW9uLmFzQXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghYmFieWxvblRyYW5zZm9ybU5vZGUuc2NhbGluZy5lcXVhbHNUb0Zsb2F0cygxLCAxLCAxKSkge1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gYmFieWxvblRyYW5zZm9ybU5vZGUuc2NhbGluZy5hc0FycmF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByb3RhdGlvblF1YXRlcm5pb24gPSBRdWF0ZXJuaW9uLlJvdGF0aW9uWWF3UGl0Y2hSb2xsKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnJvdGF0aW9uLnksIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnJvdGF0aW9uLngsIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnJvdGF0aW9uLnopO1xyXG4gICAgICAgIGlmIChiYWJ5bG9uVHJhbnNmb3JtTm9kZS5yb3RhdGlvblF1YXRlcm5pb24pIHtcclxuICAgICAgICAgICAgcm90YXRpb25RdWF0ZXJuaW9uLm11bHRpcGx5SW5QbGFjZShiYWJ5bG9uVHJhbnNmb3JtTm9kZS5yb3RhdGlvblF1YXRlcm5pb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIVF1YXRlcm5pb24uSXNJZGVudGl0eShyb3RhdGlvblF1YXRlcm5pb24pKSB7XHJcbiAgICAgICAgICAgIG5vZGUucm90YXRpb24gPSByb3RhdGlvblF1YXRlcm5pb24ubm9ybWFsaXplKCkuYXNBcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZXRDYW1lcmFUcmFuc2Zvcm1hdGlvbihub2RlOiBJTm9kZSwgYmFieWxvbkNhbWVyYTogQ2FtZXJhKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFiYWJ5bG9uQ2FtZXJhLnBvc2l0aW9uLmVxdWFsc1RvRmxvYXRzKDAsIDAsIDApKSB7XHJcbiAgICAgICAgICAgIG5vZGUudHJhbnNsYXRpb24gPSBiYWJ5bG9uQ2FtZXJhLnBvc2l0aW9uLmFzQXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJvdGF0aW9uUXVhdGVybmlvbiA9ICg8YW55PmJhYnlsb25DYW1lcmEpLnJvdGF0aW9uUXVhdGVybmlvbjsgLy8gd2UgdGFyZ2V0IHRoZSBsb2NhbCB0cmFuc2Zvcm1hdGlvbiBpZiBvbmUuXHJcblxyXG4gICAgICAgIGlmIChyb3RhdGlvblF1YXRlcm5pb24gJiYgIVF1YXRlcm5pb24uSXNJZGVudGl0eShyb3RhdGlvblF1YXRlcm5pb24pKSB7XHJcbiAgICAgICAgICAgIG5vZGUucm90YXRpb24gPSByb3RhdGlvblF1YXRlcm5pb24ubm9ybWFsaXplKCkuYXNBcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRWZXJ0ZXhCdWZmZXJGcm9tTWVzaChhdHRyaWJ1dGVLaW5kOiBzdHJpbmcsIGJ1ZmZlck1lc2g6IE1lc2gpOiBOdWxsYWJsZTxWZXJ0ZXhCdWZmZXI+IHtcclxuICAgICAgICBpZiAoYnVmZmVyTWVzaC5pc1ZlcnRpY2VzRGF0YVByZXNlbnQoYXR0cmlidXRlS2luZCwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgY29uc3QgdmVydGV4QnVmZmVyID0gYnVmZmVyTWVzaC5nZXRWZXJ0ZXhCdWZmZXIoYXR0cmlidXRlS2luZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh2ZXJ0ZXhCdWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2ZXJ0ZXhCdWZmZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgYnVmZmVydmlldyBiYXNlZCBvbiB0aGUgdmVydGljZXMgdHlwZSBmb3IgdGhlIEJhYnlsb24gbWVzaFxyXG4gICAgICogQHBhcmFtIGtpbmQgSW5kaWNhdGVzIHRoZSB0eXBlIG9mIHZlcnRpY2VzIGRhdGFcclxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVDb21wb25lbnRLaW5kIEluZGljYXRlcyB0aGUgbnVtZXJpY2FsIHR5cGUgdXNlZCB0byBzdG9yZSB0aGUgZGF0YVxyXG4gICAgICogQHBhcmFtIGJhYnlsb25UcmFuc2Zvcm1Ob2RlIFRoZSBCYWJ5bG9uIG1lc2ggdG8gZ2V0IHRoZSB2ZXJ0aWNlcyBkYXRhIGZyb21cclxuICAgICAqIEBwYXJhbSBiaW5hcnlXcml0ZXIgVGhlIGJ1ZmZlciB0byB3cml0ZSB0aGUgYnVmZmVydmlldyBkYXRhIHRvXHJcbiAgICAgKiBAcGFyYW0gYnl0ZVN0cmlkZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jcmVhdGVCdWZmZXJWaWV3S2luZChcclxuICAgICAgICBraW5kOiBzdHJpbmcsXHJcbiAgICAgICAgYXR0cmlidXRlQ29tcG9uZW50S2luZDogQWNjZXNzb3JDb21wb25lbnRUeXBlLFxyXG4gICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlLFxyXG4gICAgICAgIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcixcclxuICAgICAgICBieXRlU3RyaWRlOiBudW1iZXJcclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlck1lc2ggPVxyXG4gICAgICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZSBpbnN0YW5jZW9mIE1lc2hcclxuICAgICAgICAgICAgICAgID8gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGFzIE1lc2gpXHJcbiAgICAgICAgICAgICAgICA6IGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGluc3RhbmNlb2YgSW5zdGFuY2VkTWVzaFxyXG4gICAgICAgICAgICAgICAgPyAoYmFieWxvblRyYW5zZm9ybU5vZGUgYXMgSW5zdGFuY2VkTWVzaCkuc291cmNlTWVzaFxyXG4gICAgICAgICAgICAgICAgOiBudWxsO1xyXG5cclxuICAgICAgICBpZiAoYnVmZmVyTWVzaCkge1xyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXhCdWZmZXIgPSBidWZmZXJNZXNoLmdldFZlcnRleEJ1ZmZlcihraW5kLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YSA9IGJ1ZmZlck1lc2guZ2V0VmVydGljZXNEYXRhKGtpbmQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2ZXJ0ZXhCdWZmZXIgJiYgdmVydGV4RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZUJ5dGVMZW5ndGggPSBWZXJ0ZXhCdWZmZXIuR2V0VHlwZUJ5dGVMZW5ndGgoYXR0cmlidXRlQ29tcG9uZW50S2luZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBieXRlTGVuZ3RoID0gdmVydGV4RGF0YS5sZW5ndGggKiB0eXBlQnl0ZUxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpLCBieXRlTGVuZ3RoLCBieXRlU3RyaWRlLCBraW5kICsgXCIgLSBcIiArIGJ1ZmZlck1lc2gubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXJWaWV3cy5wdXNoKGJ1ZmZlclZpZXcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXRlQXR0cmlidXRlRGF0YShraW5kLCBhdHRyaWJ1dGVDb21wb25lbnRLaW5kLCB2ZXJ0ZXhEYXRhLCBieXRlU3RyaWRlIC8gdHlwZUJ5dGVMZW5ndGgsIGJpbmFyeVdyaXRlciwgYmFieWxvblRyYW5zZm9ybU5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGJ1ZmZlcnZpZXcgYmFzZWQgb24gdGhlIHZlcnRpY2VzIHR5cGUgZm9yIHRoZSBCYWJ5bG9uIG1lc2hcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uU3ViTWVzaCBUaGUgQmFieWxvbiBzdWJtZXNoIHRoYXQgdGhlIG1vcnBoIHRhcmdldCBpcyBhcHBsaWVkIHRvXHJcbiAgICAgKiBAcGFyYW0gbWVzaFByaW1pdGl2ZVxyXG4gICAgICogQHBhcmFtIGJhYnlsb25Nb3JwaFRhcmdldCB0aGUgbW9ycGggdGFyZ2V0IHRvIGJlIGV4cG9ydGVkXHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyIFRoZSBidWZmZXIgdG8gd3JpdGUgdGhlIGJ1ZmZlcnZpZXcgZGF0YSB0b1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXRNb3JwaFRhcmdldEF0dHJpYnV0ZXMoYmFieWxvblN1Yk1lc2g6IFN1Yk1lc2gsIG1lc2hQcmltaXRpdmU6IElNZXNoUHJpbWl0aXZlLCBiYWJ5bG9uTW9ycGhUYXJnZXQ6IE1vcnBoVGFyZ2V0LCBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIpIHtcclxuICAgICAgICBpZiAoYmFieWxvbk1vcnBoVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmICghbWVzaFByaW1pdGl2ZS50YXJnZXRzKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNoUHJpbWl0aXZlLnRhcmdldHMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQ6IHsgW2F0dHJpYnV0ZTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuICAgICAgICAgICAgY29uc3QgbWVzaCA9IGJhYnlsb25TdWJNZXNoLmdldE1lc2goKSBhcyBNZXNoO1xyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1vcnBoVGFyZ2V0Lmhhc05vcm1hbHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleE5vcm1hbHMgPSBtZXNoLmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpITtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vcnBoTm9ybWFscyA9IGJhYnlsb25Nb3JwaFRhcmdldC5nZXROb3JtYWxzKCkhO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBiYWJ5bG9uU3ViTWVzaC52ZXJ0aWNlc0NvdW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnl0ZVN0cmlkZSA9IDEyOyAvLyAzIHggNCBieXRlIGZsb2F0c1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnl0ZUxlbmd0aCA9IGNvdW50ICogYnl0ZVN0cmlkZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpLCBieXRlTGVuZ3RoLCBieXRlU3RyaWRlLCBiYWJ5bG9uTW9ycGhUYXJnZXQubmFtZSArIFwiX05PUk1BTFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlclZpZXdzLnB1c2goYnVmZmVyVmlldyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyVmlld0luZGV4ID0gdGhpcy5fYnVmZmVyVmlld3MubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY2Vzc29yID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUFjY2Vzc29yKFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXdJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTW9ycGhUYXJnZXQubmFtZSArIFwiIC0gXCIgKyBcIk5PUk1BTFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yVHlwZS5WRUMzLFxyXG4gICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc29ycy5wdXNoKGFjY2Vzc29yKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5OT1JNQUwgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRlTW9ycGhUYXJnZXRBdHRyaWJ1dGVEYXRhKFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kLCBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVQsIGJhYnlsb25TdWJNZXNoLCB2ZXJ0ZXhOb3JtYWxzLCBtb3JwaE5vcm1hbHMsIGJ5dGVTdHJpZGUgLyA0LCBiaW5hcnlXcml0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTW9ycGhUYXJnZXQuaGFzUG9zaXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhQb3NpdGlvbnMgPSBtZXNoLmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSkhO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9ycGhQb3NpdGlvbnMgPSBiYWJ5bG9uTW9ycGhUYXJnZXQuZ2V0UG9zaXRpb25zKCkhO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBiYWJ5bG9uU3ViTWVzaC52ZXJ0aWNlc0NvdW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnl0ZVN0cmlkZSA9IDEyOyAvLyAzIHggNCBieXRlIGZsb2F0c1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnl0ZUxlbmd0aCA9IGNvdW50ICogYnl0ZVN0cmlkZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpLCBieXRlTGVuZ3RoLCBieXRlU3RyaWRlLCBiYWJ5bG9uTW9ycGhUYXJnZXQubmFtZSArIFwiX1BPU0lUSU9OXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyVmlld3MucHVzaChidWZmZXJWaWV3KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWZmZXJWaWV3SW5kZXggPSB0aGlzLl9idWZmZXJWaWV3cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWluTWF4ID0geyBtaW46IG5ldyBWZWN0b3IzKEluZmluaXR5LCBJbmZpbml0eSwgSW5maW5pdHkpLCBtYXg6IG5ldyBWZWN0b3IzKC1JbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHkpIH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhY2Nlc3NvciA9IF9HTFRGVXRpbGl0aWVzLl9DcmVhdGVBY2Nlc3NvcihcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXJWaWV3SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1vcnBoVGFyZ2V0Lm5hbWUgKyBcIiAtIFwiICsgXCJQT1NJVElPTlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yVHlwZS5WRUMzLFxyXG4gICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc29ycy5wdXNoKGFjY2Vzc29yKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5QT1NJVElPTiA9IHRoaXMuX2FjY2Vzc29ycy5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVNb3JwaFRhcmdldEF0dHJpYnV0ZURhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCxcclxuICAgICAgICAgICAgICAgICAgICBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvblN1Yk1lc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4UG9zaXRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vcnBoUG9zaXRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGVTdHJpZGUgLyA0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlcixcclxuICAgICAgICAgICAgICAgICAgICBtaW5NYXhcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3Nvci5taW4gPSBtaW5NYXgubWluIS5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3Nvci5tYXggPSBtaW5NYXgubWF4IS5hc0FycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJhYnlsb25Nb3JwaFRhcmdldC5oYXNUYW5nZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmVydGV4VGFuZ2VudHMgPSBtZXNoLmdldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuVGFuZ2VudEtpbmQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKSE7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb3JwaFRhbmdlbnRzID0gYmFieWxvbk1vcnBoVGFyZ2V0LmdldFRhbmdlbnRzKCkhO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBiYWJ5bG9uU3ViTWVzaC52ZXJ0aWNlc0NvdW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnl0ZVN0cmlkZSA9IDEyOyAvLyAzIHggNCBieXRlIGZsb2F0c1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnl0ZUxlbmd0aCA9IGNvdW50ICogYnl0ZVN0cmlkZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQnVmZmVyVmlldygwLCBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpLCBieXRlTGVuZ3RoLCBieXRlU3RyaWRlLCBiYWJ5bG9uTW9ycGhUYXJnZXQubmFtZSArIFwiX05PUk1BTFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlclZpZXdzLnB1c2goYnVmZmVyVmlldyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyVmlld0luZGV4ID0gdGhpcy5fYnVmZmVyVmlld3MubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjY2Vzc29yID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUFjY2Vzc29yKFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXdJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTW9ycGhUYXJnZXQubmFtZSArIFwiIC0gXCIgKyBcIlRBTkdFTlRcIixcclxuICAgICAgICAgICAgICAgICAgICBBY2Nlc3NvclR5cGUuVkVDMyxcclxuICAgICAgICAgICAgICAgICAgICBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2Nlc3NvcnMucHVzaChhY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuVEFOR0VOVCA9IHRoaXMuX2FjY2Vzc29ycy5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVNb3JwaFRhcmdldEF0dHJpYnV0ZURhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgVmVydGV4QnVmZmVyLlRhbmdlbnRLaW5kLFxyXG4gICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCxcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uU3ViTWVzaCxcclxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhUYW5nZW50cyxcclxuICAgICAgICAgICAgICAgICAgICBtb3JwaFRhbmdlbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGVTdHJpZGUgLyA0LFxyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlclxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZXNoUHJpbWl0aXZlLnRhcmdldHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBwcmltaXRpdmUgbW9kZSBvZiB0aGUgQmFieWxvbiBtZXNoXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1lc2ggVGhlIEJhYnlsb25KUyBtZXNoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldE1lc2hQcmltaXRpdmVNb2RlKGJhYnlsb25NZXNoOiBBYnN0cmFjdE1lc2gpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChiYWJ5bG9uTWVzaCBpbnN0YW5jZW9mIExpbmVzTWVzaCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0ZXJpYWwuTGluZUxpc3REcmF3TW9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJhYnlsb25NZXNoIGluc3RhbmNlb2YgSW5zdGFuY2VkTWVzaCB8fCBiYWJ5bG9uTWVzaCBpbnN0YW5jZW9mIE1lc2gpIHtcclxuICAgICAgICAgICAgY29uc3QgYmFzZU1lc2ggPSBiYWJ5bG9uTWVzaCBpbnN0YW5jZW9mIE1lc2ggPyBiYWJ5bG9uTWVzaCA6IGJhYnlsb25NZXNoLnNvdXJjZU1lc2g7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmFzZU1lc2gub3ZlcnJpZGVSZW5kZXJpbmdGaWxsTW9kZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhc2VNZXNoLm92ZXJyaWRlUmVuZGVyaW5nRmlsbE1vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJhYnlsb25NZXNoLm1hdGVyaWFsID8gYmFieWxvbk1lc2gubWF0ZXJpYWwuZmlsbE1vZGUgOiBNYXRlcmlhbC5UcmlhbmdsZUZpbGxNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgcHJpbWl0aXZlIG1vZGUgb2YgdGhlIGdsVEYgbWVzaCBwcmltaXRpdmVcclxuICAgICAqIEBwYXJhbSBtZXNoUHJpbWl0aXZlIGdsVEYgbWVzaCBwcmltaXRpdmVcclxuICAgICAqIEBwYXJhbSBwcmltaXRpdmVNb2RlIFRoZSBwcmltaXRpdmUgbW9kZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXRQcmltaXRpdmVNb2RlKG1lc2hQcmltaXRpdmU6IElNZXNoUHJpbWl0aXZlLCBwcmltaXRpdmVNb2RlOiBudW1iZXIpIHtcclxuICAgICAgICBzd2l0Y2ggKHByaW1pdGl2ZU1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBNYXRlcmlhbC5UcmlhbmdsZUZpbGxNb2RlOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBnbFRGIGRlZmF1bHRzIHRvIHVzaW5nIFRyaWFuZ2xlIE1vZGVcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuVHJpYW5nbGVTdHJpcERyYXdNb2RlOiB7XHJcbiAgICAgICAgICAgICAgICBtZXNoUHJpbWl0aXZlLm1vZGUgPSBNZXNoUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9TVFJJUDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuVHJpYW5nbGVGYW5EcmF3TW9kZToge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5tb2RlID0gTWVzaFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVfRkFOO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBNYXRlcmlhbC5Qb2ludExpc3REcmF3TW9kZToge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5tb2RlID0gTWVzaFByaW1pdGl2ZU1vZGUuUE9JTlRTO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBNYXRlcmlhbC5Qb2ludEZpbGxNb2RlOiB7XHJcbiAgICAgICAgICAgICAgICBtZXNoUHJpbWl0aXZlLm1vZGUgPSBNZXNoUHJpbWl0aXZlTW9kZS5QT0lOVFM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLkxpbmVMb29wRHJhd01vZGU6IHtcclxuICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUubW9kZSA9IE1lc2hQcmltaXRpdmVNb2RlLkxJTkVfTE9PUDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWwuTGluZUxpc3REcmF3TW9kZToge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5tb2RlID0gTWVzaFByaW1pdGl2ZU1vZGUuTElORVM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIE1hdGVyaWFsLkxpbmVTdHJpcERyYXdNb2RlOiB7XHJcbiAgICAgICAgICAgICAgICBtZXNoUHJpbWl0aXZlLm1vZGUgPSBNZXNoUHJpbWl0aXZlTW9kZS5MSU5FX1NUUklQO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB2ZXJ0ZXggYXR0cmlidXRlIGFjY2Vzc29yIGJhc2VkIG9mIHRoZSBnbFRGIG1lc2ggcHJpbWl0aXZlXHJcbiAgICAgKiBAcGFyYW0gbWVzaFByaW1pdGl2ZSBnbFRGIG1lc2ggcHJpbWl0aXZlXHJcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlS2luZCB2ZXJ0ZXggYXR0cmlidXRlXHJcbiAgICAgKiBAcmV0dXJucyBib29sZWFuIHNwZWNpZnlpbmcgaWYgdXYgY29vcmRpbmF0ZXMgYXJlIHByZXNlbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2V0QXR0cmlidXRlS2luZChtZXNoUHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSwgYXR0cmlidXRlS2luZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChhdHRyaWJ1dGVLaW5kKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZDoge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5hdHRyaWJ1dGVzLlBPU0lUSU9OID0gdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBtZXNoUHJpbWl0aXZlLmF0dHJpYnV0ZXMuTk9STUFMID0gdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5Db2xvcktpbmQ6IHtcclxuICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUuYXR0cmlidXRlcy5DT0xPUl8wID0gdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5UYW5nZW50S2luZDoge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5hdHRyaWJ1dGVzLlRBTkdFTlQgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlVWS2luZDoge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5hdHRyaWJ1dGVzLlRFWENPT1JEXzAgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLlVWMktpbmQ6IHtcclxuICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUuYXR0cmlidXRlcy5URVhDT09SRF8xID0gdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5NYXRyaWNlc0luZGljZXNLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBtZXNoUHJpbWl0aXZlLmF0dHJpYnV0ZXMuSk9JTlRTXzAgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0V4dHJhS2luZDoge1xyXG4gICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5hdHRyaWJ1dGVzLkpPSU5UU18xID0gdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5NYXRyaWNlc1dlaWdodHNLaW5kOiB7XHJcbiAgICAgICAgICAgICAgICBtZXNoUHJpbWl0aXZlLmF0dHJpYnV0ZXMuV0VJR0hUU18wID0gdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFZlcnRleEJ1ZmZlci5NYXRyaWNlc1dlaWdodHNFeHRyYUtpbmQ6IHtcclxuICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUuYXR0cmlidXRlcy5XRUlHSFRTXzEgPSB0aGlzLl9hY2Nlc3NvcnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJVbnN1cHBvcnRlZCBWZXJ0ZXggQnVmZmVyIFR5cGU6IFwiICsgYXR0cmlidXRlS2luZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGRhdGEgZm9yIHRoZSBwcmltaXRpdmUgYXR0cmlidXRlcyBvZiBlYWNoIHN1Ym1lc2hcclxuICAgICAqIEBwYXJhbSBtZXNoIGdsVEYgTWVzaCBvYmplY3QgdG8gc3RvcmUgdGhlIHByaW1pdGl2ZSBhdHRyaWJ1dGUgaW5mb3JtYXRpb25cclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uVHJhbnNmb3JtTm9kZSBCYWJ5bG9uIG1lc2ggdG8gZ2V0IHRoZSBwcmltaXRpdmUgYXR0cmlidXRlIGRhdGEgZnJvbVxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBCdWZmZXIgdG8gd3JpdGUgdGhlIGF0dHJpYnV0ZSBkYXRhIHRvXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldFByaW1pdGl2ZUF0dHJpYnV0ZXNBc3luYyhtZXNoOiBJTWVzaCwgYmFieWxvblRyYW5zZm9ybU5vZGU6IFRyYW5zZm9ybU5vZGUsIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzOiBQcm9taXNlPElNZXNoUHJpbWl0aXZlPltdID0gW107XHJcbiAgICAgICAgbGV0IGJ1ZmZlck1lc2g6IE51bGxhYmxlPE1lc2g+ID0gbnVsbDtcclxuICAgICAgICBsZXQgYnVmZmVyVmlldzogSUJ1ZmZlclZpZXc7XHJcbiAgICAgICAgbGV0IG1pbk1heDogeyBtaW46IE51bGxhYmxlPG51bWJlcltdPjsgbWF4OiBOdWxsYWJsZTxudW1iZXJbXT4gfTtcclxuXHJcbiAgICAgICAgaWYgKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGluc3RhbmNlb2YgTWVzaCkge1xyXG4gICAgICAgICAgICBidWZmZXJNZXNoID0gYmFieWxvblRyYW5zZm9ybU5vZGUgYXMgTWVzaDtcclxuICAgICAgICB9IGVsc2UgaWYgKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGluc3RhbmNlb2YgSW5zdGFuY2VkTWVzaCkge1xyXG4gICAgICAgICAgICBidWZmZXJNZXNoID0gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlIGFzIEluc3RhbmNlZE1lc2gpLnNvdXJjZU1lc2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZURhdGE6IF9JVmVydGV4QXR0cmlidXRlRGF0YVtdID0gW1xyXG4gICAgICAgICAgICB7IGtpbmQ6IFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzMsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBieXRlU3RyaWRlOiAxMiB9LFxyXG4gICAgICAgICAgICB7IGtpbmQ6IFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kLCBhY2Nlc3NvclR5cGU6IEFjY2Vzc29yVHlwZS5WRUMzLCBhY2Nlc3NvckNvbXBvbmVudFR5cGU6IEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCwgYnl0ZVN0cmlkZTogMTIgfSxcclxuICAgICAgICAgICAgeyBraW5kOiBWZXJ0ZXhCdWZmZXIuQ29sb3JLaW5kLCBhY2Nlc3NvclR5cGU6IEFjY2Vzc29yVHlwZS5WRUM0LCBhY2Nlc3NvckNvbXBvbmVudFR5cGU6IEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCwgYnl0ZVN0cmlkZTogMTYgfSxcclxuICAgICAgICAgICAgeyBraW5kOiBWZXJ0ZXhCdWZmZXIuVGFuZ2VudEtpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzQsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBieXRlU3RyaWRlOiAxNiB9LFxyXG4gICAgICAgICAgICB7IGtpbmQ6IFZlcnRleEJ1ZmZlci5VVktpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzIsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBieXRlU3RyaWRlOiA4IH0sXHJcbiAgICAgICAgICAgIHsga2luZDogVmVydGV4QnVmZmVyLlVWMktpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzIsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FULCBieXRlU3RyaWRlOiA4IH0sXHJcbiAgICAgICAgICAgIHsga2luZDogVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0tpbmQsIGFjY2Vzc29yVHlwZTogQWNjZXNzb3JUeXBlLlZFQzQsIGFjY2Vzc29yQ29tcG9uZW50VHlwZTogQWNjZXNzb3JDb21wb25lbnRUeXBlLlVOU0lHTkVEX1NIT1JULCBieXRlU3RyaWRlOiA4IH0sXHJcbiAgICAgICAgICAgIHsga2luZDogVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0V4dHJhS2luZCwgYWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGUuVkVDNCwgYWNjZXNzb3JDb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfU0hPUlQsIGJ5dGVTdHJpZGU6IDggfSxcclxuICAgICAgICAgICAgeyBraW5kOiBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNXZWlnaHRzS2luZCwgYWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGUuVkVDNCwgYWNjZXNzb3JDb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVQsIGJ5dGVTdHJpZGU6IDE2IH0sXHJcbiAgICAgICAgICAgIHsga2luZDogVmVydGV4QnVmZmVyLk1hdHJpY2VzV2VpZ2h0c0V4dHJhS2luZCwgYWNjZXNzb3JUeXBlOiBBY2Nlc3NvclR5cGUuVkVDNCwgYWNjZXNzb3JDb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUuRkxPQVQsIGJ5dGVTdHJpZGU6IDE2IH0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgaWYgKGJ1ZmZlck1lc2gpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4QnVmZmVyVmlld0luZGV4OiBOdWxsYWJsZTxudW1iZXI+ID0gbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlTW9kZSA9IHRoaXMuX2dldE1lc2hQcmltaXRpdmVNb2RlKGJ1ZmZlck1lc2gpO1xyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXhBdHRyaWJ1dGVCdWZmZXJWaWV3czogeyBbYXR0cmlidXRlS2luZDogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRNYW5hZ2VyID0gYnVmZmVyTWVzaC5tb3JwaFRhcmdldE1hbmFnZXI7XHJcblxyXG4gICAgICAgICAgICAvLyBGb3IgZWFjaCBCYWJ5bG9uTWVzaCwgY3JlYXRlIGJ1ZmZlcnZpZXdzIGZvciBlYWNoICdraW5kJ1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiBhdHRyaWJ1dGVEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVLaW5kID0gYXR0cmlidXRlLmtpbmQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVDb21wb25lbnRLaW5kID0gYXR0cmlidXRlLmFjY2Vzc29yQ29tcG9uZW50VHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmZXJNZXNoLmlzVmVydGljZXNEYXRhUHJlc2VudChhdHRyaWJ1dGVLaW5kLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleEJ1ZmZlciA9IHRoaXMuX2dldFZlcnRleEJ1ZmZlckZyb21NZXNoKGF0dHJpYnV0ZUtpbmQsIGJ1ZmZlck1lc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5ieXRlU3RyaWRlID0gdmVydGV4QnVmZmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdmVydGV4QnVmZmVyLmdldFNpemUoKSAqIFZlcnRleEJ1ZmZlci5HZXRUeXBlQnl0ZUxlbmd0aChhdHRyaWJ1dGUuYWNjZXNzb3JDb21wb25lbnRUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFZlcnRleEJ1ZmZlci5EZWR1Y2VTdHJpZGUoYXR0cmlidXRlS2luZCkgKiA0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUuYnl0ZVN0cmlkZSA9PT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLmFjY2Vzc29yVHlwZSA9IEFjY2Vzc29yVHlwZS5WRUMzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQnVmZmVyVmlld0tpbmQoYXR0cmlidXRlS2luZCwgYXR0cmlidXRlQ29tcG9uZW50S2luZCwgYmFieWxvblRyYW5zZm9ybU5vZGUsIGJpbmFyeVdyaXRlciwgYXR0cmlidXRlLmJ5dGVTdHJpZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZS5idWZmZXJWaWV3SW5kZXggPSB0aGlzLl9idWZmZXJWaWV3cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEF0dHJpYnV0ZUJ1ZmZlclZpZXdzW2F0dHJpYnV0ZUtpbmRdID0gYXR0cmlidXRlLmJ1ZmZlclZpZXdJbmRleDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGJ1ZmZlck1lc2guZ2V0VG90YWxJbmRpY2VzKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGljZXMgPSBidWZmZXJNZXNoLmdldEluZGljZXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnl0ZUxlbmd0aCA9IGluZGljZXMubGVuZ3RoICogNDtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXJWaWV3ID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUJ1ZmZlclZpZXcoMCwgYmluYXJ5V3JpdGVyLmdldEJ5dGVPZmZzZXQoKSwgYnl0ZUxlbmd0aCwgdW5kZWZpbmVkLCBcIkluZGljZXMgLSBcIiArIGJ1ZmZlck1lc2gubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyVmlld3MucHVzaChidWZmZXJWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleEJ1ZmZlclZpZXdJbmRleCA9IHRoaXMuX2J1ZmZlclZpZXdzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwLCBsZW5ndGggPSBpbmRpY2VzLmxlbmd0aDsgayA8IGxlbmd0aDsgKytrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlci5zZXRVSW50MzIoaW5kaWNlc1trXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYnVmZmVyTWVzaC5zdWJNZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGdvIHRocm91Z2ggYWxsIG1lc2ggcHJpbWl0aXZlcyAoc3VibWVzaGVzKVxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdWJtZXNoIG9mIGJ1ZmZlck1lc2guc3ViTWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhYnlsb25NYXRlcmlhbCA9IHN1Ym1lc2guZ2V0TWF0ZXJpYWwoKSB8fCBidWZmZXJNZXNoLmdldFNjZW5lKCkuZGVmYXVsdE1hdGVyaWFsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0ZXJpYWxJbmRleDogTnVsbGFibGU8bnVtYmVyPiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyTWVzaCBpbnN0YW5jZW9mIExpbmVzTWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjb2xvciBmcm9tIHRoZSBsaW5lcyBtZXNoIGFuZCBzZXQgaXQgaW4gdGhlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbDogSU1hdGVyaWFsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGJ1ZmZlck1lc2gubmFtZSArIFwiIG1hdGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFidWZmZXJNZXNoLmNvbG9yLmVxdWFscyhDb2xvcjMuV2hpdGUoKSkgfHwgYnVmZmVyTWVzaC5hbHBoYSA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5wYnJNZXRhbGxpY1JvdWdobmVzcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yRmFjdG9yOiBidWZmZXJNZXNoLmNvbG9yLmFzQXJyYXkoKS5jb25jYXQoW2J1ZmZlck1lc2guYWxwaGFdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxJbmRleCA9IHRoaXMuX21hdGVyaWFscy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIE11bHRpTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk1hdGVyaWFsID0gYmFieWxvbk1hdGVyaWFsLnN1Yk1hdGVyaWFsc1tzdWJtZXNoLm1hdGVyaWFsSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Yk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsID0gc3ViTWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxJbmRleCA9IHRoaXMuX21hdGVyaWFsTWFwW2JhYnlsb25NYXRlcmlhbC51bmlxdWVJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbEluZGV4ID0gdGhpcy5fbWF0ZXJpYWxNYXBbYmFieWxvbk1hdGVyaWFsLnVuaXF1ZUlkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2xURk1hdGVyaWFsOiBOdWxsYWJsZTxJTWF0ZXJpYWw+ID0gbWF0ZXJpYWxJbmRleCAhPSBudWxsID8gdGhpcy5fbWF0ZXJpYWxzW21hdGVyaWFsSW5kZXhdIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzaFByaW1pdGl2ZTogSU1lc2hQcmltaXRpdmUgPSB7IGF0dHJpYnV0ZXM6IHt9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0UHJpbWl0aXZlTW9kZShtZXNoUHJpbWl0aXZlLCBwcmltaXRpdmVNb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgYXR0cmlidXRlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVLaW5kID0gYXR0cmlidXRlLmtpbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYXR0cmlidXRlS2luZCA9PT0gVmVydGV4QnVmZmVyLlVWS2luZCB8fCBhdHRyaWJ1dGVLaW5kID09PSBWZXJ0ZXhCdWZmZXIuVVYyS2luZCkgJiYgIXRoaXMuX29wdGlvbnMuZXhwb3J0VW51c2VkVVZzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdsVEZNYXRlcmlhbCB8fCAhdGhpcy5fZ2xURk1hdGVyaWFsRXhwb3J0ZXIuX2hhc1RleHR1cmVzUHJlc2VudChnbFRGTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVydGV4RGF0YSA9IGJ1ZmZlck1lc2guZ2V0VmVydGljZXNEYXRhKGF0dHJpYnV0ZUtpbmQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcnRleEJ1ZmZlciA9IHRoaXMuX2dldFZlcnRleEJ1ZmZlckZyb21NZXNoKGF0dHJpYnV0ZUtpbmQsIGJ1ZmZlck1lc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleEJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0cmlkZSA9IHZlcnRleEJ1ZmZlci5nZXRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyVmlld0luZGV4ID0gYXR0cmlidXRlLmJ1ZmZlclZpZXdJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyVmlld0luZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgYnVmZmVydmlld2luZGV4IGhhcyBhIG51bWVyaWMgdmFsdWUgYXNzaWduZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbk1heCA9IHsgbWluOiBudWxsLCBtYXg6IG51bGwgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZUtpbmQgPT0gVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluTWF4ID0gX0dMVEZVdGlsaXRpZXMuX0NhbGN1bGF0ZU1pbk1heFBvc2l0aW9ucyh2ZXJ0ZXhEYXRhLCAwLCB2ZXJ0ZXhEYXRhLmxlbmd0aCAvIHN0cmlkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWNjZXNzb3IgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQWNjZXNzb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXJWaWV3SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVLaW5kICsgXCIgLSBcIiArIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUuYWNjZXNzb3JUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLmFjY2Vzc29yQ29tcG9uZW50VHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRleERhdGEubGVuZ3RoIC8gc3RyaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbk1heC5taW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5NYXgubWF4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc29ycy5wdXNoKGFjY2Vzc29yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0QXR0cmlidXRlS2luZChtZXNoUHJpbWl0aXZlLCBhdHRyaWJ1dGVLaW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleEJ1ZmZlclZpZXdJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYWNjZXNzb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWNjZXNzb3IgPSBfR0xURlV0aWxpdGllcy5fQ3JlYXRlQWNjZXNzb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleEJ1ZmZlclZpZXdJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNlcyAtIFwiICsgYmFieWxvblRyYW5zZm9ybU5vZGUubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yVHlwZS5TQ0FMQVIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfSU5ULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWVzaC5pbmRleENvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWVzaC5pbmRleFN0YXJ0ICogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc29ycy5wdXNoKGFjY2Vzc29yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzaFByaW1pdGl2ZS5pbmRpY2VzID0gdGhpcy5fYWNjZXNzb3JzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWxJbmRleCAhPSBudWxsICYmIE9iamVjdC5rZXlzKG1lc2hQcmltaXRpdmUuYXR0cmlidXRlcykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaWRlT3JpZW50YXRpb24gPSBidWZmZXJNZXNoLm92ZXJyaWRlTWF0ZXJpYWxTaWRlT3JpZW50YXRpb24gIT09IG51bGwgPyBidWZmZXJNZXNoLm92ZXJyaWRlTWF0ZXJpYWxTaWRlT3JpZW50YXRpb24gOiBiYWJ5bG9uTWF0ZXJpYWwuc2lkZU9yaWVudGF0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpZGVPcmllbnRhdGlvbiA9PT0gKHRoaXMuX2JhYnlsb25TY2VuZS51c2VSaWdodEhhbmRlZFN5c3RlbSA/IE1hdGVyaWFsLkNsb2NrV2lzZVNpZGVPcmllbnRhdGlvbiA6IE1hdGVyaWFsLkNvdW50ZXJDbG9ja1dpc2VTaWRlT3JpZW50YXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnl0ZU9mZnNldCA9IGluZGV4QnVmZmVyVmlld0luZGV4ICE9IG51bGwgPyB0aGlzLl9idWZmZXJWaWV3c1tpbmRleEJ1ZmZlclZpZXdJbmRleF0uYnl0ZU9mZnNldCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnl0ZU9mZnNldCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFieWxvbkluZGljZXM6IE51bGxhYmxlPEluZGljZXNBcnJheT4gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4QnVmZmVyVmlld0luZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uSW5kaWNlcyA9IGJ1ZmZlck1lc2guZ2V0SW5kaWNlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25JbmRpY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVvcmRlckluZGljZXNCYXNlZE9uUHJpbWl0aXZlTW9kZShzdWJtZXNoLCBwcmltaXRpdmVNb2RlLCBiYWJ5bG9uSW5kaWNlcywgYnl0ZU9mZnNldCwgYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgYXR0cmlidXRlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhID0gYnVmZmVyTWVzaC5nZXRWZXJ0aWNlc0RhdGEoYXR0cmlidXRlLmtpbmQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRleERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVPZmZzZXQgPSB0aGlzLl9idWZmZXJWaWV3c1t2ZXJ0ZXhBdHRyaWJ1dGVCdWZmZXJWaWV3c1thdHRyaWJ1dGUua2luZF1dLmJ5dGVPZmZzZXQgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlb3JkZXJWZXJ0ZXhBdHRyaWJ1dGVEYXRhQmFzZWRPblByaW1pdGl2ZU1vZGUoc3VibWVzaCwgcHJpbWl0aXZlTW9kZSwgYXR0cmlidXRlLmtpbmQsIHZlcnRleERhdGEsIGJ5dGVPZmZzZXQsIGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2hQcmltaXRpdmUubWF0ZXJpYWwgPSBtYXRlcmlhbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9ycGhUYXJnZXRNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJ5IGNvbnZlbnRpb24sIG1vcnBoIHRhcmdldCBuYW1lcyBhcmUgc3RvcmVkIGluIHRoZSBtZXNoIGV4dHJhcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtZXNoLmV4dHJhcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaC5leHRyYXMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoLmV4dHJhcy50YXJnZXROYW1lcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3JwaFRhcmdldE1hbmFnZXIubnVtVGFyZ2V0czsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBtb3JwaFRhcmdldE1hbmFnZXIuZ2V0VGFyZ2V0KGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0TW9ycGhUYXJnZXRBdHRyaWJ1dGVzKHN1Ym1lc2gsIG1lc2hQcmltaXRpdmUsIHRhcmdldCwgYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2guZXh0cmFzLnRhcmdldE5hbWVzLnB1c2godGFyZ2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZXNoLnByaW1pdGl2ZXMucHVzaChtZXNoUHJpbWl0aXZlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uc1Bvc3RFeHBvcnRNZXNoUHJpbWl0aXZlQXN5bmMoXCJwb3N0RXhwb3J0XCIsIG1lc2hQcmltaXRpdmUsIHN1Ym1lc2gsIGJpbmFyeVdyaXRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8qIGRvIG5vdGhpbmcgKi9cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBnbFRGIHNjZW5lIGJhc2VkIG9uIHRoZSBhcnJheSBvZiBtZXNoZXNcclxuICAgICAqIFJldHVybnMgdGhlIHRvdGFsIGJ5dGUgb2Zmc2V0XHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblNjZW5lIEJhYnlsb24gc2NlbmUgdG8gZ2V0IHRoZSBtZXNoIGRhdGEgZnJvbVxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBCdWZmZXIgdG8gd3JpdGUgYmluYXJ5IGRhdGEgdG9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY3JlYXRlU2NlbmVBc3luYyhiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBzY2VuZTogSVNjZW5lID0geyBub2RlczogW10gfTtcclxuICAgICAgICBsZXQgZ2xURk5vZGVJbmRleDogbnVtYmVyO1xyXG4gICAgICAgIGxldCBnbFRGTm9kZTogSU5vZGU7XHJcbiAgICAgICAgbGV0IGRpcmVjdERlc2NlbmRlbnRzOiBOb2RlW107XHJcbiAgICAgICAgY29uc3Qgbm9kZXM6IE5vZGVbXSA9IFsuLi50aGlzLl9iYWJ5bG9uU2NlbmUudHJhbnNmb3JtTm9kZXMsIC4uLnRoaXMuX2JhYnlsb25TY2VuZS5tZXNoZXMsIC4uLnRoaXMuX2JhYnlsb25TY2VuZS5saWdodHMsIC4uLnRoaXMuX2JhYnlsb25TY2VuZS5jYW1lcmFzXTtcclxuICAgICAgICBjb25zdCByZW1vdmVkUm9vdE5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xyXG5cclxuICAgICAgICAvLyBTY2VuZSBtZXRhZGF0YVxyXG4gICAgICAgIGlmICh0aGlzLl9iYWJ5bG9uU2NlbmUubWV0YWRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubWV0YWRhdGFTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgc2NlbmUuZXh0cmFzID0gdGhpcy5fb3B0aW9ucy5tZXRhZGF0YVNlbGVjdG9yKHRoaXMuX2JhYnlsb25TY2VuZS5tZXRhZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYmFieWxvblNjZW5lLm1ldGFkYXRhLmdsdGYpIHtcclxuICAgICAgICAgICAgICAgIHNjZW5lLmV4dHJhcyA9IHRoaXMuX2JhYnlsb25TY2VuZS5tZXRhZGF0YS5nbHRmLmV4dHJhcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIG5vLW9wIHJvb3Qgbm9kZXNcclxuICAgICAgICBpZiAoKHRoaXMuX29wdGlvbnMucmVtb3ZlTm9vcFJvb3ROb2RlcyA/PyB0cnVlKSAmJiAhdGhpcy5fb3B0aW9ucy5pbmNsdWRlQ29vcmRpbmF0ZVN5c3RlbUNvbnZlcnNpb25Ob2Rlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvb3ROb2RlIG9mIHRoaXMuX2JhYnlsb25TY2VuZS5yb290Tm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc05vb3BOb2RlKHJvb3ROb2RlLCB0aGlzLl9iYWJ5bG9uU2NlbmUudXNlUmlnaHRIYW5kZWRTeXN0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZFJvb3ROb2Rlcy5hZGQocm9vdE5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBFeGNsdWRlIHRoZSBub2RlIGZyb20gbGlzdCBvZiBub2RlcyB0byBleHBvcnRcclxuICAgICAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2Uobm9kZXMuaW5kZXhPZihyb290Tm9kZSksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFeHBvcnQgYmFieWxvbiBjYW1lcmFzIHRvIGdsVEZDYW1lcmFcclxuICAgICAgICBjb25zdCBjYW1lcmFNYXAgPSBuZXcgTWFwPENhbWVyYSwgbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5jYW1lcmFzLmZvckVhY2goKGNhbWVyYSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMuc2hvdWxkRXhwb3J0Tm9kZSB8fCB0aGlzLl9vcHRpb25zLnNob3VsZEV4cG9ydE5vZGUoY2FtZXJhKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2xURkNhbWVyYTogSUNhbWVyYSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBjYW1lcmEubW9kZSA9PT0gQ2FtZXJhLlBFUlNQRUNUSVZFX0NBTUVSQSA/IENhbWVyYVR5cGUuUEVSU1BFQ1RJVkUgOiBDYW1lcmFUeXBlLk9SVEhPR1JBUEhJQyxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbWVyYS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xURkNhbWVyYS5uYW1lID0gY2FtZXJhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdsVEZDYW1lcmEudHlwZSA9PT0gQ2FtZXJhVHlwZS5QRVJTUEVDVElWRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsVEZDYW1lcmEucGVyc3BlY3RpdmUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiBjYW1lcmEuZ2V0RW5naW5lKCkuZ2V0QXNwZWN0UmF0aW8oY2FtZXJhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeWZvdjogY2FtZXJhLmZvdk1vZGUgPT09IENhbWVyYS5GT1ZNT0RFX1ZFUlRJQ0FMX0ZJWEVEID8gY2FtZXJhLmZvdiA6IGNhbWVyYS5mb3YgKiBjYW1lcmEuZ2V0RW5naW5lKCkuZ2V0QXNwZWN0UmF0aW8oY2FtZXJhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgem5lYXI6IGNhbWVyYS5taW5aLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB6ZmFyOiBjYW1lcmEubWF4WixcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChnbFRGQ2FtZXJhLnR5cGUgPT09IENhbWVyYVR5cGUuT1JUSE9HUkFQSElDKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFsZldpZHRoID0gY2FtZXJhLm9ydGhvTGVmdCAmJiBjYW1lcmEub3J0aG9SaWdodCA/IDAuNSAqIChjYW1lcmEub3J0aG9SaWdodCAtIGNhbWVyYS5vcnRob0xlZnQpIDogY2FtZXJhLmdldEVuZ2luZSgpLmdldFJlbmRlcldpZHRoKCkgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFsZkhlaWdodCA9IGNhbWVyYS5vcnRob0JvdHRvbSAmJiBjYW1lcmEub3J0aG9Ub3AgPyAwLjUgKiAoY2FtZXJhLm9ydGhvVG9wIC0gY2FtZXJhLm9ydGhvQm90dG9tKSA6IGNhbWVyYS5nZXRFbmdpbmUoKS5nZXRSZW5kZXJIZWlnaHQoKSAqIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICBnbFRGQ2FtZXJhLm9ydGhvZ3JhcGhpYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeG1hZzogaGFsZldpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5bWFnOiBoYWxmSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB6bmVhcjogY2FtZXJhLm1pblosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpmYXI6IGNhbWVyYS5tYXhaLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY2FtZXJhTWFwLnNldChjYW1lcmEsIHRoaXMuX2NhbWVyYXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbWVyYXMucHVzaChnbFRGQ2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBbZXhwb3J0Tm9kZXMsIGV4cG9ydE1hdGVyaWFsc10gPSB0aGlzLl9nZXRFeHBvcnROb2Rlcyhub2Rlcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsVEZNYXRlcmlhbEV4cG9ydGVyLl9jb252ZXJ0TWF0ZXJpYWxzVG9HTFRGQXN5bmMoZXhwb3J0TWF0ZXJpYWxzLCBJbWFnZU1pbWVUeXBlLlBORywgdHJ1ZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVOb2RlTWFwQW5kQW5pbWF0aW9uc0FzeW5jKGV4cG9ydE5vZGVzLCBiaW5hcnlXcml0ZXIpLnRoZW4oKG5vZGVNYXApID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVTa2luc0FzeW5jKG5vZGVNYXAsIGJpbmFyeVdyaXRlcikudGhlbigoc2tpbk1hcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25vZGVNYXAgPSBub2RlTWFwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3RhbEJ5dGVMZW5ndGggPSBiaW5hcnlXcml0ZXIuZ2V0Qnl0ZU9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b3RhbEJ5dGVMZW5ndGggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVuZGVmaW5lZCBieXRlIGxlbmd0aCFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBCdWlsZCBIaWVyYXJjaHkgd2l0aCB0aGUgbm9kZSBtYXAuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBiYWJ5bG9uTm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbFRGTm9kZUluZGV4ID0gdGhpcy5fbm9kZU1hcFtiYWJ5bG9uTm9kZS51bmlxdWVJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGTm9kZUluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsVEZOb2RlID0gdGhpcy5fbm9kZXNbZ2xURk5vZGVJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25Ob2RlLm1ldGFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubWV0YWRhdGFTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGTm9kZS5leHRyYXMgPSB0aGlzLl9vcHRpb25zLm1ldGFkYXRhU2VsZWN0b3IoYmFieWxvbk5vZGUubWV0YWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYmFieWxvbk5vZGUubWV0YWRhdGEuZ2x0Zikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGTm9kZS5leHRyYXMgPSBiYWJ5bG9uTm9kZS5tZXRhZGF0YS5nbHRmLmV4dHJhcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgQ2FtZXJhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURk5vZGUuY2FtZXJhID0gY2FtZXJhTWFwLmdldChiYWJ5bG9uTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc2hvdWxkRXhwb3J0Tm9kZSAmJiAhdGhpcy5fb3B0aW9ucy5zaG91bGRFeHBvcnROb2RlKGJhYnlsb25Ob2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xzLkxvZyhcIk9taXR0aW5nIFwiICsgYmFieWxvbk5vZGUubmFtZSArIFwiIGZyb20gc2NlbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJhYnlsb25Ob2RlLnBhcmVudCAmJiAhdGhpcy5fYmFieWxvblNjZW5lLnVzZVJpZ2h0SGFuZGVkU3lzdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnROb2RlSGFuZGVkbmVzcyhnbFRGTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJhYnlsb25Ob2RlLnBhcmVudCB8fCByZW1vdmVkUm9vdE5vZGVzLmhhcyhiYWJ5bG9uTm9kZS5wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLm5vZGVzLnB1c2goZ2xURk5vZGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTm9kZSBpbnN0YW5jZW9mIE1lc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk5vZGUuc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURk5vZGUuc2tpbiA9IHNraW5NYXBbYmFieWxvbk5vZGUuc2tlbGV0b24udW5pcXVlSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3REZXNjZW5kZW50cyA9IGJhYnlsb25Ob2RlLmdldERlc2NlbmRhbnRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnbFRGTm9kZS5jaGlsZHJlbiAmJiBkaXJlY3REZXNjZW5kZW50cyAmJiBkaXJlY3REZXNjZW5kZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbjogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRlc2NlbmRlbnQgb2YgZGlyZWN0RGVzY2VuZGVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25vZGVNYXBbZGVzY2VuZGVudC51bmlxdWVJZF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh0aGlzLl9ub2RlTWFwW2Rlc2NlbmRlbnQudW5pcXVlSWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsVEZOb2RlLmNoaWxkcmVuID0gY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2VuZS5ub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2NlbmVzLnB1c2goc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHRpbmcgdGhlIG5vZGVzIGFuZCBtYXRlcmlhbHMgdGhhdCB3b3VsZCBiZSBleHBvcnRlZC5cclxuICAgICAqIEBwYXJhbSBub2RlcyBCYWJ5bG9uIHRyYW5zZm9ybSBub2Rlc1xyXG4gICAgICogQHJldHVybnMgQXJyYXkgb2Ygbm9kZXMgd2hpY2ggd291bGQgYmUgZXhwb3J0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyBTZXQgb2YgbWF0ZXJpYWxzIHdoaWNoIHdvdWxkIGJlIGV4cG9ydGVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXRFeHBvcnROb2Rlcyhub2RlczogTm9kZVtdKTogW05vZGVbXSwgU2V0PE1hdGVyaWFsPl0ge1xyXG4gICAgICAgIGNvbnN0IGV4cG9ydE5vZGVzOiBOb2RlW10gPSBbXTtcclxuICAgICAgICBjb25zdCBleHBvcnRNYXRlcmlhbHM6IFNldDxNYXRlcmlhbD4gPSBuZXcgU2V0PE1hdGVyaWFsPigpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGJhYnlsb25Ob2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fb3B0aW9ucy5zaG91bGRFeHBvcnROb2RlIHx8IHRoaXMuX29wdGlvbnMuc2hvdWxkRXhwb3J0Tm9kZShiYWJ5bG9uTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGV4cG9ydE5vZGVzLnB1c2goYmFieWxvbk5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25NZXNoID0gYmFieWxvbk5vZGUgYXMgQWJzdHJhY3RNZXNoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NZXNoLnN1Yk1lc2hlcyAmJiBiYWJ5bG9uTWVzaC5zdWJNZXNoZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gYmFieWxvbk1lc2gubWF0ZXJpYWwgfHwgYmFieWxvbk1lc2guZ2V0U2NlbmUoKS5kZWZhdWx0TWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsIGluc3RhbmNlb2YgTXVsdGlNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1Yk1hdGVyaWFsIG9mIG1hdGVyaWFsLnN1Yk1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Yk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0TWF0ZXJpYWxzLmFkZChzdWJNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRNYXRlcmlhbHMuYWRkKG1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBgRXhjbHVkaW5nIG5vZGUgJHtiYWJ5bG9uTm9kZS5uYW1lfWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbZXhwb3J0Tm9kZXMsIGV4cG9ydE1hdGVyaWFsc107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbWFwcGluZyBvZiBOb2RlIHVuaXF1ZSBpZCB0byBub2RlIGluZGV4IGFuZCBoYW5kbGVzIGFuaW1hdGlvbnNcclxuICAgICAqIEBwYXJhbSBub2RlcyBCYWJ5bG9uIHRyYW5zZm9ybSBub2Rlc1xyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBCdWZmZXIgdG8gd3JpdGUgYmluYXJ5IGRhdGEgdG9cclxuICAgICAqIEByZXR1cm5zIE5vZGUgbWFwcGluZyBvZiB1bmlxdWUgaWQgdG8gaW5kZXhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY3JlYXRlTm9kZU1hcEFuZEFuaW1hdGlvbnNBc3luYyhub2RlczogTm9kZVtdLCBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIpOiBQcm9taXNlPHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZUNoYWluID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgY29uc3Qgbm9kZU1hcDogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSA9IHt9O1xyXG4gICAgICAgIGxldCBub2RlSW5kZXg6IG51bWJlcjtcclxuICAgICAgICBjb25zdCBydW50aW1lR0xURkFuaW1hdGlvbjogSUFuaW1hdGlvbiA9IHtcclxuICAgICAgICAgICAgbmFtZTogXCJydW50aW1lIGFuaW1hdGlvbnNcIixcclxuICAgICAgICAgICAgY2hhbm5lbHM6IFtdLFxyXG4gICAgICAgICAgICBzYW1wbGVyczogW10sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBpZGxlR0xURkFuaW1hdGlvbnM6IElBbmltYXRpb25bXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGJhYnlsb25Ob2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VDaGFpbiA9IHByb21pc2VDaGFpbi50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVOb2RlQXN5bmMoYmFieWxvbk5vZGUsIGJpbmFyeVdyaXRlcikudGhlbigobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zUG9zdEV4cG9ydE5vZGVBc3luYyhcImNyZWF0ZU5vZGVBc3luY1wiLCBub2RlLCBiYWJ5bG9uTm9kZSwgbm9kZU1hcCwgYmluYXJ5V3JpdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oYE5vdCBleHBvcnRpbmcgbm9kZSAke2JhYnlsb25Ob2RlLm5hbWV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUluZGV4ID0gdGhpcy5fbm9kZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVNYXBbYmFieWxvbk5vZGUudW5pcXVlSWRdID0gbm9kZUluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYmFieWxvblNjZW5lLmFuaW1hdGlvbkdyb3Vwcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQ3JlYXRlTW9ycGhUYXJnZXRBbmltYXRpb25Gcm9tTW9ycGhUYXJnZXRBbmltYXRpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVudGltZUdMVEZBbmltYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkbGVHTFRGQW5pbWF0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZU1hcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm9kZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyVmlld3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc29ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uU2FtcGxlUmF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zaG91bGRFeHBvcnRBbmltYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTm9kZS5hbmltYXRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQ3JlYXRlTm9kZUFuaW1hdGlvbkZyb21Ob2RlQW5pbWF0aW9ucyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25Ob2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVudGltZUdMVEZBbmltYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGxlR0xURkFuaW1hdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTWFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm9kZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXJWaWV3cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjY2Vzc29ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvblNhbXBsZVJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNob3VsZEV4cG9ydEFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2VDaGFpbi50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJ1bnRpbWVHTFRGQW5pbWF0aW9uLmNoYW5uZWxzLmxlbmd0aCAmJiBydW50aW1lR0xURkFuaW1hdGlvbi5zYW1wbGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbnMucHVzaChydW50aW1lR0xURkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWRsZUdMVEZBbmltYXRpb25zLmZvckVhY2goKGlkbGVHTFRGQW5pbWF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWRsZUdMVEZBbmltYXRpb24uY2hhbm5lbHMubGVuZ3RoICYmIGlkbGVHTFRGQW5pbWF0aW9uLnNhbXBsZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbnMucHVzaChpZGxlR0xURkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2JhYnlsb25TY2VuZS5hbmltYXRpb25Hcm91cHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBfR0xURkFuaW1hdGlvbi5fQ3JlYXRlTm9kZUFuZE1vcnBoQW5pbWF0aW9uRnJvbUFuaW1hdGlvbkdyb3VwcyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICBub2RlTWFwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVdyaXRlcixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXJWaWV3cyxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY2Nlc3NvcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uU2FtcGxlUmF0ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNob3VsZEV4cG9ydEFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVNYXA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgZ2xURiBub2RlIGZyb20gYSBCYWJ5bG9uIG1lc2hcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTm9kZSBTb3VyY2UgQmFieWxvbiBtZXNoXHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyIEJ1ZmZlciBmb3Igc3RvcmluZyBnZW9tZXRyeSBkYXRhXHJcbiAgICAgKiBAcmV0dXJucyBnbFRGIG5vZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY3JlYXRlTm9kZUFzeW5jKGJhYnlsb25Ob2RlOiBOb2RlLCBiaW5hcnlXcml0ZXI6IF9CaW5hcnlXcml0ZXIpOiBQcm9taXNlPElOb2RlPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbm9kZSB0byBob2xkIHRyYW5zbGF0aW9uL3JvdGF0aW9uL3NjYWxlIGFuZCB0aGUgbWVzaFxyXG4gICAgICAgICAgICBjb25zdCBub2RlOiBJTm9kZSA9IHt9O1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgbWVzaFxyXG4gICAgICAgICAgICBjb25zdCBtZXNoOiBJTWVzaCA9IHsgcHJpbWl0aXZlczogW10gfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uTm9kZS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5hbWUgPSBiYWJ5bG9uTm9kZS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk5vZGUgaW5zdGFuY2VvZiBUcmFuc2Zvcm1Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdHJhbnNmb3JtYXRpb25cclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldE5vZGVUcmFuc2Zvcm1hdGlvbihub2RlLCBiYWJ5bG9uTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk5vZGUgaW5zdGFuY2VvZiBNZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRNYW5hZ2VyID0gYmFieWxvbk5vZGUubW9ycGhUYXJnZXRNYW5hZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb3JwaFRhcmdldE1hbmFnZXIgJiYgbW9ycGhUYXJnZXRNYW5hZ2VyLm51bVRhcmdldHMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2gud2VpZ2h0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vcnBoVGFyZ2V0TWFuYWdlci5udW1UYXJnZXRzOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2gud2VpZ2h0cy5wdXNoKG1vcnBoVGFyZ2V0TWFuYWdlci5nZXRUYXJnZXQoaSkuaW5mbHVlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXRQcmltaXRpdmVBdHRyaWJ1dGVzQXN5bmMobWVzaCwgYmFieWxvbk5vZGUsIGJpbmFyeVdyaXRlcikudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc2gucHJpbWl0aXZlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVzaGVzLnB1c2gobWVzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubWVzaCA9IHRoaXMuX21lc2hlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJhYnlsb25Ob2RlIGluc3RhbmNlb2YgQ2FtZXJhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRDYW1lcmFUcmFuc2Zvcm1hdGlvbihub2RlLCBiYWJ5bG9uTm9kZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgZ2xURiBza2luIGZyb20gYSBCYWJ5bG9uIHNrZWxldG9uXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblNjZW5lIEJhYnlsb24gU2NlbmVcclxuICAgICAqIEBwYXJhbSBub2RlTWFwIEJhYnlsb24gdHJhbnNmb3JtIG5vZGVzXHJcbiAgICAgKiBAcGFyYW0gYmluYXJ5V3JpdGVyIEJ1ZmZlciB0byB3cml0ZSBiaW5hcnkgZGF0YSB0b1xyXG4gICAgICogQHJldHVybnMgTm9kZSBtYXBwaW5nIG9mIHVuaXF1ZSBpZCB0byBpbmRleFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jcmVhdGVTa2luc0FzeW5jKG5vZGVNYXA6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0sIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcik6IFByb21pc2U8eyBba2V5OiBudW1iZXJdOiBudW1iZXIgfT4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VDaGFpbiA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIGNvbnN0IHNraW5NYXA6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0gPSB7fTtcclxuICAgICAgICBmb3IgKGNvbnN0IHNrZWxldG9uIG9mIHRoaXMuX2JhYnlsb25TY2VuZS5za2VsZXRvbnMpIHtcclxuICAgICAgICAgICAgaWYgKHNrZWxldG9uLmJvbmVzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgc2tpblxyXG4gICAgICAgICAgICBjb25zdCBza2luOiBJU2tpbiA9IHsgam9pbnRzOiBbXSB9O1xyXG4gICAgICAgICAgICBjb25zdCBpbnZlcnNlQmluZE1hdHJpY2VzOiBNYXRyaXhbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYm9uZUluZGV4TWFwOiB7IFtpbmRleDogbnVtYmVyXTogQm9uZSB9ID0ge307XHJcbiAgICAgICAgICAgIGxldCBtYXhCb25lSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2VsZXRvbi5ib25lcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYm9uZSA9IHNrZWxldG9uLmJvbmVzW2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYm9uZUluZGV4ID0gYm9uZS5nZXRJbmRleCgpID8/IGk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9uZUluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvbmVJbmRleE1hcFtib25lSW5kZXhdID0gYm9uZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9uZUluZGV4ID4gbWF4Qm9uZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEJvbmVJbmRleCA9IGJvbmVJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGJvbmVJbmRleCA9IDA7IGJvbmVJbmRleCA8PSBtYXhCb25lSW5kZXg7ICsrYm9uZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBib25lID0gYm9uZUluZGV4TWFwW2JvbmVJbmRleF07XHJcbiAgICAgICAgICAgICAgICBpbnZlcnNlQmluZE1hdHJpY2VzLnB1c2goYm9uZS5nZXRJbnZlcnRlZEFic29sdXRlVHJhbnNmb3JtKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybU5vZGUgPSBib25lLmdldFRyYW5zZm9ybU5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1Ob2RlICYmIG5vZGVNYXBbdHJhbnNmb3JtTm9kZS51bmlxdWVJZF0gIT09IG51bGwgJiYgbm9kZU1hcFt0cmFuc2Zvcm1Ob2RlLnVuaXF1ZUlkXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbi5qb2ludHMucHVzaChub2RlTWFwW3RyYW5zZm9ybU5vZGUudW5pcXVlSWRdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9vbHMuV2FybihcIkV4cG9ydGluZyBhIGJvbmUgd2l0aG91dCBhIGxpbmtlZCB0cmFuc2Zvcm0gbm9kZSBpcyBjdXJyZW50bHkgdW5zdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChza2luLmpvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgYnVmZmVyIHZpZXcgZm9yIGludmVyc2UgYmluZCBtYXRyaWNlc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnl0ZVN0cmlkZSA9IDY0OyAvLyA0IHggNCBtYXRyaXggb2YgMzIgYml0IGZsb2F0XHJcbiAgICAgICAgICAgICAgICBjb25zdCBieXRlTGVuZ3RoID0gaW52ZXJzZUJpbmRNYXRyaWNlcy5sZW5ndGggKiBieXRlU3RyaWRlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyVmlld09mZnNldCA9IGJpbmFyeVdyaXRlci5nZXRCeXRlT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWZmZXJWaWV3ID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUJ1ZmZlclZpZXcoMCwgYnVmZmVyVmlld09mZnNldCwgYnl0ZUxlbmd0aCwgdW5kZWZpbmVkLCBcIkludmVyc2VCaW5kTWF0cmljZXNcIiArIFwiIC0gXCIgKyBza2VsZXRvbi5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlclZpZXdzLnB1c2goYnVmZmVyVmlldyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWZmZXJWaWV3SW5kZXggPSB0aGlzLl9idWZmZXJWaWV3cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmluZE1hdHJpeEFjY2Vzc29yID0gX0dMVEZVdGlsaXRpZXMuX0NyZWF0ZUFjY2Vzc29yKFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXdJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBcIkludmVyc2VCaW5kTWF0cmljZXNcIiArIFwiIC0gXCIgKyBza2VsZXRvbi5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yVHlwZS5NQVQ0LFxyXG4gICAgICAgICAgICAgICAgICAgIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCxcclxuICAgICAgICAgICAgICAgICAgICBpbnZlcnNlQmluZE1hdHJpY2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludmVyc2VCaW5kQWNjZXNzb3JJbmRleCA9IHRoaXMuX2FjY2Vzc29ycy5wdXNoKGJpbmRNYXRyaXhBY2Nlc3NvcikgLSAxO1xyXG4gICAgICAgICAgICAgICAgc2tpbi5pbnZlcnNlQmluZE1hdHJpY2VzID0gaW52ZXJzZUJpbmRBY2Nlc3NvckluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbnMucHVzaChza2luKTtcclxuICAgICAgICAgICAgICAgIHNraW5NYXBbc2tlbGV0b24udW5pcXVlSWRdID0gdGhpcy5fc2tpbnMubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnZlcnNlQmluZE1hdHJpY2VzLmZvckVhY2goKG1hdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdC5tLmZvckVhY2goKGNlbGw6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlXcml0ZXIuc2V0RmxvYXQzMihjZWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9taXNlQ2hhaW4udGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBza2luTWFwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqXHJcbiAqIFN0b3JlcyBnbFRGIGJpbmFyeSBkYXRhLiAgSWYgdGhlIGFycmF5IGJ1ZmZlciBieXRlIGxlbmd0aCBpcyBleGNlZWRlZCwgaXQgZG91YmxlcyBpbiBzaXplIGR5bmFtaWNhbGx5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgX0JpbmFyeVdyaXRlciB7XHJcbiAgICAvKipcclxuICAgICAqIEFycmF5IGJ1ZmZlciB3aGljaCBzdG9yZXMgYWxsIGJpbmFyeSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2FycmF5QnVmZmVyOiBBcnJheUJ1ZmZlcjtcclxuICAgIC8qKlxyXG4gICAgICogVmlldyBvZiB0aGUgYXJyYXkgYnVmZmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RhdGFWaWV3OiBEYXRhVmlldztcclxuICAgIC8qKlxyXG4gICAgICogYnl0ZSBvZmZzZXQgb2YgZGF0YSBpbiBhcnJheSBidWZmZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYnl0ZU9mZnNldDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIGJpbmFyeSB3cml0ZXIgd2l0aCBhbiBpbml0aWFsIGJ5dGUgbGVuZ3RoXHJcbiAgICAgKiBAcGFyYW0gYnl0ZUxlbmd0aCBJbml0aWFsIGJ5dGUgbGVuZ3RoIG9mIHRoZSBhcnJheSBidWZmZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYnl0ZUxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYXJyYXlCdWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcodGhpcy5fYXJyYXlCdWZmZXIpO1xyXG4gICAgICAgIHRoaXMuX2J5dGVPZmZzZXQgPSAwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgdGhlIGFycmF5IGJ1ZmZlciB0byB0aGUgc3BlY2lmaWVkIGJ5dGUgbGVuZ3RoXHJcbiAgICAgKiBAcGFyYW0gYnl0ZUxlbmd0aFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZXNpemVCdWZmZXIoYnl0ZUxlbmd0aDogbnVtYmVyKTogQXJyYXlCdWZmZXIge1xyXG4gICAgICAgIGNvbnN0IG5ld0J1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihieXRlTGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBjb3B5T2xkQnVmZmVyU2l6ZSA9IE1hdGgubWluKHRoaXMuX2FycmF5QnVmZmVyLmJ5dGVMZW5ndGgsIGJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IG9sZFVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLl9hcnJheUJ1ZmZlciwgMCwgY29weU9sZEJ1ZmZlclNpemUpO1xyXG4gICAgICAgIGNvbnN0IG5ld1VpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShuZXdCdWZmZXIpO1xyXG4gICAgICAgIG5ld1VpbnQ4QXJyYXkuc2V0KG9sZFVpbnQ4QXJyYXksIDApO1xyXG4gICAgICAgIHRoaXMuX2FycmF5QnVmZmVyID0gbmV3QnVmZmVyO1xyXG4gICAgICAgIHRoaXMuX2RhdGFWaWV3ID0gbmV3IERhdGFWaWV3KHRoaXMuX2FycmF5QnVmZmVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld0J1ZmZlcjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFuIGFycmF5IGJ1ZmZlciB3aXRoIHRoZSBsZW5ndGggb2YgdGhlIGJ5dGUgb2Zmc2V0XHJcbiAgICAgKiBAcmV0dXJucyBBcnJheUJ1ZmZlciByZXNpemVkIHRvIHRoZSBieXRlIG9mZnNldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QXJyYXlCdWZmZXIoKTogQXJyYXlCdWZmZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNpemVCdWZmZXIodGhpcy5nZXRCeXRlT2Zmc2V0KCkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGJ5dGUgb2Zmc2V0IG9mIHRoZSBhcnJheSBidWZmZXJcclxuICAgICAqIEByZXR1cm5zIGJ5dGUgb2Zmc2V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCeXRlT2Zmc2V0KCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J5dGVPZmZzZXQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ5dGUgb2Zmc2V0IGlzIHVuZGVmaW5lZCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9ieXRlT2Zmc2V0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYW4gVUludDggaW4gdGhlIGFycmF5IGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBJZiBkZWZpbmVkLCBzcGVjaWZpZXMgd2hlcmUgdG8gc2V0IHRoZSB2YWx1ZSBhcyBhbiBvZmZzZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRVSW50OChlbnRyeTogbnVtYmVyLCBieXRlT2Zmc2V0PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IHRoaXMuX2J5dGVPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldFVpbnQ4KGJ5dGVPZmZzZXQsIGVudHJ5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLkVycm9yKFwiQmluYXJ5V3JpdGVyOiBieXRlb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgY3VycmVudCBiaW5hcnkgYnVmZmVyIGxlbmd0aCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYnl0ZU9mZnNldCArIDEgPiB0aGlzLl9hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVCdWZmZXIodGhpcy5fYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCAqIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldFVpbnQ4KHRoaXMuX2J5dGVPZmZzZXQsIGVudHJ5KTtcclxuICAgICAgICAgICAgdGhpcy5fYnl0ZU9mZnNldCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JlcyBhbiBVSW50MTYgaW4gdGhlIGFycmF5IGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBJZiBkZWZpbmVkLCBzcGVjaWZpZXMgd2hlcmUgdG8gc2V0IHRoZSB2YWx1ZSBhcyBhbiBvZmZzZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRVSW50MTYoZW50cnk6IG51bWJlciwgYnl0ZU9mZnNldD86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPCB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRVaW50MTYoYnl0ZU9mZnNldCwgZW50cnksIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJCaW5hcnlXcml0ZXI6IGJ5dGVvZmZzZXQgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IGJpbmFyeSBidWZmZXIgbGVuZ3RoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ieXRlT2Zmc2V0ICsgMiA+IHRoaXMuX2FycmF5QnVmZmVyLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZUJ1ZmZlcih0aGlzLl9hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoICogMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0VWludDE2KHRoaXMuX2J5dGVPZmZzZXQsIGVudHJ5LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fYnl0ZU9mZnNldCArPSAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYW4gVUludDMyIGluIHRoZSBhcnJheSBidWZmZXJcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IElmIGRlZmluZWQsIHNwZWNpZmllcyB3aGVyZSB0byBzZXQgdGhlIHZhbHVlIGFzIGFuIG9mZnNldC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFVJbnQzMihieXRlT2Zmc2V0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0IDwgdGhpcy5fYnl0ZU9mZnNldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVZpZXcuZ2V0VWludDMyKGJ5dGVPZmZzZXQsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFRvb2xzLkVycm9yKFwiQmluYXJ5V3JpdGVyOiBieXRlb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgY3VycmVudCBiaW5hcnkgYnVmZmVyIGxlbmd0aCFcIik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJpbmFyeVdyaXRlcjogYnl0ZW9mZnNldCBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgYmluYXJ5IGJ1ZmZlciBsZW5ndGghXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VmVjdG9yM0Zsb2F0MzJGcm9tUmVmKHZlY3RvcjM6IFZlY3RvcjMsIGJ5dGVPZmZzZXQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICsgOCA+IHRoaXMuX2J5dGVPZmZzZXQpIHtcclxuICAgICAgICAgICAgVG9vbHMuRXJyb3IoYEJpbmFyeVdyaXRlcjogYnl0ZW9mZnNldCBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgYmluYXJ5IGJ1ZmZlciBsZW5ndGghYCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmVjdG9yMy54ID0gdGhpcy5fZGF0YVZpZXcuZ2V0RmxvYXQzMihieXRlT2Zmc2V0LCB0cnVlKTtcclxuICAgICAgICAgICAgdmVjdG9yMy55ID0gdGhpcy5fZGF0YVZpZXcuZ2V0RmxvYXQzMihieXRlT2Zmc2V0ICsgNCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZlY3RvcjMueiA9IHRoaXMuX2RhdGFWaWV3LmdldEZsb2F0MzIoYnl0ZU9mZnNldCArIDgsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VmVjdG9yM0Zsb2F0MzJGcm9tUmVmKHZlY3RvcjM6IFZlY3RvcjMsIGJ5dGVPZmZzZXQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICsgOCA+IHRoaXMuX2J5dGVPZmZzZXQpIHtcclxuICAgICAgICAgICAgVG9vbHMuRXJyb3IoYEJpbmFyeVdyaXRlcjogYnl0ZW9mZnNldCBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgYmluYXJ5IGJ1ZmZlciBsZW5ndGghYCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0RmxvYXQzMihieXRlT2Zmc2V0LCB2ZWN0b3IzLngsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRGbG9hdDMyKGJ5dGVPZmZzZXQgKyA0LCB2ZWN0b3IzLnksIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRGbG9hdDMyKGJ5dGVPZmZzZXQgKyA4LCB2ZWN0b3IzLnosIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VmVjdG9yNEZsb2F0MzJGcm9tUmVmKHZlY3RvcjQ6IFZlY3RvcjQsIGJ5dGVPZmZzZXQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICsgMTIgPiB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIFRvb2xzLkVycm9yKGBCaW5hcnlXcml0ZXI6IGJ5dGVvZmZzZXQgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IGJpbmFyeSBidWZmZXIgbGVuZ3RoIWApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZlY3RvcjQueCA9IHRoaXMuX2RhdGFWaWV3LmdldEZsb2F0MzIoYnl0ZU9mZnNldCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZlY3RvcjQueSA9IHRoaXMuX2RhdGFWaWV3LmdldEZsb2F0MzIoYnl0ZU9mZnNldCArIDQsIHRydWUpO1xyXG4gICAgICAgICAgICB2ZWN0b3I0LnogPSB0aGlzLl9kYXRhVmlldy5nZXRGbG9hdDMyKGJ5dGVPZmZzZXQgKyA4LCB0cnVlKTtcclxuICAgICAgICAgICAgdmVjdG9yNC53ID0gdGhpcy5fZGF0YVZpZXcuZ2V0RmxvYXQzMihieXRlT2Zmc2V0ICsgMTIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VmVjdG9yNEZsb2F0MzJGcm9tUmVmKHZlY3RvcjQ6IFZlY3RvcjQsIGJ5dGVPZmZzZXQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICsgMTIgPiB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIFRvb2xzLkVycm9yKGBCaW5hcnlXcml0ZXI6IGJ5dGVvZmZzZXQgaXMgZ3JlYXRlciB0aGFuIHRoZSBjdXJyZW50IGJpbmFyeSBidWZmZXIgbGVuZ3RoIWApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldEZsb2F0MzIoYnl0ZU9mZnNldCwgdmVjdG9yNC54LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0RmxvYXQzMihieXRlT2Zmc2V0ICsgNCwgdmVjdG9yNC55LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0RmxvYXQzMihieXRlT2Zmc2V0ICsgOCwgdmVjdG9yNC56LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0RmxvYXQzMihieXRlT2Zmc2V0ICsgMTIsIHZlY3RvcjQudywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYSBGbG9hdDMyIGluIHRoZSBhcnJheSBidWZmZXJcclxuICAgICAqIEBwYXJhbSBlbnRyeVxyXG4gICAgICogQHBhcmFtIGJ5dGVPZmZzZXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEZsb2F0MzIoZW50cnk6IG51bWJlciwgYnl0ZU9mZnNldD86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChpc05hTihlbnRyeSkpIHtcclxuICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJJbnZhbGlkIGRhdGEgYmVpbmcgd3JpdHRlbiFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPCB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRGbG9hdDMyKGJ5dGVPZmZzZXQsIGVudHJ5LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLkVycm9yKFwiQmluYXJ5V3JpdGVyOiBieXRlb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgY3VycmVudCBiaW5hcnkgbGVuZ3RoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fYnl0ZU9mZnNldCArIDQgPiB0aGlzLl9hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZUJ1ZmZlcih0aGlzLl9hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoICogMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldEZsb2F0MzIodGhpcy5fYnl0ZU9mZnNldCwgZW50cnksIHRydWUpO1xyXG4gICAgICAgIHRoaXMuX2J5dGVPZmZzZXQgKz0gNDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGFuIFVJbnQzMiBpbiB0aGUgYXJyYXkgYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gZW50cnlcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IElmIGRlZmluZWQsIHNwZWNpZmllcyB3aGVyZSB0byBzZXQgdGhlIHZhbHVlIGFzIGFuIG9mZnNldC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFVJbnQzMihlbnRyeTogbnVtYmVyLCBieXRlT2Zmc2V0PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IHRoaXMuX2J5dGVPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldFVpbnQzMihieXRlT2Zmc2V0LCBlbnRyeSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihcIkJpbmFyeVdyaXRlcjogYnl0ZW9mZnNldCBpcyBncmVhdGVyIHRoYW4gdGhlIGN1cnJlbnQgYmluYXJ5IGJ1ZmZlciBsZW5ndGghXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J5dGVPZmZzZXQgKyA0ID4gdGhpcy5fYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplQnVmZmVyKHRoaXMuX2FycmF5QnVmZmVyLmJ5dGVMZW5ndGggKiAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRVaW50MzIodGhpcy5fYnl0ZU9mZnNldCwgZW50cnksIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9ieXRlT2Zmc2V0ICs9IDQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yZXMgYW4gSW50MTYgaW4gdGhlIGFycmF5IGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBJZiBkZWZpbmVkLCBzcGVjaWZpZXMgd2hlcmUgdG8gc2V0IHRoZSB2YWx1ZSBhcyBhbiBvZmZzZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRJbnQxNihlbnRyeTogbnVtYmVyLCBieXRlT2Zmc2V0PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IHRoaXMuX2J5dGVPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldEludDE2KGJ5dGVPZmZzZXQsIGVudHJ5LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLkVycm9yKFwiQmluYXJ5V3JpdGVyOiBieXRlb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgY3VycmVudCBiaW5hcnkgYnVmZmVyIGxlbmd0aCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYnl0ZU9mZnNldCArIDIgPiB0aGlzLl9hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVCdWZmZXIodGhpcy5fYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCAqIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldEludDE2KHRoaXMuX2J5dGVPZmZzZXQsIGVudHJ5LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fYnl0ZU9mZnNldCArPSAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIGEgYnl0ZSBpbiB0aGUgYXJyYXkgYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gZW50cnlcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IElmIGRlZmluZWQsIHNwZWNpZmllcyB3aGVyZSB0byBzZXQgdGhlIHZhbHVlIGFzIGFuIG9mZnNldC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEJ5dGUoZW50cnk6IG51bWJlciwgYnl0ZU9mZnNldD86IG51bWJlcikge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPCB0aGlzLl9ieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmlldy5zZXRJbnQ4KGJ5dGVPZmZzZXQsIGVudHJ5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLkVycm9yKFwiQmluYXJ5V3JpdGVyOiBieXRlb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiB0aGUgY3VycmVudCBiaW5hcnkgYnVmZmVyIGxlbmd0aCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYnl0ZU9mZnNldCArIDEgPiB0aGlzLl9hcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVCdWZmZXIodGhpcy5fYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCAqIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnNldEludDgodGhpcy5fYnl0ZU9mZnNldCwgZW50cnkpO1xyXG4gICAgICAgICAgICB0aGlzLl9ieXRlT2Zmc2V0Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgSW1hZ2VNaW1lVHlwZSwgSU1lc2hQcmltaXRpdmUsIElOb2RlLCBJTWF0ZXJpYWwsIElUZXh0dXJlSW5mbyB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSBcImNvcmUvbm9kZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgU3ViTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9zdWJNZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgSURpc3Bvc2FibGUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBfQmluYXJ5V3JpdGVyIH0gZnJvbSBcIi4vZ2xURkV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZFeHBvcnRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGRmlsZUV4cG9ydGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyLCBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IHZhciBfX0lHTFRGRXhwb3J0ZXJFeHRlbnNpb25WMiA9IDA7IC8vIEkgYW0gaGVyZSB0byBhbGxvdyBkdHMgdG8gYmUgY3JlYXRlZFxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3IgYSBnbFRGIGV4cG9ydGVyIGV4dGVuc2lvblxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZFeHBvcnRlckV4dGVuc2lvblYyIGV4dGVuZHMgSUdMVEZFeHBvcnRlckV4dGVuc2lvbiwgSURpc3Bvc2FibGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmUgdGhpcyBtZXRob2QgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IGJlaGF2aW9yIGJlZm9yZSBleHBvcnRpbmcgYSB0ZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblRleHR1cmUgVGhlIEJhYnlsb24uanMgdGV4dHVyZVxyXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIFRoZSBtaW1lLXR5cGUgb2YgdGhlIGdlbmVyYXRlZCBpbWFnZVxyXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZXhwb3J0ZWQgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwcmVFeHBvcnRUZXh0dXJlQXN5bmM/KGNvbnRleHQ6IHN0cmluZywgYmFieWxvblRleHR1cmU6IE51bGxhYmxlPFRleHR1cmU+LCBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSk6IFByb21pc2U8TnVsbGFibGU8VGV4dHVyZT4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lIHRoaXMgbWV0aG9kIHRvIGdldCBub3RpZmllZCB3aGVuIGEgdGV4dHVyZSBpbmZvIGlzIGNyZWF0ZWRcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHdoZW4gbG9hZGluZyB0aGUgYXNzZXRcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlSW5mbyBUaGUgZ2xURiB0ZXh0dXJlIGluZm9cclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uVGV4dHVyZSBUaGUgQmFieWxvbi5qcyB0ZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHBvc3RFeHBvcnRUZXh0dXJlPyhjb250ZXh0OiBzdHJpbmcsIHRleHR1cmVJbmZvOiBJVGV4dHVyZUluZm8sIGJhYnlsb25UZXh0dXJlOiBCYXNlVGV4dHVyZSk6IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmUgdGhpcyBtZXRob2QgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHdoZW4gZXhwb3J0aW5nIHRleHR1cmUgaW5mb1xyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIG1lc2hQcmltaXRpdmUgZ2xURiBtZXNoIHByaW1pdGl2ZVxyXG4gICAgICogQHBhcmFtIGJhYnlsb25TdWJNZXNoIEJhYnlsb24gc3VibWVzaFxyXG4gICAgICogQHBhcmFtIGJpbmFyeVdyaXRlciBnbFRGIHNlcmlhbGl6ZXIgYmluYXJ5IHdyaXRlciBpbnN0YW5jZVxyXG4gICAgICogQHJldHVybnMgbnVsbGFibGUgSU1lc2hQcmltaXRpdmUgcHJvbWlzZVxyXG4gICAgICovXHJcbiAgICBwb3N0RXhwb3J0TWVzaFByaW1pdGl2ZUFzeW5jPyhjb250ZXh0OiBzdHJpbmcsIG1lc2hQcmltaXRpdmU6IE51bGxhYmxlPElNZXNoUHJpbWl0aXZlPiwgYmFieWxvblN1Yk1lc2g6IFN1Yk1lc2gsIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcik6IFByb21pc2U8SU1lc2hQcmltaXRpdmU+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lIHRoaXMgbWV0aG9kIHRvIG1vZGlmeSB0aGUgZGVmYXVsdCBiZWhhdmlvciB3aGVuIGV4cG9ydGluZyBhIG5vZGVcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHdoZW4gZXhwb3J0aW5nIHRoZSBub2RlXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBnbFRGIG5vZGVcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTm9kZSBCYWJ5bG9uSlMgbm9kZVxyXG4gICAgICogQHJldHVybnMgbnVsbGFibGUgSU5vZGUgcHJvbWlzZVxyXG4gICAgICovXHJcbiAgICBwb3N0RXhwb3J0Tm9kZUFzeW5jPyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IE51bGxhYmxlPElOb2RlPiwgYmFieWxvbk5vZGU6IE5vZGUsIG5vZGVNYXA6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0sIGJpbmFyeVdyaXRlcjogX0JpbmFyeVdyaXRlcik6IFByb21pc2U8TnVsbGFibGU8SU5vZGU+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZSB0aGlzIG1ldGhvZCB0byBtb2RpZnkgdGhlIGRlZmF1bHQgYmVoYXZpb3Igd2hlbiBleHBvcnRpbmcgYSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsIGdsVEYgbWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTWF0ZXJpYWwgQmFieWxvbkpTIG1hdGVyaWFsXHJcbiAgICAgKiBAcmV0dXJucyBudWxsYWJsZSBJTWF0ZXJpYWwgcHJvbWlzZVxyXG4gICAgICovXHJcbiAgICBwb3N0RXhwb3J0TWF0ZXJpYWxBc3luYz8oY29udGV4dDogc3RyaW5nLCBub2RlOiBOdWxsYWJsZTxJTWF0ZXJpYWw+LCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTxJTWF0ZXJpYWw+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhZGRpdGlvbmFsIHRleHR1cmVzIHRvIGV4cG9ydCBmcm9tIGEgbWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbCBnbFRGIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1hdGVyaWFsIEJhYnlsb25KUyBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgTGlzdCBvZiB0ZXh0dXJlc1xyXG4gICAgICovXHJcbiAgICBwb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXM/KGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogQmFzZVRleHR1cmVbXTtcclxuXHJcbiAgICAvKiogR2V0cyBhIGJvb2xlYW4gaW5kaWNhdGluZyB0aGF0IHRoaXMgZXh0ZW5zaW9uIHdhcyB1c2VkICovXHJcbiAgICB3YXNVc2VkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKiBHZXRzIGEgYm9vbGVhbiBpbmRpY2F0aW5nIHRoYXQgdGhpcyBleHRlbnNpb24gaXMgcmVxdWlyZWQgZm9yIHRoZSBmaWxlIHRvIHdvcmsgKi9cclxuICAgIHJlcXVpcmVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIGFmdGVyIHRoZSBleHBvcnRlciBzdGF0ZSBjaGFuZ2VzIHRvIEVYUE9SVElOR1xyXG4gICAgICovXHJcbiAgICBvbkV4cG9ydGluZz8oKTogdm9pZDtcclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IElUZXh0dXJlSW5mbywgSU1hdGVyaWFsLCBJTWF0ZXJpYWxQYnJNZXRhbGxpY1JvdWdobmVzcywgSU1hdGVyaWFsT2NjbHVzaW9uVGV4dHVyZUluZm8sIElTYW1wbGVyLCBJTWF0ZXJpYWxFeHRlbnNpb24gfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEltYWdlTWltZVR5cGUsIE1hdGVyaWFsQWxwaGFNb2RlLCBUZXh0dXJlTWFnRmlsdGVyLCBUZXh0dXJlTWluRmlsdGVyLCBUZXh0dXJlV3JhcE1vZGUgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHsgU2NhbGFyIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5zY2FsYXJcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB7IFRleHR1cmVUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdGV4dHVyZVRvb2xzXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuaW1wb3J0IHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IFJhd1RleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvcmF3VGV4dHVyZVwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IF9FeHBvcnRlciB9IGZyb20gXCIuL2dsVEZFeHBvcnRlclwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiY29yZS9FbmdpbmVzL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBEdW1wVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL2R1bXBUb29sc1wiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IFN0YW5kYXJkTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvc3RhbmRhcmRNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IFBCUkJhc2VNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyQmFzZU1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBzdG9yaW5nIHNwZWN1bGFyIGdsb3NzaW5lc3MgZmFjdG9yc1xyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuaW50ZXJmYWNlIF9JUEJSU3BlY3VsYXJHbG9zc2luZXNzIHtcclxuICAgIC8qKlxyXG4gICAgICogUmVwcmVzZW50cyB0aGUgbGluZWFyIGRpZmZ1c2UgZmFjdG9ycyBvZiB0aGUgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgZGlmZnVzZUNvbG9yOiBDb2xvcjM7XHJcbiAgICAvKipcclxuICAgICAqIFJlcHJlc2VudHMgdGhlIGxpbmVhciBzcGVjdWxhciBmYWN0b3JzIG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBzcGVjdWxhckNvbG9yOiBDb2xvcjM7XHJcbiAgICAvKipcclxuICAgICAqIFJlcHJlc2VudHMgdGhlIHNtb290aG5lc3Mgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIGdsb3NzaW5lc3M6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3Igc3RvcmluZyBtZXRhbGxpYyByb3VnaG5lc3MgZmFjdG9yc1xyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuaW50ZXJmYWNlIF9JUEJSTWV0YWxsaWNSb3VnaG5lc3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXByZXNlbnRzIHRoZSBhbGJlZG8gY29sb3Igb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIGJhc2VDb2xvcjogQ29sb3IzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXByZXNlbnRzIHRoZSBtZXRhbG5lc3Mgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIG1ldGFsbGljOiBOdWxsYWJsZTxudW1iZXI+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXByZXNlbnRzIHRoZSByb3VnaG5lc3Mgb2YgdGhlIG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHJvdWdobmVzczogTnVsbGFibGU8bnVtYmVyPjtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1ldGFsbGljIHJvdWdobmVzcyB0ZXh0dXJlIGRhdGFcclxuICAgICAqL1xyXG4gICAgbWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlRGF0YT86IE51bGxhYmxlPEFycmF5QnVmZmVyPjtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGJhc2UgY29sb3IgdGV4dHVyZSBkYXRhXHJcbiAgICAgKi9cclxuICAgIGJhc2VDb2xvclRleHR1cmVEYXRhPzogTnVsbGFibGU8QXJyYXlCdWZmZXI+O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGaWxlRXh0ZW5zaW9uRnJvbU1pbWVUeXBlKG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlKTogc3RyaW5nIHtcclxuICAgIHN3aXRjaCAobWltZVR5cGUpIHtcclxuICAgICAgICBjYXNlIEltYWdlTWltZVR5cGUuSlBFRzpcclxuICAgICAgICAgICAgcmV0dXJuIFwiLmpwZ1wiO1xyXG4gICAgICAgIGNhc2UgSW1hZ2VNaW1lVHlwZS5QTkc6XHJcbiAgICAgICAgICAgIHJldHVybiBcIi5wbmdcIjtcclxuICAgICAgICBjYXNlIEltYWdlTWltZVR5cGUuV0VCUDpcclxuICAgICAgICAgICAgcmV0dXJuIFwiLndlYnBcIjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgbWV0aG9kcyBmb3Igd29ya2luZyB3aXRoIGdsVEYgbWF0ZXJpYWwgY29udmVyc2lvbiBwcm9wZXJ0aWVzLiAgVGhpcyBjbGFzcyBzaG91bGQgb25seSBiZSB1c2VkIGludGVybmFsbHlcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgX0dMVEZNYXRlcmlhbEV4cG9ydGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogUmVwcmVzZW50cyB0aGUgZGllbGVjdHJpYyBzcGVjdWxhciB2YWx1ZXMgZm9yIFIsIEcgYW5kIEJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX0RpZWxlY3RyaWNTcGVjdWxhcjogQ29sb3IzID0gbmV3IENvbG9yMygwLjA0LCAwLjA0LCAwLjA0KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbG93cyB0aGUgbWF4aW11bSBzcGVjdWxhciBwb3dlciB0byBiZSBkZWZpbmVkIGZvciBtYXRlcmlhbCBjYWxjdWxhdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgX01heFNwZWN1bGFyUG93ZXIgPSAxMDI0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwcGluZyB0byBzdG9yZSB0ZXh0dXJlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF90ZXh0dXJlTWFwOiB7IFt0ZXh0dXJlSWQ6IHN0cmluZ106IElUZXh0dXJlSW5mbyB9ID0ge307XHJcblxyXG4gICAgLy8gTWFwcGluZyBvZiBpbnRlcm5hbCB0ZXh0dXJlcyB0byBpbWFnZXMgdG8gYXZvaWQgZXhwb3J0aW5nIGR1cGxpY2F0ZSBpbWFnZXMuXHJcbiAgICBwcml2YXRlIF9pbnRlcm5hbFRleHR1cmVUb0ltYWdlOiB7IFt1bmlxdWVJZDogbnVtYmVyXTogeyBbbWltZVR5cGU6IHN0cmluZ106IFByb21pc2U8bnVtYmVyPiB9IH0gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE51bWVyaWMgdG9sZXJhbmNlIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9FcHNpbG9uID0gMWUtNjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZmVyZW5jZSB0byB0aGUgZ2xURiBFeHBvcnRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9leHBvcnRlcjogX0V4cG9ydGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGV4cG9ydGVyOiBfRXhwb3J0ZXIpIHtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fZXhwb3J0ZXIgPSBleHBvcnRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZmllcyBpZiB0d28gY29sb3JzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsIGluIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gY29sb3IxIGZpcnN0IGNvbG9yIHRvIGNvbXBhcmUgdG9cclxuICAgICAqIEBwYXJhbSBjb2xvcjIgc2Vjb25kIGNvbG9yIHRvIGNvbXBhcmUgdG9cclxuICAgICAqIEBwYXJhbSBlcHNpbG9uIHRocmVzaG9sZCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRnV6enlFcXVhbHMoY29sb3IxOiBDb2xvcjMsIGNvbG9yMjogQ29sb3IzLCBlcHNpbG9uOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gU2NhbGFyLldpdGhpbkVwc2lsb24oY29sb3IxLnIsIGNvbG9yMi5yLCBlcHNpbG9uKSAmJiBTY2FsYXIuV2l0aGluRXBzaWxvbihjb2xvcjEuZywgY29sb3IyLmcsIGVwc2lsb24pICYmIFNjYWxhci5XaXRoaW5FcHNpbG9uKGNvbG9yMS5iLCBjb2xvcjIuYiwgZXBzaWxvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBtYXRlcmlhbHMgZnJvbSBhIEJhYnlsb24gc2NlbmUgYW5kIGNvbnZlcnRzIHRoZW0gdG8gZ2xURiBtYXRlcmlhbHNcclxuICAgICAqIEBwYXJhbSBleHBvcnRNYXRlcmlhbHNcclxuICAgICAqIEBwYXJhbSBtaW1lVHlwZSB0ZXh0dXJlIG1pbWUgdHlwZVxyXG4gICAgICogQHBhcmFtIGhhc1RleHR1cmVDb29yZHMgc3BlY2lmaWVzIGlmIHRleHR1cmUgY29vcmRpbmF0ZXMgYXJlIHByZXNlbnQgb24gdGhlIG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfY29udmVydE1hdGVyaWFsc1RvR0xURkFzeW5jKGV4cG9ydE1hdGVyaWFsczogU2V0PE1hdGVyaWFsPiwgbWltZVR5cGU6IEltYWdlTWltZVR5cGUsIGhhc1RleHR1cmVDb29yZHM6IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zdCBwcm9taXNlczogUHJvbWlzZTxJTWF0ZXJpYWw+W10gPSBbXTtcclxuICAgICAgICBleHBvcnRNYXRlcmlhbHMuZm9yRWFjaCgobWF0ZXJpYWwpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFsLmdldENsYXNzTmFtZSgpID09PSBcIlN0YW5kYXJkTWF0ZXJpYWxcIikge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9jb252ZXJ0U3RhbmRhcmRNYXRlcmlhbEFzeW5jKG1hdGVyaWFsIGFzIFN0YW5kYXJkTWF0ZXJpYWwsIG1pbWVUeXBlLCBoYXNUZXh0dXJlQ29vcmRzKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0ZXJpYWwuZ2V0Q2xhc3NOYW1lKCkuaW5kZXhPZihcIlBCUlwiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fY29udmVydFBCUk1hdGVyaWFsQXN5bmMobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwsIG1pbWVUeXBlLCBoYXNUZXh0dXJlQ29vcmRzKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5XYXJuKGBVbnN1cHBvcnRlZCBtYXRlcmlhbCB0eXBlOiAke21hdGVyaWFsLm5hbWV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLyogZG8gbm90aGluZyAqL1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYSBjb3B5IG9mIHRoZSBnbFRGIG1hdGVyaWFsIHdpdGhvdXQgdGhlIHRleHR1cmUgcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIG9yaWdpbmFsTWF0ZXJpYWwgb3JpZ2luYWwgZ2xURiBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgZ2xURiBtYXRlcmlhbCB3aXRob3V0IHRleHR1cmUgcGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX3N0cmlwVGV4dHVyZXNGcm9tTWF0ZXJpYWwob3JpZ2luYWxNYXRlcmlhbDogSU1hdGVyaWFsKTogSU1hdGVyaWFsIHtcclxuICAgICAgICBjb25zdCBuZXdNYXRlcmlhbDogSU1hdGVyaWFsID0ge307XHJcbiAgICAgICAgaWYgKG9yaWdpbmFsTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgbmV3TWF0ZXJpYWwubmFtZSA9IG9yaWdpbmFsTWF0ZXJpYWwubmFtZTtcclxuICAgICAgICAgICAgbmV3TWF0ZXJpYWwuZG91YmxlU2lkZWQgPSBvcmlnaW5hbE1hdGVyaWFsLmRvdWJsZVNpZGVkO1xyXG4gICAgICAgICAgICBuZXdNYXRlcmlhbC5hbHBoYU1vZGUgPSBvcmlnaW5hbE1hdGVyaWFsLmFscGhhTW9kZTtcclxuICAgICAgICAgICAgbmV3TWF0ZXJpYWwuYWxwaGFDdXRvZmYgPSBvcmlnaW5hbE1hdGVyaWFsLmFscGhhQ3V0b2ZmO1xyXG4gICAgICAgICAgICBuZXdNYXRlcmlhbC5lbWlzc2l2ZUZhY3RvciA9IG9yaWdpbmFsTWF0ZXJpYWwuZW1pc3NpdmVGYWN0b3I7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsUEJSTWV0YWxsaWNSb3VnaG5lc3MgPSBvcmlnaW5hbE1hdGVyaWFsLnBick1ldGFsbGljUm91Z2huZXNzO1xyXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxQQlJNZXRhbGxpY1JvdWdobmVzcykge1xyXG4gICAgICAgICAgICAgICAgbmV3TWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3MgPSB7fTtcclxuICAgICAgICAgICAgICAgIG5ld01hdGVyaWFsLnBick1ldGFsbGljUm91Z2huZXNzLmJhc2VDb2xvckZhY3RvciA9IG9yaWdpbmFsUEJSTWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgbmV3TWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3MubWV0YWxsaWNGYWN0b3IgPSBvcmlnaW5hbFBCUk1ldGFsbGljUm91Z2huZXNzLm1ldGFsbGljRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgbmV3TWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3Mucm91Z2huZXNzRmFjdG9yID0gb3JpZ2luYWxQQlJNZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3NGYWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld01hdGVyaWFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmaWVzIGlmIHRoZSBtYXRlcmlhbCBoYXMgYW55IHRleHR1cmUgcGFyYW1ldGVycyBwcmVzZW50XHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWwgZ2xURiBNYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgYm9vbGVhbiBzcGVjaWZ5aW5nIGlmIHRleHR1cmUgcGFyYW1ldGVycyBhcmUgcHJlc2VudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2hhc1RleHR1cmVzUHJlc2VudChtYXRlcmlhbDogSU1hdGVyaWFsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG1hdGVyaWFsLmVtaXNzaXZlVGV4dHVyZSB8fCBtYXRlcmlhbC5ub3JtYWxUZXh0dXJlIHx8IG1hdGVyaWFsLm9jY2x1c2lvblRleHR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBick1hdCA9IG1hdGVyaWFsLnBick1ldGFsbGljUm91Z2huZXNzO1xyXG4gICAgICAgIGlmIChwYnJNYXQpIHtcclxuICAgICAgICAgICAgaWYgKHBick1hdC5iYXNlQ29sb3JUZXh0dXJlIHx8IHBick1hdC5tZXRhbGxpY1JvdWdobmVzc1RleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0ZXJpYWwuZXh0ZW5zaW9ucykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBpbiBtYXRlcmlhbC5leHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBleHRlbnNpb25PYmplY3QgPSBtYXRlcmlhbC5leHRlbnNpb25zW2V4dGVuc2lvbl07XHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9uT2JqZWN0IGFzIElNYXRlcmlhbEV4dGVuc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25PYmplY3QuaGFzVGV4dHVyZXM/LigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIF9nZXRUZXh0dXJlSW5mbyhiYWJ5bG9uVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+KTogTnVsbGFibGU8SVRleHR1cmVJbmZvPiB7XHJcbiAgICAgICAgaWYgKGJhYnlsb25UZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmVVaWQgPSBiYWJ5bG9uVGV4dHVyZS51aWQ7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlVWlkIGluIHRoaXMuX3RleHR1cmVNYXApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlTWFwW3RleHR1cmVVaWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgYSBCYWJ5bG9uIFN0YW5kYXJkTWF0ZXJpYWwgdG8gYSBnbFRGIE1ldGFsbGljIFJvdWdobmVzcyBNYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsXHJcbiAgICAgKiBAcmV0dXJucyBnbFRGIE1ldGFsbGljIFJvdWdobmVzcyBNYXRlcmlhbCByZXByZXNlbnRhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2NvbnZlcnRUb0dMVEZQQlJNZXRhbGxpY1JvdWdobmVzcyhiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbDogU3RhbmRhcmRNYXRlcmlhbCk6IElNYXRlcmlhbFBick1ldGFsbGljUm91Z2huZXNzIHtcclxuICAgICAgICAvLyBEZWZpbmVzIGEgY3ViaWMgYmV6aWVyIGN1cnZlIHdoZXJlIHggaXMgc3BlY3VsYXIgcG93ZXIgYW5kIHkgaXMgcm91Z2huZXNzXHJcbiAgICAgICAgY29uc3QgUDAgPSBuZXcgVmVjdG9yMigwLCAxKTtcclxuICAgICAgICBjb25zdCBQMSA9IG5ldyBWZWN0b3IyKDAsIDAuMSk7XHJcbiAgICAgICAgY29uc3QgUDIgPSBuZXcgVmVjdG9yMigwLCAwLjEpO1xyXG4gICAgICAgIGNvbnN0IFAzID0gbmV3IFZlY3RvcjIoMTMwMCwgMC4xKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2l2ZW4gdGhlIGNvbnRyb2wgcG9pbnRzLCBzb2x2ZSBmb3IgeCBiYXNlZCBvbiBhIGdpdmVuIHQgZm9yIGEgY3ViaWMgYmV6aWVyIGN1cnZlXHJcbiAgICAgICAgICogQHBhcmFtIHQgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDFcclxuICAgICAgICAgKiBAcGFyYW0gcDAgZmlyc3QgY29udHJvbCBwb2ludFxyXG4gICAgICAgICAqIEBwYXJhbSBwMSBzZWNvbmQgY29udHJvbCBwb2ludFxyXG4gICAgICAgICAqIEBwYXJhbSBwMiB0aGlyZCBjb250cm9sIHBvaW50XHJcbiAgICAgICAgICogQHBhcmFtIHAzIGZvdXJ0aCBjb250cm9sIHBvaW50XHJcbiAgICAgICAgICogQHJldHVybnMgbnVtYmVyIHJlc3VsdCBvZiBjdWJpYyBiZXppZXIgY3VydmUgYXQgdGhlIHNwZWNpZmllZCB0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gY3ViaWNCZXppZXJDdXJ2ZSh0OiBudW1iZXIsIHAwOiBudW1iZXIsIHAxOiBudW1iZXIsIHAyOiBudW1iZXIsIHAzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpICogcDAgKyAzICogKDEgLSB0KSAqICgxIC0gdCkgKiB0ICogcDEgKyAzICogKDEgLSB0KSAqIHQgKiB0ICogcDIgKyB0ICogdCAqIHQgKiBwMztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV2YWx1YXRlcyBhIHNwZWNpZmllZCBzcGVjdWxhciBwb3dlciB2YWx1ZSB0byBkZXRlcm1pbmUgdGhlIGFwcHJvcHJpYXRlIHJvdWdobmVzcyB2YWx1ZSxcclxuICAgICAgICAgKiBiYXNlZCBvbiBhIHByZS1kZWZpbmVkIGN1YmljIGJlemllciBjdXJ2ZSB3aXRoIHNwZWN1bGFyIG9uIHRoZSBhYnNjaXNzYSBheGlzICh4LWF4aXMpXHJcbiAgICAgICAgICogYW5kIHJvdWdobmVzcyBvbiB0aGUgb3JkaW5hbnQgYXhpcyAoeS1heGlzKVxyXG4gICAgICAgICAqIEBwYXJhbSBzcGVjdWxhclBvd2VyIHNwZWN1bGFyIHBvd2VyIG9mIHN0YW5kYXJkIG1hdGVyaWFsXHJcbiAgICAgICAgICogQHJldHVybnMgTnVtYmVyIHJlcHJlc2VudGluZyB0aGUgcm91Z2huZXNzIHZhbHVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gc29sdmVGb3JSb3VnaG5lc3Moc3BlY3VsYXJQb3dlcjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgLy8gR2l2ZW4gUDAueCA9IDAsIFAxLnggPSAwLCBQMi54ID0gMFxyXG4gICAgICAgICAgICAvLyAgIHggPSB0ICogdCAqIHQgKiBQMy54XHJcbiAgICAgICAgICAgIC8vICAgdCA9ICh4IC8gUDMueCleKDEvMylcclxuICAgICAgICAgICAgY29uc3QgdCA9IE1hdGgucG93KHNwZWN1bGFyUG93ZXIgLyBQMy54LCAwLjMzMzMzMyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdWJpY0JlemllckN1cnZlKHQsIFAwLnksIFAxLnksIFAyLnksIFAzLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGlmZnVzZSA9IGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmRpZmZ1c2VDb2xvci50b0xpbmVhclNwYWNlKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmdldFNjZW5lKCkuZ2V0RW5naW5lKCkudXNlRXhhY3RTcmdiQ29udmVyc2lvbnMpLnNjYWxlKDAuNSk7XHJcbiAgICAgICAgY29uc3Qgb3BhY2l0eSA9IGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmFscGhhO1xyXG4gICAgICAgIGNvbnN0IHNwZWN1bGFyUG93ZXIgPSBTY2FsYXIuQ2xhbXAoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuc3BlY3VsYXJQb3dlciwgMCwgX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9NYXhTcGVjdWxhclBvd2VyKTtcclxuXHJcbiAgICAgICAgY29uc3Qgcm91Z2huZXNzID0gc29sdmVGb3JSb3VnaG5lc3Moc3BlY3VsYXJQb3dlcik7XHJcblxyXG4gICAgICAgIGNvbnN0IGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzczogSU1hdGVyaWFsUGJyTWV0YWxsaWNSb3VnaG5lc3MgPSB7XHJcbiAgICAgICAgICAgIGJhc2VDb2xvckZhY3RvcjogW2RpZmZ1c2UuciwgZGlmZnVzZS5nLCBkaWZmdXNlLmIsIG9wYWNpdHldLFxyXG4gICAgICAgICAgICBtZXRhbGxpY0ZhY3RvcjogMCxcclxuICAgICAgICAgICAgcm91Z2huZXNzRmFjdG9yOiByb3VnaG5lc3MsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXB1dGVzIHRoZSBtZXRhbGxpYyBmYWN0b3JcclxuICAgICAqIEBwYXJhbSBkaWZmdXNlIGRpZmZ1c2VkIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gc3BlY3VsYXIgc3BlY3VsYXIgdmFsdWVcclxuICAgICAqIEBwYXJhbSBvbmVNaW51c1NwZWN1bGFyU3RyZW5ndGggb25lIG1pbnVzIHRoZSBzcGVjdWxhciBzdHJlbmd0aFxyXG4gICAgICogQHJldHVybnMgbWV0YWxsaWMgdmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfU29sdmVNZXRhbGxpYyhkaWZmdXNlOiBudW1iZXIsIHNwZWN1bGFyOiBudW1iZXIsIG9uZU1pbnVzU3BlY3VsYXJTdHJlbmd0aDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoc3BlY3VsYXIgPCB0aGlzLl9EaWVsZWN0cmljU3BlY3VsYXIucikge1xyXG4gICAgICAgICAgICB0aGlzLl9EaWVsZWN0cmljU3BlY3VsYXI7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYSA9IHRoaXMuX0RpZWxlY3RyaWNTcGVjdWxhci5yO1xyXG4gICAgICAgIGNvbnN0IGIgPSAoZGlmZnVzZSAqIG9uZU1pbnVzU3BlY3VsYXJTdHJlbmd0aCkgLyAoMS4wIC0gdGhpcy5fRGllbGVjdHJpY1NwZWN1bGFyLnIpICsgc3BlY3VsYXIgLSAyLjAgKiB0aGlzLl9EaWVsZWN0cmljU3BlY3VsYXIucjtcclxuICAgICAgICBjb25zdCBjID0gdGhpcy5fRGllbGVjdHJpY1NwZWN1bGFyLnIgLSBzcGVjdWxhcjtcclxuICAgICAgICBjb25zdCBEID0gYiAqIGIgLSA0LjAgKiBhICogYztcclxuICAgICAgICByZXR1cm4gU2NhbGFyLkNsYW1wKCgtYiArIE1hdGguc3FydChEKSkgLyAoMi4wICogYSksIDAsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2xURiBhbHBoYSBtb2RlIHRvIGEgZ2xURiBtYXRlcmlhbCBmcm9tIHRoZSBCYWJ5bG9uIE1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gZ2xURk1hdGVyaWFsIGdsVEYgbWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTWF0ZXJpYWwgQmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfU2V0QWxwaGFNb2RlKGdsVEZNYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsICYgeyBhbHBoYUN1dE9mZjogbnVtYmVyIH0pOiB2b2lkIHtcclxuICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLm5lZWRBbHBoYUJsZW5kaW5nKCkpIHtcclxuICAgICAgICAgICAgZ2xURk1hdGVyaWFsLmFscGhhTW9kZSA9IE1hdGVyaWFsQWxwaGFNb2RlLkJMRU5EO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYmFieWxvbk1hdGVyaWFsLm5lZWRBbHBoYVRlc3RpbmcoKSkge1xyXG4gICAgICAgICAgICBnbFRGTWF0ZXJpYWwuYWxwaGFNb2RlID0gTWF0ZXJpYWxBbHBoYU1vZGUuTUFTSztcclxuICAgICAgICAgICAgZ2xURk1hdGVyaWFsLmFscGhhQ3V0b2ZmID0gYmFieWxvbk1hdGVyaWFsLmFscGhhQ3V0T2ZmO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGEgQmFieWxvbiBTdGFuZGFyZCBNYXRlcmlhbCB0byBhIGdsVEYgTWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbCBCSlMgU3RhbmRhcmQgTWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBtaW1lVHlwZSBtaW1lIHR5cGUgdG8gdXNlIGZvciB0aGUgdGV4dHVyZXNcclxuICAgICAqIEBwYXJhbSBoYXNUZXh0dXJlQ29vcmRzIHNwZWNpZmllcyBpZiB0ZXh0dXJlIGNvb3JkaW5hdGVzIGFyZSBwcmVzZW50IG9uIHRoZSBzdWJtZXNoIHRvIGRldGVybWluZSBpZiB0ZXh0dXJlcyBzaG91bGQgYmUgYXBwbGllZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2NvbnZlcnRTdGFuZGFyZE1hdGVyaWFsQXN5bmMoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWw6IFN0YW5kYXJkTWF0ZXJpYWwsIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlLCBoYXNUZXh0dXJlQ29vcmRzOiBib29sZWFuKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbE1hcCA9IHRoaXMuX2V4cG9ydGVyLl9tYXRlcmlhbE1hcDtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSB0aGlzLl9leHBvcnRlci5fbWF0ZXJpYWxzO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAgICAgY29uc3QgcGJyTWV0YWxsaWNSb3VnaG5lc3MgPSB0aGlzLl9jb252ZXJ0VG9HTFRGUEJSTWV0YWxsaWNSb3VnaG5lc3MoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwpO1xyXG5cclxuICAgICAgICBjb25zdCBtYXRlcmlhbDogSU1hdGVyaWFsID0geyBuYW1lOiBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5uYW1lIH07XHJcbiAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyAhPSBudWxsICYmICFiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCFiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC50d29TaWRlZExpZ2h0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5XYXJuKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLm5hbWUgKyBcIjogQmFjay1mYWNlIGN1bGxpbmcgZGlzYWJsZWQgYW5kIHR3by1zaWRlZCBsaWdodGluZyBkaXNhYmxlZCBpcyBub3Qgc3VwcG9ydGVkIGluIGdsVEYuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmRvdWJsZVNpZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhhc1RleHR1cmVDb29yZHMpIHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmRpZmZ1c2VUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4cG9ydFRleHR1cmVBc3luYyhiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKHRleHR1cmVJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yVGV4dHVyZSA9IHRleHR1cmVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgYnVtcFRleHR1cmUgPSBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5idW1wVGV4dHVyZTtcclxuICAgICAgICAgICAgaWYgKGJ1bXBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4cG9ydFRleHR1cmVBc3luYyhidW1wVGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKHRleHR1cmVJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwubm9ybWFsVGV4dHVyZSA9IHRleHR1cmVJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1bXBUZXh0dXJlLmxldmVsICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwubm9ybWFsVGV4dHVyZS5zY2FsZSA9IGJ1bXBUZXh0dXJlLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmVtaXNzaXZlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuZW1pc3NpdmVGYWN0b3IgPSBbMS4wLCAxLjAsIDEuMF07XHJcblxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9leHBvcnRUZXh0dXJlQXN5bmMoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuZW1pc3NpdmVUZXh0dXJlLCBtaW1lVHlwZSkudGhlbigodGV4dHVyZUluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHR1cmVJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5lbWlzc2l2ZVRleHR1cmUgPSB0ZXh0dXJlSW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5hbWJpZW50VGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9leHBvcnRUZXh0dXJlQXN5bmMoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuYW1iaWVudFRleHR1cmUsIG1pbWVUeXBlKS50aGVuKCh0ZXh0dXJlSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dHVyZUluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9jY2x1c2lvblRleHR1cmU6IElNYXRlcmlhbE9jY2x1c2lvblRleHR1cmVJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0ZXh0dXJlSW5mby5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5vY2NsdXNpb25UZXh0dXJlID0gb2NjbHVzaW9uVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuYWxwaGEgPCAxLjAgfHwgYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwub3BhY2l0eVRleHR1cmUpIHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmFscGhhTW9kZSA9PT0gQ29uc3RhbnRzLkFMUEhBX0NPTUJJTkUpIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFscGhhTW9kZSA9IE1hdGVyaWFsQWxwaGFNb2RlLkJMRU5EO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuV2FybihiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5uYW1lICsgXCI6IGdsVEYgMi4wIGRvZXMgbm90IHN1cHBvcnQgYWxwaGEgbW9kZTogXCIgKyBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5hbHBoYU1vZGUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsLmVtaXNzaXZlQ29sb3IgJiYgIV9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRnV6enlFcXVhbHMoYmFieWxvblN0YW5kYXJkTWF0ZXJpYWwuZW1pc3NpdmVDb2xvciwgQ29sb3IzLkJsYWNrKCksIF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbikpIHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZW1pc3NpdmVGYWN0b3IgPSBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbC5lbWlzc2l2ZUNvbG9yLmFzQXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1hdGVyaWFsLnBick1ldGFsbGljUm91Z2huZXNzID0gcGJyTWV0YWxsaWNSb3VnaG5lc3M7XHJcbiAgICAgICAgX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9TZXRBbHBoYU1vZGUobWF0ZXJpYWwsIGJhYnlsb25TdGFuZGFyZE1hdGVyaWFsKTtcclxuXHJcbiAgICAgICAgbWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG4gICAgICAgIG1hdGVyaWFsTWFwW2JhYnlsb25TdGFuZGFyZE1hdGVyaWFsLnVuaXF1ZUlkXSA9IG1hdGVyaWFscy5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fZmluaXNoTWF0ZXJpYWwocHJvbWlzZXMsIG1hdGVyaWFsLCBiYWJ5bG9uU3RhbmRhcmRNYXRlcmlhbCwgbWltZVR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2ZpbmlzaE1hdGVyaWFsPFQ+KHByb21pc2VzOiBQcm9taXNlPFQ+W10sIGdsVEZNYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsLCBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmVzID0gdGhpcy5fZXhwb3J0ZXIuX2V4dGVuc2lvbnNQb3N0RXhwb3J0TWF0ZXJpYWxBZGRpdGlvbmFsVGV4dHVyZXMoXCJleHBvcnRNYXRlcmlhbFwiLCBnbFRGTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGxldCB0YXNrczogTnVsbGFibGU8UHJvbWlzZTxOdWxsYWJsZTxJVGV4dHVyZUluZm8+PltdPiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHR1cmUgb2YgdGV4dHVyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGFza3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGFza3MucHVzaCh0aGlzLl9leHBvcnRUZXh0dXJlQXN5bmModGV4dHVyZSwgbWltZVR5cGUpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0YXNrcykge1xyXG4gICAgICAgICAgICAgICAgdGFza3MgPSBbUHJvbWlzZS5yZXNvbHZlKG51bGwpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRhc2tzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbldvcmsgPSB0aGlzLl9leHBvcnRlci5fZXh0ZW5zaW9uc1Bvc3RFeHBvcnRNYXRlcmlhbEFzeW5jKFwiZXhwb3J0TWF0ZXJpYWxcIiwgZ2xURk1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFleHRlbnNpb25Xb3JrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdsVEZNYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25Xb3JrLnRoZW4oKCkgPT4gZ2xURk1hdGVyaWFsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhbiBpbWFnZSB0eXBlZCBhcnJheSBidWZmZXIgdG8gYSBiYXNlNjQgaW1hZ2VcclxuICAgICAqIEBwYXJhbSBidWZmZXIgdHlwZWQgYXJyYXkgYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgdGhlIGltYWdlXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IGhlaWdodCBvZiB0aGUgaW1hZ2VcclxuICAgICAqIEBwYXJhbSBtaW1lVHlwZSBtaW1ldHlwZSBvZiB0aGUgaW1hZ2VcclxuICAgICAqIEByZXR1cm5zIGJhc2U2NCBpbWFnZSBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0SW1hZ2VEYXRhQXN5bmMoYnVmZmVyOiBVaW50OEFycmF5IHwgRmxvYXQzMkFycmF5LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbWltZVR5cGU6IEltYWdlTWltZVR5cGUpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZVR5cGUgPSBDb25zdGFudHMuVEVYVFVSRVRZUEVfVU5TSUdORURfSU5UO1xyXG5cclxuICAgICAgICBjb25zdCBob3N0aW5nU2NlbmUgPSB0aGlzLl9leHBvcnRlci5fYmFieWxvblNjZW5lO1xyXG4gICAgICAgIGNvbnN0IGVuZ2luZSA9IGhvc3RpbmdTY2VuZS5nZXRFbmdpbmUoKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgdGVtcG9yYXJ5IHRleHR1cmUgd2l0aCB0aGUgdGV4dHVyZSBidWZmZXIgZGF0YVxyXG4gICAgICAgIGNvbnN0IHRlbXBUZXh0dXJlID0gZW5naW5lLmNyZWF0ZVJhd1RleHR1cmUoYnVmZmVyLCB3aWR0aCwgaGVpZ2h0LCBDb25zdGFudHMuVEVYVFVSRUZPUk1BVF9SR0JBLCBmYWxzZSwgdHJ1ZSwgVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSwgbnVsbCwgdGV4dHVyZVR5cGUpO1xyXG5cclxuICAgICAgICBhd2FpdCBUZXh0dXJlVG9vbHMuQXBwbHlQb3N0UHJvY2VzcyhcInBhc3NcIiwgdGVtcFRleHR1cmUsIGhvc3RpbmdTY2VuZSwgdGV4dHVyZVR5cGUsIENvbnN0YW50cy5URVhUVVJFX05FQVJFU1RfU0FNUExJTkdNT0RFLCBDb25zdGFudHMuVEVYVFVSRUZPUk1BVF9SR0JBKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGVuZ2luZS5fcmVhZFRleHR1cmVQaXhlbHModGVtcFRleHR1cmUsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICByZXR1cm4gKGF3YWl0IER1bXBUb29scy5EdW1wRGF0YUFzeW5jKHdpZHRoLCBoZWlnaHQsIGRhdGEsIG1pbWVUeXBlLCB1bmRlZmluZWQsIHRydWUsIHRydWUpKSBhcyBBcnJheUJ1ZmZlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBhIHdoaXRlIHRleHR1cmUgYmFzZWQgb24gdGhlIHNwZWNpZmllZCB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgKiBAcGFyYW0gd2lkdGggd2lkdGggb2YgdGhlIHRleHR1cmUgaW4gcGl4ZWxzXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IGhlaWdodCBvZiB0aGUgdGV4dHVyZSBpbiBwaXhlbHNcclxuICAgICAqIEBwYXJhbSBzY2VuZSBiYWJ5bG9uanMgc2NlbmVcclxuICAgICAqIEByZXR1cm5zIHdoaXRlIHRleHR1cmVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY3JlYXRlV2hpdGVUZXh0dXJlKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBzY2VuZTogU2NlbmUpOiBUZXh0dXJlIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkod2lkdGggKiBoZWlnaHQgKiA0KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSA9IGkgKyA0KSB7XHJcbiAgICAgICAgICAgIGRhdGFbaV0gPSBkYXRhW2kgKyAxXSA9IGRhdGFbaSArIDJdID0gZGF0YVtpICsgM10gPSAweGZmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmF3VGV4dHVyZSA9IFJhd1RleHR1cmUuQ3JlYXRlUkdCQVRleHR1cmUoZGF0YSwgd2lkdGgsIGhlaWdodCwgc2NlbmUpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmF3VGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZXMgdGhlIHR3byBzb3VyY2UgdGV4dHVyZXMgdG8gdGhlIHNhbWUgZGltZW5zaW9ucy4gIElmIGEgdGV4dHVyZSBpcyBudWxsLCBhIGRlZmF1bHQgd2hpdGUgdGV4dHVyZSBpcyBnZW5lcmF0ZWQuICBJZiBib3RoIHRleHR1cmVzIGFyZSBudWxsLCByZXR1cm5zIG51bGxcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlMSBmaXJzdCB0ZXh0dXJlIHRvIHJlc2l6ZVxyXG4gICAgICogQHBhcmFtIHRleHR1cmUyIHNlY29uZCB0ZXh0dXJlIHRvIHJlc2l6ZVxyXG4gICAgICogQHBhcmFtIHNjZW5lIGJhYnlsb25qcyBzY2VuZVxyXG4gICAgICogQHJldHVybnMgcmVzaXplZCB0ZXh0dXJlcyBvciBudWxsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Jlc2l6ZVRleHR1cmVzVG9TYW1lRGltZW5zaW9ucyh0ZXh0dXJlMTogTnVsbGFibGU8QmFzZVRleHR1cmU+LCB0ZXh0dXJlMjogTnVsbGFibGU8QmFzZVRleHR1cmU+LCBzY2VuZTogU2NlbmUpOiB7IHRleHR1cmUxOiBCYXNlVGV4dHVyZTsgdGV4dHVyZTI6IEJhc2VUZXh0dXJlIH0ge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUxU2l6ZSA9IHRleHR1cmUxID8gdGV4dHVyZTEuZ2V0U2l6ZSgpIDogeyB3aWR0aDogMCwgaGVpZ2h0OiAwIH07XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZTJTaXplID0gdGV4dHVyZTIgPyB0ZXh0dXJlMi5nZXRTaXplKCkgOiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcclxuICAgICAgICBsZXQgcmVzaXplZFRleHR1cmUxOiBCYXNlVGV4dHVyZTtcclxuICAgICAgICBsZXQgcmVzaXplZFRleHR1cmUyOiBCYXNlVGV4dHVyZTtcclxuXHJcbiAgICAgICAgaWYgKHRleHR1cmUxU2l6ZS53aWR0aCA8IHRleHR1cmUyU2l6ZS53aWR0aCkge1xyXG4gICAgICAgICAgICBpZiAodGV4dHVyZTEgJiYgdGV4dHVyZTEgaW5zdGFuY2VvZiBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNpemVkVGV4dHVyZTEgPSBUZXh0dXJlVG9vbHMuQ3JlYXRlUmVzaXplZENvcHkodGV4dHVyZTEsIHRleHR1cmUyU2l6ZS53aWR0aCwgdGV4dHVyZTJTaXplLmhlaWdodCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNpemVkVGV4dHVyZTEgPSB0aGlzLl9jcmVhdGVXaGl0ZVRleHR1cmUodGV4dHVyZTJTaXplLndpZHRoLCB0ZXh0dXJlMlNpemUuaGVpZ2h0LCBzY2VuZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzaXplZFRleHR1cmUyID0gdGV4dHVyZTIhO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGV4dHVyZTFTaXplLndpZHRoID4gdGV4dHVyZTJTaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlMiAmJiB0ZXh0dXJlMiBpbnN0YW5jZW9mIFRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHJlc2l6ZWRUZXh0dXJlMiA9IFRleHR1cmVUb29scy5DcmVhdGVSZXNpemVkQ29weSh0ZXh0dXJlMiwgdGV4dHVyZTFTaXplLndpZHRoLCB0ZXh0dXJlMVNpemUuaGVpZ2h0LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc2l6ZWRUZXh0dXJlMiA9IHRoaXMuX2NyZWF0ZVdoaXRlVGV4dHVyZSh0ZXh0dXJlMVNpemUud2lkdGgsIHRleHR1cmUxU2l6ZS5oZWlnaHQsIHNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNpemVkVGV4dHVyZTEgPSB0ZXh0dXJlMSE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzaXplZFRleHR1cmUxID0gdGV4dHVyZTEhO1xyXG4gICAgICAgICAgICByZXNpemVkVGV4dHVyZTIgPSB0ZXh0dXJlMiE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0ZXh0dXJlMTogcmVzaXplZFRleHR1cmUxISxcclxuICAgICAgICAgICAgdGV4dHVyZTI6IHJlc2l6ZWRUZXh0dXJlMiEsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIGFuIGFycmF5IG9mIHBpeGVscyB0byBhIEZsb2F0MzJBcnJheVxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBwaXhlbCBmb3JtYXQgaXMgbm90IHN1cHBvcnRlZFxyXG4gICAgICogQHBhcmFtIHBpeGVscyAtIGFycmF5IGJ1ZmZlciBjb250YWluaW5nIHBpeGVsIHZhbHVlc1xyXG4gICAgICogQHJldHVybnMgRmxvYXQzMiBvZiBwaXhlbHNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY29udmVydFBpeGVsQXJyYXlUb0Zsb2F0MzIocGl4ZWxzOiBBcnJheUJ1ZmZlclZpZXcpOiBGbG9hdDMyQXJyYXkge1xyXG4gICAgICAgIGlmIChwaXhlbHMgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHBpeGVscy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkocGl4ZWxzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IHBpeGVsc1tpXSAvIDI1NTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGl4ZWxzIGluc3RhbmNlb2YgRmxvYXQzMkFycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwaXhlbHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgcGl4ZWwgZm9ybWF0IVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IFNwZWN1bGFyIEdsb3NzaW5lc3MgVGV4dHVyZXMgdG8gTWV0YWxsaWMgUm91Z2huZXNzXHJcbiAgICAgKiBTZWUgbGluayBiZWxvdyBmb3IgaW5mbyBvbiB0aGUgbWF0ZXJpYWwgY29udmVyc2lvbnMgZnJvbSBQQlIgTWV0YWxsaWMvUm91Z2huZXNzIGFuZCBTcGVjdWxhci9HbG9zc2luZXNzXHJcbiAgICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0FyY2hpdmVkL0tIUl9tYXRlcmlhbHNfcGJyU3BlY3VsYXJHbG9zc2luZXNzL2V4YW1wbGVzL2NvbnZlcnQtYmV0d2Vlbi13b3JrZmxvd3MtYmpzL2pzL2JhYnlsb24ucGJyVXRpbGl0aWVzLmpzXHJcbiAgICAgKiBAcGFyYW0gZGlmZnVzZVRleHR1cmUgdGV4dHVyZSB1c2VkIHRvIHN0b3JlIGRpZmZ1c2UgaW5mb3JtYXRpb25cclxuICAgICAqIEBwYXJhbSBzcGVjdWxhckdsb3NzaW5lc3NUZXh0dXJlIHRleHR1cmUgdXNlZCB0byBzdG9yZSBzcGVjdWxhciBhbmQgZ2xvc3NpbmVzcyBpbmZvcm1hdGlvblxyXG4gICAgICogQHBhcmFtIGZhY3RvcnMgc3BlY3VsYXIgZ2xvc3NpbmVzcyBtYXRlcmlhbCBmYWN0b3JzXHJcbiAgICAgKiBAcGFyYW0gbWltZVR5cGUgdGhlIG1pbWUgdHlwZSB0byB1c2UgZm9yIHRoZSB0ZXh0dXJlXHJcbiAgICAgKiBAcmV0dXJucyBwYnIgbWV0YWxsaWMgcm91Z2huZXNzIGludGVyZmFjZSBvciBudWxsXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgX2NvbnZlcnRTcGVjdWxhckdsb3NzaW5lc3NUZXh0dXJlc1RvTWV0YWxsaWNSb3VnaG5lc3NBc3luYyhcclxuICAgICAgICBkaWZmdXNlVGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+LFxyXG4gICAgICAgIHNwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPixcclxuICAgICAgICBmYWN0b3JzOiBfSVBCUlNwZWN1bGFyR2xvc3NpbmVzcyxcclxuICAgICAgICBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZVxyXG4gICAgKTogUHJvbWlzZTxfSVBCUk1ldGFsbGljUm91Z2huZXNzPiB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTx2b2lkPj4oKTtcclxuICAgICAgICBpZiAoIShkaWZmdXNlVGV4dHVyZSB8fCBzcGVjdWxhckdsb3NzaW5lc3NUZXh0dXJlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJfQ29udmVydFNwZWN1bGFyR2xvc2luZXNzVGV4dHVyZXNUb01ldGFsbGljUm91Z2huZXNzOiBkaWZmdXNlIGFuZCBzcGVjdWxhciBnbG9zc2luZXNzIHRleHR1cmVzIGFyZSBub3QgZGVmaW5lZCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzY2VuZTogTnVsbGFibGU8U2NlbmU+ID0gZGlmZnVzZVRleHR1cmUgPyBkaWZmdXNlVGV4dHVyZS5nZXRTY2VuZSgpIDogc3BlY3VsYXJHbG9zc2luZXNzVGV4dHVyZSA/IHNwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmUuZ2V0U2NlbmUoKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHNjZW5lKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc2l6ZWRUZXh0dXJlcyA9IHRoaXMuX3Jlc2l6ZVRleHR1cmVzVG9TYW1lRGltZW5zaW9ucyhkaWZmdXNlVGV4dHVyZSwgc3BlY3VsYXJHbG9zc2luZXNzVGV4dHVyZSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGlmZnVzZVNpemUgPSByZXNpemVkVGV4dHVyZXMudGV4dHVyZTE/LmdldFNpemUoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaWZmdXNlQnVmZmVyOiBGbG9hdDMyQXJyYXk7XHJcbiAgICAgICAgICAgIGxldCBzcGVjdWxhckdsb3NzaW5lc3NCdWZmZXI6IEZsb2F0MzJBcnJheTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gZGlmZnVzZVNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGRpZmZ1c2VTaXplLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpZmZ1c2VQaXhlbHMgPSBhd2FpdCByZXNpemVkVGV4dHVyZXMudGV4dHVyZTEucmVhZFBpeGVscygpO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVjdWxhclBpeGVscyA9IGF3YWl0IHJlc2l6ZWRUZXh0dXJlcy50ZXh0dXJlMi5yZWFkUGl4ZWxzKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlmZnVzZVBpeGVscykge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZUJ1ZmZlciA9IHRoaXMuX2NvbnZlcnRQaXhlbEFycmF5VG9GbG9hdDMyKGRpZmZ1c2VQaXhlbHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiRmFpbGVkIHRvIHJldHJpZXZlIHBpeGVscyBmcm9tIGRpZmZ1c2UgdGV4dHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNwZWN1bGFyUGl4ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVjdWxhckdsb3NzaW5lc3NCdWZmZXIgPSB0aGlzLl9jb252ZXJ0UGl4ZWxBcnJheVRvRmxvYXQzMihzcGVjdWxhclBpeGVscyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJGYWlsZWQgdG8gcmV0cmlldmUgcGl4ZWxzIGZyb20gc3BlY3VsYXIgZ2xvc3NpbmVzcyB0ZXh0dXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYnl0ZUxlbmd0aCA9IHNwZWN1bGFyR2xvc3NpbmVzc0J1ZmZlci5ieXRlTGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbWV0YWxsaWNSb3VnaG5lc3NCdWZmZXIgPSBuZXcgVWludDhBcnJheShieXRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc3QgYmFzZUNvbG9yQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZUxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdHJpZGVTaXplID0gNDtcclxuICAgICAgICAgICAgY29uc3QgbWF4QmFzZUNvbG9yID0gQ29sb3IzLkJsYWNrKCk7XHJcbiAgICAgICAgICAgIGxldCBtYXhNZXRhbGxpYyA9IDA7XHJcbiAgICAgICAgICAgIGxldCBtYXhSb3VnaG5lc3MgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCBoZWlnaHQ7ICsraCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdyA9IDA7IHcgPCB3aWR0aDsgKyt3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHdpZHRoICogaCArIHcpICogc3RyaWRlU2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZnVzZUNvbG9yID0gbmV3IENvbG9yMyhkaWZmdXNlQnVmZmVyW29mZnNldF0sIGRpZmZ1c2VCdWZmZXJbb2Zmc2V0ICsgMV0sIGRpZmZ1c2VCdWZmZXJbb2Zmc2V0ICsgMl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50b0xpbmVhclNwYWNlKHNjZW5lLmdldEVuZ2luZSgpLnVzZUV4YWN0U3JnYkNvbnZlcnNpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubXVsdGlwbHkoZmFjdG9ycy5kaWZmdXNlQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwZWN1bGFyQ29sb3IgPSBuZXcgQ29sb3IzKHNwZWN1bGFyR2xvc3NpbmVzc0J1ZmZlcltvZmZzZXRdLCBzcGVjdWxhckdsb3NzaW5lc3NCdWZmZXJbb2Zmc2V0ICsgMV0sIHNwZWN1bGFyR2xvc3NpbmVzc0J1ZmZlcltvZmZzZXQgKyAyXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvTGluZWFyU3BhY2Uoc2NlbmUuZ2V0RW5naW5lKCkudXNlRXhhY3RTcmdiQ29udmVyc2lvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tdWx0aXBseShmYWN0b3JzLnNwZWN1bGFyQ29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdsb3NzaW5lc3MgPSBzcGVjdWxhckdsb3NzaW5lc3NCdWZmZXJbb2Zmc2V0ICsgM10gKiBmYWN0b3JzLmdsb3NzaW5lc3M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwZWN1bGFyR2xvc3NpbmVzczogX0lQQlJTcGVjdWxhckdsb3NzaW5lc3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZ1c2VDb2xvcjogZGlmZnVzZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVjdWxhckNvbG9yOiBzcGVjdWxhckNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9zc2luZXNzOiBnbG9zc2luZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFsbGljUm91Z2huZXNzID0gdGhpcy5fY29udmVydFNwZWN1bGFyR2xvc3NpbmVzc1RvTWV0YWxsaWNSb3VnaG5lc3Moc3BlY3VsYXJHbG9zc2luZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXhCYXNlQ29sb3IuciA9IE1hdGgubWF4KG1heEJhc2VDb2xvci5yLCBtZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3Iucik7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4QmFzZUNvbG9yLmcgPSBNYXRoLm1heChtYXhCYXNlQ29sb3IuZywgbWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yLmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heEJhc2VDb2xvci5iID0gTWF0aC5tYXgobWF4QmFzZUNvbG9yLmIsIG1ldGFsbGljUm91Z2huZXNzLmJhc2VDb2xvci5iKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXhNZXRhbGxpYyA9IE1hdGgubWF4KG1heE1ldGFsbGljLCBtZXRhbGxpY1JvdWdobmVzcy5tZXRhbGxpYyEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heFJvdWdobmVzcyA9IE1hdGgubWF4KG1heFJvdWdobmVzcywgbWV0YWxsaWNSb3VnaG5lc3Mucm91Z2huZXNzISk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltvZmZzZXRdID0gbWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yLnIgKiAyNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yQnVmZmVyW29mZnNldCArIDFdID0gbWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yLmcgKiAyNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yQnVmZmVyW29mZnNldCArIDJdID0gbWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yLmIgKiAyNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yQnVmZmVyW29mZnNldCArIDNdID0gcmVzaXplZFRleHR1cmVzLnRleHR1cmUxLmhhc0FscGhhID8gZGlmZnVzZUJ1ZmZlcltvZmZzZXQgKyAzXSAqIDI1NSA6IDI1NTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0YWxsaWNSb3VnaG5lc3NCdWZmZXJbb2Zmc2V0XSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0YWxsaWNSb3VnaG5lc3NCdWZmZXJbb2Zmc2V0ICsgMV0gPSBtZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3MhICogMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFsbGljUm91Z2huZXNzQnVmZmVyW29mZnNldCArIDJdID0gbWV0YWxsaWNSb3VnaG5lc3MubWV0YWxsaWMhICogMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFsbGljUm91Z2huZXNzQnVmZmVyW29mZnNldCArIDNdID0gMjU1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZXRyaWV2ZXMgdGhlIG1ldGFsbGljIHJvdWdobmVzcyBmYWN0b3JzIGZyb20gdGhlIG1heGltdW0gdGV4dHVyZSB2YWx1ZXMuXHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGFsbGljUm91Z2huZXNzRmFjdG9yczogX0lQQlJNZXRhbGxpY1JvdWdobmVzcyA9IHtcclxuICAgICAgICAgICAgICAgIGJhc2VDb2xvcjogbWF4QmFzZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxsaWM6IG1heE1ldGFsbGljLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiBtYXhSb3VnaG5lc3MsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgd3JpdGVPdXRNZXRhbGxpY1JvdWdobmVzc1RleHR1cmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHdyaXRlT3V0QmFzZUNvbG9yVGV4dHVyZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCBoZWlnaHQ7ICsraCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdyA9IDA7IHcgPCB3aWR0aDsgKyt3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb25PZmZzZXQgPSAod2lkdGggKiBoICsgdykgKiBzdHJpZGVTaXplO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ29sb3JCdWZmZXJbZGVzdGluYXRpb25PZmZzZXRdIC89IG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5iYXNlQ29sb3IuciA+IF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbiA/IG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5iYXNlQ29sb3IuciA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yQnVmZmVyW2Rlc3RpbmF0aW9uT2Zmc2V0ICsgMV0gLz0gbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzLmJhc2VDb2xvci5nID4gX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9FcHNpbG9uID8gbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzLmJhc2VDb2xvci5nIDogMTtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ29sb3JCdWZmZXJbZGVzdGluYXRpb25PZmZzZXQgKyAyXSAvPSBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMuYmFzZUNvbG9yLmIgPiBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX0Vwc2lsb24gPyBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMuYmFzZUNvbG9yLmIgOiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lYXJCYXNlQ29sb3JQaXhlbCA9IENvbG9yMy5Gcm9tSW50cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yQnVmZmVyW2Rlc3RpbmF0aW9uT2Zmc2V0XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZUNvbG9yQnVmZmVyW2Rlc3RpbmF0aW9uT2Zmc2V0ICsgMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltkZXN0aW5hdGlvbk9mZnNldCArIDJdXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzUkdCQmFzZUNvbG9yUGl4ZWwgPSBsaW5lYXJCYXNlQ29sb3JQaXhlbC50b0dhbW1hU3BhY2Uoc2NlbmUuZ2V0RW5naW5lKCkudXNlRXhhY3RTcmdiQ29udmVyc2lvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltkZXN0aW5hdGlvbk9mZnNldF0gPSBzUkdCQmFzZUNvbG9yUGl4ZWwuciAqIDI1NTtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ29sb3JCdWZmZXJbZGVzdGluYXRpb25PZmZzZXQgKyAxXSA9IHNSR0JCYXNlQ29sb3JQaXhlbC5nICogMjU1O1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb2xvckJ1ZmZlcltkZXN0aW5hdGlvbk9mZnNldCArIDJdID0gc1JHQkJhc2VDb2xvclBpeGVsLmIgKiAyNTU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9GdXp6eUVxdWFscyhzUkdCQmFzZUNvbG9yUGl4ZWwsIENvbG9yMy5XaGl0ZSgpLCBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX0Vwc2lsb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlT3V0QmFzZUNvbG9yVGV4dHVyZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZXRhbGxpY1JvdWdobmVzc0J1ZmZlcltkZXN0aW5hdGlvbk9mZnNldCArIDFdIC89XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5yb3VnaG5lc3MhID4gX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9FcHNpbG9uID8gbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzLnJvdWdobmVzcyEgOiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFsbGljUm91Z2huZXNzQnVmZmVyW2Rlc3RpbmF0aW9uT2Zmc2V0ICsgMl0gLz0gbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzLm1ldGFsbGljISA+IF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbiA/IG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5tZXRhbGxpYyEgOiAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXRhbGxpY1JvdWdobmVzc1BpeGVsID0gQ29sb3IzLkZyb21JbnRzKDI1NSwgbWV0YWxsaWNSb3VnaG5lc3NCdWZmZXJbZGVzdGluYXRpb25PZmZzZXQgKyAxXSwgbWV0YWxsaWNSb3VnaG5lc3NCdWZmZXJbZGVzdGluYXRpb25PZmZzZXQgKyAyXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9GdXp6eUVxdWFscyhtZXRhbGxpY1JvdWdobmVzc1BpeGVsLCBDb2xvcjMuV2hpdGUoKSwgX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9FcHNpbG9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZU91dE1ldGFsbGljUm91Z2huZXNzVGV4dHVyZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAod3JpdGVPdXRNZXRhbGxpY1JvdWdobmVzc1RleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0SW1hZ2VEYXRhQXN5bmMobWV0YWxsaWNSb3VnaG5lc3NCdWZmZXIsIHdpZHRoLCBoZWlnaHQsIG1pbWVUeXBlKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5tZXRhbGxpY1JvdWdobmVzc1RleHR1cmVEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAod3JpdGVPdXRCYXNlQ29sb3JUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldEltYWdlRGF0YUFzeW5jKGJhc2VDb2xvckJ1ZmZlciwgd2lkdGgsIGhlaWdodCwgbWltZVR5cGUpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzLmJhc2VDb2xvclRleHR1cmVEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIl9Db252ZXJ0U3BlY3VsYXJHbG9zc2luZXNzVGV4dHVyZXNUb01ldGFsbGljUm91Z2huZXNzOiBTY2VuZSBmcm9tIHRleHR1cmVzIGlzIG1pc3NpbmchXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHNwZWN1bGFyIGdsb3NzaW5lc3MgbWF0ZXJpYWwgcHJvcGVydGllcyB0byBtZXRhbGxpYyByb3VnaG5lc3NcclxuICAgICAqIEBwYXJhbSBzcGVjdWxhckdsb3NzaW5lc3MgaW50ZXJmYWNlIHdpdGggc3BlY3VsYXIgZ2xvc3NpbmVzcyBtYXRlcmlhbCBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJucyBpbnRlcmZhY2Ugd2l0aCBtZXRhbGxpYyByb3VnaG5lc3MgbWF0ZXJpYWwgcHJvcGVydGllc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb252ZXJ0U3BlY3VsYXJHbG9zc2luZXNzVG9NZXRhbGxpY1JvdWdobmVzcyhzcGVjdWxhckdsb3NzaW5lc3M6IF9JUEJSU3BlY3VsYXJHbG9zc2luZXNzKTogX0lQQlJNZXRhbGxpY1JvdWdobmVzcyB7XHJcbiAgICAgICAgY29uc3QgZGlmZnVzZVBlcmNlaXZlZEJyaWdodG5lc3MgPSB0aGlzLl9nZXRQZXJjZWl2ZWRCcmlnaHRuZXNzKHNwZWN1bGFyR2xvc3NpbmVzcy5kaWZmdXNlQ29sb3IpO1xyXG4gICAgICAgIGNvbnN0IHNwZWN1bGFyUGVyY2VpdmVkQnJpZ2h0bmVzcyA9IHRoaXMuX2dldFBlcmNlaXZlZEJyaWdodG5lc3Moc3BlY3VsYXJHbG9zc2luZXNzLnNwZWN1bGFyQ29sb3IpO1xyXG4gICAgICAgIGNvbnN0IG9uZU1pbnVzU3BlY3VsYXJTdHJlbmd0aCA9IDEgLSB0aGlzLl9nZXRNYXhDb21wb25lbnQoc3BlY3VsYXJHbG9zc2luZXNzLnNwZWN1bGFyQ29sb3IpO1xyXG4gICAgICAgIGNvbnN0IG1ldGFsbGljID0gX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9Tb2x2ZU1ldGFsbGljKGRpZmZ1c2VQZXJjZWl2ZWRCcmlnaHRuZXNzLCBzcGVjdWxhclBlcmNlaXZlZEJyaWdodG5lc3MsIG9uZU1pbnVzU3BlY3VsYXJTdHJlbmd0aCk7XHJcbiAgICAgICAgY29uc3QgYmFzZUNvbG9yRnJvbURpZmZ1c2UgPSBzcGVjdWxhckdsb3NzaW5lc3MuZGlmZnVzZUNvbG9yLnNjYWxlKFxyXG4gICAgICAgICAgICBvbmVNaW51c1NwZWN1bGFyU3RyZW5ndGggLyAoMS4wIC0gX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9EaWVsZWN0cmljU3BlY3VsYXIucikgLyBNYXRoLm1heCgxIC0gbWV0YWxsaWMsIF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbilcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGJhc2VDb2xvckZyb21TcGVjdWxhciA9IHNwZWN1bGFyR2xvc3NpbmVzcy5zcGVjdWxhckNvbG9yXHJcbiAgICAgICAgICAgIC5zdWJ0cmFjdChfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX0RpZWxlY3RyaWNTcGVjdWxhci5zY2FsZSgxIC0gbWV0YWxsaWMpKVxyXG4gICAgICAgICAgICAuc2NhbGUoMSAvIE1hdGgubWF4KG1ldGFsbGljLCBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX0Vwc2lsb24pKTtcclxuICAgICAgICBsZXQgYmFzZUNvbG9yID0gQ29sb3IzLkxlcnAoYmFzZUNvbG9yRnJvbURpZmZ1c2UsIGJhc2VDb2xvckZyb21TcGVjdWxhciwgbWV0YWxsaWMgKiBtZXRhbGxpYyk7XHJcbiAgICAgICAgYmFzZUNvbG9yID0gYmFzZUNvbG9yLmNsYW1wVG9SZWYoMCwgMSwgYmFzZUNvbG9yKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWV0YWxsaWNSb3VnaG5lc3M6IF9JUEJSTWV0YWxsaWNSb3VnaG5lc3MgPSB7XHJcbiAgICAgICAgICAgIGJhc2VDb2xvcjogYmFzZUNvbG9yLFxyXG4gICAgICAgICAgICBtZXRhbGxpYzogbWV0YWxsaWMsXHJcbiAgICAgICAgICAgIHJvdWdobmVzczogMSAtIHNwZWN1bGFyR2xvc3NpbmVzcy5nbG9zc2luZXNzLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBtZXRhbGxpY1JvdWdobmVzcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHN1cmZhY2UgcmVmbGVjdGFuY2UsIGluZGVwZW5kZW50IG9mIGxpZ2h0aW5nIGNvbmRpdGlvbnNcclxuICAgICAqIEBwYXJhbSBjb2xvciBDb2xvciBzb3VyY2UgdG8gY2FsY3VsYXRlIGJyaWdodG5lc3MgZnJvbVxyXG4gICAgICogQHJldHVybnMgbnVtYmVyIHJlcHJlc2VudGluZyB0aGUgcGVyY2VpdmVkIGJyaWdodG5lc3MsIG9yIHplcm8gaWYgY29sb3IgaXMgdW5kZWZpbmVkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldFBlcmNlaXZlZEJyaWdodG5lc3MoY29sb3I6IENvbG9yMyk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoMC4yOTkgKiBjb2xvci5yICogY29sb3IuciArIDAuNTg3ICogY29sb3IuZyAqIGNvbG9yLmcgKyAwLjExNCAqIGNvbG9yLmIgKiBjb2xvci5iKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBtYXhpbXVtIGNvbG9yIGNvbXBvbmVudCB2YWx1ZVxyXG4gICAgICogQHBhcmFtIGNvbG9yXHJcbiAgICAgKiBAcmV0dXJucyBtYXhpbXVtIGNvbG9yIGNvbXBvbmVudCB2YWx1ZSwgb3IgemVybyBpZiBjb2xvciBpcyBudWxsIG9yIHVuZGVmaW5lZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9nZXRNYXhDb21wb25lbnQoY29sb3I6IENvbG9yMyk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChjb2xvci5yLCBNYXRoLm1heChjb2xvci5nLCBjb2xvci5iKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBhIFBCUk1hdGVyaWFsIChNZXRhbGxpYy9Sb3VnaG5lc3MpIHRvIE1ldGFsbGljIFJvdWdobmVzcyBmYWN0b3JzXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblBCUk1hdGVyaWFsIEJKUyBQQlIgTWV0YWxsaWMgUm91Z2huZXNzIE1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gbWltZVR5cGUgbWltZSB0eXBlIHRvIHVzZSBmb3IgdGhlIHRleHR1cmVzXHJcbiAgICAgKiBAcGFyYW0gZ2xURlBick1ldGFsbGljUm91Z2huZXNzIGdsVEYgUEJSIE1ldGFsbGljIFJvdWdobmVzcyBpbnRlcmZhY2VcclxuICAgICAqIEBwYXJhbSBoYXNUZXh0dXJlQ29vcmRzIHNwZWNpZmllcyBpZiB0ZXh0dXJlIGNvb3JkaW5hdGVzIGFyZSBwcmVzZW50IG9uIHRoZSBzdWJtZXNoIHRvIGRldGVybWluZSBpZiB0ZXh0dXJlcyBzaG91bGQgYmUgYXBwbGllZFxyXG4gICAgICogQHJldHVybnMgZ2xURiBQQlIgTWV0YWxsaWMgUm91Z2huZXNzIGZhY3RvcnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY29udmVydE1ldGFsUm91Z2hGYWN0b3JzVG9NZXRhbGxpY1JvdWdobmVzc0FzeW5jKFxyXG4gICAgICAgIGJhYnlsb25QQlJNYXRlcmlhbDogUEJSQmFzZU1hdGVyaWFsLFxyXG4gICAgICAgIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlLFxyXG4gICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzczogSU1hdGVyaWFsUGJyTWV0YWxsaWNSb3VnaG5lc3MsXHJcbiAgICAgICAgaGFzVGV4dHVyZUNvb3JkczogYm9vbGVhblxyXG4gICAgKTogUHJvbWlzZTxfSVBCUk1ldGFsbGljUm91Z2huZXNzPiB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgICAgICBjb25zdCBiYXNlQ29sb3IgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2FsYmVkb0NvbG9yO1xyXG4gICAgICAgIGNvbnN0IG1ldGFsbGljID0gYmFieWxvblBCUk1hdGVyaWFsLl9tZXRhbGxpYztcclxuICAgICAgICBjb25zdCByb3VnaG5lc3MgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX3JvdWdobmVzcztcclxuICAgICAgICBjb25zdCBtZXRhbGxpY1JvdWdobmVzczogX0lQQlJNZXRhbGxpY1JvdWdobmVzcyA9IHtcclxuICAgICAgICAgICAgYmFzZUNvbG9yOiBiYXNlQ29sb3IsXHJcbiAgICAgICAgICAgIG1ldGFsbGljOiBtZXRhbGxpYyxcclxuICAgICAgICAgICAgcm91Z2huZXNzOiByb3VnaG5lc3MsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGhhc1RleHR1cmVDb29yZHMpIHtcclxuICAgICAgICAgICAgY29uc3QgYWxiZWRvVGV4dHVyZSA9IGJhYnlsb25QQlJNYXRlcmlhbC5fYWxiZWRvVGV4dHVyZTtcclxuICAgICAgICAgICAgaWYgKGFsYmVkb1RleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXhwb3J0VGV4dHVyZUFzeW5jKGJhYnlsb25QQlJNYXRlcmlhbC5fYWxiZWRvVGV4dHVyZSEsIG1pbWVUeXBlKS50aGVuKChnbFRGVGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2xURlRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3JUZXh0dXJlID0gZ2xURlRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBtZXRhbGxpY1RleHR1cmUgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX21ldGFsbGljVGV4dHVyZTtcclxuICAgICAgICAgICAgaWYgKG1ldGFsbGljVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9leHBvcnRUZXh0dXJlQXN5bmMobWV0YWxsaWNUZXh0dXJlLCBtaW1lVHlwZSkudGhlbigoZ2xURlRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdsVEZUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3MubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlID0gZ2xURlRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbWV0YWxsaWNSb3VnaG5lc3M7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0VGV4dHVyZVNhbXBsZXIodGV4dHVyZTogTnVsbGFibGU8QmFzZVRleHR1cmU+KTogSVNhbXBsZXIge1xyXG4gICAgICAgIGNvbnN0IHNhbXBsZXI6IElTYW1wbGVyID0ge307XHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlIHx8ICEodGV4dHVyZSBpbnN0YW5jZW9mIFRleHR1cmUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzYW1wbGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgd3JhcFMgPSB0aGlzLl9nZXRHTFRGVGV4dHVyZVdyYXBNb2RlKHRleHR1cmUud3JhcFUpO1xyXG4gICAgICAgIGlmICh3cmFwUyAhPT0gVGV4dHVyZVdyYXBNb2RlLlJFUEVBVCkge1xyXG4gICAgICAgICAgICBzYW1wbGVyLndyYXBTID0gd3JhcFM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB3cmFwVCA9IHRoaXMuX2dldEdMVEZUZXh0dXJlV3JhcE1vZGUodGV4dHVyZS53cmFwVik7XHJcbiAgICAgICAgaWYgKHdyYXBUICE9PSBUZXh0dXJlV3JhcE1vZGUuUkVQRUFUKSB7XHJcbiAgICAgICAgICAgIHNhbXBsZXIud3JhcFQgPSB3cmFwVDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGV4dHVyZS5zYW1wbGluZ01vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLkxJTkVBUl9MSU5FQVI6IHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWFnRmlsdGVyID0gVGV4dHVyZU1hZ0ZpbHRlci5MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1pbkZpbHRlciA9IFRleHR1cmVNaW5GaWx0ZXIuTElORUFSO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLkxJTkVBUl9ORUFSRVNUOiB7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1hZ0ZpbHRlciA9IFRleHR1cmVNYWdGaWx0ZXIuTElORUFSO1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPSBUZXh0dXJlTWluRmlsdGVyLk5FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmUuTkVBUkVTVF9MSU5FQVI6IHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWFnRmlsdGVyID0gVGV4dHVyZU1hZ0ZpbHRlci5ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPSBUZXh0dXJlTWluRmlsdGVyLkxJTkVBUjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZS5ORUFSRVNUX0xJTkVBUl9NSVBMSU5FQVI6IHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWFnRmlsdGVyID0gVGV4dHVyZU1hZ0ZpbHRlci5ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPSBUZXh0dXJlTWluRmlsdGVyLkxJTkVBUl9NSVBNQVBfTElORUFSO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLk5FQVJFU1RfTkVBUkVTVDoge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5tYWdGaWx0ZXIgPSBUZXh0dXJlTWFnRmlsdGVyLk5FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1pbkZpbHRlciA9IFRleHR1cmVNaW5GaWx0ZXIuTkVBUkVTVDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZS5ORUFSRVNUX0xJTkVBUl9NSVBORUFSRVNUOiB7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1hZ0ZpbHRlciA9IFRleHR1cmVNYWdGaWx0ZXIuTkVBUkVTVDtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWluRmlsdGVyID0gVGV4dHVyZU1pbkZpbHRlci5MSU5FQVJfTUlQTUFQX05FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmUuTElORUFSX05FQVJFU1RfTUlQTkVBUkVTVDoge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5tYWdGaWx0ZXIgPSBUZXh0dXJlTWFnRmlsdGVyLkxJTkVBUjtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWluRmlsdGVyID0gVGV4dHVyZU1pbkZpbHRlci5ORUFSRVNUX01JUE1BUF9ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLkxJTkVBUl9ORUFSRVNUX01JUExJTkVBUjoge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5tYWdGaWx0ZXIgPSBUZXh0dXJlTWFnRmlsdGVyLkxJTkVBUjtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWluRmlsdGVyID0gVGV4dHVyZU1pbkZpbHRlci5ORUFSRVNUX01JUE1BUF9MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmUuTkVBUkVTVF9ORUFSRVNUX01JUExJTkVBUjoge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5tYWdGaWx0ZXIgPSBUZXh0dXJlTWFnRmlsdGVyLk5FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1pbkZpbHRlciA9IFRleHR1cmVNaW5GaWx0ZXIuTkVBUkVTVF9NSVBNQVBfTElORUFSO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLkxJTkVBUl9MSU5FQVJfTUlQTElORUFSOiB7XHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLm1hZ0ZpbHRlciA9IFRleHR1cmVNYWdGaWx0ZXIuTElORUFSO1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPSBUZXh0dXJlTWluRmlsdGVyLkxJTkVBUl9NSVBNQVBfTElORUFSO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlLkxJTkVBUl9MSU5FQVJfTUlQTkVBUkVTVDoge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5tYWdGaWx0ZXIgPSBUZXh0dXJlTWFnRmlsdGVyLkxJTkVBUjtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWluRmlsdGVyID0gVGV4dHVyZU1pbkZpbHRlci5MSU5FQVJfTUlQTUFQX05FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmUuTkVBUkVTVF9ORUFSRVNUX01JUE5FQVJFU1Q6IHtcclxuICAgICAgICAgICAgICAgIHNhbXBsZXIubWFnRmlsdGVyID0gVGV4dHVyZU1hZ0ZpbHRlci5ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPSBUZXh0dXJlTWluRmlsdGVyLk5FQVJFU1RfTUlQTUFQX05FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNhbXBsZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0R0xURlRleHR1cmVXcmFwTW9kZSh3cmFwTW9kZTogbnVtYmVyKTogVGV4dHVyZVdyYXBNb2RlIHtcclxuICAgICAgICBzd2l0Y2ggKHdyYXBNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZS5XUkFQX0FERFJFU1NNT0RFOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZVdyYXBNb2RlLlJFUEVBVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmUuQ0xBTVBfQUREUkVTU01PREU6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBUZXh0dXJlV3JhcE1vZGUuQ0xBTVBfVE9fRURHRTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZVdyYXBNb2RlLk1JUlJPUkVEX1JFUEVBVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihgVW5zdXBwb3J0ZWQgVGV4dHVyZSBXcmFwIE1vZGUgJHt3cmFwTW9kZX0hYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZVdyYXBNb2RlLlJFUEVBVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgYSBQQlJNYXRlcmlhbCAoU3BlY3VsYXIvR2xvc3NpbmVzcykgdG8gTWV0YWxsaWMgUm91Z2huZXNzIGZhY3RvcnNcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uUEJSTWF0ZXJpYWwgQkpTIFBCUiBNZXRhbGxpYyBSb3VnaG5lc3MgTWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBtaW1lVHlwZSBtaW1lIHR5cGUgdG8gdXNlIGZvciB0aGUgdGV4dHVyZXNcclxuICAgICAqIEBwYXJhbSBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3MgZ2xURiBQQlIgTWV0YWxsaWMgUm91Z2huZXNzIGludGVyZmFjZVxyXG4gICAgICogQHBhcmFtIGhhc1RleHR1cmVDb29yZHMgc3BlY2lmaWVzIGlmIHRleHR1cmUgY29vcmRpbmF0ZXMgYXJlIHByZXNlbnQgb24gdGhlIHN1Ym1lc2ggdG8gZGV0ZXJtaW5lIGlmIHRleHR1cmVzIHNob3VsZCBiZSBhcHBsaWVkXHJcbiAgICAgKiBAcmV0dXJucyBnbFRGIFBCUiBNZXRhbGxpYyBSb3VnaG5lc3MgZmFjdG9yc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb252ZXJ0U3BlY0dsb3NzRmFjdG9yc1RvTWV0YWxsaWNSb3VnaG5lc3NBc3luYyhcclxuICAgICAgICBiYWJ5bG9uUEJSTWF0ZXJpYWw6IFBCUkJhc2VNYXRlcmlhbCxcclxuICAgICAgICBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSxcclxuICAgICAgICBwYnJNZXRhbGxpY1JvdWdobmVzczogSU1hdGVyaWFsUGJyTWV0YWxsaWNSb3VnaG5lc3MsXHJcbiAgICAgICAgaGFzVGV4dHVyZUNvb3JkczogYm9vbGVhblxyXG4gICAgKTogUHJvbWlzZTxfSVBCUk1ldGFsbGljUm91Z2huZXNzPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzcGVjR2xvc3M6IF9JUEJSU3BlY3VsYXJHbG9zc2luZXNzID0ge1xyXG4gICAgICAgICAgICAgICAgZGlmZnVzZUNvbG9yOiBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2FsYmVkb0NvbG9yLFxyXG4gICAgICAgICAgICAgICAgc3BlY3VsYXJDb2xvcjogYmFieWxvblBCUk1hdGVyaWFsLl9yZWZsZWN0aXZpdHlDb2xvcixcclxuICAgICAgICAgICAgICAgIGdsb3NzaW5lc3M6IGJhYnlsb25QQlJNYXRlcmlhbC5fbWljcm9TdXJmYWNlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBhbGJlZG9UZXh0dXJlID0gYmFieWxvblBCUk1hdGVyaWFsLl9hbGJlZG9UZXh0dXJlO1xyXG4gICAgICAgICAgICBjb25zdCByZWZsZWN0aXZpdHlUZXh0dXJlID0gYmFieWxvblBCUk1hdGVyaWFsLl9yZWZsZWN0aXZpdHlUZXh0dXJlO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VNaWNyb3N1cmZhY2VGcm9tUmVmbGVjdGl2aXR5TWFwQWxwaGEgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX3VzZU1pY3JvU3VyZmFjZUZyb21SZWZsZWN0aXZpdHlNYXBBbHBoYTtcclxuICAgICAgICAgICAgaWYgKHJlZmxlY3Rpdml0eVRleHR1cmUgJiYgIXVzZU1pY3Jvc3VyZmFjZUZyb21SZWZsZWN0aXZpdHlNYXBBbHBoYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiX0NvbnZlcnRQQlJNYXRlcmlhbDogR2xvc3NpbmVzcyB2YWx1ZXMgbm90IGluY2x1ZGVkIGluIHRoZSByZWZsZWN0aXZpdHkgdGV4dHVyZSBhcmUgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKChhbGJlZG9UZXh0dXJlIHx8IHJlZmxlY3Rpdml0eVRleHR1cmUpICYmIGhhc1RleHR1cmVDb29yZHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZXJJbmRleCA9IHRoaXMuX2V4cG9ydFRleHR1cmVTYW1wbGVyKGFsYmVkb1RleHR1cmUgfHwgcmVmbGVjdGl2aXR5VGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydFNwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmVzVG9NZXRhbGxpY1JvdWdobmVzc0FzeW5jKGFsYmVkb1RleHR1cmUsIHJlZmxlY3Rpdml0eVRleHR1cmUsIHNwZWNHbG9zcywgbWltZVR5cGUpLnRoZW4oKG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmVzID0gdGhpcy5fZXhwb3J0ZXIuX3RleHR1cmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMuYmFzZUNvbG9yVGV4dHVyZURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VJbmRleCA9IHRoaXMuX2V4cG9ydEltYWdlKGBiYXNlQ29sb3Ike3RleHR1cmVzLmxlbmd0aH1gLCBtaW1lVHlwZSwgbWV0YWxsaWNSb3VnaG5lc3NGYWN0b3JzLmJhc2VDb2xvclRleHR1cmVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yVGV4dHVyZSA9IHRoaXMuX2V4cG9ydFRleHR1cmVJbmZvKGltYWdlSW5kZXgsIHNhbXBsZXJJbmRleCwgYWxiZWRvVGV4dHVyZT8uY29vcmRpbmF0ZXNJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnMubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZUluZGV4ID0gdGhpcy5fZXhwb3J0SW1hZ2UoYG1ldGFsbGljUm91Z2huZXNzJHt0ZXh0dXJlcy5sZW5ndGh9YCwgbWltZVR5cGUsIG1ldGFsbGljUm91Z2huZXNzRmFjdG9ycy5tZXRhbGxpY1JvdWdobmVzc1RleHR1cmVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3MubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlID0gdGhpcy5fZXhwb3J0VGV4dHVyZUluZm8oaW1hZ2VJbmRleCwgc2FtcGxlckluZGV4LCByZWZsZWN0aXZpdHlUZXh0dXJlPy5jb29yZGluYXRlc0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXRhbGxpY1JvdWdobmVzc0ZhY3RvcnM7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0U3BlY3VsYXJHbG9zc2luZXNzVG9NZXRhbGxpY1JvdWdobmVzcyhzcGVjR2xvc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIEJhYnlsb24gUEJSIEJhc2UgTWF0ZXJpYWwgdG8gYSBnbFRGIE1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvblBCUk1hdGVyaWFsIEJKUyBQQlIgQmFzZSBNYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIG1pbWUgdHlwZSB0byB1c2UgZm9yIHRoZSB0ZXh0dXJlc1xyXG4gICAgICogQHBhcmFtIGhhc1RleHR1cmVDb29yZHMgc3BlY2lmaWVzIGlmIHRleHR1cmUgY29vcmRpbmF0ZXMgYXJlIHByZXNlbnQgb24gdGhlIHN1Ym1lc2ggdG8gZGV0ZXJtaW5lIGlmIHRleHR1cmVzIHNob3VsZCBiZSBhcHBsaWVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfY29udmVydFBCUk1hdGVyaWFsQXN5bmMoYmFieWxvblBCUk1hdGVyaWFsOiBQQlJCYXNlTWF0ZXJpYWwsIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlLCBoYXNUZXh0dXJlQ29vcmRzOiBib29sZWFuKTogUHJvbWlzZTxJTWF0ZXJpYWw+IHtcclxuICAgICAgICBjb25zdCBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3M6IElNYXRlcmlhbFBick1ldGFsbGljUm91Z2huZXNzID0ge307XHJcbiAgICAgICAgY29uc3QgZ2xURk1hdGVyaWFsOiBJTWF0ZXJpYWwgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IGJhYnlsb25QQlJNYXRlcmlhbC5uYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgdXNlTWV0YWxsaWNSb3VnaG5lc3MgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuaXNNZXRhbGxpY1dvcmtmbG93KCk7XHJcblxyXG4gICAgICAgIGlmICh1c2VNZXRhbGxpY1JvdWdobmVzcykge1xyXG4gICAgICAgICAgICBjb25zdCBhbGJlZG9Db2xvciA9IGJhYnlsb25QQlJNYXRlcmlhbC5fYWxiZWRvQ29sb3I7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscGhhID0gYmFieWxvblBCUk1hdGVyaWFsLmFscGhhO1xyXG4gICAgICAgICAgICBpZiAoYWxiZWRvQ29sb3IpIHtcclxuICAgICAgICAgICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3JGYWN0b3IgPSBbYWxiZWRvQ29sb3IuciwgYWxiZWRvQ29sb3IuZywgYWxiZWRvQ29sb3IuYiwgYWxwaGFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0TWV0YWxSb3VnaEZhY3RvcnNUb01ldGFsbGljUm91Z2huZXNzQXN5bmMoYmFieWxvblBCUk1hdGVyaWFsLCBtaW1lVHlwZSwgZ2xURlBick1ldGFsbGljUm91Z2huZXNzLCBoYXNUZXh0dXJlQ29vcmRzKS50aGVuKChtZXRhbGxpY1JvdWdobmVzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldE1ldGFsbGljUm91Z2huZXNzUGJyTWF0ZXJpYWwobWV0YWxsaWNSb3VnaG5lc3MsIGJhYnlsb25QQlJNYXRlcmlhbCwgZ2xURk1hdGVyaWFsLCBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3MsIG1pbWVUeXBlLCBoYXNUZXh0dXJlQ29vcmRzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRTcGVjR2xvc3NGYWN0b3JzVG9NZXRhbGxpY1JvdWdobmVzc0FzeW5jKGJhYnlsb25QQlJNYXRlcmlhbCwgbWltZVR5cGUsIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcywgaGFzVGV4dHVyZUNvb3JkcykudGhlbigobWV0YWxsaWNSb3VnaG5lc3MpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXRNZXRhbGxpY1JvdWdobmVzc1Bick1hdGVyaWFsKG1ldGFsbGljUm91Z2huZXNzLCBiYWJ5bG9uUEJSTWF0ZXJpYWwsIGdsVEZNYXRlcmlhbCwgZ2xURlBick1ldGFsbGljUm91Z2huZXNzLCBtaW1lVHlwZSwgaGFzVGV4dHVyZUNvb3Jkcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZXRNZXRhbGxpY1JvdWdobmVzc1Bick1hdGVyaWFsKFxyXG4gICAgICAgIG1ldGFsbGljUm91Z2huZXNzOiBOdWxsYWJsZTxfSVBCUk1ldGFsbGljUm91Z2huZXNzPixcclxuICAgICAgICBiYWJ5bG9uUEJSTWF0ZXJpYWw6IFBCUkJhc2VNYXRlcmlhbCxcclxuICAgICAgICBnbFRGTWF0ZXJpYWw6IElNYXRlcmlhbCxcclxuICAgICAgICBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3M6IElNYXRlcmlhbFBick1ldGFsbGljUm91Z2huZXNzLFxyXG4gICAgICAgIG1pbWVUeXBlOiBJbWFnZU1pbWVUeXBlLFxyXG4gICAgICAgIGhhc1RleHR1cmVDb29yZHM6IGJvb2xlYW5cclxuICAgICk6IFByb21pc2U8SU1hdGVyaWFsPiB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxNYXAgPSB0aGlzLl9leHBvcnRlci5fbWF0ZXJpYWxNYXA7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxzID0gdGhpcy5fZXhwb3J0ZXIuX21hdGVyaWFscztcclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgICAgIGlmIChtZXRhbGxpY1JvdWdobmVzcykge1xyXG4gICAgICAgICAgICBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX1NldEFscGhhTW9kZShnbFRGTWF0ZXJpYWwsIGJhYnlsb25QQlJNYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICEoXHJcbiAgICAgICAgICAgICAgICAgICAgX0dMVEZNYXRlcmlhbEV4cG9ydGVyLl9GdXp6eUVxdWFscyhtZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3IsIENvbG9yMy5XaGl0ZSgpLCBfR0xURk1hdGVyaWFsRXhwb3J0ZXIuX0Vwc2lsb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvblBCUk1hdGVyaWFsLmFscGhhID49IF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvblxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3JGYWN0b3IgPSBbbWV0YWxsaWNSb3VnaG5lc3MuYmFzZUNvbG9yLnIsIG1ldGFsbGljUm91Z2huZXNzLmJhc2VDb2xvci5nLCBtZXRhbGxpY1JvdWdobmVzcy5iYXNlQ29sb3IuYiwgYmFieWxvblBCUk1hdGVyaWFsLmFscGhhXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1ldGFsbGljUm91Z2huZXNzLm1ldGFsbGljICE9IG51bGwgJiYgbWV0YWxsaWNSb3VnaG5lc3MubWV0YWxsaWMgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcy5tZXRhbGxpY0ZhY3RvciA9IG1ldGFsbGljUm91Z2huZXNzLm1ldGFsbGljO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3MgIT0gbnVsbCAmJiBtZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3MgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdsVEZQYnJNZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3NGYWN0b3IgPSBtZXRhbGxpY1JvdWdobmVzcy5yb3VnaG5lc3M7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiYWJ5bG9uUEJSTWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nICE9IG51bGwgJiYgIWJhYnlsb25QQlJNYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghYmFieWxvblBCUk1hdGVyaWFsLl90d29TaWRlZExpZ2h0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9vbHMuV2FybihiYWJ5bG9uUEJSTWF0ZXJpYWwubmFtZSArIFwiOiBCYWNrLWZhY2UgY3VsbGluZyBkaXNhYmxlZCBhbmQgdHdvLXNpZGVkIGxpZ2h0aW5nIGRpc2FibGVkIGlzIG5vdCBzdXBwb3J0ZWQgaW4gZ2xURi5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbFRGTWF0ZXJpYWwuZG91YmxlU2lkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFzVGV4dHVyZUNvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVtcFRleHR1cmUgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2J1bXBUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1bXBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX2V4cG9ydFRleHR1cmVBc3luYyhidW1wVGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKGdsVEZUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURk1hdGVyaWFsLm5vcm1hbFRleHR1cmUgPSBnbFRGVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidW1wVGV4dHVyZS5sZXZlbCAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsVEZNYXRlcmlhbC5ub3JtYWxUZXh0dXJlLnNjYWxlID0gYnVtcFRleHR1cmUubGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYW1iaWVudFRleHR1cmUgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2FtYmllbnRUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFtYmllbnRUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX2V4cG9ydFRleHR1cmVBc3luYyhhbWJpZW50VGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKGdsVEZUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2NjbHVzaW9uVGV4dHVyZTogSU1hdGVyaWFsT2NjbHVzaW9uVGV4dHVyZUluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGdsVEZUZXh0dXJlLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleENvb3JkOiBnbFRGVGV4dHVyZS50ZXhDb29yZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBnbFRGVGV4dHVyZS5leHRlbnNpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbFRGTWF0ZXJpYWwub2NjbHVzaW9uVGV4dHVyZSA9IG9jY2x1c2lvblRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbWJpZW50VGV4dHVyZVN0cmVuZ3RoID0gYmFieWxvblBCUk1hdGVyaWFsLl9hbWJpZW50VGV4dHVyZVN0cmVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFtYmllbnRUZXh0dXJlU3RyZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvY2NsdXNpb25UZXh0dXJlLnN0cmVuZ3RoID0gYW1iaWVudFRleHR1cmVTdHJlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbWlzc2l2ZVRleHR1cmUgPSBiYWJ5bG9uUEJSTWF0ZXJpYWwuX2VtaXNzaXZlVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGlmIChlbWlzc2l2ZVRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5fZXhwb3J0VGV4dHVyZUFzeW5jKGVtaXNzaXZlVGV4dHVyZSwgbWltZVR5cGUpLnRoZW4oKGdsVEZUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnbFRGVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xURk1hdGVyaWFsLmVtaXNzaXZlVGV4dHVyZSA9IGdsVEZUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBlbWlzc2l2ZUNvbG9yID0gYmFieWxvblBCUk1hdGVyaWFsLl9lbWlzc2l2ZUNvbG9yO1xyXG4gICAgICAgICAgICBpZiAoIV9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRnV6enlFcXVhbHMoZW1pc3NpdmVDb2xvciwgQ29sb3IzLkJsYWNrKCksIF9HTFRGTWF0ZXJpYWxFeHBvcnRlci5fRXBzaWxvbikpIHtcclxuICAgICAgICAgICAgICAgIGdsVEZNYXRlcmlhbC5lbWlzc2l2ZUZhY3RvciA9IGVtaXNzaXZlQ29sb3IuYXNBcnJheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnbFRGTWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3MgPSBnbFRGUGJyTWV0YWxsaWNSb3VnaG5lc3M7XHJcbiAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKGdsVEZNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsTWFwW2JhYnlsb25QQlJNYXRlcmlhbC51bmlxdWVJZF0gPSBtYXRlcmlhbHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9maW5pc2hNYXRlcmlhbChwcm9taXNlcywgZ2xURk1hdGVyaWFsLCBiYWJ5bG9uUEJSTWF0ZXJpYWwsIG1pbWVUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRQaXhlbHNGcm9tVGV4dHVyZShiYWJ5bG9uVGV4dHVyZTogQmFzZVRleHR1cmUpOiBQcm9taXNlPE51bGxhYmxlPFVpbnQ4QXJyYXkgfCBGbG9hdDMyQXJyYXk+PiB7XHJcbiAgICAgICAgY29uc3QgcGl4ZWxzID1cclxuICAgICAgICAgICAgYmFieWxvblRleHR1cmUudGV4dHVyZVR5cGUgPT09IENvbnN0YW50cy5URVhUVVJFVFlQRV9VTlNJR05FRF9JTlRcclxuICAgICAgICAgICAgICAgID8gKGJhYnlsb25UZXh0dXJlLnJlYWRQaXhlbHMoKSBhcyBQcm9taXNlPFVpbnQ4QXJyYXk+KVxyXG4gICAgICAgICAgICAgICAgOiAoYmFieWxvblRleHR1cmUucmVhZFBpeGVscygpIGFzIFByb21pc2U8RmxvYXQzMkFycmF5Pik7XHJcbiAgICAgICAgcmV0dXJuIHBpeGVscztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4dHJhY3RzIGEgdGV4dHVyZSBmcm9tIGEgQmFieWxvbiB0ZXh0dXJlIGludG8gZmlsZSBkYXRhIGFuZCBnbFRGIGRhdGFcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uVGV4dHVyZSBCYWJ5bG9uIHRleHR1cmUgdG8gZXh0cmFjdFxyXG4gICAgICogQHBhcmFtIG1pbWVUeXBlIE1pbWUgVHlwZSBvZiB0aGUgYmFieWxvblRleHR1cmVcclxuICAgICAqIEByZXR1cm5zIGdsVEYgdGV4dHVyZSBpbmZvLCBvciBudWxsIGlmIHRoZSB0ZXh0dXJlIGZvcm1hdCBpcyBub3Qgc3VwcG9ydGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfZXhwb3J0VGV4dHVyZUFzeW5jKGJhYnlsb25UZXh0dXJlOiBCYXNlVGV4dHVyZSwgbWltZVR5cGU6IEltYWdlTWltZVR5cGUpOiBQcm9taXNlPE51bGxhYmxlPElUZXh0dXJlSW5mbz4+IHtcclxuICAgICAgICBjb25zdCBleHRlbnNpb25Qcm9taXNlID0gdGhpcy5fZXhwb3J0ZXIuX2V4dGVuc2lvbnNQcmVFeHBvcnRUZXh0dXJlQXN5bmMoXCJleHBvcnRlclwiLCBiYWJ5bG9uVGV4dHVyZSBhcyBUZXh0dXJlLCBtaW1lVHlwZSk7XHJcbiAgICAgICAgaWYgKCFleHRlbnNpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9leHBvcnRUZXh0dXJlSW5mb0FzeW5jKGJhYnlsb25UZXh0dXJlLCBtaW1lVHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uUHJvbWlzZS50aGVuKCh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V4cG9ydFRleHR1cmVJbmZvQXN5bmMoYmFieWxvblRleHR1cmUsIG1pbWVUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXhwb3J0VGV4dHVyZUluZm9Bc3luYyh0ZXh0dXJlLCBtaW1lVHlwZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIF9leHBvcnRUZXh0dXJlSW5mb0FzeW5jKGJhYnlsb25UZXh0dXJlOiBCYXNlVGV4dHVyZSwgbWltZVR5cGU6IEltYWdlTWltZVR5cGUpOiBQcm9taXNlPE51bGxhYmxlPElUZXh0dXJlSW5mbz4+IHtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlVWlkID0gYmFieWxvblRleHR1cmUudWlkO1xyXG4gICAgICAgIGlmICghKHRleHR1cmVVaWQgaW4gdGhpcy5fdGV4dHVyZU1hcCkpIHtcclxuICAgICAgICAgICAgY29uc3QgcGl4ZWxzID0gYXdhaXQgdGhpcy5fZ2V0UGl4ZWxzRnJvbVRleHR1cmUoYmFieWxvblRleHR1cmUpO1xyXG4gICAgICAgICAgICBpZiAoIXBpeGVscykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNhbXBsZXJJbmRleCA9IHRoaXMuX2V4cG9ydFRleHR1cmVTYW1wbGVyKGJhYnlsb25UZXh0dXJlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByZXNlcnZlIHRleHR1cmUgbWltZSB0eXBlIGlmIGRlZmluZWRcclxuICAgICAgICAgICAgY29uc3QgdGV4dHVyZU1pbWVUeXBlID0gKGJhYnlsb25UZXh0dXJlIGFzIFRleHR1cmUpLm1pbWVUeXBlO1xyXG4gICAgICAgICAgICBpZiAodGV4dHVyZU1pbWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRleHR1cmVNaW1lVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbWFnZS9qcGVnXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImltYWdlL3BuZ1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbWFnZS93ZWJwXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbWVUeXBlID0gdGV4dHVyZU1pbWVUeXBlIGFzIEltYWdlTWltZVR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oYFVuc3VwcG9ydGVkIG1lZGlhIHR5cGU6ICR7dGV4dHVyZU1pbWVUeXBlfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgaW50ZXJuYWxUZXh0dXJlVG9JbWFnZSA9IHRoaXMuX2ludGVybmFsVGV4dHVyZVRvSW1hZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IGludGVybmFsVGV4dHVyZVVuaXF1ZUlkID0gYmFieWxvblRleHR1cmUuZ2V0SW50ZXJuYWxUZXh0dXJlKCkhLnVuaXF1ZUlkO1xyXG4gICAgICAgICAgICBpbnRlcm5hbFRleHR1cmVUb0ltYWdlW2ludGVybmFsVGV4dHVyZVVuaXF1ZUlkXSB8fD0ge307XHJcbiAgICAgICAgICAgIGxldCBpbWFnZUluZGV4UHJvbWlzZSA9IGludGVybmFsVGV4dHVyZVRvSW1hZ2VbaW50ZXJuYWxUZXh0dXJlVW5pcXVlSWRdW21pbWVUeXBlXTtcclxuICAgICAgICAgICAgaWYgKGltYWdlSW5kZXhQcm9taXNlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNpemUgPSBiYWJ5bG9uVGV4dHVyZS5nZXRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZUluZGV4UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuX2dldEltYWdlRGF0YUFzeW5jKHBpeGVscywgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQsIG1pbWVUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXhwb3J0SW1hZ2UoYmFieWxvblRleHR1cmUubmFtZSwgbWltZVR5cGUsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgIGludGVybmFsVGV4dHVyZVRvSW1hZ2VbaW50ZXJuYWxUZXh0dXJlVW5pcXVlSWRdW21pbWVUeXBlXSA9IGltYWdlSW5kZXhQcm9taXNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlSW5mbyA9IHRoaXMuX2V4cG9ydFRleHR1cmVJbmZvKGF3YWl0IGltYWdlSW5kZXhQcm9taXNlLCBzYW1wbGVySW5kZXgsIGJhYnlsb25UZXh0dXJlLmNvb3JkaW5hdGVzSW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLl90ZXh0dXJlTWFwW3RleHR1cmVVaWRdID0gdGV4dHVyZUluZm87XHJcbiAgICAgICAgICAgIHRoaXMuX2V4cG9ydGVyLl9leHRlbnNpb25zUG9zdEV4cG9ydFRleHR1cmVzKFwiZXhwb3J0ZXJcIiwgdGhpcy5fdGV4dHVyZU1hcFt0ZXh0dXJlVWlkXSwgYmFieWxvblRleHR1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmVNYXBbdGV4dHVyZVVpZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZXhwb3J0SW1hZ2UobmFtZTogc3RyaW5nLCBtaW1lVHlwZTogSW1hZ2VNaW1lVHlwZSwgZGF0YTogQXJyYXlCdWZmZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IHRoaXMuX2V4cG9ydGVyLl9pbWFnZURhdGE7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhc2VOYW1lID0gbmFtZS5yZXBsYWNlKC9cXC5cXC98XFwvfFxcLlxcXFx8XFxcXC9nLCBcIl9cIik7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gZ2V0RmlsZUV4dGVuc2lvbkZyb21NaW1lVHlwZShtaW1lVHlwZSk7XHJcbiAgICAgICAgbGV0IGZpbGVOYW1lID0gYmFzZU5hbWUgKyBleHRlbnNpb247XHJcbiAgICAgICAgaWYgKGZpbGVOYW1lIGluIGltYWdlRGF0YSkge1xyXG4gICAgICAgICAgICBmaWxlTmFtZSA9IGAke2Jhc2VOYW1lfV8ke1Rvb2xzLlJhbmRvbUlkKCl9JHtleHRlbnNpb259YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGltYWdlRGF0YVtmaWxlTmFtZV0gPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIG1pbWVUeXBlOiBtaW1lVHlwZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBpbWFnZXMgPSB0aGlzLl9leHBvcnRlci5faW1hZ2VzO1xyXG4gICAgICAgIGltYWdlcy5wdXNoKHtcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgdXJpOiBmaWxlTmFtZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGltYWdlcy5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4cG9ydFRleHR1cmVJbmZvKGltYWdlSW5kZXg6IG51bWJlciwgc2FtcGxlckluZGV4OiBudW1iZXIsIGNvb3JkaW5hdGVzSW5kZXg/OiBudW1iZXIpOiBJVGV4dHVyZUluZm8ge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmVzID0gdGhpcy5fZXhwb3J0ZXIuX3RleHR1cmVzO1xyXG4gICAgICAgIGxldCB0ZXh0dXJlSW5kZXggPSB0ZXh0dXJlcy5maW5kSW5kZXgoKHQpID0+IHQuc2FtcGxlciA9PSBzYW1wbGVySW5kZXggJiYgdC5zb3VyY2UgPT09IGltYWdlSW5kZXgpO1xyXG4gICAgICAgIGlmICh0ZXh0dXJlSW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRleHR1cmVJbmRleCA9IHRleHR1cmVzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGV4dHVyZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGltYWdlSW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyOiBzYW1wbGVySW5kZXgsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGV4dHVyZUluZm86IElUZXh0dXJlSW5mbyA9IHsgaW5kZXg6IHRleHR1cmVJbmRleCB9O1xyXG4gICAgICAgIGlmIChjb29yZGluYXRlc0luZGV4KSB7XHJcbiAgICAgICAgICAgIHRleHR1cmVJbmZvLnRleENvb3JkID0gY29vcmRpbmF0ZXNJbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmVJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4cG9ydFRleHR1cmVTYW1wbGVyKHRleHR1cmU6IE51bGxhYmxlPEJhc2VUZXh0dXJlPik6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3Qgc2FtcGxlciA9IHRoaXMuX2dldFRleHR1cmVTYW1wbGVyKHRleHR1cmUpO1xyXG5cclxuICAgICAgICAvLyBpZiBhIHByZS1leGlzdGluZyBzYW1wbGVyIHdpdGggaWRlbnRpY2FsIHBhcmFtZXRlcnMgZXhpc3RzLCB0aGVuIHJldXNlIHRoZSBwcmV2aW91cyBzYW1wbGVyXHJcbiAgICAgICAgY29uc3Qgc2FtcGxlcnMgPSB0aGlzLl9leHBvcnRlci5fc2FtcGxlcnM7XHJcbiAgICAgICAgY29uc3Qgc2FtcGxlckluZGV4ID0gc2FtcGxlcnMuZmluZEluZGV4KFxyXG4gICAgICAgICAgICAocykgPT4gcy5taW5GaWx0ZXIgPT09IHNhbXBsZXIubWluRmlsdGVyICYmIHMubWFnRmlsdGVyID09PSBzYW1wbGVyLm1hZ0ZpbHRlciAmJiBzLndyYXBTID09PSBzYW1wbGVyLndyYXBTICYmIHMud3JhcFQgPT09IHNhbXBsZXIud3JhcFRcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChzYW1wbGVySW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzYW1wbGVySW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKHNhbXBsZXIpO1xyXG4gICAgICAgIHJldHVybiBzYW1wbGVycy5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0eXBlIHsgTm9kZSB9IGZyb20gXCJjb3JlL25vZGVcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgQW5pbWF0aW9uIH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25cIjtcclxuaW1wb3J0IHR5cGUgeyBHTFRGRGF0YSB9IGZyb20gXCIuL2dsVEZEYXRhXCI7XHJcbmltcG9ydCB7IF9FeHBvcnRlciB9IGZyb20gXCIuL2dsVEZFeHBvcnRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEhvbGRzIGEgY29sbGVjdGlvbiBvZiBleHBvcnRlciBvcHRpb25zIGFuZCBwYXJhbWV0ZXJzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElFeHBvcnRPcHRpb25zIHtcclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gd2hpY2ggaW5kaWNhdGVzIHdoZXRoZXIgYSBiYWJ5bG9uIG5vZGUgc2hvdWxkIGJlIGV4cG9ydGVkIG9yIG5vdFxyXG4gICAgICogQHBhcmFtIG5vZGUgc291cmNlIEJhYnlsb24gbm9kZS4gSXQgaXMgdXNlZCB0byBjaGVjayB3aGV0aGVyIGl0IHNob3VsZCBiZSBleHBvcnRlZCB0byBnbFRGIG9yIG5vdFxyXG4gICAgICogQHJldHVybnMgYm9vbGVhbiwgd2hpY2ggaW5kaWNhdGVzIHdoZXRoZXIgdGhlIG5vZGUgc2hvdWxkIGJlIGV4cG9ydGVkICh0cnVlKSBvciBub3QgKGZhbHNlKVxyXG4gICAgICovXHJcbiAgICBzaG91bGRFeHBvcnROb2RlPyhub2RlOiBOb2RlKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHdoaWNoIGluZGljYXRlcyB3aGV0aGVyIGFuIGFuaW1hdGlvbiBvbiB0aGUgc2NlbmUgc2hvdWxkIGJlIGV4cG9ydGVkIG9yIG5vdFxyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbiBzb3VyY2UgYW5pbWF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyBib29sZWFuLCB3aGljaCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgYW5pbWF0aW9uIHNob3VsZCBiZSBleHBvcnRlZCAodHJ1ZSkgb3Igbm90IChmYWxzZSlcclxuICAgICAqL1xyXG4gICAgc2hvdWxkRXhwb3J0QW5pbWF0aW9uPyhhbmltYXRpb246IEFuaW1hdGlvbik6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGV4dHJhY3QgdGhlIHBhcnQgb2Ygbm9kZSdzIG1ldGFkYXRhIHRoYXQgd2lsbCBiZSBleHBvcnRlZCBpbnRvIGdsVEYgbm9kZSBleHRyYXNcclxuICAgICAqIEBwYXJhbSBtZXRhZGF0YSBzb3VyY2UgbWV0YWRhdGEgdG8gcmVhZCBmcm9tXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgZGF0YSB0byBzdG9yZSB0byBnbFRGIG5vZGUgZXh0cmFzXHJcbiAgICAgKi9cclxuICAgIG1ldGFkYXRhU2VsZWN0b3I/KG1ldGFkYXRhOiBhbnkpOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2FtcGxlIHJhdGUgdG8gYmFrZSBhbmltYXRpb24gY3VydmVzLiBEZWZhdWx0cyB0byAxIC8gNjAuXHJcbiAgICAgKi9cclxuICAgIGFuaW1hdGlvblNhbXBsZVJhdGU/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCZWdpbiBzZXJpYWxpemF0aW9uIHdpdGhvdXQgd2FpdGluZyBmb3IgdGhlIHNjZW5lIHRvIGJlIHJlYWR5LiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0V2l0aG91dFdhaXRpbmdGb3JTY2VuZT86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgaWYgdW51c2VkIHZlcnRleCB1diBhdHRyaWJ1dGVzIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBleHBvcnQuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBleHBvcnRVbnVzZWRVVnM/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIG5vLW9wIHJvb3Qgbm9kZXMgd2hlbiBwb3NzaWJsZS4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlTm9vcFJvb3ROb2Rlcz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgaWYgY29vcmRpbmF0ZSBzeXN0ZW0gc3dhcHBpbmcgcm9vdCBub2RlcyBzaG91bGQgYmUgaW5jbHVkZWQgaW4gZXhwb3J0LiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqIEBkZXByZWNhdGVkIFBsZWFzZSB1c2UgcmVtb3ZlTm9vcFJvb3ROb2RlcyBpbnN0ZWFkXHJcbiAgICAgKi9cclxuICAgIGluY2x1ZGVDb29yZGluYXRlU3lzdGVtQ29udmVyc2lvbk5vZGVzPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENsYXNzIGZvciBnZW5lcmF0aW5nIGdsVEYgZGF0YSBmcm9tIGEgQmFieWxvbiBzY2VuZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHTFRGMkV4cG9ydCB7XHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydHMgdGhlIGdlb21ldHJ5IG9mIHRoZSBzY2VuZSB0byAuZ2x0ZiBmaWxlIGZvcm1hdCBhc3luY2hyb25vdXNseVxyXG4gICAgICogQHBhcmFtIHNjZW5lIEJhYnlsb24gc2NlbmUgd2l0aCBzY2VuZSBoaWVyYXJjaHkgaW5mb3JtYXRpb25cclxuICAgICAqIEBwYXJhbSBmaWxlUHJlZml4IEZpbGUgcHJlZml4IHRvIHVzZSB3aGVuIGdlbmVyYXRpbmcgdGhlIGdsVEYgZmlsZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgRXhwb3J0ZXIgb3B0aW9uc1xyXG4gICAgICogQHJldHVybnMgUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIC5nbHRmIGZpbGUgYW5kIGFzc29jaWF0ZXMgdGV4dHVyZSBuYW1lc1xyXG4gICAgICogYXMga2V5cyBhbmQgdGhlaXIgZGF0YSBhbmQgcGF0aHMgYXMgdmFsdWVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR0xURkFzeW5jKHNjZW5lOiBTY2VuZSwgZmlsZVByZWZpeDogc3RyaW5nLCBvcHRpb25zPzogSUV4cG9ydE9wdGlvbnMpOiBQcm9taXNlPEdMVEZEYXRhPiB7XHJcbiAgICAgICAgcmV0dXJuIHNjZW5lLndoZW5SZWFkeUFzeW5jKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdsVEZQcmVmaXggPSBmaWxlUHJlZml4LnJlcGxhY2UoL1xcLlteLy5dKyQvLCBcIlwiKTtcclxuICAgICAgICAgICAgY29uc3QgZ2x0ZkdlbmVyYXRvciA9IG5ldyBfRXhwb3J0ZXIoc2NlbmUsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2x0ZkdlbmVyYXRvci5fZ2VuZXJhdGVHTFRGQXN5bmMoZ2xURlByZWZpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1ByZUV4cG9ydEFzeW5jKHNjZW5lOiBTY2VuZSwgb3B0aW9ucz86IElFeHBvcnRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmV4cG9ydFdpdGhvdXRXYWl0aW5nRm9yU2NlbmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY2VuZS53aGVuUmVhZHlBc3luYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1Bvc3RFeHBvcnRBc3luYyhzY2VuZTogU2NlbmUsIGdsVEZEYXRhOiBHTFRGRGF0YSwgb3B0aW9ucz86IElFeHBvcnRPcHRpb25zKTogUHJvbWlzZTxHTFRGRGF0YT4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5leHBvcnRXaXRob3V0V2FpdGluZ0ZvclNjZW5lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2xURkRhdGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2xURkRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydHMgdGhlIGdlb21ldHJ5IG9mIHRoZSBzY2VuZSB0byAuZ2xiIGZpbGUgZm9ybWF0IGFzeWNocm9ub3VzbHlcclxuICAgICAqIEBwYXJhbSBzY2VuZSBCYWJ5bG9uIHNjZW5lIHdpdGggc2NlbmUgaGllcmFyY2h5IGluZm9ybWF0aW9uXHJcbiAgICAgKiBAcGFyYW0gZmlsZVByZWZpeCBGaWxlIHByZWZpeCB0byB1c2Ugd2hlbiBnZW5lcmF0aW5nIGdsYiBmaWxlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBFeHBvcnRlciBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgLmdsYiBmaWxlbmFtZSBhcyBrZXkgYW5kIGRhdGEgYXMgdmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHTEJBc3luYyhzY2VuZTogU2NlbmUsIGZpbGVQcmVmaXg6IHN0cmluZywgb3B0aW9ucz86IElFeHBvcnRPcHRpb25zKTogUHJvbWlzZTxHTFRGRGF0YT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9QcmVFeHBvcnRBc3luYyhzY2VuZSwgb3B0aW9ucykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdsVEZQcmVmaXggPSBmaWxlUHJlZml4LnJlcGxhY2UoL1xcLlteLy5dKyQvLCBcIlwiKTtcclxuICAgICAgICAgICAgY29uc3QgZ2x0ZkdlbmVyYXRvciA9IG5ldyBfRXhwb3J0ZXIoc2NlbmUsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2x0ZkdlbmVyYXRvci5fZ2VuZXJhdGVHTEJBc3luYyhnbFRGUHJlZml4KS50aGVuKChnbFRGRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1Bvc3RFeHBvcnRBc3luYyhzY2VuZSwgZ2xURkRhdGEsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IElCdWZmZXJWaWV3LCBBY2Nlc3NvckNvbXBvbmVudFR5cGUsIElBY2Nlc3NvciB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQWNjZXNzb3JUeXBlIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBGbG9hdEFycmF5LCBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB0eXBlIHsgVmVjdG9yNCB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIF9HTFRGVXRpbGl0aWVzIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGJ1ZmZlciB2aWV3IGJhc2VkIG9uIHRoZSBzdXBwbGllZCBhcmd1bWVudHNcclxuICAgICAqIEBwYXJhbSBidWZmZXJJbmRleCBpbmRleCB2YWx1ZSBvZiB0aGUgc3BlY2lmaWVkIGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGJ5dGVPZmZzZXQgYnl0ZSBvZmZzZXQgdmFsdWVcclxuICAgICAqIEBwYXJhbSBieXRlTGVuZ3RoIGJ5dGUgbGVuZ3RoIG9mIHRoZSBidWZmZXJWaWV3XHJcbiAgICAgKiBAcGFyYW0gYnl0ZVN0cmlkZSBieXRlIGRpc3RhbmNlIGJldHdlZW4gY29uZXF1ZW50aWFsIGVsZW1lbnRzXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBuYW1lIG9mIHRoZSBidWZmZXIgdmlld1xyXG4gICAgICogQHJldHVybnMgYnVmZmVyVmlldyBmb3IgZ2xURlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIF9DcmVhdGVCdWZmZXJWaWV3KGJ1ZmZlckluZGV4OiBudW1iZXIsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aDogbnVtYmVyLCBieXRlU3RyaWRlPzogbnVtYmVyLCBuYW1lPzogc3RyaW5nKTogSUJ1ZmZlclZpZXcge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlcnZpZXc6IElCdWZmZXJWaWV3ID0geyBidWZmZXI6IGJ1ZmZlckluZGV4LCBieXRlTGVuZ3RoOiBieXRlTGVuZ3RoIH07XHJcbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQpIHtcclxuICAgICAgICAgICAgYnVmZmVydmlldy5ieXRlT2Zmc2V0ID0gYnl0ZU9mZnNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgYnVmZmVydmlldy5uYW1lID0gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ5dGVTdHJpZGUpIHtcclxuICAgICAgICAgICAgYnVmZmVydmlldy5ieXRlU3RyaWRlID0gYnl0ZVN0cmlkZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXJ2aWV3O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBhY2Nlc3NvciBiYXNlZCBvbiB0aGUgc3VwcGxpZWQgYXJndW1lbnRzXHJcbiAgICAgKiBAcGFyYW0gYnVmZmVydmlld0luZGV4IFRoZSBpbmRleCBvZiB0aGUgYnVmZmVydmlldyByZWZlcmVuY2VkIGJ5IHRoaXMgYWNjZXNzb3JcclxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBhY2Nlc3NvclxyXG4gICAgICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2YgdGhlIGFjY2Vzc29yXHJcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50VHlwZSBUaGUgZGF0YXR5cGUgb2YgY29tcG9uZW50cyBpbiB0aGUgYXR0cmlidXRlXHJcbiAgICAgKiBAcGFyYW0gY291bnQgVGhlIG51bWJlciBvZiBhdHRyaWJ1dGVzIHJlZmVyZW5jZWQgYnkgdGhpcyBhY2Nlc3NvclxyXG4gICAgICogQHBhcmFtIGJ5dGVPZmZzZXQgVGhlIG9mZnNldCByZWxhdGl2ZSB0byB0aGUgc3RhcnQgb2YgdGhlIGJ1ZmZlclZpZXcgaW4gYnl0ZXNcclxuICAgICAqIEBwYXJhbSBtaW4gTWluaW11bSB2YWx1ZSBvZiBlYWNoIGNvbXBvbmVudCBpbiB0aGlzIGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIG1heCBNYXhpbXVtIHZhbHVlIG9mIGVhY2ggY29tcG9uZW50IGluIHRoaXMgYXR0cmlidXRlXHJcbiAgICAgKiBAcmV0dXJucyBhY2Nlc3NvciBmb3IgZ2xURlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIF9DcmVhdGVBY2Nlc3NvcihcclxuICAgICAgICBidWZmZXJ2aWV3SW5kZXg6IG51bWJlcixcclxuICAgICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgdHlwZTogQWNjZXNzb3JUeXBlLFxyXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IEFjY2Vzc29yQ29tcG9uZW50VHlwZSxcclxuICAgICAgICBjb3VudDogbnVtYmVyLFxyXG4gICAgICAgIGJ5dGVPZmZzZXQ6IE51bGxhYmxlPG51bWJlcj4sXHJcbiAgICAgICAgbWluOiBOdWxsYWJsZTxudW1iZXJbXT4sXHJcbiAgICAgICAgbWF4OiBOdWxsYWJsZTxudW1iZXJbXT5cclxuICAgICk6IElBY2Nlc3NvciB7XHJcbiAgICAgICAgY29uc3QgYWNjZXNzb3I6IElBY2Nlc3NvciA9IHsgbmFtZTogbmFtZSwgYnVmZmVyVmlldzogYnVmZmVydmlld0luZGV4LCBjb21wb25lbnRUeXBlOiBjb21wb25lbnRUeXBlLCBjb3VudDogY291bnQsIHR5cGU6IHR5cGUgfTtcclxuXHJcbiAgICAgICAgaWYgKG1pbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yLm1pbiA9IG1pbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1heCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yLm1heCA9IG1heDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBhY2Nlc3Nvci5ieXRlT2Zmc2V0ID0gYnl0ZU9mZnNldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhY2Nlc3NvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzIG9mIGFuIGFycmF5IG9mIHBvc2l0aW9uIGZsb2F0c1xyXG4gICAgICogQHBhcmFtIHBvc2l0aW9ucyBQb3NpdGlvbnMgYXJyYXkgb2YgYSBtZXNoXHJcbiAgICAgKiBAcGFyYW0gdmVydGV4U3RhcnQgU3RhcnRpbmcgdmVydGV4IG9mZnNldCB0byBjYWxjdWxhdGUgbWluIGFuZCBtYXggdmFsdWVzXHJcbiAgICAgKiBAcGFyYW0gdmVydGV4Q291bnQgTnVtYmVyIG9mIHZlcnRpY2VzIHRvIGNoZWNrIGZvciBtaW4gYW5kIG1heCB2YWx1ZXNcclxuICAgICAqIEByZXR1cm5zIG1pbiBudW1iZXIgYXJyYXkgYW5kIG1heCBudW1iZXIgYXJyYXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfQ2FsY3VsYXRlTWluTWF4UG9zaXRpb25zKHBvc2l0aW9uczogRmxvYXRBcnJheSwgdmVydGV4U3RhcnQ6IG51bWJlciwgdmVydGV4Q291bnQ6IG51bWJlcik6IHsgbWluOiBudW1iZXJbXTsgbWF4OiBudW1iZXJbXSB9IHtcclxuICAgICAgICBjb25zdCBtaW4gPSBbSW5maW5pdHksIEluZmluaXR5LCBJbmZpbml0eV07XHJcbiAgICAgICAgY29uc3QgbWF4ID0gWy1JbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHldO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uU3RyaWRlU2l6ZSA9IDM7XHJcbiAgICAgICAgbGV0IGluZGV4T2Zmc2V0OiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uOiBWZWN0b3IzO1xyXG4gICAgICAgIGxldCB2ZWN0b3I6IG51bWJlcltdO1xyXG5cclxuICAgICAgICBpZiAodmVydGV4Q291bnQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHZlcnRleFN0YXJ0LCBsZW5ndGggPSB2ZXJ0ZXhTdGFydCArIHZlcnRleENvdW50OyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gcG9zaXRpb25TdHJpZGVTaXplICogaTtcclxuXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IFZlY3RvcjMuRnJvbUFycmF5KHBvc2l0aW9ucywgaW5kZXhPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgdmVjdG9yID0gcG9zaXRpb24uYXNBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcG9zaXRpb25TdHJpZGVTaXplOyArK2opIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW0gPSB2ZWN0b3Jbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bSA8IG1pbltqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5bal0gPSBudW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChudW0gPiBtYXhbal0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4W2pdID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICArK2luZGV4T2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IG1pbiwgbWF4IH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBfTm9ybWFsaXplVGFuZ2VudEZyb21SZWYodGFuZ2VudDogVmVjdG9yNCkge1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguc3FydCh0YW5nZW50LnggKiB0YW5nZW50LnggKyB0YW5nZW50LnkgKiB0YW5nZW50LnkgKyB0YW5nZW50LnogKiB0YW5nZW50LnopO1xyXG4gICAgICAgIGlmIChsZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRhbmdlbnQueCAvPSBsZW5ndGg7XHJcbiAgICAgICAgICAgIHRhbmdlbnQueSAvPSBsZW5ndGg7XHJcbiAgICAgICAgICAgIHRhbmdlbnQueiAvPSBsZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgX0dldERhdGFBY2Nlc3NvckVsZW1lbnRDb3VudChhY2Nlc3NvclR5cGU6IEFjY2Vzc29yVHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAoYWNjZXNzb3JUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JUeXBlLk1BVDI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICAgICAgY2FzZSBBY2Nlc3NvclR5cGUuTUFUMzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA5O1xyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yVHlwZS5NQVQ0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE2O1xyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yVHlwZS5TQ0FMQVI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgY2FzZSBBY2Nlc3NvclR5cGUuVkVDMjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yVHlwZS5WRUMzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JUeXBlLlZFQzQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuZXhwb3J0ICogZnJvbSBcIi4vZ2xURkFuaW1hdGlvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nbFRGRGF0YVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nbFRGRXhwb3J0ZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2xURkV4cG9ydGVyRXh0ZW5zaW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dsVEZNYXRlcmlhbEV4cG9ydGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dsVEZTZXJpYWxpemVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dsVEZVdGlsaXRpZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vRXh0ZW5zaW9ucy9pbmRleFwiO1xyXG4iLCIvKiogQGludGVybmFsICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby12YXIsIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgdmFyIF9fSUdMVEZFeHBvcnRlckV4dGVuc2lvbiA9IDA7IC8vIEkgYW0gaGVyZSB0byBhbGxvdyBkdHMgdG8gYmUgY3JlYXRlZFxyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBmb3IgZXh0ZW5kaW5nIHRoZSBleHBvcnRlclxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZFeHBvcnRlckV4dGVuc2lvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWRcclxuICAgICAqL1xyXG4gICAgZW5hYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyByZXF1aXJlZFxyXG4gICAgICovXHJcbiAgICByZXF1aXJlZDogYm9vbGVhbjtcclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgKiBhcyBFeHBvcnRlcnMgZnJvbSBcInNlcmlhbGl6ZXJzL2dsVEYvZ2xURkZpbGVFeHBvcnRlclwiO1xyXG5pbXBvcnQgKiBhcyBEYXRhcyBmcm9tIFwic2VyaWFsaXplcnMvZ2xURi8yLjAvZ2xURkRhdGFcIjtcclxuaW1wb3J0ICogYXMgU2VyaWFsaXplcnMgZnJvbSBcInNlcmlhbGl6ZXJzL2dsVEYvMi4wL2dsVEZTZXJpYWxpemVyXCI7XHJcbmltcG9ydCAqIGFzIEV4dGVuc2lvbnMgZnJvbSBcInNlcmlhbGl6ZXJzL2dsVEYvMi4wL0V4dGVuc2lvbnMvaW5kZXhcIjtcclxuaW1wb3J0ICogYXMgR0xURjIgZnJvbSBcInNlcmlhbGl6ZXJzL2dsVEYvMi4wL2luZGV4XCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBVTUQgbW9kdWxlLlxyXG4gKiBUaGUgZW50cnkgcG9pbnQgZm9yIGEgZnV0dXJlIEVTTSBwYWNrYWdlIHNob3VsZCBiZSBpbmRleC50c1xyXG4gKi9cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT04gPSAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT04gfHwge307XHJcbiAgICBjb25zdCBCQUJZTE9OID0gKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OO1xyXG4gICAgQkFCWUxPTi5HTFRGMiA9IEJBQllMT04uR0xURjIgfHwge307XHJcbiAgICBCQUJZTE9OLkdMVEYyLkV4cG9ydGVyID0gQkFCWUxPTi5HTFRGMi5FeHBvcnRlciB8fCB7fTtcclxuICAgIEJBQllMT04uR0xURjIuRXhwb3J0ZXIuRXh0ZW5zaW9ucyA9IEJBQllMT04uR0xURjIuRXhwb3J0ZXIuRXh0ZW5zaW9ucyB8fCB7fTtcclxuXHJcbiAgICBjb25zdCBrZXlzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBFeHBvcnRlcnMpIHtcclxuICAgICAgICBCQUJZTE9OW2tleV0gPSAoPGFueT5FeHBvcnRlcnMpW2tleV07XHJcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBEYXRhcykge1xyXG4gICAgICAgIEJBQllMT05ba2V5XSA9ICg8YW55PkRhdGFzKVtrZXldO1xyXG4gICAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gU2VyaWFsaXplcnMpIHtcclxuICAgICAgICBCQUJZTE9OW2tleV0gPSAoPGFueT5TZXJpYWxpemVycylba2V5XTtcclxuICAgICAgICBrZXlzLnB1c2goa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgQkFCWUxPTi5HTFRGMi5FeHBvcnRlci5FeHRlbnNpb25zW2tleV0gPSAoPGFueT5FeHRlbnNpb25zKVtrZXldO1xyXG4gICAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIEdMVEYyKSB7XHJcbiAgICAgICAgLy8gUHJldmVudCBSZWFzc2lnbm1lbnQuXHJcbiAgICAgICAgaWYgKGtleXMuaW5kZXhPZihrZXkpID4gLTEpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBCQUJZTE9OLkdMVEYyLkV4cG9ydGVyW2tleV0gPSAoPGFueT5HTFRGMilba2V5XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcInNlcmlhbGl6ZXJzL2dsVEYvZ2xURkZpbGVFeHBvcnRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwic2VyaWFsaXplcnMvZ2xURi8yLjAvaW5kZXhcIjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NYXRoc19tYXRoX3ZlY3Rvcl9fOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2U7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChlbnYuc3RhY2subGVuZ3RoKSB7XG4gICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcbiAgICAgICAgaWYgKHJlYy5hc3luYykgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBzZXJpYWxpemVycyBmcm9tIFwiQGx0cy9zZXJpYWxpemVycy9sZWdhY3kvbGVnYWN5LWdsVEYyU2VyaWFsaXplclwiO1xyXG5leHBvcnQgeyBzZXJpYWxpemVycyB9O1xyXG5leHBvcnQgZGVmYXVsdCBzZXJpYWxpemVycztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9