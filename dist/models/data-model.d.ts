import { Iv3dObject } from './iv-3d-object';
import { Iv3dLight } from './iv-3d-light';
import { Iv3dObjectProperty } from './iv-3d-object-property';
import { Timeline } from './timeline';
import { AdditionalContent } from './additional-content';
import { Iv3dScript } from './iv-3d-script';
import { Iv3dShader } from './iv-3d-shader';
import { Iv3dPlugin } from './iv-3d-plugin';
export declare class DataModel {
    mainGroup: any;
    container: Iv3dObject;
    lights: Iv3dLight[];
    timelines: Timeline[];
    cameraProps: Iv3dObjectProperty[];
    sceneProps: Iv3dObjectProperty[];
    audioProps: Iv3dObjectProperty[];
    additionalContents: AdditionalContent[];
    script: Iv3dScript;
    shaders: Iv3dShader[];
    dataSourceProps: Iv3dObjectProperty[];
    plugins: Iv3dPlugin[];
}
