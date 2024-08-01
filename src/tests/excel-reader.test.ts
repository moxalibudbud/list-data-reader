const path = require('path');
import { ExcelReader } from '../file-readers/excel-reader';

function describe() {
  
  async function testRead() {
    try {
      const filepath = path.resolve(__dirname, '../../../../mockdata/excel-file.xls');
      // const filepath = path.resolve(__dirname, '../../../mockdata/excel-file.xls');
      const reader = new ExcelReader(filepath);
      const result = await reader.readContent();
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  }

  testRead();
}

describe();