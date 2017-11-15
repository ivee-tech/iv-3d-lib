import * as THREE from 'three';

import { WglUtil } from './wgl-util';
import { SimpleDictionary } from './models/simple-dictionary';
import { Timeline } from './models/timeline';
import { DataModel } from './models/data-model';
import { ITimelinePlugin } from './i-timeline-plugin';

export class SkyBoxPlugin implements ITimelinePlugin {
    config: SimpleDictionary<any>;
    timeline: Timeline;
    data: DataModel;
    w: WglUtil;
    mainGroup: THREE.Group;

    init() {
    }

    load() {
        this.addSkyBox();
    }

    update(time?: number) {
    }

    private addSkyBox() {
        let cfg = {
            srcFile: this.config['srcFile'], size: this.config['size']
        };
        this.w.addSkyBoxFromFile(cfg, this.mainGroup);
    }

}
