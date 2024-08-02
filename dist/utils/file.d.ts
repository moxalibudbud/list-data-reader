import readline from 'readline';
export interface FileReader {
    readContent(): Promise<any[]> | undefined;
    readFile(): Promise<any> | undefined;
}
export interface ReadlineInterfaceErrorHandler {
    (resolve: Function, reject: Function): void;
}
export interface ReadlineInterfaceLineHandler {
    (...args: any): void;
}
export declare class File {
    filepath: string;
    constructor(filepath: string);
    get directory(): string;
    get filename(): string;
    get extension(): string;
    get readlineInterface(): readline.Interface;
    readlineInterfacePromise(onLineHandler: ReadlineInterfaceLineHandler, onCloseHandler: ReadlineInterfaceErrorHandler): Promise<any>;
}
