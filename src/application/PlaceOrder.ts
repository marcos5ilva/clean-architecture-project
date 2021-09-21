import Coupon from '../domain/entity/Coupon';
import CouponRepository from '../domain/repository/CouponRepository';
import DeliveryPriceCalculator from '../domain/service/DeliveryPriceCalculator';
import Item from '../domain/entity/Item';
import ItemRepository from '../domain/repository/ItemRepository';
import Order from '../domain/entity/Order';
import PlaceOrderInput from './PlaceOrderInput';
import PlaceOrderOutput from './PlaceOrderOutput';
import ZipcodeCalculatorAPIMemory from '../infra/gateway/memory/ZipcodeCalculatorAPIMemory';
import OrderRepository from '../domain/repository/OrderRepository';

export default class PlaceOrder {
	zipcodeCalculator: ZipcodeCalculatorAPIMemory;
	itemRepository: ItemRepository;
	couponRepository: CouponRepository;
	orderRepository: OrderRepository;

	constructor(
		itemRepository: ItemRepository,
		couponRepository: CouponRepository,
		orderRepository: OrderRepository
	) {
		this.itemRepository = itemRepository;
		this.couponRepository = couponRepository;
		this.orderRepository = orderRepository;
		this.zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
	}

	async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
		const sequence = this.orderRepository.count() + 1;
		const order = new Order(input.cpf, input.issueDate, sequence);
		const distance = this.zipcodeCalculator.calculate(input.zipcode, 'L5B4L3');
		for (const orderItem of input.items) {
			//const item = this.items.find(item => item.id === orderItem.id);
			const item = await this.itemRepository.getById(orderItem.id);

			if (!item) {
				throw new Error('Item not found');
			}
			order.addItem(orderItem.id, item.price, orderItem.quantity);
			order.deliveryPrice +=
				DeliveryPriceCalculator.calculate(item, distance) * orderItem.quantity;
		}
		if (input.coupon) {
			//const coupon = this.coupons.find(coupon => coupon.code === input.coupon);
			const coupon = this.couponRepository.getByCode(input.coupon);
			if (coupon) order.addCoupon(coupon);
		}
		const total = order.getTotal();
		this.orderRepository.save(order);
		return new PlaceOrderOutput({
			code: order.code.value,
			deliveryPrice: order.deliveryPrice,
			total
		});
	}
}
