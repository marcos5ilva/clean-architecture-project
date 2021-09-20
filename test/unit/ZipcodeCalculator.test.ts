import ZipcodeCalculatorAPIMemory from '../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory';

test('Should calculate the distance between two zipcodes', function () {
	const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
	const zipcodeA = 'L5B4L3';
	const zipcodeB = 'L5b4L3';
	const distance = zipcodeCalculator.calculate(zipcodeA, zipcodeB);
	expect(distance).toBe(1000);
});
