"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ZipcodeCalculatorAPIMemory_1 = __importDefault(require("./ZipcodeCalculatorAPIMemory"));
test('Should calculate the distance between two zipcodes', function () {
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory_1.default();
    const zipcodeA = 'L5B4L3';
    const zipcodeB = 'L5b4L3';
    const distance = zipcodeCalculator.calculate(zipcodeA, zipcodeB);
    expect(distance).toBe(1000);
});
