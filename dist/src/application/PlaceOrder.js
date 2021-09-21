"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeliveryPriceCalculator_1 = __importDefault(require("../domain/service/DeliveryPriceCalculator"));
const Order_1 = __importDefault(require("../domain/entity/Order"));
const PlaceOrderOutput_1 = __importDefault(require("./PlaceOrderOutput"));
const ZipcodeCalculatorAPIMemory_1 = __importDefault(require("../infra/gateway/memory/ZipcodeCalculatorAPIMemory"));
class PlaceOrder {
    constructor(itemRepository, couponRepository, orderRepository) {
        this.itemRepository = itemRepository;
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;
        this.zipcodeCalculator = new ZipcodeCalculatorAPIMemory_1.default();
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequence = this.orderRepository.count() + 1;
            const order = new Order_1.default(input.cpf, input.issueDate, sequence);
            const distance = this.zipcodeCalculator.calculate(input.zipcode, 'L5B4L3');
            for (const orderItem of input.items) {
                //const item = this.items.find(item => item.id === orderItem.id);
                const item = yield this.itemRepository.getById(orderItem.id);
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
            this.orderRepository.save(order);
            return new PlaceOrderOutput_1.default({
                code: order.code.value,
                deliveryPrice: order.deliveryPrice,
                total
            });
        });
    }
}
exports.default = PlaceOrder;
