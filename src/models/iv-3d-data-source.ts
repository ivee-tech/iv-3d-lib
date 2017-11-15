import { Iv3dObjectType } from './iv-3d-object';
import * as cfg from '../wgl-util-cfgs';

export class Iv3dDataSource {
    title: string = '';
    // patternUrl: string;
    url: string;
    items: Iv3dDataSourceItem[] = [];
    type: Iv3dObjectType = Iv3dObjectType.cube;
    textBackgroundColor: string = '#FFF';
    textColor: string = '#000';
    valueFormat: Iv3dDataSourceValueFormat = Iv3dDataSourceValueFormat.none;
    panelCss: cfg.CssCfg = new cfg.CssCfg();
    page: number = 1;
    pageSize: number = 50;
    // drilldownPatternUrl: string;
    dataSourceIndex: number = 0;
    urls: Iv3dDataSourceUrl[] = [];
}

export class Iv3dDataSourceItem {
    id: string;
    label: string;
    value: number;
}

export enum Iv3dDataSourceValueFormat {
    none = <any>'',
    currency = <any>'currency',
    number = <any>'number'
}

export enum Iv3dSortType {
    none = <any>'',
    asc = <any>'asc',
    desc = <any>'desc'
}

export enum Iv3dDataType {
    none = <any>'',
    string = <any>'string',
    number = <any>'number',
    date = <any>'date'
}

export class Iv3dDataSourceUrl {
    url: string = '';
    patternUrl: string = '';
    title: string = '';
    type: Iv3dObjectType = Iv3dObjectType.cube;
}
