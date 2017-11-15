"use strict";
var ErrorService = (function () {
    function ErrorService() {
        this.useAlertForErrors = false;
    }
    ErrorService.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!console || !console.log)
            return;
        console.log(args);
        this.display(args);
    };
    ErrorService.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!console || !console.info)
            return;
        console.info(args);
        this.display(args);
    };
    ErrorService.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!console || !console.error)
            return;
        console.error(args);
        this.display(args);
    };
    ErrorService.prototype.display = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (this.useAlertForErrors) {
            var s = JSON.stringify(args);
            alert(s);
        }
    };
    return ErrorService;
}());
exports.ErrorService = ErrorService;
