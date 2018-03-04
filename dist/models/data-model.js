"use strict";
const iv_3d_object_1 = require('./iv-3d-object');
class DataModel {
    constructor() {
        this.container = new iv_3d_object_1.Iv3dObject();
        this.lights = [];
        this.timelines = [];
        this.cameraProps = [];
        this.sceneProps = [];
        this.audioProps = [];
        this.additionalContents = [];
        this.script = {
            init: null,
            execInit: null,
            update: null,
            execUpdate: null
        };
        this.shaders = [];
        this.dataSourceProps = [];
        this.plugins = [];
    }
}
exports.DataModel = DataModel;
//# sourceMappingURL=data-model.js.map