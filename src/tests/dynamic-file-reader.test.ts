const path = require('path');
import { DynamicFileReader } from '../file-readers/dynamic-file-reader';

function describe() {
  
  async function testRead() {
    try {
      const filepath = path.resolve(__dirname, '../../../../mockdata/csv-file.csv');
      const reader = new DynamicFileReader(filepath);
      const result = await reader.readContent();
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  }

  testRead();
}

describe();