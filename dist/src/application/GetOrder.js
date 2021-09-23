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
const GetOrderOutput_1 = __importDefault(require("./GetOrderOutput"));
class GetOrder {
    constructor(itemRepository, couponRepository, orderRepository) {
        this.itemRepository = itemRepository;
        this.couponRepository = couponRepository;
        this.orderRepository = orderRepository;
    }
    execute(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = this.orderRepository.getByCode(code);
            const orderItems = [];
            for (const orderItem of order.items) {
                const item = yield this.itemRepository.getById(orderItem.id);
                const orderItemOutput = {
                    itemDescription: item === null || item === void 0 ? void 0 : item.description,
                    price: orderItem.price,
                    quantity: orderItem.quantity
                };
                orderItems.push(orderItemOutput);
            }
            return new GetOrderOutput_1.default({
                code: order.code.value,
                deliveryPrice: order.deliveryPrice,
                total: order.getTotal(),
                orderItems
            });
        });
    }
}
exports.default = GetOrder;
