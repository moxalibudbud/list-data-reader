import {
  File,
  FileReader,
} from '../utils/file';
import { fileReaderProvider } from '@utils/file-reader-provider';

export class DynamicFileReader extends File {

  constructor(filepath: string) {
    super(filepath);
  }
  
  get fileReader() {
    const fileReader = fileReaderProvider[this.extension];

    if(fileReader) return new fileReader(this.filepath);

    throw new Error(`File extension ${this.extension} is not supported!`);
  }

  async readContent() {
    const data = await this.fileReader.readContent();
    return data;
  }
}