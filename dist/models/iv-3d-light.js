"use strict";
(function (Iv3dLightType) {
    Iv3dLightType[Iv3dLightType["none"] = ''] = "none";
    Iv3dLightType[Iv3dLightType["ambient"] = 'AmbientLight'] = "ambient";
    Iv3dLightType[Iv3dLightType["directional"] = 'DirectionalLight'] = "directional";
    Iv3dLightType[Iv3dLightType["hemisphere"] = 'HemisphereLight'] = "hemisphere";
    Iv3dLightType[Iv3dLightType["point"] = 'PointLight'] = "point";
    Iv3dLightType[Iv3dLightType["rectArea"] = 'RectAreaLight'] = "rectArea";
    Iv3dLightType[Iv3dLightType["spot"] = 'SpotLight'] = "spot";
})(exports.Iv3dLightType || (exports.Iv3dLightType = {}));
var Iv3dLightType = exports.Iv3dLightType;
var Iv3dLight = (function () {
    function Iv3dLight() {
        this.name = '';
        this.uuid = '';
        this.type = Iv3dLightType.none;
        this.lightProps = [];
    }
    return Iv3dLight;
}());
exports.Iv3dLight = Iv3dLight;
