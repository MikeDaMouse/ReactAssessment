import axios from "axios";
import Card from "../interfaces/Cards";
import SpecialCards from "../interfaces/SpecialCards";
import { errorMsg } from "./notifications";

const api: string = `${process.env.REACT_APP_API}/cards`;
const apiSpecial = `${process.env.REACT_APP_API}/specialcards` || "";

//add new card
export function addNewCard(Info: Card) {
	return axios.post(api, Info);
}

//Add new card to myCards
export async function addMyCard(cardId: number) {
	let myCardsArr: number[] = [];
	let myCardsId: number = 0;
	let userId = JSON.parse(sessionStorage.getItem("userData") as string).userId;
	try {
		let res = await axios.get(`${apiSpecial}?userId=${userId}`);
		myCardsArr = res.data[0].cards;
		myCardsId = res.data[0].id;
		myCardsArr.push(cardId);
		return axios.patch(`${apiSpecial}/${myCardsId}`, { cards: myCardsArr });
	} catch (error) {
		errorMsg("Error");
	}
}
export async function deleteMyCard(cardId: number) {
	let myCardsArr: number[] = [];
	let myCardsId: number = 0;
	let userId = JSON.parse(sessionStorage.getItem("userData") as string).userId;
	try {
		let res = await axios.get(`${apiSpecial}?userId=${userId}`);
		myCardsArr = res.data[0].cards;
		myCardsId = res.data[0].id;
		myCardsArr.splice(myCardsArr.indexOf(cardId), 1);
		return axios.patch(`${apiSpecial}/${myCardsId}`, { cards: myCardsArr });
	} catch (error) {
		errorMsg("Error");
	}
}

//Create MyCards section
export function createMyCards(userId: number) {
	return axios.post(apiSpecial, { userId, cards: [], active: true });
}

//see all cards
export function getCards() {
	return axios(api);
}

//get specific product
export function getSpecificCard(id: number) {
	return axios.get(`${api}/${id}`);
}

//edit card
export function editCard(newInfo: Card) {
	return axios.put(`${api}/${newInfo.id}`, newInfo);
}

//delete
export function deleteCard(id: number) {
	return axios.delete(`${api}/${id}`);
}
