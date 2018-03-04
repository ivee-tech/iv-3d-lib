export class WglUtilCfg {
    useAxis: boolean = false;
    useOrbit: boolean = false;
    useTrackball: boolean = false;
    useStats: boolean = false;
    useDatGui: boolean = false;
    statsId: string = '';
    canvasId: string = '';
    useAsciiEffect: boolean = false; //requires AsciiEffect.js
    useAnaglyphEffect: boolean = false; //requires AnaglyphEffect.js
    anaglyphFocalLength: number = 0;
    useGridHelper: boolean = false;
    useStereoEffect: boolean = false;
    useCssRender: boolean = false;
}

export class XYZ {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(px?: number, py?: number, pz?: number) {
        this.x = U.isEmpty(px) ? 0 : px;
        this.y = U.isEmpty(py) ? 0 : py;
        this.z = U.isEmpty(pz) ? 0 : pz;
    }
}

export class Expr {
    expression: string = '';

    fn: any;

    constructor(p?: string) {
        this.expression = U.isEmpty(p) ? '' : p;
    }
}

export class ExprXYZ {
    x: string = '';
    y: string = '';
    z: string = '';

    fnx: any;
    fny: any;
    fnz: any;

    constructor(px?: string, py?: string, pz?: string) {
        this.x = U.isEmpty(px) ? '' : px;
        this.y = U.isEmpty(py) ? '' : py;
        this.z = U.isEmpty(pz) ? '' : pz;
    }
}

export class Size3D {
    width: number = 0;
    height: number = 0;
    depth: number = 0;
}

export class CameraCfg {
    fov: number = 0;
    aspect: number = 0;
    near: number = 0;
    far: number = 0;
    position: XYZ = new XYZ();
    showHelper: boolean = false;
}

export class RendererCfg {
    color: number = 0;
    alpha: number = 0;
    width: number = 0;
    height: number = 0;
    shadowMapEnabled: boolean = false;
    antialias: boolean = false;
    useCanvas: boolean = false;
}

export class SceneCfg {
    useFog: boolean = false;
    fogColor: number = 0;
    fogMistDensity: number = 0;
    showAxis: boolean = false;
    axisSize: number = 0;
    useAxisArrows: boolean = false;
    axisArrowHeadLength: number = 0;
    showGrid: boolean = false;
    gridSize: number = 0;
    gridDivisions: number = 0;
    gridColorCenterLine: number = 0;
    gridColor: number = 0;
    backgroundColor: string;
    useStereoEffect: boolean = false;
    useAnaglyphEffect: boolean = false;
    useAsciiEffect: boolean = false;
}

export class SceneRuntimeCfg extends SceneCfg {
    showAxisRuntime: boolean = false;
    showGridRuntime: boolean = false;
    useStereoEffectRuntime: boolean = false;
    useAnaglyphEffectRuntime: boolean = false;
    useAsciiEffectRuntime: boolean = false;
    noSleep: boolean = false; // set to true to keep awake mobile devices
}

export class OrbitCfg {
    minDistance: number = 0;
    maxDistance: number = 0;
}

export class TrackballCfg {
    rotateSpeed: number = 0;
    zoomSpeed: number = 0;
    panSpeed: number = 0;
    noZoom: boolean = false;
    noPan: boolean = false;
    staticMoving: boolean = false;
    dynamicDampingFactor: number = 0;
}

export class LightCfg {
    color: number = 0;
    intensity: number = 0;
    position: XYZ = new XYZ();
    showHelper: boolean = false;
    showHelperRuntime: boolean = false;
    helper: any = null;
}

export class DirLightCfg extends LightCfg {
    shadowCameraFov: number = 0;
    castShadow: boolean = false;
    size: number = 0;
}

export class PointLightCfg extends LightCfg {
    distance: number = 0;
    helperSphereSize: number = 0;
}

export class HempisphereLightCfg extends LightCfg {
    skyColor: number = 0;
    groundColor: number = 0;
    helperSphereSize: number = 0;
}

