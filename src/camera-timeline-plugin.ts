import * as THREE from 'three';
import * as parser from 'expr-eval';

import { WglUtil } from './wgl-util';
import * as cfg from './wgl-util-cfgs';
import { ITimelinePlugin } from './i-timeline-plugin';
import { SimpleDictionary } from './models/simple-dictionary';
import { Timeline, DisplacementXYZ, TimelineMesh } from './models/timeline';
import { ErrorService } from './services/error-service';
import { DataModel } from './models/data-model';

export class CameraTimelinePlugin implements ITimelinePlugin {

    public config: SimpleDictionary<string>;

    public timeline: Timeline;

    public data: DataModel;

    public w: WglUtil;

    public mainGroup: THREE.Group;

    /*
    public camera: THREE.Camera;

    public scene: THREE.Scene;
    */

    constructor(private _timeline: Timeline, private _errorSvc: ErrorService) {
        this.timeline = _timeline;
        this.oParser = new parser.Parser();
    }

    public init() {
    }

    public load() {
        this.evaluateTimelineExpressions(this.timeline);
    }

    public update(time?: number) {
        this.animateTimeline(this.timeline, time);
    }

    private oParser: parser.Parser;

    private vMeshCameraVerticesIndex = -1;
    private vMeshCameraVerticesNextIndex = -1;
    private resetMeshCameraVerticesFlag: boolean = true;
    private meshCameraVertices = [];
    private meshCameraVerticesSet: boolean = false;


    private evaluateTimelineExpressions(timeline: Timeline) {
        this.evaluateDisplacementExpression(timeline.cameraPositionDisplacement, 'x');
        this.evaluateDisplacementExpression(timeline.cameraPositionDisplacement, 'y');
        this.evaluateDisplacementExpression(timeline.cameraPositionDisplacement, 'z');
        this.evaluateDisplacementExpression(timeline.meshCameraVerticesDisplacement, 'x');
        this.evaluateDisplacementExpression(timeline.meshCameraVerticesDisplacement, 'y');
        this.evaluateDisplacementExpression(timeline.meshCameraVerticesDisplacement, 'z');
        for (let tmesh of timeline.meshes) {
            this.evaluateDisplacementExpression(tmesh.positionDisplacement, 'x');
            this.evaluateDisplacementExpression(tmesh.positionDisplacement, 'y');
            this.evaluateDisplacementExpression(tmesh.positionDisplacement, 'z');
            this.evaluateDisplacementExpression(tmesh.rotationDisplacement, 'x');
            this.evaluateDisplacementExpression(tmesh.rotationDisplacement, 'y');
            this.evaluateDisplacementExpression(tmesh.rotationDisplacement, 'z');
            this.evaluateDisplacementExpression(tmesh.scaleDisplacement, 'x');
            this.evaluateDisplacementExpression(tmesh.scaleDisplacement, 'y');
            this.evaluateDisplacementExpression(tmesh.scaleDisplacement, 'z');
        }
    }

    private evaluateDisplacementExpression(displacement: DisplacementXYZ, p: string) {
        if (!displacement || !displacement.expression) {
            return;
        }
        if (displacement.expression[p]) {
            try {
                displacement.expression['fn' + p] = this.oParser.parse(displacement.expression[p]);
            }
            catch (e) {
                this._errorSvc.log('Cannot evaluate expression ', displacement.expression[p], '; error: ', e);
                displacement.expression['fn' + p] = null;
            }
        }
        else {
            displacement.expression['fn' + p] = null;
        }
    }

    private moveTimelineCamera(timeline: Timeline) {
        if (timeline.cameraPositionDisplacement && timeline.cameraPositionDisplacement.enabled) {
            if (!timeline.cameraDirection) {
                timeline.cameraDirection = new cfg.XYZ(1, 1, 1);
            }
            if (timeline.cameraPositionDisplacement.displacement) {
                this.w.camera.position.x += timeline.cameraDirection.x * timeline.cameraPositionDisplacement.displacement.x;
                this.w.camera.position.y += timeline.cameraDirection.y * timeline.cameraPositionDisplacement.displacement.y;
                this.w.camera.position.z += timeline.cameraDirection.z * timeline.cameraPositionDisplacement.displacement.z;
            }
            if (timeline.cameraPositionDisplacement.min) {
                if (this.w.camera.position.x <= timeline.cameraPositionDisplacement.min.x) {
                    // this.w.camera.position.x = this.w.cameraCfg.position.x;
                    timeline.cameraDirection.x = 1;
                }
                if (this.w.camera.position.y <= timeline.cameraPositionDisplacement.min.y) {
                    timeline.cameraDirection.y = 1;
                }
                if (this.w.camera.position.z <= timeline.cameraPositionDisplacement.min.z) {
                    timeline.cameraDirection.z = 1;
                }
            }
            if (timeline.cameraPositionDisplacement.max) {
                if (this.w.camera.position.x >= timeline.cameraPositionDisplacement.max.x) {
                    // this.w.camera.position.x = this.w.cameraCfg.position.x;
                    timeline.cameraDirection.x = -1;
                }
                if (this.w.camera.position.y >= timeline.cameraPositionDisplacement.max.y) {
                    timeline.cameraDirection.y = -1;
                }
                if (this.w.camera.position.z >= timeline.cameraPositionDisplacement.max.z) {
                    timeline.cameraDirection.z = -1;
                }
            }
        }
    }

