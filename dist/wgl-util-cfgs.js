"use strict";
class WglUtilCfg {
    constructor() {
        this.useAxis = false;
        this.useOrbit = false;
        this.useTrackball = false;
        this.useStats = false;
        this.useDatGui = false;
        this.statsId = '';
        this.canvasId = '';
        this.useAsciiEffect = false; //requires AsciiEffect.js
        this.useAnaglyphEffect = false; //requires AnaglyphEffect.js
        this.anaglyphFocalLength = 0;
        this.useGridHelper = false;
        this.useStereoEffect = false;
        this.useCssRender = false;
    }
}
exports.WglUtilCfg = WglUtilCfg;
class XYZ {
    constructor(px, py, pz) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = U.isEmpty(px) ? 0 : px;
        this.y = U.isEmpty(py) ? 0 : py;
        this.z = U.isEmpty(pz) ? 0 : pz;
    }
}
exports.XYZ = XYZ;
class Expr {
    constructor(p) {
        this.expression = '';
        this.expression = U.isEmpty(p) ? '' : p;
    }
}
exports.Expr = Expr;
class ExprXYZ {
    constructor(px, py, pz) {
        this.x = '';
        this.y = '';
        this.z = '';
        this.x = U.isEmpty(px) ? '' : px;
        this.y = U.isEmpty(py) ? '' : py;
        this.z = U.isEmpty(pz) ? '' : pz;
    }
}
exports.ExprXYZ = ExprXYZ;
class Size3D {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.depth = 0;
    }
}
exports.Size3D = Size3D;
class CameraCfg {
    constructor() {
        this.fov = 0;
        this.aspect = 0;
        this.near = 0;
        this.far = 0;
        this.position = new XYZ();
        this.showHelper = false;
    }
}
exports.CameraCfg = CameraCfg;
class RendererCfg {
    constructor() {
        this.color = 0;
        this.alpha = 0;
        this.width = 0;
        this.height = 0;
        this.shadowMapEnabled = false;
        this.antialias = false;
        this.useCanvas = false;
    }
}
exports.RendererCfg = RendererCfg;
class SceneCfg {
    constructor() {
        this.useFog = false;
        this.fogColor = 0;
        this.fogMistDensity = 0;
        this.showAxis = false;
        this.axisSize = 0;
        this.useAxisArrows = false;
        this.axisArrowHeadLength = 0;
        this.showGrid = false;
        this.gridSize = 0;
        this.gridDivisions = 0;
        this.gridColorCenterLine = 0;
        this.gridColor = 0;
        this.useStereoEffect = false;
        this.useAnaglyphEffect = false;
        this.useAsciiEffect = false;
    }
}
exports.SceneCfg = SceneCfg;
class SceneRuntimeCfg extends SceneCfg {
    constructor() {
        super(...arguments);
        this.showAxisRuntime = false;
        this.showGridRuntime = false;
        this.useStereoEffectRuntime = false;
        this.useAnaglyphEffectRuntime = false;
        this.useAsciiEffectRuntime = false;
        this.noSleep = false; // set to true to keep awake mobile devices
    }
}
exports.SceneRuntimeCfg = SceneRuntimeCfg;
class OrbitCfg {
    constructor() {
        this.minDistance = 0;
        this.maxDistance = 0;
    }
}
exports.OrbitCfg = OrbitCfg;
class TrackballCfg {
    constructor() {
        this.rotateSpeed = 0;
        this.zoomSpeed = 0;
        this.panSpeed = 0;
        this.noZoom = false;
        this.noPan = false;
        this.staticMoving = false;
        this.dynamicDampingFactor = 0;
    }
}
exports.TrackballCfg = TrackballCfg;
class LightCfg {
    constructor() {
        this.color = 0;
        this.intensity = 0;
        this.position = new XYZ();
        this.showHelper = false;
        this.showHelperRuntime = false;
        this.helper = null;
    }
}
exports.LightCfg = LightCfg;
class DirLightCfg extends LightCfg {
    constructor() {
        super(...arguments);
        this.shadowCameraFov = 0;
        this.castShadow = false;
        this.size = 0;
    }
}
exports.DirLightCfg = DirLightCfg;
class PointLightCfg extends LightCfg {
    constructor() {
        super(...arguments);
        this.distance = 0;
        this.helperSphereSize = 0;
    }
}
exports.PointLightCfg = PointLightCfg;
class HempisphereLightCfg extends LightCfg {
    constructor() {
        super(...arguments);
        this.skyColor = 0;
        this.groundColor = 0;
        this.helperSphereSize = 0;
    }
}
exports.HempisphereLightCfg = HempisphereLightCfg;
class SpotLightCfg extends LightCfg {
    constructor() {
        super(...arguments);
        this.distance = 0;
        this.angle = 0;
        this.penumbra = 0;
        this.decay = 0;
    }
}
exports.SpotLightCfg = SpotLightCfg;
class LineCfg {
    constructor() {
        this.start = new XYZ();
        this.end = new XYZ();
        this.color = 0;
    }
}
exports.LineCfg = LineCfg;
class PlaneCfg {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.widthSegments = 0;
        this.heightSegments = 0;
        this.color = 0;
        this.position = new XYZ();
        this.receiveShadow = false;
    }
}
exports.PlaneCfg = PlaneCfg;
class CircleCfg {
    constructor() {
        this.radius = 0;
        this.segments = 0;
        this.color = 0;
        this.wireframe = false;
        this.position = new XYZ();
        this.castShadow = false;
        this.rotation = new XYZ();
        this.thetaStart = 0;
        this.thetaLength = 0;
    }
}
exports.CircleCfg = CircleCfg;
class CubeCfg {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.depth = 0;
        this.color = 0;
        this.wireframe = false;
        this.position = new XYZ();
        this.widthSegments = 0;
        this.heightSegments = 0;
        this.depthSegments = 0;
        this.castShadow = false;
        this.rotation = new XYZ();
        this.rotationSpeed = 0;
    }
}
exports.CubeCfg = CubeCfg;
class SphereCfg {
    constructor() {
        this.radius = 0;
        this.widthSegments = 0;
        this.heightSegments = 0;
        this.color = 0;
        this.wireframe = false;
        this.position = new XYZ();
        this.castShadow = false;
        this.rotation = new XYZ();
        this.phiStart = 0;
        this.phiLength = 0;
        this.thetaStart = 0;
        this.thetaLength = 0;
    }
}
exports.SphereCfg = SphereCfg;
class CylinderCfg {
    constructor() {
        this.radiusTop = 0;
        this.radiusBottom = 0;
        this.height = 0;
        this.radiusSegments = 0;
        this.heightSegments = 0;
        this.openEnded = false;
        this.thetaStart = 0;
        this.thetaLength = 0;
        this.color = 0;
        this.position = new XYZ();
        this.castShadow = false;
        this.wireframe = false;
    }
}
exports.CylinderCfg = CylinderCfg;
class TorusCfg {
    constructor() {
        this.radius = 0;
        this.tube = 0;
        this.radialSegments = 0;
        this.tubularSegments = 0;
        this.arc = 0;
        this.wireframe = false;
        this.color = 0;
    }
}
exports.TorusCfg = TorusCfg;
class TorusKnotCfg extends TorusCfg {
    constructor() {
        super(...arguments);
        this.p = 0;
        this.q = 0;
    }
}
exports.TorusKnotCfg = TorusKnotCfg;
class PointsCfg {
    constructor() {
        this.color = 0;
        this.radius = 0;
        this.transparent = false;
        this.offset = new XYZ();
        this.step = new XYZ();
    }
}
exports.PointsCfg = PointsCfg;
class PointsFromGeomCfg {
    constructor() {
        this.color = 0;
        this.size = 0;
        this.scale = 0;
    }
}
exports.PointsFromGeomCfg = PointsFromGeomCfg;
class ParticleCfg {
    constructor() {
        this.count = 0;
        this.size = 0;
        this.range = 0;
        this.transparent = false;
        this.opacity = 0;
        this.vertexColors = [];
        this.sizeAttenuation = false;
        this.color = 0;
    }
}
exports.ParticleCfg = ParticleCfg;
class CanvasCfg {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.fontSize = 12;
        this.font = `${this.fontSize}px Arial`;
        this.text = '';
        this.textColor = '';
        this.backgroundColor = '';
        this.textAlign = 'center'; // left, center, right
        this.textBaseline = 'middle'; // top, middle, bottom
    }
}
exports.CanvasCfg = CanvasCfg;
class TextureCfg {
    constructor() {
        this.srcDir = '';
        this.position = new XYZ();
        this.width = 0;
        this.height = 0;
        this.autoplay = false;
        this.loop = false;
        this.video = {};
        this.texture = {};
        this.canvas = new CanvasCfg();
    }
}
exports.TextureCfg = TextureCfg;
class ShadersCfg {
    constructor() {
        this.vertexShaderId = '';
        this.fragmentShaderId = '';
        this.uniforms = {};
        this.attributes = {};
        this.srcDir = '';
    }
}
exports.ShadersCfg = ShadersCfg;
class SkyBoxCfg {
    constructor() {
        this.srcFile = '';
        this.srcDir = '';
        this.px = '';
        this.py = '';
        this.pz = '';
        this.nx = '';
        this.ny = '';
        this.nz = '';
        this.size = 0;
        this.width = 0;
        this.height = 0;
        this.depth = 0;
    }
}
exports.SkyBoxCfg = SkyBoxCfg;
class ObjModelCfg {
    constructor() {
        this.srcDir = '';
    }
}
exports.ObjModelCfg = ObjModelCfg;
class TextCfg {
    constructor() {
        this.text = '';
        this.height = 0;
        this.size = 0;
        this.hover = 0;
        this.curveSegments = 0;
        this.bevelEnabled = false;
        this.bevelThickness = 0;
        this.bevelSize = 0;
        this.bevelSegments = 0;
        this.font = {};
        this.fontName = ''; // helvetiker, optimer, gentilis, droid sans, droid serif
        this.weight = ''; // normal bold
        this.style = ''; // normal italic
        this.material = 0;
        this.extrudeMaterial = 0;
        this.useMirror = false;
        this.textMaterial = {};
        this.textMesh = {};
        this.textMeshMirror = {};
        this.offsetX = 0;
        this.frontColor = 0;
        this.sideColor = 0;
        this.geometry = {};
    }
}
exports.TextCfg = TextCfg;
class BirdsCfg {
    constructor() {
        this.count = 0;
        this.avoidWalls = false;
        this.worldSize = new Size3D();
        this.scale = 0;
    }
}
exports.BirdsCfg = BirdsCfg;
class GridHelperCfg {
    constructor() {
        this.size = 0;
        this.divisions = 0;
        this.colorCenterLine = 0;
        this.colorGrid = 0;
    }
}
exports.GridHelperCfg = GridHelperCfg;
class AudioCfg {
}
exports.AudioCfg = AudioCfg;
class CssCfg {
}
exports.CssCfg = CssCfg;
class SpriteCfg {
    constructor() {
        this.position = new XYZ();
    }
}
exports.SpriteCfg = SpriteCfg;
class MirrorCubeCfg {
    constructor() {
        this.near = 0;
        this.far = 0;
        this.resolution = 0;
        this.position = new XYZ();
        this.dimension = new XYZ();
    }
}
exports.MirrorCubeCfg = MirrorCubeCfg;
class U {
    static isEmpty(value) {
        if (value === null)
            return true;
        if (value === undefined)
            return true;
        if (typeof (value) === 'undefined')
            return true;
        if (typeof (value) === undefined)
            return true;
        return false;
    }
    static isEmptyString(value) {
        if (typeof value === 'string' && value === '')
            return true;
        return false;
    }
}
exports.U = U;
class TweenCfg {
}
TweenCfg.TweenEasings = {
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
exports.TweenCfg = TweenCfg;
//# sourceMappingURL=wgl-util-cfgs.js.map