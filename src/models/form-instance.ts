import { CssCfg } from '../wgl-util-cfgs';
import { FormMeta } from './form-meta';

export class FormInstance<T extends Object> {
    meta: FormMeta;
    model: T;
    showFlag: boolean;
    hide: Function;
    show: Function;
    css: CssCfg = new CssCfg();
    submit: Function;
    checkboxFix: Function = (e: Event) => { e.stopImmediatePropagation(); };
};
