"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spreadSheetToJson = void 0;
const spreadSheetToJson = (rows) => {
    const jsonArray = [];
    const keys = rows[0];
    const rowLength = rows.length;
    for (let i = 1; i < rowLength; i++) {
        const obj = {};
        const keyLength = keys.length;
        for (let j = 0; j < keyLength; j++) {
            obj[keys[j]] = rows[i][j];
        }
        jsonArray.push(obj);
    }
    return jsonArray;
};
exports.spreadSheetToJson = spreadSheetToJson;
