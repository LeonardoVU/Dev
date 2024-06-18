
declare module BABYLON {
    /** @internal */
    export var cellPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var cellVertexShader: {
        name: string;
        shader: string;
    };


    export class CellMaterial extends PushMaterial {
        private _diffuseTexture;
        diffuseTexture: BaseTexture;
        diffuseColor: Color3;
        _computeHighLevel: boolean;
        computeHighLevel: boolean;
        private _disableLighting;
        disableLighting: boolean;
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        constructor(name: string, scene?: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        getClassName(): string;
        clone(name: string): CellMaterial;
        serialize(): any;
        static Parse(source: any, scene: Scene, rootUrl: string): CellMaterial;
    }




    /**
     * Structure of a custom shader
     */
    export class CustomShaderStructure {
        /**
         * Fragment store
         */
        FragmentStore: string;
        /**
         * Vertex store
         */
        VertexStore: string;
        constructor();
    }
    /**
     * Parts of a shader
     */
    export class ShaderSpecialParts {
        constructor();
        /**
         * Beginning of the fragment shader
         */
        Fragment_Begin: string;
        /**
         * Variable definitions of the fragment shader
         */
        Fragment_Definitions: string;
        /**
         * Beginning of the fragment main function
         */
        Fragment_MainBegin: string;
        /**
         * End of the fragment main function
         */
        Fragment_MainEnd: string;
        /**
         * Diffuse color calculation
         */
        Fragment_Custom_Diffuse: string;
        /**
         * Before lightning computations
         */
        Fragment_Before_Lights: string;
        /**
         * Before fog computations
         */
        Fragment_Before_Fog: string;
        /**
         * Alpha calculations
         */
        Fragment_Custom_Alpha: string;
        /**
         * Before frag color is assigned
         */
        Fragment_Before_FragColor: string;
        /**
         * Beginning of the vertex shader
         */
        Vertex_Begin: string;
        /**
         * Variable definitions of the vertex shader
         */
        Vertex_Definitions: string;
        /**
         * Start of the main function of the vertex shader
         */
        Vertex_MainBegin: string;
        /**
         * Before the world position computation
         */
        Vertex_Before_PositionUpdated: string;
        /**
         * Before the normal computation
         */
        Vertex_Before_NormalUpdated: string;
        /**
         * After the world position has been computed
         */
        Vertex_After_WorldPosComputed: string;
        /**
         * Main end of the vertex shader
         */
        Vertex_MainEnd: string;
    }
    /**
     * Customized material
     */
    export class CustomMaterial extends StandardMaterial {
        /**
         * Index for each created shader
         */
        static ShaderIndexer: number;
        /**
         * Custom shader structure
         */
        CustomParts: ShaderSpecialParts;
        /**
         * Name of the shader
         */
        _createdShaderName: string;
        /**
         * List of custom uniforms
         */
        _customUniform: string[];
        /**
         * Names of the new uniforms
         */
        _newUniforms: string[];
        /**
         * Instances of the new uniform objects
         */
        _newUniformInstances: {
            [name: string]: any;
        };
        /**
         * Instances of the new sampler objects
         */
        _newSamplerInstances: {
            [name: string]: Texture;
        };
        /**
         * List of the custom attributes
         */
        _customAttributes: string[];
        /**
         * Fragment shader string
         */
        FragmentShader: string;
        /**
         * Vertex shader string
         */
        VertexShader: string;
        /**
         * Runs after the material is bound to a mesh
         * @param mesh mesh bound
         * @param effect bound effect used to render
         */
        AttachAfterBind(mesh: Mesh | undefined, effect: Effect): void;
        /**
         * @internal
         */
        ReviewUniform(name: string, arr: string[]): string[];
        /**
         * Builds the material
         * @param shaderName name of the shader
         * @param uniforms list of uniforms
         * @param uniformBuffers list of uniform buffers
         * @param samplers list of samplers
         * @param defines list of defines
         * @param attributes list of attributes
         * @returns the shader name
         */
        Builder(shaderName: string, uniforms: string[], uniformBuffers: string[], samplers: string[], defines: MaterialDefines | string[], attributes?: string[]): string;
        protected _injectCustomCode(code: string, shaderType: string): string;
        protected _getCustomCode(shaderType: string): {
            [pointName: string]: string;
        };
        constructor(name: string, scene?: Scene);
        protected _afterBind(mesh?: Mesh, effect?: Nullable<Effect>, subMesh?: SubMesh): void;
        /**
         * Adds a new uniform to the shader
         * @param name the name of the uniform to add
         * @param kind the type of the uniform to add
         * @param param the value of the uniform to add
         * @returns the current material
         */
        AddUniform(name: string, kind: string, param: any): CustomMaterial;
        /**
         * Adds a custom attribute
         * @param name the name of the attribute
         * @returns the current material
         */
        AddAttribute(name: string): CustomMaterial;
        /**
         * Sets the code on Fragment_Begin portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Begin(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Fragment_Definitions portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Definitions(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Fragment_MainBegin portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_MainBegin(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Fragment_MainEnd portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_MainEnd(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Fragment_Custom_Diffuse portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Custom_Diffuse(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Fragment_Custom_Alpha portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Custom_Alpha(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Fragment_Before_Lights portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Before_Lights(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Fragment_Before_Fog portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Before_Fog(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Fragment_Before_FragColor portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Before_FragColor(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Vertex_Begin portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_Begin(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Vertex_Definitions portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_Definitions(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Vertex_MainBegin portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_MainBegin(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Vertex_Before_PositionUpdated portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_Before_PositionUpdated(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Vertex_Before_NormalUpdated portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_Before_NormalUpdated(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Vertex_After_WorldPosComputed portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_After_WorldPosComputed(shaderPart: string): CustomMaterial;
        /**
         * Sets the code on Vertex_MainEnd portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_MainEnd(shaderPart: string): CustomMaterial;
    }




    /**
     * Albedo parts of the shader
     */
    export class ShaderAlbedoParts {
        constructor();
        /**
         * Beginning of the fragment shader
         */
        Fragment_Begin: string;
        /**
         * Fragment definitions
         */
        Fragment_Definitions: string;
        /**
         * Beginning of the main function
         */
        Fragment_MainBegin: string;
        /**
         * End of main function
         */
        Fragment_MainEnd: string;
        /**
         * Albedo color
         */
        Fragment_Custom_Albedo: string;
        /**
         * Lights
         */
        Fragment_Before_Lights: string;
        /**
         * Metallic and roughness
         */
        Fragment_Custom_MetallicRoughness: string;
        /**
         * Microsurface
         */
        Fragment_Custom_MicroSurface: string;
        /**
         * Fog computations
         */
        Fragment_Before_Fog: string;
        /**
         * Alpha
         */
        Fragment_Custom_Alpha: string;
        /**
         * Color composition
         */
        Fragment_Before_FinalColorComposition: string;
        /**
         * Fragment color
         */
        Fragment_Before_FragColor: string;
        /**
         * Beginning of vertex shader
         */
        Vertex_Begin: string;
        /**
         * Vertex definitions
         */
        Vertex_Definitions: string;
        /**
         * Vertex main begin
         */
        Vertex_MainBegin: string;
        /**
         * Vertex before position updated
         */
        Vertex_Before_PositionUpdated: string;
        /**
         * Vertex before normal updated
         */
        Vertex_Before_NormalUpdated: string;
        /**
         * Vertex after world pos computed
         */
        Vertex_After_WorldPosComputed: string;
        /**
         * Vertex main end
         */
        Vertex_MainEnd: string;
    }
    /**
     * @deprecated use ShaderAlbedoParts instead.
     */
    export var ShaderAlebdoParts: typeof ShaderAlbedoParts;
    export class PBRCustomMaterial extends PBRMaterial {
        /**
         * Index for each created shader
         */
        static ShaderIndexer: number;
        /**
         * Custom shader structure
         */
        CustomParts: ShaderAlbedoParts;
        /**
         * Name of the shader
         */
        _createdShaderName: string;
        /**
         * List of custom uniforms
         */
        _customUniform: string[];
        /**
         * Names of the new uniforms
         */
        _newUniforms: string[];
        /**
         * Instances of the new uniform objects
         */
        _newUniformInstances: {
            [name: string]: any;
        };
        /**
         * Instances of the new sampler objects
         */
        _newSamplerInstances: {
            [name: string]: Texture;
        };
        /**
         * List of the custom attributes
         */
        _customAttributes: string[];
        /**
         * Fragment shader string
         */
        FragmentShader: string;
        /**
         * Vertex shader string
         */
        VertexShader: string;
        /**
         * Runs after the material is bound to a mesh
         * @param mesh mesh bound
         * @param effect bound effect used to render
         */
        AttachAfterBind(mesh: Mesh | undefined, effect: Effect): void;
        /**
         * @internal
         */
        ReviewUniform(name: string, arr: string[]): string[];
        /**
         * Builds the material
         * @param shaderName name of the shader
         * @param uniforms list of uniforms
         * @param uniformBuffers list of uniform buffers
         * @param samplers list of samplers
         * @param defines list of defines
         * @param attributes list of attributes
         * @param options options to compile the shader
         * @returns the shader name
         */
        Builder(shaderName: string, uniforms: string[], uniformBuffers: string[], samplers: string[], defines: MaterialDefines | string[], attributes?: string[], options?: ICustomShaderNameResolveOptions): string;
        protected _injectCustomCode(code: string, shaderType: string): string;
        protected _getCustomCode(shaderType: string): {
            [pointName: string]: string;
        };
        constructor(name: string, scene?: Scene);
        protected _afterBind(mesh?: Mesh, effect?: Nullable<Effect>, subMesh?: SubMesh): void;
        /**
         * Adds a new uniform to the shader
         * @param name the name of the uniform to add
         * @param kind the type of the uniform to add
         * @param param the value of the uniform to add
         * @returns the current material
         */
        AddUniform(name: string, kind: string, param: any): PBRCustomMaterial;
        /**
         * Adds a custom attribute
         * @param name the name of the attribute
         * @returns the current material
         */
        AddAttribute(name: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Begin portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Begin(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Definitions portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Definitions(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_MainBegin portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_MainBegin(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Custom_Albedo portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Custom_Albedo(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Custom_Alpha portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Custom_Alpha(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Before_Lights portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Before_Lights(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Custom_MetallicRoughness portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Custom_MetallicRoughness(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Custom_MicroSurface portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Custom_MicroSurface(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Before_Fog portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Before_Fog(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Before_FinalColorComposition portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Before_FinalColorComposition(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_Before_FragColor portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_Before_FragColor(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Fragment_MainEnd portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Fragment_MainEnd(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Vertex_Begin portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_Begin(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Vertex_Definitions portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_Definitions(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Vertex_MainBegin portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_MainBegin(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Vertex_Before_PositionUpdated portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_Before_PositionUpdated(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Vertex_Before_NormalUpdated portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_Before_NormalUpdated(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Vertex_After_WorldPosComputed portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_After_WorldPosComputed(shaderPart: string): PBRCustomMaterial;
        /**
         * Sets the code on Vertex_MainEnd portion
         * @param shaderPart the code string
         * @returns the current material
         */
        Vertex_MainEnd(shaderPart: string): PBRCustomMaterial;
    }


    /** @internal */
    export var firePixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var fireVertexShader: {
        name: string;
        shader: string;
    };


    export class FireMaterial extends PushMaterial {
        private _diffuseTexture;
        diffuseTexture: Nullable<BaseTexture>;
        private _distortionTexture;
        distortionTexture: Nullable<BaseTexture>;
        private _opacityTexture;
        opacityTexture: Nullable<BaseTexture>;
        diffuseColor: Color3;
        speed: number;
        private _scaledDiffuse;
        private _lastTime;
        constructor(name: string, scene?: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        getClassName(): string;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): FireMaterial;
        serialize(): any;
        static Parse(source: any, scene: Scene, rootUrl: string): FireMaterial;
    }




    /** @internal */
    export var furPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var furVertexShader: {
        name: string;
        shader: string;
    };


    export class FurMaterial extends PushMaterial {
        private _diffuseTexture;
        diffuseTexture: BaseTexture;
        private _heightTexture;
        heightTexture: BaseTexture;
        diffuseColor: Color3;
        furLength: number;
        furAngle: number;
        furColor: Color3;
        furOffset: number;
        furSpacing: number;
        furGravity: Vector3;
        furSpeed: number;
        furDensity: number;
        furOcclusion: number;
        furTexture: DynamicTexture;
        private _disableLighting;
        disableLighting: boolean;
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        highLevelFur: boolean;
        _meshes: AbstractMesh[];
        private _furTime;
        constructor(name: string, scene?: Scene);
        get furTime(): number;
        set furTime(furTime: number);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        updateFur(): void;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): FurMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): FurMaterial;
        static GenerateTexture(name: string, scene: Scene): DynamicTexture;
        static FurifyMesh(sourceMesh: Mesh, quality: number): Mesh[];
    }




    /** @internal */
    export var gradientPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var gradientVertexShader: {
        name: string;
        shader: string;
    };


    export class GradientMaterial extends PushMaterial {
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        topColor: Color3;
        topColorAlpha: number;
        bottomColor: Color3;
        bottomColorAlpha: number;
        offset: number;
        scale: number;
        smoothness: number;
        private _disableLighting;
        disableLighting: boolean;
        constructor(name: string, scene?: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): GradientMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): GradientMaterial;
    }




    /** @internal */
    export var gridPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var gridVertexShader: {
        name: string;
        shader: string;
    };


    /**
     * The grid materials allows you to wrap any shape with a grid.
     * Colors are customizable.
     */
    export class GridMaterial extends PushMaterial {
        /**
         * Main color of the grid (e.g. between lines)
         */
        mainColor: Color3;
        /**
         * Color of the grid lines.
         */
        lineColor: Color3;
        /**
         * The scale of the grid compared to unit.
         */
        gridRatio: number;
        /**
         * Allows setting an offset for the grid lines.
         */
        gridOffset: Vector3;
        /**
         * The frequency of thicker lines.
         */
        majorUnitFrequency: number;
        /**
         * The visibility of minor units in the grid.
         */
        minorUnitVisibility: number;
        /**
         * The grid opacity outside of the lines.
         */
        opacity: number;
        /**
         * Whether to antialias the grid
         */
        antialias: boolean;
        /**
         * Determine RBG output is premultiplied by alpha value.
         */
        preMultiplyAlpha: boolean;
        /**
         * Determines if the max line value will be used instead of the sum wherever grid lines intersect.
         */
        useMaxLine: boolean;
        private _opacityTexture;
        /**
         * Texture to define opacity of the grid
         */
        opacityTexture: BaseTexture;
        private _gridControl;
        /**
         * constructor
         * @param name The name given to the material in order to identify it afterwards.
         * @param scene The scene the material is used in.
         */
        constructor(name: string, scene?: Scene);
        /**
         * @returns whether or not the grid requires alpha blending.
         */
        needAlphaBlending(): boolean;
        needAlphaBlendingForMesh(mesh: AbstractMesh): boolean;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        /**
         * Dispose the material and its associated resources.
         * @param forceDisposeEffect will also dispose the used effect when true
         */
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): GridMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): GridMaterial;
    }








    /** @internal */
    export var lavaPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var lavaVertexShader: {
        name: string;
        shader: string;
    };


    export class LavaMaterial extends PushMaterial {
        private _diffuseTexture;
        diffuseTexture: BaseTexture;
        noiseTexture: BaseTexture;
        fogColor: Color3;
        speed: number;
        movingSpeed: number;
        lowFrequencySpeed: number;
        fogDensity: number;
        private _lastTime;
        diffuseColor: Color3;
        private _disableLighting;
        disableLighting: boolean;
        private _unlit;
        unlit: boolean;
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        private _scaledDiffuse;
        constructor(name: string, scene?: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): LavaMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): LavaMaterial;
    }




    /** @internal */
    export var mixPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var mixVertexShader: {
        name: string;
        shader: string;
    };


    export class MixMaterial extends PushMaterial {
        /**
         * Mix textures
         */
        private _mixTexture1;
        mixTexture1: BaseTexture;
        private _mixTexture2;
        mixTexture2: BaseTexture;
        /**
         * Diffuse textures
         */
        private _diffuseTexture1;
        diffuseTexture1: Texture;
        private _diffuseTexture2;
        diffuseTexture2: Texture;
        private _diffuseTexture3;
        diffuseTexture3: Texture;
        private _diffuseTexture4;
        diffuseTexture4: Texture;
        private _diffuseTexture5;
        diffuseTexture5: Texture;
        private _diffuseTexture6;
        diffuseTexture6: Texture;
        private _diffuseTexture7;
        diffuseTexture7: Texture;
        private _diffuseTexture8;
        diffuseTexture8: Texture;
        /**
         * Uniforms
         */
        diffuseColor: Color3;
        specularColor: Color3;
        specularPower: number;
        private _disableLighting;
        disableLighting: boolean;
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        constructor(name: string, scene?: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): MixMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): MixMaterial;
    }




    /** @internal */
    export var normalPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var normalVertexShader: {
        name: string;
        shader: string;
    };


    export class NormalMaterial extends PushMaterial {
        private _diffuseTexture;
        diffuseTexture: BaseTexture;
        diffuseColor: Color3;
        private _disableLighting;
        disableLighting: boolean;
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        constructor(name: string, scene?: Scene);
        needAlphaBlending(): boolean;
        needAlphaBlendingForMesh(mesh: AbstractMesh): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): NormalMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): NormalMaterial;
    }




    /** @internal */
    export var shadowOnlyPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var shadowOnlyVertexShader: {
        name: string;
        shader: string;
    };


    export class ShadowOnlyMaterial extends PushMaterial {
        private _activeLight;
        private _needAlphaBlending;
        constructor(name: string, scene?: Scene);
        shadowColor: Color3;
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        get activeLight(): IShadowLight;
        set activeLight(light: IShadowLight);
        private _getFirstShadowLightForMesh;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        clone(name: string): ShadowOnlyMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): ShadowOnlyMaterial;
    }




    /** @internal */
    export var simplePixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var simpleVertexShader: {
        name: string;
        shader: string;
    };


    export class SimpleMaterial extends PushMaterial {
        private _diffuseTexture;
        diffuseTexture: BaseTexture;
        diffuseColor: Color3;
        private _disableLighting;
        disableLighting: boolean;
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        constructor(name: string, scene?: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): SimpleMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): SimpleMaterial;
    }




    /** @internal */
    export var skyPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var skyVertexShader: {
        name: string;
        shader: string;
    };


    /**
     * This is the sky material which allows to create dynamic and texture free effects for skyboxes.
     * @see https://doc.babylonjs.com/toolsAndResources/assetLibraries/materialsLibrary/skyMat
     */
    export class SkyMaterial extends PushMaterial {
        /**
         * Defines the overall luminance of sky in interval ]0, 1[.
         */
        luminance: number;
        /**
         * Defines the amount (scattering) of haze as opposed to molecules in atmosphere.
         */
        turbidity: number;
        /**
         * Defines the sky appearance (light intensity).
         */
        rayleigh: number;
        /**
         * Defines the mieCoefficient in interval [0, 0.1] which affects the property .mieDirectionalG.
         */
        mieCoefficient: number;
        /**
         * Defines the amount of haze particles following the Mie scattering theory.
         */
        mieDirectionalG: number;
        /**
         * Defines the distance of the sun according to the active scene camera.
         */
        distance: number;
        /**
         * Defines the sun inclination, in interval [-0.5, 0.5]. When the inclination is not 0, the sun is said
         * "inclined".
         */
        inclination: number;
        /**
         * Defines the solar azimuth in interval [0, 1]. The azimuth is the angle in the horizontal plan between
         * an object direction and a reference direction.
         */
        azimuth: number;
        /**
         * Defines the sun position in the sky on (x,y,z). If the property .useSunPosition is set to false, then
         * the property is overridden by the inclination and the azimuth and can be read at any moment.
         */
        sunPosition: Vector3;
        /**
         * Defines if the sun position should be computed (inclination and azimuth) according to the given
         * .sunPosition property.
         */
        useSunPosition: boolean;
        /**
         * Defines an offset vector used to get a horizon offset.
         * @example skyMaterial.cameraOffset.y = camera.globalPosition.y // Set horizon relative to 0 on the Y axis
         */
        cameraOffset: Vector3;
        /**
         * Defines the vector the skyMaterial should consider as up. (default is Vector3(0, 1, 0) as returned by Vector3.Up())
         */
        up: Vector3;
        /**
         * Defines if sky should be dithered.
         */
        dithering: boolean;
        private _cameraPosition;
        private _skyOrientation;
        /**
         * Instantiates a new sky material.
         * This material allows to create dynamic and texture free
         * effects for skyboxes by taking care of the atmosphere state.
         * @see https://doc.babylonjs.com/toolsAndResources/assetLibraries/materialsLibrary/skyMat
         * @param name Define the name of the material in the scene
         * @param scene Define the scene the material belong to
         */
        constructor(name: string, scene?: Scene);
        /**
         * Specifies if the material will require alpha blending
         * @returns a boolean specifying if alpha blending is needed
         */
        needAlphaBlending(): boolean;
        /**
         * Specifies if this material should be rendered in alpha test mode
         * @returns false as the sky material doesn't need alpha testing.
         */
        needAlphaTesting(): boolean;
        /**
         * Get the texture used for alpha test purpose.
         * @returns null as the sky material has no texture.
         */
        getAlphaTestTexture(): Nullable<BaseTexture>;
        /**
         * Get if the submesh is ready to be used and all its information available.
         * Child classes can use it to update shaders
         * @param mesh defines the mesh to check
         * @param subMesh defines which submesh to check
         * @returns a boolean indicating that the submesh is ready or not
         */
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh): boolean;
        /**
         * Binds the submesh to this material by preparing the effect and shader to draw
         * @param world defines the world transformation matrix
         * @param mesh defines the mesh containing the submesh
         * @param subMesh defines the submesh to bind the material to
         */
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        /**
         * Get the list of animatables in the material.
         * @returns the list of animatables object used in the material
         */
        getAnimatables(): IAnimatable[];
        /**
         * Disposes the material
         * @param forceDisposeEffect specifies if effects should be forcefully disposed
         */
        dispose(forceDisposeEffect?: boolean): void;
        /**
         * Makes a duplicate of the material, and gives it a new name
         * @param name defines the new name for the duplicated material
         * @returns the cloned material
         */
        clone(name: string): SkyMaterial;
        /**
         * Serializes this material in a JSON representation
         * @returns the serialized material object
         */
        serialize(): any;
        /**
         * Gets the current class name of the material e.g. "SkyMaterial"
         * Mainly use in serialization.
         * @returns the class name
         */
        getClassName(): string;
        /**
         * Creates a sky material from parsed material data
         * @param source defines the JSON representation of the material
         * @param scene defines the hosting scene
         * @param rootUrl defines the root URL to use to load textures and relative dependencies
         * @returns a new sky material
         */
        static Parse(source: any, scene: Scene, rootUrl: string): SkyMaterial;
    }




    /** @internal */
    export var terrainPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var terrainVertexShader: {
        name: string;
        shader: string;
    };


    export class TerrainMaterial extends PushMaterial {
        private _mixTexture;
        mixTexture: BaseTexture;
        private _diffuseTexture1;
        diffuseTexture1: Texture;
        private _diffuseTexture2;
        diffuseTexture2: Texture;
        private _diffuseTexture3;
        diffuseTexture3: Texture;
        private _bumpTexture1;
        bumpTexture1: Texture;
        private _bumpTexture2;
        bumpTexture2: Texture;
        private _bumpTexture3;
        bumpTexture3: Texture;
        diffuseColor: Color3;
        specularColor: Color3;
        specularPower: number;
        private _disableLighting;
        disableLighting: boolean;
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        constructor(name: string, scene?: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): TerrainMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): TerrainMaterial;
    }




    /** @internal */
    export var triplanarPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var triplanarVertexShader: {
        name: string;
        shader: string;
    };


    export class TriPlanarMaterial extends PushMaterial {
        mixTexture: BaseTexture;
        private _diffuseTextureX;
        diffuseTextureX: BaseTexture;
        private _diffuseTextureY;
        diffuseTextureY: BaseTexture;
        private _diffuseTextureZ;
        diffuseTextureZ: BaseTexture;
        private _normalTextureX;
        normalTextureX: BaseTexture;
        private _normalTextureY;
        normalTextureY: BaseTexture;
        private _normalTextureZ;
        normalTextureZ: BaseTexture;
        tileSize: number;
        diffuseColor: Color3;
        specularColor: Color3;
        specularPower: number;
        private _disableLighting;
        disableLighting: boolean;
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        constructor(name: string, scene?: Scene);
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): TriPlanarMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): TriPlanarMaterial;
    }




    /** @internal */
    export var waterPixelShader: {
        name: string;
        shader: string;
    };


    /** @internal */
    export var waterVertexShader: {
        name: string;
        shader: string;
    };


    export class WaterMaterial extends PushMaterial {
        renderTargetSize: Vector2;
        private _bumpTexture;
        bumpTexture: BaseTexture;
        diffuseColor: Color3;
        specularColor: Color3;
        specularPower: number;
        private _disableLighting;
        disableLighting: boolean;
        private _maxSimultaneousLights;
        maxSimultaneousLights: number;
        /**
         * Defines the wind force.
         */
        windForce: number;
        /**
         * Defines the direction of the wind in the plane (X, Z).
         */
        windDirection: Vector2;
        /**
         * Defines the height of the waves.
         */
        waveHeight: number;
        /**
         * Defines the bump height related to the bump map.
         */
        bumpHeight: number;
        /**
         * Defines wether or not: to add a smaller moving bump to less steady waves.
         */
        private _bumpSuperimpose;
        bumpSuperimpose: boolean;
        /**
         * Defines wether or not color refraction and reflection differently with .waterColor2 and .colorBlendFactor2. Non-linear (physically correct) fresnel.
         */
        private _fresnelSeparate;
        fresnelSeparate: boolean;
        /**
         * Defines wether or not bump Wwves modify the reflection.
         */
        private _bumpAffectsReflection;
        bumpAffectsReflection: boolean;
        /**
         * Defines the water color blended with the refraction (near).
         */
        waterColor: Color3;
        /**
         * Defines the blend factor related to the water color.
         */
        colorBlendFactor: number;
        /**
         * Defines the water color blended with the reflection (far).
         */
        waterColor2: Color3;
        /**
         * Defines the blend factor related to the water color (reflection, far).
         */
        colorBlendFactor2: number;
        /**
         * Defines the maximum length of a wave.
         */
        waveLength: number;
        /**
         * Defines the waves speed.
         */
        waveSpeed: number;
        /**
         * Defines the number of times waves are repeated. This is typically used to adjust waves count according to the ground's size where the material is applied on.
         */
        waveCount: number;
        /**
         * Sets or gets whether or not automatic clipping should be enabled or not. Setting to true will save performances and
         * will avoid calculating useless pixels in the pixel shader of the water material.
         */
        disableClipPlane: boolean;
        /**
         * Defines whether or not to use world coordinates for wave deformations.
         * The default value is false, meaning that the deformation is applied in object (local) space.
         * You will probably need to set it to true if you are using instances or thin instances for your water objects.
         */
        private _useWorldCoordinatesForWaveDeformation;
        useWorldCoordinatesForWaveDeformation: boolean;
        protected _renderTargets: SmartArray<RenderTargetTexture>;
        private _mesh;
        private _refractionRTT;
        private _reflectionRTT;
        private _reflectionTransform;
        private _lastTime;
        private _lastDeltaTime;
        private _waitingRenderList;
        private _imageProcessingConfiguration;
        private _imageProcessingObserver;
        /**
         * Gets a boolean indicating that current material needs to register RTT
         */
        get hasRenderTargetTextures(): boolean;
        /**
         * Constructor
         * @param name
         * @param scene
         * @param renderTargetSize
         */
        constructor(name: string, scene?: Scene, renderTargetSize?: Vector2);
        get refractionTexture(): Nullable<RenderTargetTexture>;
        get reflectionTexture(): Nullable<RenderTargetTexture>;
        addToRenderList(node: any): void;
        removeFromRenderList(node: any): void;
        enableRenderTargets(enable: boolean): void;
        getRenderList(): Nullable<AbstractMesh[]>;
        get renderTargetsEnabled(): boolean;
        needAlphaBlending(): boolean;
        needAlphaTesting(): boolean;
        getAlphaTestTexture(): Nullable<BaseTexture>;
        isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;
        bindForSubMesh(world: Matrix, mesh: Mesh, subMesh: SubMesh): void;
        private _createRenderTargets;
        getAnimatables(): IAnimatable[];
        getActiveTextures(): BaseTexture[];
        hasTexture(texture: BaseTexture): boolean;
        dispose(forceDisposeEffect?: boolean): void;
        clone(name: string): WaterMaterial;
        serialize(): any;
        getClassName(): string;
        static Parse(source: any, scene: Scene, rootUrl: string): WaterMaterial;
        static CreateDefaultMesh(name: string, scene: Scene): Mesh;
    }

































}


                