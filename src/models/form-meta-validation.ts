import { ModelBase }  from './model-base';

export class FormMetaValidation extends ModelBase {
    id: string;
    fieldId: string;
    type: ValidationType = ValidationType.none;
    get sType(): string { return this.type.toString(); }
    set sType(value: string) { this.type = ValidationType[value]; }
    expression: string;
    fn: any;
    message: string;
}

export enum ValidationType {
    none = <any>'none',
    required = <any>'required', // expression: null
    range = <any>'range', // expression: <min>,<max>
    pattern = <any>'pattern', // expression: RegExp
    minLength = <any>'minLength', // expression: <minLength>
    maxLength = <any>'maxLength', // expression: <maxLength>
    custom = <any>'custom',
}