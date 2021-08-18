"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coupon {
    constructor(code, discountPercentage, exprireDate) {
        this.code = code;
        this.discountPercentage = discountPercentage;
        this.expireDate = exprireDate;
    }
    isExpired() {
        const today = new Date();
        return this.expireDate.getTime() < today.getTime();
    }
}
exports.default = Coupon;
