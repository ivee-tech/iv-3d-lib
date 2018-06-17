import * as THREE from 'three';
import * as TWEEN from 'tween.js';
import * as parser from 'expr-eval';

import { Iv3dObjectProperty } from './models/iv-3d-object-property';
import { Iv3dObject, Iv3dGeometryType, Iv3dMaterialType, Iv3dObjectType } from './models/iv-3d-object';
import { DataModel } from './models/data-model';
import * as cfg from './wgl-util-cfgs';
import { KGen } from './models/k-gen';
import { WglUtil } from './wgl-util';
import { Iv3dLight, Iv3dLightType } from './models/iv-3d-light';
import { UserService, PUBLIC_USER, PUBLIC_DIR } from './services/user-service';
import { Iv3dShader, Iv3dUniform, Iv3dUniformType } from './models/iv-3d-shader';
import { Timeline, TimelineMesh } from './models/timeline';
import { Iv3dDataSourceValueFormat } from './models/iv-3d-data-source';
import { ErrorService } from './services/error-service';
import { Iv3dEnvironment } from './models/iv-3d-environment';

export class Iv3dObjectHandler {

    private offset: cfg.XYZ = new cfg.XYZ(100, 100, 100);
    private radius: number = 50;
    private cssBackgroundColor: string = '#1E1E1E';

    private oParser: parser.Parser = new parser.Parser();

    public fonts: string[] = [
        'helvetiker',
        'optimer',
        'gentilis',
        'droid/droid_serif'
    ];

    public fontWeights: string[] = ['regular', 'bold'];

    public materials: string[] = ['LineBasicMaterial', 'LineDashedMaterial', 'MeshBasicMaterial', 'MeshDepthMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial',
        'MeshStandardMaterial', 'MeshToonMaterial', 'PointsMaterial', 'MultiMaterial'];
    // , 'MeshNormalMaterial', 'RawShaderMaterial', 'MeshPhysicalMaterial', 'ShaderMaterial', 'ShadowMaterial', 'SpriteMaterial'];
    // 'Material', 'MultiMaterial'

    public objectTypes: string[] = [];

    public valueFormats: string[] = [];

    public lineCfg: cfg.LineCfg = <cfg.LineCfg>{
        start: { x: 0, y: 0, z: 0 }, end: { x: this.offset.x / 3, y: this.offset.y / 3, z: this.offset.z / 3 }, color: Math.random() * 0xFFFFFF
    }
    public lineGeomProps: Iv3dObjectProperty[] = [
    ];

