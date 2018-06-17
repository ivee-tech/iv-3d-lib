import { FormMetaField } from './form-meta-field';
import { FormMetaView } from './form-meta-view';
import { ModelBase }  from './model-base';

export class FormMeta extends ModelBase {
    id: string;
    name: string;
    label: string;
    description: string;
    tableName: string;
    listName: string;
    fields: FormMetaField[] = [];
    views: FormMetaView[] = [];
}
