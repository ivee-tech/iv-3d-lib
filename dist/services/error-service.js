"use strict";
class ErrorService {
    constructor() {
        this.useAlertForErrors = false;
    }
    log(...args) {
        if (!console || !console.log)
            return;
        console.log(args);
        this.display(args);
    }
    info(...args) {
        if (!console || !console.info)
            return;
        console.info(args);
        this.display(args);
    }
    error(...args) {
        if (!console || !console.error)
            return;
        console.error(args);
        this.display(args);
    }
    display(...args) {
        if (this.useAlertForErrors) {
            let s = JSON.stringify(args);
            alert(s);
        }
    }
}
exports.ErrorService = ErrorService;
//# sourceMappingURL=error-service.js.map