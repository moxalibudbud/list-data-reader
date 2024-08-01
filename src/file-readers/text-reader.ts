import {
  File,
  FileReader,
} from '../utils/file';

export class TextReader extends File implements FileReader {

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
    const arr: string[] = [];
    const handleOnLine = (chunk: string) => arr.push(chunk);
    const handleOnClose = (resolve: Function) => resolve(arr);

    return this.readlineInterfacePromise(handleOnLine, handleOnClose);
  }
}