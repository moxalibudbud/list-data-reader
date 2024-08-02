"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVReader = void 0;
const tslib_1 = require("tslib");
const file_1 = require("../utils/file");
const helpers_1 = require("@utils/helpers");
class CSVReader extends file_1.File {
    constructor(filepath) {
        super(filepath);
    }
    readContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.readFile();
                const jsonArray = (0, helpers_1.spreadSheetToJson)(data.rows);
                return jsonArray;
            }
            catch (error) {
                throw error;
            }
        });
    }
    readFile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let fistLine = '';
            let csvText = '';
            const handleOnLine = (chunk) => {
                if (!fistLine)
                    fistLine = chunk;
                csvText += `${chunk}\r\n`;
            };
            const handleOnClose = (resolve) => {
                const delimeter = this.getDelimeter(fistLine.trim());
                const rows = this.csvStringToArray(csvText.trim(), delimeter);
                resolve({ delimeter, rows });
            };
            return this.readlineInterfacePromise(handleOnLine, handleOnClose);
        });
    }
    getDelimeter(text, possibleDelimiters = [',', ';']) {
        const weedOut = (delimiter) => {
            var cache = -1;
            const checkLength = (line) => {
                if (!line) {
                    return true;
                }
                var length = line.split(delimiter).length;
                if (cache < 0) {
                    cache = length;
                }
                return cache === length && length > 1;
            };
            return text.split('\n').every(checkLength);
        };
        const delimeter = possibleDelimiters.filter(weedOut);
        if (delimeter.length > 0)
            return delimeter[0];
        return '';
    }
    csvStringToArray(csvDataString, delimiter) {
        const regexPattern = new RegExp((`(\\${delimiter}|\\r?\\n|\\r|^)(?:\"((?:\\\\.|\"\"|[^\\\\\"])*)\"|([^\\${delimiter}\"\\r\\n]*))`), "gi");
        let matchedPatternArray = regexPattern.exec(csvDataString);
        const resultCSV = [[]];
        while (matchedPatternArray) {
            if (matchedPatternArray[1].length && matchedPatternArray[1] !== delimiter) {
                resultCSV.push([]);
            }
            const cleanValue = matchedPatternArray[2] ?
                matchedPatternArray[2].replace(new RegExp("[\\\\\"](.)", "g"), '$1') : matchedPatternArray[3];
            resultCSV[resultCSV.length - 1].push(cleanValue);
            matchedPatternArray = regexPattern.exec(csvDataString);
        }
        return resultCSV;
    }
}
exports.CSVReader = CSVReader;
