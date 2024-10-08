import { useState } from "react";
import "./ActiveOwnerRental.scss";
import ActiveRentalDropdown from "../ActiveRentalDropdown/ActiveRentalDropdown";
import ActiveRentalTimecount from "../ActiveRentalTimecount/ActiveRentalTimecount";

const ActiveOwnerRental = ({ rental, fetchOwnerRental, setOwnerRental, owner_id }) => {
  console.log(rental);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };
  return (
    <div>
      <li className="activerental">
        <div className="activerental__left-container">
          <button
            className="activerental__edit-cta"
            onClick={toggleDetails}
          ></button>
          <div>
            {rental.product_title || "No title"}
            {rental.total_rentals}
          </div>
        </div>
        <div className="activerental__details-container">
          <div className="activerental__earning">{rental.total_price}</div>
        </div>
        <div className="activerental__details-container">
          <ActiveRentalTimecount
            rental={rental}
            id={owner_id}
            setOwnerRental={setOwnerRental}
          />
          <div className="activerental__earning">
            $
            {rental.total_price === null || rental.total_price === 0
              ? " - "
              : `${rental.total_price}`}
          </div>
        </div>
      </li>
      {isDetailsVisible && (
        <ActiveRentalDropdown
          rental_id={rental.id}
          fetchOwnerRental={fetchOwnerRental}
          updateActiveReservations={updateActiveReservations}
        />
      )}
    </div>
  );
};

export default ActiveOwnerRental;
