"use strict";
const wgl_util_cfgs_1 = require('../wgl-util-cfgs');
class Timeline {
    constructor() {
        this.meshes = [];
        /*
        private _enabled: boolean = true;
        get enabled() {
            return this._enabled;
        }
        set enabled(value: boolean) {
            this._enabled = value;
        }
        */
        this.enabled = true;
        this.sEnabled = 'true';
        this.cameraPositionDisplacement = new DisplacementXYZ();
        this.cameraDirection = { x: 1, y: 1, z: 1 };
        this.meshCameraVerticesDisplacement = new DisplacementXYZ();
    }
}
exports.Timeline = Timeline;
class Displacement {
    constructor() {
        this.displacement = 0;
        this.min = 0;
        this.max = 0;
        this.enabled = true;
        this.expression = new wgl_util_cfgs_1.Expr();
        this.useCurrent = false;
    }
}
exports.Displacement = Displacement;
class DisplacementXYZ {
    constructor() {
        this.displacement = new wgl_util_cfgs_1.XYZ();
        this.min = new wgl_util_cfgs_1.XYZ();
        this.max = new wgl_util_cfgs_1.XYZ();
        this.enabled = true;
        this.expression = new wgl_util_cfgs_1.ExprXYZ();
        this.useCurrent = false; // flag used in tweening, indicating the change should start from the current object value, instead of the min value
        this.yoyo = false; // flag used in tweening, to apply the "yoyo" effect
        this.repeat = 0; // number indicating the following: if > 0 - how many times the tween should repeat; 0 - no repeat; < 0 - infinite repetitions
        this.trigger = TriggerType.none;
        this.runtimeReverse = false; // flag used in tweening; when true the tween should execute in reverse (reset the tween properties to the original values)
        this.script = '';
    }
}
exports.DisplacementXYZ = DisplacementXYZ;
class TimelineMesh {
    constructor() {
        this.positionDisplacement = new DisplacementXYZ();
        this.positionDirection = new wgl_util_cfgs_1.XYZ(1, 1, 1);
        this.rotationDisplacement = new DisplacementXYZ();
        this.rotationDirection = new wgl_util_cfgs_1.XYZ(1, 1, 1);
        this.scaleDisplacement = new DisplacementXYZ();
        this.scaleDirection = new wgl_util_cfgs_1.XYZ(1, 1, 1);
        this.visible = true;
        this.tweens = [];
        this.runtimeTweens = [];
        this.runtimeTweenReverseMouseDown = false;
        this.runtimeTweenReverseMouseUp = false;
    }
}
exports.TimelineMesh = TimelineMesh;
class Tween {
    constructor() {
        this.positionDisplacement = new DisplacementXYZ();
        this.rotationDisplacement = new DisplacementXYZ();
        this.scaleDisplacement = new DisplacementXYZ();
        this.colorDisplacement = new DisplacementXYZ();
    }
}
exports.Tween = Tween;
(function (TriggerType) {
    TriggerType[TriggerType["none"] = 'none'] = "none";
    TriggerType[TriggerType["onAnimate"] = 'onAnimate'] = "onAnimate";
    TriggerType[TriggerType["onMouseUp"] = 'onMouseUp'] = "onMouseUp";
    TriggerType[TriggerType["onMouseDown"] = 'onMouseDown'] = "onMouseDown";
})(exports.TriggerType || (exports.TriggerType = {}));
var TriggerType = exports.TriggerType;
//# sourceMappingURL=timeline.js.map