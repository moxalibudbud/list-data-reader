export declare class DatReader {
    static mimeType: string;
    constructor(file: string);
    read(): Promise<void>;
}
