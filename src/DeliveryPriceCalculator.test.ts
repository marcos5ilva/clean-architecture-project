import DeliveryPriceCalculator from './DeliveryPriceCalculator';
import Item from './Item';

test('Should calculate guitar delivery price', function () {
	const item = new Item('1', 'Guitar', 1000, 100, 50, 15, 3);
	const distance = 1000;
	const deliveryPrice = DeliveryPriceCalculator.calculate(item, distance);
	expect(deliveryPrice).toBe(30);
});

test('Should calculate amplifier delivery price', function () {
	const item = new Item('2', 'Amplificador', 5000, 50, 50, 50, 22);
	const distance = 1000;
	const deliveryPrice = DeliveryPriceCalculator.calculate(item, distance);
	expect(deliveryPrice).toBe(220);
});

test('Should calculate cable delivery price', function () {
	const item = new Item('3', 'Cable', 30, 9, 9, 9, 0.1);
	const distance = 1000;
	const deliveryPrice = DeliveryPriceCalculator.calculate(item, distance);
	expect(deliveryPrice).toBe(10);
});
