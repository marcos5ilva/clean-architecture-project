export default class GetOrderOutput {
	total: number;
	deliveryPrice: number;
	code: string;
	orderItems: { itemDescription: string; price: number; quantity: number }[];
	constructor({
		code,
		deliveryPrice,
		total,
		orderItems
	}: {
		code: string;
		deliveryPrice: number;
		total: number;
		orderItems: any[];
	}) {
		this.code = code;
		this.total = total;
		this.deliveryPrice = deliveryPrice;
		this.orderItems = orderItems;
	}
}
