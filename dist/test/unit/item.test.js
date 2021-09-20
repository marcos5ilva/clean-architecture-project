"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("../../src/domain/entity/Item"));
test('Should calculate item volume', function () {
    const item = new Item_1.default('1', 'Amplificador', 5000, 50, 50, 50, 22);
    const volume = item.getVolume();
    expect(volume).toBe(0.125);
});
test('Should calculate item density', function () {
    const item = new Item_1.default('1', 'Amplificador', 5000, 50, 50, 50, 22);
    const density = item.getDensity();
    expect(density).toBe(176);
});
