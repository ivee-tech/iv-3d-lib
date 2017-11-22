"use strict";
var THREE = require('three');
var dat = require('dat-gui');
var stats_1 = require('./stats');
var cfg = require('./wgl-util-cfgs');
var bird_1 = require('./bird');
var boid_1 = require('./boid');
var OrbitControls = require('three-orbitcontrols');
var TrackballControls = require('three-trackballcontrols');
var leapControls = require('threeleapcontrols');
var StereoEffect = require('three-stereoeffect');
var AnaglyphEffect = require('three-anaglypheffect');
var AsciiEffect = require('three-asciieffect');
var css3d = require('three-css3drenderer');
var wgl_util_content_changed_args_1 = require('./wgl-util-content-changed-args');
var WglUtil = (function () {
    function WglUtil() {
        this.leapObjectsControls = [];
        this.objects = [];
        this.parent = null;
        this.mirrorCube = new THREE.Mesh;
        this.cameraCfg = {
            fov: 50, aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 10000,
            position: { x: 200, y: 200, z: 200 }
        };
        this.rendererCfg = {
            color: 0xFF0000, alpha: 0.5, width: window.innerWidth, height: window.innerHeight, shadowMapEnabled: true, antialias: true,
            useCanvas: false
        };
        this.sceneCfg = {
            useFog: true, fogColor: 0xffffff, fogMistDensity: 0.015, showAxis: true, axisSize: 20, useAxisArrows: true, axisArrowHeadLength: 2,
            showGrid: true, gridSize: 10, gridDivisions: 10, gridColorCenterLine: 0x444444, gridColor: 0x888888
        };
        this.orbitCfg = {
            minDistance: -10000, maxDistance: 10000
        };
        this.trackballCfg = {
            rotateSpeed: 1.0,
            zoomSpeed: 1.2,
            panSpeed: 0.8,
            noZoom: false,
            noPan: false,
            staticMoving: true,
            dynamicDampingFactor: 0.3
        };
        this.lightCfg = {
            color: 0x0c0c0c, intensity: 0xffffff
        };
        this.dirLightCfg = {
            color: 0xFFFFFF, intensity: 1.5, position: { x: 40, y: 60, z: -10 }, shadowCameraFov: 70, castShadow: true, showHelper: true, showHelperRuntime: false, size: 5
        };
        this.pointLightCfg = {
            color: 0x00FF00, intensity: 3, distance: 150, position: { x: 70, y: 5, z: 70 }, helperSphereSize: 3, showHelper: true, showHelperRuntime: false
        };
        this.hemisphereLightCfg = {
            skyColor: 0xFFFFFF, groundColor: 0xFFFFFF, intensity: 1, position: { x: 40, y: 60, z: -10 }, showHelper: true, showHelperRuntime: false
        };
        this.spotLightCfg = {
            color: 0xFFFFFF, intensity: 3, distance: 150, position: { x: 70, y: 5, z: 70 }, showHelper: true, showHelperRuntime: false, angle: Math.PI / 2, penumbra: 0, decay: 0
        };
        this.lineCfg = {
            start: { x: 0, y: 0, z: 0 }, end: { x: 10, y: 10, z: 10 }, color: Math.random() * 0xFFFFFF
        };
        this.planeCfg = {
            width: 60, height: 20, widthSegments: 1, heightSegments: 1, color: Math.random() * 0xFFFFFF, position: { x: 0, y: 0, z: 0 },
            receiveShadow: true
        };
        this.circleCfg = {
            radius: 4, segments: 20, thetaStart: 0, thetaLength: 2 * Math.PI, color: Math.random() * 0xFFFFFF, wireframe: false, position: { x: 20, y: 4, z: 2 },
            castShadow: true, rotation: { x: 0, y: 0, z: 0 }
        };
        this.cubeCfg = {
            width: 4, height: 4, depth: 4, color: Math.random() * 0xFF0000, wireframe: false, position: { x: -4, y: 3, z: 0 },
            widthSegments: 1, heightSegments: 1, depthSegments: 1,
            castShadow: true, rotation: { x: 0, y: 0, z: 0 }, rotationSpeed: 0.5
        };
        this.sphereCfg = {
            radius: 4, widthSegments: 20, heightSegments: 20, phiStart: 0, phiLength: 2 * Math.PI, thetaStart: 0, thetaLength: 2 * Math.PI,
            color: Math.random() * 0xFF0000, wireframe: false, position: { x: 20, y: 4, z: 2 },
            castShadow: true, rotation: { x: 0, y: 0, z: 0 }
        };
        this.cylinderCfg = {
            radiusTop: 20, radiusBottom: 20, height: 100, radiusSegments: 8, heightSegments: 1, openEnded: false, thetaStart: 0, thetaLength: 2 * Math.PI, color: Math.random() * 0xFFFFFF,
            position: { x: 0, y: 0, z: 0 }
        };
        this.torusCfg = {
            radius: 8, tube: 4, radialSegments: 8, tubularSegments: 6, arc: 2 * Math.PI
        };
        this.torusKnotCfg = {
            radius: 8, tube: 4, radialSegments: 8, tubularSegments: 6, p: 2, q: 3
        };
        this.pointsCfg = {
            color: Math.random() * 0xFFFFFF, radius: 0.2, transparent: true, offset: { x: -15, y: -15, z: -15 }, step: { x: 30, y: 30, z: 30 }
        };
        this.pointsFromGeomCfg = {
            color: 0x000000, size: 0.1, scale: 1
        };
        this.particleCfg = {
            count: 100, size: 1, range: 500, transparent: true, opacity: 0.5, vertexColors: [], sizeAttenuation: true, color: 0xFF0000
        };
        this.textureCfg = {
            srcDir: 'assets/textures/', position: { x: 0, y: 0, z: 0 }, width: 100, height: 100, autoplay: true, loop: true, video: null, texture: null,
            canvas: { width: 200, height: 50, font: '24px Arial', text: '', textColor: '#000', backgroundColor: '#fff' }
        };
        this.shadersCfg = {
            vertexShaderId: 'vertexShader', fragmentShaderId: 'fragmentShader', uniforms: {}, attributes: {}, srcDir: 'assets/shaders/glsl/'
        };
        this.skyBoxCfg = {
            srcFile: 'assets/textures/skyboxsun25degtest.png', srcDir: 'assets/textures/sky1/', px: 'px.jpg', py: 'py.jpg', pz: 'pz.jpg', nx: 'nx.jpg', ny: 'ny.jpg', nz: 'nz.jpg', size: 1024,
            width: 5000, height: 5000, depth: 5000
        };
        this.objModelCfg = {
            srcDir: 'assets/models/'
        };
        this.textCfg = {
            text: '',
            height: 10, size: 50, hover: 30, curveSegments: 4, bevelEnabled: true, bevelThickness: 2, bevelSize: 1.5, bevelSegments: 3,
            font: 'optimer',
            weight: 'bold',
            style: 'normal',
            material: 0, extrudeMaterial: 1,
            useMirror: false,
            textMaterial: null,
            textMesh: null, textMeshMirror: null,
            offsetX: 0,
            frontColor: null,
            sideColor: null
        };
        this.birdsCfg = {
            count: 100, avoidWalls: true, worldSize: { width: 500, height: 500, depth: 400 }, scale: 1
        };
        /*
        public gridHelperCfg: cfg.GridHelperCfg = <cfg.GridHelperCfg>{
            size: 10,
            divisions: 10,
            colorCenterLine: 0x444444,
            colorGrid: 0x888888
        }
        */
        this.matCfg = {
            color: 0x000000, wireframe: false
        };
        this.spriteCfg = {
            map: null, color: 0x000000
        };
        this.mirrorCubeCfg = {
            near: 0.1, far: 10000, resolution: 1024,
            dimension: { x: 4, y: 4, z: 1 },
            position: { x: 100, y: 100, z: 100 }
        };
        this.mousePosition = new THREE.Vector2();
        this.dndPlane = new THREE.Plane();
        this.dndOffset = new THREE.Vector3();
        this.dndIntersection = new THREE.Vector3();
        this.Android = function () {
            return navigator.userAgent.match(/Android/i);
        };
        this.BlackBerry = function () {
            return navigator.userAgent.match(/BlackBerry/i);
        };
        this.iOS = function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        };
        this.Opera = function () {
            return navigator.userAgent.match(/Opera Mini/i);
        };
        this.Windows = function () {
            return navigator.userAgent.match(/IEMobile/i);
        };
        this.cfg = {
            useAxis: true,
            useOrbit: true,
            useTrackball: false,
            useStats: true,
            useDatGui: true,
            statsId: 'stats',
            canvasId: 'canvas',
            useAsciiEffect: false,
            useAnaglyphEffect: false,
            anaglyphFocalLength: 125,
            useGridHelper: false,
            useStereoEffect: false,
            useCssRender: false
        };
        this.glScene = null;
        this.camera = null;
        this.glRenderer = null;
        this.raycaster = null;
        this.orbitControls = null;
        this.trackballControls = null;
        this.axis = null;
        this.stats = null;
        this.dndSelectedObject = null;
        this.dndIntersectedObject = null;
        this.dndSelectedObjectBoxHelper = null;
    }
    WglUtil.prototype.copyCfg = function (srcCfg, destCfg) {
        for (var p in srcCfg) {
            if (destCfg.hasOwnProperty(p)) {
                destCfg[p] = srcCfg[p];
            }
        }
    };
    WglUtil.prototype.isMobile = function () {
        var _this = this;
        return {
            Android: this.Android(),
            Blackberry: this.BlackBerry(),
            iOS: this.iOS(),
            Opera: this.Opera(),
            Windows: this.Windows(),
            any: function () {
                return (_this.Android() || _this.BlackBerry() || _this.iOS() || _this.Opera() || _this.Windows());
            }
        };
    };
    WglUtil.detectWebGL = function () {
        try {
            var canvas = document.createElement('canvas');
            return !!(window['WebGLRenderingContext'] && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        }
        catch (e) {
            console.log('WglUtil.detectWebGL: ', e);
            return false;
        }
    };
    WglUtil.prototype.setOptions = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.cfg);
        }
    };
    WglUtil.prototype.setOption = function (name, value) {
        if (this.cfg.hasOwnProperty(name)) {
            this.cfg[name] = value;
        }
    };
    WglUtil.prototype.getUrl = function (url, onSuccess, onError) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                // var data = JSON.parse(request.responseText);
                var data = request.responseText;
                if (onSuccess) {
                    onSuccess(data);
                }
            }
            else {
                var errMsg = 'Error returned from server';
                console.error(errMsg, request);
                if (onError) {
                    onError(new Error(errMsg));
                }
            }
        };
        request.onerror = function (err) {
            console.error('Error returned from server', err);
            if (onError) {
                onError(err);
            }
        };
        request.send();
    };
    WglUtil.prototype.init = function (sceneConfig, cameraConfig, rendererConfig, orbitCfg, trackballCfg) {
        if (sceneConfig) {
            this.copyCfg(sceneConfig, this.sceneCfg);
        }
        if (cameraConfig) {
            this.copyCfg(cameraConfig, this.cameraCfg);
        }
        if (rendererConfig) {
            this.copyCfg(rendererConfig, this.rendererCfg);
        }
        THREE.ImageUtils.crossOrigin = '';
        this.glScene = new THREE.Scene();
        if (this.rendererCfg.useCanvas) {
            this.glRenderer = new THREE.CanvasRenderer();
        }
        else {
            this.glRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: this.rendererCfg.antialias });
        }
        this.glRenderer.setClearColor(this.rendererCfg.color, this.rendererCfg.alpha);
        this.glRenderer.setSize(this.rendererCfg.width ? this.rendererCfg.width : window.innerWidth, this.rendererCfg.height ? this.rendererCfg.height : window.innerHeight); //renderer.width, renderer.height);
        if (this.glRenderer.shadowMap)
            this.glRenderer.shadowMap.enabled = this.rendererCfg.shadowMapEnabled;
        this.setScene(sceneConfig);
        this.camera = new THREE.PerspectiveCamera(this.cameraCfg.fov, this.cameraCfg.aspect, this.cameraCfg.near, this.cameraCfg.far);
        this.setCamera(cameraConfig);
        if (this.cfg.useOrbit)
            this.initOrbit(orbitCfg);
        if (this.cfg.useTrackball)
            this.initTrackball(trackballCfg);
        //if (this.cfg.useLeapCamera)
        this.initLeapCamera(null);
        this.raycaster = new THREE.Raycaster();
        if (this.raycaster.setFromCamera)
            this.raycaster.setFromCamera(this.mousePosition, this.camera);
        if (this.cfg.useCssRender) {
            this.setCssRenderer();
        }
        var canvas = document.getElementById(this.cfg.canvasId);
        if (this.cfg.useAsciiEffect) {
            this.setAsciiEffect();
        }
        else if (this.cfg.useAnaglyphEffect) {
            this.setAnaglyphEffect();
        }
        else if (this.cfg.useStereoEffect) {
            this.setStereoEffect();
        }
        else if (this.cfg.useCssRender) {
            canvas.appendChild(this.cssRenderer.domElement);
            this.cssRenderer.domElement.appendChild(this.glRenderer.domElement);
        }
        else {
            canvas.appendChild(this.glRenderer.domElement);
        }
        // this.projector = new THREE.Projector();       
        // this.glRenderer.render(this.glScene, this.camera);
        this.render();
        if (this.cfg.useDatGui) {
            this.initDatGui();
        }
        if (this.cfg.useStats) {
            this.initStats();
        }
    };
    WglUtil.prototype.render = function () {
        if (this.cfg.useAsciiEffect && this.asciiEffect) {
            this.asciiEffect.render(this.glScene, this.camera);
        }
        else if (this.cfg.useAnaglyphEffect && this.anaglyphEffect) {
            this.anaglyphEffect.render(this.glScene, this.camera);
        }
        else if (this.cfg.useStereoEffect && this.stereoEffect) {
            this.stereoEffect.render(this.glScene, this.camera);
        }
        else if (this.cfg.useCssRender) {
            this.glRenderer.render(this.glScene, this.camera);
            this.cssRenderer.render(this.glScene, this.camera);
        }
        else {
            this.glRenderer.render(this.glScene, this.camera);
        }
    };
    WglUtil.prototype.setCamera = function (cameraCfg, orbitCfg, trackballCfg) {
        if (cameraCfg) {
            this.copyCfg(cameraCfg, this.cameraCfg);
        }
        this.camera.fov = this.cameraCfg.fov;
        this.camera.aspect = this.cameraCfg.aspect;
        this.camera.near = this.cameraCfg.near;
        this.camera.far = this.cameraCfg.far;
        this.camera.position.x = this.cameraCfg.position.x;
        this.camera.position.y = this.cameraCfg.position.y;
        this.camera.position.z = this.cameraCfg.position.z;
        //this.camera.lookAt(this.scene.position); //new THREE.Vector3(10, 0, 0)); //scene.position);
        this.cameraHelper = new THREE.CameraHelper(this.camera);
        this.cameraHelper.update();
        // this.add(this.cameraHelper, null, false, false);
        this.cameraHelper.visible = this.cameraCfg.showHelper;
    };
    WglUtil.prototype.setScene = function (sceneCfg) {
        if (this.glScene.fog) {
            this.glScene.fog = null;
        }
        if (sceneCfg) {
            this.copyCfg(sceneCfg, this.sceneCfg);
        }
        if (this.sceneCfg.useFog) {
            this.setFog(this.sceneCfg);
        }
        if (this.grid) {
            this.removeGridHelper();
        }
        if (this.sceneCfg.showGrid) {
            this.addGridHelper(this.sceneCfg);
        }
        if (this.axis) {
            this.removeAxisHelper();
        }
        if (this.sceneCfg.showAxis) {
            this.addAxisHelper(this.sceneCfg);
        }
    };
    WglUtil.prototype.convertHex = function (hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
        return result;
    };
    WglUtil.prototype.initStats = function () {
        this.stats = new stats_1.Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        var statsElem = document.getElementById(this.cfg.statsId);
        if (statsElem) {
            statsElem.appendChild(this.stats.domElement);
        }
        return this.stats;
    };
    WglUtil.prototype.initOrbit = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.orbitCfg);
        }
        // Orbit controls
        this.orbitControls = new OrbitControls(this.camera, this.glRenderer.domElement);
        this.orbitControls.minDistance = this.orbitCfg.minDistance;
        this.orbitControls.maxDistance = this.orbitCfg.maxDistance;
    };
    WglUtil.prototype.initTrackball = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.trackballCfg);
        }
        this.trackballControls = new TrackballControls(this.camera, this.glRenderer.domElement);
        this.trackballControls.rotateSpeed = this.trackballCfg.rotateSpeed;
        this.trackballControls.zoomSpeed = this.trackballCfg.zoomSpeed;
        this.trackballControls.panSpeed = this.trackballCfg.panSpeed;
        this.trackballControls.noZoom = this.trackballCfg.noZoom;
        this.trackballControls.noPan = this.trackballCfg.noPan;
        this.trackballControls.staticMoving = this.trackballCfg.staticMoving;
        this.trackballControls.dynamicDampingFactor = this.trackballCfg.dynamicDampingFactor;
        this.trackballControls.target.set(0, 0, 0);
    };
    WglUtil.prototype.initLeapCamera = function (cfg) {
        //if(cfg) {
        // this.copyCfg(cfg, this.leapCfg);
        //}
        // Leap camera controls
        this.leapCameraControls = new leapControls.LeapCameraControls(this.camera);
    };
    WglUtil.prototype.initDatGui = function () {
        this.guiControls = new function () {
            //this.prop = 0;
        };
        this.datGui = new dat.GUI();
        //datGui.add(controls, 'prop', 0, 0.5);
        return this.guiControls;
    };
    WglUtil.prototype.addGuiFolder = function (name) {
        var folder = this.datGui.addFolder(name);
        return folder;
    };
    WglUtil.prototype.addGuiProp = function (folder, propName, value, min, max, values) {
        this.guiControls[propName] = !cfg.U.isEmpty(value) ? value : '';
        if (folder) {
            if (!cfg.U.isEmpty(min) && !cfg.U.isEmpty(max))
                return folder.add(this.guiControls, propName, min, max);
            if (!cfg.U.isEmpty(min))
                return folder.add(this.guiControls, propName, min);
            if (values && values.length > 0)
                return folder.add(this.guiControls, propName, values);
            return folder.add(this.guiControls, propName);
        }
        else {
            return this.datGui.add(this.guiControls, propName, min, max);
        }
    };
    WglUtil.prototype.addGuiColorProp = function (folder, propName, value) {
        this.guiControls[propName] = value;
        if (folder) {
            return folder.addColor(this.guiControls, propName);
        }
        else {
            return this.datGui.add(this.guiControls, propName);
        }
    };
    WglUtil.prototype.addGuiMethod = function (folder, methodName) {
        var wglUtil = this;
        if (folder) {
            return folder.add(this.guiControls, methodName);
        }
        else {
            return this.datGui.add(this.guiControls, methodName);
        }
    };
    WglUtil.prototype.addGuiButton = function (folder, name, handler) {
        var obj = {};
        var wglUtil = this;
        var parent = this.parent;
        obj[name] = function () {
            handler(wglUtil, parent);
        };
        if (folder) {
            return folder.add(obj, name);
        }
        else {
            return this.datGui.add(obj, name);
        }
    };
    WglUtil.prototype.addGuiPropValues = function (folder, propName, value, values) {
        this.guiControls[propName] = value;
        if (folder) {
            return folder.add(this.guiControls, propName, values);
        }
        else {
            return this.datGui.add(this.guiControls, propName, values);
        }
    };
    WglUtil.prototype.refreshGui = function () {
        WglUtil.refreshDatGui(this.datGui);
        /*
        for (var i = 0; i < Object.keys(this.datGui.__folders).length; i++) {
            var key = Object.keys(this.datGui.__folders)[i];
            for (var j = 0; j < this.datGui.__folders[key].__controllers.length; j++) {
                this.datGui.__folders[key].__controllers[j].updateDisplay();
            }
        }
        */
    };
    WglUtil.refreshDatGui = function (datGui) {
        for (var i = 0; i < Object.keys(datGui.__folders).length; i++) {
            var key = Object.keys(datGui.__folders)[i];
            for (var j = 0; j < datGui.__folders[key].__controllers.length; j++) {
                datGui.__folders[key].__controllers[j].updateDisplay();
            }
        }
    };
    WglUtil.prototype.getGuiFolder = function (folderName) {
        for (var i = 0; i < Object.keys(this.datGui.__folders).length; i++) {
            var key = Object.keys(this.datGui.__folders)[i];
            if (key === folderName) {
                return this.datGui.__folders[i];
            }
        }
        return null;
    };
    WglUtil.prototype.getGuiController = function (folderName, propName) {
        var folder = this.getGuiFolder(folderName);
        if (folder) {
            for (var j = 0; j < folder.__controllers.length; j++) {
                if (folder.__controllers[j].property === propName) {
                    return folder.__controllers[j];
                }
            }
        }
        return null;
    };
    WglUtil.prototype.removeDatGuiFolder = function (name) {
        WglUtil.removeDatGuiFolder(this.datGui, name);
    };
    WglUtil.removeDatGuiFolder = function (datGui, name) {
        var folder = datGui.__folders[name];
        if (!folder) {
            return;
        }
        folder.close();
        datGui.__ul.removeChild(folder.domElement.parentNode);
        delete datGui.__folders[name];
        datGui.onResize();
    };
    WglUtil.prototype.addAxisHelper = function (sceneCfg) {
        if (this.axis) {
            this.removeAxisHelper();
        }
        if (sceneCfg) {
            this.copyCfg(sceneCfg, this.sceneCfg);
        }
        this.axis = new THREE.AxisHelper(this.sceneCfg.axisSize);
        this.glScene.add(this.axis);
        if (this.sceneCfg.useAxisArrows) {
            this.axisArrowX = this.addAxisArrow({ x: 1, y: 0, z: 0 });
            this.axisArrowY = this.addAxisArrow({ x: 0, y: 1, z: 0 });
            this.axisArrowZ = this.addAxisArrow({ x: 0, y: 0, z: 1 });
        }
    };
    WglUtil.prototype.addAxisArrow = function (axis) {
        if (this.sceneCfg.useAxisArrows) {
            var dir = new THREE.Vector3(axis.x, axis.y, axis.z);
            var origin = new THREE.Vector3(0, 0, 0);
            var length = this.sceneCfg.axisSize;
            var hex = 0xffffff;
            if (axis.x)
                hex = 0xff0000;
            if (axis.y)
                hex = 0x00ff00;
            if (axis.z)
                hex = 0x0000ff;
            var headLength = this.sceneCfg.axisArrowHeadLength;
            var arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex, headLength);
            this.glScene.add(arrowHelper);
            return arrowHelper;
        }
    };
    WglUtil.prototype.removeAxisHelper = function () {
        if (this.axis) {
            this.remove(this.axis);
            this.remove(this.axisArrowX);
            this.remove(this.axisArrowY);
            this.remove(this.axisArrowZ);
            this.axis = null;
        }
    };
    WglUtil.prototype.addDirLight = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.dirLightCfg);
        }
        var dirLightHelper = this.genDirLight(cfg);
        this.add(dirLightHelper.light, group);
        this.add(dirLightHelper, group);
        return dirLightHelper;
    };
    WglUtil.prototype.addPointLight = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.pointLightCfg);
        }
        var pointLightHelper = this.genPointLight(cfg);
        this.add(pointLightHelper.light, group);
        this.add(pointLightHelper, group);
        return pointLightHelper;
    };
    WglUtil.prototype.addHemisphereLight = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.hemisphereLightCfg);
        }
        var hemisphereLightHelper = this.genHemisphereLight(cfg);
        this.add(hemisphereLightHelper.light, group);
        this.add(hemisphereLightHelper, group);
        return hemisphereLightHelper;
    };
    WglUtil.prototype.addSpotLight = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.spotLightCfg);
        }
        var spotLightHelper = this.genSpotLight(cfg);
        this.add(spotLightHelper.light, group);
        this.add(spotLightHelper, group);
        return spotLightHelper;
    };
    WglUtil.prototype.getJson = function (group) {
        var json = {};
        try {
            if (group) {
                json = group.toJSON();
            }
            else {
                json = this.glScene.toJSON();
            }
        }
        catch (e) {
            json = { error: e };
        }
        return json;
    };
    WglUtil.prototype.onContentChanged = function (object, group, type) {
        var json = this.getJson(group);
        var canvas = document.getElementById(this.cfg.canvasId);
        if (!canvas)
            return;
        var args = new wgl_util_content_changed_args_1.WglUtilContentChangedArgs();
        args.group = group;
        args.object = object;
        args.json = json;
        args.type = type;
        this.contentChanged = new CustomEvent('contentChanged', { 'detail': args });
        canvas.dispatchEvent(this.contentChanged);
    };
    WglUtil.prototype.add = function (obj, group, raiseContentChanged, isSelectable) {
        if (raiseContentChanged === void 0) { raiseContentChanged = true; }
        if (isSelectable === void 0) { isSelectable = true; }
        if (group) {
            group.add(obj);
        }
        else {
            this.glScene.add(obj);
        }
        if (isSelectable) {
            this.objects.push(obj);
            if (obj.children.length > 0) {
                for (var _i = 0, _a = obj.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    this.objects.push(child);
                }
            }
            this.initLeapObjectControls(obj);
        }
        if (raiseContentChanged) {
            this.onContentChanged(obj, group, wgl_util_content_changed_args_1.ContentChangedType.add);
        }
    };
    WglUtil.prototype.addLight = function (lightHelper, group, raiseContentChanged, isSelectable) {
        if (raiseContentChanged === void 0) { raiseContentChanged = true; }
        if (isSelectable === void 0) { isSelectable = true; }
        if (lightHelper) {
            this.add(lightHelper.light, group, raiseContentChanged, isSelectable);
            if (lightHelper.visible) {
                this.add(lightHelper, group, raiseContentChanged, isSelectable);
            }
        }
    };
    WglUtil.prototype.remove = function (obj, group, raiseContentChanged) {
        if (raiseContentChanged === void 0) { raiseContentChanged = true; }
        if (group) {
            group.remove(obj);
        }
        else {
            this.glScene.remove(obj);
        }
        if (obj.geometry && obj.geometry.dispose)
            obj.geometry.dispose();
        if (obj.material) {
            if (obj.material.type !== 'MultiMaterial') {
                if (obj.material.dispose)
                    obj.material.dispose();
            }
            else {
                for (var _i = 0, _a = obj.material.materials; _i < _a.length; _i++) {
                    var mat = _a[_i];
                    if (mat.dispose)
                        mat.dispose();
                }
            }
        }
        var index = this.objects.indexOf(obj);
        if (index >= 0) {
            this.objects.splice(index, 1);
        }
        delete obj.userData;
        obj = null;
        if (raiseContentChanged) {
            this.onContentChanged(obj, group, wgl_util_content_changed_args_1.ContentChangedType.delete);
        }
    };
    WglUtil.prototype.removeLight = function (lightHelper, group, raiseContentChanged) {
        if (raiseContentChanged === void 0) { raiseContentChanged = true; }
        if (lightHelper) {
            this.remove(lightHelper.light, group, raiseContentChanged);
            this.remove(lightHelper, group, raiseContentChanged);
        }
    };
    WglUtil.prototype.clear = function (group) {
        var container = group ? group : this.glScene;
        while (container.children.length > 0) {
            container.remove(container.children[container.children.length - 1]);
        }
        this.onContentChanged(null, group, wgl_util_content_changed_args_1.ContentChangedType.clear);
    };
    WglUtil.prototype.genPlaneGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.planeCfg);
        }
        var geomPlane = new THREE.PlaneGeometry(this.planeCfg.width, this.planeCfg.height, this.planeCfg.widthSegments, this.planeCfg.heightSegments);
        return geomPlane;
    };
    WglUtil.prototype.genCircleGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.circleCfg);
        }
        var geomCircle;
        if (this.circleCfg.thetaStart && this.circleCfg.thetaLength) {
            geomCircle = new THREE.CircleGeometry(this.circleCfg.radius, this.circleCfg.segments, this.circleCfg.thetaStart, this.circleCfg.thetaLength);
        }
        else {
            geomCircle = new THREE.CircleGeometry(this.circleCfg.radius, this.circleCfg.segments);
        }
        return geomCircle;
    };
    WglUtil.prototype.genCubeGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.cubeCfg);
        }
        var geomCube = new THREE.BoxGeometry(this.cubeCfg.width, this.cubeCfg.height, this.cubeCfg.depth);
        if (this.cubeCfg.widthSegments) {
            geomCube.parameters.widthSegments = this.cubeCfg.widthSegments;
        }
        if (this.cubeCfg.heightSegments) {
            geomCube.parameters.heightSegments = this.cubeCfg.heightSegments;
        }
        if (this.cubeCfg.depthSegments) {
            geomCube.parameters.depthSegments = this.cubeCfg.depthSegments;
        }
        return geomCube;
    };
    WglUtil.prototype.genSphereGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.sphereCfg);
        }
        var geomSphere;
        if (this.sphereCfg.phiStart && this.sphereCfg.phiLength && this.sphereCfg.thetaStart && this.sphereCfg.thetaLength) {
            geomSphere = new THREE.SphereGeometry(this.sphereCfg.radius, this.sphereCfg.widthSegments, this.sphereCfg.heightSegments, this.sphereCfg.phiStart, this.sphereCfg.phiLength, this.sphereCfg.thetaStart, this.sphereCfg.thetaLength);
            return geomSphere;
        }
        if (this.sphereCfg.phiStart && this.sphereCfg.phiLength) {
            geomSphere = new THREE.SphereGeometry(this.sphereCfg.radius, this.sphereCfg.widthSegments, this.sphereCfg.heightSegments, this.sphereCfg.phiStart, this.sphereCfg.phiLength);
            return geomSphere;
        }
        geomSphere = new THREE.SphereGeometry(this.sphereCfg.radius, this.sphereCfg.widthSegments, this.sphereCfg.heightSegments);
        return geomSphere;
    };
    WglUtil.prototype.genCylinderGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.cylinderCfg);
        }
        var geomCylinder = new THREE.CylinderGeometry(this.cylinderCfg.radiusTop, this.cylinderCfg.radiusBottom, this.cylinderCfg.height, this.cylinderCfg.radiusSegments, this.cylinderCfg.heightSegments, this.cylinderCfg.openEnded, this.cylinderCfg.thetaStart, this.cylinderCfg.thetaLength);
        //cylinderCfg.segmentsX, cylinderCfg.segmentsY);
        geomCylinder.height = this.cylinderCfg.height;
        return geomCylinder;
    };
    WglUtil.prototype.genTorusGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.torusCfg);
        }
        var geomTorus = new THREE.TorusGeometry(this.torusCfg.radius, this.torusCfg.tube, this.torusCfg.radialSegments, this.torusCfg.tubularSegments, this.torusCfg.arc);
        return geomTorus;
    };
    WglUtil.prototype.genTorusKnotGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.torusKnotCfg);
        }
        var geomTorusKnot = new THREE.TorusKnotGeometry(this.torusKnotCfg.radius, this.torusKnotCfg.tube, this.torusKnotCfg.radialSegments, this.torusKnotCfg.tubularSegments, this.torusKnotCfg.p, this.torusKnotCfg.q);
        return geomTorusKnot;
    };
    WglUtil.prototype.genLineGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.lineCfg);
        }
        var geomLine = new THREE.Geometry();
        geomLine.vertices.push(new THREE.Vector3(this.lineCfg.start.x, this.lineCfg.start.y, this.lineCfg.start.z), new THREE.Vector3(this.lineCfg.end.x, this.lineCfg.end.y, this.lineCfg.end.z));
        return geomLine;
    };
    WglUtil.prototype.genTextGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.textCfg);
        }
        var textGeom = new THREE.TextGeometry(this.textCfg.text, {
            size: this.textCfg.size,
            height: this.textCfg.height,
            curveSegments: this.textCfg.curveSegments,
            font: this.textCfg.font,
            weight: this.textCfg.weight,
            style: this.textCfg.style,
            bevelThickness: this.textCfg.bevelThickness,
            bevelSize: this.textCfg.bevelSize,
            bevelEnabled: this.textCfg.bevelEnabled,
            material: this.textCfg.material,
            extrudeMaterial: this.textCfg.extrudeMaterial
        });
        textGeom.computeBoundingBox();
        textGeom.computeVertexNormals();
        this.textCfg.geometry = textGeom;
        // 'fix' side normals by removing z-component of normals for side faces
        // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
        if (!this.textCfg.bevelEnabled) {
            console.log('bevel disabled not yet supported');
            return textGeom;
        }
        return textGeom;
    };
    WglUtil.prototype.genParticleGeom = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.particleCfg);
        }
        var geom = new THREE.Geometry();
        var range = this.particleCfg.range;
        for (var i = 0; i < this.particleCfg.count; i++) {
            var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
            particle.userData = 'Particle ' + i;
            geom.vertices.push(particle);
            var color = new THREE.Color(0x00FF00);
            //color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
            color.setHSL(Math.random(), 1.0, 0.5);
            geom.colors.push(color);
        }
        return geom;
    };
    WglUtil.prototype.genMeshBasicMat = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.matCfg);
        }
        var matCube = new THREE.MeshBasicMaterial({ color: this.matCfg.color, wireframe: this.matCfg.wireframe });
        return matCube;
    };
    WglUtil.prototype.genMeshLambertMat = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.matCfg);
        }
        var matCube = new THREE.MeshLambertMaterial({ color: this.matCfg.color, wireframe: this.matCfg.wireframe });
        return matCube;
    };
    WglUtil.prototype.genMeshPhongMat = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.matCfg);
        }
        var matCube = new THREE.MeshPhongMaterial({ color: this.matCfg.color, wireframe: this.matCfg.wireframe });
        return matCube;
    };
    WglUtil.prototype.genLineBasicMat = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.matCfg);
        }
        var matLine = new THREE.LineBasicMaterial({ color: this.matCfg.color });
        return matLine;
    };
    WglUtil.prototype.genLineDashedMat = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.matCfg);
        }
        var matLine = new THREE.LineDashedMaterial({ color: this.matCfg.color });
        return matLine;
    };
    WglUtil.prototype.genTextMat = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.textCfg);
        }
        var mat = new THREE.MultiMaterial([
            new THREE.MeshPhongMaterial({ color: this.textCfg.frontColor !== null ? this.textCfg.frontColor : Math.random() * 0xffffff, shading: THREE.FlatShading }),
            new THREE.MeshPhongMaterial({ color: this.textCfg.sideColor !== null ? this.textCfg.sideColor : 0xffffff, shading: THREE.SmoothShading }) // side
        ]);
        if (this.textCfg.textMaterial == null) {
            this.textCfg.textMaterial = mat;
        }
        return mat;
    };
    WglUtil.prototype.genParticleMat = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.particleCfg);
        }
        var material = new THREE.PointsMaterial({
            size: this.particleCfg.size,
            transparent: this.particleCfg.transparent,
            opacity: this.particleCfg.opacity,
            vertexColors: THREE.VertexColors,
            sizeAttenuation: this.particleCfg.sizeAttenuation,
            //color: particleCfg.color
            //, map: THREE.ImageUtils.loadTexture('assets/textures/heart2.png'),
            blending: THREE.AdditiveBlending,
            alphaTest: 0.5
        });
        return material;
    };
    WglUtil.prototype.genSpriteMat = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.spriteCfg);
        }
        var oCfg = {};
        if (this.spriteCfg.map)
            oCfg['map'] = this.spriteCfg.map;
        if (this.spriteCfg.color)
            oCfg['color'] = this.spriteCfg.color;
        var mat = new THREE.SpriteMaterial(oCfg);
        return mat;
    };
    WglUtil.prototype.genPointLight = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.pointLightCfg);
        }
        var pointLight = new THREE.PointLight(this.pointLightCfg.color, this.pointLightCfg.intensity, this.pointLightCfg.distance);
        pointLight.position.set(this.pointLightCfg.position.x, this.pointLightCfg.position.y, this.pointLightCfg.position.z);
        this.pointLightCfg.helper = new THREE.PointLightHelper(pointLight, this.pointLightCfg.helperSphereSize);
        this.pointLightCfg.helper.visible = this.pointLightCfg.showHelper;
        return this.pointLightCfg.helper;
    };
    WglUtil.prototype.genDirLight = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.dirLightCfg);
        }
        var dirLight = new THREE.DirectionalLight(this.dirLightCfg.color, this.dirLightCfg.intensity);
        dirLight.position.set(this.dirLightCfg.position.x, this.dirLightCfg.position.y, this.dirLightCfg.position.z);
        dirLight.shadow.camera.fov = this.dirLightCfg.shadowCameraFov;
        dirLight.castShadow = this.dirLightCfg.castShadow;
        this.dirLightCfg.helper = new THREE.DirectionalLightHelper(dirLight, this.dirLightCfg.size);
        this.dirLightCfg.helper.visible = this.dirLightCfg.showHelper;
        return this.dirLightCfg.helper;
    };
    WglUtil.prototype.genHemisphereLight = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.hemisphereLightCfg);
        }
        var hempisphereLight = new THREE.HemisphereLight(this.hemisphereLightCfg.skyColor, this.hemisphereLightCfg.groundColor, this.hemisphereLightCfg.intensity);
        hempisphereLight.position.set(this.hemisphereLightCfg.position.x, this.hemisphereLightCfg.position.y, this.hemisphereLightCfg.position.z);
        this.hemisphereLightCfg.helper = new THREE.HemisphereLightHelper(hempisphereLight, this.hemisphereLightCfg.helperSphereSize);
        this.hemisphereLightCfg.helper.visible = this.hemisphereLightCfg.showHelper;
        return this.hemisphereLightCfg.helper;
    };
    WglUtil.prototype.genSpotLight = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.spotLightCfg);
        }
        var spotLight = new THREE.SpotLight(this.spotLightCfg.color, this.spotLightCfg.intensity, this.spotLightCfg.distance);
        spotLight.position.set(this.spotLightCfg.position.x, this.spotLightCfg.position.y, this.spotLightCfg.position.z);
        this.spotLightCfg.helper = new THREE.SpotLightHelper(spotLight);
        this.spotLightCfg.helper.visible = this.spotLightCfg.showHelper;
        return this.spotLightCfg.helper;
    };
    WglUtil.prototype.addLine = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.lineCfg);
        }
        var geomLine = this.genLineGeom(cfg);
        var matLine = this.genLineBasicMat(cfg);
        var line = new THREE.Line(geomLine, matLine);
        this.add(line, group);
        return line;
    };
    WglUtil.prototype.addPlane = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.planeCfg);
        }
        // var geomPlane = new THREE.PlaneBufferGeometry(this.planeCfg.width, this.planeCfg.height, this.planeCfg.widthSegments, this.planeCfg.heightSegments);
        var geomPlane = this.genPlaneGeom(cfg);
        var matPlane = this.genMeshBasicMat(cfg);
        var plane = new THREE.Mesh(geomPlane, matPlane);
        //plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = this.planeCfg.position.x;
        plane.position.y = this.planeCfg.position.y;
        plane.position.z = this.planeCfg.position.z;
        plane.receiveShadow = this.planeCfg.receiveShadow;
        this.add(plane, group);
        return plane;
    };
    WglUtil.prototype.addCircle = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.circleCfg);
        }
        var geomCircle = this.genCircleGeom(cfg);
        var matCircle = this.genMeshBasicMat(cfg);
        var circle = new THREE.Mesh(geomCircle, matCircle);
        circle.position.x = this.circleCfg.position.x;
        circle.position.y = this.circleCfg.position.y;
        circle.position.z = this.circleCfg.position.z;
        circle.castShadow = this.circleCfg.castShadow;
        if (this.circleCfg.rotation) {
            circle.rotation.x = this.circleCfg.rotation.x;
            circle.rotation.y = this.circleCfg.rotation.y;
            circle.rotation.z = this.circleCfg.rotation.z;
        }
        this.add(circle, group);
        return circle;
    };
    WglUtil.prototype.addCube = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.cubeCfg);
        }
        var geomCube = this.genCubeGeom(cfg); // new THREE.BoxGeometry(cubeCfg.width, cubeCfg.height, cubeCfg.depth);
        var matCube = this.genMeshBasicMat(cfg);
        var cube = new THREE.Mesh(geomCube, matCube);
        cube.position.x = this.cubeCfg.position.x;
        cube.position.y = this.cubeCfg.position.y;
        cube.position.z = this.cubeCfg.position.z;
        cube.castShadow = this.cubeCfg.castShadow;
        if (this.cubeCfg.rotation) {
            cube.rotation.x = this.cubeCfg.rotation.x;
            cube.rotation.y = this.cubeCfg.rotation.y;
            cube.rotation.z = this.cubeCfg.rotation.z;
        }
        this.add(cube, group);
        return cube;
    };
    WglUtil.prototype.addSphere = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.sphereCfg);
        }
        var geomSphere = this.genSphereGeom(cfg); // new THREE.SphereGeometry(sphereCfg.radius, sphereCfg.widthSegments, sphereCfg.heightSegments);
        var matSphere = this.genMeshBasicMat(cfg);
        var sphere = new THREE.Mesh(geomSphere, matSphere);
        sphere.position.x = this.sphereCfg.position.x;
        sphere.position.y = this.sphereCfg.position.y;
        sphere.position.z = this.sphereCfg.position.z;
        sphere.castShadow = this.sphereCfg.castShadow;
        this.add(sphere, group);
        return sphere;
    };
    WglUtil.prototype.addCylinder = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.cylinderCfg);
        }
        var geomCylinder = this.genCylinderGeom(cfg);
        var matCylinder = this.genMeshBasicMat(cfg);
        var cylinder = new THREE.Mesh(geomCylinder, matCylinder);
        cylinder.position.x = this.cylinderCfg.position.x;
        cylinder.position.y = this.cylinderCfg.position.y;
        cylinder.position.z = this.cylinderCfg.position.z;
        cylinder.castShadow = this.cylinderCfg.castShadow;
        this.add(cylinder, group);
        return cylinder;
    };
    WglUtil.prototype.addTorus = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.torusCfg);
        }
        var geomTorus = this.genTorusGeom(cfg);
        var matTorus = this.genMeshBasicMat(cfg);
        var torus = new THREE.Mesh(geomTorus, matTorus);
        this.add(torus, group);
        return torus;
    };
    WglUtil.prototype.addTorusKnot = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.torusCfg);
        }
        var geomTorusKnot = this.genTorusKnotGeom(cfg);
        var matTorusKnot = this.genMeshBasicMat(cfg);
        var torusKnot = new THREE.Mesh(geomTorusKnot, matTorusKnot);
        this.add(torusKnot, group);
        return torusKnot;
    };
    WglUtil.prototype.addParticles = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.particleCfg);
        }
        var geom = this.genParticleGeom(cfg);
        var material = this.genParticleMat(cfg);
        var system = new THREE.Points(geom, material);
        this.add(system, group);
        return system;
    };
    WglUtil.prototype.addSprite = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.spriteCfg);
        }
        var matSprite = this.genSpriteMat(cfg);
        var sprite = new THREE.Sprite(matSprite);
        sprite.position.x = this.spriteCfg.position.x;
        sprite.position.y = this.spriteCfg.position.y;
        sprite.position.z = this.spriteCfg.position.z;
        this.add(sprite, group);
        return sprite;
    };
    WglUtil.prototype.addTextSprite = function (spriteCfg, textureCfg, group) {
        var texture = this.createCanvasTexture(null, textureCfg);
        spriteCfg.map = texture;
        var matSprite = this.genSpriteMat(spriteCfg);
        var sprite = new THREE.Sprite(matSprite);
        var textObject = new THREE.Object3D();
        var textWidth = textureCfg.canvas.width;
        var textHeight = textureCfg.canvas.height;
        var fontSize = textureCfg.canvas.fontSize;
        textObject.textHeight = fontSize;
        textObject.textWidth = (textWidth / textHeight) * textObject.textHeight;
        sprite.scale.set(textWidth / textHeight * fontSize, fontSize, 1);
        //  sprite.position.set(10,10,0);
        textObject.add(sprite);
        this.add(textObject, group);
        sprite.position.x = spriteCfg.position.x;
        sprite.position.y = spriteCfg.position.y;
        sprite.position.z = spriteCfg.position.z;
        // this.add(sprite, group);
        // return textObject;
        return sprite;
    };
    WglUtil.prototype.addMesh = function (geom, mat, group) {
        var mesh = new THREE.Mesh(geom, mat);
        this.add(mesh, group);
        return mesh;
    };
    WglUtil.prototype.addParticleMesh = function (geom, mat, group) {
        var particles = new THREE.Points(geom, mat);
        this.add(particles, group);
        return particles;
    };
    WglUtil.prototype.setAsciiEffect = function () {
        this.asciiEffect = new AsciiEffect(this.glRenderer);
        this.asciiEffect.setSize(window.innerWidth, window.innerHeight);
        var canvas = document.getElementById(this.cfg.canvasId);
        while (canvas.children.length > 0) {
            canvas.removeChild(canvas.children[0]);
        }
        canvas.appendChild(this.asciiEffect.domElement);
    };
    WglUtil.prototype.setAnaglyphEffect = function () {
        var width = window.innerWidth || 2;
        var height = window.innerHeight || 2;
        this.anaglyphEffect = new AnaglyphEffect(this.glRenderer, this.cfg.anaglyphFocalLength, window.innerWidth, window.innerHeight);
        this.anaglyphEffect.setSize(width, height);
        var canvas = document.getElementById(this.cfg.canvasId);
        canvas.appendChild(this.glRenderer.domElement);
    };
    WglUtil.prototype.setStereoEffect = function () {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.stereoEffect = new StereoEffect(this.glRenderer);
        this.stereoEffect.eyeSeparation = 1;
        this.stereoEffect.setSize(width, height);
        var canvas = document.getElementById(this.cfg.canvasId);
        canvas.appendChild(this.glRenderer.domElement);
    };
    WglUtil.prototype.unsetEffects = function () {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.glRenderer.setViewport(0, 0, width, height);
    };
    WglUtil.prototype.setFog = function (sceneConfig) {
        if (this.glScene.fog) {
            this.glScene.fog;
            this.glScene.fog = null;
        }
        if (sceneConfig) {
            this.copyCfg(sceneConfig, this.sceneCfg);
        }
        if (this.sceneCfg.useFog) {
            this.glScene.fog = new THREE.FogExp2(this.sceneCfg.fogColor, this.sceneCfg.fogMistDensity);
        }
    };
    WglUtil.prototype.genPoints = function (numPoints, cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.pointsCfg);
        }
        var points = [];
        for (var i = 0; i < numPoints; i++) {
            var randomX = this.pointsCfg.offset.x + Math.round(Math.random() * this.pointsCfg.step.x);
            var randomY = this.pointsCfg.offset.y + Math.round(Math.random() * this.pointsCfg.step.y);
            var randomZ = this.pointsCfg.offset.z + Math.round(Math.random() * this.pointsCfg.step.z);
            points.push(new THREE.Vector3(randomX, randomY, randomZ));
        }
        var spGroup = new THREE.Object3D(); // Group(); //Object3D();
        var material = new THREE.MeshBasicMaterial({ color: this.pointsCfg.color, transparent: this.pointsCfg.transparent });
        var spGeom = new THREE.SphereGeometry(this.pointsCfg.radius);
        for (var i = 0; i < points.length; i++) {
            var material = new THREE.MeshBasicMaterial({ color: this.pointsCfg.color, transparent: this.pointsCfg.transparent });
            var point = points[i];
            var spMesh = new THREE.Mesh(spGeom, material);
            spMesh.position.x = point.x;
            spMesh.position.y = point.y;
            spMesh.position.z = point.z;
            spGroup.add(spMesh);
        }
        this.add(spGroup, group);
        return spGroup;
    };
    WglUtil.prototype.rotate = function (obj, rotationSpeed) {
        if (typeof (rotationSpeed) === 'object') {
            if (rotationSpeed.hasOwnProperty('x'))
                obj.rotation.x += rotationSpeed.x;
            if (rotationSpeed.hasOwnProperty('y'))
                obj.rotation.y += rotationSpeed.y;
            if (rotationSpeed.hasOwnProperty('z'))
                obj.rotation.z += rotationSpeed.z;
        }
        else {
            if (typeof (rotationSpeed) === 'number') {
                obj.rotation.x += rotationSpeed;
                obj.rotation.y += rotationSpeed;
                obj.rotation.z += rotationSpeed;
            }
        }
    };
    WglUtil.prototype.createTextureMaterial = function (imageFile, cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.textureCfg);
        }
        var fileUrl;
        if (imageFile.startsWith('http')) {
            fileUrl = imageFile;
        }
        else {
            fileUrl = this.textureCfg.srcDir + encodeURIComponent(imageFile);
        }
        var loader = new THREE.TextureLoader();
        var texture = loader.load(fileUrl); //THREE.ImageUtils.loadTexture(fileUrl);
        texture.minFilter = THREE.LinearFilter;
        var mat = new THREE.MeshPhongMaterial();
        mat.map = texture;
        return mat;
    };
    WglUtil.prototype.createTextureMaterials = function (imageFiles, cfg) {
        var materials = [];
        for (var i = 0; i < imageFiles.length; i++) {
            materials.push(this.createTextureMaterial(imageFiles[i], cfg));
        }
        if (imageFiles.length < 6) {
            for (var i_1 = imageFiles.length; i_1 < 6; i_1++) {
                materials.push(new THREE.MeshBasicMaterial());
            }
        }
        var material = new THREE.MultiMaterial(materials);
        return material;
    };
    WglUtil.prototype.createVideoTextureMaterial = function (imageFile, cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.textureCfg);
        }
        var fileUrl;
        if (imageFile.startsWith('http')) {
            fileUrl = imageFile;
        }
        else {
            fileUrl = this.textureCfg.srcDir + encodeURIComponent(imageFile);
        }
        var video = document.createElement('video');
        video.width = this.textureCfg.width;
        video.height = this.textureCfg.height;
        video.autoplay = this.textureCfg.autoplay;
        video.loop = this.textureCfg.loop;
        video.src = fileUrl;
        this.textureCfg.video = video;
        if (cfg)
            cfg.video = video;
        var texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        this.textureCfg.texture = texture;
        var mat = new THREE.MeshBasicMaterial({ map: texture });
        return mat;
    };
    WglUtil.prototype.createCanvasTexture = function (imageFile, cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.textureCfg);
        }
        var canvas1 = document.createElement('canvas');
        canvas1.width = this.textureCfg.canvas.width;
        canvas1.height = this.textureCfg.canvas.height;
        var context1 = canvas1.getContext('2d');
        var fileUrl;
        if (imageFile) {
            if (imageFile.startsWith('http')) {
                fileUrl = imageFile;
            }
            else {
                fileUrl = this.textureCfg.srcDir + encodeURIComponent(imageFile);
            }
            var backgroundImage = new Image();
            backgroundImage.src = fileUrl;
            context1.drawImage(backgroundImage, 0, 0);
            context1.fillRect(0, 0, canvas1.width, canvas1.height);
        }
        context1.fillStyle = this.textureCfg.canvas.backgroundColor; // this.convertHex(0xFF0000.toString(16), 100); //'rgba(255, 0, 0, 1)';
        context1.fillRect(0, 0, canvas1.width, canvas1.height);
        context1.font = this.textureCfg.canvas.font;
        context1.fillStyle = this.textureCfg.canvas.textColor; //this.convertHex(textureCfg.canvas.textColor.toString(16), 100); //'rgba(255, 0, 0, 1)';
        context1.textAlign = this.textureCfg.canvas.textAlign;
        context1.textBaseline = this.textureCfg.canvas.textBaseline;
        /*
        var textWidth = context1.measureText(this.textureCfg.canvas.text).width;
        context1.fillText(this.textureCfg.canvas.text, (canvas1.width - textWidth) / 2, (canvas1.height + parseInt(this.textureCfg.canvas.font)) / 2);
        */
        context1.fillText(this.textureCfg.canvas.text, canvas1.width / 2, canvas1.height / 2);
        // canvas contents will be used for a texture
        var texture1 = new THREE.Texture(canvas1);
        texture1.generateMipmaps = false;
        texture1.minFilter = THREE.LinearFilter;
        //texture1.magFilter = THREE.LinearFilter;
        texture1.needsUpdate = true;
        return texture1;
    };
    WglUtil.prototype.createCanvasTextureMaterial = function (imageFile, cfg) {
        var texture1 = this.createCanvasTexture(imageFile, cfg);
        var mat = new THREE.MeshPhongMaterial({ map: texture1, side: THREE.DoubleSide });
        mat.transparent = true;
        return mat;
    };
    WglUtil.prototype.createMesh = function (geom, mat, imageFile, cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.textureCfg);
        }
        if (!mat) {
            mat = this.createTextureMaterial(imageFile, cfg);
        }
        var mesh = new THREE.Mesh(geom, mat);
        mesh.position.x = this.textureCfg.position.x;
        mesh.position.y = this.textureCfg.position.y;
        mesh.position.z = this.textureCfg.position.z;
        return mesh;
    };
    WglUtil.prototype.createParticleMesh = function (geom, mat) {
        var particles = new THREE.Points(geom, mat);
        return particles;
    };
    WglUtil.prototype.genShaderMaterial = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.shadersCfg);
        }
        var vShaderElem = document.getElementById(this.shadersCfg.vertexShaderId);
        var vShader = '';
        if (vShaderElem)
            vShader = vShaderElem.innerText;
        var fShaderElem = document.getElementById(this.shadersCfg.fragmentShaderId);
        var fShader = '';
        if (fShaderElem)
            fShader = fShaderElem.innerText;
        var mat = new THREE.ShaderMaterial({
            uniforms: this.shadersCfg.uniforms,
            //attributes: shadersCfg.attributes,
            vertexShader: vShader,
            fragmentShader: fShader,
        });
        return mat;
    };
    WglUtil.prototype.loadShaderFile = function (shaderFile, loadHandler) {
        var fileUrl;
        if (shaderFile.startsWith('http')) {
            fileUrl = shaderFile;
        }
        else {
            fileUrl = this.shadersCfg.srcDir + encodeURIComponent(shaderFile);
        }
        this.getUrl(fileUrl, function (data) {
            if (loadHandler) {
                loadHandler(data);
            }
        });
    };
    WglUtil.prototype.addSkyBoxFromFile = function (cfg, group) {
        var _this = this;
        if (cfg) {
            this.copyCfg(cfg, this.skyBoxCfg);
        }
        var cubeMap = new THREE.CubeTexture([]);
        cubeMap.format = THREE.RGBFormat;
        var loader = new THREE.ImageLoader();
        loader.load(this.skyBoxCfg.srcFile, function (image) {
            var getSide = function (x, y) {
                var size = _this.skyBoxCfg.size ? _this.skyBoxCfg.size : 1024;
                var canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                var context = canvas.getContext('2d');
                context.drawImage(image, -x * size, -y * size);
                return canvas;
            };
            cubeMap.images[0] = getSide(2, 1); // px
            cubeMap.images[1] = getSide(0, 1); // nx
            cubeMap.images[2] = getSide(1, 0); // py
            cubeMap.images[3] = getSide(1, 2); // ny
            cubeMap.images[4] = getSide(1, 1); // pz
            cubeMap.images[5] = getSide(3, 1); // nz
            cubeMap.needsUpdate = true;
        });
        var cubeShader = THREE.ShaderLib['cube'];
        cubeShader.uniforms['tCube'].value = cubeMap;
        var skyBoxMaterial = new THREE.ShaderMaterial({
            fragmentShader: cubeShader.fragmentShader,
            vertexShader: cubeShader.vertexShader,
            uniforms: cubeShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });
        var skyBox = new THREE.Mesh(new THREE.BoxGeometry(this.skyBoxCfg.width, this.skyBoxCfg.height, this.skyBoxCfg.depth), skyBoxMaterial);
        this.add(skyBox, group);
        return skyBox;
    };
    WglUtil.prototype.addSkyBoxFromFiles = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.skyBoxCfg);
        }
        var path = this.skyBoxCfg.srcDir;
        var urls = [
            path + this.skyBoxCfg.px, path + this.skyBoxCfg.nx,
            path + this.skyBoxCfg.py, path + this.skyBoxCfg.ny,
            path + this.skyBoxCfg.pz, path + this.skyBoxCfg.nz
        ];
        var skyBox;
        var cubeMap = new THREE.CubeTexture([]);
        //var textureCube = THREE.ImageUtils.loadTextureCube(urls);
        var loader = new THREE.CubeTextureLoader();
        loader.load(urls, function (textureCube) {
            //var material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube });
            cubeMap = textureCube;
            var shader = THREE.ShaderLib['cube'];
            shader.uniforms['tCube'].value = cubeMap;
            var material = new THREE.ShaderMaterial({
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                side: THREE.BackSide
            });
            skyBox = new THREE.Mesh(new THREE.BoxGeometry(this.skyBoxCfg.width, this.skyBoxCfg.height, this.skyBoxCfg.depth), material);
            this.add(skyBox, group);
        });
        //TODO: undefined, need to ensure it's valid object.
        return skyBox;
    };
    WglUtil.prototype.loadObjModel = function (cfg, objModelFile, textureFile, onLoad, onProgress, onError) {
        if (cfg) {
            this.copyCfg(cfg, this.objModelCfg);
        }
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            //console.log( item, loaded, total );
        };
        var texture = new THREE.Texture();
        var txetureLoader = new THREE.ImageLoader(manager);
        txetureLoader.load(this.objModelCfg.srcDir + textureFile, function (image) {
            texture.image = image;
            texture.needsUpdate = true;
        });
        var loader = new THREE.OBJLoader(manager);
        loader.load(this.objModelCfg.srcDir + objModelFile, function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
            });
            if (onLoad) {
                onLoad(object);
            }
        }, function (xhr) {
            if (onProgress) {
                onProgress(xhr);
            }
        }, function (xhr) {
            if (onError) {
                onError(xhr);
            }
        });
    };
    WglUtil.prototype.loadObjMtlModel = function (cfg, objModelFile, mtlFile, onLoad, onProgress, onError) {
        if (cfg) {
            this.copyCfg(cfg, this.objModelCfg);
        }
        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
        var loader = new THREE.OBJMTLLoader();
        loader.load(this.objModelCfg.srcDir + objModelFile, this.objModelCfg.srcDir + mtlFile, function (object) {
            if (onLoad) {
                onLoad(object);
            }
        }, function (xhr) {
            if (onProgress) {
                onProgress(xhr);
            }
        }, function (xhr) {
            if (onError) {
                onError(xhr);
            }
        });
    };
    WglUtil.prototype.createText = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.textCfg);
        }
        var textGeom = this.genTextGeom(cfg);
        var mat = this.genTextMat(cfg);
        var centerOffset = -0.5 * (textGeom.boundingBox.max.x - textGeom.boundingBox.min.x);
        var textMesh1 = new THREE.Mesh(textGeom, mat);
        textMesh1.position.x = centerOffset + this.textCfg.offsetX;
        textMesh1.position.y = this.textCfg.hover;
        textMesh1.position.z = 0;
        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;
        this.textCfg.textMesh = textMesh1;
        if (cfg)
            cfg.textMesh = textMesh1;
        if (this.textCfg.useMirror) {
            var textMesh2 = new THREE.Mesh(textGeom, mat);
            textMesh2.position.x = centerOffset + this.textCfg.offsetX;
            textMesh2.position.y = -this.textCfg.hover;
            textMesh2.position.z = this.textCfg.height;
            textMesh2.rotation.x = Math.PI;
            textMesh2.rotation.y = Math.PI * 2;
            this.textCfg.textMeshMirror = textMesh2;
            if (cfg)
                cfg.textMeshMirror = textMesh2;
        }
        return textMesh1;
    };
    WglUtil.prototype.createTextMaterial = function (color1, color2) {
        var mat = new THREE.MultiMaterial([
            new THREE.MeshPhongMaterial({ color: color1 ? color1 : Math.random() * 0xffffff, shading: THREE.FlatShading }),
            new THREE.MeshPhongMaterial({ color: color2 ? color2 : 0xffffff, shading: THREE.SmoothShading }) // side
        ]);
        return mat;
    };
    WglUtil.prototype.centerMeshX = function (mesh, offsetX) {
        var geom = mesh.geometry;
        var centerOffset = -0.5 * (geom.boundingBox.max.x - geom.boundingBox.min.x);
        mesh.position.x = centerOffset + (offsetX ? offsetX : 0);
    };
    WglUtil.prototype.centerMeshY = function (mesh, offsetY) {
        var geom = mesh.geometry;
        var centerOffset = -0.5 * (geom.boundingBox.max.y - geom.boundingBox.min.y);
        mesh.position.y = centerOffset + (offsetY ? offsetY : 0);
    };
    WglUtil.prototype.centerMeshZ = function (mesh, offsetZ) {
        var geom = mesh.geometry;
        var centerOffset = -0.5 * (geom.boundingBox.max.z - geom.boundingBox.min.z);
        mesh.position.z = centerOffset + (offsetZ ? offsetZ : 0);
    };
    // birds
    WglUtil.prototype.animateBirds = function () {
        if (!this.birds) {
            return;
        }
        var boid;
        var bird;
        var color;
        for (var i = 0, il = this.birds.length; i < il; i++) {
            boid = this.boids[i];
            boid.run(this.boids);
            bird = this.birds[i];
            bird.position.copy(this.boids[i].position);
            color = bird.material.color;
            color.r = color.g = color.b = (500 - bird.position.z) / 1000;
            bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
            bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());
            bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
            bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;
        }
    };
    WglUtil.prototype.initBirds = function (cfg, group) {
        if (cfg) {
            this.copyCfg(cfg, this.birdsCfg);
        }
        this.birds = [];
        this.boids = [];
        var boid, bird;
        for (var i = 0; i < this.birdsCfg.count; i++) {
            boid = this.boids[i] = new boid_1.Boid();
            boid.position.x = Math.random() * 400 - 200;
            boid.position.y = Math.random() * 400 - 200;
            boid.position.z = Math.random() * 400 - 200;
            boid.velocity.x = Math.random() * 2 - 1;
            boid.velocity.y = Math.random() * 2 - 1;
            boid.velocity.z = Math.random() * 2 - 1;
            boid.setAvoidWalls(this.birdsCfg.avoidWalls);
            boid.setWorldSize(this.birdsCfg.worldSize.width, this.birdsCfg.worldSize.height, this.birdsCfg.worldSize.depth);
            bird = this.birds[i] = new THREE.Mesh(new bird_1.Bird(), new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, side: THREE.DoubleSide }));
            bird.phase = Math.floor(Math.random() * 62.83);
            bird.scale.set(this.birdsCfg.scale, this.birdsCfg.scale, this.birdsCfg.scale);
            this.add(bird, group);
        }
    };
    WglUtil.prototype.repulseBoids = function (vector) {
        if (!this.boids) {
            return;
        }
        var boid;
        for (var i = 0, il = this.boids.length; i < il; i++) {
            boid = this.boids[i];
            vector.z = boid.position.z;
            boid.repulse(vector);
        }
    };
    // window resize
    WglUtil.prototype.windowResize = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.glRenderer.setSize(window.innerWidth, window.innerHeight);
        if (this.cfg.useCssRender) {
            this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
        }
        this.render();
    };
    WglUtil.prototype.addSelectedObjectBoxHelper = function (group) {
        if (this.dndSelectedObject) {
            this.dndSelectedObjectBoxHelper = new THREE.BoxHelper(this.dndSelectedObject);
            this.add(this.dndSelectedObjectBoxHelper, group, false, false);
        }
    };
    WglUtil.prototype.removeSelectedObjectBoxHelper = function (group) {
        if (this.dndSelectedObjectBoxHelper) {
            this.remove(this.dndSelectedObjectBoxHelper, group, false);
            this.dndSelectedObjectBoxHelper = null;
        }
    };
    WglUtil.prototype.updateSelectedObjectBoxHelper = function () {
        if (this.dndSelectedObjectBoxHelper && this.dndSelectedObject) {
            this.dndSelectedObjectBoxHelper.update(this.dndSelectedObject);
        }
    };
    WglUtil.prototype.addBoxHelper = function (obj, group) {
        if (obj) {
            var objBoxHelper = new THREE.BoxHelper(obj);
            this.add(objBoxHelper, group, false, false);
            return objBoxHelper;
        }
        return null;
    };
    WglUtil.prototype.removeBoxHelper = function (objBoxHelper, group) {
        if (objBoxHelper) {
            this.remove(objBoxHelper, group, false);
        }
    };
    WglUtil.prototype.updateBoxHelper = function (obj, objBoxHelper) {
        if (obj && objBoxHelper) {
            objBoxHelper.update(obj);
        }
    };
    // mouse events
    WglUtil.prototype.getMouseUpIntersects = function (event) {
        var containerWidth = window.innerWidth;
        var containerHeight = window.innerHeight;
        var mouseVector = new THREE.Vector3(0, 0, 1);
        mouseVector.x = 2 * (event.clientX / containerWidth) - 1;
        mouseVector.y = 1 - 2 * (event.clientY / containerHeight);
        var vector = new THREE.Vector3(mouseVector.x, mouseVector.y, 0.5).unproject(this.camera);
        this.raycaster.ray.set(this.camera.position, vector.sub(this.camera.position).normalize());
        this.glScene.updateMatrixWorld();
        var intersects = this.raycaster.intersectObjects(this.glScene.children, true);
        return intersects;
    };
    WglUtil.prototype.dndMouseMove = function (event, moveObject, changePointer) {
        if (moveObject === void 0) { moveObject = true; }
        if (changePointer === void 0) { changePointer = true; }
        event.preventDefault();
        this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mousePosition, this.camera);
        if (this.dndSelectedObject) {
            if (moveObject && this.raycaster.ray.intersectPlane(this.dndPlane, this.dndIntersection)) {
                this.dndSelectedObject.position.copy(this.dndIntersection.sub(this.dndOffset));
            }
            return;
        }
        var intersects = this.raycaster.intersectObjects(this.objects); // .filter(item => item.visible);
        var canvasElem = document.getElementById(this.cfg.canvasId);
        if (intersects.length > 0) {
            if (this.dndIntersectedObject != intersects[0].object) {
                /*
                if (this.dndIntersectedObject && this.dndIntersectedObject.material.color && this.dndIntersectedObject.currentHex) {
                    this.dndIntersectedObject.material.color.setHex(this.dndIntersectedObject.currentHex);
                }
                */
                this.setIntersectedObjectColor();
                this.dndIntersectedObject = intersects[0].object;
                if (this.dndIntersectedObject.material.color) {
                    this.dndIntersectedObject.currentHex = this.dndIntersectedObject.material.color.getHex();
                }
                if (moveObject) {
                    this.dndPlane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(this.dndPlane.normal), this.dndIntersectedObject.position);
                }
            }
            if (canvasElem && changePointer) {
                canvasElem.style.cursor = 'pointer';
            }
        }
        else {
            /*
            if (this.dndIntersectedObject && this.dndIntersectedObject.material.color && this.dndIntersectedObject.currentHex) {
                let color = this.dndIntersectedObject.material.color;
                color.setHex(this.dndIntersectedObject.currentHex);
                this.dndIntersectedObject.material.color = color;
            }
            */
            this.setIntersectedObjectColor();
            this.dndIntersectedObject = null;
            if (canvasElem) {
                canvasElem.style.cursor = 'auto';
            }
        }
    };
    WglUtil.prototype.setIntersectedObjectColor = function () {
        if (this.dndIntersectedObject && this.dndIntersectedObject.material.color && this.dndIntersectedObject.currentHex) {
            var color = this.dndIntersectedObject.material.color;
            if (color.setHex) {
                color.setHex(this.dndIntersectedObject.currentHex);
                this.dndIntersectedObject.material.color = color;
            }
        }
    };
    WglUtil.prototype.dndMouseDown = function (event) {
        event.preventDefault();
        this.raycaster.setFromCamera(this.mousePosition, this.camera);
        var intersects = this.raycaster.intersectObjects(this.objects); // .filter(item => item.visible);
        if (intersects.length > 0) {
            if (this.cfg.useTrackball && this.trackballControls)
                this.trackballControls.enabled = false;
            this.dndSelectedObject = intersects[0].object;
            if (this.raycaster.ray.intersectPlane(this.dndPlane, this.dndIntersection)) {
                this.dndOffset.copy(this.dndIntersection).sub(this.dndSelectedObject.position);
            }
            var canvasElem = document.getElementById(this.cfg.canvasId);
            if (canvasElem) {
                canvasElem.style.cursor = 'move';
            }
        }
    };
    WglUtil.prototype.dndMouseUp = function (event) {
        event.preventDefault();
        if (this.cfg.useTrackball && this.trackballControls)
            this.trackballControls.enabled = true;
        if (this.dndIntersectedObject) {
            this.dndSelectedObject = null;
        }
        var canvasElem = document.getElementById(this.cfg.canvasId);
        if (canvasElem) {
            canvasElem.style.cursor = 'auto';
        }
    };
    WglUtil.rgbToHex = function (R, G, B) {
        return this.toHex(R) + this.toHex(G) + this.toHex(B);
    };
    WglUtil.hexToRgb = function (h) {
        var r = this.hexToR(h);
        var g = this.hexToG(h);
        var b = this.hexToB(h);
        return { r: r, g: g, b: b };
    };
    WglUtil.hexToR = function (h) {
        return parseInt(this.cutHex(h).substring(0, 2), 16);
    };
    WglUtil.hexToG = function (h) {
        return parseInt(this.cutHex(h).substring(2, 4), 16);
    };
    WglUtil.hexToB = function (h) {
        return parseInt(this.cutHex(h).substring(4, 6), 16);
    };
    WglUtil.cutHex = function (h) {
        return (h.charAt(0) == '#') ? h.substring(1, 7) : h;
    };
    WglUtil.toHex = function (n) {
        n = parseInt(n, 10);
        if (isNaN(n))
            return '00';
        n = Math.max(0, Math.min(n, 255));
        return '0123456789ABCDEF'.charAt((n - n % 16) / 16)
            + '0123456789ABCDEF'.charAt(n % 16);
    };
    WglUtil.getColorFromRgb = function (value) {
        var r = value.r;
        if (isNaN(r))
            r = 0;
        var g = value.g;
        if (isNaN(g))
            g = 0;
        var b = value.b;
        if (isNaN(b))
            b = 0;
        var color = new THREE.Color("rgb(" + r + ", " + g + ", " + b + ")");
        return color;
    };
    WglUtil.getColorFromHex = function (value) {
        var rgb = this.hexToRgb(value);
        return this.getColorFromRgb(rgb);
    };
    WglUtil.isRGB = function (value) {
        if (!value)
            return false;
        return !cfg.U.isEmpty(value.r) && !cfg.U.isEmpty(value.g) && !cfg.U.isEmpty(value.b);
    };
    WglUtil.getColor = function (value) {
        if (!value)
            return 0xFFFFFF;
        if (this.isRGB(value)) {
            return '#' + this.rgbToHex(value.r, value.g, value.b);
        }
        return value;
    };
    WglUtil.getThreeColor = function (value) {
        if (!value)
            return new THREE.Color();
        if (this.isRGB(value)) {
            return this.getColorFromRgb(value);
        }
        return this.getColorFromHex(value);
    };
    WglUtil.prototype.genPointsMeshFromGeometry = function (geometry, cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.pointsFromGeomCfg);
        }
        var geom = geometry; // new THREE.BufferGeometry().fromGeometry(geometry);
        var pointsMat = new THREE.PointsMaterial({ size: this.pointsFromGeomCfg.size, color: this.pointsFromGeomCfg.color });
        var pointsMesh = new THREE.Points(geom, pointsMat);
        pointsMesh.scale.x = pointsMesh.scale.y = pointsMesh.scale.z = this.pointsFromGeomCfg.scale;
        pointsMesh.updateMatrix();
        pointsMesh.visible = true;
        this.add(pointsMesh);
        return pointsMesh;
    };
    WglUtil.prototype.genPointsMeshFromMesh = function (mesh, cfg) {
        var pointsMesh = this.genPointsMeshFromGeometry(mesh.geometry, cfg);
        pointsMesh.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
        return pointsMesh;
    };
    WglUtil.prototype.toggleMeshMaterials = function (mesh, visible) {
        mesh.material.transparent = true;
        mesh.material.opacity = visible ? 1 : 0;
        if (mesh.material.materials) {
            for (var i = 0; i < mesh.material.materials.length; i++) {
                mesh.material.materials[i].opacity = visible ? 1 : 0;
                mesh.material.materials[i].transparent = true;
            }
        }
    };
    WglUtil.prototype.addGridHelper = function (cfg) {
        if (this.grid) {
            this.removeGridHelper();
        }
        if (cfg) {
            this.copyCfg(cfg, this.sceneCfg);
        }
        this.grid = new THREE.GridHelper(this.sceneCfg.gridSize, this.sceneCfg.gridDivisions, this.sceneCfg.gridColorCenterLine, this.sceneCfg.gridColor);
        this.add(this.grid, null, false, false);
        return this.grid;
    };
    WglUtil.prototype.removeGridHelper = function () {
        if (this.grid) {
            this.remove(this.grid);
            this.grid = null;
        }
    };
    WglUtil.prototype.addGroup = function (group) {
        var newGroup = new THREE.Group();
        this.add(newGroup, group);
        return newGroup;
    };
    WglUtil.prototype.getObjectFromJson = function (objJson, geometries, materials) {
    };
    WglUtil.prototype.transform = function (tipPosition, w, h) {
        var width = 150; // ???
        var height = 150; // ???
        var minHeight = 100; // ???
        var ftx = tipPosition[0];
        var fty = tipPosition[1];
        ftx = (ftx > width ? width - 1 : (ftx < -width ? -width + 1 : ftx));
        fty = (fty > 2 * height ? 2 * height - 1 : (fty < minHeight ? minHeight + 1 : fty));
        var x = THREE.Math.mapLinear(ftx, -width, width, 0, w);
        var y = THREE.Math.mapLinear(fty, 2 * height, minHeight, 0, h);
        return [x, y];
    };
    ;
    WglUtil.prototype.leapFocusObject = function (frame) {
        var hl = frame.hands.length;
        var fl = frame.pointables.length;
        console.log('hl', hl);
        console.log('fl', fl);
        if (hl == 1 && fl == 1) {
            var f = frame.pointables[0];
            var container = this.glRenderer.domElement;
            var width = container.clientWidth;
            var height = container.clientHeight;
            var coords = this.transform(f.tipPosition, width, height);
            var vpx = (coords[0] / width) * 2 - 1;
            var vpy = -(coords[1] / height) * 2 + 1;
            var vector = new THREE.Vector3(vpx, vpy, 0.5);
            // this.projector.unprojectVector(vector, this.camera);
            var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
            var intersects = raycaster.intersectObjects(this.objects);
            if (intersects.length > 0) {
                var i = 0;
                while (!intersects[i].object.visible)
                    i++;
                var intersected = intersects[i];
                this.addBoxHelper(intersected);
                return this.objects.indexOf(intersected.object);
            }
            else {
                return -1;
            }
            ;
        }
        ;
        return -2;
    };
    WglUtil.prototype.initLeapObjectControls = function (threeObj) {
        var objectControls = new leapControls.LeapObjectControls(this.camera, threeObj);
        objectControls.rotateEnabled = true;
        objectControls.rotateSpeed = 3;
        objectControls.rotateHands = 1;
        objectControls.rotateFingers = [2, 3];
        objectControls.scaleEnabled = true;
        objectControls.scaleSpeed = 3;
        objectControls.scaleHands = 1;
        objectControls.scaleFingers = [4, 5];
        objectControls.panEnabled = true;
        objectControls.panSpeed = 3;
        objectControls.panHands = 2;
        objectControls.panFingers = [6, 12];
        objectControls.panRightHanded = false; // for left-handed person
        this.leapObjectsControls.push(objectControls);
    };
    WglUtil.prototype.leapSelectObject = function (frame) {
        var hl = frame.hands.length;
        var fl = frame.pointables.length;
        if (hl == 1 && fl == 1) {
            var f = frame.pointables[0];
            var container = this.glRenderer.domElement;
            var width = container.clientWidth;
            var height = container.clientHeight;
            var coords = this.transform(f.tipPosition, width, height);
        }
        else {
        }
    };
    WglUtil.prototype.objectsOverlap = function (obj1, obj2) {
        if (!obj1 || !obj2 || !obj1.geometry || !obj2.geometry)
            return false;
        obj1.geometry.computeBoundingBox();
        var box1 = obj1.geometry.boundingBox;
        if (!box1)
            return false;
        obj2.geometry.computeBoundingBox;
        var box2 = obj2.geometry.boundingBox;
        if (!box2)
            return false;
        return box1.intersectsBox(box2);
    };
    WglUtil.prototype.checkObjectOverlap = function (threeObj, otherObjs) {
        if (!threeObj || !otherObjs)
            return false;
        for (var _i = 0, otherObjs_1 = otherObjs; _i < otherObjs_1.length; _i++) {
            var obj = otherObjs_1[_i];
            if (obj.uuid !== threeObj.uuid) {
                var overlap = this.objectsOverlap(threeObj, obj);
                if (overlap) {
                    return true;
                }
            }
        }
        return false;
    };
    WglUtil.prototype.setMirrorCubeCamera = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.mirrorCubeCfg);
        }
        this.mirrorCubeCamera = new THREE.CubeCamera(this.mirrorCubeCfg.near, this.mirrorCubeCfg.far, this.mirrorCubeCfg.resolution);
        // mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
        this.mirrorCubeCamera.renderTarget.antialiasing = true;
        this.glScene.add(this.mirrorCubeCamera);
        return this.mirrorCubeCamera;
    };
    WglUtil.prototype.genMirrorCubeMat = function (cfg) {
        if (!this.mirrorCubeCamera) {
            this.setMirrorCubeCamera(cfg);
        }
        var mirrorCubeMat = new THREE.MeshBasicMaterial({ envMap: this.mirrorCubeCamera.renderTarget.texture });
        return mirrorCubeMat;
    };
    WglUtil.prototype.addMirrorCube = function (cfg) {
        if (cfg) {
            this.copyCfg(cfg, this.mirrorCubeCfg);
        }
        this.setMirrorCubeCamera(cfg);
        var cubeGeom = new THREE.CubeGeometry(this.mirrorCubeCfg.dimension.x, this.mirrorCubeCfg.dimension.y, this.mirrorCubeCfg.dimension.z, 1, 1, 1);
        var mirrorCubeMat = this.genMirrorCubeMat(cfg);
        this.mirrorCube = new THREE.Mesh(cubeGeom, mirrorCubeMat);
        this.mirrorCube.position.set(this.mirrorCubeCfg.position.x, this.mirrorCubeCfg.position.y, this.mirrorCubeCfg.position.z);
        var p = this.mirrorCube.position;
        this.mirrorCubeCamera.position.set(p.x, p.y, p.z);
        this.glScene.add(this.mirrorCube);
        return this.mirrorCube;
    };
    WglUtil.prototype.updateMirrorCube = function () {
        if (!this.mirrorCubeCamera || !this.mirrorCube)
            return;
        this.mirrorCube.visible = false;
        this.mirrorCubeCamera.updateCubeMap(this.glRenderer, this.glScene);
        this.mirrorCube.visible = true;
    };
    WglUtil.prototype.createCssObject = function (w, h, position, rotation, url) {
        var html = "\n<div style=\"width:" + w + "px; height:" + h + "px;\">\n    <iframe src=\"" + url + "\" width=\"" + w + "\" height=\"" + h + "\"></iframe>\n</div>\n        ";
        var div = document.createElement('div');
        div.innerHTML = html;
        var cssObject = new css3d.CSS3DObject(div);
        cssObject.position.x = position.x;
        cssObject.position.y = position.y;
        cssObject.position.z = position.z;
        cssObject.rotation.x = rotation.x;
        cssObject.rotation.y = rotation.y;
        cssObject.rotation.z = rotation.z;
        return cssObject;
    };
    WglUtil.prototype.createCss3DPagePlane = function (w, h, position, rotation) {
        var material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.0,
            side: THREE.DoubleSide
        });
        var geometry = new THREE.PlaneGeometry(w, h);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;
        mesh.rotation.x = rotation.x;
        mesh.rotation.y = rotation.y;
        mesh.rotation.z = rotation.z;
        return mesh;
    };
    WglUtil.prototype.create3dPage = function (w, h, position, rotation, url, group) {
        var plane = this.createCss3DPagePlane(w, h, position, rotation);
        this.add(plane, group, true, true);
        var cssObject = this.createCssObject(w, h, position, rotation, url);
        this.cssScene.add(cssObject);
    };
    WglUtil.prototype.setCssRenderer = function () {
        this.cssRenderer = new css3d.CSS3DRenderer();
        this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = 0;
        this.glRenderer.domElement.style.position = 'absolute';
        this.glRenderer.domElement.style.zIndex = 0;
        this.glRenderer.domElement.style.top = 0;
        this.cssScene = new THREE.Scene();
    };
    return WglUtil;
}());
exports.WglUtil = WglUtil;
