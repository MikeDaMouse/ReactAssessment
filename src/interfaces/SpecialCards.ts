import Card from "./Cards";

export default interface SpecialCards {
	id?: number;
	userId: number;
	cards: Card[];
	active: boolean;
}
