"use strict";
const THREE = require('three');
class MirrorCubePlugin {
    constructor() {
        this.scaleAxis = "x";
    }
    init() {
    }
    load() {
        this.cfgMirrorCube();
    }
    update(time) {
        this.w.updateMirrorCube();
    }
    cfgMirrorCube() {
        let cfg = {
            near: this.config['near'], far: this.config['size'], resolution: this.config['resolution'],
            dimension: { x: this.config['dimension_x'], y: this.config['dimension_y'], z: this.config['dimension_z'] },
            position: { x: this.config['position_x'], y: this.config['position_y'], z: this.config['position_z'] }
        };
        this.w.addMirrorCube(cfg);
    }
    changeScale() {
        switch (this.scaleAxis) {
            case "x":
                this.w.camera.projectionMatrix.scale(new THREE.Vector3(-1, 1, 1));
                this.scaleAxis = "y";
                break;
            case "y":
                this.w.camera.projectionMatrix.scale(new THREE.Vector3(1, -1, 1));
                this.scaleAxis = "z";
                break;
            case "z":
                this.w.camera.projectionMatrix.scale(new THREE.Vector3(1, 1, -1));
                this.scaleAxis = "";
                break;
            default:
                this.w.camera.updateProjectionMatrix();
                this.scaleAxis = "x";
                break;
        }
    }
}
exports.MirrorCubePlugin = MirrorCubePlugin;
//# sourceMappingURL=mirror-cube-plugin.js.map