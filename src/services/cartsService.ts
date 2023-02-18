import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API + "/carts" || "";


export async function addCardToMyCards(cardId: number) {
  let cardsArr: number[] = [];
  let cartId: number = 0;
  let userId: number = JSON.parse(
    sessionStorage.getItem("userData") as string
  ).userId;


  try {
    let res = await axios.get(`${api}?userId=${userId}`);
    cardsArr = res.data[0].cards;
    cartId = res.data[0].id;
    cardsArr.push(cardId);
    return axios.patch(`${api}/${cartId}`, { cards: cardsArr });
  } catch (error) {
    console.log(error);
  }
}


export function createCart(userId: number) {
  return axios.post(api, { userId, cards: [], active: true });
}


export async function getCardsInCart() {
  try {

    let userId: number = JSON.parse(
      sessionStorage.getItem("userData") as string
    ).userId;

    let cards: Card[] = [];

    let cartRes = await axios.get(`${api}?userId=${userId}`);

    let cardsIds: number[] = cartRes.data[0].cards;
    for (let id of cardsIds) {
      let cardRes = await axios.get(`http://localhost:8000/cards/${id}`);
      cards.push(cardRes.data);
    }
    return cards;
  } catch (error) {
    console.log(error);
  }
}
