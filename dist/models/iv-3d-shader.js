"use strict";
const wgl_util_cfgs_1 = require('../wgl-util-cfgs');
class Iv3dShader {
    constructor() {
        this.uniforms = [];
        this.timeExpr = new wgl_util_cfgs_1.Expr();
    }
}
exports.Iv3dShader = Iv3dShader;
class Iv3dUniform {
}
exports.Iv3dUniform = Iv3dUniform;
(function (Iv3dUniformType) {
    Iv3dUniformType[Iv3dUniformType['f'] = 'f'] = 'f';
    Iv3dUniformType[Iv3dUniformType['v2'] = 'v2'] = 'v2';
    Iv3dUniformType[Iv3dUniformType['v3'] = 'v3'] = 'v3';
    Iv3dUniformType[Iv3dUniformType['t'] = 't'] = 't';
})(exports.Iv3dUniformType || (exports.Iv3dUniformType = {}));
var Iv3dUniformType = exports.Iv3dUniformType;
//# sourceMappingURL=iv-3d-shader.js.map