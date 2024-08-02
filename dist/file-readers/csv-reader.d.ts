import { File, FileReader } from '../utils/file';
export declare class CSVReader extends File implements FileReader {
    constructor(filepath: string);
    readContent(): Promise<any[]>;
    readFile(): Promise<{
        delimeter: string;
        rows: any[];
    }>;
    getDelimeter(text: string, possibleDelimiters?: string[]): string;
    csvStringToArray(csvDataString: string, delimiter: string): any[];
}
