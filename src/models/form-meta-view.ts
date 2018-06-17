import { ModelBase } from './model-base';

export class FormMetaView extends ModelBase {
    id: string;
    formId: string;
    template: string;
    name: string;
    label: string;
    description: string;
    type: ViewType = ViewType.none;
    sType: string = ViewType[ViewType.none];
    bridge: string;
}

export enum ViewType
{
    none = <any>'none',
    view = <any>'view',
    form = <any>'form',
    grid = <any>'grid',
    report = <any>'report',
    chart = <any>'chart'
}