    private moveTimelineCameraByExpression(timeline: Timeline, time: number) {
        if (timeline.cameraPositionDisplacement && timeline.cameraPositionDisplacement.enabled && timeline.cameraPositionDisplacement.expression) {
            this.moveTimelineCameraDisplacementByExpression(timeline.cameraPositionDisplacement, 'x', 'fnx', time);
            this.moveTimelineCameraDisplacementByExpression(timeline.cameraPositionDisplacement, 'y', 'fny', time);
            this.moveTimelineCameraDisplacementByExpression(timeline.cameraPositionDisplacement, 'z', 'fnz', time);
        }
    }

    private moveTimelineCameraDisplacementByExpression(displacement: DisplacementXYZ, p: string, fn: string, time: number) {
        if (displacement.expression && displacement.expression[fn] && displacement.expression[fn].evaluate) {
            this.w.camera.position[p] = displacement.expression[fn].evaluate({ t: time });
        }
    }

    private animateTimeline(timeline: Timeline, time?: number) {
        if (timeline.enabled) {
            this.moveTimelineCamera(timeline);
            this.moveTimelineMeshCameraVertices(timeline);
            if (time) {
                this.moveTimelineCameraByExpression(timeline, time);
                this.animateTimelineMeshes(timeline, time);
            }
        }
    }

    private moveTimelineMeshCameraVertices(timeline: Timeline) {
        if (!timeline || !timeline.meshCameraVerticesDisplacement || !timeline.meshCameraVerticesDisplacement.enabled) return;

        if (!this.meshCameraVerticesSet) {

            if (this.mainGroup && this.mainGroup.children && this.mainGroup.children.length > 0) {
                let mesh = this.mainGroup.children.find(item => item.uuid === timeline.meshCameraVerticesUUID);
                if (mesh) {
                    let geom = mesh.geometry;
                    this.meshCameraVertices = geom.vertices;
                    this.meshCameraVerticesSet = true;
                }
            }

        }
        if (this.meshCameraVerticesSet) {
            if (this.vMeshCameraVerticesIndex < 0) this.vMeshCameraVerticesIndex = 0;
            if (this.vMeshCameraVerticesNextIndex < 0) this.vMeshCameraVerticesNextIndex = 1;
            if (this.vMeshCameraVerticesIndex >= this.meshCameraVertices.length) this.vMeshCameraVerticesIndex = 0;
            if (this.vMeshCameraVerticesNextIndex >= this.meshCameraVertices.length) this.vMeshCameraVerticesNextIndex = 1;
            let v = this.meshCameraVertices[this.vMeshCameraVerticesIndex];
            let vNext = this.meshCameraVertices[this.vMeshCameraVerticesNextIndex];
            if (v && vNext) {
                if (this.resetMeshCameraVerticesFlag) this.resetMeshCameraVertices(v, vNext);
                this.w.camera.lookAt(vNext);
                this.resetMeshCameraVerticesFlag = false;
                let doneX = this.moveMeshCameraVertices(v, vNext, 'x', timeline.meshCameraVerticesDisplacement.displacement.x);
                let doneY = this.moveMeshCameraVertices(v, vNext, 'y', timeline.meshCameraVerticesDisplacement.displacement.x);
                let doneZ = this.moveMeshCameraVertices(v, vNext, 'z', timeline.meshCameraVerticesDisplacement.displacement.x);
                if (doneX && doneY && doneZ) {
                    this.w.camera.lookAt(vNext);
                    this.moveMeshCameraVerticesNext(vNext, 'x');
                    this.moveMeshCameraVerticesNext(vNext, 'y');
                    this.moveMeshCameraVerticesNext(vNext, 'z');
                }
            }
        }
    }

    private resetMeshCameraVertices(v, vNext) {
        this.w.camera.position.x = v.x;
        this.w.camera.position.y = v.y;
        this.w.camera.position.z = v.z;
    }

