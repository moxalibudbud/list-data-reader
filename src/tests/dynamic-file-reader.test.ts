const path = require('path');
import { DynamicFileReader } from '@file-readers';

const SAMPLE_FILES = [
  'csv-file.csv',
  'text-file.txt',
  'json-file.json',
  'excel-file.xls',
  'excel-file.xlsx',
];

function describe() {
  async function testRead(filename: string) {
    try {
      const filepath = path.resolve(__dirname, `./mockdata/${filename}`);
      const reader = new DynamicFileReader(filepath);
      const result = await reader.readContent();
      console.log(`${filename} passed`, result);
    } catch (error) {
      console.log(`${filename} failed`, error);
    }
  }

  SAMPLE_FILES.map(filename => testRead(filename));
}

describe();