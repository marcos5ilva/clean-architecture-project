export default class PlaceOrderOutput {
	total: number;
	deliveryPrice: number;
	constructor({
		deliveryPrice,
		total
	}: {
		deliveryPrice: number;
		total: number;
	}) {
		this.total = total;
		this.deliveryPrice = deliveryPrice;
	}
}
