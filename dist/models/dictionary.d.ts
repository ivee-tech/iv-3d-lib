export interface IDictionary<T> {
    add(key: string, value: T): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): T[];
    toFullString(sep: string): string;
}
export declare class Dictionary<T> implements IDictionary<T> {
    _keys: string[];
    _values: T[];
    constructor(init: {
        key: string;
        value: T;
    }[]);
    add(key: string, value: T): void;
    remove(key: string): void;
    keys(): string[];
    values(): T[];
    containsKey(key: string): boolean;
    toLookup(): IDictionary<T>;
    toFullString(sep?: string): string;
    static fromKV(kv: any): Dictionary<any>;
}
