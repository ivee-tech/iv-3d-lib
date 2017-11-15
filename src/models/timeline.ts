import { XYZ, Expr, ExprXYZ } from '../wgl-util-cfgs';

export class Timeline {
    name: string;
    meshes: TimelineMesh[] = [];
    /*
    private _enabled: boolean = true;
    get enabled() {
        return this._enabled;
    }
    set enabled(value: boolean) {
        this._enabled = value;
    }
    */
    enabled: boolean | string = true;
    sEnabled: string = 'true';
    cameraPositionDisplacement: DisplacementXYZ = new DisplacementXYZ();
    cameraDirection: XYZ = { x: 1, y: 1, z: 1 };
    duration: number; // seconds
    meshCameraVerticesDisplacement: DisplacementXYZ = new DisplacementXYZ();
    meshCameraVerticesUUID: string;
}

export class Displacement {
    displacement: number = 0;
    min: number = 0;
    max: number = 0;
    enabled: boolean = true;
    expression: Expr = new Expr();
    easing: string;
    duration: number;
    useCurrent: boolean = false; 
}

export class DisplacementXYZ {
    displacement: XYZ = new XYZ();
    min: XYZ = new XYZ();
    max: XYZ = new XYZ();
    enabled: boolean = true;
    expression: ExprXYZ = new ExprXYZ();
    easing: string;
    duration: number; // milliseconds
    useCurrent: boolean = false; // flag used in tweening, indicating the change should start from the current object value, instead of the min value
    yoyo: boolean = false; // flag used in tweening, to apply the "yoyo" effect
    repeat: number = 0; // number indicating the following: if > 0 - how many times the tween should repeat; 0 - no repeat; < 0 - infinite repetitions
    trigger: TriggerType = TriggerType.none;
    runtimeReverse: boolean = false; // flag used in tweening; when true the tween should execute in reverse (reset the tween properties to the original values)
    script: string = '';
}

export class TimelineMesh {
    uuid: string;
    positionDisplacement: DisplacementXYZ = new DisplacementXYZ();
    positionDirection: XYZ = new XYZ(1, 1, 1);
    rotationDisplacement: DisplacementXYZ = new DisplacementXYZ();
    rotationDirection: XYZ = new XYZ(1, 1, 1);
    scaleDisplacement: DisplacementXYZ = new DisplacementXYZ();
    scaleDirection: XYZ = new XYZ(1, 1, 1);
    visible: boolean = true;
    tweens: Tween[] = [];
    runtimeTweens: any[] = [];
    runtimeTweenReverseMouseDown: boolean = false;
    runtimeTweenReverseMouseUp: boolean = false;
}

export class Tween {
    positionDisplacement: DisplacementXYZ = new DisplacementXYZ();
    rotationDisplacement: DisplacementXYZ = new DisplacementXYZ();
    scaleDisplacement: DisplacementXYZ = new DisplacementXYZ();
    colorDisplacement: DisplacementXYZ = new DisplacementXYZ();
    chain: boolean;
    enabled: boolean;
}

export enum TriggerType {
    none = <any>'none',
    onAnimate = <any>'onAnimate',
    onMouseUp = <any>'onMouseUp',
    onMouseDown = <any>'onMouseDown',
}
