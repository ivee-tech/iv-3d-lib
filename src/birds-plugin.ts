import * as THREE from 'three';

import { WglUtil } from './wgl-util';
import { SimpleDictionary } from './models/simple-dictionary';
import { Timeline } from './models/timeline';
import { DataModel } from './models/data-model';
import { ITimelinePlugin } from './i-timeline-plugin';
import * as cfg from './wgl-util-cfgs';
import { Bird } from './bird';
import { Boid } from './boid';

export class BirdsPlugin implements ITimelinePlugin {
    config: SimpleDictionary<any>;
    timeline: Timeline;
    data: DataModel;
    w: WglUtil;
    mainGroup: THREE.Group;

    birdsCfg: cfg.BirdsCfg = <cfg.BirdsCfg>{
        count: 100, avoidWalls: true, worldSize: <cfg.Size3D>{ width: 500, height: 500, depth: 400 }, scale: 1
    }


    private birds;
    private boids;

    init() {
    }

    load() {
    }

    update(time?: number) {
        this.animateBirds();
    }

    private animateBirds  () {
        if (!this.birds) {
            return;
        }
        let boid: any;
        let bird: any;
        let color: THREE.Color;
        for (var i = 0, il = this.birds.length; i < il; i++) {

            boid = this.boids[i];
            boid.run(this.boids);

            bird = this.birds[i];
            bird.position.copy(this.boids[i].position);

            color = bird.material.color;
            color.r = color.g = color.b = (500 - bird.position.z) / 1000;

            bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
            bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

            bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
            bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;

        }
    }

    initBirds(cfg, group?) {

        if (cfg) {
            this.w.copyCfg(cfg, this.birdsCfg);
        }
        this.birds = [];
        this.boids = [];

        let boid, bird;

        for (let i = 0; i < this.birdsCfg.count; i++) {

            boid = this.boids[i] = new Boid();
            boid.position.x = Math.random() * 400 - 200;
            boid.position.y = Math.random() * 400 - 200;
            boid.position.z = Math.random() * 400 - 200;
            boid.velocity.x = Math.random() * 2 - 1;
            boid.velocity.y = Math.random() * 2 - 1;
            boid.velocity.z = Math.random() * 2 - 1;
            boid.setAvoidWalls(this.birdsCfg.avoidWalls);
            boid.setWorldSize(this.birdsCfg.worldSize.width, this.birdsCfg.worldSize.height, this.birdsCfg.worldSize.depth);

            bird = this.birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, side: THREE.DoubleSide }));
            bird.phase = Math.floor(Math.random() * 62.83);
            bird.scale.set(this.birdsCfg.scale, this.birdsCfg.scale, this.birdsCfg.scale);
            this.w.add(bird, group);

        }
    }

    repulseBoids  (vector) {
        if (!this.boids) {
            return;
        }
        let boid;
        for (let i = 0, il = this.boids.length; i < il; i++) {

            boid = this.boids[i];

            vector.z = boid.position.z;

            boid.repulse(vector);
        }
    }

}
