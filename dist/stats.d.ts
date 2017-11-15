/**
 * @author mrdoob / http://mrdoob.com/
 */
export declare class Stats {
    private container;
    private mode;
    private fpsDiv;
    private msDiv;
    private startTime;
    private ms;
    private msMin;
    private msMax;
    private fps;
    private fpsMin;
    private fpsMax;
    private frames;
    private prevTime;
    private msText;
    private msGraph;
    private fpsGraph;
    private fpsText;
    REVISION: number;
    readonly domElement: any;
    constructor();
    updateGraph(dom: any, value: any): void;
    setMode(value: any): void;
    begin(): void;
    end(): number;
    update(): void;
}
