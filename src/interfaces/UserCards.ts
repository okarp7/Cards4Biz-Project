import Card from "./Card";

export default interface Cart {
  id?: number;
  userId: number;
  cards: Card[];
  active: boolean;
}
