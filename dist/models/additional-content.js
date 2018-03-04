"use strict";
const wgl_util_cfgs_1 = require('../wgl-util-cfgs');
class AdditionalContent {
    constructor() {
        this.css = new wgl_util_cfgs_1.CssCfg();
        this.showFlag = true;
        this.content = ``;
    }
    hide() {
        this.showFlag = false;
    }
    show() {
        this.showFlag = true;
    }
}
exports.AdditionalContent = AdditionalContent;
//# sourceMappingURL=additional-content.js.map