declare module 'swissqrbill' {
    export class SwissQRBill {
        constructor(data: any);
        attachTo(doc: any): void;
        getStream(): any;
    }
}