    private moveMeshCameraVertices(v, vNext, p, displacement: number) {
        let done: boolean = false;
        if (vNext[p] < v[p]) {
            this.w.camera.position[p] -= displacement;
            if (this.w.camera.position[p] < vNext[p]) {
                done = true;
            }
        }
        else {
            this.w.camera.position[p] += displacement;
            if (this.w.camera.position[p] > vNext[p]) {
                done = true;
            }
        }
        return done;
    }

    private moveMeshCameraVerticesNext(vNext, p) {
        this.w.camera.position[p] = vNext[p];
        this.vMeshCameraVerticesIndex++;
        this.vMeshCameraVerticesNextIndex++;
    }

    private animateTimelineMeshes(timeline: Timeline, time?: number) {
        if (this.mainGroup && timeline.meshes) {
            for (let tmesh of timeline.meshes) {
                let mesh = this.mainGroup.children.find(item => item.uuid === tmesh.uuid);
                if (!mesh) continue;
                if (cfg.U.isEmpty(tmesh.visible)) {
                    // tmesh.visible = true;
                }
                if (!tmesh.visible) {
                    mesh.visible = false;
                    continue;
                }
                else {
                    mesh.visible = true;
                }
                this.moveMesh(mesh, tmesh);
                if (time) {
                    this.moveMeshByExpression(mesh, tmesh, time);
                }
                this.scaleMesh(mesh, tmesh);
                if (time) {
                    this.scaleMeshByExpression(mesh, tmesh, time);
                }
                this.rotateMesh(mesh, tmesh);
                if (time) {
                    this.rotateMeshByExpression(mesh, tmesh, time);
                }
            }
        }
    }

    private moveMesh(mesh: any, tmesh: TimelineMesh) {
        if (mesh) {
            if (tmesh.positionDisplacement && tmesh.positionDisplacement.enabled) {
                if (!tmesh.positionDirection) {
                    tmesh.positionDirection = new cfg.XYZ(1, 1, 1);
                }
                if (tmesh.positionDisplacement.displacement) {
                    mesh.position.x += tmesh.positionDirection.x * tmesh.positionDisplacement.displacement.x;
                    mesh.position.y += tmesh.positionDirection.y * tmesh.positionDisplacement.displacement.y;
                    mesh.position.z += tmesh.positionDirection.z * tmesh.positionDisplacement.displacement.z;
                }
                if (tmesh.positionDisplacement.min) {
                    if (mesh.position.x <= tmesh.positionDisplacement.min.x) {
                        tmesh.positionDirection.x = 1;
                    }
                    if (mesh.position.y <= tmesh.positionDisplacement.min.y) {
                        tmesh.positionDirection.y = 1;
                    }
                    if (mesh.position.z <= tmesh.positionDisplacement.min.z) {
                        tmesh.positionDirection.z = 1;
                    }
                }
                if (tmesh.positionDisplacement.max) {
                    if (mesh.position.x >= tmesh.positionDisplacement.max.x) {
                        tmesh.positionDirection.x = -1;
                    }
                    if (mesh.position.y >= tmesh.positionDisplacement.max.y) {
                        tmesh.positionDirection.y = -1;
                    }
                    if (mesh.position.z >= tmesh.positionDisplacement.max.z) {
                        tmesh.positionDirection.z = -1;
                    }
                }
            }
        }
    }

    private moveMeshByExpression(mesh: any, tmesh: TimelineMesh, time: number) {
        if (mesh) {
            if (tmesh.positionDisplacement && tmesh.positionDisplacement.enabled) {
                this.moveMeshDisplacementByExpression(mesh, tmesh.positionDisplacement, 'x', 'fnx', time);
                this.moveMeshDisplacementByExpression(mesh, tmesh.positionDisplacement, 'y', 'fny', time);
                this.moveMeshDisplacementByExpression(mesh, tmesh.positionDisplacement, 'z', 'fnz', time);
            }
        }
    }

    private moveMeshDisplacementByExpression(mesh: any, displacement: DisplacementXYZ, p: string, fn: string, time: number) {
        if (displacement.expression && displacement.expression[fn] && displacement.expression[fn].evaluate) {
            mesh.position[p] = displacement.expression[fn].evaluate({ t: time });
        }
    }

