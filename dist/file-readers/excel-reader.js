"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelReader = void 0;
const tslib_1 = require("tslib");
const file_1 = require("../utils/file");
const fs_1 = tslib_1.__importDefault(require("fs"));
const xlsx = tslib_1.__importStar(require("xlsx"));
const helpers_1 = require("../utils/helpers");
class ExcelReader extends file_1.File {
    constructor(filepath) {
        super(filepath);
    }
    readContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const workbook = yield this.readFile();
                const jsonArray = yield this.toJSON(workbook);
                return jsonArray;
            }
            catch (error) {
                throw error;
            }
        });
    }
    readFile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const lineData = (resolve, reject) => {
                try {
                    const buffers = [];
                    const handleOnData = (data) => buffers.push(data);
                    const handleOnEnd = () => {
                        const buffer = Buffer.concat(buffers);
                        const workbook = xlsx.read(buffer, { type: 'buffer' });
                        resolve(workbook);
                    };
                    const rs = fs_1.default.createReadStream(this.filepath);
                    rs.on('data', handleOnData);
                    rs.on('end', handleOnEnd);
                    rs.on('error', (e) => reject(e));
                }
                catch (e) {
                    reject(e);
                }
            };
            return new Promise(lineData);
        });
    }
    toJSON(workbook) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
                const jsonArray = (0, helpers_1.spreadSheetToJson)(rows);
                return jsonArray;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ExcelReader = ExcelReader;
