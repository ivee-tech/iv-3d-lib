/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
export declare class KGen {
    private static CHARS;
    static uuid(len?: number, radix?: number): string;
    static uuidFast(): string;
    static uuidCompact(): string;
    static randomNumber(min?: number, max?: number): number;
    static rnd(): number;
}
