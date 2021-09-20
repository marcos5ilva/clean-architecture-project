export default class Item {
	id: string;
	description: string;
	price: number;
	width: number;
	length: number;
	height: number;
	weight: number;
	constructor(
		id: string,
		description: string,
		price: number,
		width: number,
		length: number,
		height: number,
		weight: number
	) {
		this.id = id;
		this.description = description;
		this.price = price;
		this.width = width;
		this.length = length;
		this.height = height;
		this.weight = weight;
	}

	getVolume() {
		return (this.width / 100) * (this.length / 100) * (this.height / 100);
	}

	getDensity() {
		return this.weight / this.getVolume();
	}
}
