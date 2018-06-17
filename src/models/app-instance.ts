import { FormMeta } from './form-meta';
import { ModelBase }  from './model-base';

export class AppInstance extends ModelBase {
    id: string;
    name: string;
    description: string;
    namespace: string;
    connectionStringName: string;
    forms: FormMeta[] = [];
}
