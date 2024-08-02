import { File, FileReader } from '../utils/file';
export declare class TextReader extends File implements FileReader {
    constructor(filepath: string);
    readContent(): Promise<any>;
    readFile(): Promise<any>;
}
