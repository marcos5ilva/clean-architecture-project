import Coupon from '../../src/domain/entity/Coupon';

test('Should check if coupon is expeired', function () {
	const coupon = new Coupon('GET20', 20, new Date('2020-10-10'));
	expect(coupon.isExpired()).toBe(true);
});
