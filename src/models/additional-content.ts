import { CssCfg } from '../wgl-util-cfgs';

export class AdditionalContent {
    name: string;
    title: string;
    content: string;
    css: CssCfg = new CssCfg();
    showFlag: boolean = true;

    hide() {
        this.showFlag = false;
    }

    show() {
        this.showFlag = true;
    }
}
