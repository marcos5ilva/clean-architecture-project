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
const CouponRepositoryMemory_1 = __importDefault(require("../../src/infra/repository/memory/CouponRepositoryMemory"));
const ItemRepositoryMemory_1 = __importDefault(require("../../src/infra/repository/memory/ItemRepositoryMemory"));
const PlaceOrder_1 = __importDefault(require("../../src/application/PlaceOrder"));
const PlaceOrderInput_1 = __importDefault(require("../../src/application/PlaceOrderInput"));
const ItemRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/ItemRepositoryDatabase"));
const PgPromisseDatabase_1 = __importDefault(require("../../src/infra/database/PgPromisseDatabase"));
const OrderRepositoryMemery_1 = __importDefault(require("../../src/infra/repository/memory/OrderRepositoryMemery"));
test('Should place order', function () {
    return __awaiter(this, void 0, void 0, function* () {
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
        const itemRepository = new ItemRepositoryDatabase_1.default(PgPromisseDatabase_1.default.getInstance());
        const couponRepository = new CouponRepositoryMemory_1.default();
        const orderRepository = new OrderRepositoryMemery_1.default();
        const placeOrder = new PlaceOrder_1.default(itemRepository, couponRepository, orderRepository);
        const output = yield placeOrder.execute(input);
        expect(output.total).toBe(5982);
    });
});
test('Should place order with expired discount coupon', function () {
    return __awaiter(this, void 0, void 0, function* () {
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
        const itemRepository = new ItemRepositoryMemory_1.default();
        const couponRepository = new CouponRepositoryMemory_1.default();
        const orderRepository = new OrderRepositoryMemery_1.default();
        const placeOrder = new PlaceOrder_1.default(itemRepository, couponRepository, orderRepository);
        const output = yield placeOrder.execute(input);
        expect(output.total).toBe(7400);
    });
});
test('Should place order with delivery price included', function () {
    return __awaiter(this, void 0, void 0, function* () {
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
        const itemRepository = new ItemRepositoryMemory_1.default();
        const couponRepository = new CouponRepositoryMemory_1.default();
        const orderRepository = new OrderRepositoryMemery_1.default();
        const placeOrder = new PlaceOrder_1.default(itemRepository, couponRepository, orderRepository);
        const output = yield placeOrder.execute(input);
        expect(output.deliveryPrice).toBe(310);
    });
});
test('Should place order with code added', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = new PlaceOrderInput_1.default({
            cpf: '778.278.412-36',
            zipcode: 'L5B4L3',
            items: [
                { id: '1', quantity: 2 },
                { id: '2', quantity: 1 },
                { id: '3', quantity: 3 }
            ],
            coupon: 'GET20EXPIRED',
            issueDate: new Date('2020-10-10')
        });
        const itemRepository = new ItemRepositoryMemory_1.default();
        const couponRepository = new CouponRepositoryMemory_1.default();
        const orderRepository = new OrderRepositoryMemery_1.default();
        const placeOrder = new PlaceOrder_1.default(itemRepository, couponRepository, orderRepository);
        const output = yield placeOrder.execute(input);
        expect(output.code).toBe('202000000001');
    });
});
