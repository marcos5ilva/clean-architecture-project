"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderCode {
    constructor(issueDate, sequence) {
        this.value = `${issueDate.getFullYear()}${new String(sequence).padStart(8, '0')}`;
    }
}
exports.default = OrderCode;
