import * as THREE from 'three';
import * as parser from 'expr-eval';
import * as numeral from 'numeral';

import { WglUtil } from './wgl-util';
import * as cfg from './wgl-util-cfgs';
import { ITimelinePlugin } from './i-timeline-plugin';
import { SimpleDictionary } from './models/simple-dictionary';
import { Timeline, DisplacementXYZ, TimelineMesh } from './models/timeline';
import { ErrorService } from './services/error-service';
import { DataModel } from './models/data-model';
import { Iv3dDataSource, Iv3dDataSourceItem, Iv3dDataSourceValueFormat, Iv3dDataSourceUrl } from './models/iv-3d-data-source';
import { Iv3dObject, Iv3dObjectType, Iv3dGeometryType } from './models/iv-3d-object';
import { Iv3dObjectHandler } from './iv-3d-object-handler';

export class DataSourcePlugin implements ITimelinePlugin {

    config: SimpleDictionary<any>;
    timeline: Timeline;
    data: DataModel;
    w: WglUtil;
    mainGroup: THREE.Group;

    constructor(private dataSource: Iv3dDataSource,
        private objHandler: Iv3dObjectHandler,
        private demo: boolean,
        private isPublic: boolean
    ) {
    }

    init() {
    }

    load() {
        this.loadDataSource();
    }

    update(time?: number) {
    }

