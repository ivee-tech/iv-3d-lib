"use strict";
var THREE = require('three');
var shaders = require('three-shaders');
var ShaderTerrain = require('three-shader-terrain');
var BufferGeometryUtils = require('three-buffer-geometry-utils');
var ThreeJsTerrainPlugin = (function () {
    function ThreeJsTerrainPlugin(_errorSvc) {
        this._errorSvc = _errorSvc;
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
        this.mlib = {};
        this.lightVal = 0;
        this.lightDir = 1;
        this.updateNoise = true;
        this.animDelta = 0;
        this.animDeltaDir = -1;
        this.clock = new THREE.Clock();
    }
    ThreeJsTerrainPlugin.prototype.init = function () {
    };
    ThreeJsTerrainPlugin.prototype.load = function () {
        this.addTerrain();
    };
    ThreeJsTerrainPlugin.prototype.update = function (time) {
        this.updateTerrain();
    };
    ThreeJsTerrainPlugin.prototype.addTerrain = function () {
        var _this = this;
        this.sceneRenderTarget = new THREE.Scene();
        this.cameraOrtho = new THREE.OrthographicCamera(this.SCREEN_WIDTH / -2, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT / 2, this.SCREEN_HEIGHT / -2, -10000, 10000);
        this.cameraOrtho.position.z = 100;
        this.sceneRenderTarget.add(this.cameraOrtho);
        this.w.glScene.background = new THREE.Color(0x050505);
        this.w.glScene.fog = new THREE.Fog(0x050505, 2000, 4000);
        this.w.orbitControls.rotateSpeed = 1.0;
        this.w.orbitControls.zoomSpeed = 1.2;
        this.w.orbitControls.panSpeed = 10.8;
        // this.w.orbitControls.enableDamping = true;
        this.w.orbitControls.keys = [65, 83, 68];
        // LIGHTS
        this.w.glScene.add(new THREE.AmbientLight(0x111111));
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.15);
        this.directionalLight.position.set(500, 2000, 0);
        this.w.glScene.add(this.directionalLight);
        this.pointLight = new THREE.PointLight(0xff4400, 1.5);
        this.pointLight.position.set(0, 0, 0);
        this.w.glScene.add(this.pointLight);
        // HEIGHT + NORMAL MAPS
        var normalShader = new shaders.NormalMapShader();
        var rx = 256, ry = 256;
        var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };
        this.heightMap = new THREE.WebGLRenderTarget(rx, ry, pars);
        this.heightMap.texture.generateMipmaps = false;
        this.normalMap = new THREE.WebGLRenderTarget(rx, ry, pars);
        this.normalMap.texture.generateMipmaps = false;
        this.uniformsNoise = {
            time: { value: 1.0 },
            scale: { value: new THREE.Vector2(1.5, 1.5) },
            offset: { value: new THREE.Vector2(0, 0) }
        };
        this.uniformsNormal = THREE.UniformsUtils.clone(normalShader.uniforms);
        this.uniformsNormal.height.value = 0.05;
        this.uniformsNormal.resolution.value.set(rx, ry);
        this.uniformsNormal.heightMap.value = this.heightMap.texture;
        var shader = this.data.shaders.find(function (item) { return item.id === _this.config['shaderNoiseId']; });
        var vertexShader = shader.vertexProgram;
        var fragmentShader = shader.fragmentProgram;
        // TEXTURES
        var loadingManager = new THREE.LoadingManager(function () {
            if (_this.terrain) {
                _this.terrain.visible = true;
            }
        });
        var textureLoader = new THREE.TextureLoader(loadingManager);
        var specularMap = new THREE.WebGLRenderTarget(2048, 2048, pars);
        specularMap.texture.generateMipmaps = false;
        var diffuseTexture1 = textureLoader.load("" + this.config['diffuseTexture1FilePath']);
        var diffuseTexture2 = textureLoader.load("" + this.config['diffuseTexture2FilePath']);
        var detailTexture = textureLoader.load("" + this.config['detailTextureFilePath']);
        diffuseTexture1.wrapS = diffuseTexture1.wrapT = THREE.RepeatWrapping;
        diffuseTexture2.wrapS = diffuseTexture2.wrapT = THREE.RepeatWrapping;
        detailTexture.wrapS = detailTexture.wrapT = THREE.RepeatWrapping;
        specularMap.texture.wrapS = specularMap.texture.wrapT = THREE.RepeatWrapping;
        // TERRAIN SHADER
        var terrainShader = new ShaderTerrain().terrain; // THREE.ShaderTerrain["terrain"];
        this.uniformsTerrain = THREE.UniformsUtils.clone(terrainShader.uniforms);
        this.uniformsTerrain['tNormal'].value = this.normalMap.texture;
        this.uniformsTerrain['uNormalScale'].value = 3.5;
        this.uniformsTerrain['tDisplacement'].value = this.heightMap.texture;
        this.uniformsTerrain['tDiffuse1'].value = diffuseTexture1;
        this.uniformsTerrain['tDiffuse2'].value = diffuseTexture2;
        this.uniformsTerrain['tSpecular'].value = specularMap.texture;
        this.uniformsTerrain['tDetail'].value = detailTexture;
        this.uniformsTerrain['enableDiffuse1'].value = true;
        this.uniformsTerrain['enableDiffuse2'].value = true;
        this.uniformsTerrain['enableSpecular'].value = true;
        this.uniformsTerrain['diffuse'].value.setHex(0xffffff);
        this.uniformsTerrain['specular'].value.setHex(0xffffff);
        this.uniformsTerrain['shininess'].value = 30;
        this.uniformsTerrain['uDisplacementScale'].value = 375;
        this.uniformsTerrain['uRepeatOverlay'].value.set(6, 6);
        var params = [
            ['heightmap', fragmentShader, vertexShader, this.uniformsNoise, false],
            ['normal', normalShader.fragmentShader, normalShader.vertexShader, this.uniformsNormal, false],
            ['terrain', terrainShader.fragmentShader, terrainShader.vertexShader, this.uniformsTerrain, true]
        ];
        for (var i = 0; i < params.length; i++) {
            var material = new THREE.ShaderMaterial({
                uniforms: params[i][3],
                vertexShader: params[i][2],
                fragmentShader: params[i][1],
                lights: params[i][4],
                fog: true
            });
            this.mlib[params[i][0]] = material;
        }
        var plane = new THREE.PlaneBufferGeometry(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        this.quadTarget = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ color: 0x000000 }));
        this.quadTarget.position.z = -500;
        this.sceneRenderTarget.add(this.quadTarget);
        // TERRAIN MESH
        var geometryTerrain = new THREE.PlaneBufferGeometry(6000, 6000, 256, 256);
        var bgu = new BufferGeometryUtils();
        bgu.computeTangents(geometryTerrain);
        this.terrain = new THREE.Mesh(geometryTerrain, this.mlib['terrain']);
        this.terrain.position.set(0, -125, 0);
        this.terrain.rotation.x = -Math.PI / 2;
        this.terrain.visible = false;
        this.w.add(this.terrain);
    };
    ThreeJsTerrainPlugin.prototype.updateTerrain = function () {
        var delta = this.clock.getDelta();
        if (this.terrain && this.terrain.visible) {
            var time = Date.now() * 0.001;
            var fLow = 0.1, fHigh = 0.8;
            this.lightVal = THREE.Math.clamp(this.lightVal + 0.5 * delta * this.lightDir, fLow, fHigh);
            var valNorm = (this.lightVal - fLow) / (fHigh - fLow);
            this.w.glScene.background.setHSL(0.1, 0.5, this.lightVal);
            this.w.glScene.fog.color.setHSL(0.1, 0.5, this.lightVal);
            this.directionalLight.intensity = THREE.Math.mapLinear(valNorm, 0, 1, 0.1, 1.15);
            this.pointLight.intensity = THREE.Math.mapLinear(valNorm, 0, 1, 0.9, 1.5);
            this.uniformsTerrain['uNormalScale'].value = THREE.Math.mapLinear(valNorm, 0, 1, 0.6, 3.5);
            if (this.updateNoise) {
                this.animDelta = THREE.Math.clamp(this.animDelta + 0.00075 * this.animDeltaDir, 0, 0.05);
                this.uniformsNoise['time'].value += delta * this.animDelta;
                this.uniformsNoise['offset'].value.x += delta * 0.05;
                this.uniformsTerrain['uOffset'].value.x = 4 * this.uniformsNoise['offset'].value.x;
                this.quadTarget.material = this.mlib['heightmap'];
                this.w.glRenderer.render(this.sceneRenderTarget, this.cameraOrtho, this.heightMap, true);
                this.quadTarget.material = this.mlib['normal'];
                this.w.glRenderer.render(this.sceneRenderTarget, this.cameraOrtho, this.normalMap, true);
            }
        }
    };
    return ThreeJsTerrainPlugin;
}());
exports.ThreeJsTerrainPlugin = ThreeJsTerrainPlugin;
