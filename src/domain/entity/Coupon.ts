export default class Coupon {
	expireDate: Date;
	code: string;
	discountPercentage: number;
	constructor(code: string, discountPercentage: number, exprireDate: Date) {
		this.code = code;
		this.discountPercentage = discountPercentage;
		this.expireDate = exprireDate;
	}

	isExpired(): any {
		const today = new Date();
		return this.expireDate.getTime() < today.getTime();
	}
}
