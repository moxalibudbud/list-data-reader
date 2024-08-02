"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicFileReader = void 0;
const tslib_1 = require("tslib");
const file_1 = require("../utils/file");
const file_reader_factory_1 = require("../utils/file-reader-factory");
class DynamicFileReader extends file_1.File {
    constructor(filepath) {
        super(filepath);
    }
    get fileReader() {
        const fileReader = file_reader_factory_1.fileReaderFactory[this.extension];
        if (fileReader)
            return new fileReader(this.filepath);
        throw new Error(`File extension ${this.extension} is not supported!`);
    }
    readContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.fileReader.readContent();
            return data;
        });
    }
}
exports.DynamicFileReader = DynamicFileReader;
