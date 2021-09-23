import Database from './Database';
import pgp from 'pg-promise';

export default class PgPromisseDatabase implements Database {
	private pgp: any;
	static instance: PgPromisseDatabase;
	private constructor() {
		this.pgp = pgp()('postgres://postgres:postdb1234@localhost:5432/app');
	}
	static getInstance() {
		if (!PgPromisseDatabase.instance) {
			PgPromisseDatabase.instance = new PgPromisseDatabase();
		}
		return PgPromisseDatabase.instance;
	}
	many(query: string, parameters: any) {
		return this.pgp.query(query, parameters);
	}
	one(query: string, parameters: any) {
		return this.pgp.oneOrNone(query, parameters);
	}
}
