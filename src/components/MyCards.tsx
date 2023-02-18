import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getMyCards } from "../services/cardsService";
import Footer from "./Footer";
import AddCardModal from "./AddCardModal";
import UpdateCardModal from "./UpdateCardModal";
import DeleteCardModal from "./DeleteCardModal";

interface CartProps { }

const Cart: FunctionComponent<CartProps> = () => {
  let [cards, setCards] = useState<Card[]>([]);
  let [cardId, setCardId] = useState<number>(0);
  let [openAddModal, setOpenAddModal] = useState<boolean>(false);
  let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  let [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  let [cardsChange, setCardsChange] = useState<boolean>(false);

  useEffect(() => {
    getMyCards().then((res) => setCards(res.data)).catch((err) => console.log(err)
    );
  }, [cardsChange]);

  let refresh = () => {
    setCardsChange(!cardsChange);
  };


  return (
    <>


      <h3 className="text-center display-3 mb-5">My Cards</h3>

      {cards.length ? (
        <div className="container">
          <div className="row">
            {cards.map((card: Card) => (
              <div
                key={card.id}
                className="card ms-1 col-md-4"
                style={{ width: "18rem" }}
              >
                <img
                  src={card.image}
                  className="card-img-top"
                  alt={"business img"}
                  style={{ height: "100%" }}
                />
                <div className="card-header mt-1 display-7">{card.name}</div>
                <div className="card-body">

                  <p className="card-text">{card.description}</p>
                  <p className="text-primary">
                    <i className="fas fa-home mr-3 m-1"></i>
                    {card.address}</p>
                  <p className="text-success">
                    <i className="fas fa-phone mr-3 m-1"></i>
                    {card.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No cards in store</p>
      )}

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

export default Cart;
