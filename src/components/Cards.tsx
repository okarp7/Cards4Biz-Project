import { FunctionComponent, useEffect, useState } from "react";
import { getCards } from "../services/cardsService";
import AddCardModal from "./AddCardModal";
import UpdateCardModal from "./UpdateCardModal";
import DeleteCardModal from "./DeleteCardModal";
import Card from "../interfaces/Card";
import Footer from "./Footer";
import CardsComp from "./CardsComp";

interface CardsProps { }

const Cards: FunctionComponent<CardsProps> = () => {
  let [cards, setCards] = useState<Card[]>([]);
  let isBusiness: boolean =
    JSON.parse(sessionStorage.getItem("userData") as string).isBusiness === true
      ? true
      : false;
  let [openAddModal, setOpenAddModal] = useState<boolean>(false);
  let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  let [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  let [cardId, setCardId] = useState<number>(0);
  let [cardsChange, setCardsChange] = useState<boolean>(false);

  useEffect(() => {

    getCards()
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
  }, [cardsChange]);

  let handleAddCard = () => {
    setOpenAddModal(true);
  };

  let refresh = () => {
    setCardsChange(!cardsChange);
  };

  return (
    <>

      <h5 className="text-center display-3 mt-2">ALL CARDS</h5>
      {isBusiness && (
        <div className="container text-center">
          <button className="btn btn-success m-2 w-50" onClick={handleAddCard}>
            Add New Card <i className="fa-solid fa-plus align-items-center"></i>
          </button>
        </div>
      )}
      <div className="container">
        <div className="row">
          {cards.length ? (

            cards.map((card: Card) => (
              <CardsComp isBusiness={isBusiness}
                card={card}
                setOpenUpdateModal={setOpenUpdateModal}
                setOpenDeleteModal={setOpenDeleteModal}
                setCardId={setCardId} />

            ))) : (<p>There are no cards</p>)
          }
        </div>
      </div>
      <AddCardModal
        show={openAddModal}
        onHide={() => setOpenAddModal(false)}
        refresh={refresh}
      />
      <UpdateCardModal
        show={openUpdateModal}
        onHide={() => setOpenUpdateModal(false)}
        cardId={cardId}
        refresh={refresh}
      />
      <DeleteCardModal
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        cardId={cardId}
        refresh={refresh}
      />

      <Footer />

    </>
  );
};

export default Cards;
