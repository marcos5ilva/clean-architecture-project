"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("../../../domain/entity/Item"));
class ItemRepositoryMemory {
    constructor() {
        this.items = [
            new Item_1.default('1', 'Guitar', 1000, 100, 50, 15, 3),
            new Item_1.default('2', 'Amplifier', 5000, 50, 50, 50, 22),
            new Item_1.default('3', 'Cable', 30, 10, 10, 10, 1)
        ];
    }
    getById(id) {
        return Promise.resolve(this.items.find(item => item.id === id));
    }
}
exports.default = ItemRepositoryMemory;
