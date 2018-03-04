import { CssCfg } from '../wgl-util-cfgs';
import { Dictionary } from './dictionary';

export class AdditionalContent {
    name: string;
    title: string;
    content: string;
    css: CssCfg = new CssCfg();
    showFlag: boolean = true;

    constructor() {
        this.content = ``;
    }

    hide() {
        this.showFlag = false;
    }

    show() {
        this.showFlag = true;
    }
}
