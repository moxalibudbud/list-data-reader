import { CSVReader } from './file-readersx/csv-reader';
import { DatReader }  from './file-readersx/dat-reader';
import { ExcelReader }  from './file-readersx/excel-reader';
import { JSONReader }  from './file-readersx/json-reader';
import { TextReader }  from './file-readersx/text-reader';
import { CSV, DAT, XLSX, XLS, JSON, TXT } from './utils/constants';

export const fileReaderProvider: any = {
  [CSV]: CSVReader,
  [DAT]: DatReader,
  [XLSX]: ExcelReader,
  [XLS]: ExcelReader,
  [JSON]: JSONReader,
  [TXT]: TextReader
};