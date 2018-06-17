import { FormMetaValidation } from './form-meta-validation';
import { ModelBase }  from './model-base';

export class FormMetaField extends ModelBase {
    id: string;
    name: string;
    label: string;
    description: string;
    type: FieldType;
    get sType(): string { return this.type.toString(); }
    set sType(value: string) { this.type = FieldType[value]; }
    length?: number;
    validations: FormMetaValidation[] = [];
    dataSourceId: string;
    isKey: boolean;
}

export enum FieldType {
    none = <any>'none',
    text = <any>'text',
    number = <any>'number',
    checkbox = <any>'checkbox',
    date = <any>'date',
    dropdown = <any>'dropdown',
}