import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import AddCardModal from "./AddCardModal";
import UpdateCardModal from "./UpdateCardModal";
import DeleteCardModal from "./DeleteCardModal";
import { addCardToMyCards } from "../services/cartsService";
import { successMsg } from "../services/feedbacks";
import Card from "../interfaces/Card";
import Footer from "./Footer";

interface CardsCompProps {
    isBusiness: boolean;
    card: Card;
    setOpenUpdateModal: Function;
    setOpenDeleteModal: Function;
    setCardId: Function;
}

const CardsComp: FunctionComponent<CardsCompProps> = ({
    isBusiness,
    card,
    setOpenUpdateModal,
    setOpenDeleteModal,
    setCardId
}) => {

    let userId = JSON.parse(sessionStorage.getItem("userData") as string).userId;
    let [canEdit, setCanEdit] = useState<boolean>(false);

    useEffect(() => {
        userId == card.userId && (setCanEdit(true));
    }, [canEdit]);

    return (
        <>
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
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            addCardToMyCards(card.id as number)
                                .then(() =>
                                    successMsg(`Card ${card.name} added to my cards`)
                                )
                                .catch((err) => console.log(err));
                        }}
                    >
                        <i className="fa-solid fa-plus"></i> To my cards
                    </button>
                    {isBusiness && (
                        <>
                            {canEdit && (
                                <>
                                    <button
                                        className="btn btn-warning mx-2"
                                        onClick={() => {
                                            setOpenUpdateModal(true);
                                            setCardId(card.id as number);
                                        }}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setOpenDeleteModal(true);
                                            setCardId(card.id as number);
                                        }}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </>
                            )
                            }

                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default CardsComp;