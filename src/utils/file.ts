import path from 'path';
import fs from 'fs';
import readline from 'readline';

export interface FileReader {
  readContent(): Promise<any[]> | undefined;
  readFile(): Promise<any> | undefined;
}

export interface ReadlineInterfaceErrorHandler {
  (resolve: Function, reject: Function): void;
}

export interface ReadlineInterfaceLineHandler {
  (...args: any): void;
}

export class File {
  
  filepath: string;

  constructor(filepath: string) {
    this.filepath = filepath;
  }

  get directory(): string {
    return path.dirname(this.filepath);
  }

  get filename(): string {
    return path.basename(this.filepath);
  }

  get extension(): string {
    return path.extname(this.filepath).replace('.','');
  }

  get readlineInterface() {
    const exists = fs.existsSync(this.filepath);

    if(!exists) throw new Error(`File ${this.filepath} doesn't exist`);

    return readline.createInterface({
      input: fs.createReadStream(this.filepath),
      output: process.stdout,
      crlfDelay: Infinity
    });
  }

  readlineInterfacePromise(
    onLineHandler: ReadlineInterfaceLineHandler,
    onCloseHandler: ReadlineInterfaceErrorHandler
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.readlineInterface.on('line', onLineHandler);
        this.readlineInterface.on('close', () => {
          try {
            onCloseHandler(resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
