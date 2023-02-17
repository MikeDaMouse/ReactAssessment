import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../interfaces/Cards";
import { deleteCard, deleteMyCard, editCard } from "../services/cardService";
import { successMsg } from "../services/notifications";
import Navbar from "./Navbar";

interface SpecialCardsProps {}

const SpecialCards: FunctionComponent<SpecialCardsProps> = () => {
	let navigate = useNavigate();
	let [cards, setCards] = useState<Card[]>([]);
	let [cardChange, setCardChange] = useState<boolean>(false);

	useEffect(() => {
		getMyCards();
	}, [cardChange]);
	let refresh = () => {
		setCardChange(!cardChange);
	};

	let getMyCards = async () => {
		try {
			let userId: number = JSON.parse(
				sessionStorage.getItem("userData") as string
			).userId;

			let cards: Card[] = [];
			let myCardsRes = await axios.get(
				`${process.env.REACT_APP_API}/specialcards?userId=${userId}`
			);
			let myCardsId: number[] = myCardsRes.data[0].cards;
			for (let id of myCardsId) {
				let cardRes = await axios.get(
					`${process.env.REACT_APP_API}/cards/${id}`
				);
				cards.push(cardRes.data);
			}
			setCards(cards);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navbar />
			{cards.length ? (
				<div className="container">
					<div className="row">
						{cards.map((card: Card) => (
							<div
								key={card.id}
								className="card ms-1 my-5 mx-4"
								style={{ width: "18rem" }}
							>
								<img
									src={card.image}
									style={{ width: "100%", height: "15rem" }}
									alt=""
								/>

								<div className="card-body">
									<h3 className="card-title">{card.name}</h3>
									<p className="card-text" style={{ fontSize: "1.3rem" }}>
										{card.description}
									</p>
									<hr />
									<p className="card-text">{card.location}</p>
									<hr />
									<p className="card-text">{card.phone}</p>

									<button
										className="btn btn-warning mx-2"
										onClick={() => {
											navigate(`/editcard/${card.id}`);
										}}
									>
										<i className="fa-solid fa-pen-to-square"></i>
									</button>
									<button
										className="btn btn-danger"
										onClick={() => {
											if (
												window.confirm(
													"Are you sure you want to delete this card?"
												)
											) {
												if (card.id !== undefined) {
													deleteCard(card.id).then(() => {
														if (card.id !== undefined) {
															deleteMyCard(card.id).then(() => {
																successMsg("Card deleted");
																refresh();
															});
														}
													});
												}
											}
										}}
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<p>Nothing to show for yourself</p>
			)}
		</>
	);
};

export default SpecialCards;
