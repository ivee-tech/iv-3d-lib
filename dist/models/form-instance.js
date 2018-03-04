"use strict";
const wgl_util_cfgs_1 = require('../wgl-util-cfgs');
class FormInstance {
    constructor() {
        this.css = new wgl_util_cfgs_1.CssCfg();
        this.checkboxFix = (e) => { e.stopImmediatePropagation(); };
    }
}
exports.FormInstance = FormInstance;
;
//# sourceMappingURL=form-instance.js.map