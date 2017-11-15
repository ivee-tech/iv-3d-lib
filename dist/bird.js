"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// import THREE = require('./libs/three');
var THREE = require('three');
var Bird = (function (_super) {
    __extends(Bird, _super);
    // var scope = this;
    // THREE.Geometry.call(this);
    function Bird() {
        var _this = this;
        _super.call(this);
        this.v = function (x, y, z) {
            _super.prototype.vertices.push(new THREE.Vector3(x, y, z));
        };
        this.f3 = function (a, b, c) {
            _super.prototype.faces.push(new THREE.Face3(a, b, c));
        };
        this.v(5, 0, 0);
        this.v(-5, -2, 1);
        this.v(-5, 0, 0);
        this.v(-5, -2, -1);
        this.v(0, 2, -6);
        this.v(0, 2, 6);
        this.v(2, 0, 0);
        this.v(-3, 0, 0);
        this.f3(0, 2, 1);
        // this.f3(0, 3, 2);
        this.f3(4, 7, 6);
        this.f3(5, 6, 7);
        _super.prototype.computeFaceNormals.call(this);
    }
    return Bird;
}(THREE.Geometry));
exports.Bird = Bird;
// Bird.prototype = Object.create(THREE.Geometry.prototype);
// Bird.prototype.constructor = Bird;
