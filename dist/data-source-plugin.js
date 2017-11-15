"use strict";
var THREE = require('three');
var numeral = require('numeral');
var cfg = require('./wgl-util-cfgs');
var iv_3d_data_source_1 = require('./models/iv-3d-data-source');
var iv_3d_object_1 = require('./models/iv-3d-object');
var DataSourcePlugin = (function () {
    function DataSourcePlugin(dataSource, objHandler, demo, isPublic) {
        this.dataSource = dataSource;
        this.objHandler = objHandler;
        this.demo = demo;
        this.isPublic = isPublic;
    }
    DataSourcePlugin.prototype.init = function () {
    };
    DataSourcePlugin.prototype.load = function () {
        this.loadDataSource();
    };
    DataSourcePlugin.prototype.update = function (time) {
    };
    DataSourcePlugin.prototype.loadDataSource = function () {
        if (this.dataSource && this.dataSource.items) {
            /*
            if (!this.dataSource.urls || this.dataSource.urls.length === 0) {
                this.dataSource.urls = [];
                for (let i = 0; i < 3; i++) {
                    let dsUrl: Iv3dDataSourceUrl = new Iv3dDataSourceUrl();
                    let urlProp = this.objHandler.getProp(`url${i}`, this.data.dataSourceProps);
                    if (i === this.currentDataSourceIndex) {
                        dsUrl.url = this.dataSource.url;
                    }
                    else {
                        dsUrl.url = urlProp ? urlProp.value : '';
                    }
                    dsUrl.patternUrl = urlProp ? urlProp.value : '';
                    let titleProp = this.objHandler.getProp(`title${i}`, this.data.dataSourceProps);
                    dsUrl.title = titleProp ? titleProp.value : '';
                    let typeProp = this.objHandler.getProp(`type${i}`, this.data.dataSourceProps);
                    dsUrl.type = typeProp ? typeProp.value : '';
                    this.dataSource.urls.push(dsUrl);
                }
            }
            */
            var valueFormatProp = this.objHandler.getProp('valueFormat', this.data.dataSourceProps);
            this.dataSource.valueFormat = valueFormatProp ? valueFormatProp.value : '';
            var dataItems = this.dataSource.items; //.filter(item => item.value > 1000);
            var values = dataItems.map(function (item) { return item.value; });
            var minN = Math.min.apply(Math, values);
            minN = minN < 0 ? 2 * minN : 0;
            var maxN = Math.max.apply(Math, values);
            maxN = maxN > 0 ? 2 * maxN : 0;
            // let titleProp = this.objHandler.getProp('title', this.data.dataSourceProps);
            // this.dataSource.title = titleProp ? titleProp.value : '';
            // let dsTypeProp = this.objHandler.getProp('type', this.data.dataSourceProps);
            var dsBackgroundColorProp = this.objHandler.getProp('textBackgroundColor', this.data.dataSourceProps);
            var dsTransparentBackgroundProp = this.objHandler.getProp('transparentBackground', this.data.dataSourceProps);
            if (dsTransparentBackgroundProp && dsTransparentBackgroundProp.value) {
                this.dataSource.textBackgroundColor = 'transparent';
            }
            else {
                this.dataSource.textBackgroundColor = dsBackgroundColorProp ? dsBackgroundColorProp.value : '#FFF';
            }
            var dsTextColorProp = this.objHandler.getProp('textColor', this.data.dataSourceProps);
            this.dataSource.textColor = dsTextColorProp ? dsTextColorProp.value : '#000';
            this.dataSource.panelCss = this.objHandler.getCssCfg(this.data.dataSourceProps);
            var pageProp = this.objHandler.getProp('page', this.data.dataSourceProps);
            if (pageProp && pageProp.value) {
                this.dataSource.page = pageProp.value;
            }
            var pageSizeProp = this.objHandler.getProp('pageSize', this.data.dataSourceProps);
            if (pageSizeProp && pageSizeProp.value) {
                this.dataSource.pageSize = pageSizeProp.value;
            }
            // let drilldownPatternUrlProp = this.objHandler.getProp('drilldownPatternUrl', this.data.dataSourceProps);
            // this.dataSource.drilldownPatternUrl = drilldownPatternUrlProp ? drilldownPatternUrlProp.value : '';
            // this.dataSource.dataSourceIndex = this.currentDataSourceIndex;
            // let dsType = this.dataSource.urls[this.currentDataSourceIndex] ? this.dataSource.urls[this.currentDataSourceIndex].type : Iv3dObjectType.cube;
            var dsType = this.dataSource.type;
            for (var _i = 0, dataItems_1 = dataItems; _i < dataItems_1.length; _i++) {
                var dataItem = dataItems_1[_i];
                switch (dsType) {
                    case iv_3d_object_1.Iv3dObjectType.sphere:
                        this.bindDataToSphere(dataItem, '', minN, maxN);
                        break;
                    case iv_3d_object_1.Iv3dObjectType.particles:
                        this.bindDataToParticles(dataItem, '', minN, maxN);
                        break;
                    case iv_3d_object_1.Iv3dObjectType.torus:
                        this.bindDataToTorus(dataItem, '', minN, maxN);
                        break;
                    case iv_3d_object_1.Iv3dObjectType.torusKnot:
                        this.bindDataToTorusKnot(dataItem, '', minN, maxN);
                        break;
                    case iv_3d_object_1.Iv3dObjectType.cylinder:
                        this.bindDataToCylinder(dataItem, '', minN, maxN);
                        break;
                    case iv_3d_object_1.Iv3dObjectType.cube:
                    default:
                        this.bindDataToCube(dataItem, '', minN, maxN);
                        break;
                }
            }
        }
    };
    DataSourcePlugin.prototype.bindDataToSphere = function (data, key, minN, maxN) {
        var label = data.label;
        var value = data.value;
        var obj = this.objHandler.createDefaultObject(iv_3d_object_1.Iv3dObjectType.sphere, iv_3d_object_1.Iv3dGeometryType.sphere);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        var radiusProp = this.objHandler.getProp('radius', obj.geometryProps);
        var v = this.scaleValue(value, minN, maxN);
        radiusProp.value = v;
        this.bindDataToObject(obj, data, key);
    };
    DataSourcePlugin.prototype.bindDataToCube = function (data, key, minN, maxN) {
        var label = data.label;
        var value = data.value;
        var obj = this.objHandler.createDefaultObject(iv_3d_object_1.Iv3dObjectType.cube, iv_3d_object_1.Iv3dGeometryType.box);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        var widthProp = this.objHandler.getProp('width', obj.geometryProps);
        var heightProp = this.objHandler.getProp('height', obj.geometryProps);
        var depthProp = this.objHandler.getProp('depth', obj.geometryProps);
        var v = this.scaleValue(value, minN, maxN);
        widthProp.value = v;
        heightProp.value = v;
        depthProp.value = v;
        this.bindDataToObject(obj, data, key);
    };
    DataSourcePlugin.prototype.bindDataToTorus = function (data, key, minN, maxN) {
        var label = data.label;
        var value = data.value;
        var obj = this.objHandler.createDefaultObject(iv_3d_object_1.Iv3dObjectType.torus, iv_3d_object_1.Iv3dGeometryType.torus);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        var radiusProp = this.objHandler.getProp('radius', obj.geometryProps);
        var tubeProp = this.objHandler.getProp('tube', obj.geometryProps);
        var v = this.scaleValue(value, minN, maxN);
        radiusProp.value = v;
        tubeProp.value = v / 2;
        this.bindDataToObject(obj, data, key);
    };
    DataSourcePlugin.prototype.bindDataToTorusKnot = function (data, key, minN, maxN) {
        var label = data.label;
        var value = data.value;
        var obj = this.objHandler.createDefaultObject(iv_3d_object_1.Iv3dObjectType.torusKnot, iv_3d_object_1.Iv3dGeometryType.torusKnot);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        var radiusProp = this.objHandler.getProp('radius', obj.geometryProps);
        var tubeProp = this.objHandler.getProp('tube', obj.geometryProps);
        var v = this.scaleValue(value, minN, maxN);
        radiusProp.value = v;
        tubeProp.value = v / 4;
        this.bindDataToObject(obj, data, key);
    };
    DataSourcePlugin.prototype.bindDataToCylinder = function (data, key, minN, maxN) {
        var label = data.label;
        var value = data.value;
        var obj = this.objHandler.createDefaultObject(iv_3d_object_1.Iv3dObjectType.cylinder, iv_3d_object_1.Iv3dGeometryType.cylinder);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        var radiusTopProp = this.objHandler.getProp('radiusTop', obj.geometryProps);
        var radiusBottomProp = this.objHandler.getProp('radiusBottom', obj.geometryProps);
        var heightProp = this.objHandler.getProp('height', obj.geometryProps);
        var v = this.scaleValue(value, minN, maxN);
        radiusTopProp.value = v;
        radiusBottomProp.value = v;
        heightProp.value = v / 2;
        this.bindDataToObject(obj, data, key);
    };
    DataSourcePlugin.prototype.bindDataToParticles = function (data, key, minN, maxN) {
        var label = data.label;
        var value = data.value;
        var obj = this.objHandler.createDefaultObject(iv_3d_object_1.Iv3dObjectType.particles, iv_3d_object_1.Iv3dGeometryType.particles);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        var countProp = this.objHandler.getProp('count', obj.geometryProps);
        var rangeProp = this.objHandler.getProp('range', obj.geometryProps);
        var v = this.scaleValue(value, minN, maxN);
        var stdCountProp = this.objHandler.getProp('count', this.objHandler.particleGeomProps);
        var count = this.scaleValue(value, stdCountProp.min, stdCountProp.max);
        countProp.value = value;
        rangeProp.value = v;
        this.bindDataToObject(obj, data, key);
    };
    DataSourcePlugin.prototype.scaleValue = function (value, minN, maxN) {
        var nearProp = this.objHandler.getProp('near', this.data.cameraProps);
        var farProp = this.objHandler.getProp('far', this.data.cameraProps);
        var fovProp = this.objHandler.getProp('fov', this.data.cameraProps);
        if (minN === maxN)
            minN = 0;
        var min = minN;
        var max = maxN;
        var a = nearProp.value / fovProp.value;
        var b = farProp.value / fovProp.value;
        var v = (b - a) * (value - min) / (max - min) + a;
        return v;
    };
    DataSourcePlugin.prototype.interpolate = function (x, minN, maxN) {
        return minN * (1 - x) + maxN * x;
    };
    DataSourcePlugin.prototype.uninterpolate = function (x, a, b) {
        var factor = (b - a) != 0 ? b - a : 1 / b;
        return (x - a) / factor;
    };
    DataSourcePlugin.prototype.scaleValueXYZ = function (x, minN, maxN) {
        var nearProp = this.objHandler.getProp('near', this.data.cameraProps);
        var farProp = this.objHandler.getProp('far', this.data.cameraProps);
        var fixMin = 1;
        var fixMax = 1000000;
        var min = cfg.U.isEmpty(minN) ? fixMin : (minN < fixMin ? minN : fixMin);
        var max = cfg.U.isEmpty(maxN) ? fixMax : (maxN > fixMax ? maxN : fixMax);
        var a = nearProp.value;
        var b = farProp.value;
        return this.interpolate(this.uninterpolate(x, a, b), min, max);
    };
    DataSourcePlugin.prototype.bindDataToObject = function (obj, data, key) {
        var _this = this;
        var label = data.label;
        var value = data.value;
        var useCanvasProp = this.objHandler.getProp('useCanvas', obj.materialProps);
        useCanvasProp.value = false;
        var textProp = this.objHandler.getProp('text', obj.materialProps);
        textProp.value = value;
        var colorProp = this.objHandler.getProp('color', obj.materialProps);
        colorProp.value = '#' + (Math.random() * 0xFFFFFF).toString(16);
        var matTypeProp = this.objHandler.getProp('type', obj.materialProps);
        if (obj.meshType === iv_3d_object_1.Iv3dObjectType.particles) {
            matTypeProp.value = 'PointsMaterial';
        }
        else {
            matTypeProp.value = 'MeshPhongMaterial';
        }
        this.objHandler.loadObject(obj, this.w, this.mainGroup, this.demo, this.isPublic, key, function (threeObj) {
            var r = Math.random();
            var vx = r > 0.5 ? +1 : -1;
            r = Math.random();
            var vy = r < 0.5 ? +1 : -1;
            r = Math.random();
            var vz = r > 0.5 ? +1 : -1;
            var aspectProp = _this.objHandler.getProp('aspect', _this.data.cameraProps);
            var fovProp = _this.objHandler.getProp('fov', _this.data.cameraProps);
            var q = aspectProp.value * fovProp.value;
            var qX = 3 * q, qY = 2 * q, qZ = 3 * q;
            var px = Math.random() * qX * vx, py = Math.random() * qY * vy, pz = Math.random() * qZ * vz;
            threeObj.position.set(px, py, pz);
            //threeObj.geometry.computeBoundingBox();
            //let bbox = threeObj.geometry.boundingBox;
            //let sy = py < 0 ? bbox.max.y + 10 : bbox.min.y + 10;
            var bbox = new THREE.Box3().setFromObject(threeObj);
            var sx = bbox.max.x;
            var sy = bbox.max.y + 10;
            var sz = bbox.max.z;
            var spriteCfg = { color: 0x0, position: { x: px, y: sy, z: pz } };
            var sValue = '';
            if (_this.dataSource.valueFormat === iv_3d_data_source_1.Iv3dDataSourceValueFormat.currency)
                sValue = "" + numeral(data.value).format('($0,0.00)');
            else if (_this.dataSource.valueFormat === iv_3d_data_source_1.Iv3dDataSourceValueFormat.number)
                sValue = "" + numeral(data.value).format('(0,0.00)');
            else
                sValue = "" + data.value;
            var label = data.label + ": " + sValue;
            var textWidth = label.length * 10;
            var textHeight = 20;
            var fontSize = 12;
            var textureCfg = {
                canvas: {
                    text: label,
                    width: textWidth, height: textHeight,
                    backgroundColor: _this.dataSource.textBackgroundColor, textColor: _this.dataSource.textColor, fontSize: fontSize, font: fontSize + "pt Arial", textAlign: 'center', textBaseline: 'middle'
                }
            };
            var spriteTextObj = _this.w.addTextSprite(spriteCfg, textureCfg, _this.mainGroup);
            spriteTextObj.objectId = threeObj.uuid;
            threeObj.spriteId = spriteTextObj.uuid;
            threeObj.spriteParentId = spriteTextObj.parent.uuid;
            // sprite.scale.set(20, 10, 10);
            var attemptsCount = 10;
            var attempt = 0;
            while (attempt < attemptsCount && _this.w.checkObjectOverlap(threeObj, _this.mainGroup.children)) {
                px = Math.random() * qX * vx;
                py = Math.random() * qY * vy;
                pz = Math.random() * qZ * vz;
                threeObj.position.set(px, py, pz);
                //threeObj.geometry.computeBoundingBox();
                //let bbox = threeObj.geometry.boundingBox;
                //let sy = py < 0 ? bbox.max.y + 10 : bbox.min.y + 10;
                var bbox_1 = new THREE.Box3().setFromObject(threeObj);
                var sx_1 = bbox_1.max.x;
                var sy_1 = bbox_1.max.y + 10;
                var sz_1 = bbox_1.max.z;
                spriteTextObj.position.set(px, sy_1, pz);
                attempt++;
            }
        });
    };
    DataSourcePlugin.prototype.filterDataSourceItems = function (event) {
        var filterText = event.filterText;
        var minVal = event.minVal;
        var maxVal = event.maxVal;
        var filteredItems = event.filteredItems;
        for (var _i = 0, _a = this.mainGroup.children; _i < _a.length; _i++) {
            var threeObj = _a[_i];
            var obj = threeObj.userData;
            if (obj) {
                var item = obj.dataSourceItem;
                threeObj.visible = (item && filteredItems.indexOf(item) >= 0);
                var spriteParentObj = this.find3dObjectById(threeObj.spriteParentId);
                if (spriteParentObj) {
                    spriteParentObj.visible = threeObj.visible;
                    spriteParentObj.children[0].visible = threeObj.visible;
                }
            }
        }
    };
    DataSourcePlugin.prototype.find3dObjectById = function (uuid) {
        var obj = this.mainGroup.children.find(function (item) { return item.uuid === uuid; });
        return obj;
    };
    return DataSourcePlugin;
}());
exports.DataSourcePlugin = DataSourcePlugin;
