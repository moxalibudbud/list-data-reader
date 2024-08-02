"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const readline_1 = tslib_1.__importDefault(require("readline"));
class File {
    constructor(filepath) {
        this.filepath = filepath;
    }
    get directory() {
        return path_1.default.dirname(this.filepath);
    }
    get filename() {
        return path_1.default.basename(this.filepath);
    }
    get extension() {
        return path_1.default.extname(this.filepath).replace('.', '');
    }
    get readlineInterface() {
        const exists = fs_1.default.existsSync(this.filepath);
        if (!exists)
            throw new Error(`File ${this.filepath} doesn't exist`);
        return readline_1.default.createInterface({
            input: fs_1.default.createReadStream(this.filepath),
            output: process.stdout,
            crlfDelay: Infinity
        });
    }
    readlineInterfacePromise(onLineHandler, onCloseHandler) {
        return new Promise((resolve, reject) => {
            try {
                this.readlineInterface.on('line', onLineHandler);
                this.readlineInterface.on('close', () => {
                    try {
                        onCloseHandler(resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.File = File;
