import { getNodeMajorVersion, getOriginalNode } from 'typescript';
import GetOrder from '../../src/application/GetOrder';
import PlaceOrder from '../../src/application/PlaceOrder';
import PlaceOrderInput from '../../src/application/PlaceOrderInput';
import PgPromisseDatabase from '../../src/infra/database/PgPromisseDatabase';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemery';

test('Should list an order', async function () {
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
	const itemRepository = new ItemRepositoryDatabase(
		PgPromisseDatabase.getInstance()
	);
	const couponRepository = new CouponRepositoryMemory();
	const orderRepository = new OrderRepositoryMemory();
	const placeOrder = new PlaceOrder(
		itemRepository,
		couponRepository,
		orderRepository
	);
	const output = await placeOrder.execute(input);
	const getOrder = new GetOrder(
		itemRepository,
		couponRepository,
		orderRepository
	);
	const getOrderOutput = await getOrder.execute(output.code);
	expect(getOrderOutput.total).toBe(5982);
});