export class SpotLightCfg extends LightCfg {
    distance: number = 0;
    angle: number = 0;
    penumbra: number = 0;
    decay: number = 0;
}

export class LineCfg {
    start: XYZ = new XYZ();
    end: XYZ = new XYZ();
    color: number = 0;
}

export class PlaneCfg {
    width: number = 0;
    height: number = 0;
    widthSegments: number = 0;
    heightSegments: number = 0;
    color: number = 0;
    position: XYZ = new XYZ();
    receiveShadow: boolean = false;
}

export class CircleCfg {
    radius: number = 0;
    segments: number = 0;
    color: number = 0;
    wireframe: boolean = false;
    position: XYZ = new XYZ();
    castShadow: boolean = false;
    rotation: XYZ = new XYZ();
    thetaStart: number = 0;
    thetaLength: number = 0;
}

export class CubeCfg {
    width: number = 0;
    height: number = 0;
    depth: number = 0;
    color: number = 0;
    wireframe: boolean = false;
    position: XYZ = new XYZ();
    widthSegments: number = 0;
    heightSegments: number = 0;
    depthSegments: number = 0;
    castShadow: boolean = false;
    rotation: XYZ = new XYZ();
    rotationSpeed: number = 0;
}

export class SphereCfg {
    radius: number = 0;
    widthSegments: number = 0;
    heightSegments: number = 0;
    color: number = 0;
    wireframe: boolean = false;
    position: XYZ = new XYZ();
    castShadow: boolean = false;
    rotation: XYZ = new XYZ();
    phiStart: number = 0;
    phiLength: number = 0;
    thetaStart: number = 0;
    thetaLength: number = 0;
}

export class CylinderCfg {
    radiusTop: number = 0;
    radiusBottom: number = 0;
    height: number = 0;
    radiusSegments: number = 0;
    heightSegments: number = 0;
    openEnded: boolean = false;
    thetaStart: number = 0;
    thetaLength: number = 0;
    color: number = 0;
    position: XYZ = new XYZ();
    castShadow: boolean = false;
    wireframe: boolean = false;
}

export class TorusCfg {
    radius: number = 0;
    tube: number = 0;
    radialSegments: number = 0;
    tubularSegments: number = 0;
    arc: number = 0;
    wireframe: boolean = false;
    color: number = 0;
}

export class TorusKnotCfg extends TorusCfg {
    p: number = 0;
    q: number = 0;
}

export class PointsCfg {
    color: number = 0;
    radius: number = 0;
    transparent: boolean = false;
    offset: XYZ = new XYZ();
    step: XYZ = new XYZ();
}

export class PointsFromGeomCfg {
    color: number = 0;
    size: number = 0;
    scale: number = 0;
}

export class ParticleCfg {
    count: number = 0;
    size: number = 0;
    range: number = 0;
    transparent: boolean = false;
    opacity: number = 0;
    vertexColors: Array<any> = [];
    sizeAttenuation: boolean = false;
    color: number = 0;
}

export class CanvasCfg {
    width: number = 0;
    height: number = 0;
    fontSize: number = 12;
    font: string = `${this.fontSize}px Arial`;
    text: string = '';
    textColor: string = '';
    backgroundColor: string = '';
    textAlign: string = 'center'; // left, center, right
    textBaseline: string = 'middle'; // top, middle, bottom
}

export class TextureCfg {
    srcDir: string = '';
    position: XYZ = new XYZ();
    width: number = 0;
    height: number = 0;
    autoplay: boolean = false;
    loop: boolean = false;
    video: any = {};
    texture: any = {};
    canvas: CanvasCfg = new CanvasCfg();
}

export class ShadersCfg {
    vertexShaderId: string = '';
    fragmentShaderId: string = '';
    uniforms: any = {};
    attributes: any = {};
    srcDir: string = '';
}

export class SkyBoxCfg {
    srcFile: string = '';
    srcDir: string = '';
    px: string = '';
    py: string = '';
    pz: string = '';
    nx: string = '';
    ny: string = '';
    nz: string = '';
    size: number = 0;
    width: number = 0;
    height: number = 0;
    depth: number = 0;
}

