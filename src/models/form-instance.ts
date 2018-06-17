import { ModelBase } from './model-base';
import { CssCfg } from '../wgl-util-cfgs';
import { FormMeta } from './form-meta';
import { ViewType } from './form-meta-view';

export class FormInstance<T extends ModelBase> {
    meta: FormMeta;
    model: T;
    list: T[] = [];
    showFlag: boolean;
    hide: Function;
    show: Function;
    css: CssCfg = new CssCfg();
    submit: Function;
    checkboxFix: Function = (e: Event) => { e.stopImmediatePropagation(); };
    datepickerFix: Function = (e: Event) => { e.stopImmediatePropagation(); };
    dataSourceValues = {};
    hasForm: Function = () => { return this.meta && this.meta.views.filter(v => v.sType == ViewType[ViewType.form] && !v.isInactive).length > 0 ? true : false };
    hasGrid: Function = () => { return this.meta && this.meta.views.filter(v => v.sType == ViewType[ViewType.grid] && !v.isInactive).length > 0 ? true : false };
    getKey: Function = () => {
        if(!this.meta || !this.meta.fields) return null;
        return this.meta.fields.find(fld => fld.isKey);
    };
    openItem: Function = (item: T) => {};
    deleteItem = (item: T) => {};
};
