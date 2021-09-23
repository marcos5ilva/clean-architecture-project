"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
class PgPromisseDatabase {
    constructor() {
        this.pgp = pg_promise_1.default()('postgres://postgres:postdb1234@localhost:5432/app');
    }
    static getInstance() {
        if (!PgPromisseDatabase.instance) {
            PgPromisseDatabase.instance = new PgPromisseDatabase();
        }
        return PgPromisseDatabase.instance;
    }
    many(query, parameters) {
        return this.pgp.query(query, parameters);
    }
    one(query, parameters) {
        return this.pgp.oneOrNone(query, parameters);
    }
}
exports.default = PgPromisseDatabase;
