"use strict";
var iv_3d_object_1 = require('./iv-3d-object');
var DataModel = (function () {
    function DataModel() {
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
    return DataModel;
}());
exports.DataModel = DataModel;
