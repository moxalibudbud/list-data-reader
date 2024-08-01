const path = require('path');
import { File } from '../utils/file';
import { JSONReader } from '../file-readers/json-reader';

function describe() {
  
  async function testRead() {
    try {
      const filepath = path.resolve(__dirname, '../../../mockdata/json-file.json');
      const reader = new JSONReader(filepath);
      const result = await reader.readContent();
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  }

  testRead();
}

describe();