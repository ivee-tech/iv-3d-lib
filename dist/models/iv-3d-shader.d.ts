import { Expr } from '../wgl-util-cfgs';
export declare class Iv3dShader {
    id: string;
    vertexProgram: string;
    fragmentProgram: string;
    uniforms: Iv3dUniform[];
    timeExpr: Expr;
}
export declare class Iv3dUniform {
    name: string;
    type: Iv3dUniformType;
    value: any;
}
export declare enum Iv3dUniformType {
    'f',
    'v2',
    'v3',
    't',
}
