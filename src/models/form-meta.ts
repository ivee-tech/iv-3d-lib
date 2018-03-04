import { FormMetaField } from './form-meta-field';
import { FormMetaView } from './form-meta-view';

export class FormMeta {
    id: number;
    name: string;
    label: string;
    description: string;
    fields: FormMetaField[] = [];
    views: FormMetaView[] = [];
}
