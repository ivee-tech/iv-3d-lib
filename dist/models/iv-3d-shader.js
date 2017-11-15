"use strict";
var wgl_util_cfgs_1 = require('../wgl-util-cfgs');
var Iv3dShader = (function () {
    function Iv3dShader() {
        this.uniforms = [];
        this.timeExpr = new wgl_util_cfgs_1.Expr();
    }
    return Iv3dShader;
}());
exports.Iv3dShader = Iv3dShader;
var Iv3dUniform = (function () {
    function Iv3dUniform() {
    }
    return Iv3dUniform;
}());
exports.Iv3dUniform = Iv3dUniform;
(function (Iv3dUniformType) {
    Iv3dUniformType[Iv3dUniformType['f'] = 'f'] = 'f';
    Iv3dUniformType[Iv3dUniformType['v2'] = 'v2'] = 'v2';
    Iv3dUniformType[Iv3dUniformType['v3'] = 'v3'] = 'v3';
    Iv3dUniformType[Iv3dUniformType['t'] = 't'] = 't';
})(exports.Iv3dUniformType || (exports.Iv3dUniformType = {}));
var Iv3dUniformType = exports.Iv3dUniformType;
