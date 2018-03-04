"use strict";
class Iv3dObject {
    constructor() {
        this.name = '';
        this.uuid = '';
        this.url = '';
        this.meshType = Iv3dObjectType.none;
        this.objectProps = [];
        this.geometryProps = [];
        this.materialProps = [];
        this.cfgProps = [];
        this.children = [];
        this.contentPanels = '';
        this.visibleRuntime = true;
        this.sVisibleRuntime = 'true';
        this.dataSourceItem = null;
    }
}
exports.Iv3dObject = Iv3dObject;
(function (Iv3dObjectType) {
    Iv3dObjectType[Iv3dObjectType["none"] = ''] = "none";
    Iv3dObjectType[Iv3dObjectType["group"] = 'group'] = "group";
    Iv3dObjectType[Iv3dObjectType["line"] = 'line'] = "line";
    Iv3dObjectType[Iv3dObjectType["plane"] = 'plane'] = "plane";
    Iv3dObjectType[Iv3dObjectType["circle"] = 'circle'] = "circle";
    Iv3dObjectType[Iv3dObjectType["cube"] = 'cube'] = "cube";
    Iv3dObjectType[Iv3dObjectType["sphere"] = 'sphere'] = "sphere";
    Iv3dObjectType[Iv3dObjectType["cylinder"] = 'cylinder'] = "cylinder";
    Iv3dObjectType[Iv3dObjectType["torus"] = 'torus'] = "torus";
    Iv3dObjectType[Iv3dObjectType["torusKnot"] = 'torusKnot'] = "torusKnot";
    Iv3dObjectType[Iv3dObjectType["points"] = 'points'] = "points";
    Iv3dObjectType[Iv3dObjectType["particles"] = 'particles'] = "particles";
    Iv3dObjectType[Iv3dObjectType["text"] = 'text'] = "text";
})(exports.Iv3dObjectType || (exports.Iv3dObjectType = {}));
var Iv3dObjectType = exports.Iv3dObjectType;
(function (Iv3dGeometryType) {
    Iv3dGeometryType[Iv3dGeometryType["none"] = ''] = "none";
    Iv3dGeometryType[Iv3dGeometryType["line"] = 'Geometry'] = "line";
    Iv3dGeometryType[Iv3dGeometryType["segment"] = 'Geometry'] = "segment";
    Iv3dGeometryType[Iv3dGeometryType["circle"] = 'CircleGeometry'] = "circle";
    Iv3dGeometryType[Iv3dGeometryType["box"] = 'BoxGeometry'] = "box";
    Iv3dGeometryType[Iv3dGeometryType["plane"] = 'PlaneBufferGeometry'] = "plane";
    Iv3dGeometryType[Iv3dGeometryType["sphere"] = 'SphereGeometry'] = "sphere";
    Iv3dGeometryType[Iv3dGeometryType["cylinder"] = 'CylinderGeometry'] = "cylinder";
    Iv3dGeometryType[Iv3dGeometryType["torus"] = 'TorusGeometry'] = "torus";
    Iv3dGeometryType[Iv3dGeometryType["torusKnot"] = 'TorusKnotGeometry'] = "torusKnot";
    Iv3dGeometryType[Iv3dGeometryType["text"] = 'TextGeometry'] = "text";
    Iv3dGeometryType[Iv3dGeometryType["particles"] = 'Particles'] = "particles";
})(exports.Iv3dGeometryType || (exports.Iv3dGeometryType = {}));
var Iv3dGeometryType = exports.Iv3dGeometryType;
(function (Iv3dMaterialType) {
    Iv3dMaterialType[Iv3dMaterialType["none"] = ''] = "none";
    Iv3dMaterialType[Iv3dMaterialType["lineBasic"] = 'LineBasicMaterial'] = "lineBasic";
    Iv3dMaterialType[Iv3dMaterialType["lineDashed"] = 'LineDashedMaterial'] = "lineDashed";
    Iv3dMaterialType[Iv3dMaterialType["meshBasic"] = 'MeshBasicMaterial'] = "meshBasic";
    Iv3dMaterialType[Iv3dMaterialType["meshDepth"] = 'MeshDepthMaterial'] = "meshDepth";
    Iv3dMaterialType[Iv3dMaterialType["meshLambert"] = 'MeshLambertMaterial'] = "meshLambert";
    Iv3dMaterialType[Iv3dMaterialType["meshPhong"] = 'MeshPhongMaterial'] = "meshPhong";
    Iv3dMaterialType[Iv3dMaterialType["meshStandard"] = 'MeshStandardMaterial'] = "meshStandard";
    Iv3dMaterialType[Iv3dMaterialType["meshToon"] = 'MeshToonMaterial'] = "meshToon";
    Iv3dMaterialType[Iv3dMaterialType["points"] = 'PointsMaterial'] = "points";
    Iv3dMaterialType[Iv3dMaterialType["multi"] = 'MultiMaterial'] = "multi";
})(exports.Iv3dMaterialType || (exports.Iv3dMaterialType = {}));
var Iv3dMaterialType = exports.Iv3dMaterialType;
//# sourceMappingURL=iv-3d-object.js.map