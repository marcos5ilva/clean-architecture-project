import Coupon from './Coupon';
import Cpf from './Cpf';
import OrderItem from './OrderItem';

export default class Order {
	cpf: Cpf;
	items: OrderItem[];
	coupon: Coupon | undefined;
	deliveryPrice: number;
	issueDate: Date;
	sequence: number;
	code: string;

	constructor(cpf: string, issueDate: Date = new Date(), sequence: number = 1) {
		this.cpf = new Cpf(cpf);
		this.items = [];
		this.deliveryPrice = 0;
		this.issueDate = issueDate;
		this.sequence = sequence;
		this.code = `${this.issueDate.getFullYear()}${new String(sequence).padStart(
			8,
			'0'
		)}`;
	}

	addItem(id: string, price: number, quantity: number) {
		this.items.push(new OrderItem(id, price, quantity));
	}

	addCoupon(coupon: Coupon) {
		if (!coupon.isExpired()) this.coupon = coupon;
	}

	getTotal() {
		let total = 0;
		for (const orderItem of this.items) {
			total += orderItem.getTotal();
		}
		if (this.coupon) {
			total -= (total * this.coupon.discountPercentage) / 100;
		}
		total += this.deliveryPrice;
		return total;
	}
}
