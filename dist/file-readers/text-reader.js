"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextReader = void 0;
const tslib_1 = require("tslib");
const file_1 = require("../utils/file");
class TextReader extends file_1.File {
    constructor(filepath) {
        super(filepath);
    }
    readContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.readFile();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    readFile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const arr = [];
            const handleOnLine = (chunk) => arr.push(chunk);
            const handleOnClose = (resolve) => resolve(arr);
            return this.readlineInterfacePromise(handleOnLine, handleOnClose);
        });
    }
}
exports.TextReader = TextReader;
