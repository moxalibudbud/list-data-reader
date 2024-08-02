import { CSVReader } from '@file-readers/csv-reader';
import { DatReader }  from '@file-readers/dat-reader';
import { ExcelReader }  from '@file-readers/excel-reader';
import { JSONReader }  from '@file-readers/json-reader';
import { TextReader }  from '@file-readers/text-reader';
import { CSV, DAT, XLSX, XLS, JSON, TXT } from '@src/constants';

export const fileReaderFactory: any = {
  [CSV]: CSVReader,
  [DAT]: DatReader,
  [XLSX]: ExcelReader,
  [XLS]: ExcelReader,
  [JSON]: JSONReader,
  [TXT]: TextReader
};