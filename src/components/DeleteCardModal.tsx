import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import { deleteCard } from "../services/cardsService";
import { successMsg } from "../services/feedbacks";

interface DeleteProductModalProps {
  show: boolean;
  onHide: Function;
  cardId: number;
  refresh: Function;
}

const DeleteProductModal: FunctionComponent<DeleteProductModalProps> = ({
  show,
  onHide,
  cardId,
  refresh,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            DELETE CARD
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure?</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteCard(cardId)
                .then(() => {
                  onHide();
                  successMsg("Card deleted successfully");
                  refresh();
                })
                .catch((err) => console.log(err));
            }}
          >
            Yes
          </button>
          <button className="btn btn-primary" onClick={() => onHide()}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
