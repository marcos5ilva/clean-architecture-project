"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaceOrderInput {
    constructor({ cpf, zipcode, items, coupon, issueDate = new Date() }) {
        this.cpf = cpf;
        this.zipcode = zipcode;
        this.items = items;
        this.coupon = coupon;
        this.issueDate = issueDate;
    }
}
exports.default = PlaceOrderInput;
