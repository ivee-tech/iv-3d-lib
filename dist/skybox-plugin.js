"use strict";
var SkyBoxPlugin = (function () {
    function SkyBoxPlugin() {
    }
    SkyBoxPlugin.prototype.init = function () {
    };
    SkyBoxPlugin.prototype.load = function () {
        this.addSkyBox();
    };
    SkyBoxPlugin.prototype.update = function (time) {
    };
    SkyBoxPlugin.prototype.addSkyBox = function () {
        var cfg = {
            srcFile: this.config['srcFile'], size: this.config['size']
        };
        this.w.addSkyBoxFromFile(cfg, this.mainGroup);
    };
    return SkyBoxPlugin;
}());
exports.SkyBoxPlugin = SkyBoxPlugin;
