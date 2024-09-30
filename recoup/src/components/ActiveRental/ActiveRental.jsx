import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ActiveRentalTimecount from "../ActiveRentalTimecount/ActiveRentalTimecount";
import "./ActiveRental.scss";
import ActiveRentalDropdown from "../ActiveRentalDropdown/ActiveRentalDropdown";
const productUrl = "/product";
const reservationUrl = "/reservation";
const API_URL = import.meta.env.VITE_API_URL;

const ActiveRental = ({ rental, id, updateActiveReservations }) => {
  console.log(rental.product_title);
  console.log(rental.id);
  const { userId } = useParams();
  const [activeReservation, setActiveReservation] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const fetchActiveRental = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}${reservationUrl}/${userId}${productUrl}`
      );
      const { activeReservation } = data;
      console.log(activeReservation);
      setActiveReservation(activeReservation);
    } catch (error) {
      setActiveReservation([])
    }
  };

  useEffect(() => {
    fetchActiveRental();
  }, [userId]);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <ul>
      <li className="activerental" id={id}>
        <div className="activerental__left-container">
          <button
            className="activerental__edit-cta"
            onClick={toggleDetails}
          ></button>
          <div className="activerental__title">{rental.product_title}</div>
        </div>
        <div className="activerental__details-container">
          <ActiveRentalTimecount
            rental={rental}
            setActiveReservation={setActiveReservation}
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
          fetchActiveRental={fetchActiveRental}
          updateActiveReservations={updateActiveReservations}
        />
      )}
    </ul>
  );
};

export default ActiveRental;
