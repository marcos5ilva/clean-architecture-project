"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaceOrderOutput {
    constructor({ deliveryPrice, total }) {
        this.total = total;
        this.deliveryPrice = deliveryPrice;
    }
}
exports.default = PlaceOrderOutput;
