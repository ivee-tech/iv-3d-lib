"use strict";
class FormMetaValidation {
    constructor() {
        this.type = ValidationType.none;
    }
}
exports.FormMetaValidation = FormMetaValidation;
(function (ValidationType) {
    ValidationType[ValidationType["none"] = ''] = "none";
    ValidationType[ValidationType["required"] = 'required'] = "required";
    ValidationType[ValidationType["range"] = 'range'] = "range";
    ValidationType[ValidationType["pattern"] = 'pattern'] = "pattern";
    ValidationType[ValidationType["minLength"] = 'minLength'] = "minLength";
    ValidationType[ValidationType["maxLength"] = 'maxLength'] = "maxLength";
    ValidationType[ValidationType["custom"] = 'custom'] = "custom";
})(exports.ValidationType || (exports.ValidationType = {}));
var ValidationType = exports.ValidationType;
//# sourceMappingURL=form-meta-validation.js.map