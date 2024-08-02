"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileReaderFactory = void 0;
const csv_reader_1 = require("../file-readers/csv-reader");
const dat_reader_1 = require("../file-readers/dat-reader");
const excel_reader_1 = require("../file-readers/excel-reader");
const json_reader_1 = require("../file-readers/json-reader");
const text_reader_1 = require("../file-readers/text-reader");
const constants_1 = require("../constants");
exports.fileReaderFactory = {
    [constants_1.CSV]: csv_reader_1.CSVReader,
    [constants_1.DAT]: dat_reader_1.DatReader,
    [constants_1.XLSX]: excel_reader_1.ExcelReader,
    [constants_1.XLS]: excel_reader_1.ExcelReader,
    [constants_1.JSON]: json_reader_1.JSONReader,
    [constants_1.TXT]: text_reader_1.TextReader
};