    private loadDataSource() {

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
            let valueFormatProp = this.objHandler.getProp('valueFormat', this.data.dataSourceProps);
            this.dataSource.valueFormat = valueFormatProp ? valueFormatProp.value : '';
            let dataItems: Iv3dDataSourceItem[] = this.dataSource.items; //.filter(item => item.value > 1000);
            let values: number[] = dataItems.map(item => item.value);
            let minN = Math.min(...values);
            minN = minN < 0 ? 2 * minN : 0;
            let maxN = Math.max(...values);
            maxN = maxN > 0 ? 2 * maxN : 0;
            // let titleProp = this.objHandler.getProp('title', this.data.dataSourceProps);
            // this.dataSource.title = titleProp ? titleProp.value : '';
            // let dsTypeProp = this.objHandler.getProp('type', this.data.dataSourceProps);
            let dsBackgroundColorProp = this.objHandler.getProp('textBackgroundColor', this.data.dataSourceProps);
            let dsTransparentBackgroundProp = this.objHandler.getProp('transparentBackground', this.data.dataSourceProps);
            if (dsTransparentBackgroundProp && dsTransparentBackgroundProp.value) {
                this.dataSource.textBackgroundColor = 'transparent';
            }
            else {
                this.dataSource.textBackgroundColor = dsBackgroundColorProp ? dsBackgroundColorProp.value : '#FFF';
            }
            let dsTextColorProp = this.objHandler.getProp('textColor', this.data.dataSourceProps);
            this.dataSource.textColor = dsTextColorProp ? dsTextColorProp.value : '#000';
            this.dataSource.panelCss = this.objHandler.getCssCfg(this.data.dataSourceProps);
            let pageProp = this.objHandler.getProp('page', this.data.dataSourceProps);
            if (pageProp && pageProp.value) {
                this.dataSource.page = pageProp.value;
            }
            let pageSizeProp = this.objHandler.getProp('pageSize', this.data.dataSourceProps);
            if (pageSizeProp && pageSizeProp.value) {
                this.dataSource.pageSize = pageSizeProp.value;
            }
            // let drilldownPatternUrlProp = this.objHandler.getProp('drilldownPatternUrl', this.data.dataSourceProps);
            // this.dataSource.drilldownPatternUrl = drilldownPatternUrlProp ? drilldownPatternUrlProp.value : '';
            // this.dataSource.dataSourceIndex = this.currentDataSourceIndex;
            // let dsType = this.dataSource.urls[this.currentDataSourceIndex] ? this.dataSource.urls[this.currentDataSourceIndex].type : Iv3dObjectType.cube;
            let dsType = this.dataSource.type;
            for (let dataItem of dataItems) {
                switch (dsType) {
                    case Iv3dObjectType.sphere:
                        this.bindDataToSphere(dataItem, '', minN, maxN);
                        break;
                    case Iv3dObjectType.particles:
                        this.bindDataToParticles(dataItem, '', minN, maxN);
                        break;
                    case Iv3dObjectType.torus:
                        this.bindDataToTorus(dataItem, '', minN, maxN);
                        break;
                    case Iv3dObjectType.torusKnot:
                        this.bindDataToTorusKnot(dataItem, '', minN, maxN);
                        break;
                    case Iv3dObjectType.cylinder:
                        this.bindDataToCylinder(dataItem, '', minN, maxN);
                        break;
                    case Iv3dObjectType.cube:
                    default:
                        this.bindDataToCube(dataItem, '', minN, maxN);
                        break;
                }
            }
        }
    }

    private bindDataToSphere(data: Iv3dDataSourceItem, key: string, minN?: number, maxN?: number) {
        let label = data.label;
        let value = data.value;
        let obj: Iv3dObject = this.objHandler.createDefaultObject(Iv3dObjectType.sphere, Iv3dGeometryType.sphere);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        let radiusProp = this.objHandler.getProp('radius', obj.geometryProps);
        let v = this.scaleValue(value, minN, maxN);
        radiusProp.value = v;
        this.bindDataToObject(obj, data, key);
    }

    private bindDataToCube(data: Iv3dDataSourceItem, key: string, minN?: number, maxN?: number) {
        let label = data.label;
        let value = data.value;
        let obj: Iv3dObject = this.objHandler.createDefaultObject(Iv3dObjectType.cube, Iv3dGeometryType.box);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        let widthProp = this.objHandler.getProp('width', obj.geometryProps);
        let heightProp = this.objHandler.getProp('height', obj.geometryProps);
        let depthProp = this.objHandler.getProp('depth', obj.geometryProps);
        let v = this.scaleValue(value, minN, maxN);
        widthProp.value = v;
        heightProp.value = v;
        depthProp.value = v;
        this.bindDataToObject(obj, data, key);
    }

    private bindDataToTorus(data: Iv3dDataSourceItem, key: string, minN?: number, maxN?: number) {
        let label = data.label;
        let value = data.value;
        let obj: Iv3dObject = this.objHandler.createDefaultObject(Iv3dObjectType.torus, Iv3dGeometryType.torus);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        let radiusProp = this.objHandler.getProp('radius', obj.geometryProps);
        let tubeProp = this.objHandler.getProp('tube', obj.geometryProps);
        let v = this.scaleValue(value, minN, maxN);
        radiusProp.value = v;
        tubeProp.value = v / 2;
        this.bindDataToObject(obj, data, key);
    }

    private bindDataToTorusKnot(data: Iv3dDataSourceItem, key: string, minN?: number, maxN?: number) {
        let label = data.label;
        let value = data.value;
        let obj: Iv3dObject = this.objHandler.createDefaultObject(Iv3dObjectType.torusKnot, Iv3dGeometryType.torusKnot);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        let radiusProp = this.objHandler.getProp('radius', obj.geometryProps);
        let tubeProp = this.objHandler.getProp('tube', obj.geometryProps);
        let v = this.scaleValue(value, minN, maxN);
        radiusProp.value = v;
        tubeProp.value = v / 4;
        this.bindDataToObject(obj, data, key);
    }

    private bindDataToCylinder(data: Iv3dDataSourceItem, key: string, minN?: number, maxN?: number) {
        let label = data.label;
        let value = data.value;
        let obj: Iv3dObject = this.objHandler.createDefaultObject(Iv3dObjectType.cylinder, Iv3dGeometryType.cylinder);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        let radiusTopProp = this.objHandler.getProp('radiusTop', obj.geometryProps);
        let radiusBottomProp = this.objHandler.getProp('radiusBottom', obj.geometryProps);
        let heightProp = this.objHandler.getProp('height', obj.geometryProps);
        let v = this.scaleValue(value, minN, maxN);
        radiusTopProp.value = v;
        radiusBottomProp.value = v;
        heightProp.value = v / 2;
        this.bindDataToObject(obj, data, key);
    }

    private bindDataToParticles(data: Iv3dDataSourceItem, key: string, minN?: number, maxN?: number) {
        let label = data.label;
        let value = data.value;
        let obj: Iv3dObject = this.objHandler.createDefaultObject(Iv3dObjectType.particles, Iv3dGeometryType.particles);
        obj.dataSourceItem = data;
        obj.script = 'onMeshClick(mesh)';
        this.data.container.children.push(obj);
        let countProp = this.objHandler.getProp('count', obj.geometryProps);
        let rangeProp = this.objHandler.getProp('range', obj.geometryProps);
        let v = this.scaleValue(value, minN, maxN);
        let stdCountProp = this.objHandler.getProp('count', this.objHandler.particleGeomProps);
        let count = this.scaleValue(value, stdCountProp.min, stdCountProp.max);
        countProp.value = value;
        rangeProp.value = v;
        this.bindDataToObject(obj, data, key);
    }

    private scaleValue(value: number, minN?: number, maxN?: number): number {
        let nearProp = this.objHandler.getProp('near', this.data.cameraProps);
        let farProp = this.objHandler.getProp('far', this.data.cameraProps);
        let fovProp = this.objHandler.getProp('fov', this.data.cameraProps);
        if (minN === maxN) minN = 0;
        let min = minN;
        let max = maxN;
        let a = nearProp.value / fovProp.value;
        let b = farProp.value / fovProp.value;
        let v = (b - a) * (value - min) / (max - min) + a;
        return v;
    }

    private interpolate(x: number, minN: number, maxN: number): number {
        return minN * (1 - x) + maxN * x;
    }

    private uninterpolate(x: number, a: number, b: number): number {
        let factor = (b - a) != 0 ? b - a : 1 / b;
        return (x - a) / factor;
    }

    public scaleValueXYZ(x: number, minN: number, maxN: number) {
        let nearProp = this.objHandler.getProp('near', this.data.cameraProps);
        let farProp = this.objHandler.getProp('far', this.data.cameraProps);
        let fixMin = 1;
        let fixMax = 1000000;
        let min = cfg.U.isEmpty(minN) ? fixMin : (minN < fixMin ? minN : fixMin);
        let max = cfg.U.isEmpty(maxN) ? fixMax : (maxN > fixMax ? maxN : fixMax);
        let a = nearProp.value;
        let b = farProp.value;
        return this.interpolate(this.uninterpolate(x, a, b), min, max);
    }

    private bindDataToObject(obj: Iv3dObject, data: Iv3dDataSourceItem, key: string) {
        let label = data.label;
        let value = data.value;
        let useCanvasProp = this.objHandler.getProp('useCanvas', obj.materialProps);
        useCanvasProp.value = false;
        let textProp = this.objHandler.getProp('text', obj.materialProps);
        textProp.value = value;
        let colorProp = this.objHandler.getProp('color', obj.materialProps);
        colorProp.value = '#' + (Math.random() * 0xFFFFFF).toString(16);
        let matTypeProp = this.objHandler.getProp('type', obj.materialProps);
        if (obj.meshType === Iv3dObjectType.particles) {
            matTypeProp.value = 'PointsMaterial';
        }
        else {
            matTypeProp.value = 'MeshPhongMaterial';
        }
        this.objHandler.loadObject(obj, this.w, this.mainGroup, this.demo, this.isPublic, key, (threeObj) => {
            var r = Math.random();
            var vx = r > 0.5 ? +1 : -1;
            r = Math.random();
            var vy = r < 0.5 ? +1 : -1;
            r = Math.random();
            var vz = r > 0.5 ? +1 : -1;
            let aspectProp = this.objHandler.getProp('aspect', this.data.cameraProps);
            let fovProp = this.objHandler.getProp('fov', this.data.cameraProps);
            let q = aspectProp.value * fovProp.value;
            var qX = 3 * q, qY = 2 * q, qZ = 3 * q;
            var px = Math.random() * qX * vx, py = Math.random() * qY * vy, pz = Math.random() * qZ * vz;
            threeObj.position.set(px, py, pz);
            //threeObj.geometry.computeBoundingBox();
            //let bbox = threeObj.geometry.boundingBox;
            //let sy = py < 0 ? bbox.max.y + 10 : bbox.min.y + 10;
            let bbox = new THREE.Box3().setFromObject(threeObj);
            let sx = bbox.max.x; let sy = bbox.max.y + 10; let sz = bbox.max.z;
            let spriteCfg: cfg.SpriteCfg = <cfg.SpriteCfg>{ color: 0x0, position: <cfg.XYZ>{ x: px, y: sy, z: pz } };
            let sValue = '';
            if (this.dataSource.valueFormat === Iv3dDataSourceValueFormat.currency)
                sValue = `${numeral(data.value).format('($0,0.00)')}`;
            else if (this.dataSource.valueFormat === Iv3dDataSourceValueFormat.number)
                sValue = `${numeral(data.value).format('(0,0.00)')}`;
            else
                sValue = `${data.value}`;
            let label = `${data.label}: ${sValue}`;
            let textWidth = label.length * 10;
            let textHeight = 20;
            let fontSize = 12;
            let textureCfg: cfg.TextureCfg = <cfg.TextureCfg>{
                canvas: <cfg.CanvasCfg>{
                    text: label
                    , width: textWidth, height: textHeight
                    , backgroundColor: this.dataSource.textBackgroundColor, textColor: this.dataSource.textColor, fontSize: fontSize, font: `${fontSize}pt Arial`, textAlign: 'center', textBaseline: 'middle'
                }
            };
            let spriteTextObj = this.w.addTextSprite(spriteCfg, textureCfg, this.mainGroup);
            spriteTextObj.objectId = threeObj.uuid;
            threeObj.spriteId = spriteTextObj.uuid;
            threeObj.spriteParentId = spriteTextObj.parent.uuid;


            // sprite.scale.set(20, 10, 10);
            let attemptsCount = 10;
            let attempt = 0;
            while (attempt < attemptsCount && this.w.checkObjectOverlap(threeObj, this.mainGroup.children)) {
                px = Math.random() * qX * vx;
                py = Math.random() * qY * vy;
                pz = Math.random() * qZ * vz;
                threeObj.position.set(px, py, pz);
                //threeObj.geometry.computeBoundingBox();
                //let bbox = threeObj.geometry.boundingBox;
                //let sy = py < 0 ? bbox.max.y + 10 : bbox.min.y + 10;
                let bbox = new THREE.Box3().setFromObject(threeObj);
                let sx = bbox.max.x; let sy = bbox.max.y + 10; let sz = bbox.max.z;
                spriteTextObj.position.set(px, sy, pz);
                attempt++;
            }
        });
    }

    public filterDataSourceItems(event) {
        let filterText: string = event.filterText;
        let minVal: number = event.minVal;
        let maxVal: number = event.maxVal;
        let filteredItems: Iv3dDataSourceItem[] = event.filteredItems;
        for (let threeObj of this.mainGroup.children) {
            let obj: Iv3dObject = <Iv3dObject>threeObj.userData;
            if (obj) {
                let item: Iv3dDataSourceItem = obj.dataSourceItem;
                threeObj.visible = (item && filteredItems.indexOf(item) >= 0);
                let spriteParentObj = this.find3dObjectById(threeObj.spriteParentId);
                if (spriteParentObj) {
                    spriteParentObj.visible = threeObj.visible;
                    spriteParentObj.children[0].visible = threeObj.visible;
                }
            }
        }
    }

    private find3dObjectById(uuid: string) {
        let obj = this.mainGroup.children.find(item => item.uuid === uuid);
        return obj;
    }

}
