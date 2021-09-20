import Coupon from '../../src/domain/entity/Coupon';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import Order from '../../src/domain/entity/Order';
import PlaceOrder from '../../src/application/PlaceOrder';
import PlaceOrderInput from '../../src/application/PlaceOrderInput';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import PgPromisseDatabase from '../../src/infra/database/PgPromisseDatabase';

test('Should place order', async function () {
	const input = new PlaceOrderInput({
		cpf: '778.278.412-36',
		zipcode: 'L5B4L3',
		items: [
			{ id: '1', quantity: 2 },
			{ id: '2', quantity: 1 },
			{ id: '3', quantity: 3 }
		],
		coupon: 'GET20'
	});
	const itemRepository = new ItemRepositoryDatabase(new PgPromisseDatabase());
	const couponRepository = new CouponRepositoryMemory();
	const placeOrder = new PlaceOrder(itemRepository, couponRepository);
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(5982);
});

test('Should place order with expired discount coupon', async function () {
	const input = new PlaceOrderInput({
		cpf: '778.278.412-36',
		zipcode: 'L5B4L3',
		items: [
			{ id: '1', quantity: 2 },
			{ id: '2', quantity: 1 },
			{ id: '3', quantity: 3 }
		],
		coupon: 'GET20EXPIRED'
	});
	const itemRepository = new ItemRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const placeOrder = new PlaceOrder(itemRepository, couponRepository);
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(7400);
});

test('Should place order with delivery price included', async function () {
	const input = new PlaceOrderInput({
		cpf: '778.278.412-36',
		zipcode: 'L5B4L3',
		items: [
			{ id: '1', quantity: 2 },
			{ id: '2', quantity: 1 },
			{ id: '3', quantity: 3 }
		],
		coupon: 'GET20EXPIRED'
	});
	const itemRepository = new ItemRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const placeOrder = new PlaceOrder(itemRepository, couponRepository);
	const output = await placeOrder.execute(input);
	expect(output.deliveryPrice).toBe(310);
});
