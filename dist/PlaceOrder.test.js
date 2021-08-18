"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrder_1 = __importDefault(require("./PlaceOrder"));
const PlaceOrderInput_1 = __importDefault(require("./PlaceOrderInput"));
test('Should place order', function () {
    const input = new PlaceOrderInput_1.default({
        cpf: '778.278.412-36',
        zipcode: 'L5B4L3',
        items: [
            { id: '1', quantity: 2 },
            { id: '2', quantity: 1 },
            { id: '3', quantity: 3 }
        ],
        coupon: 'GET20'
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5982);
});
test('Should place order with expired discount coupon', function () {
    const input = new PlaceOrderInput_1.default({
        cpf: '778.278.412-36',
        zipcode: 'L5B4L3',
        items: [
            { id: '1', quantity: 2 },
            { id: '2', quantity: 1 },
            { id: '3', quantity: 3 }
        ],
        coupon: 'GET20EXPIRED'
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7400);
});
test('Should place order with delivery price included', function () {
    const input = new PlaceOrderInput_1.default({
        cpf: '778.278.412-36',
        zipcode: 'L5B4L3',
        items: [
            { id: '1', quantity: 2 },
            { id: '2', quantity: 1 },
            { id: '3', quantity: 3 }
        ],
        coupon: 'GET20EXPIRED'
    });
    const placeOrder = new PlaceOrder_1.default();
    const output = placeOrder.execute(input);
    expect(output.deliveryPrice).toBe(310);
});
