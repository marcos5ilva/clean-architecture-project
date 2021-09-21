export default class PlaceOrderOutput {
	total: number;
	deliveryPrice: number;
	code: string;
	constructor({
		code,
		deliveryPrice,
		total
	}: {
		code: string;
		deliveryPrice: number;
		total: number;
	}) {
		this.code = code;
		this.total = total;
		this.deliveryPrice = deliveryPrice;
	}
}
