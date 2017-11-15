"use strict";
var wgl_util_cfgs_1 = require('../wgl-util-cfgs');
var Timeline = (function () {
    function Timeline() {
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
    return Timeline;
}());
exports.Timeline = Timeline;
var Displacement = (function () {
    function Displacement() {
        this.displacement = 0;
        this.min = 0;
        this.max = 0;
        this.enabled = true;
        this.expression = new wgl_util_cfgs_1.Expr();
        this.useCurrent = false;
    }
    return Displacement;
}());
exports.Displacement = Displacement;
var DisplacementXYZ = (function () {
    function DisplacementXYZ() {
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
    return DisplacementXYZ;
}());
exports.DisplacementXYZ = DisplacementXYZ;
var TimelineMesh = (function () {
    function TimelineMesh() {
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
    return TimelineMesh;
}());
exports.TimelineMesh = TimelineMesh;
var Tween = (function () {
    function Tween() {
        this.positionDisplacement = new DisplacementXYZ();
        this.rotationDisplacement = new DisplacementXYZ();
        this.scaleDisplacement = new DisplacementXYZ();
        this.colorDisplacement = new DisplacementXYZ();
    }
    return Tween;
}());
exports.Tween = Tween;
(function (TriggerType) {
    TriggerType[TriggerType["none"] = 'none'] = "none";
    TriggerType[TriggerType["onAnimate"] = 'onAnimate'] = "onAnimate";
    TriggerType[TriggerType["onMouseUp"] = 'onMouseUp'] = "onMouseUp";
    TriggerType[TriggerType["onMouseDown"] = 'onMouseDown'] = "onMouseDown";
})(exports.TriggerType || (exports.TriggerType = {}));
var TriggerType = exports.TriggerType;
