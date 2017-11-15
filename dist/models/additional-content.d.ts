import { CssCfg } from '../wgl-util-cfgs';
export declare class AdditionalContent {
    name: string;
    title: string;
    content: string;
    css: CssCfg;
    showFlag: boolean;
    hide(): void;
    show(): void;
}
