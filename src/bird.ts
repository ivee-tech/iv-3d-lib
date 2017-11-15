// import THREE = require('./libs/three');
import * as THREE from 'three';

export class Bird extends THREE.Geometry {

	// var scope = this;

	// THREE.Geometry.call(this);

    constructor() {
        super();
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

        super.computeFaceNormals();
    }


	v = (x, y, z) => {

		super.vertices.push(new THREE.Vector3(x, y, z));

	}

	f3 = (a, b, c) => {

		super.faces.push(new THREE.Face3(a, b, c));

	}

}

// Bird.prototype = Object.create(THREE.Geometry.prototype);
// Bird.prototype.constructor = Bird;

