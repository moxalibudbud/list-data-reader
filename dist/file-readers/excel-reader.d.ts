import { File, FileReader } from '../utils/file';
interface WorkBook {
    SheetNames: string[];
    Sheets: any;
}
export declare class ExcelReader extends File implements FileReader {
    constructor(filepath: string);
    readContent(): Promise<any[]>;
    readFile(): Promise<WorkBook>;
    toJSON(workbook: WorkBook): Promise<any[]>;
}
export {};
