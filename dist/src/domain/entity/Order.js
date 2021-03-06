"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
const OrderCode_1 = __importDefault(require("./OrderCode"));
class Order {
    constructor(cpf, issueDate = new Date(), sequence = 1) {
        this.cpf = new Cpf_1.default(cpf);
        this.items = [];
        this.deliveryPrice = 0;
        this.issueDate = issueDate;
        this.sequence = sequence;
        this.code = new OrderCode_1.default(issueDate, sequence);
    }
    addItem(id, price, quantity) {
        this.items.push(new OrderItem_1.default(id, price, quantity));
    }
    addCoupon(coupon) {
        if (!coupon.isExpired())
            this.coupon = coupon;
    }
    getTotal() {
        let total = 0;
        for (const orderItem of this.items) {
            total += orderItem.getTotal();
        }
        if (this.coupon) {
            total -= (total * this.coupon.discountPercentage) / 100;
        }
        total += this.deliveryPrice;
        return total;
    }
}
exports.default = Order;
