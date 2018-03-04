import { FormMetaValidation } from './form-meta-validation';

export class FormMetaField {
    id: number;
    name: string;
    label: string;
    description: string;
    type: string;
    validations: FormMetaValidation[] = [];
}