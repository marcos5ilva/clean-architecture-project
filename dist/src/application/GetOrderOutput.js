"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetOrderOutput {
    constructor({ code, deliveryPrice, total, orderItems }) {
        this.code = code;
        this.total = total;
        this.deliveryPrice = deliveryPrice;
        this.orderItems = orderItems;
    }
}
exports.default = GetOrderOutput;
