"use strict";
var Dictionary = (function () {
    function Dictionary(init) {
        this._keys = [];
        this._values = [];
        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }
    Dictionary.prototype.add = function (key, value) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    };
    Dictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    };
    Dictionary.prototype.keys = function () {
        return this._keys;
    };
    Dictionary.prototype.values = function () {
        return this._values;
    };
    Dictionary.prototype.containsKey = function (key) {
        if (typeof this[key] === 'undefined') {
            return false;
        }
        return true;
    };
    Dictionary.prototype.toLookup = function () {
        return this;
    };
    Dictionary.prototype.toFullString = function (sep) {
        if (sep === void 0) { sep = '\r\n'; }
        var result = '';
        for (var _i = 0, _a = this._keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this[key] instanceof Array) {
                result += key + ": ";
                for (var _b = 0, _c = this[key]; _b < _c.length; _b++) {
                    var v = _c[_b];
                    result += v + "; ";
                }
                result += sep;
            }
            else {
                result += key + ": " + this[key] + sep;
            }
        }
        return result;
    };
    Dictionary.fromKV = function (kv) {
        var dict = new Dictionary([]);
        if (!kv)
            return dict;
        for (var k in kv) {
            if (kv.hasOwnProperty(k)) {
                dict.add(k, kv[k]);
            }
        }
        return dict;
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
