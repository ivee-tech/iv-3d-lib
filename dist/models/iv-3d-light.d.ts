import { Iv3dObjectProperty } from './iv-3d-object-property';
export declare enum Iv3dLightType {
    none,
    ambient,
    directional,
    hemisphere,
    point,
    rectArea,
    spot,
}
export declare class Iv3dLight {
    name: string;
    uuid: string;
    type: Iv3dLightType;
    lightProps: Iv3dObjectProperty[];
}
