import {
  File,
  FileReader,
} from '../utils/file';
import { spreadSheetToJson } from '@utils/helpers';

export class CSVReader extends File implements FileReader {

  constructor(filepath: string) {
    super(filepath);
  }

  async readContent() {
    try {
      const data = await this.readFile();
      const jsonArray = spreadSheetToJson(data.rows);
      return jsonArray;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Read the CSV File and extract the rows and delimeter
   * 
   * @returns {{ delimeter: string, rows: array }}
   */
  async readFile(): Promise<{delimeter: string, rows: any[]}> {
    let fistLine = '';
    let csvText = '';

    const handleOnLine = (chunk: string) => {
      if(!fistLine) fistLine = chunk;

      // Append newline in every chunk because csvStringToArray() is expecting it.
      csvText += `${chunk}\r\n`;
    };

    const handleOnClose = (resolve: Function) => {
      const delimeter = this.getDelimeter(fistLine.trim());
      const rows = this.csvStringToArray(csvText.trim(), delimeter);
      resolve({ delimeter, rows });
    };

    return this.readlineInterfacePromise(handleOnLine, handleOnClose);
  }

  getDelimeter(text: string, possibleDelimiters = [',',';']): string {
    const weedOut = (delimiter: string) => {
      var cache = -1;
      const checkLength = (line: string) => {
        if (!line) {
          return true;
        }

        var length = line.split(delimiter).length;
        if (cache < 0) {
          cache = length;
        }
        return cache === length && length > 1;
      }
      return text.split('\n').every(checkLength);
    }

    const delimeter = possibleDelimiters.filter(weedOut);
    
    if(delimeter.length > 0) return delimeter[0];
    return '';
  }

  csvStringToArray(csvDataString: string, delimiter: string): any[] {
    const regexPattern = new RegExp((`(\\${delimiter}|\\r?\\n|\\r|^)(?:\"((?:\\\\.|\"\"|[^\\\\\"])*)\"|([^\\${delimiter}\"\\r\\n]*))`), "gi");
    let matchedPatternArray = regexPattern.exec(csvDataString);
    const resultCSV: any = [[]];
    while (matchedPatternArray) {
      if (matchedPatternArray[1].length && matchedPatternArray[1] !== delimiter) {
        resultCSV.push([]);
      }
      const cleanValue: any = matchedPatternArray[2] ?
        matchedPatternArray[2].replace(new RegExp("[\\\\\"](.)", "g"), '$1') : matchedPatternArray[3];
      resultCSV[resultCSV.length - 1].push(cleanValue);
      matchedPatternArray = regexPattern.exec(csvDataString);
    }
    return resultCSV;
  }
}