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
const GetOrder_1 = __importDefault(require("../../src/application/GetOrder"));
const PlaceOrder_1 = __importDefault(require("../../src/application/PlaceOrder"));
const PlaceOrderInput_1 = __importDefault(require("../../src/application/PlaceOrderInput"));
const PgPromisseDatabase_1 = __importDefault(require("../../src/infra/database/PgPromisseDatabase"));
const ItemRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/ItemRepositoryDatabase"));
const CouponRepositoryMemory_1 = __importDefault(require("../../src/infra/repository/memory/CouponRepositoryMemory"));
const OrderRepositoryMemery_1 = __importDefault(require("../../src/infra/repository/memory/OrderRepositoryMemery"));
test('Should list an order', function () {
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
        const getOrder = new GetOrder_1.default(itemRepository, couponRepository, orderRepository);
        const getOrderOutput = yield getOrder.execute(output.code);
        expect(getOrderOutput.total).toBe(5982);
    });
});
