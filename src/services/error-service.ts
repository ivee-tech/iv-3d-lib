export class ErrorService {

    public useAlertForErrors: boolean = false;

    constructor() {
    }

    public log(...args: any[]) {
        if (!console || !console.log) return;
        console.log(args);
        this.display(args);
    }

    public info(...args: any[]) {
        if (!console || !console.info) return;
        console.info(args);
        this.display(args);
    }

    public error(...args: any[]) {
        if (!console || !console.error) return;
        console.error(args);
        this.display(args);
    }

    private display(...args: any[]) {
        if (this.useAlertForErrors) {
            let s: string = JSON.stringify(args);
            alert(s);
        }
    }
}
