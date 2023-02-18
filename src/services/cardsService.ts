import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API + "/cards" || "";


export function getCards() {
  return axios.get(api);
}


export function getCardById(id: number) {
  return axios.get(`${api}/${id}`);
}


export function addCard(cardToAdd: Card) {
  return axios.post(api, cardToAdd);
}


export function updateCard(newCard: Card) {
  return axios.put(`${api}/${newCard.id}`, newCard);
}


export function deleteCard(id: number) {
  return axios.delete(`${api}/${id}`);
}

export function getMyCards() {
  let userId: number = JSON.parse(
    sessionStorage.getItem("userData") as string
  ).userId;
  return axios.get(`${api}?userId=${userId}`)
}