    public cubeCfg: cfg.CubeCfg = <cfg.CubeCfg>{
        width: this.offset.x, height: this.offset.y, depth: this.offset.z, color: Math.random() * 0xFF0000, wireframe: false, position: { x: 0, y: 0, z: 0 },
        widthSegments: 1, heightSegments: 1, depthSegments: 1,
        castShadow: true, rotation: { x: 0, y: 0, z: 0 }, rotationSpeed: 0.5
    }
    public cubeGeomProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: Iv3dGeometryType.box, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'width', type: 'number', label: 'Width', min: 0, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'height', type: 'number', label: 'Height', min: 0, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'depth', type: 'number', label: 'Depth', min: 0, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'widthSegments', type: 'number', label: 'Width Segments', min: 1, max: 100, value: 1, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'heightSegments', type: 'number', label: 'Height Segments', min: 1, max: 100, value: 1, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'depthSegments', type: 'number', label: 'Depth Segments', min: 1, max: 100, value: 1, step: 10 },
    ];
    //public circleGeomCfg: any = {
    //    radius: 0,
    //    segments: 0,
    //    thetaStart: 0,
    //    thetaLength: 0
    //};

    public circleCfg: cfg.CircleCfg = <cfg.CircleCfg>{
        radius: this.radius, segments: 36, thetaStart: 0, thetaLength: 2 * Math.PI, color: Math.random() * 0xFFFFFF, wireframe: false, position: { x: 0, y: 0, z: 0 },
        castShadow: true, rotation: { x: 0, y: 0, z: 0 }
    }
    public circleGeomProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: Iv3dGeometryType.circle, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'radius', type: 'number', label: 'Radius', min: -1000, max: 1000, value: 50, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'segments', type: 'number', label: 'Segments', min: 1, max: 360, value: 8, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'thetaStart', type: 'number', label: 'Theta Start', min: 0, max: 2 * Math.PI, value: 0, step: 0.1, deg: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'thetaLength', type: 'number', label: 'Theta Start', min: 0, max: 2 * Math.PI, value: 2 * Math.PI, step: 0.1, deg: true },
    ];
    //public planeGeomCfg: any = {
    //    width: 0,
    //    height: 0,
    //    widthSegments: 0,
    //    heightSegments: 0
    //};

    public planeCfg: cfg.PlaneCfg = <cfg.PlaneCfg>{
        width: this.offset.x, height: 20, widthSegments: 1, heightSegments: 1, color: Math.random() * 0xFFFFFF, position: { x: 0, y: 0, z: 0 },
        receiveShadow: true
    }
    public planeGeomProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: Iv3dGeometryType.plane, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'width', type: 'number', label: 'Width', min: 0, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'height', type: 'number', label: 'Height', min: 0, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'widthSegments', type: 'number', label: 'Width Segments', min: 1, max: 100, value: 1, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'heightSegments', type: 'number', label: 'Height Segments', min: 1, max: 100, value: 1, step: 10 }
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

    public sphereCfg: cfg.SphereCfg = <cfg.SphereCfg>{
        radius: this.radius, widthSegments: 36, heightSegments: 36, phiStart: 0, phiLength: 2 * Math.PI, thetaStart: 0, thetaLength: 2 * Math.PI,
        color: Math.random() * 0xFF0000, wireframe: false, position: { x: 0, y: 0, z: 0 },
        castShadow: true, rotation: { x: 0, y: 0, z: 0 }
    }
    public sphereGeomProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: Iv3dGeometryType.sphere, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'radius', type: 'number', label: 'Radius', min: 1, max: 1000, value: this.sphereCfg.radius, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'widthSegments', type: 'number', label: 'Width Segments', min: 3, max: 360, value: this.sphereCfg.widthSegments, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'heightSegments', type: 'number', label: 'Height Segments', min: 2, max: 360, value: this.sphereCfg.heightSegments, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'phiStart', type: 'number', label: 'Phi Start', min: 0, max: 2 * Math.PI, value: this.sphereCfg.phiStart, step: 0.1, deg: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'phiLength', type: 'number', label: 'Phi Length', min: 0, max: 2 * Math.PI, value: this.sphereCfg.phiLength, step: 0.1, deg: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'thetaStart', type: 'number', label: 'Theta Start', min: 0, max: 2 * Math.PI, value: this.sphereCfg.thetaStart, step: 0.1, deg: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'thetaLength', type: 'number', label: 'Theta Length', min: 0, max: 2 * Math.PI, value: this.sphereCfg.thetaLength, step: 0.1, deg: true },
    ];

    public cylinderCfg: cfg.CylinderCfg = <cfg.CylinderCfg>{
        radiusTop: this.radius / 2, radiusBottom: this.radius / 2, height: this.offset.y, radiusSegments: 36, heightSegments: 1, openEnded: false, thetaStart: 0, thetaLength: 2 * Math.PI, color: Math.random() * 0xFFFFFF,
        position: { x: 0, y: 0, z: 0 }
    }
    public cylinderGeomProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: Iv3dGeometryType.cylinder, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'radiusTop', type: 'number', label: 'Radius Top', value: 50, min: 1, max: 1000, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'radiusBottom', type: 'number', label: 'Radius Bottom', value: 50, min: 1, max: 1000, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'height', type: 'number', label: 'Height', value: 100, min: 1, max: 1000, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'radiusSegments', type: 'number', label: 'Radius Segments', value: 36, min: 1, max: 360, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'heightSegments', type: 'number', label: 'Height Segments', value: 1, min: 1, max: 100, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'openEnded', type: 'bool', label: 'Open Ended', value: false },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'thetaStart', type: 'number', label: 'Theta Start', min: 0, max: 2 * Math.PI, value: 0, step: 0.1, deg: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'thetaLength', type: 'number', label: 'Theta Length', min: 0, max: 2 * Math.PI, value: 2 * Math.PI, step: 0.1, deg: true },
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

    public torusCfg: cfg.TorusCfg = <cfg.TorusCfg>{
        radius: this.radius, tube: this.radius / 2, radialSegments: 36, tubularSegments: 36, arc: 2 * Math.PI, color: Math.random() * 0xFF0000
    }
    public torusGeomProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: Iv3dGeometryType.torus, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'radius', type: 'number', label: 'Radius', min: 1, max: 1000, value: 100, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'tube', type: 'number', label: 'Tube', min: 1, max: 1000, value: 40, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'radialSegments', type: 'number', label: 'Radial Segments', min: 1, max: 1000, value: 8, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'tubularSegments', type: 'number', label: 'Tubular Segments', min: 1, max: 1000, value: 6, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'arc', type: 'number', label: 'Arc', min: 0, max: 2 * Math.PI, value: 2 * Math.PI, step: 0.1, deg: true },
    ];

    public torusKnotCfg: cfg.TorusKnotCfg = <cfg.TorusKnotCfg>{
        radius: this.radius, tube: this.radius / 4, radialSegments: 64, tubularSegments: 8, color: Math.random() * 0xFF0000
    }
    public torusKnotGeomProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: Iv3dGeometryType.torusKnot, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'radius', type: 'number', label: 'Radius', min: 1, max: 1000, value: 100, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'tube', type: 'number', label: 'Tube', min: 1, max: 1000, value: 40, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'radialSegments', type: 'number', label: 'Radial Segments', min: 1, max: 1000, value: 64, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'tubularSegments', type: 'number', label: 'Tubular Segments', min: 1, max: 1000, value: 8, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'p', type: 'number', label: 'p', min: 1, max: 100, value: 2, step: 1 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'q', type: 'number', label: 'q', min: 1, max: 100, value: 3, step: 1 },
    ];

    public textCfg: cfg.TextCfg = <cfg.TextCfg>{
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
    public textGeomProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: Iv3dGeometryType.text, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'text', type: 'string', label: 'Text', value: '' },
        //<Iv3dObjectProperty>{ prop1: null, prop2: 'font', type: 'object', label: 'Font', value: 'helvetiker', values: this.fonts },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'fontName', type: 'string', label: 'Font', value: 'helvetiker', values: this.fonts },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'font', type: 'object', label: 'Font data', value: null, hidden: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'hover', type: 'number', label: 'Hover', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'weight', type: 'string', label: 'Weight', value: 'regular', values: this.fontWeights },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'height', type: 'number', label: 'Height', min: 1, max: 1000, value: 50, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'size', type: 'number', label: 'Size', min: 1, max: 1000, value: 50, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'bevelEnabled', type: 'bool', label: 'Bevel Enabled', value: false },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'bevelThickness', type: 'number', label: 'Bevel Thickness', min: 0, max: 100, value: 0.5, step: 1 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'bevelSize', type: 'number', label: 'Bevel Size', min: 0, max: 100, value: 0.5, step: 1 }
    ];

    public particleCfg: cfg.ParticleCfg = <cfg.ParticleCfg>{
        count: 100,
        size: 1,
        range: 500,
        transparent: true,
        opacity: 0.5,
        vertexColors: [],
        sizeAttenuation: true,
        color: 0xFF0000
    }
    public particleGeomProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'enum', label: 'Type', value: Iv3dGeometryType.particles, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'count', type: 'number', label: 'Count', value: 100, min: 1, max: 10000, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'size', type: 'number', label: 'Size', value: 1, min: 1, max: 100, step: 1 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'range', type: 'number', label: 'Range', value: 500, min: 100, max: 10000, step: 10 },
    ];

    public objectProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'name', type: 'string', label: 'Name', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'url', type: 'string', label: 'Url', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'contentPanels', type: 'string', label: 'Content Panels', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'visible', type: 'boolean', label: 'Visible', value: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'visibleRuntime', type: 'boolean', label: 'Runtime', value: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'sVisibleRuntime', type: 'string', label: 'SRuntime', value: 'true', hidden: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'script', type: 'string', label: 'Script', value: '' },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'rotation', prop2: 'x', type: 'number', label: 'Rotation X', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'rotation', prop2: 'y', type: 'number', label: 'Rotation Y', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'rotation', prop2: 'z', type: 'number', label: 'Rotation Z', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'scale', prop2: 'x', type: 'number', label: 'Scale X', min: -10, max: 10, value: 1, step: 1 },
        <Iv3dObjectProperty>{ prop1: 'scale', prop2: 'y', type: 'number', label: 'Scale Y', min: -10, max: 10, value: 1, step: 1 },
        <Iv3dObjectProperty>{ prop1: 'scale', prop2: 'z', type: 'number', label: 'Scale Z', min: -10, max: 10, value: 1, step: 1 }
    ];
    public objectPropsDirectNames: string[] = ['name', 'url', 'contentPanels', 'visibleRuntime', 'sVisibleRuntime', 'script'];

    public materialProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'type', type: 'object', label: 'Type', value: '', values: this.materials },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'color', type: 'color', label: 'Color', value: '#FFFFFF' },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'specular', type: 'color', label: 'Specular', value: '#111111' },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'wireframe', type: 'boolean', label: 'Wireframe', value: false },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'transparent', type: 'boolean', label: 'Transparent', value: false },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'opacity', type: 'number', label: 'Opacity', min: 0.00, max: 1.00, value: 0.5, step: 0.05 },
        // <ObjectProperty>{ prop1: 'material', prop2: 'lights', type: 'boolean', label: 'Lights', value: false },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'texture', type: 'map', label: 'Map Texture', value: '' },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'select', type: 'map', label: 'Select', value: '' },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'refresh', type: 'map', label: 'Refresh', value: '' },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'shaderId', type: 'string', label: 'Shader Id', value: '' },
        <Iv3dObjectProperty>{ prop1: 'material', prop2: 'useCanvas', type: 'boolean', label: 'Use Canvas', value: false },
        <Iv3dObjectProperty>{ prop1: 'canvas', prop2: 'text', type: 'string', label: 'Canvas text', value: 'Text' },
        <Iv3dObjectProperty>{ prop1: 'canvas', prop2: 'font', type: 'string', label: 'Font', value: '12px Arial' },
        <Iv3dObjectProperty>{ prop1: 'canvas', prop2: 'textColor', type: 'color', label: 'Text color', value: '#000' },
        <Iv3dObjectProperty>{ prop1: 'canvas', prop2: 'backgroundColor', type: 'color', label: 'Background color', value: '#fff' },
        <Iv3dObjectProperty>{ prop1: 'canvas', prop2: 'textAlign', type: 'string', label: 'Text align', value: 'center', values: ['left', 'center', 'right', 'justify'] },
        <Iv3dObjectProperty>{ prop1: 'canvas', prop2: 'textBaseline', type: 'string', label: 'Text baseline', value: 'middle', values: ['top', 'middle', 'bottom'] },
        // <ObjectProperty>{ prop1: '', prop2: '', type: '', label: '', min: -0, max: 0, value: 0 },
    ];

    public pointLightCfg: cfg.PointLightCfg = <cfg.PointLightCfg>{
        color: 0xFFFFFF,
        intensity: 1,
        position: <cfg.XYZ>{ x: 0, y: this.offset.y, z: 0 },
        distance: this.radius * 2,
        helperSphereSize: 5,
        showHelper: true,
        showHelperRuntime: false,
        helper: null
    };
    public pointLightProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'string', label: 'Type', value: Iv3dLightType.point, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'name', type: 'string', label: 'name', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'color', type: 'color', label: 'Color', value: '#FFFFFF' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'intensity', type: 'number', label: 'Intensity', value: 1, min: 0.00, max: 1.00, step: 0.05 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.offset.y, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'distance', type: 'number', label: 'Distance', min: -1000, max: 1000, value: this.radius * 2, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'helperSphereSize', type: 'number', label: 'Helper Size', min: 1, max: 100, value: 5, step: 1 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'showHelper', type: 'bool', label: 'Show Helper', value: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'showHelperRuntime', type: 'bool', label: 'Runtime', value: false },
    ];

    public dirLightCfg: cfg.DirLightCfg = <cfg.DirLightCfg>{
        color: 0xFFFFFF,
        intensity: 1,
        position: <cfg.XYZ>{ x: this.offset.x, y: this.offset.y, z: this.offset.z },
        size: 5,
        showHelper: true,
        helper: null,
        shadowCameraFov: 70,
        castShadow: false
    };
    public dirLightProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'string', label: 'Type', value: Iv3dLightType.directional, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'name', type: 'string', label: 'name', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'color', type: 'color', label: 'Color', value: '#FFFFFF' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'intensity', type: 'number', label: 'Intensity', value: 1, min: 0.00, max: 1.00, step: 0.05 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.offset.y, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'size', type: 'number', label: 'Size', min: 1, max: 100, value: 5, step: 1 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'shadowCameraFov', type: 'number', label: 'Shadow Camera FOV', value: 70, min: 0, max: 1000, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'castShadow', type: 'bool', label: 'Cast Shadow', value: false },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'showHelper', type: 'bool', label: 'Show Helper', value: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'showHelperRuntime', type: 'bool', label: 'Runtime', value: false },
    ];

    public hemisphereLightCfg: cfg.HempisphereLightCfg = <cfg.HempisphereLightCfg>{
        skyColor: 0xFFFFFF,
        groundColor: 0xFFFFFF,
        intensity: 1,
        helperSphereSize: 5,
        showHelper: true,
        helper: null
    };
    public hemisphereLightProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'string', label: 'Type', value: Iv3dLightType.hemisphere, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'name', type: 'string', label: 'name', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'skyColor', type: 'color', label: 'Sky Color', value: '#FFFFFF' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'groundColor', type: 'color', label: 'Ground Color', value: '#FFFFFF' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'intensity', type: 'number', label: 'Intensity', value: 1, min: 0.00, max: 1.00, step: 0.05 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.offset.y, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'helperSphereSize', type: 'number', label: 'Helper Size', min: 1, max: 100, value: 5, step: 1 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'showHelper', type: 'bool', label: 'Show Helper', value: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'showHelperRuntime', type: 'bool', label: 'Runtime', value: false },
    ];

    public spotLightCfg: cfg.SpotLightCfg = <cfg.SpotLightCfg>{
        color: 0xFFFFFF,
        intensity: 1,
        position: <cfg.XYZ>{ x: 0, y: this.offset.y, z: 0 },
        distance: this.radius * 2,
        helperSphereSize: 5,
        showHelper: true,
        showHelperRuntime: false,
        helper: null,
        angle: Math.PI / 2,
        penumbra: 0,
        decay: 0
    };
    public spotLightProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'string', label: 'Type', value: Iv3dLightType.spot, readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'uuid', type: 'string', label: 'UUID', value: '', readOnly: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'name', type: 'string', label: 'name', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'color', type: 'color', label: 'Color', value: '#FFFFFF' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'intensity', type: 'number', label: 'Intensity', value: 1, min: 0.00, max: 1.00, step: 0.05 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.offset.y, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: 0, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'distance', type: 'number', label: 'Distance', min: -1000, max: 1000, value: this.radius * 2, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'penumbra', type: 'number', label: 'Penumbra', min: 0.00, max: 1.00, value: 0, step: 0.01 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'decay', type: 'number', label: 'Decay', min: 1.00, max: 2.00, value: 1, step: 0.01 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'helperSphereSize', type: 'number', label: 'Helper Size', min: 1, max: 100, value: 5, step: 1 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'showHelper', type: 'bool', label: 'Show Helper', value: true },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'showHelperRuntime', type: 'bool', label: 'Runtime', value: false },
    ];

    public cameraCfg: cfg.CameraCfg = <cfg.CameraCfg>{
        fov: 50, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 10000,
        position: { x: 200, y: 200, z: 200 }
    }
    public cameraProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'fov', type: 'number', label: 'FOV', value: this.cameraCfg.fov, min: 1, max: 1000, step: 10 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'aspect', type: 'number', label: 'Aspect', value: this.cameraCfg.aspect, min: 0, max: 100 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'near', type: 'number', label: 'Near', value: this.cameraCfg.near, min: 0.00, max: 100.00, step: 0.1 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'far', type: 'number', label: 'Far', value: this.cameraCfg.far, min: 0, max: 10000 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'x', type: 'number', label: 'Position X', min: -1000, max: 1000, value: this.cameraCfg.position.x, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'y', type: 'number', label: 'Position Y', min: -1000, max: 1000, value: this.cameraCfg.position.y, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'position', prop2: 'z', type: 'number', label: 'Position Z', min: -1000, max: 1000, value: this.cameraCfg.position.z, step: 10 },
    ];

    public cssCfg: cfg.CssCfg = <cfg.CssCfg>{
        position: 'absolute', left: '', top: '', width: '', height: '', opacity: '1', 'background-color': ''
    };
    public dataSourceProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'title', type: 'string', label: 'Title', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'url', type: 'string', label: 'Url', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'contentPanel', type: 'string', label: 'Content panel', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'type', type: 'string', label: 'Type', value: Iv3dObjectType.cube, values: this.objectTypes },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'textBackgroundColor', type: 'color', label: 'Text background color', value: '#FFF' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'textColor', type: 'color', label: 'Text color', value: '#000' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'transparentBackground', type: 'boolean', label: 'Transparent background', value: false },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'valueFormat', type: 'string', label: 'Format', value: '', values: this.valueFormats },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'page', type: 'number', label: 'Page', value: 1 },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'pageSize', type: 'number', label: 'Page size', value: 50 },
        <Iv3dObjectProperty>{ prop1: 'css', prop2: 'position', type: 'string', label: 'Position', value: this.cssCfg.position },
        <Iv3dObjectProperty>{ prop1: 'css', prop2: 'left', type: 'string', label: 'Left', value: this.cssCfg.left },
        <Iv3dObjectProperty>{ prop1: 'css', prop2: 'top', type: 'string', label: 'Top', value: this.cssCfg.top },
        <Iv3dObjectProperty>{ prop1: 'css', prop2: 'width', type: 'string', label: 'Width', value: this.cssCfg.width },
        <Iv3dObjectProperty>{ prop1: 'css', prop2: 'height', type: 'string', label: 'Height', value: this.cssCfg.height },
        <Iv3dObjectProperty>{ prop1: 'css', prop2: 'opacity', type: 'string', label: 'Opacity', value: this.cssCfg.opacity },
        <Iv3dObjectProperty>{ prop1: 'css', prop2: 'background-color', type: 'string', label: 'Background color', value: this.cssCfg['background-color'] },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'drilldownPatternUrl', type: 'string', label: 'Drilldown Pattern Url', value: '' },
        <Iv3dObjectProperty>{ prop1: 'urls', prop2: 'title0', type: 'string', label: 'Title 0', value: '' },
        <Iv3dObjectProperty>{ prop1: 'urls', prop2: 'url0', type: 'string', label: 'Url 0', value: '' },
        <Iv3dObjectProperty>{ prop1: 'urls', prop2: 'type0', type: 'string', label: 'Type 0', value: Iv3dObjectType.cube, values: this.objectTypes },
        <Iv3dObjectProperty>{ prop1: 'urls', prop2: 'title1', type: 'string', label: 'Title 1', value: '' },
        <Iv3dObjectProperty>{ prop1: 'urls', prop2: 'url1', type: 'string', label: 'Url 1', value: '' },
        <Iv3dObjectProperty>{ prop1: 'urls', prop2: 'type1', type: 'string', label: 'Type 1', value: Iv3dObjectType.cube, values: this.objectTypes },
        <Iv3dObjectProperty>{ prop1: 'urls', prop2: 'title2', type: 'string', label: 'Title 2', value: '' },
        <Iv3dObjectProperty>{ prop1: 'urls', prop2: 'url2', type: 'string', label: 'Url 2', value: '' },
        <Iv3dObjectProperty>{ prop1: 'urls', prop2: 'type2', type: 'string', label: 'Type 2', value: Iv3dObjectType.cube, values: this.objectTypes },
    ];

    public sceneCfg: cfg.SceneRuntimeCfg = <cfg.SceneRuntimeCfg>{
        useFog: false, fogColor: 0xffffff, fogMistDensity: 0.015,
        showAxis: true, showAxisRuntime: true, axisSize: 1000, useAxisArrows: true, axisArrowHeadLength: 100,
        showGrid: true, showGridRuntime: true, gridSize: 2000, gridDivisions: 100, gridColorCenterLine: 0xFFFFFF, gridColor: 0x808080, backgroundColor: this.cssBackgroundColor,
        useStereoEffect: false, useStereoEffectRuntime: false,
        useAnaglyphEffect: false, useAnaglyphEffectRuntime: false,
        useAsciiEffect: false, useAsciiEffectRuntime: false,
        noSleep: false
    }
    public sceneProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: 'scene', prop2: 'useFog', type: 'bool', label: 'Use Fog', value: this.sceneCfg.useFog },
        <Iv3dObjectProperty>{ prop1: 'scene', prop2: 'fogColor', type: 'color', label: 'Fog Color', value: '#FFFFFF' },
        <Iv3dObjectProperty>{ prop1: 'scene', prop2: 'fogMistDensity', type: 'number', label: 'Fog Mist Density', value: this.sceneCfg.fogMistDensity, min: 0, max: 1, step: 0.001 },
        <Iv3dObjectProperty>{ prop1: 'axis', prop2: 'showAxis', type: 'bool', label: 'Show Axis', value: this.sceneCfg.showAxis },
        <Iv3dObjectProperty>{ prop1: 'axis', prop2: 'showAxisRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.showAxisRuntime },
        <Iv3dObjectProperty>{ prop1: 'axis', prop2: 'axisSize', type: 'number', label: 'Axis Size', value: this.sceneCfg.axisSize, min: 1, max: 1000, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'axis', prop2: 'useAxisArrows', type: 'bool', label: 'Axis Arrows', value: this.sceneCfg.useAxisArrows },
        <Iv3dObjectProperty>{ prop1: 'axis', prop2: 'axisArrowHeadLength', type: 'number', label: 'Axis Arrow Head Length', value: this.sceneCfg.axisArrowHeadLength, min: 1, max: 100, step: 1 },
        <Iv3dObjectProperty>{ prop1: 'grid', prop2: 'showGrid', type: 'bool', label: 'Show Grid', value: this.sceneCfg.showGrid },
        <Iv3dObjectProperty>{ prop1: 'grid', prop2: 'showGridRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.showGridRuntime },
        <Iv3dObjectProperty>{ prop1: 'grid', prop2: 'gridSize', type: 'number', label: 'Grid Size', value: this.sceneCfg.gridSize, min: 1, max: 1000, step: 10 },
        <Iv3dObjectProperty>{ prop1: 'grid', prop2: 'gridDivisions', type: 'number', label: 'Grid Divisions', value: this.sceneCfg.gridDivisions, min: 1, max: 100, step: 1 },
        <Iv3dObjectProperty>{ prop1: 'grid', prop2: 'gridColor', type: 'color', label: 'Grid Color', value: '#808080' },
        <Iv3dObjectProperty>{ prop1: 'grid', prop2: 'gridColorCenterLine', type: 'color', label: 'Grid Color Center Line', value: '#FFFFFF' },
        <Iv3dObjectProperty>{ prop1: 'scene', prop2: 'backgroundColor', type: 'cssColor', label: 'Background Color', value: this.cssBackgroundColor },
        <Iv3dObjectProperty>{ prop1: 'renderer', prop2: 'useStereoEffect', type: 'bool', label: 'Stereo Effect', value: this.sceneCfg.useStereoEffect },
        <Iv3dObjectProperty>{ prop1: 'renderer', prop2: 'useStereoEffectRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.useStereoEffectRuntime },
        <Iv3dObjectProperty>{ prop1: 'renderer', prop2: 'useAnaglyphEffect', type: 'bool', label: 'Anaglyph Effect', value: this.sceneCfg.useAnaglyphEffect },
        <Iv3dObjectProperty>{ prop1: 'renderer', prop2: 'useAnaglyphEffectRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.useAnaglyphEffectRuntime },
        <Iv3dObjectProperty>{ prop1: 'renderer', prop2: 'useAsciiEffect', type: 'bool', label: 'Ascii Effect', value: this.sceneCfg.useAsciiEffect },
        <Iv3dObjectProperty>{ prop1: 'renderer', prop2: 'useAsciiEffectRuntime', type: 'bool', label: 'Runtime', value: this.sceneCfg.useAsciiEffectRuntime },
        <Iv3dObjectProperty>{ prop1: 'scene', prop2: 'noSleep', type: 'bool', label: 'No Sleep', value: this.sceneCfg.noSleep },
    ];

    public audioCfg: cfg.AudioCfg = <cfg.AudioCfg>{
        fileName: '', autoPlay: false, controls: true, loop: true, position: 'absolute', left: '10px', top: '10px'
    }
    public audioProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'fileName', type: 'string', label: 'Audio File Name', value: this.audioCfg.fileName },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'select', type: 'function', label: 'Select', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'play', type: 'function', label: 'Play', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'pause', type: 'function', label: 'Pause', value: '' },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'autoPlay', type: 'bool', label: 'Auto Play', value: this.audioCfg.autoPlay },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'loop', type: 'bool', label: 'Loop', value: this.audioCfg.loop },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'controls', type: 'bool', label: 'Controls', value: this.audioCfg.controls },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'position', type: 'string', label: 'Position', value: this.audioCfg.position, values: ['static', 'relative', 'absolute'] },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'left', type: 'string', label: 'Left', value: this.audioCfg.left },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'top', type: 'string', label: 'Top', value: this.audioCfg.top },
    ];
    public cssProps: Iv3dObjectProperty[] = [
        <Iv3dObjectProperty>{ prop1: null, prop2: 'position', type: 'string', label: 'Position', value: this.cssCfg.position },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'left', type: 'string', label: 'Left', value: this.cssCfg.left },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'top', type: 'string', label: 'Top', value: this.cssCfg.top },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'width', type: 'string', label: 'Width', value: this.cssCfg.width },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'height', type: 'string', label: 'Height', value: this.cssCfg.height },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'opacity', type: 'string', label: 'Opacity', value: this.cssCfg.opacity },
        <Iv3dObjectProperty>{ prop1: null, prop2: 'background-color', type: 'string', label: 'Background color', value: this.cssCfg['background-color']},
    ];

    public static TweenEasings = {
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
     
    constructor(private userSvc: UserService,
        private errorSvc: ErrorService,
        private environment: Iv3dEnvironment
    ) {
        this.errorSvc.useAlertForErrors = this.environment.useAlertForErrors;
        for (let p in Iv3dObjectType) {
            this.objectTypes.push(p);
        }
        for (let p in Iv3dDataSourceValueFormat) {
            this.valueFormats.push(p);
        }
    }

    getProp(propName: string, props: Iv3dObjectProperty[]): Iv3dObjectProperty {
        return props.find(item => item.prop2 === propName);
    }

    getChild(uuid: string, container: Iv3dObject) {
        return container.children.find(item => item.uuid === uuid);
    }

    getCfg(props: Iv3dObjectProperty[]): any {
        let cfg: any = {};
        for (let p of props) {
            cfg[p.prop2] = p.value;
        }
        return cfg;
    }

    getGenCfg<T extends Object>(config: T, props: Iv3dObjectProperty[]): T {
        let c = this.getCfg(props);
        for (let p1 in config) {
            // if (typeof (config[p1]) === 'object' && config[p1].length > 0) {
            if (config[p1] && typeof (config[p1]) === 'object' && Object.keys(config[p1]).length > 0) {
                for (let p2 in config[p1]) {
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
    }

    getLineCfg(props: Iv3dObjectProperty[]): cfg.LineCfg {
        let config: cfg.LineCfg = new cfg.LineCfg();
        return this.getGenCfg<cfg.LineCfg>(config, props);
    }

    getPlaneCfg(props: Iv3dObjectProperty[]): cfg.PlaneCfg {
        let config: cfg.PlaneCfg = new cfg.PlaneCfg();
        return this.getGenCfg<cfg.PlaneCfg>(config, props);
    }

    getCircleCfg(props: Iv3dObjectProperty[]): cfg.CircleCfg {
        let config: cfg.CircleCfg = new cfg.CircleCfg();
        return this.getGenCfg<cfg.CircleCfg>(config, props);
    }

    getCubeCfg(props: Iv3dObjectProperty[]): cfg.CubeCfg {
        let config: cfg.CubeCfg = new cfg.CubeCfg();
        return this.getGenCfg<cfg.CubeCfg>(config, props);
    }

    getSphereCfg(props: Iv3dObjectProperty[]): cfg.SphereCfg {
        let config: cfg.SphereCfg = new cfg.SphereCfg();
        return this.getGenCfg<cfg.SphereCfg>(config, props);
    }

    getCylinderCfg(props: Iv3dObjectProperty[]): cfg.CylinderCfg {
        let config: cfg.CylinderCfg = new cfg.CylinderCfg();
        return this.getGenCfg<cfg.CylinderCfg>(config, props);
    }

    getTorusCfg(props: Iv3dObjectProperty[]): cfg.TorusCfg {
        let config: cfg.TorusCfg = new cfg.TorusCfg();
        return this.getGenCfg<cfg.TorusCfg>(config, props);
    }

    getTorusKnotCfg(props: Iv3dObjectProperty[]): cfg.TorusKnotCfg {
        let config: cfg.TorusKnotCfg = new cfg.TorusKnotCfg();
        return this.getGenCfg<cfg.TorusKnotCfg>(config, props);
    }

    getTextCfg(props: Iv3dObjectProperty[]): cfg.TextCfg {
        let config: cfg.TextCfg = new cfg.TextCfg();
        return this.getGenCfg<cfg.TextCfg>(config, props);
    }

    getParticleCfg(props: Iv3dObjectProperty[]): cfg.ParticleCfg {
        let config: cfg.ParticleCfg = new cfg.ParticleCfg();
        return this.getGenCfg<cfg.ParticleCfg>(config, props);
    }

    getPointLightCfg(props: Iv3dObjectProperty[]): cfg.PointLightCfg {
        let config: cfg.PointLightCfg = new cfg.PointLightCfg();
        return this.getGenCfg<cfg.PointLightCfg>(config, props);
    }

    getDirLightCfg(props: Iv3dObjectProperty[]): cfg.DirLightCfg {
        let config: cfg.DirLightCfg = new cfg.DirLightCfg();
        return this.getGenCfg<cfg.DirLightCfg>(config, props);
    }

    getHemishphereLightCfg(props: Iv3dObjectProperty[]): cfg.HempisphereLightCfg {
        let config: cfg.HempisphereLightCfg = new cfg.HempisphereLightCfg();
        return this.getGenCfg<cfg.HempisphereLightCfg>(config, props);
    }

    getSpotLightCfg(props: Iv3dObjectProperty[]): cfg.SpotLightCfg {
        let config: cfg.SpotLightCfg = new cfg.SpotLightCfg();
        return this.getGenCfg<cfg.SpotLightCfg>(config, props);
    }

    getCameraCfg(props: Iv3dObjectProperty[]): cfg.CameraCfg {
        let config: cfg.CameraCfg = new cfg.CameraCfg();
        return this.getGenCfg<cfg.CameraCfg>(config, props);
    }

    getSceneCfg(props: Iv3dObjectProperty[]): cfg.SceneRuntimeCfg {
        let config: cfg.SceneRuntimeCfg = new cfg.SceneRuntimeCfg();
        return this.getGenCfg<cfg.SceneRuntimeCfg>(config, props);
    }

    getAudioCfg(props: Iv3dObjectProperty[]): cfg.AudioCfg {
        let config: cfg.AudioCfg = Object.assign({}, this.audioCfg);
        return this.getGenCfg<cfg.AudioCfg>(config, props);
    }

    getCssCfg(props: Iv3dObjectProperty[]): cfg.CssCfg {
        let config: cfg.CssCfg = Object.assign({}, this.cssCfg);
        return this.getGenCfg<cfg.CssCfg>(config, props);
    }

    getTextureCfg(props: Iv3dObjectProperty[]): cfg.TextureCfg {
        let config: cfg.TextureCfg = new cfg.TextureCfg();
        return this.getGenCfg<cfg.TextureCfg>(config, props);
    }

    setCfgProps<T extends Object>(config: T, props: Iv3dObjectProperty[], excludeProps?: string[]) {
        for (let p1 in config) {
            if (excludeProps && excludeProps.indexOf(p1) >= 0) continue;
            // if (typeof (config[p1]) === 'object' && config[p1].length > 0) {
            if (config[p1] && typeof(config[p1]) === 'object' && Object.keys(config[p1]).length > 0) {
                for (let p2 in config[p1]) {
                    if (!cfg.U.isEmpty(config[p1][p2])) {
                        let prop: Iv3dObjectProperty = this.getProp(p2, props);
                        if (prop) {
                            prop.value = config[p1][p2];
                        }
                    }
                }
            }
            else {
                if (!cfg.U.isEmpty(config[p1])) {
                    let prop: Iv3dObjectProperty = this.getProp(p1, props);
                    if (prop) {
                        prop.value = config[p1];
                    }
                }
            }
        }
    }

    setLineCfgProps(config: cfg.LineCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.LineCfg>(config, props);
    }

    setPlaneCfgProps(config: cfg.PlaneCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.PlaneCfg>(config, props);
    }

    setCircleCfgProps(config: cfg.CircleCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.CircleCfg>(config, props);
    }

    setCubeCfgProps(config: cfg.CubeCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.CubeCfg>(config, props);
    }

    setSphereCfgProps(config: cfg.SphereCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.SphereCfg>(config, props);
    }

    setCylinderCfgProps(config: cfg.CylinderCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.CylinderCfg>(config, props);
    }

    setTorusCfgProps(config: cfg.TorusCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.TorusCfg>(config, props);
    }

    setTorusKnotCfgProps(config: cfg.TorusKnotCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.TorusKnotCfg>(config, props);
    }

    setTextCfgProps(config: cfg.TextCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.TextCfg>(config, props, ['textMesh', 'textMeshMirror', 'textMaterial', 'font', 'geometry']);
    }

    setParticleCfgProps(config: cfg.ParticleCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.ParticleCfg>(config, props);
    }

    setPointLightCfgProps(config: cfg.PointLightCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.PointLightCfg>(config, props, ['helper']);
    }

    setDirLightCfgProps(config: cfg.DirLightCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.DirLightCfg>(config, props, ['helper']);
    }

    setHempisphereLightCfgProps(config: cfg.HempisphereLightCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.HempisphereLightCfg>(config, props, ['helper']);
    }

    setSpotLightCfgProps(config: cfg.SpotLightCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.SpotLightCfg>(config, props, ['helper']);
    }

    setCameraCfgProps(config: cfg.CameraCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.CameraCfg>(config, props);
    }

    setSceneCfgProps(config: cfg.SceneRuntimeCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.SceneRuntimeCfg>(config, props);
    }

    setAudioCfgProps(config: cfg.AudioCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.AudioCfg>(config, props);
    }

    setTextureCfgProps(config: cfg.TextureCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.TextureCfg>(config, props);
    }

    setCssCfgProps(config: cfg.CssCfg, props: Iv3dObjectProperty[]) {
        this.setCfgProps<cfg.CssCfg>(config, props);
    }

    loadObject(obj: Iv3dObject, w: WglUtil, mainGroup: THREE.Group, demo: boolean, isPublic: boolean, key: string, threeObjCallback: Function) {
        let threeObj: THREE.Object3D;
        let geom, mat;
        switch (obj.meshType) {
            case Iv3dObjectType.line:
                geom = this.genGeom(Iv3dGeometryType.line, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                /*
                mat = this.genMat(obj.materialProps, w);
                threeObj = w.addMesh(geom, mat, mainGroup);
                this.setThreeObjProps(obj, threeObj);
                */
                break;
            case Iv3dObjectType.plane:
                geom = this.genGeom(Iv3dGeometryType.plane, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case Iv3dObjectType.circle:
                geom = this.genGeom(Iv3dGeometryType.circle, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case Iv3dObjectType.cube:
                geom = this.genGeom(Iv3dGeometryType.box, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case Iv3dObjectType.sphere:
                geom = this.genGeom(Iv3dGeometryType.sphere, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case Iv3dObjectType.cylinder:
                geom = this.genGeom(Iv3dGeometryType.cylinder, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case Iv3dObjectType.torus:
                geom = this.genGeom(Iv3dGeometryType.torus, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case Iv3dObjectType.torusKnot:
                geom = this.genGeom(Iv3dGeometryType.torusKnot, obj.geometryProps, w);
                this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            case Iv3dObjectType.text:
                let fontName: string = 'helvetiker';
                let weight: string = 'regular';
                let fontNameProp: Iv3dObjectProperty = obj.geometryProps.find(p => p.prop2 === 'fontName');           
                if (fontNameProp) {
                    fontName = fontNameProp.value;
                }
                let weightProp: Iv3dObjectProperty = obj.geometryProps.find(p => p.prop2 === 'weight');
                if (weightProp) {
                    weight = weightProp.value;
                }
                let loader = new THREE.FontLoader();
                loader.load(`${this.environment.assetsRelUrl}libs/threejs/fonts/${fontName}_${weight}.typeface.json`, (response) => {
                    let props: Iv3dObjectProperty[] = obj.geometryProps;
                    let fontProp: Iv3dObjectProperty = props.find(p => p.prop2 === 'font');
                    fontProp.value = response;
                    // props.push(<Iv3dObjectProperty>{ prop1: null, prop2: 'font', type: 'object', label: 'Font data', value: response, hidden: true });
                    geom = this.genGeom(Iv3dGeometryType.text, props, w);
                    this.genObjectWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                }, (arg) => console.log(arg), (error) => console.log(error));
                break;
            case Iv3dObjectType.particles:
                geom = this.genGeom(Iv3dGeometryType.particles, obj.geometryProps, w);
                this.genParticlesWithMat(obj, geom, mainGroup, w, demo, isPublic, key, threeObjCallback);
                break;
            default:
                break;
        }
    }

    private createShaderMaterial(shader: Iv3dShader, w: WglUtil, demo: boolean, isPublic: boolean, key: string): THREE.ShaderMaterial {
        let uniforms = {};
        for (let u of shader.uniforms.filter(item => item.type !== Iv3dUniformType.t)) {
            uniforms[u.name] = { type: u.type, value: u.value };
        }
        if (shader.timeExpr && shader.timeExpr.expression) {
            shader.timeExpr.fn = this.oParser.parse(shader.timeExpr.expression);
        }
        let shaderMaterial = new THREE.ShaderMaterial({
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
        for (let u of shader.uniforms.filter(item => item.type === Iv3dUniformType.t)) {
            let imgFile = u.value;
            let texture = this.loadTexture(imgFile, w, demo, isPublic, key, null);
            uniforms[u.name] = { type: u.type, value: texture };
        }
        for (let prop in uniforms) {
            switch (uniforms[prop].type) {
                case Iv3dUniformType.v3:
                    uniforms[prop].value = new THREE.Vector3(0, 0, 0);
                    break;
                case Iv3dUniformType.t:
                    uniforms[prop].value.wrapS = uniforms[prop].value.wrapT = THREE.RepeatWrapping;
                    break;
                default:
                    break;
            }
        }
        return shaderMaterial;
    }

    private attachShader(shader: Iv3dShader, obj: Iv3dObject, mesh: THREE.Object3D, w: WglUtil, demo: boolean, isPublic: boolean, key: string) {
        if (!mesh) return;
        if (!shader) return;
        let shaderMaterial = this.createShaderMaterial(shader, w, demo, isPublic, key);
        mesh.material = shaderMaterial;
    }

    loadLight(light: Iv3dLight, w: WglUtil) {
        let config: cfg.LightCfg;
        let lightHelper: any;
        switch (light.type) {
            case Iv3dLightType.point:
                config = this.getPointLightCfg(light.lightProps);
                lightHelper = w.genPointLight(config);
                break;
            case Iv3dLightType.directional:
                config = this.getDirLightCfg(light.lightProps);
                lightHelper = w.genDirLight(config);
                break;
            case Iv3dLightType.hemisphere:
                config = this.getHemishphereLightCfg(light.lightProps);
                lightHelper = w.genHemisphereLight(config);
                break;
            case Iv3dLightType.spot:
                config = this.getSpotLightCfg(light.lightProps);
                lightHelper = w.genSpotLight(config);
                break;
            default:
                break;
        }
        this.setThreeLightProps(light, lightHelper);
        w.addLight(lightHelper);
    }

    genGeom(type: Iv3dGeometryType, props: Iv3dObjectProperty[], w: WglUtil) {
        let geom: any;
        switch (type) {
            case Iv3dGeometryType.line:
                geom = w.genLineGeom(this.getLineCfg(props));
                break;
            case Iv3dGeometryType.plane:
                geom = w.genPlaneGeom(this.getPlaneCfg(props));
                break;
            case Iv3dGeometryType.circle:
                geom = w.genCircleGeom(this.getCircleCfg(props));
                break;
            case Iv3dGeometryType.box:
                geom = w.genCubeGeom(this.getCubeCfg(props));
                break;
            case Iv3dGeometryType.sphere:
                geom = w.genSphereGeom(this.getSphereCfg(props));
                break;
            case Iv3dGeometryType.cylinder:
                geom = w.genCylinderGeom(this.getCylinderCfg(props));
                break;
            case Iv3dGeometryType.torus:
                geom = w.genTorusGeom(this.getTorusCfg(props));
                break;
            case Iv3dGeometryType.torusKnot:
                geom = w.genTorusKnotGeom(this.getTorusKnotCfg(props));
                break;
            case Iv3dGeometryType.text:
                geom = w.genTextGeom(this.getTextCfg(props));
                break;
            case Iv3dGeometryType.particles:
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
    }

    genMat(props: Iv3dObjectProperty[], w: WglUtil, texture?: any) {
        let typeProp = props.find(item => item.prop2 === 'type');
        if (!typeProp) {
            typeProp = <Iv3dObjectProperty>{
                prop1: 'material', prop2: 'type', value: 'MeshBasicMaterial'
            };
        }
        let type: Iv3dMaterialType = typeProp.value;
        let mat: THREE.Material;
        switch (type) {
            case Iv3dMaterialType.lineBasic:
                mat = w.genLineBasicMat();
                break;
            case Iv3dMaterialType.meshBasic:
                mat = w.genMeshBasicMat();
                break;
            case Iv3dMaterialType.meshLambert:
                mat = w.genMeshLambertMat();
                break;
            case Iv3dMaterialType.meshPhong:
                mat = w.genMeshPhongMat();
                break;
            case Iv3dMaterialType.points:
                mat = w.genParticleMat();
                break;
            case Iv3dMaterialType.multi:
                // for now, assume multi material is only used with 3D text
                mat = w.genTextMat();
                break;
            default:
                mat = w.genMeshBasicMat();
                break;
        }
        let otherProps: Iv3dObjectProperty[] = props.filter(item => ['type', 'function'].indexOf(item.prop2) === -1);
        let hasTexture: boolean = false;
        otherProps.forEach(otherProp => {
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
                            mat[otherProp.prop2] = WglUtil.getThreeColor(otherProp.value);
                        }
                        else {
                            mat[otherProp.prop2] = otherProp.value;
                        }
                        break;
                }
            }
            catch (e) {
                this.errorSvc.log(`Iv3dObjectHandler.genMat property set error: ${e}`);
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
    }

    genLight(type: Iv3dLightType, props: Iv3dObjectProperty[], w: WglUtil) {
        let lightHelper: any;
        switch (type) {
            case Iv3dLightType.point:
                lightHelper = w.genPointLight(this.getPointLightCfg(props));
                break;
            case Iv3dLightType.directional:
                lightHelper = w.genDirLight(this.getDirLightCfg(props));
                break;
            case Iv3dLightType.hemisphere:
                lightHelper = w.genHemisphereLight(this.getHemishphereLightCfg(props));
                break;
            case Iv3dLightType.spot:
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
    }

    genGeomProps(geomType: Iv3dGeometryType, cfg) {
        let props: Iv3dObjectProperty[] = [];
        switch (geomType) {
            case Iv3dGeometryType.line:
                //props = JSON.parse(JSON.stringify(this.lineGeomProps));
                props = this.lineGeomProps.map(item => Object.assign({}, item));
                this.setLineCfgProps(cfg, props);
                break;
            case Iv3dGeometryType.circle:
                //props = this.circleGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.circleGeomProps));
                props = this.circleGeomProps.map(item => Object.assign({}, item));
                this.setCircleCfgProps(cfg, props);
                break;
            case Iv3dGeometryType.plane:
                //props = this.planeGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.planeGeomProps));
                props = this.planeGeomProps.map(item => Object.assign({}, item));
                this.setPlaneCfgProps(cfg, props);
                break;
            case Iv3dGeometryType.box:
                //props = this.cubeGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.cubeGeomProps));
                props = this.cubeGeomProps.map(item => Object.assign({}, item));
                this.setCubeCfgProps(cfg, props);
                break;
            case Iv3dGeometryType.sphere:
                //props = this.sphereGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.sphereGeomProps));
                props = this.sphereGeomProps.map(item => Object.assign({}, item));
                this.setSphereCfgProps(cfg, props);
                break;
            case Iv3dGeometryType.cylinder:
                //props = this.cylinderGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.cylinderGeomProps));
                props = this.cylinderGeomProps.map(item => Object.assign({}, item));
                this.setCylinderCfgProps(cfg, props);
                break;
            case Iv3dGeometryType.torus:
                //props = this.torusGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.torusGeomProps));
                props = this.torusGeomProps.map(item => Object.assign({}, item));
                this.setTorusCfgProps(cfg, props);
                break;
            case Iv3dGeometryType.torusKnot:
                //props = this.torusKnotGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.torusKnotGeomProps));
                props = this.torusKnotGeomProps.map(item => Object.assign({}, item));
                this.setTorusKnotCfgProps(cfg, props);
                break;
            case Iv3dGeometryType.text:
                //props = this.textGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.textGeomProps));
                props = this.textGeomProps.map(item => Object.assign({}, item));
                this.setTextCfgProps(cfg, props);
                break;
            case Iv3dGeometryType.particles:
                //props = this.particleGeomProps.slice();
                //props = JSON.parse(JSON.stringify(this.particleGeomProps));
                props = this.particleGeomProps.map(item => Object.assign({}, item));
                this.setParticleCfgProps(cfg, props);
                break;
            default:
                break;
        }
        return props;
    }

    genMatProps(matType: Iv3dMaterialType, mat: THREE.Material, w: WglUtil) {
        //let props: Iv3dObjectProperty[] = this.materialProps.slice();
        //let props: Iv3dObjectProperty[] = JSON.parse(JSON.stringify(this.materialProps));
        let props: Iv3dObjectProperty[] = this.materialProps.map(item => Object.assign({}, item));
        for (let p in mat) {
            let prop = props.find(item => item.prop2 === p);
            if (prop) {
                switch (prop.type) {
                    case 'color':
                        let c = '#' + mat[p].getHex().toString(16);
                        prop.value = c; // w.hexToRgb(c);
                        break;
                    default:
                        prop.value = mat[p];
                        break;
                }
            }
        }
        return props;
    }

    genObjProps(threeObj: THREE.Object3D) {
        //let props: Iv3dObjectProperty[] = this.objectProps.slice();
        //let props: Iv3dObjectProperty[] = JSON.parse(JSON.stringify(this.objectProps));
        let props: Iv3dObjectProperty[] = this.objectProps.map(item => Object.assign({}, item));
        for (let prop of props) {
            if (threeObj[prop.prop1] && threeObj[prop.prop1][prop.prop2]) {
                prop.value = threeObj[prop.prop1][prop.prop2];
            }
        }
        return props;
    }

    genLightProps(lightType: Iv3dLightType, cfg) {
        let props: Iv3dObjectProperty[] = [];
        switch (lightType) {
            case Iv3dLightType.point:
                //props = JSON.parse(JSON.stringify(this.pointLightProps));
                props = this.pointLightProps.map(item => Object.assign({}, item));
                this.setPointLightCfgProps(cfg, props);
                break;
            case Iv3dLightType.directional:
                //props = JSON.parse(JSON.stringify(this.dirLightProps));
                props = this.dirLightProps.map(item => Object.assign({}, item));
                this.setDirLightCfgProps(cfg, props);
                break;
            case Iv3dLightType.hemisphere:
                //props = JSON.parse(JSON.stringify(this.hemisphereLightProps));
                props = this.hemisphereLightProps.map(item => Object.assign({}, item));
                this.setHempisphereLightCfgProps(cfg, props);
                break;
            case Iv3dLightType.spot:
                //props = JSON.parse(JSON.stringify(this.spotLightProps));
                props = this.spotLightProps.map(item => Object.assign({}, item));
                this.setSpotLightCfgProps(cfg, props);
                break;
            default:
                break;
        }
        return props;
    }

    setIv3dObjectProps(obj: Iv3dObject, threeObj: THREE.Object3D) {
        obj.uuid = threeObj.uuid;
        obj.name = threeObj.name;
        obj.objectProps = this.genObjProps(threeObj);
        threeObj.userData = obj;
    }

    setThreeObjProps(obj: Iv3dObject, threeObj: THREE.Object3D) {
        for (let prop of obj.objectProps) {
            if (threeObj[prop.prop1] && !cfg.U.isEmpty(prop.value)) {
                threeObj[prop.prop1][prop.prop2] = prop.value;
            }
        }
        threeObj.userData = obj;
        threeObj.uuid = obj.uuid;
        threeObj.name = obj.name;
        threeObj.url = obj.url;
        threeObj.panels = obj.contentPanels;
    }

    setIv3dLightProps(obj: Iv3dLight, threeLightHelper: THREE.Object3D) {
        obj.uuid = threeLightHelper.uuid;
        obj.name = threeLightHelper.name;
        // obj.lightProps = this.genLightProps(obj.type, threeLightObj);
        threeLightHelper.userData = obj;
    }

    setThreeLightProps(light: Iv3dLight, threeObj: THREE.LightHelper) {
        threeObj.userData = light;
        threeObj.uuid = light.uuid;
        threeObj.name = light.name;
    }

    loadObjectLoaderData(data: DataModel, w: WglUtil, mainGroup: THREE.Group) {
        if (mainGroup) {
            w.clear(mainGroup);
        }

        var loader = new THREE.ObjectLoader();
        mainGroup = loader.parse(data.mainGroup);
        // this.timelines = data.timelines;
        w.add(mainGroup);
        w.objects = w.objects.concat(mainGroup.object.children);
    }

    loadData(data: DataModel, w: WglUtil, mainGroup: THREE.Group, demo: boolean, isPublic: boolean, key: string) {

        if (data) {
            this.fixData(data);

            let cameraCfg: cfg.CameraCfg = Object.assign({}, this.cameraCfg);
            if (data.cameraProps && data.cameraProps.length > 0) {
                cameraCfg = this.getCameraCfg(data.cameraProps);
            }
            w.setCamera(cameraCfg);
            let sceneCfg: cfg.SceneRuntimeCfg = Object.assign({}, this.sceneCfg);
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
                for (let obj of data.container.children) {
                    this.loadObject(obj, w, mainGroup, demo, isPublic, key, (threeObj: THREE.Object3d) => {
                        let shaderIdProp = this.getProp('shaderId', obj.materialProps);
                        if (shaderIdProp && !cfg.U.isEmptyString(shaderIdProp.value) && data.shaders) {
                            let shader: Iv3dShader = data.shaders.find(item => item.id === shaderIdProp.value);
                            this.attachShader(shader, obj, threeObj, w, demo, isPublic, key);
                        }
                    });
                }
            }
            if (data.lights) {
                for (let light of data.lights) {
                    this.loadLight(light, w);
                }
            }
        }
        // this.timelines = data.timelines;
        w.add(mainGroup);
        w.objects = w.objects.concat(mainGroup.children);
    }

    loadNewData(data: DataModel, w: WglUtil) {
        this.createContainer(data);
        //data.cameraProps = JSON.parse(JSON.stringify(this.cameraProps));
        data.cameraProps = this.cameraProps.map(item => Object.assign({}, item));
        //data.sceneProps = JSON.parse(JSON.stringify(this.sceneProps));
        data.sceneProps = this.sceneProps.map(item => Object.assign({}, item));
    }

    createContainer(data: DataModel) {
        if (data) {
            data.container = new Iv3dObject();
            data.container.meshType = Iv3dObjectType.group;
            data.container.name = 'mainGroup';
            data.container.uuid = '';
            return data.container;
        }
        return null;
    }

    createMainGroup(data: DataModel, w: WglUtil) {
        let mainGroup: THREE.Group = null;
        if (data && data.container) {
            mainGroup = w.addGroup();
            mainGroup.uuid = data.container.uuid;
            mainGroup.name = data.container.name;
        }
        return mainGroup;
    }

    getFullFileName(fileName: string, demo: boolean, isPublic: boolean, key: string) {
        let userName = demo || isPublic ? PUBLIC_USER : this.userSvc.userName;
        let userKey = '';
        if (!demo) userKey = `/${this.userSvc.userKey}`;
        if (isPublic) userKey = `/${PUBLIC_DIR}/${key}`;
        let fullFileName = `${this.environment.usersDataUrl}${userName}${userKey}/${fileName}`;
        return fullFileName;
    }

    loadTextureMat(imgFile: string, obj: Iv3dObject, w: WglUtil, demo: boolean, isPublic: boolean, key: string, handler? : any) {
        let loader = new THREE.TextureLoader();
        loader.crossOrigin = 'use-credentials';
        let fullImgFile = this.getFullFileName(imgFile, demo, isPublic, key);
        loader.load(fullImgFile, (texture) => {
            // texture.minFilter = THREE.LinearFilter;
            let mat = this.genMat(obj.materialProps, w, texture);
            if (handler) {
                handler(mat);
            }
        });
    }

    loadTexture(imgFile: string, w: WglUtil, demo: boolean, isPublic: boolean, key: string, handler?: any) {
        let loader = new THREE.TextureLoader();
        loader.crossOrigin = 'use-credentials';
        let fullImgFile = this.getFullFileName(imgFile, demo, isPublic, key);
        return loader.load(fullImgFile, (texture) => {
            if (handler) {
                handler(texture);
            }
        });
    }

    createCanvasTexture(obj: Iv3dObject, geom: THREE.Geometry, w: WglUtil, imgFile: string, demo: boolean, isPublic: boolean, key: string) {
        if (!obj || !geom) return;
        let textureCfg: cfg.TextureCfg = this.getTextureCfg(obj.materialProps);
        geom.computeBoundingBox();
        let size = geom.boundingBox.getSize();
        textureCfg.canvas.width = size.x;
        textureCfg.canvas.height = size.y;
        let fullImgFile = this.getFullFileName(imgFile, demo, isPublic, key);
        let texture = w.createCanvasTexture(fullImgFile, textureCfg);
        return texture;
    }

    genObjectWithMat(obj: Iv3dObject, geom: THREE.Geometry, mainGroup: any, w: WglUtil, demo: boolean, isPublic: boolean, key: string, threeObjCallback: Function) {
        let threeObj: THREE.Object3D;
        let useCanvasProp = this.getProp('useCanvas', obj.materialProps);
        let textureProp = this.getProp('texture', obj.materialProps);
        if (useCanvasProp && useCanvasProp.value) {
            let textureCfg: cfg.TextureCfg = this.getTextureCfg(obj.materialProps);
            let imgFile: string = textureProp && textureProp.value ? textureProp.value : '';
            let texture = this.createCanvasTexture(obj, geom, w, imgFile, demo, isPublic, key);
            let mat: THREE.Material;
            mat = this.genMat(obj.materialProps, w, texture);
            threeObj = w.addMesh(geom, mat, mainGroup);
            this.setThreeObjProps(obj, threeObj);
            if (threeObjCallback) {
                threeObjCallback(threeObj);
            }
        }
        else {
            if (textureProp && !cfg.U.isEmptyString(textureProp.value)) {
                this.loadTextureMat(textureProp.value, obj, w, demo, isPublic, key, (mat) => {
                    threeObj = w.addMesh(geom, mat, mainGroup);
                    this.setThreeObjProps(obj, threeObj);
                    if (threeObjCallback) {
                        threeObjCallback(threeObj);
                    }
                });
            }
            else {
                let mat: THREE.Material;
                mat = this.genMat(obj.materialProps, w);
                threeObj = w.addMesh(geom, mat, mainGroup);
                this.setThreeObjProps(obj, threeObj);
                if (threeObjCallback) {
                    threeObjCallback(threeObj);
                }
            }
        }
    }

    genParticlesWithMat(obj: Iv3dObject, geom: THREE.Geometry, mainGroup: any, w: WglUtil, demo: boolean, isPublic: boolean, key: string, threeObjCallback: Function) {
        let threeObj: THREE.Points;
        let textureProp = this.getProp('texture', obj.materialProps);
        if (textureProp && !cfg.U.isEmptyString(textureProp.value)) {
            this.loadTextureMat(textureProp.value, obj, w, demo, isPublic, key, (mat) => {
                threeObj = w.addParticleMesh(geom, mat, mainGroup);
                this.setThreeObjProps(obj, threeObj);
                if (threeObjCallback) {
                    threeObjCallback(threeObj);
                }
            });
        }
        else {
            let mat: THREE.Material;
            mat = this.genMat(obj.materialProps, w);
            threeObj = w.addParticleMesh(geom, mat, mainGroup);
            this.setThreeObjProps(obj, threeObj);
            if (threeObjCallback) {
                threeObjCallback(threeObj);
            }
        }
    }

    fixData(data: DataModel) {
        if (!data) return;
        //if (!data.cameraProps || data.cameraProps.length === 0) data.cameraProps = JSON.parse(JSON.stringify(this.cameraProps));
        if (!data.cameraProps || data.cameraProps.length === 0) data.cameraProps = this.cameraProps.map(item => Object.assign({}, item));
        //if (!data.sceneProps || data.sceneProps.length === 0) data.sceneProps = JSON.parse(JSON.stringify(this.sceneProps));
        // if (!data.sceneProps || data.sceneProps.length === 0) data.sceneProps = this.sceneProps.map(item => Object.assign({}, item));
        this.fixMissingProps(data.sceneProps, this.sceneProps);
        if (!data.lights) data.lights = [];
        if (!data.timelines) data.timelines = [];
        if (!data.additionalContents) data.additionalContents = [];
        if (!data.shaders) data.shaders = [];
        if (!data.plugins) data.plugins = [];
        if (!data.container) {
            this.createContainer(data);
        }
        data.container.children.forEach((o: Iv3dObject) => {
            this.fixMissingProps(o.materialProps, this.materialProps);
            this.fixMissingProps(o.objectProps, this.objectProps);
            this.fixObjMissingProperty(o, 'url', true);
            this.fixObjMissingProperty(o, 'contentPanels', true);
            this.fixObjMissingProperty(o, 'visible', true);
            this.fixObjMissingProperty(o, 'visibleRuntime', true);
            this.fixObjMissingProperty(o, 'sVisibleRuntime', true);
            this.fixObjMissingProperty(o, 'script', true);
        });
        //if (!data.audioProps || data.audioProps.length === 0) data.audioProps = JSON.parse(JSON.stringify(this.audioProps));
        if (!data.audioProps || data.audioProps.length === 0) data.audioProps = this.audioProps.map(item => Object.assign({}, item));
        data.timelines.forEach((timeline: Timeline) => {
            timeline.meshes.forEach((tmesh: TimelineMesh) => {
                this.fixTimelineMeshProperty(tmesh, 'visible', true);
                this.fixTimelineMeshProperty(tmesh, 'runtimeTweenReverseMouseUp', false);
                this.fixTimelineMeshProperty(tmesh, 'runtimeTweenReverseMouseDown', false);
            });
        });
        // if (!data.dataSourceProps || data.dataSourceProps.length === 0) data.dataSourceProps = this.dataSourceProps.map(item => Object.assign({}, item));
        this.fixMissingProps(data.dataSourceProps, this.dataSourceProps);
    }

    getAudio(data: DataModel, demo: boolean, isPublic: boolean, key: string) {
        if (!data) return null;
        if (!data.audioProps || data.audioProps.length === 0) this.fixData(data);
        let audioFileProp = data.audioProps.find(item => item.prop2 === 'fileName');
        if (!audioFileProp || !audioFileProp.value) return null;
        let userName = demo ? PUBLIC_USER : this.userSvc.userName;
        let userKey = '';
        if (!demo) userKey = `/${this.userSvc.userKey}`;
        if (isPublic) userKey = `/${PUBLIC_DIR}/${key}`;
        let fullFileName = `${this.environment.usersDataUrl}${userName}${userKey}/${audioFileProp.value}`;
        let audio: cfg.AudioCfg = this.getAudioCfg(data.audioProps);
        audio.fullFileName = fullFileName;
        return audio;
    }

    getDataCss(data: DataModel): cfg.CssCfg {
        if (!data) return null;
        if (!data.sceneProps || data.sceneProps.length === 0) this.fixData(data);
        let backgroundColorProp = data.sceneProps.find(item => item.prop2 === 'backgroundColor');
        if (!backgroundColorProp || !backgroundColorProp.value) return null;
        let backgroundColor = backgroundColorProp.value;
        return this.getCss(backgroundColor);
    }

    getCss(backgroundColor?: any) {
        let dataCss = new cfg.CssCfg();
        if (backgroundColor) {
            let color: string;
            if (backgroundColor.r || backgroundColor.g || backgroundColor.b)
                color = '#' + WglUtil.rgbToHex(backgroundColor.r, backgroundColor.g, backgroundColor.b);
            else
                color = backgroundColor;
            dataCss = <cfg.CssCfg>{ 'background-color': color };
        }
        return dataCss;
    }

    fixObjMissingProperty(o: Iv3dObject, propName: string, setObjectProp?: boolean) {
        let prop = o.objectProps.find((p: Iv3dObjectProperty) => p.prop2 === propName);
        if (!prop) {
            let metaProp: Iv3dObjectProperty = this.objectProps.find((p: Iv3dObjectProperty) => p.prop2 === propName);
            if (metaProp) {
                prop = Object.assign({}, metaProp);
                o.objectProps.push(prop);
                if (setObjectProp) {
                    o[propName] = prop.value;
                }
            }
        }
    }

    fixMissingProps(props: Iv3dObjectProperty[], standardProps: Iv3dObjectProperty[]) {
        if (!props && !standardProps) props = [];
        if (!standardProps) return props;
        if (!props || props.length === 0) props = standardProps.map(item => Object.assign({}, item));
        for (let standardProp of standardProps) {
            let prop: Iv3dObjectProperty = props.find(item => item.prop2 === standardProp.prop2);
            if (!prop) {
                props.push(Object.assign({}, standardProp));
            }
        }
    }

    fixTimelineMeshProperty(tmesh: TimelineMesh, propName: string, defaultValue?: any) {
        let prop = tmesh[propName];
        tmesh[propName] = defaultValue;
    }

    createDefaultObject(meshType: Iv3dObjectType, geomType: Iv3dGeometryType) {
        let obj: Iv3dObject = new Iv3dObject();
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
        obj.uuid = KGen.uuid();
        obj.visibleRuntime = true;
        return obj;
    }

}
