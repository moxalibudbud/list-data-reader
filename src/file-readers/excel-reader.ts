import {
  File,
  FileReader,
} from '../utils/file';

import fs from 'fs';
import * as xlsx from 'xlsx';
import { spreadSheetToJson } from '../utils/helpers';

interface WorkBook {
  SheetNames: string[];
  Sheets: any;
}

export class ExcelReader extends File implements FileReader {

  constructor(filepath: string) {
    super(filepath);
  }

  async readContent() {
    try {
      const workbook = await this.readFile();
      const jsonArray = await this.toJSON(workbook);
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
  async readFile() {
    const lineData = (resolve: Function, reject: Function) => {
      try {
        const buffers: Buffer[] = [];
        const handleOnData = (data: Buffer) => buffers.push(data);
        const handleOnEnd = () => {
          const buffer = Buffer.concat(buffers);
          const workbook = xlsx.read(buffer, {type: 'buffer'});
          resolve(workbook);
        };

        const rs = fs.createReadStream(this.filepath);
        rs.on('data', handleOnData);
        rs.on('end', handleOnEnd);
        rs.on('error', (e) => reject(e));
      } catch (e) {
        reject(e);
      }
    }

    return new Promise<WorkBook>(lineData);
  }

  async toJSON(workbook: WorkBook) {
    try {
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
      const jsonArray = spreadSheetToJson(rows);
      return jsonArray;
    } catch (error) {
      throw error;
    }
  }
}