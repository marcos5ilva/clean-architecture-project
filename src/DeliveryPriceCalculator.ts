import Item from './Item';

export default class DeliveryPriceCalculator {
	static calculate(item: Item, distance: number) {
		const price = distance * item.getVolume() * (item.getDensity() / 100);
		return price > 10 ? price : 10;
	}
}
