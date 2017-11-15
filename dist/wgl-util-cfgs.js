"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WglUtilCfg = (function () {
    function WglUtilCfg() {
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
    return WglUtilCfg;
}());
exports.WglUtilCfg = WglUtilCfg;
var XYZ = (function () {
    function XYZ(px, py, pz) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = U.isEmpty(px) ? 0 : px;
        this.y = U.isEmpty(py) ? 0 : py;
        this.z = U.isEmpty(pz) ? 0 : pz;
    }
    return XYZ;
}());
exports.XYZ = XYZ;
var Expr = (function () {
    function Expr(p) {
        this.expression = '';
        this.expression = U.isEmpty(p) ? '' : p;
    }
    return Expr;
}());
exports.Expr = Expr;
var ExprXYZ = (function () {
    function ExprXYZ(px, py, pz) {
        this.x = '';
        this.y = '';
        this.z = '';
        this.x = U.isEmpty(px) ? '' : px;
        this.y = U.isEmpty(py) ? '' : py;
        this.z = U.isEmpty(pz) ? '' : pz;
    }
    return ExprXYZ;
}());
exports.ExprXYZ = ExprXYZ;
var Size3D = (function () {
    function Size3D() {
        this.width = 0;
        this.height = 0;
        this.depth = 0;
    }
    return Size3D;
}());
exports.Size3D = Size3D;
var CameraCfg = (function () {
    function CameraCfg() {
        this.fov = 0;
        this.aspect = 0;
        this.near = 0;
        this.far = 0;
        this.position = new XYZ();
        this.showHelper = false;
    }
    return CameraCfg;
}());
exports.CameraCfg = CameraCfg;
var RendererCfg = (function () {
    function RendererCfg() {
        this.color = 0;
        this.alpha = 0;
        this.width = 0;
        this.height = 0;
        this.shadowMapEnabled = false;
        this.antialias = false;
        this.useCanvas = false;
    }
    return RendererCfg;
}());
exports.RendererCfg = RendererCfg;
var SceneCfg = (function () {
    function SceneCfg() {
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
    return SceneCfg;
}());
exports.SceneCfg = SceneCfg;
var SceneRuntimeCfg = (function (_super) {
    __extends(SceneRuntimeCfg, _super);
    function SceneRuntimeCfg() {
        _super.apply(this, arguments);
        this.showAxisRuntime = false;
        this.showGridRuntime = false;
        this.useStereoEffectRuntime = false;
        this.useAnaglyphEffectRuntime = false;
        this.useAsciiEffectRuntime = false;
        this.noSleep = false; // set to true to keep awake mobile devices
    }
    return SceneRuntimeCfg;
}(SceneCfg));
exports.SceneRuntimeCfg = SceneRuntimeCfg;
var OrbitCfg = (function () {
    function OrbitCfg() {
        this.minDistance = 0;
        this.maxDistance = 0;
    }
    return OrbitCfg;
}());
exports.OrbitCfg = OrbitCfg;
var TrackballCfg = (function () {
    function TrackballCfg() {
        this.rotateSpeed = 0;
        this.zoomSpeed = 0;
        this.panSpeed = 0;
        this.noZoom = false;
        this.noPan = false;
        this.staticMoving = false;
        this.dynamicDampingFactor = 0;
    }
    return TrackballCfg;
}());
exports.TrackballCfg = TrackballCfg;
var LightCfg = (function () {
    function LightCfg() {
        this.color = 0;
        this.intensity = 0;
        this.position = new XYZ();
        this.showHelper = false;
        this.showHelperRuntime = false;
        this.helper = null;
    }
    return LightCfg;
}());
exports.LightCfg = LightCfg;
var DirLightCfg = (function (_super) {
    __extends(DirLightCfg, _super);
    function DirLightCfg() {
        _super.apply(this, arguments);
        this.shadowCameraFov = 0;
        this.castShadow = false;
        this.size = 0;
    }
    return DirLightCfg;
}(LightCfg));
exports.DirLightCfg = DirLightCfg;
var PointLightCfg = (function (_super) {
    __extends(PointLightCfg, _super);
    function PointLightCfg() {
        _super.apply(this, arguments);
        this.distance = 0;
        this.helperSphereSize = 0;
    }
    return PointLightCfg;
}(LightCfg));
exports.PointLightCfg = PointLightCfg;
var HempisphereLightCfg = (function (_super) {
    __extends(HempisphereLightCfg, _super);
    function HempisphereLightCfg() {
        _super.apply(this, arguments);
        this.skyColor = 0;
        this.groundColor = 0;
        this.helperSphereSize = 0;
    }
    return HempisphereLightCfg;
}(LightCfg));
exports.HempisphereLightCfg = HempisphereLightCfg;
var SpotLightCfg = (function (_super) {
    __extends(SpotLightCfg, _super);
    function SpotLightCfg() {
        _super.apply(this, arguments);
        this.distance = 0;
        this.angle = 0;
        this.penumbra = 0;
        this.decay = 0;
    }
    return SpotLightCfg;
}(LightCfg));
exports.SpotLightCfg = SpotLightCfg;
var LineCfg = (function () {
    function LineCfg() {
        this.start = new XYZ();
        this.end = new XYZ();
        this.color = 0;
    }
    return LineCfg;
}());
exports.LineCfg = LineCfg;
var PlaneCfg = (function () {
    function PlaneCfg() {
        this.width = 0;
        this.height = 0;
        this.widthSegments = 0;
        this.heightSegments = 0;
        this.color = 0;
        this.position = new XYZ();
        this.receiveShadow = false;
    }
    return PlaneCfg;
}());
exports.PlaneCfg = PlaneCfg;
var CircleCfg = (function () {
    function CircleCfg() {
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
    return CircleCfg;
}());
exports.CircleCfg = CircleCfg;
var CubeCfg = (function () {
    function CubeCfg() {
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
    return CubeCfg;
}());
exports.CubeCfg = CubeCfg;
var SphereCfg = (function () {
    function SphereCfg() {
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
    return SphereCfg;
}());
exports.SphereCfg = SphereCfg;
var CylinderCfg = (function () {
    function CylinderCfg() {
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
    return CylinderCfg;
}());
exports.CylinderCfg = CylinderCfg;
var TorusCfg = (function () {
    function TorusCfg() {
        this.radius = 0;
        this.tube = 0;
        this.radialSegments = 0;
        this.tubularSegments = 0;
        this.arc = 0;
        this.wireframe = false;
        this.color = 0;
    }
    return TorusCfg;
}());
exports.TorusCfg = TorusCfg;
var TorusKnotCfg = (function (_super) {
    __extends(TorusKnotCfg, _super);
    function TorusKnotCfg() {
        _super.apply(this, arguments);
        this.p = 0;
        this.q = 0;
    }
    return TorusKnotCfg;
}(TorusCfg));
exports.TorusKnotCfg = TorusKnotCfg;
var PointsCfg = (function () {
    function PointsCfg() {
        this.color = 0;
        this.radius = 0;
        this.transparent = false;
        this.offset = new XYZ();
        this.step = new XYZ();
    }
    return PointsCfg;
}());
exports.PointsCfg = PointsCfg;
var PointsFromGeomCfg = (function () {
    function PointsFromGeomCfg() {
        this.color = 0;
        this.size = 0;
        this.scale = 0;
    }
    return PointsFromGeomCfg;
}());
exports.PointsFromGeomCfg = PointsFromGeomCfg;
var ParticleCfg = (function () {
    function ParticleCfg() {
        this.count = 0;
        this.size = 0;
        this.range = 0;
        this.transparent = false;
        this.opacity = 0;
        this.vertexColors = [];
        this.sizeAttenuation = false;
        this.color = 0;
    }
    return ParticleCfg;
}());
exports.ParticleCfg = ParticleCfg;
var CanvasCfg = (function () {
    function CanvasCfg() {
        this.width = 0;
        this.height = 0;
        this.fontSize = 12;
        this.font = this.fontSize + "px Arial";
        this.text = '';
        this.textColor = '';
        this.backgroundColor = '';
        this.textAlign = 'center'; // left, center, right
        this.textBaseline = 'middle'; // top, middle, bottom
    }
    return CanvasCfg;
}());
exports.CanvasCfg = CanvasCfg;
var TextureCfg = (function () {
    function TextureCfg() {
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
    return TextureCfg;
}());
exports.TextureCfg = TextureCfg;
var ShadersCfg = (function () {
    function ShadersCfg() {
        this.vertexShaderId = '';
        this.fragmentShaderId = '';
        this.uniforms = {};
        this.attributes = {};
        this.srcDir = '';
    }
    return ShadersCfg;
}());
exports.ShadersCfg = ShadersCfg;
var SkyBoxCfg = (function () {
    function SkyBoxCfg() {
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
    return SkyBoxCfg;
}());
exports.SkyBoxCfg = SkyBoxCfg;
var ObjModelCfg = (function () {
    function ObjModelCfg() {
        this.srcDir = '';
    }
    return ObjModelCfg;
}());
exports.ObjModelCfg = ObjModelCfg;
var TextCfg = (function () {
    function TextCfg() {
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
    return TextCfg;
}());
exports.TextCfg = TextCfg;
var BirdsCfg = (function () {
    function BirdsCfg() {
        this.count = 0;
        this.avoidWalls = false;
        this.worldSize = new Size3D();
        this.scale = 0;
    }
    return BirdsCfg;
}());
exports.BirdsCfg = BirdsCfg;
var GridHelperCfg = (function () {
    function GridHelperCfg() {
        this.size = 0;
        this.divisions = 0;
        this.colorCenterLine = 0;
        this.colorGrid = 0;
    }
    return GridHelperCfg;
}());
exports.GridHelperCfg = GridHelperCfg;
var AudioCfg = (function () {
    function AudioCfg() {
    }
    return AudioCfg;
}());
exports.AudioCfg = AudioCfg;
var CssCfg = (function () {
    function CssCfg() {
    }
    return CssCfg;
}());
exports.CssCfg = CssCfg;
var SpriteCfg = (function () {
    function SpriteCfg() {
        this.position = new XYZ();
    }
    return SpriteCfg;
}());
exports.SpriteCfg = SpriteCfg;
var MirrorCubeCfg = (function () {
    function MirrorCubeCfg() {
        this.near = 0;
        this.far = 0;
        this.resolution = 0;
        this.position = new XYZ();
        this.dimension = new XYZ();
    }
    return MirrorCubeCfg;
}());
exports.MirrorCubeCfg = MirrorCubeCfg;
var U = (function () {
    function U() {
    }
    U.isEmpty = function (value) {
        if (value === null)
            return true;
        if (value === undefined)
            return true;
        if (typeof (value) === 'undefined')
            return true;
        if (typeof (value) === undefined)
            return true;
        return false;
    };
    U.isEmptyString = function (value) {
        if (typeof value === 'string' && value === '')
            return true;
        return false;
    };
    return U;
}());
exports.U = U;
var TweenCfg = (function () {
    function TweenCfg() {
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
    return TweenCfg;
}());
exports.TweenCfg = TweenCfg;
