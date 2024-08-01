import {
  File,
  FileReader,
} from '../utils/file';

export class JSONReader extends File implements FileReader {

  constructor(filepath: string) {
    super(filepath);
  }

  async readContent() {
    try {
      const data = await this.readFile();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async readFile() {
    let json = ''; 
    const handleOnLine = (chunk: string) => json += chunk;
    const handleOnClose = (resolve: Function) => {
      const jsonArray = JSON.parse(json)
      resolve(jsonArray);
    };

    return this.readlineInterfacePromise(handleOnLine, handleOnClose);
  }
}