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

    static createMirrorCubePlugin(): Iv3dPlugin {
        let p: Iv3dPlugin = <Iv3dPlugin>{
            id: KGen.uuid(),
            type: Iv3dPluginType.mirrorCube,
            cfg: [
                <NameValue>{ id: KGen.uuid(6), name: 'near', value: 0.1 },
                <NameValue>{ id: KGen.uuid(6), name: 'far', value: 10000 },
                <NameValue>{ id: KGen.uuid(6), name: 'resolution', value: 1024 },
                <NameValue>{ id: KGen.uuid(6), name: 'dimension_x', value: 400 },
                <NameValue>{ id: KGen.uuid(6), name: 'dimension_y', value: 400 },
                <NameValue>{ id: KGen.uuid(6), name: 'dimension_z', value: 10 },
                <NameValue>{ id: KGen.uuid(6), name: 'position_x', value: 100 },
                <NameValue>{ id: KGen.uuid(6), name: 'position_y', value: 100 },
                <NameValue>{ id: KGen.uuid(6), name: 'position_z', value: 100 },
            ]
        };
        return p;
    }

    static createGoogleMapsPlugin(): Iv3dPlugin {
        let p: Iv3dPlugin = <Iv3dPlugin>{
            id: KGen.uuid(),
            type: Iv3dPluginType.googleMaps,
            cfg: [
                <NameValue>{ id: KGen.uuid(6), name: 'place', value: '' },
                <NameValue>{ id: KGen.uuid(6), name: 'origin', value: '' },
                <NameValue>{ id: KGen.uuid(6), name: 'destination', value: '' },
                <NameValue>{ id: KGen.uuid(6), name: 'zoom', value: '15' },
                <NameValue>{ id: KGen.uuid(6), name: 'key', value: '' },
                <NameValue>{ id: KGen.uuid(6), name: 'width', value: 'window.innerWidth' },
                <NameValue>{ id: KGen.uuid(6), name: 'height', value: 'window.innerHeight' },
                <NameValue>{ id: KGen.uuid(6), name: 'position_x', value: '0' },
                <NameValue>{ id: KGen.uuid(6), name: 'position_y', value: '0' },
                <NameValue>{ id: KGen.uuid(6), name: 'position_z', value: '0' },
                <NameValue>{ id: KGen.uuid(6), name: 'rotation_x', value: '0' },
                <NameValue>{ id: KGen.uuid(6), name: 'rotation_y', value: '0' },
                <NameValue>{ id: KGen.uuid(6), name: 'rotation_z', value: '0' },
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
    threejsTerrain = <any>'threejsTerrain',
    mirrorCube = <any>'mirrorCube',
    googleMaps = <any>'googleMaps',
}
