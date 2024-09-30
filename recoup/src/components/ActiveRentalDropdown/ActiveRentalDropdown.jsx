import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./ActiveRentalDropdown.scss";
import DeleteReservationModal from "../DeleteReservationModal/DeleteReservationModal";
import EditReservation from "../EditReservation/EditReservation";

const ActiveRentalDropdown = ({ rental_id, fetchActiveRental, updateActiveReservations }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const openDeleteResModal = () => setOpenDeleteModal(true);
  const closeDeleteResModal = () => setOpenDeleteModal(false);
  const openEditResModal = () => setOpenEditModal(true);
  const closeEditResModal = () => setOpenEditModal(false);

  console.log(rental_id);
  return (
    <div className="activerental__edit-details">
      <button
        className="activerental__edit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openEditResModal();
        }}
      ></button>
      <button
        className="activerental__cancel"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openDeleteResModal();
        }}
      ></button>
      <AnimatePresence>
        {openDeleteModal && (
          <DeleteReservationModal
            openModal={openDeleteModal}
            handleClose={closeDeleteResModal}
            rental_id={rental_id}
            fetchActiveRental={fetchActiveRental}
            updateActiveReservations={updateActiveReservations}
          />
        )}
        {openEditModal && (
            <EditReservation 
            openModal={openEditModal}
            handleClose={closeEditResModal}
            rental_id={rental_id}
            fetchActiveRental={fetchActiveRental}
            updateActiveReservations={updateActiveReservations}
            />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActiveRentalDropdown;
