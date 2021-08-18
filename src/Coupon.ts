export default class Coupon {
	expireDate: Date;
	code: String;
	discountPercentage: number;
	constructor(code: String, discountPercentage: number, exprireDate: Date) {
		this.code = code;
		this.discountPercentage = discountPercentage;
		this.expireDate = exprireDate;
	}

	isExpired(): any {
		const today = new Date();
		return this.expireDate.getTime() < today.getTime();
	}
}