export class ObjModelCfg {
    srcDir: string = '';
}

export class TextCfg {
    text: string = '';
    height: number = 0;
    size: number = 0;
    hover: number = 0;
    curveSegments: number = 0;
    bevelEnabled: boolean = false;
    bevelThickness: number = 0;
    bevelSize: number = 0;
    bevelSegments: number = 0;
    font: any = {};
    fontName: string = ''; // helvetiker, optimer, gentilis, droid sans, droid serif
    weight: string = ''; // normal bold
    style: string = ''; // normal italic
    material: number = 0;
    extrudeMaterial: number = 0;
    useMirror: boolean = false;
    textMaterial: any = {};
    textMesh: any = {};
    textMeshMirror: any = {};
    offsetX: number = 0;
    frontColor: number = 0;
    sideColor: number = 0;
    geometry: any = {};
}

export class BirdsCfg {
    count: number = 0;
    avoidWalls: boolean = false;
    worldSize: Size3D = new Size3D();
    scale: number = 0;
}

export class GridHelperCfg {
    size: number = 0;
    divisions: number = 0;
    colorCenterLine: number = 0;
    colorGrid: number = 0;
}

export class AudioCfg {
    fileName: string;
    loop: boolean;
    autoPlay: boolean;
    controls: boolean;
    fullFileName: string;
    position: string;
    left: string;
    top: string;
}

export class CssCfg {
    'background-color': string;
    position: string;
    left: string;
    top: string;
    width: string;
    height: string;
    opacity: string;
    'z-index': string;
}

export class SpriteCfg {
    map: any;
    color: number;
    position: XYZ = new XYZ();
}

export class MirrorCubeCfg {
    near: number = 0;
    far: number = 0;
    resolution: number = 0;
    position: XYZ = new XYZ();
    dimension: XYZ = new XYZ();
}

export class U {

    static isEmpty(value: any) {
        if (value === null) return true;
        if (value === undefined) return true;
        if (typeof(value) === 'undefined') return true;
        if (typeof (value) === undefined) return true;
        return false;
    }

    static isEmptyString(value: any) {
        if (typeof value === 'string' && value === '') return true;
        return false;
    }
}

export class TweenCfg {

    public static TweenEasings = {
        'Linear.None': 'Linear.None',
        'Quadratic.In': 'Quadratic.In',
        'Quadratic.Out': 'Quadratic.Out',
        'Quadratic.InOut': 'Quadratic.InOut',
        'Cubic.In': 'Cubic.In',
        'Cubic.Out': 'Cubic.Out',
        'Cubic.InOut': 'Cubic.InOut',
        'Quartic.In': 'Quartic.In',
        'Quartic.Out': 'Quartic.Out',
        'Quartic.InOut': 'Quartic.InOut',
        'Quintic.In': 'Quintic.In',
        'Quintic.Out': 'Quintic.Out',
        'Quintic.InOut': 'Quintic.InOut',
        'Sinusoidal.In': 'Sinusoidal.In',
        'Sinusoidal.Out': 'Sinusoidal.Out',
        'Sinusoidal.InOut': 'Sinusoidal.InOut',
        'Exponential.In': 'Exponential.In',
        'Exponential.Out': 'Exponential.Out',
        'Exponential.InOut': 'Exponential.InOut',
        'Circular.In': 'Circular.In',
        'Circular.Out': 'Circular.Out',
        'Circular.InOut': 'Circular.InOut',
        'Elastic.In': 'Elastic.In',
        'Elastic.Out': 'Elastic.Out',
        'Elastic.InOut': 'Elastic.InOut',
        'Back.In': 'Back.In',
        'Back.Out': 'Back.Out',
        'Back.InOut': 'Back.InOut',
        'Bounce.In': 'Bounce.In',
        'Bounce.Out': 'Bounce.Out',
        'Bounce.InOut': 'Bounce.InOut'
    };

}