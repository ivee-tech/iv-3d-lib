export interface IDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
    toFullString(sep: string): string;
}

export class Dictionary<T> implements IDictionary<T> {

    _keys: string[] = [];
    _values: T[] = [];

    constructor(init: { key: string; value: T; }[]) {

        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }

    add(key: string, value: T) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): string[] {
        return this._keys;
    }

    values(): T[] {
        return this._values;
    }

    containsKey(key: string) {
        if (typeof this[key] === 'undefined') {
            return false;
        }

        return true;
    }

    toLookup(): IDictionary<T> {
        return this;
    }

    toFullString(sep: string = '\r\n'): string {
        let result: string = '';
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

    static fromKV(kv: any) {
        let dict = new Dictionary<any>([]);
        if (!kv) return dict;
        for (let k in kv) {
            if (kv.hasOwnProperty(k)) {
                dict.add(k, kv[k]);
            }
        }
        return dict;
    }
}