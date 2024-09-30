import axios from "axios";
import Modal from "../Modal/Modal";
const API_URL = import.meta.env.VITE_API_URL;

const EditReservation = ({ rental_id, handleClose }) => {
  console.log(rental_id);
  const handleEditReservation = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/reservation/${rental_id}`
      );
      console.log(response, updatedReservation);
      handleClose();
    } catch (error) {
      console.log("Unable to update reservation", error);
    }
  };
  return (
    <>
      <Modal
        title="Edit this reservation"
        handleClose={handleClose}
        handleDelete={handleEditReservation}
      />
    </>
  );
};

export default EditReservation;