    private rotateMesh(mesh: any, tmesh: TimelineMesh) {
        if (mesh) {
            if (tmesh.rotationDisplacement && tmesh.rotationDisplacement.enabled) {
                if (!tmesh.rotationDirection) {
                    tmesh.rotationDirection = new cfg.XYZ(1, 1, 1);
                }
                if (tmesh.rotationDisplacement.displacement) {
                    mesh.rotation.x += tmesh.rotationDirection.x * tmesh.rotationDisplacement.displacement.x;
                    mesh.rotation.y += tmesh.rotationDirection.y * tmesh.rotationDisplacement.displacement.y;
                    mesh.rotation.z += tmesh.rotationDirection.z * tmesh.rotationDisplacement.displacement.z;
                }
                if (tmesh.rotationDisplacement.min) {
                    if (mesh.rotation.x <= tmesh.rotationDisplacement.min.x) {
                        tmesh.rotationDirection.x = 1;
                    }
                    if (mesh.rotation.y <= tmesh.rotationDisplacement.min.y) {
                        tmesh.rotationDirection.y = 1;
                    }
                    if (mesh.rotation.z <= tmesh.rotationDisplacement.min.z) {
                        tmesh.rotationDirection.z = 1;
                    }
                }
                if (tmesh.rotationDisplacement.max) {
                    if (mesh.rotation.x >= tmesh.rotationDisplacement.max.x) {
                        tmesh.rotationDirection.x = -1;
                    }
                    if (mesh.rotation.y >= tmesh.rotationDisplacement.max.y) {
                        tmesh.rotationDirection.y = -1;
                    }
                    if (mesh.rotation.z >= tmesh.rotationDisplacement.max.z) {
                        tmesh.rotationDirection.z = -1;
                    }
                }
            }
        }
    }

    private rotateMeshByExpression(mesh: any, tmesh: TimelineMesh, time: number) {
        if (mesh) {
            if (tmesh.rotationDisplacement && tmesh.rotationDisplacement.enabled) {
                this.rotateMeshDisplacementByExpression(mesh, tmesh.rotationDisplacement, 'x', 'fnx', time);
                this.rotateMeshDisplacementByExpression(mesh, tmesh.rotationDisplacement, 'y', 'fny', time);
                this.rotateMeshDisplacementByExpression(mesh, tmesh.rotationDisplacement, 'z', 'fnz', time);
            }
        }
    }

    private rotateMeshDisplacementByExpression(mesh: any, displacement: DisplacementXYZ, p: string, fn: string, time: number) {
        if (displacement.expression && displacement.expression[fn] && displacement.expression[fn].evaluate) {
            mesh.rotation[p] = displacement.expression[fn].evaluate({ t: time });
        }
    }

    private scaleMesh(mesh: any, tmesh: TimelineMesh) {
        if (mesh) {
            if (tmesh.scaleDisplacement && tmesh.scaleDisplacement.enabled) {
                if (!tmesh.scaleDirection) {
                    tmesh.scaleDirection = new cfg.XYZ(1, 1, 1);
                }
                if (tmesh.scaleDisplacement.displacement) {
                    mesh.scale.x += tmesh.scaleDirection.x * tmesh.scaleDisplacement.displacement.x;
                    mesh.scale.y += tmesh.scaleDirection.y * tmesh.scaleDisplacement.displacement.y;
                    mesh.scale.z += tmesh.scaleDirection.z * tmesh.scaleDisplacement.displacement.z;
                }
                if (tmesh.scaleDisplacement.min) {
                    if (mesh.scale.x <= tmesh.scaleDisplacement.min.x) {
                        tmesh.scaleDirection.x = 1;
                    }
                    if (mesh.scale.y <= tmesh.scaleDisplacement.min.y) {
                        tmesh.scaleDirection.y = 1;
                    }
                    if (mesh.scale.z <= tmesh.scaleDisplacement.min.z) {
                        tmesh.scaleDirection.z = 1;
                    }
                }
                if (tmesh.scaleDisplacement.max) {
                    if (mesh.scale.x >= tmesh.scaleDisplacement.max.x) {
                        tmesh.scaleDirection.x = -1;
                    }
                    if (mesh.scale.y >= tmesh.scaleDisplacement.max.y) {
                        tmesh.scaleDirection.y = -1;
                    }
                    if (mesh.scale.z >= tmesh.scaleDisplacement.max.z) {
                        tmesh.scaleDirection.z = -1;
                    }
                }
            }
        }
    }

    private scaleMeshByExpression(mesh: any, tmesh: TimelineMesh, time: number) {
        if (mesh) {
            if (tmesh.scaleDisplacement && tmesh.scaleDisplacement.enabled) {
                this.scaleMeshDisplacementByExpression(mesh, tmesh.scaleDisplacement, 'x', 'fnx', time);
                this.scaleMeshDisplacementByExpression(mesh, tmesh.scaleDisplacement, 'y', 'fny', time);
                this.scaleMeshDisplacementByExpression(mesh, tmesh.scaleDisplacement, 'z', 'fnz', time);
            }
        }
    }

    private scaleMeshDisplacementByExpression(mesh: any, displacement: DisplacementXYZ, p: string, fn: string, time: number) {
        if (displacement.expression && displacement.expression[fn] && displacement.expression[fn].evaluate) {
            mesh.scale[p] = displacement.expression[fn].evaluate({ t: time });
        }
    }
}
