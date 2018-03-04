import * as THREE from 'three';
import { WglUtil } from './wgl-util';
import { SimpleDictionary } from './models/simple-dictionary';
import { Timeline } from './models/timeline';
import { DataModel } from './models/data-model';
import { ITimelinePlugin } from './i-timeline-plugin';
export declare class GoogleMapsPlugin implements ITimelinePlugin {
    config: SimpleDictionary<any>;
    timeline: Timeline;
    data: DataModel;
    w: WglUtil;
    mainGroup: THREE.Group;
    private oParser;
    private frameId;
    init(): void;
    load(): void;
    update(time?: number): void;
    private cfgScripts();
    private cfgGooleMaps();
    private getUrl();
    reloadGoogleMaps(): void;
}
