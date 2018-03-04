import * as THREE from 'three';

import { WglUtil } from './wgl-util';
import { SimpleDictionary } from './models/simple-dictionary';
import { Timeline } from './models/timeline';
import { DataModel } from './models/data-model';
import { ITimelinePlugin } from './i-timeline-plugin';

export class MirrorCubePlugin implements ITimelinePlugin {
    config: SimpleDictionary<any>;
    timeline: Timeline;
    data: DataModel;
    w: WglUtil;
    mainGroup: THREE.Group;

    private scaleAxis: string = "x";
    
    init() {
    }

    load() {
        this.cfgMirrorCube();
    }

    update(time?: number) {
        this.w.updateMirrorCube();
    }

    private cfgMirrorCube() {
        let cfg = {
            near: this.config['near'], far: this.config['size'], resolution: this.config['resolution'],
            dimension: { x: this.config['dimension_x'], y: this.config['dimension_y'], z: this.config['dimension_z'] },
            position: { x: this.config['position_x'], y: this.config['position_y'], z: this.config['position_z'] }
        };
        this.w.addMirrorCube(cfg);
    }
    
    private changeScale() {
        switch(this.scaleAxis) {
            case "x":
                this.w.camera.projectionMatrix.scale(new THREE.Vector3(-1, 1, 1));
                this.scaleAxis = "y";
                break;
            case "y":
                this.w.camera.projectionMatrix.scale(new THREE.Vector3(1, -1, 1));
                this.scaleAxis = "z";
                break;
            case "z":
                this.w.camera.projectionMatrix.scale(new THREE.Vector3(1, 1, -1));
                this.scaleAxis = "";
                break;
            default:
                this.w.camera.updateProjectionMatrix();
                this.scaleAxis = "x";
                break;
        }
    }
    
    
}
