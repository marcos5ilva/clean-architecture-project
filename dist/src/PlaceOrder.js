"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryPriceCalculator_1 = __importDefault(require("./domain/service/DeliveryPriceCalculator"));
const Order_1 = __importDefault(require("./domain/entity/Order"));
const PlaceOrderOutput_1 = __importDefault(require("./PlaceOrderOutput"));
const ZipcodeCalculatorAPIMemory_1 = __importDefault(require("./ZipcodeCalculatorAPIMemory"));
class PlaceOrder {
    constructor(itemRepository, couponRepository) {
        this.itemRepository = itemRepository;
        this.couponRepository = couponRepository;
        this.orders = [];
        this.zipcodeCalculator = new ZipcodeCalculatorAPIMemory_1.default();
    }
    execute(input) {
        const order = new Order_1.default(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipcode, 'L5B4L3');
        for (const orderItem of input.items) {
            //const item = this.items.find(item => item.id === orderItem.id);
            const item = this.itemRepository.getById(orderItem.id);
            if (!item) {
                throw new Error('Item not found');
            }
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.deliveryPrice +=
                DeliveryPriceCalculator_1.default.calculate(item, distance) * orderItem.quantity;
        }
        if (input.coupon) {
            //const coupon = this.coupons.find(coupon => coupon.code === input.coupon);
            const coupon = this.couponRepository.getByCode(input.coupon);
            if (coupon)
                order.addCoupon(coupon);
        }
        const total = order.getTotal();
        this.orders.push(order);
        return new PlaceOrderOutput_1.default({ deliveryPrice: order.deliveryPrice, total });
    }
}
exports.default = PlaceOrder;
