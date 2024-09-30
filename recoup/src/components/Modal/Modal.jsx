import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ title, handleClose, handleDelete }) => {
  return (
    <>
      <Backdrop onClick={handleClose}>
        <div className="modal">
          <h3 className="modal__header">
            {title}
          </h3>
          <div className="modal__cta-container">
            <button className="modal__delete" onClick={handleDelete}>
              Delete
            </button>
            <button className="modal__cancel" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </Backdrop>
    </>
  );
};

export default Modal;
