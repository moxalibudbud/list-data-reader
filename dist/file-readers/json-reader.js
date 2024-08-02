"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONReader = void 0;
const tslib_1 = require("tslib");
const file_1 = require("../utils/file");
class JSONReader extends file_1.File {
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
            let json = '';
            const handleOnLine = (chunk) => json += chunk;
            const handleOnClose = (resolve) => {
                const jsonArray = JSON.parse(json);
                resolve(jsonArray);
            };
            return this.readlineInterfacePromise(handleOnLine, handleOnClose);
        });
    }
}
exports.JSONReader = JSONReader;
