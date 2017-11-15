import { NameValue } from './name-value';
export declare class Iv3dPlugin {
    id: string;
    type: Iv3dPluginType;
    cfg: NameValue[];
    static createSkyboxPlugin(): Iv3dPlugin;
    static createThreejsTerrainPlugin(): Iv3dPlugin;
}
export declare enum Iv3dPluginType {
    none,
    camera,
    skybox,
    dataSource,
    threejsTerrain,
}
