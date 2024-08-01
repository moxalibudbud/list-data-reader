import {describe, expect, it} from '@jest/globals';
const path = require('path');
import { File } from '@utils/file';

describe('Test utils/file.js', () => {
  const mockFile = path.resolve(__dirname, './mockdata/text-file.txt');
  const fileInstance = new File(mockFile);
  
  describe('get directory()', () => {
    const expectedValue = path.dirname(mockFile);
    it(`Must be equal to ${expectedValue}`, () => {
      expect(fileInstance.directory).toBe(expectedValue);
    });
  });

  describe('get filename()', () => {
    const expectedValue = path.basename(mockFile);
    it(`Must be equal to ${expectedValue}`, () => {
      expect(fileInstance.filename).toBe(expectedValue);
    });
  });

  describe('get extension()', () => {
    const expectedValue = path.extname(mockFile).replace('.','');
    it(`Must be equal to ${expectedValue}`, () => {
      expect(fileInstance.extension).toBe(expectedValue);
    });
  });
});