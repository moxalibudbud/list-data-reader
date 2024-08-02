import { File } from '../utils/file';
export declare class DynamicFileReader extends File {
    constructor(filepath: string);
    get fileReader(): any;
    readContent(): Promise<any>;
}
