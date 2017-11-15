export declare class ErrorService {
    useAlertForErrors: boolean;
    constructor();
    log(...args: any[]): void;
    info(...args: any[]): void;
    error(...args: any[]): void;
    private display(...args);
}
