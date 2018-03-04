"use strict";
class Dictionary {
    constructor(init) {
        this._keys = [];
        this._values = [];
        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }
    add(key, value) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }
    remove(key) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    }
    keys() {
        return this._keys;
    }
    values() {
        return this._values;
    }
    containsKey(key) {
        if (typeof this[key] === 'undefined') {
            return false;
        }
        return true;
    }
    toLookup() {
        return this;
    }
    toFullString(sep = '\r\n') {
        let result = '';
        for (let key of this._keys) {
            if (this[key] instanceof Array) {
                result += `${key}: `;
                for (let v of this[key]) {
                    result += `${v}; `;
                }
                result += sep;
            }
            else {
                result += `${key}: ${this[key]}${sep}`;
            }
        }
        return result;
    }
    static fromKV(kv) {
        let dict = new Dictionary([]);
        if (!kv)
            return dict;
        for (let k in kv) {
            if (kv.hasOwnProperty(k)) {
                dict.add(k, kv[k]);
            }
        }
        return dict;
    }
}
exports.Dictionary = Dictionary;
//# sourceMappingURL=dictionary.js.map