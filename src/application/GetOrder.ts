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
import GetOrderOutput from './GetOrderOutput';

export default class GetOrder {
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
	}

	async execute(code: string): Promise<GetOrderOutput> {
		const order = this.orderRepository.getByCode(code);
		const orderItems: any[] = [];
		for (const orderItem of order.items) {
			const item = await this.itemRepository.getById(orderItem.id);
			const orderItemOutput = {
				itemDescription: item?.description,
				price: orderItem.price,
				quantity: orderItem.quantity
			};
			orderItems.push(orderItemOutput);
		}
		return new GetOrderOutput({
			code: order.code.value,
			deliveryPrice: order.deliveryPrice,
			total: order.getTotal(),
			orderItems
		});
	}
}
