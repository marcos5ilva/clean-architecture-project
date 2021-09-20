import Database from './Database';
import pgp from 'pg-promise';

export default class PgPromisseDatabase implements Database {
	pgp: any;
	constructor() {
		this.pgp = pgp()('postgres://postgres:postdb1234@localhost:5432/app');
	}
	many(query: string, parameters: any) {
		return this.pgp.query(query, parameters);
	}
	one(query: string, parameters: any) {
		return this.pgp.oneOrNone(query, parameters);
	}
}
