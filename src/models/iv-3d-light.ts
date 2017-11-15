import { Iv3dObjectProperty } from './iv-3d-object-property';

export enum Iv3dLightType {
    none = <any>'',
    ambient = <any>'AmbientLight',
    directional = <any>'DirectionalLight',
    hemisphere = <any>'HemisphereLight',
    point = <any>'PointLight',
    rectArea = <any>'RectAreaLight',
    spot = <any>'SpotLight'
}

export class Iv3dLight {

    public name: string = '';
    public uuid: string = '';
    public type: Iv3dLightType = Iv3dLightType.none;
    public lightProps: Iv3dObjectProperty[] = [];

}
