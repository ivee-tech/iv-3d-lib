"use strict";
var k_gen_1 = require('./k-gen');
var Iv3dPlugin = (function () {
    function Iv3dPlugin() {
        this.type = Iv3dPluginType.none;
        this.cfg = [];
    }
    Iv3dPlugin.createSkyboxPlugin = function () {
        var p = {
            id: k_gen_1.KGen.uuid(),
            type: Iv3dPluginType.skybox,
            cfg: [
                { id: k_gen_1.KGen.uuid(6), name: 'srcFile', value: '' },
                { id: k_gen_1.KGen.uuid(6), name: 'size', value: 1024 }
            ]
        };
        return p;
    };
    Iv3dPlugin.createThreejsTerrainPlugin = function () {
        var p = {
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
    };
    return Iv3dPlugin;
}());
exports.Iv3dPlugin = Iv3dPlugin;
(function (Iv3dPluginType) {
    Iv3dPluginType[Iv3dPluginType["none"] = ''] = "none";
    Iv3dPluginType[Iv3dPluginType["camera"] = 'camera'] = "camera";
    Iv3dPluginType[Iv3dPluginType["skybox"] = 'skybox'] = "skybox";
    Iv3dPluginType[Iv3dPluginType["dataSource"] = 'dataSource'] = "dataSource";
    Iv3dPluginType[Iv3dPluginType["threejsTerrain"] = 'threejsTerrain'] = "threejsTerrain";
})(exports.Iv3dPluginType || (exports.Iv3dPluginType = {}));
var Iv3dPluginType = exports.Iv3dPluginType;
