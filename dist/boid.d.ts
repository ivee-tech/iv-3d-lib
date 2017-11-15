export declare class Boid {
    private vector;
    private _acceleration;
    private _width;
    private _height;
    private _depth;
    private _goal;
    private _neighborhoodRadius;
    private _maxSpeed;
    private _maxSteerForce;
    private _avoidWalls;
    position: any;
    velocity: any;
    constructor();
    setGoal(target: any): void;
    setAvoidWalls(value: any): void;
    setWorldSize(width: any, height: any, depth: any): void;
    run(boids: any): void;
    flock(boids: any): void;
    move(): void;
    checkBounds(): void;
    avoid(target: any): any;
    repulse(target: any): void;
    reach(target: any, amount: any): any;
    alignment(boids: any): any;
    cohesion(boids: any): any;
    separation(boids: any): any;
}
