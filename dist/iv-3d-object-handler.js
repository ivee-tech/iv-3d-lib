"use strict";
var THREE = require('three');
var TWEEN = require('tween.js');
var parser = require('expr-eval');
var iv_3d_object_1 = require('./models/iv-3d-object');
var cfg = require('./wgl-util-cfgs');
var k_gen_1 = require('./models/k-gen');
var wgl_util_1 = require('./wgl-util');
var iv_3d_light_1 = require('./models/iv-3d-light');
var user_service_1 = require('./services/user-service');
var iv_3d_shader_1 = require('./models/iv-3d-shader');
var iv_3d_data_source_1 = require('./models/iv-3d-data-source');
var Iv3dObjectHandler = (function () {
    function Iv3dObjectHandler(userSvc, errorSvc, environment) {
        this.userSvc = userSvc;
        this.errorSvc = errorSvc;
        this.environment = environment;
        this.offset = new cfg.XYZ(100, 100, 100);
        this.radius = 50;
        this.cssBackgroundColor = '#1E1E1E';
        this.oParser = new parser.Parser();
        this.fonts = [
            'helvetiker',
            'optimer',
            'gentilis',
            'droid/droid_serif'
        ];
        this.fontWeights = ['regular', 'bold'];
        this.materials = ['LineBasicMaterial', 'LineDashedMaterial', 'MeshBasicMaterial', 'MeshDepthMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial',
            'MeshStandardMaterial', 'MeshToonMaterial', 'PointsMaterial', 'MultiMaterial'];
        // , 'MeshNormalMaterial', 'RawShaderMaterial', 'MeshPhysicalMaterial', 'ShaderMaterial', 'ShadowMaterial', 'SpriteMaterial'];
        // 'Material', 'MultiMaterial'
        this.objectTypes = [];
        this.valueFormats = [];
        this.lineCfg = {
            start: { x: 0, y: 0, z: 0 }, end: { x: this.offset.x / 3, y: this.offset.y / 3, z: this.offset.z / 3 }, color: Math.random() * 0xFFFFFF
        };
        this.lineGeomProps = [];
        this.cubeCfg = {
            width: this.offset.x, height: this.offset.y, depth: this.offset.z, color: Math.random() * 0xFF0000, wireframe: false, position: { x: 0, y: 0, z: 0 },
            widthSegments: 1, heightSegments: 1, depthSegments: 1,
            castShadow: true, rotation: { x: 0, y: 0, z: 0 }, rotationSpeed: 0.5
        };
        this.cubeGeomProps = [
            { prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: iv_3d_object_1.Iv3dGeometryType.box, readOnly: true },
            { prop1: null, prop2: 'width', type: 'number', label: 'Width', min: 0, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'height', type: 'number', label: 'Height', min: 0, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'depth', type: 'number', label: 'Depth', min: 0, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'widthSegments', type: 'number', label: 'Width Segments', min: 1, max: 100, value: 1, step: 10 },
            { prop1: null, prop2: 'heightSegments', type: 'number', label: 'Height Segments', min: 1, max: 100, value: 1, step: 10 },
            { prop1: null, prop2: 'depthSegments', type: 'number', label: 'Depth Segments', min: 1, max: 100, value: 1, step: 10 },
        ];
        //public circleGeomCfg: any = {
        //    radius: 0,
        //    segments: 0,
        //    thetaStart: 0,
        //    thetaLength: 0
        //};
        this.circleCfg = {
            radius: this.radius, segments: 36, thetaStart: 0, thetaLength: 2 * Math.PI, color: Math.random() * 0xFFFFFF, wireframe: false, position: { x: 0, y: 0, z: 0 },
            castShadow: true, rotation: { x: 0, y: 0, z: 0 }
        };
        this.circleGeomProps = [
            { prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: iv_3d_object_1.Iv3dGeometryType.circle, readOnly: true },
            { prop1: null, prop2: 'radius', type: 'number', label: 'Radius', min: -1000, max: 1000, value: 50, step: 10 },
            { prop1: null, prop2: 'segments', type: 'number', label: 'Segments', min: 1, max: 360, value: 8, step: 10 },
            { prop1: null, prop2: 'thetaStart', type: 'number', label: 'Theta Start', min: 0, max: 2 * Math.PI, value: 0, step: 0.1, deg: true },
            { prop1: null, prop2: 'thetaLength', type: 'number', label: 'Theta Start', min: 0, max: 2 * Math.PI, value: 2 * Math.PI, step: 0.1, deg: true },
        ];
        //public planeGeomCfg: any = {
        //    width: 0,
        //    height: 0,
        //    widthSegments: 0,
        //    heightSegments: 0
        //};
        this.planeCfg = {
            width: this.offset.x, height: 20, widthSegments: 1, heightSegments: 1, color: Math.random() * 0xFFFFFF, position: { x: 0, y: 0, z: 0 },
            receiveShadow: true
        };
        this.planeGeomProps = [
            { prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: iv_3d_object_1.Iv3dGeometryType.plane, readOnly: true },
            { prop1: null, prop2: 'width', type: 'number', label: 'Width', min: 0, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'height', type: 'number', label: 'Height', min: 0, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'widthSegments', type: 'number', label: 'Width Segments', min: 1, max: 100, value: 1, step: 10 },
            { prop1: null, prop2: 'heightSegments', type: 'number', label: 'Height Segments', min: 1, max: 100, value: 1, step: 10 }
        ];
        //public sphereGeomCfg: any = {
        //    radius: this.radius,
        //    widthSegments: 0,
        //    heightSegments: 0,
        //    phiStart: 0,
        //    phiLength: 0,
        //    thetaStart: 0,
        //    thetaLength: 0
        //};
        this.sphereCfg = {
            radius: this.radius, widthSegments: 36, heightSegments: 36, phiStart: 0, phiLength: 2 * Math.PI, thetaStart: 0, thetaLength: 2 * Math.PI,
            color: Math.random() * 0xFF0000, wireframe: false, position: { x: 0, y: 0, z: 0 },
            castShadow: true, rotation: { x: 0, y: 0, z: 0 }
        };
        this.sphereGeomProps = [
            { prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: iv_3d_object_1.Iv3dGeometryType.sphere, readOnly: true },
            { prop1: null, prop2: 'radius', type: 'number', label: 'Radius', min: 1, max: 1000, value: this.sphereCfg.radius, step: 10 },
            { prop1: null, prop2: 'widthSegments', type: 'number', label: 'Width Segments', min: 3, max: 360, value: this.sphereCfg.widthSegments, step: 10 },
            { prop1: null, prop2: 'heightSegments', type: 'number', label: 'Height Segments', min: 2, max: 360, value: this.sphereCfg.heightSegments, step: 10 },
            { prop1: null, prop2: 'phiStart', type: 'number', label: 'Phi Start', min: 0, max: 2 * Math.PI, value: this.sphereCfg.phiStart, step: 0.1, deg: true },
            { prop1: null, prop2: 'phiLength', type: 'number', label: 'Phi Length', min: 0, max: 2 * Math.PI, value: this.sphereCfg.phiLength, step: 0.1, deg: true },
            { prop1: null, prop2: 'thetaStart', type: 'number', label: 'Theta Start', min: 0, max: 2 * Math.PI, value: this.sphereCfg.thetaStart, step: 0.1, deg: true },
            { prop1: null, prop2: 'thetaLength', type: 'number', label: 'Theta Length', min: 0, max: 2 * Math.PI, value: this.sphereCfg.thetaLength, step: 0.1, deg: true },
        ];
        this.cylinderCfg = {
            radiusTop: this.radius / 2, radiusBottom: this.radius / 2, height: this.offset.y, radiusSegments: 36, heightSegments: 1, openEnded: false, thetaStart: 0, thetaLength: 2 * Math.PI, color: Math.random() * 0xFFFFFF,
            position: { x: 0, y: 0, z: 0 }
        };
        this.cylinderGeomProps = [
            { prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: iv_3d_object_1.Iv3dGeometryType.cylinder, readOnly: true },
            { prop1: null, prop2: 'radiusTop', type: 'number', label: 'Radius Top', value: 50, min: 1, max: 1000, step: 10 },
            { prop1: null, prop2: 'radiusBottom', type: 'number', label: 'Radius Bottom', value: 50, min: 1, max: 1000, step: 10 },
            { prop1: null, prop2: 'height', type: 'number', label: 'Height', value: 100, min: 1, max: 1000, step: 10 },
            { prop1: null, prop2: 'radiusSegments', type: 'number', label: 'Radius Segments', value: 36, min: 1, max: 360, step: 10 },
            { prop1: null, prop2: 'heightSegments', type: 'number', label: 'Height Segments', value: 1, min: 1, max: 100, step: 10 },
            { prop1: null, prop2: 'openEnded', type: 'bool', label: 'Open Ended', value: false },
            { prop1: null, prop2: 'thetaStart', type: 'number', label: 'Theta Start', min: 0, max: 2 * Math.PI, value: 0, step: 0.1, deg: true },
            { prop1: null, prop2: 'thetaLength', type: 'number', label: 'Theta Length', min: 0, max: 2 * Math.PI, value: 2 * Math.PI, step: 0.1, deg: true },
        ];
        //public torusGeomCfg: any = {
        //    radius: this.radius / 2,
        //    tube: this.radius / 8,
        //    radialSegments: 36,
        //    tubularSegments: 36,
        //    arc: 2 * Math.PI,
        //    color: Math.random() * 0xFFFFFF,
        //    wireframe: false
        //};
        this.torusCfg = {
            radius: this.radius, tube: this.radius / 2, radialSegments: 36, tubularSegments: 36, arc: 2 * Math.PI, color: Math.random() * 0xFF0000
        };
        this.torusGeomProps = [
            { prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: iv_3d_object_1.Iv3dGeometryType.torus, readOnly: true },
            { prop1: null, prop2: 'radius', type: 'number', label: 'Radius', min: 1, max: 1000, value: 100, step: 10 },
            { prop1: null, prop2: 'tube', type: 'number', label: 'Tube', min: 1, max: 1000, value: 40, step: 10 },
            { prop1: null, prop2: 'radialSegments', type: 'number', label: 'Radial Segments', min: 1, max: 1000, value: 8, step: 10 },
            { prop1: null, prop2: 'tubularSegments', type: 'number', label: 'Tubular Segments', min: 1, max: 1000, value: 6, step: 10 },
            { prop1: null, prop2: 'arc', type: 'number', label: 'Arc', min: 0, max: 2 * Math.PI, value: 2 * Math.PI, step: 0.1, deg: true },
        ];
        this.torusKnotCfg = {
            radius: this.radius, tube: this.radius / 4, radialSegments: 64, tubularSegments: 8, color: Math.random() * 0xFF0000
        };
        this.torusKnotGeomProps = [
            { prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: iv_3d_object_1.Iv3dGeometryType.torusKnot, readOnly: true },
            { prop1: null, prop2: 'radius', type: 'number', label: 'Radius', min: 1, max: 1000, value: 100, step: 10 },
            { prop1: null, prop2: 'tube', type: 'number', label: 'Tube', min: 1, max: 1000, value: 40, step: 10 },
            { prop1: null, prop2: 'radialSegments', type: 'number', label: 'Radial Segments', min: 1, max: 1000, value: 64, step: 10 },
            { prop1: null, prop2: 'tubularSegments', type: 'number', label: 'Tubular Segments', min: 1, max: 1000, value: 8, step: 10 },
            { prop1: null, prop2: 'p', type: 'number', label: 'p', min: 1, max: 100, value: 2, step: 1 },
            { prop1: null, prop2: 'q', type: 'number', label: 'q', min: 1, max: 100, value: 3, step: 1 },
        ];
        this.textCfg = {
            text: '',
            font: {},
            fontName: '',
            hover: 0,
            weight: 'regular',
            height: 10,
            size: this.offset.x / 2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: .5,
            bevelSegments: 5,
            useMirror: true,
            offsetX: 0,
            frontColor: Math.random() * 0xFF0000,
            sideColor: Math.random() * 0xFF0000,
            textMesh: null,
            style: ''
        };
        this.textGeomProps = [
            { prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: iv_3d_object_1.Iv3dGeometryType.text, readOnly: true },
            { prop1: null, prop2: 'text', type: 'string', label: 'Text', value: '' },
            //<Iv3dObjectProperty>{ prop1: null, prop2: 'font', type: 'object', label: 'Font', value: 'helvetiker', values: this.fonts },
            { prop1: null, prop2: 'fontName', type: 'string', label: 'Font', value: 'helvetiker', values: this.fonts },
            { prop1: null, prop2: 'font', type: 'object', label: 'Font data', value: null, hidden: true },
            { prop1: null, prop2: 'hover', type: 'number', label: 'Hover', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'weight', type: 'string', label: 'Weight', value: 'regular', values: this.fontWeights },
            { prop1: null, prop2: 'height', type: 'number', label: 'Height', min: 1, max: 1000, value: 50, step: 10 },
            { prop1: null, prop2: 'size', type: 'number', label: 'Size', min: 1, max: 1000, value: 50, step: 10 },
            { prop1: null, prop2: 'bevelEnabled', type: 'bool', label: 'Bevel Enabled', value: false },
            { prop1: null, prop2: 'bevelThickness', type: 'number', label: 'Bevel Thickness', min: 0, max: 100, value: 0.5, step: 1 },
            { prop1: null, prop2: 'bevelSize', type: 'number', label: 'Bevel Size', min: 0, max: 100, value: 0.5, step: 1 }
        ];
        this.particleCfg = {
            count: 100,
            size: 1,
            range: 500,
            transparent: true,
            opacity: 0.5,
            vertexColors: [],
            sizeAttenuation: true,
            color: 0xFF0000
        };
        this.particleGeomProps = [
            { prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: iv_3d_object_1.Iv3dGeometryType.particles, readOnly: true },
            { prop1: null, prop2: 'count', type: 'number', label: 'Count', value: 100, min: 1, max: 10000, step: 10 },
            { prop1: null, prop2: 'size', type: 'number', label: 'Size', value: 1, min: 1, max: 100, step: 1 },
            { prop1: null, prop2: 'range', type: 'number', label: 'Range', value: 500, min: 100, max: 10000, step: 10 },
        ];
        this.objectProps = [
            { prop1: null, prop2: 'name', type: 'string', label: 'Name', value: '' },
            { prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
            { prop1: null, prop2: 'url', type: 'string', label: 'Url', value: '' },
            { prop1: null, prop2: 'contentPanels', type: 'string', label: 'Content Panels', value: '' },
            { prop1: null, prop2: 'visible', type: 'boolean', label: 'Visible', value: true },
            { prop1: null, prop2: 'visibleRuntime', type: 'boolean', label: 'Runtime', value: true },
            { prop1: null, prop2: 'sVisibleRuntime', type: 'string', label: 'SRuntime', value: 'true', hidden: true },
            { prop1: null, prop2: 'script', type: 'string', label: 'Script', value: '' },
            { prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'rotation', prop2: 'x', type: 'number', label: 'Rotation X', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'rotation', prop2: 'y', type: 'number', label: 'Rotation Y', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'rotation', prop2: 'z', type: 'number', label: 'Rotation Z', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'scale', prop2: 'x', type: 'number', label: 'Scale X', min: -10, max: 10, value: 1, step: 1 },
            { prop1: 'scale', prop2: 'y', type: 'number', label: 'Scale Y', min: -10, max: 10, value: 1, step: 1 },
            { prop1: 'scale', prop2: 'z', type: 'number', label: 'Scale Z', min: -10, max: 10, value: 1, step: 1 }
        ];
        this.objectPropsDirectNames = ['name', 'url', 'contentPanels', 'visibleRuntime', 'sVisibleRuntime', 'script'];
        this.materialProps = [
            { prop1: 'material', prop2: 'type', type: 'object', label: 'Type', value: '', values: this.materials },
            { prop1: 'material', prop2: 'color', type: 'color', label: 'Color', value: '#FFFFFF' },
            { prop1: 'material', prop2: 'specular', type: 'color', label: 'Specular', value: '#111111' },
            { prop1: 'material', prop2: 'wireframe', type: 'boolean', label: 'Wireframe', value: false },
            { prop1: 'material', prop2: 'transparent', type: 'boolean', label: 'Transparent', value: false },
            { prop1: 'material', prop2: 'opacity', type: 'number', label: 'Opacity', min: 0.00, max: 1.00, value: 0.5, step: 0.05 },
            // <ObjectProperty>{ prop1: 'material', prop2: 'lights', type: 'boolean', label: 'Lights', value: false },
            { prop1: 'material', prop2: 'texture', type: 'map', label: 'Map Texture', value: '' },
            { prop1: 'material', prop2: 'select', type: 'map', label: 'Select', value: '' },
            { prop1: 'material', prop2: 'refresh', type: 'map', label: 'Refresh', value: '' },
            { prop1: 'material', prop2: 'shaderId', type: 'string', label: 'Shader Id', value: '' },
            { prop1: 'material', prop2: 'useCanvas', type: 'boolean', label: 'Use Canvas', value: false },
            { prop1: 'canvas', prop2: 'text', type: 'string', label: 'Canvas text', value: 'Text' },
            { prop1: 'canvas', prop2: 'font', type: 'string', label: 'Font', value: '12px Arial' },
            { prop1: 'canvas', prop2: 'textColor', type: 'color', label: 'Text color', value: '#000' },
            { prop1: 'canvas', prop2: 'backgroundColor', type: 'color', label: 'Background color', value: '#fff' },
            { prop1: 'canvas', prop2: 'textAlign', type: 'string', label: 'Text align', value: 'center', values: ['left', 'center', 'right', 'justify'] },
            { prop1: 'canvas', prop2: 'textBaseline', type: 'string', label: 'Text baseline', value: 'middle', values: ['top', 'middle', 'bottom'] },
        ];
        this.pointLightCfg = {
            color: 0xFFFFFF,
            intensity: 1,
            position: { x: 0, y: this.offset.y, z: 0 },
            distance: this.radius * 2,
            helperSphereSize: 5,
            showHelper: true,
            showHelperRuntime: false,
            helper: null
        };
        this.pointLightProps = [
            { prop1: null, prop2: 'type', type: 'string', label: 'Type', value: iv_3d_light_1.Iv3dLightType.point, readOnly: true },
            { prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
            { prop1: null, prop2: 'name', type: 'string', label: 'name', value: '' },
            { prop1: null, prop2: 'color', type: 'color', label: 'Color', value: '#FFFFFF' },
            { prop1: null, prop2: 'intensity', type: 'number', label: 'Intensity', value: 1, min: 0.00, max: 1.00, step: 0.05 },
            { prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.offset.y, step: 10 },
            { prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'distance', type: 'number', label: 'Distance', min: -1000, max: 1000, value: this.radius * 2, step: 10 },
            { prop1: null, prop2: 'helperSphereSize', type: 'number', label: 'Helper Size', min: 1, max: 100, value: 5, step: 1 },
            { prop1: null, prop2: 'showHelper', type: 'bool', label: 'Show Helper', value: true },
            { prop1: null, prop2: 'showHelperRuntime', type: 'bool', label: 'Runtime', value: false },
        ];
        this.dirLightCfg = {
            color: 0xFFFFFF,
            intensity: 1,
            position: { x: this.offset.x, y: this.offset.y, z: this.offset.z },
            size: 5,
            showHelper: true,
            helper: null,
            shadowCameraFov: 70,
            castShadow: false
        };
        this.dirLightProps = [
            { prop1: null, prop2: 'type', type: 'string', label: 'Type', value: iv_3d_light_1.Iv3dLightType.directional, readOnly: true },
            { prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
            { prop1: null, prop2: 'name', type: 'string', label: 'name', value: '' },
            { prop1: null, prop2: 'color', type: 'color', label: 'Color', value: '#FFFFFF' },
            { prop1: null, prop2: 'intensity', type: 'number', label: 'Intensity', value: 1, min: 0.00, max: 1.00, step: 0.05 },
            { prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.offset.y, step: 10 },
            { prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'size', type: 'number', label: 'Size', min: 1, max: 100, value: 5, step: 1 },
            { prop1: null, prop2: 'shadowCameraFov', type: 'number', label: 'Shadow Camera FOV', value: 70, min: 0, max: 1000, step: 10 },
            { prop1: null, prop2: 'castShadow', type: 'bool', label: 'Cast Shadow', value: false },
            { prop1: null, prop2: 'showHelper', type: 'bool', label: 'Show Helper', value: true },
            { prop1: null, prop2: 'showHelperRuntime', type: 'bool', label: 'Runtime', value: false },
        ];
        this.hemisphereLightCfg = {
            skyColor: 0xFFFFFF,
            groundColor: 0xFFFFFF,
            intensity: 1,
            helperSphereSize: 5,
            showHelper: true,
            helper: null
        };
        this.hemisphereLightProps = [
            { prop1: null, prop2: 'type', type: 'string', label: 'Type', value: iv_3d_light_1.Iv3dLightType.hemisphere, readOnly: true },
            { prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
            { prop1: null, prop2: 'name', type: 'string', label: 'name', value: '' },
            { prop1: null, prop2: 'skyColor', type: 'color', label: 'Sky Color', value: '#FFFFFF' },
            { prop1: null, prop2: 'groundColor', type: 'color', label: 'Ground Color', value: '#FFFFFF' },
            { prop1: null, prop2: 'intensity', type: 'number', label: 'Intensity', value: 1, min: 0.00, max: 1.00, step: 0.05 },
            { prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.offset.y, step: 10 },
            { prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'helperSphereSize', type: 'number', label: 'Helper Size', min: 1, max: 100, value: 5, step: 1 },
            { prop1: null, prop2: 'showHelper', type: 'bool', label: 'Show Helper', value: true },
            { prop1: null, prop2: 'showHelperRuntime', type: 'bool', label: 'Runtime', value: false },
        ];
        this.spotLightCfg = {
            color: 0xFFFFFF,
            intensity: 1,
            position: { x: 0, y: this.offset.y, z: 0 },
            distance: this.radius * 2,
            helperSphereSize: 5,
            showHelper: true,
            showHelperRuntime: false,
            helper: null,
            angle: Math.PI / 2,
            penumbra: 0,
            decay: 0
        };
        this.spotLightProps = [
            { prop1: null, prop2: 'type', type: 'string', label: 'Type', value: iv_3d_light_1.Iv3dLightType.spot, readOnly: true },
            { prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
            { prop1: null, prop2: 'name', type: 'string', label: 'name', value: '' },
            { prop1: null, prop2: 'color', type: 'color', label: 'Color', value: '#FFFFFF' },
            { prop1: null, prop2: 'intensity', type: 'number', label: 'Intensity', value: 1, min: 0.00, max: 1.00, step: 0.05 },
            { prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.offset.y, step: 10 },
            { prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
            { prop1: null, prop2: 'distance', type: 'number', label: 'Distance', min: -1000, max: 1000, value: this.radius * 2, step: 10 },
            { prop1: null, prop2: 'penumbra', type: 'number', label: 'Penumbra', min: 0.00, max: 1.00, value: 0, step: 0.01 },
            { prop1: null, prop2: 'decay', type: 'number', label: 'Decay', min: 1.00, max: 2.00, value: 1, step: 0.01 },
            { prop1: null, prop2: 'helperSphereSize', type: 'number', label: 'Helper Size', min: 1, max: 100, value: 5, step: 1 },
            { prop1: null, prop2: 'showHelper', type: 'bool', label: 'Show Helper', value: true },
            { prop1: null, prop2: 'showHelperRuntime', type: 'bool', label: 'Runtime', value: false },
        ];
        this.cameraCfg = {
            fov: 50, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 10000,
            position: { x: 200, y: 200, z: 200 }
        };
        this.cameraProps = [
            { prop1: null, prop2: 'fov', type: 'number', label: 'FOV', value: this.cameraCfg.fov, min: 1, max: 1000, step: 10 },
            { prop1: null, prop2: 'aspect', type: 'number', label: 'Aspect', value: this.cameraCfg.aspect, min: 0, max: 100 },
            { prop1: null, prop2: 'near', type: 'number', label: 'Near', value: this.cameraCfg.near, min: 0.00, max: 100.00, step: 0.1 },
            { prop1: null, prop2: 'far', type: 'number', label: 'Far', value: this.cameraCfg.far, min: 0, max: 10000 },
            { prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: this.cameraCfg.position.x, step: 10 },
            { prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.cameraCfg.position.y, step: 10 },
            { prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: this.cameraCfg.position.z, step: 10 },
        ];
        this.cssCfg = {
            position: 'absolute', left: '', top: '', width: '', height: '', opacity: '1', 'background-color': ''
        };
        this.dataSourceProps = [
            { prop1: null, prop2: 'title', type: 'string', label: 'Title', value: '' },
            { prop1: null, prop2: 'url', type: 'string', label: 'Url', value: '' },
            { prop1: null, prop2: 'contentPanel', type: 'string', label: 'Content panel', value: '' },
            { prop1: null, prop2: 'type', type: 'string', label: 'Type', value: iv_3d_object_1.Iv3dObjectType.cube, values: this.objectTypes },
            { prop1: null, prop2: 'textBackgroundColor', type: 'color', label: 'Text background color', value: '#FFF' },
            { prop1: null, prop2: 'textColor', type: 'color', label: 'Text color', value: '#000' },
            { prop1: null, prop2: 'transparentBackground', type: 'boolean', label: 'Transparent background', value: false },
            { prop1: null, prop2: 'valueFormat', type: 'string', label: 'Format', value: '', values: this.valueFormats },
            { prop1: null, prop2: 'page', type: 'number', label: 'Page', value: 1 },
            { prop1: null, prop2: 'pageSize', type: 'number', label: 'Page size', value: 50 },
            { prop1: 'css', prop2: 'position', type: 'string', label: 'Position', value: this.cssCfg.position },
            { prop1: 'css', prop2: 'left', type: 'string', label: 'Left', value: this.cssCfg.left },
            { prop1: 'css', prop2: 'top', type: 'string', label: 'Top', value: this.cssCfg.top },
            { prop1: 'css', prop2: 'width', type: 'string', label: 'Width', value: this.cssCfg.width },
            { prop1: 'css', prop2: 'height', type: 'string', label: 'Height', value: this.cssCfg.height },
            { prop1: 'css', prop2: 'opacity', type: 'string', label: 'Opacity', value: this.cssCfg.opacity },
            { prop1: 'css', prop2: 'background-color', type: 'string', label: 'Background color', value: this.cssCfg['background-color'] },
            { prop1: null, prop2: 'drilldownPatternUrl', type: 'string', label: 'Drilldown Pattern Url', value: '' },
            { prop1: 'urls', prop2: 'title0', type: 'string', label: 'Title 0', value: '' },
            { prop1: 'urls', prop2: 'url0', type: 'string', label: 'Url 0', value: '' },
            { prop1: 'urls', prop2: 'type0', type: 'string', label: 'Type 0', value: iv_3d_object_1.Iv3dObjectType.cube, values: this.objectTypes },
            { prop1: 'urls', prop2: 'title1', type: 'string', label: 'Title 1', value: '' },
            { prop1: 'urls', prop2: 'url1', type: 'string', label: 'Url 1', value: '' },
            { prop1: 'urls', prop2: 'type1', type: 'string', label: 'Type 1', value: iv_3d_object_1.Iv3dObjectType.cube, values: this.objectTypes },
            { prop1: 'urls', prop2: 'title2', type: 'string', label: 'Title 2', value: '' },
            { prop1: 'urls', prop2: 'url2', type: 'string', label: 'Url 2', value: '' },
            { prop1: 'urls', prop2: 'type2', type: 'string', label: 'Type 2', value: iv_3d_object_1.Iv3dObjectType.cube, values: this.objectTypes },
        ];
        this.sceneCfg = {
            useFog: false, fogColor: 0xffffff, fogMistDensity: 0.015,
            showAxis: true, showAxisRuntime: true, axisSize: 1000, useAxisArrows: true, axisArrowHeadLength: 100,
            showGrid: true, showGridRuntime: true, gridSize: 2000, gridDivisions: 100, gridColorCenterLine: 0xFFFFFF, gridColor: 0x808080, backgroundColor: this.cssBackgroundColor,
            useStereoEffect: false, useStereoEffectRuntime: false,
            useAnaglyphEffect: false, useAnaglyphEffectRuntime: false,
            useAsciiEffect: false, useAsciiEffectRuntime: false,
            noSleep: false
        };
        this.sceneProps = [
            { prop1: 'scene', prop2: 'useFog', type: 'bool', label: 'Use Fog', value: this.sceneCfg.useFog },
            { prop1: 'scene', prop2: 'fogColor', type: 'color', label: 'Fog Color', value: '#FFFFFF' },
            { prop1: 'scene', prop2: 'fogMistDensity', type: 'number', label: 'Fog Mist Density', value: this.sceneCfg.fogMistDensity, min: 0, max: 1, step: 0.001 },
            { prop1: 'axis', prop2: 'showAxis', type: 'bool', label: 'Show Axis', value: this.sceneCfg.showAxis },
            { prop1: 'axis', prop2: 'showAxisRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.showAxisRuntime },
            { prop1: 'axis', prop2: 'axisSize', type: 'number', label: 'Axis Size', value: this.sceneCfg.axisSize, min: 1, max: 1000, step: 10 },
            { prop1: 'axis', prop2: 'useAxisArrows', type: 'bool', label: 'Axis Arrows', value: this.sceneCfg.useAxisArrows },
            { prop1: 'axis', prop2: 'axisArrowHeadLength', type: 'number', label: 'Axis Arrow Head Length', value: this.sceneCfg.axisArrowHeadLength, min: 1, max: 100, step: 1 },
            { prop1: 'grid', prop2: 'showGrid', type: 'bool', label: 'Show Grid', value: this.sceneCfg.showGrid },
            { prop1: 'grid', prop2: 'showGridRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.showGridRuntime },
            { prop1: 'grid', prop2: 'gridSize', type: 'number', label: 'Grid Size', value: this.sceneCfg.gridSize, min: 1, max: 1000, step: 10 },
            { prop1: 'grid', prop2: 'gridDivisions', type: 'number', label: 'Grid Divisions', value: this.sceneCfg.gridDivisions, min: 1, max: 100, step: 1 },
            { prop1: 'grid', prop2: 'gridColor', type: 'color', label: 'Grid Color', value: '#808080' },
            { prop1: 'grid', prop2: 'gridColorCenterLine', type: 'color', label: 'Grid Color Center Line', value: '#FFFFFF' },
            { prop1: 'scene', prop2: 'backgroundColor', type: 'cssColor', label: 'Background Color', value: this.cssBackgroundColor },
            { prop1: 'renderer', prop2: 'useStereoEffect', type: 'bool', label: 'Stereo Effect', value: this.sceneCfg.useStereoEffect },
            { prop1: 'renderer', prop2: 'useStereoEffectRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.useStereoEffectRuntime },
            { prop1: 'renderer', prop2: 'useAnaglyphEffect', type: 'bool', label: 'Anaglyph Effect', value: this.sceneCfg.useAnaglyphEffect },
            { prop1: 'renderer', prop2: 'useAnaglyphEffectRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.useAnaglyphEffectRuntime },
            { prop1: 'renderer', prop2: 'useAsciiEffect', type: 'bool', label: 'Ascii Effect', value: this.sceneCfg.useAsciiEffect },
            { prop1: 'renderer', prop2: 'useAsciiEffectRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.useAsciiEffectRuntime },
            { prop1: 'scene', prop2: 'noSleep', type: 'bool', label: 'No Sleep', value: this.sceneCfg.noSleep },
        ];
        this.audioCfg = {
            fileName: '', autoPlay: false, controls: true, loop: true, position: 'absolute', left: '10px', top: '10px'
        };
        this.audioProps = [
            { prop1: null, prop2: 'fileName', type: 'string', label: 'Audio File Name', value: this.audioCfg.fileName },
            { prop1: null, prop2: 'select', type: 'function', label: 'Select', value: '' },
            { prop1: null, prop2: 'play', type: 'function', label: 'Play', value: '' },
            { prop1: null, prop2: 'pause', type: 'function', label: 'Pause', value: '' },
            { prop1: null, prop2: 'autoPlay', type: 'bool', label: 'Auto Play', value: this.audioCfg.autoPlay },
            { prop1: null, prop2: 'loop', type: 'bool', label: 'Loop', value: this.audioCfg.loop },
            { prop1: null, prop2: 'controls', type: 'bool', label: 'Controls', value: this.audioCfg.controls },
            { prop1: null, prop2: 'position', type: 'string', label: 'Position', value: this.audioCfg.position, values: ['static', 'relative', 'absolute'] },
            { prop1: null, prop2: 'left', type: 'string', label: 'Left', value: this.audioCfg.left },
            { prop1: null, prop2: 'top', type: 'string', label: 'Top', value: this.audioCfg.top },
        ];
        this.cssProps = [
            { prop1: null, prop2: 'position', type: 'string', label: 'Position', value: this.cssCfg.position },
            { prop1: null, prop2: 'left', type: 'string', label: 'Left', value: this.cssCfg.left },
            { prop1: null, prop2: 'top', type: 'string', label: 'Top', value: this.cssCfg.top },
            { prop1: null, prop2: 'width', type: 'string', label: 'Width', value: this.cssCfg.width },
            { prop1: null, prop2: 'height', type: 'string', label: 'Height', value: this.cssCfg.height },
            { prop1: null, prop2: 'opacity', type: 'string', label: 'Opacity', value: this.cssCfg.opacity },
            { prop1: null, prop2: 'background-color', type: 'string', label: 'Background color', value: this.cssCfg['background-color'] },
        ];
        this.errorSvc.useAlertForErrors = this.environment.useAlertForErrors;
        for (var p in iv_3d_object_1.Iv3dObjectType) {
            this.objectTypes.push(p);
        }
        for (var p in iv_3d_data_source_1.Iv3dDataSourceValueFormat) {
            this.valueFormats.push(p);
        }
    }
    Iv3dObjectHandler.prototype.getProp = function (propName, props) {
        return props.find(function (item) { return item.prop2 === propName; });
    };
    Iv3dObjectHandler.prototype.getChild = function (uuid, container) {
        return container.children.find(function (item) { return item.uuid === uuid; });
    };
    Iv3dObjectHandler.prototype.getCfg = function (props) {
        var cfg = {};
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var p = props_1[_i];
            cfg[p.prop2] = p.value;
        }
        return cfg;
    };
    Iv3dObjectHandler.prototype.getGenCfg = function (config, props) {
        var c = this.getCfg(props);
        for (var p1 in config) {
            // if (typeof (config[p1]) === 'object' && config[p1].length > 0) {
            if (config[p1] && typeof (config[p1]) === 'object' && Object.keys(config[p1]).length > 0) {
                for (var p2 in config[p1]) {
                    if (!cfg.U.isEmpty(c[p2])) {
                        config[p1][p2] = c[p2];
                    }
                }
            }
            else {
                if (!cfg.U.isEmpty(c[p1])) {
                    config[p1] = c[p1];
                }
            }
        }
        return config;
    };
    Iv3dObjectHandler.prototype.getLineCfg = function (props) {
        var config = new cfg.LineCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getPlaneCfg = function (props) {
        var config = new cfg.PlaneCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getCircleCfg = function (props) {
        var config = new cfg.CircleCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getCubeCfg = function (props) {
        var config = new cfg.CubeCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getSphereCfg = function (props) {
        var config = new cfg.SphereCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getCylinderCfg = function (props) {
        var config = new cfg.CylinderCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getTorusCfg = function (props) {
        var config = new cfg.TorusCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getTorusKnotCfg = function (props) {
        var config = new cfg.TorusKnotCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getTextCfg = function (props) {
        var config = new cfg.TextCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getParticleCfg = function (props) {
        var config = new cfg.ParticleCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getPointLightCfg = function (props) {
        var config = new cfg.PointLightCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getDirLightCfg = function (props) {
        var config = new cfg.DirLightCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getHemishphereLightCfg = function (props) {
        var config = new cfg.HempisphereLightCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getSpotLightCfg = function (props) {
        var config = new cfg.SpotLightCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getCameraCfg = function (props) {
        var config = new cfg.CameraCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getSceneCfg = function (props) {
        var config = new cfg.SceneRuntimeCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getAudioCfg = function (props) {
        var config = Object.assign({}, this.audioCfg);
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getCssCfg = function (props) {
        var config = Object.assign({}, this.cssCfg);
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.getTextureCfg = function (props) {
        var config = new cfg.TextureCfg();
        return this.getGenCfg(config, props);
    };
    Iv3dObjectHandler.prototype.setCfgProps = function (config, props, excludeProps) {
        for (var p1 in config) {
            if (excludeProps && excludeProps.indexOf(p1) >= 0)
                continue;
            // if (typeof (config[p1]) === 'object' && config[p1].length > 0) {
            if (config[p1] && typeof (config[p1]) === 'object' && Object.keys(config[p1]).length > 0) {
                for (var p2 in config[p1]) {
                    if (!cfg.U.isEmpty(config[p1][p2])) {
                        var prop = this.getProp(p2, props);
                        if (prop) {
                            prop.value = config[p1][p2];
                        }
                    }
                }
            }
            else {
                if (!cfg.U.isEmpty(config[p1])) {
                    var prop = this.getProp(p1, props);
                    if (prop) {
                        prop.value = config[p1];
                    }
                }
            }
        }
    };
    Iv3dObjectHandler.prototype.setLineCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setPlaneCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setCircleCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setCubeCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setSphereCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setCylinderCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setTorusCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setTorusKnotCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setTextCfgProps = function (config, props) {
        this.setCfgProps(config, props, ['textMesh', 'textMeshMirror', 'textMaterial', 'font', 'geometry']);
    };
    Iv3dObjectHandler.prototype.setParticleCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setPointLightCfgProps = function (config, props) {
        this.setCfgProps(config, props, ['helper']);
    };
    Iv3dObjectHandler.prototype.setDirLightCfgProps = function (config, props) {
        this.setCfgProps(config, props, ['helper']);
    };
    Iv3dObjectHandler.prototype.setHempisphereLightCfgProps = function (config, props) {
        this.setCfgProps(config, props, ['helper']);
    };
    Iv3dObjectHandler.prototype.setSpotLightCfgProps = function (config, props) {
        this.setCfgProps(config, props, ['helper']);
    };
    Iv3dObjectHandler.prototype.setCameraCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setSceneCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setAudioCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setTextureCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.setCssCfgProps = function (config, props) {
        this.setCfgProps(config, props);
    };
    Iv3dObjectHandler.prototype.loadObject = function (obj, w, mainGroup, demo, isPublic, key, threeObjCallback) {
        var _this = this;
        var threeObj;
        var geom, mat;
        switch (obj.meshType) {
            case iv_3d_object_1.Iv3dObjectType.line:
                geom = this.genGeom(iv_3d_object_1.Iv3dGeometryType.line, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                /*
                mat = this.genMat(obj.materialProps, w);
                threeObj = w.addMesh(geom, mat, mainGroup);
                this.setThreeObjProps(obj, threeObj);
                */
                break;
            case iv_3d_object_1.Iv3dObjectType.plane:
                geom = this.genGeom(iv_3d_object_1.Iv3dGeometryType.plane, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case iv_3d_object_1.Iv3dObjectType.circle:
                geom = this.genGeom(iv_3d_object_1.Iv3dGeometryType.circle, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case iv_3d_object_1.Iv3dObjectType.cube:
                geom = this.genGeom(iv_3d_object_1.Iv3dGeometryType.box, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case iv_3d_object_1.Iv3dObjectType.sphere:
                geom = this.genGeom(iv_3d_object_1.Iv3dGeometryType.sphere, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case iv_3d_object_1.Iv3dObjectType.cylinder:
                geom = this.genGeom(iv_3d_object_1.Iv3dGeometryType.cylinder, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case iv_3d_object_1.Iv3dObjectType.torus:
                geom = this.genGeom(iv_3d_object_1.Iv3dGeometryType.torus, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case iv_3d_object_1.Iv3dObjectType.torusKnot:
                geom = this.genGeom(iv_3d_object_1.Iv3dGeometryType.torusKnot, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case iv_3d_object_1.Iv3dObjectType.text:
                var fontName = 'helvetiker';
                var weight = 'regular';
                var fontNameProp = obj.geometryProps.find(function (p) { return p.prop2 === 'fontName'; });
                if (fontNameProp) {
                    fontName = fontNameProp.value;
                }
                var weightProp = obj.geometryProps.find(function (p) { return p.prop2 === 'weight'; });
                if (weightProp) {
                    weight = weightProp.value;
                }
                var loader = new THREE.FontLoader();
                loader.load(this.environment.assetsRelUrl + "libs/threejs/fonts/" + fontName + "_" + weight + ".typeface.json", function (response) {
                    var props = obj.geometryProps;
                    var fontProp = props.find(function (p) { return p.prop2 === 'font'; });
                    fontProp.value = response;
                    // props.push(<Iv3dObjectProperty>{ prop1: null, prop2: 'font', type: 'object', label: 'Font data', value: response, hidden: true });
                    geom = _this.genGeom(iv_3d_object_1.Iv3dGeometryType.text, props, w);
                    _this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                });
                break;
            case iv_3d_object_1.Iv3dObjectType.particles:
                geom = this.genGeom(iv_3d_object_1.Iv3dGeometryType.particles, obj.geometryProps, w);
                this.genParticlesWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            default:
                break;
        }
    };
    Iv3dObjectHandler.prototype.createShaderMaterial = function (shader, w, demo, isPublic, key) {
        var uniforms = {};
        for (var _i = 0, _a = shader.uniforms.filter(function (item) { return item.type !== iv_3d_shader_1.Iv3dUniformType.t; }); _i < _a.length; _i++) {
            var u = _a[_i];
            uniforms[u.name] = { type: u.type, value: u.value };
        }
        if (shader.timeExpr && shader.timeExpr.expression) {
            shader.timeExpr.fn = this.oParser.parse(shader.timeExpr.expression);
        }
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: shader.vertexProgram,
            fragmentShader: shader.fragmentProgram
        });
        if (uniforms['resolution']) {
            if (!uniforms['resolution'].value) {
                uniforms['resolution'].value = new THREE.Vector2();
            }
            uniforms['resolution'].value.x = window.innerWidth;
            uniforms['resolution'].value.y = window.innerHeight;
        }
        for (var _b = 0, _c = shader.uniforms.filter(function (item) { return item.type === iv_3d_shader_1.Iv3dUniformType.t; }); _b < _c.length; _b++) {
            var u = _c[_b];
            var imgFile = u.value;
            var texture = this.loadTexture(imgFile, w, demo, isPublic, key, null);
            uniforms[u.name] = { type: u.type, value: texture };
        }
        for (var prop in uniforms) {
            switch (uniforms[prop].type) {
                case iv_3d_shader_1.Iv3dUniformType.v3:
                    uniforms[prop].value = new THREE.Vector3(0, 0, 0);
                    break;
                case iv_3d_shader_1.Iv3dUniformType.t:
                    uniforms[prop].value.wrapS = uniforms[prop].value.wrapT = THREE.RepeatWrapping;
                    break;
                default:
                    break;
            }
        }
        return shaderMaterial;
    };
    Iv3dObjectHandler.prototype.attachShader = function (shader, obj, mesh, w, demo, isPublic, key) {
        if (!mesh)
            return;
        if (!shader)
            return;
        var shaderMaterial = this.createShaderMaterial(shader, w, demo, isPublic, key);
        mesh.material = shaderMaterial;
    };
    Iv3dObjectHandler.prototype.loadLight = function (light, w) {
        var config;
        var lightHelper;
        switch (light.type) {
            case iv_3d_light_1.Iv3dLightType.point:
                config = this.getPointLightCfg(light.lightProps);
                lightHelper = w.genPointLight(config);
                break;
            case iv_3d_light_1.Iv3dLightType.directional:
                config = this.getDirLightCfg(light.lightProps);
                lightHelper = w.genDirLight(config);
                break;
            case iv_3d_light_1.Iv3dLightType.hemisphere:
                config = this.getHemishphereLightCfg(light.lightProps);
                lightHelper = w.genHemisphereLight(config);
                break;
            case iv_3d_light_1.Iv3dLightType.spot:
                config = this.getSpotLightCfg(light.lightProps);
                lightHelper = w.genSpotLight(config);
                break;
            default:
                break;
        }
        this.setThreeLightProps(light, lightHelper);
        w.addLight(lightHelper);
    };
    Iv3dObjectHandler.prototype.genGeom = function (type, props, w) {
        var geom;
        switch (type) {
            case iv_3d_object_1.Iv3dGeometryType.line:
                geom = w.genLineGeom(this.getLineCfg(props));
                break;
            case iv_3d_object_1.Iv3dGeometryType.plane:
                geom = w.genPlaneGeom(this.getPlaneCfg(props));
                break;
            case iv_3d_object_1.Iv3dGeometryType.circle:
                geom = w.genCircleGeom(this.getCircleCfg(props));
                break;
            case iv_3d_object_1.Iv3dGeometryType.box:
                geom = w.genCubeGeom(this.getCubeCfg(props));
                break;
            case iv_3d_object_1.Iv3dGeometryType.sphere:
                geom = w.genSphereGeom(this.getSphereCfg(props));
                break;
            case iv_3d_object_1.Iv3dGeometryType.cylinder:
                geom = w.genCylinderGeom(this.getCylinderCfg(props));
                break;
            case iv_3d_object_1.Iv3dGeometryType.torus:
                geom = w.genTorusGeom(this.getTorusCfg(props));
                break;
            case iv_3d_object_1.Iv3dGeometryType.torusKnot:
                geom = w.genTorusKnotGeom(this.getTorusKnotCfg(props));
                break;
            case iv_3d_object_1.Iv3dGeometryType.text:
                geom = w.genTextGeom(this.getTextCfg(props));
                break;
            case iv_3d_object_1.Iv3dGeometryType.particles:
                geom = w.genParticleGeom(this.getParticleCfg(props));
                break;
            default:
                geom = new THREE.Geometry();
                break;
        }
        //for (let prop of props) {
        //    if (!cfg.U.isEmpty(prop.value)) {
        //        geom[prop.prop2] = prop.value;
        //    }
        //}
        return geom;
    };
    Iv3dObjectHandler.prototype.genMat = function (props, w, texture) {
        var _this = this;
        var typeProp = props.find(function (item) { return item.prop2 === 'type'; });
        if (!typeProp) {
            typeProp = {
                prop1: 'material', prop2: 'type', value: 'MeshBasicMaterial'
            };
        }
        var type = typeProp.value;
        var mat;
        switch (type) {
            case iv_3d_object_1.Iv3dMaterialType.lineBasic:
                mat = w.genLineBasicMat();
                break;
            case iv_3d_object_1.Iv3dMaterialType.meshBasic:
                mat = w.genMeshBasicMat();
                break;
            case iv_3d_object_1.Iv3dMaterialType.meshLambert:
                mat = w.genMeshLambertMat();
                break;
            case iv_3d_object_1.Iv3dMaterialType.meshPhong:
                mat = w.genMeshPhongMat();
                break;
            case iv_3d_object_1.Iv3dMaterialType.points:
                mat = w.genParticleMat();
                break;
            case iv_3d_object_1.Iv3dMaterialType.multi:
                // for now, assume multi material is only used with 3D text
                mat = w.genTextMat();
                break;
            default:
                mat = w.genMeshBasicMat();
                break;
        }
        var otherProps = props.filter(function (item) { return ['type', 'function'].indexOf(item.prop2) === -1; });
        var hasTexture = false;
        otherProps.forEach(function (otherProp) {
            try {
                switch (otherProp.prop2) {
                    case 'texture':
                        hasTexture = true;
                        break;
                    default:
                        if (otherProp.type === 'color') {
                            // mat[otherProp.prop2] = new THREE.Color(otherProp.value);
                            // mat[otherProp.prop2] = this.w.getColorFromHex(otherProp.value);
                            // mat[otherProp.prop2] = this.w.getColorFromRgb(otherProp.value);
                            mat[otherProp.prop2] = wgl_util_1.WglUtil.getThreeColor(otherProp.value);
                        }
                        else {
                            mat[otherProp.prop2] = otherProp.value;
                        }
                        break;
                }
            }
            catch (e) {
                _this.errorSvc.log("Iv3dObjectHandler.genMat property set error: " + e);
            }
        });
        if (hasTexture) {
            if (texture) {
                mat.map = texture;
                mat.map.needsUpdate = true;
            }
            else {
                mat.map = null;
            }
        }
        return mat;
    };
    Iv3dObjectHandler.prototype.genLight = function (type, props, w) {
        var lightHelper;
        switch (type) {
            case iv_3d_light_1.Iv3dLightType.point:
                lightHelper = w.genPointLight(this.getPointLightCfg(props));
                break;
            case iv_3d_light_1.Iv3dLightType.directional:
                lightHelper = w.genDirLight(this.getDirLightCfg(props));
                break;
            case iv_3d_light_1.Iv3dLightType.hemisphere:
                lightHelper = w.genHemisphereLight(this.getHemishphereLightCfg(props));
                break;
            case iv_3d_light_1.Iv3dLightType.spot:
                lightHelper = w.genSpotLight(this.getSpotLightCfg(props));
                break;
            default:
                lightHelper = new THREE.Light();
                break;
        }
        /*
        if (!lightHelper && !lightHelper.light) return;
        for (let prop of props) {
            if (!cfg.U.isEmpty(prop.value)) {
                lightHelper.light[prop.prop2] = prop.value;
            }
        }
        */
        return lightHelper;
    };
    Iv3dObjectHandler.prototype.genGeomProps = function (geomType, cfg) {
        var props = [];
        switch (geomType) {
            case iv_3d_object_1.Iv3dGeometryType.line:
                //props = JSON.parse(JSON.stringify(this.lineGeomProps));
                props = this.lineGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setLineCfgProps(cfg, props);
                break;
            case iv_3d_object_1.Iv3dGeometryType.circle:
                //props = this.circleGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.circleGeomProps));
                props = this.circleGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setCircleCfgProps(cfg, props);
                break;
            case iv_3d_object_1.Iv3dGeometryType.plane:
                //props = this.planeGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.planeGeomProps));
                props = this.planeGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setPlaneCfgProps(cfg, props);
                break;
            case iv_3d_object_1.Iv3dGeometryType.box:
                //props = this.cubeGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.cubeGeomProps));
                props = this.cubeGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setCubeCfgProps(cfg, props);
                break;
            case iv_3d_object_1.Iv3dGeometryType.sphere:
                //props = this.sphereGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.sphereGeomProps));
                props = this.sphereGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setSphereCfgProps(cfg, props);
                break;
            case iv_3d_object_1.Iv3dGeometryType.cylinder:
                //props = this.cylinderGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.cylinderGeomProps));
                props = this.cylinderGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setCylinderCfgProps(cfg, props);
                break;
            case iv_3d_object_1.Iv3dGeometryType.torus:
                //props = this.torusGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.torusGeomProps));
                props = this.torusGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setTorusCfgProps(cfg, props);
                break;
            case iv_3d_object_1.Iv3dGeometryType.torusKnot:
                //props = this.torusKnotGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.torusKnotGeomProps));
                props = this.torusKnotGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setTorusKnotCfgProps(cfg, props);
                break;
            case iv_3d_object_1.Iv3dGeometryType.text:
                //props = this.textGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.textGeomProps));
                props = this.textGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setTextCfgProps(cfg, props);
                break;
            case iv_3d_object_1.Iv3dGeometryType.particles:
                //props = this.particleGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.particleGeomProps));
                props = this.particleGeomProps.map(function (item) { return Object.assign({}, item); });
                this.setParticleCfgProps(cfg, props);
                break;
            default:
                break;
        }
        return props;
    };
    Iv3dObjectHandler.prototype.genMatProps = function (matType, mat, w) {
        //let props: Iv3dObjectProperty[] = this.materialProps.slice();
        //let props: Iv3dObjectProperty[] = JSON.parse(JSON.stringify(this.materialProps));
        var props = this.materialProps.map(function (item) { return Object.assign({}, item); });
        var _loop_1 = function(p) {
            var prop = props.find(function (item) { return item.prop2 === p; });
            if (prop) {
                switch (prop.type) {
                    case 'color':
                        var c = '#' + mat[p].getHex().toString(16);
                        prop.value = c; // w.hexToRgb(c);
                        break;
                    default:
                        prop.value = mat[p];
                        break;
                }
            }
        };
        for (var p in mat) {
            _loop_1(p);
        }
        return props;
    };
    Iv3dObjectHandler.prototype.genObjProps = function (threeObj) {
        //let props: Iv3dObjectProperty[] = this.objectProps.slice();
        //let props: Iv3dObjectProperty[] = JSON.parse(JSON.stringify(this.objectProps));
        var props = this.objectProps.map(function (item) { return Object.assign({}, item); });
        for (var _i = 0, props_2 = props; _i < props_2.length; _i++) {
            var prop = props_2[_i];
            if (threeObj[prop.prop1] && threeObj[prop.prop1][prop.prop2]) {
                prop.value = threeObj[prop.prop1][prop.prop2];
            }
        }
        return props;
    };
    Iv3dObjectHandler.prototype.genLightProps = function (lightType, cfg) {
        var props = [];
        switch (lightType) {
            case iv_3d_light_1.Iv3dLightType.point:
                //props = JSON.parse(JSON.stringify(this.pointLightProps));
                props = this.pointLightProps.map(function (item) { return Object.assign({}, item); });
                this.setPointLightCfgProps(cfg, props);
                break;
            case iv_3d_light_1.Iv3dLightType.directional:
                //props = JSON.parse(JSON.stringify(this.dirLightProps));
                props = this.dirLightProps.map(function (item) { return Object.assign({}, item); });
                this.setDirLightCfgProps(cfg, props);
                break;
            case iv_3d_light_1.Iv3dLightType.hemisphere:
                //props = JSON.parse(JSON.stringify(this.hemisphereLightProps));
                props = this.hemisphereLightProps.map(function (item) { return Object.assign({}, item); });
                this.setHempisphereLightCfgProps(cfg, props);
                break;
            case iv_3d_light_1.Iv3dLightType.spot:
                //props = JSON.parse(JSON.stringify(this.spotLightProps));
                props = this.spotLightProps.map(function (item) { return Object.assign({}, item); });
                this.setSpotLightCfgProps(cfg, props);
                break;
            default:
                break;
        }
        return props;
    };
    Iv3dObjectHandler.prototype.setIv3dObjectProps = function (obj, threeObj) {
        obj.uuid = threeObj.uuid;
        obj.name = threeObj.name;
        obj.objectProps = this.genObjProps(threeObj);
        threeObj.userData = obj;
    };
    Iv3dObjectHandler.prototype.setThreeObjProps = function (obj, threeObj) {
        for (var _i = 0, _a = obj.objectProps; _i < _a.length; _i++) {
            var prop = _a[_i];
            if (threeObj[prop.prop1] && !cfg.U.isEmpty(prop.value)) {
                threeObj[prop.prop1][prop.prop2] = prop.value;
            }
        }
        threeObj.userData = obj;
        threeObj.uuid = obj.uuid;
        threeObj.name = obj.name;
        threeObj.url = obj.url;
        threeObj.panels = obj.contentPanels;
    };
    Iv3dObjectHandler.prototype.setIv3dLightProps = function (obj, threeLightHelper) {
        obj.uuid = threeLightHelper.uuid;
        obj.name = threeLightHelper.name;
        // obj.lightProps = this.genLightProps(obj.type, threeLightObj);
        threeLightHelper.userData = obj;
    };
    Iv3dObjectHandler.prototype.setThreeLightProps = function (light, threeObj) {
        threeObj.userData = light;
        threeObj.uuid = light.uuid;
        threeObj.name = light.name;
    };
    Iv3dObjectHandler.prototype.loadObjectLoaderData = function (data, w, mainGroup) {
        if (mainGroup) {
            w.clear(mainGroup);
        }
        var loader = new THREE.ObjectLoader();
        mainGroup = loader.parse(data.mainGroup);
        // this.timelines = data.timelines;
        w.add(mainGroup);
        w.objects = w.objects.concat(mainGroup.object.children);
    };
    Iv3dObjectHandler.prototype.loadData = function (data, w, mainGroup, demo, isPublic, key) {
        var _this = this;
        if (data) {
            this.fixData(data);
            var cameraCfg = Object.assign({}, this.cameraCfg);
            if (data.cameraProps && data.cameraProps.length > 0) {
                cameraCfg = this.getCameraCfg(data.cameraProps);
            }
            w.setCamera(cameraCfg);
            var sceneCfg = Object.assign({}, this.sceneCfg);
            if (data.sceneProps && data.sceneProps.length > 0) {
                sceneCfg = this.getSceneCfg(data.sceneProps);
            }
            w.cfg.useStereoEffect = sceneCfg.useStereoEffect;
            if (w.cfg.useStereoEffect) {
                w.setStereoEffect();
            }
            w.cfg.useAnaglyphEffect = sceneCfg.useAnaglyphEffect;
            if (w.cfg.useAnaglyphEffect) {
                w.setAnaglyphEffect();
            }
            w.cfg.useAsciiEffect = sceneCfg.useAsciiEffect;
            if (w.cfg.useAsciiEffect) {
                w.setAsciiEffect();
            }
            w.setScene(sceneCfg);
            if (data.container && data.container.children) {
                var _loop_2 = function(obj) {
                    this_1.loadObject(obj, w, mainGroup, demo, isPublic, key, function (threeObj) {
                        var shaderIdProp = _this.getProp('shaderId', obj.materialProps);
                        if (shaderIdProp && !cfg.U.isEmptyString(shaderIdProp.value) && data.shaders) {
                            var shader = data.shaders.find(function (item) { return item.id === shaderIdProp.value; });
                            _this.attachShader(shader, obj, threeObj, w, demo, isPublic, key);
                        }
                    });
                };
                var this_1 = this;
                for (var _i = 0, _a = data.container.children; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    _loop_2(obj);
                }
            }
            if (data.lights) {
                for (var _b = 0, _c = data.lights; _b < _c.length; _b++) {
                    var light = _c[_b];
                    this.loadLight(light, w);
                }
            }
        }
        // this.timelines = data.timelines;
        w.add(mainGroup);
        w.objects = w.objects.concat(mainGroup.children);
    };
    Iv3dObjectHandler.prototype.loadNewData = function (data, w) {
        this.createContainer(data);
        //data.cameraProps = JSON.parse(JSON.stringify(this.cameraProps));
        data.cameraProps = this.cameraProps.map(function (item) { return Object.assign({}, item); });
        //data.sceneProps = JSON.parse(JSON.stringify(this.sceneProps));
        data.sceneProps = this.sceneProps.map(function (item) { return Object.assign({}, item); });
    };
    Iv3dObjectHandler.prototype.createContainer = function (data) {
        if (data) {
            data.container = new iv_3d_object_1.Iv3dObject();
            data.container.meshType = iv_3d_object_1.Iv3dObjectType.group;
            data.container.name = 'mainGroup';
            data.container.uuid = '';
            return data.container;
        }
        return null;
    };
    Iv3dObjectHandler.prototype.createMainGroup = function (data, w) {
        var mainGroup = null;
        if (data && data.container) {
            mainGroup = w.addGroup();
            mainGroup.uuid = data.container.uuid;
            mainGroup.name = data.container.name;
        }
        return mainGroup;
    };
    Iv3dObjectHandler.prototype.getFullFileName = function (fileName, demo, isPublic, key) {
        var userName = demo || isPublic ? user_service_1.PUBLIC_USER : this.userSvc.userName;
        var userKey = '';
        if (!demo)
            userKey = "/" + this.userSvc.userKey;
        if (isPublic)
            userKey = "/" + user_service_1.PUBLIC_DIR + "/" + key;
        var fullFileName = "" + this.environment.usersDataUrl + userName + userKey + "/" + fileName;
        return fullFileName;
    };
    Iv3dObjectHandler.prototype.loadTextureMat = function (imgFile, obj, w, demo, isPublic, key, handler) {
        var _this = this;
        var loader = new THREE.TextureLoader();
        loader.crossOrigin = 'use-credentials';
        var fullImgFile = this.getFullFileName(imgFile, demo, isPublic, key);
        loader.load(fullImgFile, function (texture) {
            // texture.minFilter = THREE.LinearFilter;
            var mat = _this.genMat(obj.materialProps, w, texture);
            if (handler) {
                handler(mat);
            }
        });
    };
    Iv3dObjectHandler.prototype.loadTexture = function (imgFile, w, demo, isPublic, key, handler) {
        var loader = new THREE.TextureLoader();
        loader.crossOrigin = 'use-credentials';
        var fullImgFile = this.getFullFileName(imgFile, demo, isPublic, key);
        return loader.load(fullImgFile, function (texture) {
            if (handler) {
                handler(texture);
            }
        });
    };
    Iv3dObjectHandler.prototype.createCanvasTexture = function (obj, geom, w, imgFile, demo, isPublic, key) {
        if (!obj || !geom)
            return;
        var textureCfg = this.getTextureCfg(obj.materialProps);
        geom.computeBoundingBox();
        var size = geom.boundingBox.getSize();
        textureCfg.canvas.width = size.x;
        textureCfg.canvas.height = size.y;
        var fullImgFile = this.getFullFileName(imgFile, demo, isPublic, key);
        var texture = w.createCanvasTexture(fullImgFile, textureCfg);
        return texture;
    };
    Iv3dObjectHandler.prototype.genObjectWithMat = function (obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback) {
        var _this = this;
        var threeObj;
        var useCanvasProp = this.getProp('useCanvas', obj.materialProps);
        var textureProp = this.getProp('texture', obj.materialProps);
        if (useCanvasProp && useCanvasProp.value) {
            var textureCfg = this.getTextureCfg(obj.materialProps);
            var imgFile = textureProp && textureProp.value ? textureProp.value : '';
            var texture = this.createCanvasTexture(obj, geom, w, imgFile, demo, isPublic, key);
            var mat = void 0;
            mat = this.genMat(obj.materialProps, w, texture);
            threeObj = w.addMesh(geom, mat, mainGroup);
            this.setThreeObjProps(obj, threeObj);
            if (threeObjCallback) {
                threeObjCallback(threeObj);
            }
        }
        else {
            if (textureProp && !cfg.U.isEmptyString(textureProp.value)) {
                this.loadTextureMat(textureProp.value, obj, w, demo, isPublic, key, function (mat) {
                    threeObj = w.addMesh(geom, mat, mainGroup);
                    _this.setThreeObjProps(obj, threeObj);
                    if (threeObjCallback) {
                        threeObjCallback(threeObj);
                    }
                });
            }
            else {
                var mat = void 0;
                mat = this.genMat(obj.materialProps, w);
                threeObj = w.addMesh(geom, mat, mainGroup);
                this.setThreeObjProps(obj, threeObj);
                if (threeObjCallback) {
                    threeObjCallback(threeObj);
                }
            }
        }
    };
    Iv3dObjectHandler.prototype.genParticlesWithMat = function (obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback) {
        var _this = this;
        var threeObj;
        var textureProp = this.getProp('texture', obj.materialProps);
        if (textureProp && !cfg.U.isEmptyString(textureProp.value)) {
            this.loadTextureMat(textureProp.value, obj, w, demo, isPublic, key, function (mat) {
                threeObj = w.addParticleMesh(geom, mat, mainGroup);
                _this.setThreeObjProps(obj, threeObj);
                if (threeObjCallback) {
                    threeObjCallback(threeObj);
                }
            });
        }
        else {
            var mat = void 0;
            mat = this.genMat(obj.materialProps, w);
            threeObj = w.addParticleMesh(geom, mat, mainGroup);
            this.setThreeObjProps(obj, threeObj);
            if (threeObjCallback) {
                threeObjCallback(threeObj);
            }
        }
    };
    Iv3dObjectHandler.prototype.fixData = function (data) {
        var _this = this;
        if (!data)
            return;
        //if (!data.cameraProps || data.cameraProps.length === 0) data.cameraProps = JSON.parse(JSON.stringify(this.cameraProps));
        if (!data.cameraProps || data.cameraProps.length === 0)
            data.cameraProps = this.cameraProps.map(function (item) { return Object.assign({}, item); });
        //if (!data.sceneProps || data.sceneProps.length === 0) data.sceneProps = JSON.parse(JSON.stringify(this.sceneProps));
        // if (!data.sceneProps || data.sceneProps.length === 0) data.sceneProps = this.sceneProps.map(item => Object.assign({}, item));
        this.fixMissingProps(data.sceneProps, this.sceneProps);
        if (!data.lights)
            data.lights = [];
        if (!data.timelines)
            data.timelines = [];
        if (!data.additionalContents)
            data.additionalContents = [];
        if (!data.shaders)
            data.shaders = [];
        if (!data.plugins)
            data.plugins = [];
        if (!data.container) {
            this.createContainer(data);
        }
        data.container.children.forEach(function (o) {
            _this.fixMissingProps(o.materialProps, _this.materialProps);
            _this.fixMissingProps(o.objectProps, _this.objectProps);
            _this.fixObjMissingProperty(o, 'url', true);
            _this.fixObjMissingProperty(o, 'contentPanels', true);
            _this.fixObjMissingProperty(o, 'visible', true);
            _this.fixObjMissingProperty(o, 'visibleRuntime', true);
            _this.fixObjMissingProperty(o, 'sVisibleRuntime', true);
            _this.fixObjMissingProperty(o, 'script', true);
        });
        //if (!data.audioProps || data.audioProps.length === 0) data.audioProps = JSON.parse(JSON.stringify(this.audioProps));
        if (!data.audioProps || data.audioProps.length === 0)
            data.audioProps = this.audioProps.map(function (item) { return Object.assign({}, item); });
        data.timelines.forEach(function (timeline) {
            timeline.meshes.forEach(function (tmesh) {
                _this.fixTimelineMeshProperty(tmesh, 'visible', true);
                _this.fixTimelineMeshProperty(tmesh, 'runtimeTweenReverseMouseUp', false);
                _this.fixTimelineMeshProperty(tmesh, 'runtimeTweenReverseMouseDown', false);
            });
        });
        // if (!data.dataSourceProps || data.dataSourceProps.length === 0) data.dataSourceProps = this.dataSourceProps.map(item => Object.assign({}, item));
        this.fixMissingProps(data.dataSourceProps, this.dataSourceProps);
    };
    Iv3dObjectHandler.prototype.getAudio = function (data, demo, isPublic, key) {
        if (!data)
            return null;
        if (!data.audioProps || data.audioProps.length === 0)
            this.fixData(data);
        var audioFileProp = data.audioProps.find(function (item) { return item.prop2 === 'fileName'; });
        if (!audioFileProp || !audioFileProp.value)
            return null;
        var userName = demo ? user_service_1.PUBLIC_USER : this.userSvc.userName;
        var userKey = '';
        if (!demo)
            userKey = "/" + this.userSvc.userKey;
        if (isPublic)
            userKey = "/" + user_service_1.PUBLIC_DIR + "/" + key;
        var fullFileName = "" + this.environment.usersDataUrl + userName + userKey + "/" + audioFileProp.value;
        var audio = this.getAudioCfg(data.audioProps);
        audio.fullFileName = fullFileName;
        return audio;
    };
    Iv3dObjectHandler.prototype.getDataCss = function (data) {
        if (!data)
            return null;
        if (!data.sceneProps || data.sceneProps.length === 0)
            this.fixData(data);
        var backgroundColorProp = data.sceneProps.find(function (item) { return item.prop2 === 'backgroundColor'; });
        if (!backgroundColorProp || !backgroundColorProp.value)
            return null;
        var backgroundColor = backgroundColorProp.value;
        return this.getCss(backgroundColor);
    };
    Iv3dObjectHandler.prototype.getCss = function (backgroundColor) {
        var dataCss = new cfg.CssCfg();
        if (backgroundColor) {
            var color = void 0;
            if (backgroundColor.r || backgroundColor.g || backgroundColor.b)
                color = '#' + wgl_util_1.WglUtil.rgbToHex(backgroundColor.r, backgroundColor.g, backgroundColor.b);
            else
                color = backgroundColor;
            dataCss = { 'background-color': color };
        }
        return dataCss;
    };
    Iv3dObjectHandler.prototype.fixObjMissingProperty = function (o, propName, setObjectProp) {
        var prop = o.objectProps.find(function (p) { return p.prop2 === propName; });
        if (!prop) {
            var metaProp = this.objectProps.find(function (p) { return p.prop2 === propName; });
            if (metaProp) {
                prop = Object.assign({}, metaProp);
                o.objectProps.push(prop);
                if (setObjectProp) {
                    o[propName] = prop.value;
                }
            }
        }
    };
    Iv3dObjectHandler.prototype.fixMissingProps = function (props, standardProps) {
        if (!props && !standardProps)
            props = [];
        if (!standardProps)
            return props;
        if (!props || props.length === 0)
            props = standardProps.map(function (item) { return Object.assign({}, item); });
        var _loop_3 = function(standardProp) {
            var prop = props.find(function (item) { return item.prop2 === standardProp.prop2; });
            if (!prop) {
                props.push(Object.assign({}, standardProp));
            }
        };
        for (var _i = 0, standardProps_1 = standardProps; _i < standardProps_1.length; _i++) {
            var standardProp = standardProps_1[_i];
            _loop_3(standardProp);
        }
    };
    Iv3dObjectHandler.prototype.fixTimelineMeshProperty = function (tmesh, propName, defaultValue) {
        var prop = tmesh[propName];
        tmesh[propName] = defaultValue;
    };
    Iv3dObjectHandler.prototype.createDefaultObject = function (meshType, geomType) {
        var obj = new iv_3d_object_1.Iv3dObject();
        obj.cfgProps = [];
        obj.children = [];
        obj.contentPanels = null;
        obj.geometryProps = this.genGeomProps(geomType, null);
        obj.materialProps = this.materialProps;
        obj.meshType = meshType;
        obj.name = '';
        obj.objectProps = this.objectProps;
        obj.script = null; // <Iv3dScript>{};
        obj.sVisibleRuntime = 'true';
        obj.url = null;
        obj.uuid = k_gen_1.KGen.uuid();
        obj.visibleRuntime = true;
        return obj;
    };
    Iv3dObjectHandler.TweenEasings = {
        'Linear.None': TWEEN.Easing.Linear.None,
        'Quadratic.In': TWEEN.Easing.Quadratic.In,
        'Quadratic.Out': TWEEN.Easing.Quadratic.Out,
        'Quadratic.InOut': TWEEN.Easing.Quadratic.InOut,
        'Cubic.In': TWEEN.Easing.Cubic.In,
        'Cubic.Out': TWEEN.Easing.Cubic.Out,
        'Cubic.InOut': TWEEN.Easing.Cubic.InOut,
        'Quartic.In': TWEEN.Easing.Quartic.In,
        'Quartic.Out': TWEEN.Easing.Quartic.Out,
        'Quartic.InOut': TWEEN.Easing.Quartic.InOut,
        'Quintic.In': TWEEN.Easing.Quintic.In,
        'Quintic.Out': TWEEN.Easing.Quintic.Out,
        'Quintic.InOut': TWEEN.Easing.Quintic.InOut,
        'Sinusoidal.In': TWEEN.Easing.Sinusoidal.In,
        'Sinusoidal.Out': TWEEN.Easing.Sinusoidal.Out,
        'Sinusoidal.InOut': TWEEN.Easing.Sinusoidal.InOut,
        'Exponential.In': TWEEN.Easing.Exponential.In,
        'Exponential.Out': TWEEN.Easing.Exponential.Out,
        'Exponential.InOut': TWEEN.Easing.Exponential.InOut,
        'Circular.In': TWEEN.Easing.Circular.In,
        'Circular.Out': TWEEN.Easing.Circular.Out,
        'Circular.InOut': TWEEN.Easing.Circular.InOut,
        'Elastic.In': TWEEN.Easing.Elastic.In,
        'Elastic.Out': TWEEN.Easing.Elastic.Out,
        'Elastic.InOut': TWEEN.Easing.Elastic.InOut,
        'Back.In': TWEEN.Easing.Back.In,
        'Back.Out': TWEEN.Easing.Back.Out,
        'Back.InOut': TWEEN.Easing.Back.InOut,
        'Bounce.In': TWEEN.Easing.Bounce.In,
        'Bounce.Out': TWEEN.Easing.Bounce.Out,
        'Bounce.InOut': TWEEN.Easing.Bounce.InOut
    };
    return Iv3dObjectHandler;
}());
exports.Iv3dObjectHandler = Iv3dObjectHandler;
