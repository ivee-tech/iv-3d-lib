import { Expr } from '../wgl-util-cfgs';

export class Iv3dShader {
    id: string;
    vertexProgram: string;
    fragmentProgram: string;
    uniforms: Iv3dUniform[] = [];
    timeExpr: Expr = new Expr();
}

export class Iv3dUniform {
    name: string;
    type: Iv3dUniformType;
    value: any;
}

export enum Iv3dUniformType {
    'f' = <any>'f',
    'v2' = <any>'v2',
    'v3' = <any>'v3',
    't' = <any>'t'
}
