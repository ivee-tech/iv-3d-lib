export declare class FormMetaValidation {
    id: number;
    fieldId: number;
    type: ValidationType;
    expression: string;
    fn: any;
    message: string;
}
export declare enum ValidationType {
    none,
    required,
    range,
    pattern,
    minLength,
    maxLength,
    custom,
}
