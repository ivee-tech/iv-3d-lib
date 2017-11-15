import { SimpleDictionary } from './simple-dictionary';
import { NameValue } from './name-value';
import { KGen } from './k-gen';

export class Iv3dPlugin {

    id: string;
    type: Iv3dPluginType = Iv3dPluginType.none;
    cfg: NameValue[] = [];


    static createSkyboxPlugin(): Iv3dPlugin {
        let p: Iv3dPlugin = <Iv3dPlugin>{
            id: KGen.uuid(),
            type: Iv3dPluginType.skybox,
            cfg: [
                <NameValue>{ id: KGen.uuid(6), name: 'srcFile', value: '' },
                <NameValue>{ id: KGen.uuid(6), name: 'size', value: 1024 }
            ]
        };
        return p;
    }

    static createThreejsTerrainPlugin(): Iv3dPlugin {
        let p: Iv3dPlugin = <Iv3dPlugin>{
            id: KGen.uuid(),
            type: Iv3dPluginType.threejsTerrain,
            cfg: [
                <NameValue>{ id: KGen.uuid(6), name: 'shaderNoiseId', value: '' },
                <NameValue>{ id: KGen.uuid(6), name: 'diffuseTexture1FilePath', value: '' },
                <NameValue>{ id: KGen.uuid(6), name: 'diffuseTexture2FilePath', value: '' },
                <NameValue>{ id: KGen.uuid(6), name: 'detailTextureFilePath', value: '' },
            ]
        };
        return p;
    }
}

export enum Iv3dPluginType {
    none = <any>'',
    camera = <any>'camera',
    skybox = <any>'skybox',
    dataSource = <any>'dataSource',
    threejsTerrain = <any>'threejsTerrain'
}
