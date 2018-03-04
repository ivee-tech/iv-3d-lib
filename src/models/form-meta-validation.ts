export class FormMetaValidation {
    id: number;
    fieldId: number;
    type: ValidationType = ValidationType.none;
    expression: string;
    fn: any;
    message: string;
}

export enum ValidationType {
    none = <any>'',
    required = <any>'required', // expression: null
    range = <any>'range', // expression: <min>,<max>
    pattern = <any>'pattern', // expression: RegExp
    minLength = <any>'minLength', // expression: <minLength>
    maxLength = <any>'maxLength', // expression: <maxLength>
    custom = <any>'custom',
}