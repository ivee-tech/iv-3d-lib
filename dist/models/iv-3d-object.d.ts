import { Iv3dObjectProperty } from './iv-3d-object-property';
import { Iv3dDataSourceItem } from './iv-3d-data-source';
export declare class Iv3dObject {
    name: string;
    uuid: string;
    url: string;
    meshType: Iv3dObjectType;
    objectProps: Iv3dObjectProperty[];
    geometryProps: Iv3dObjectProperty[];
    materialProps: Iv3dObjectProperty[];
    cfgProps: Iv3dObjectProperty[];
    children: Iv3dObject[];
    contentPanels: string;
    visibleRuntime: boolean;
    sVisibleRuntime: string;
    script: string;
    dataSourceItem: Iv3dDataSourceItem;
}
export declare enum Iv3dObjectType {
    none,
    group,
    line,
    plane,
    circle,
    cube,
    sphere,
    cylinder,
    torus,
    torusKnot,
    points,
    particles,
    text,
}
export declare enum Iv3dGeometryType {
    none,
    line,
    segment,
    circle,
    box,
    plane,
    sphere,
    cylinder,
    torus,
    torusKnot,
    text,
    particles,
}
export declare enum Iv3dMaterialType {
    none,
    lineBasic,
    lineDashed,
    meshBasic,
    meshDepth,
    meshLambert,
    meshPhong,
    meshStandard,
    meshToon,
    points,
    multi,
}
