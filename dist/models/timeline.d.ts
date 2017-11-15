import { XYZ, Expr, ExprXYZ } from '../wgl-util-cfgs';
export declare class Timeline {
    name: string;
    meshes: TimelineMesh[];
    enabled: boolean | string;
    sEnabled: string;
    cameraPositionDisplacement: DisplacementXYZ;
    cameraDirection: XYZ;
    duration: number;
    meshCameraVerticesDisplacement: DisplacementXYZ;
    meshCameraVerticesUUID: string;
}
export declare class Displacement {
    displacement: number;
    min: number;
    max: number;
    enabled: boolean;
    expression: Expr;
    easing: string;
    duration: number;
    useCurrent: boolean;
}
export declare class DisplacementXYZ {
    displacement: XYZ;
    min: XYZ;
    max: XYZ;
    enabled: boolean;
    expression: ExprXYZ;
    easing: string;
    duration: number;
    useCurrent: boolean;
    yoyo: boolean;
    repeat: number;
    trigger: TriggerType;
    runtimeReverse: boolean;
    script: string;
}
export declare class TimelineMesh {
    uuid: string;
    positionDisplacement: DisplacementXYZ;
    positionDirection: XYZ;
    rotationDisplacement: DisplacementXYZ;
    rotationDirection: XYZ;
    scaleDisplacement: DisplacementXYZ;
    scaleDirection: XYZ;
    visible: boolean;
    tweens: Tween[];
    runtimeTweens: any[];
    runtimeTweenReverseMouseDown: boolean;
    runtimeTweenReverseMouseUp: boolean;
}
export declare class Tween {
    positionDisplacement: DisplacementXYZ;
    rotationDisplacement: DisplacementXYZ;
    scaleDisplacement: DisplacementXYZ;
    colorDisplacement: DisplacementXYZ;
    chain: boolean;
    enabled: boolean;
}
export declare enum TriggerType {
    none,
    onAnimate,
    onMouseUp,
    onMouseDown,
}
