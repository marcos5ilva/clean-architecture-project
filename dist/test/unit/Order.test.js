"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../../src/domain/entity/Coupon"));
const Order_1 = __importDefault(require("../../src/domain/entity/Order"));
test("Shouldn't create an oder with invalid CPF", function () {
    const cpf = '111.111.111-11';
    expect(() => new Order_1.default(cpf)).toThrow(new Error('Invalid CPF'));
});
test('Should create an order with 3 itens', function () {
    const cpf = '778.278.412-36';
    const order = new Order_1.default(cpf);
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    const total = order.getTotal();
    expect(total).toBe(7090);
});
test('Should create an order with discount coupon', function () {
    const cpf = '778.278.412-36';
    const order = new Order_1.default(cpf);
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    order.addCoupon(new Coupon_1.default('GET20', 20, new Date('2021-10-10')));
    const total = order.getTotal();
    expect(total).toBe(5672);
});
test('Should create an order with expired discount coupon', function () {
    const cpf = '778.278.412-36';
    const order = new Order_1.default(cpf);
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    order.addCoupon(new Coupon_1.default('GET20', 20, new Date('2020-10-10')));
    const total = order.getTotal();
    expect(total).toBe(7090);
});
test('Should create a order calculating the order code', function () {
    const cpf = '778.278.412-36';
    const order = new Order_1.default(cpf, new Date('2020-10-10'), 2);
    order.addItem('1', 1000, 2);
    order.addItem('2', 5000, 1);
    order.addItem('3', 30, 3);
    order.addCoupon(new Coupon_1.default('GET20', 20, new Date('2020-10-10')));
    expect(order.code).toBe('202000000002');
});
