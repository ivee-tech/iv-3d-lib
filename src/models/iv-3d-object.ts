import { Iv3dObjectProperty } from './iv-3d-object-property';
import { Iv3dDataSource, Iv3dDataSourceItem } from './iv-3d-data-source';

export class Iv3dObject {

    name: string = '';
    uuid: string = '';
    url: string = '';
    meshType: Iv3dObjectType = Iv3dObjectType.none;
    objectProps: Iv3dObjectProperty[] = [];
    geometryProps: Iv3dObjectProperty[] = [];
    materialProps: Iv3dObjectProperty[] = [];
    cfgProps: Iv3dObjectProperty[] = [];
    children: Iv3dObject[] = [];
    contentPanels: string = '';
    visibleRuntime: boolean = true;
    sVisibleRuntime: string = 'true';
    script: string;
    dataSourceItem: Iv3dDataSourceItem = null;
}


export enum Iv3dObjectType {
    none = <any>'',
    group = <any>'group',
    line = <any>'line',
    plane = <any>'plane',
    circle = <any>'circle',
    cube = <any>'cube',
    sphere = <any>'sphere',
    cylinder = <any>'cylinder',
    torus = <any>'torus',
    torusKnot = <any>'torusKnot',
    points = <any>'points',
    particles = <any>'particles',
    text = <any>'text'
}

export enum Iv3dGeometryType {
    none = <any>'',
    line = <any>'Geometry',
    segment = <any>'Geometry',
    circle = <any>'CircleGeometry',
    box = <any>'BoxGeometry',
    plane = <any>'PlaneBufferGeometry',
    sphere = <any>'SphereGeometry',
    cylinder = <any>'CylinderGeometry',
    torus = <any>'TorusGeometry',
    torusKnot = <any>'TorusKnotGeometry',
    text = <any>'TextGeometry',
    particles = <any>'Particles'
}

export enum Iv3dMaterialType {
    none = <any>'',
    lineBasic = <any>'LineBasicMaterial',
    lineDashed = <any>'LineDashedMaterial',
    meshBasic = <any>'MeshBasicMaterial',
    meshDepth = <any>'MeshDepthMaterial',
    meshLambert = <any>'MeshLambertMaterial',
    meshPhong = <any>'MeshPhongMaterial',
    meshStandard = <any>'MeshStandardMaterial',
    meshToon = <any>'MeshToonMaterial',
    points = <any>'PointsMaterial',
    multi = <any>'MultiMaterial'
}


