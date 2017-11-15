export declare class WglUtilCfg {
    useAxis: boolean;
    useOrbit: boolean;
    useTrackball: boolean;
    useStats: boolean;
    useDatGui: boolean;
    statsId: string;
    canvasId: string;
    useAsciiEffect: boolean;
    useAnaglyphEffect: boolean;
    anaglyphFocalLength: number;
    useGridHelper: boolean;
    useStereoEffect: boolean;
    useCssRender: boolean;
}
export declare class XYZ {
    x: number;
    y: number;
    z: number;
    constructor(px?: number, py?: number, pz?: number);
}
export declare class Expr {
    expression: string;
    fn: any;
    constructor(p?: string);
}
export declare class ExprXYZ {
    x: string;
    y: string;
    z: string;
    fnx: any;
    fny: any;
    fnz: any;
    constructor(px?: string, py?: string, pz?: string);
}
export declare class Size3D {
    width: number;
    height: number;
    depth: number;
}
export declare class CameraCfg {
    fov: number;
    aspect: number;
    near: number;
    far: number;
    position: XYZ;
    showHelper: boolean;
}
export declare class RendererCfg {
    color: number;
    alpha: number;
    width: number;
    height: number;
    shadowMapEnabled: boolean;
    antialias: boolean;
    useCanvas: boolean;
}
export declare class SceneCfg {
    useFog: boolean;
    fogColor: number;
    fogMistDensity: number;
    showAxis: boolean;
    axisSize: number;
    useAxisArrows: boolean;
    axisArrowHeadLength: number;
    showGrid: boolean;
    gridSize: number;
    gridDivisions: number;
    gridColorCenterLine: number;
    gridColor: number;
    backgroundColor: string;
    useStereoEffect: boolean;
    useAnaglyphEffect: boolean;
    useAsciiEffect: boolean;
}
export declare class SceneRuntimeCfg extends SceneCfg {
    showAxisRuntime: boolean;
    showGridRuntime: boolean;
    useStereoEffectRuntime: boolean;
    useAnaglyphEffectRuntime: boolean;
    useAsciiEffectRuntime: boolean;
    noSleep: boolean;
}
export declare class OrbitCfg {
    minDistance: number;
    maxDistance: number;
}
export declare class TrackballCfg {
    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;
    noZoom: boolean;
    noPan: boolean;
    staticMoving: boolean;
    dynamicDampingFactor: number;
}
export declare class LightCfg {
    color: number;
    intensity: number;
    position: XYZ;
    showHelper: boolean;
    showHelperRuntime: boolean;
    helper: any;
}
export declare class DirLightCfg extends LightCfg {
    shadowCameraFov: number;
    castShadow: boolean;
    size: number;
}
export declare class PointLightCfg extends LightCfg {
    distance: number;
    helperSphereSize: number;
}
export declare class HempisphereLightCfg extends LightCfg {
    skyColor: number;
    groundColor: number;
    helperSphereSize: number;
}
export declare class SpotLightCfg extends LightCfg {
    distance: number;
    angle: number;
    penumbra: number;
    decay: number;
}
export declare class LineCfg {
    start: XYZ;
    end: XYZ;
    color: number;
}
export declare class PlaneCfg {
    width: number;
    height: number;
    widthSegments: number;
    heightSegments: number;
    color: number;
    position: XYZ;
    receiveShadow: boolean;
}
export declare class CircleCfg {
    radius: number;
    segments: number;
    color: number;
    wireframe: boolean;
    position: XYZ;
    castShadow: boolean;
    rotation: XYZ;
    thetaStart: number;
    thetaLength: number;
}
export declare class CubeCfg {
    width: number;
    height: number;
    depth: number;
    color: number;
    wireframe: boolean;
    position: XYZ;
    widthSegments: number;
    heightSegments: number;
    depthSegments: number;
    castShadow: boolean;
    rotation: XYZ;
    rotationSpeed: number;
}
export declare class SphereCfg {
    radius: number;
    widthSegments: number;
    heightSegments: number;
    color: number;
    wireframe: boolean;
    position: XYZ;
    castShadow: boolean;
    rotation: XYZ;
    phiStart: number;
    phiLength: number;
    thetaStart: number;
    thetaLength: number;
}
export declare class CylinderCfg {
    radiusTop: number;
    radiusBottom: number;
    height: number;
    radiusSegments: number;
    heightSegments: number;
    openEnded: boolean;
    thetaStart: number;
    thetaLength: number;
    color: number;
    position: XYZ;
    castShadow: boolean;
    wireframe: boolean;
}
export declare class TorusCfg {
    radius: number;
    tube: number;
    radialSegments: number;
    tubularSegments: number;
    arc: number;
    wireframe: boolean;
    color: number;
}
export declare class TorusKnotCfg extends TorusCfg {
    p: number;
    q: number;
}
export declare class PointsCfg {
    color: number;
    radius: number;
    transparent: boolean;
    offset: XYZ;
    step: XYZ;
}
export declare class PointsFromGeomCfg {
    color: number;
    size: number;
    scale: number;
}
export declare class ParticleCfg {
    count: number;
    size: number;
    range: number;
    transparent: boolean;
    opacity: number;
    vertexColors: Array<any>;
    sizeAttenuation: boolean;
    color: number;
}
export declare class CanvasCfg {
    width: number;
    height: number;
    fontSize: number;
    font: string;
    text: string;
    textColor: string;
    backgroundColor: string;
    textAlign: string;
    textBaseline: string;
}
export declare class TextureCfg {
    srcDir: string;
    position: XYZ;
    width: number;
    height: number;
    autoplay: boolean;
    loop: boolean;
    video: any;
    texture: any;
    canvas: CanvasCfg;
}
export declare class ShadersCfg {
    vertexShaderId: string;
    fragmentShaderId: string;
    uniforms: any;
    attributes: any;
    srcDir: string;
}
export declare class SkyBoxCfg {
    srcFile: string;
    srcDir: string;
    px: string;
    py: string;
    pz: string;
    nx: string;
    ny: string;
    nz: string;
    size: number;
    width: number;
    height: number;
    depth: number;
}
export declare class ObjModelCfg {
    srcDir: string;
}
export declare class TextCfg {
    text: string;
    height: number;
    size: number;
    hover: number;
    curveSegments: number;
    bevelEnabled: boolean;
    bevelThickness: number;
    bevelSize: number;
    bevelSegments: number;
    font: any;
    fontName: string;
    weight: string;
    style: string;
    material: number;
    extrudeMaterial: number;
    useMirror: boolean;
    textMaterial: any;
    textMesh: any;
    textMeshMirror: any;
    offsetX: number;
    frontColor: number;
    sideColor: number;
    geometry: any;
}
export declare class BirdsCfg {
    count: number;
    avoidWalls: boolean;
    worldSize: Size3D;
    scale: number;
}
export declare class GridHelperCfg {
    size: number;
    divisions: number;
    colorCenterLine: number;
    colorGrid: number;
}
export declare class AudioCfg {
    fileName: string;
    loop: boolean;
    autoPlay: boolean;
    controls: boolean;
    fullFileName: string;
    position: string;
    left: string;
    top: string;
}
export declare class CssCfg {
    'background-color': string;
    position: string;
    left: string;
    top: string;
    width: string;
    height: string;
    opacity: string;
}
export declare class SpriteCfg {
    map: any;
    color: number;
    position: XYZ;
}
export declare class MirrorCubeCfg {
    near: number;
    far: number;
    resolution: number;
    position: XYZ;
    dimension: XYZ;
}
export declare class U {
    static isEmpty(value: any): boolean;
    static isEmptyString(value: any): boolean;
}
export declare class TweenCfg {
    static TweenEasings: {
        'Linear.None': string;
        'Quadratic.In': string;
        'Quadratic.Out': string;
        'Quadratic.InOut': string;
        'Cubic.In': string;
        'Cubic.Out': string;
        'Cubic.InOut': string;
        'Quartic.In': string;
        'Quartic.Out': string;
        'Quartic.InOut': string;
        'Quintic.In': string;
        'Quintic.Out': string;
        'Quintic.InOut': string;
        'Sinusoidal.In': string;
        'Sinusoidal.Out': string;
        'Sinusoidal.InOut': string;
        'Exponential.In': string;
        'Exponential.Out': string;
        'Exponential.InOut': string;
        'Circular.In': string;
        'Circular.Out': string;
        'Circular.InOut': string;
        'Elastic.In': string;
        'Elastic.Out': string;
        'Elastic.InOut': string;
        'Back.In': string;
        'Back.Out': string;
        'Back.InOut': string;
        'Bounce.In': string;
        'Bounce.Out': string;
        'Bounce.InOut': string;
    };
}
