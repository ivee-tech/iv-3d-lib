"use strict";
const iv_3d_object_1 = require('./iv-3d-object');
const cfg = require('../wgl-util-cfgs');
class Iv3dDataSource {
    constructor() {
        this.title = '';
        this.items = [];
        this.type = iv_3d_object_1.Iv3dObjectType.cube;
        this.textBackgroundColor = '#FFF';
        this.textColor = '#000';
        this.valueFormat = Iv3dDataSourceValueFormat.none;
        this.panelCss = new cfg.CssCfg();
        this.page = 1;
        this.pageSize = 50;
        // drilldownPatternUrl: string;
        this.dataSourceIndex = 0;
        this.urls = [];
    }
}
exports.Iv3dDataSource = Iv3dDataSource;
class Iv3dDataSourceItem {
}
exports.Iv3dDataSourceItem = Iv3dDataSourceItem;
(function (Iv3dDataSourceValueFormat) {
    Iv3dDataSourceValueFormat[Iv3dDataSourceValueFormat["none"] = ''] = "none";
    Iv3dDataSourceValueFormat[Iv3dDataSourceValueFormat["currency"] = 'currency'] = "currency";
    Iv3dDataSourceValueFormat[Iv3dDataSourceValueFormat["number"] = 'number'] = "number";
})(exports.Iv3dDataSourceValueFormat || (exports.Iv3dDataSourceValueFormat = {}));
var Iv3dDataSourceValueFormat = exports.Iv3dDataSourceValueFormat;
(function (Iv3dSortType) {
    Iv3dSortType[Iv3dSortType["none"] = ''] = "none";
    Iv3dSortType[Iv3dSortType["asc"] = 'asc'] = "asc";
    Iv3dSortType[Iv3dSortType["desc"] = 'desc'] = "desc";
})(exports.Iv3dSortType || (exports.Iv3dSortType = {}));
var Iv3dSortType = exports.Iv3dSortType;
(function (Iv3dDataType) {
    Iv3dDataType[Iv3dDataType["none"] = ''] = "none";
    Iv3dDataType[Iv3dDataType["string"] = 'string'] = "string";
    Iv3dDataType[Iv3dDataType["number"] = 'number'] = "number";
    Iv3dDataType[Iv3dDataType["date"] = 'date'] = "date";
})(exports.Iv3dDataType || (exports.Iv3dDataType = {}));
var Iv3dDataType = exports.Iv3dDataType;
class Iv3dDataSourceUrl {
    constructor() {
        this.url = '';
        this.patternUrl = '';
        this.title = '';
        this.type = iv_3d_object_1.Iv3dObjectType.cube;
    }
}
exports.Iv3dDataSourceUrl = Iv3dDataSourceUrl;
//# sourceMappingURL=iv-3d-data-source.js.map