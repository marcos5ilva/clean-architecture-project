"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryPriceCalculator_1 = __importDefault(require("../../src/domain/service/DeliveryPriceCalculator"));
const Item_1 = __importDefault(require("../../src/domain/entity/Item"));
test('Should calculate guitar delivery price', function () {
    const item = new Item_1.default('1', 'Guitar', 1000, 100, 50, 15, 3);
    const distance = 1000;
    const deliveryPrice = DeliveryPriceCalculator_1.default.calculate(item, distance);
    expect(deliveryPrice).toBe(30);
});
test('Should calculate amplifier delivery price', function () {
    const item = new Item_1.default('2', 'Amplificador', 5000, 50, 50, 50, 22);
    const distance = 1000;
    const deliveryPrice = DeliveryPriceCalculator_1.default.calculate(item, distance);
    expect(deliveryPrice).toBe(220);
});
test('Should calculate cable delivery price', function () {
    const item = new Item_1.default('3', 'Cable', 30, 9, 9, 9, 0.1);
    const distance = 1000;
    const deliveryPrice = DeliveryPriceCalculator_1.default.calculate(item, distance);
    expect(deliveryPrice).toBe(10);
});
