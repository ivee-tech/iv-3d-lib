import { Iv3dObjectType } from './iv-3d-object';
import * as cfg from '../wgl-util-cfgs';
export declare class Iv3dDataSource {
    title: string;
    url: string;
    items: Iv3dDataSourceItem[];
    type: Iv3dObjectType;
    textBackgroundColor: string;
    textColor: string;
    valueFormat: Iv3dDataSourceValueFormat;
    panelCss: cfg.CssCfg;
    page: number;
    pageSize: number;
    dataSourceIndex: number;
    urls: Iv3dDataSourceUrl[];
}
export declare class Iv3dDataSourceItem {
    id: string;
    label: string;
    value: number;
}
export declare enum Iv3dDataSourceValueFormat {
    none,
    currency,
    number,
}
export declare enum Iv3dSortType {
    none,
    asc,
    desc,
}
export declare enum Iv3dDataType {
    none,
    string,
    number,
    date,
}
export declare class Iv3dDataSourceUrl {
    url: string;
    patternUrl: string;
    title: string;
    type: Iv3dObjectType;
}
