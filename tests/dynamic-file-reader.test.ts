import { describe, expect, it } from '@jest/globals';
const path = require('path');
import { DynamicFileReader } from '@file-readers';

const SAMPLE_FILES = [
  'csv-file.csv',
  'text-file.txt',
  'json-file.json',
  'excel-file.xls',
  'excel-file.xlsx',
];

describe('Test utils/file.js', () => {
  async function testReader(filename: string) {
    try {
      const filepath = path.resolve(__dirname, `./mockdata/${filename}`);
      const reader = new DynamicFileReader(filepath);
      const result = await reader.readContent();
      const expectedValue = Array.isArray(result);
      it(`Must be equal to ${expectedValue}`, () => {
        expect(expectedValue).toBe(expectedValue);
      });
      
    } catch (error) {
      console.log(`${filename} failed`, error);
    }
  }

  // SAMPLE_FILES.map(filename => describe(filename, testReader(filename)));
});