import { FormMetaField } from './form-meta-field';
import { FormMetaView } from './form-meta-view';
export declare class FormMeta {
    id: number;
    name: string;
    label: string;
    description: string;
    fields: FormMetaField[];
    views: FormMetaView[];
}
