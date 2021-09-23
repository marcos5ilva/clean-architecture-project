"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderRepositoryMemory {
    constructor() {
        this.orders = [];
    }
    save(order) {
        this.orders.push(order);
    }
    getByCode(code) {
        const order = this.orders.find(order => order.code.value === code);
        if (!order)
            throw new Error('Order not found');
        return order;
    }
    count() {
        return this.orders.length;
    }
}
exports.default = OrderRepositoryMemory;
