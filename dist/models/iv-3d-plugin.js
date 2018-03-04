"use strict";
const k_gen_1 = require('./k-gen');
class Iv3dPlugin {
    constructor() {
        this.type = Iv3dPluginType.none;
        this.cfg = [];
    }
    static createSkyboxPlugin() {
        let p = {
            id: k_gen_1.KGen.uuid(),
            type: Iv3dPluginType.skybox,
            cfg: [
                { id: k_gen_1.KGen.uuid(6), name: 'srcFile', value: '' },
                { id: k_gen_1.KGen.uuid(6), name: 'size', value: 1024 }
            ]
        };
        return p;
    }
    static createThreejsTerrainPlugin() {
        let p = {
            id: k_gen_1.KGen.uuid(),
            type: Iv3dPluginType.threejsTerrain,
            cfg: [
                { id: k_gen_1.KGen.uuid(6), name: 'shaderNoiseId', value: '' },
                { id: k_gen_1.KGen.uuid(6), name: 'diffuseTexture1FilePath', value: '' },
                { id: k_gen_1.KGen.uuid(6), name: 'diffuseTexture2FilePath', value: '' },
                { id: k_gen_1.KGen.uuid(6), name: 'detailTextureFilePath', value: '' },
            ]
        };
        return p;
    }
    static createMirrorCubePlugin() {
        let p = {
            id: k_gen_1.KGen.uuid(),
            type: Iv3dPluginType.mirrorCube,
            cfg: [
                { id: k_gen_1.KGen.uuid(6), name: 'near', value: 0.1 },
                { id: k_gen_1.KGen.uuid(6), name: 'far', value: 10000 },
                { id: k_gen_1.KGen.uuid(6), name: 'resolution', value: 1024 },
                { id: k_gen_1.KGen.uuid(6), name: 'dimension_x', value: 400 },
                { id: k_gen_1.KGen.uuid(6), name: 'dimension_y', value: 400 },
                { id: k_gen_1.KGen.uuid(6), name: 'dimension_z', value: 10 },
                { id: k_gen_1.KGen.uuid(6), name: 'position_x', value: 100 },
                { id: k_gen_1.KGen.uuid(6), name: 'position_y', value: 100 },
                { id: k_gen_1.KGen.uuid(6), name: 'position_z', value: 100 },
            ]
        };
        return p;
    }
    static createGoogleMapsPlugin() {
        let p = {
            id: k_gen_1.KGen.uuid(),
            type: Iv3dPluginType.googleMaps,
            cfg: [
                { id: k_gen_1.KGen.uuid(6), name: 'place', value: '' },
                { id: k_gen_1.KGen.uuid(6), name: 'origin', value: '' },
                { id: k_gen_1.KGen.uuid(6), name: 'destination', value: '' },
                { id: k_gen_1.KGen.uuid(6), name: 'zoom', value: '15' },
                { id: k_gen_1.KGen.uuid(6), name: 'key', value: '' },
                { id: k_gen_1.KGen.uuid(6), name: 'width', value: 'window.innerWidth' },
                { id: k_gen_1.KGen.uuid(6), name: 'height', value: 'window.innerHeight' },
                { id: k_gen_1.KGen.uuid(6), name: 'position_x', value: '0' },
                { id: k_gen_1.KGen.uuid(6), name: 'position_y', value: '0' },
                { id: k_gen_1.KGen.uuid(6), name: 'position_z', value: '0' },
                { id: k_gen_1.KGen.uuid(6), name: 'rotation_x', value: '0' },
                { id: k_gen_1.KGen.uuid(6), name: 'rotation_y', value: '0' },
                { id: k_gen_1.KGen.uuid(6), name: 'rotation_z', value: '0' },
            ]
        };
        return p;
    }
}
exports.Iv3dPlugin = Iv3dPlugin;
(function (Iv3dPluginType) {
    Iv3dPluginType[Iv3dPluginType["none"] = ''] = "none";
    Iv3dPluginType[Iv3dPluginType["camera"] = 'camera'] = "camera";
    Iv3dPluginType[Iv3dPluginType["skybox"] = 'skybox'] = "skybox";
    Iv3dPluginType[Iv3dPluginType["dataSource"] = 'dataSource'] = "dataSource";
    Iv3dPluginType[Iv3dPluginType["threejsTerrain"] = 'threejsTerrain'] = "threejsTerrain";
    Iv3dPluginType[Iv3dPluginType["mirrorCube"] = 'mirrorCube'] = "mirrorCube";
    Iv3dPluginType[Iv3dPluginType["googleMaps"] = 'googleMaps'] = "googleMaps";
})(exports.Iv3dPluginType || (exports.Iv3dPluginType = {}));
var Iv3dPluginType = exports.Iv3dPluginType;
//# sourceMappingURL=iv-3d-plugin.js.map