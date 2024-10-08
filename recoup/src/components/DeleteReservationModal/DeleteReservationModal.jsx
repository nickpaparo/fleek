import axios from "axios";
import Modal from "../Modal/Modal";
const API_URL = import.meta.env.VITE_API_URL;

const DeleteReservationModal = ({
  rental_id,
  handleClose,
  fetchActiveRental,
  updateActiveReservations
}) => {

  const handleDeleteReservation = async () => {
    console.log("Reservation to delete:", rental_id)
    try {
      const response = await axios.delete(`${API_URL}/reservation/${rental_id}`);
      fetchActiveRental();
      updateActiveReservations(rental_id)
      handleClose();
    } catch (error) {
      console.error("Error deleting reservation:", error.response ? error.response.data : error);
    }
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete this res?"
        handleClose={handleClose}
        handleDelete={handleDeleteReservation}
      />
    </>
  );
};

export default DeleteReservationModal;
