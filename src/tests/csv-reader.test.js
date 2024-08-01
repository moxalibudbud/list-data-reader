const path = require('path');
import { File } from '../utils/file';
import { CSVReader } from '../file-readers/csv-reader';

function describe() {
  
  async function testRead() {
    try {
      const filepath = path.resolve(__dirname, '../../../mockdata/csv-file.csv');
      const reader = new CSVReader(filepath);
      const result = await reader.readContent();
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  }

  testRead();
}

describe();