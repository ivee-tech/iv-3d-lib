"use strict";
var wgl_util_cfgs_1 = require('../wgl-util-cfgs');
var AdditionalContent = (function () {
    function AdditionalContent() {
        this.css = new wgl_util_cfgs_1.CssCfg();
        this.showFlag = true;
    }
    AdditionalContent.prototype.hide = function () {
        this.showFlag = false;
    };
    AdditionalContent.prototype.show = function () {
        this.showFlag = true;
    };
    return AdditionalContent;
}());
exports.AdditionalContent = AdditionalContent;
