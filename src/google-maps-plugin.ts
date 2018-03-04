import * as THREE from 'three';
import * as parser from 'expr-eval';

import { WglUtil } from './wgl-util';
import { SimpleDictionary } from './models/simple-dictionary';
import { Timeline } from './models/timeline';
import { DataModel } from './models/data-model';
import { ITimelinePlugin } from './i-timeline-plugin';
import { Expr, ExprXYZ } from './wgl-util-cfgs';
import { Iv3dScript } from './models/iv-3d-script';

export class GoogleMapsPlugin implements ITimelinePlugin {
    config: SimpleDictionary<any>;
    timeline: Timeline;
    data: DataModel;
    w: WglUtil;
    mainGroup: THREE.Group;

    private oParser: parser.Parser = new parser.Parser();
    private frameId: string = 'iv3d_googlemaps_iframe1';
    
    init() {
        this.w.cfg.useCssRender = true;
        this.w.cfg.useOrbit = true;
    }

    load() {
        this.cfgScripts();
        this.cfgGooleMaps();
    }

    update(time?: number) {
    }

    private cfgScripts() {
        if(!this.data.script) {
            this.data.script = new Iv3dScript();
        }
        this.data.script.init += `
function googleMapsPlugin_initCustomData() {
    viewer.customData['place'] = \'${this.config['place']}\';
    var txtPlace = document.getElementById('txtPlace');
    if(txtPlace) {
        txtPlace.value = viewer.customData['place'];
    }
}

function updateGoogleMapsPluginConfig() {
    var txtPlace = document.getElementById('txtPlace');
    if(txtPlace) {
        viewer.googleMapsPlugin.config['place'] = txtPlace.value;
    }
    viewer.googleMapsPlugin.reloadGoogleMaps();
}
`;
        this.data.script.execInit += `
googleMapsPlugin_initCustomData();
`;
            }

    private cfgGooleMaps() {
        let wExpr = new Expr(this.config['width']);
        wExpr.fn = this.oParser.parse(wExpr.expression);
        let hExpr = new Expr(this.config['height']);
        hExpr.fn = this.oParser.parse(hExpr.expression);
        let posXYZ: ExprXYZ = new ExprXYZ(this.config['position_x'], this.config['position_y'], this.config['position_z']);
        posXYZ.fnx = this.oParser.parse(posXYZ.x); posXYZ.fny = this.oParser.parse(posXYZ.y); posXYZ.fnz = this.oParser.parse(posXYZ.z);
        let rotXYZ: ExprXYZ = new ExprXYZ(this.config['rotation_x'], this.config['rotation_y'], this.config['rotation_z']);
        rotXYZ.fnx = this.oParser.parse(rotXYZ.x); rotXYZ.fny = this.oParser.parse(rotXYZ.y); rotXYZ.fnz = this.oParser.parse(rotXYZ.z);
        let cfg = {
            url: this.getUrl(),
            width: wExpr.fn.evaluate({ window: window, PI: Math.PI } ),
            height: hExpr.fn.evaluate({ window: window, PI: Math.PI }),
            position: { 
                x: posXYZ.fnx.evaluate({ window: window, PI: Math.PI }),
                y: posXYZ.fny.evaluate({ window: window, PI: Math.PI }), 
                z: posXYZ.fnz.evaluate({ window: window, PI: Math.PI }) 
            },
            rotation: { 
                x: rotXYZ.fnx.evaluate({ window: window, PI: Math.PI }),
                y: rotXYZ.fny.evaluate({ window: window, PI: Math.PI }),
                z: rotXYZ.fnz.evaluate({ window: window, PI: Math.PI })
            }
        };
        this.w.create3dPage(
            cfg.width, cfg.height,
            new THREE.Vector3(cfg.position.x, cfg.position.y, cfg.position.z),
            new THREE.Vector3(cfg.rotation.x, cfg.rotation.y, cfg.rotation.z),
            cfg.url, this.frameId);
    }

    private getUrl() {
        let place = this.config['place'];
        let origin = this.config['origin'];
        let destination = this.config['destination'];
        let url: string = '';
        if(origin && destination) {
            url = `https://www.google.com/maps/embed/v1/directions?origin=${origin}&destination=${destination}&zoom=${this.config['zoom']}&key=${this.config['key']}`;
        }
        else {
            url = `https://www.google.com/maps/embed/v1/place?q=${place}&zoom=${this.config['zoom']}&key=${this.config['key']}`;
        }
        return url;
    }

    public reloadGoogleMaps() {
        let url:string = this.getUrl();
        this.w.refresh3dPage(this.frameId, url);
    }

}
