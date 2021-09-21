"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaceOrderOutput {
    constructor({ code, deliveryPrice, total }) {
        this.code = code;
        this.total = total;
        this.deliveryPrice = deliveryPrice;
    }
}
exports.default = PlaceOrderOutput;
