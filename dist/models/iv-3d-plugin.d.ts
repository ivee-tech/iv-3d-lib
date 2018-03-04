import { NameValue } from './name-value';
export declare class Iv3dPlugin {
    id: string;
    type: Iv3dPluginType;
    cfg: NameValue[];
    static createSkyboxPlugin(): Iv3dPlugin;
    static createThreejsTerrainPlugin(): Iv3dPlugin;
    static createMirrorCubePlugin(): Iv3dPlugin;
    static createGoogleMapsPlugin(): Iv3dPlugin;
}
export declare enum Iv3dPluginType {
    none,
    camera,
    skybox,
    dataSource,
    threejsTerrain,
    mirrorCube,
    googleMaps,
}
