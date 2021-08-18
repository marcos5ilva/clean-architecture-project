"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeliveryPriceCalculator {
    static calculate(item, distance) {
        const price = distance * item.getVolume() * (item.getDensity() / 100);
        return price > 10 ? price : 10;
    }
}
exports.default = DeliveryPriceCalculator;
