import Order from '../entity/Order';

export default interface OrderRepository {
	save(order: Order): void;
	getByCode(code: string): Order;
	count(): number;
}
