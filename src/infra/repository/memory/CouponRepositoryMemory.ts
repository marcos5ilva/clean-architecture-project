import Coupon from '../../../domain/entity/Coupon';
import CouponRepository from '../../../domain/repository/CouponRepository';

export default class CouponRepositoryMemory implements CouponRepository {
	coupons: Coupon[];
	constructor() {
		this.coupons = [
			new Coupon('GET20', 20, new Date('2021-10-10')),
			new Coupon('GET20EXPIRED', 20, new Date('2020-10-10'))
		];
	}
	getByCode(code: string): Coupon | undefined {
		return this.coupons.find(coupon => coupon.code === code);
	}
}
