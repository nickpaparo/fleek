import { useEffect, useState } from "react";

import "./ActiveRentalTimecount.scss";

const ActiveRentalTimecount = ({
  rental,
  id,
  setActiveReservation,
  setOwnerRental,
}) => {
  const [timerDisplay, setTimerDisplay] = useState();

  const formatTimeDifference = (difference) => {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hrs = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    let result = [];
    if (days > 0) {
      result.push(`${days} day${days !== 1 ? "s" : ""}`);
    }
    if (hrs > 0 || days > 0) {
      result.push(`${hrs} hr${hrs !== 1 ? "s" : ""}`);
    }
    result.push(`${mins} min${mins !== 1 ? "s" : ""}`);

    return result.join(", ");
  };

  const reservationTimer = (resStart, resEnd) => {
    const now = new Date();
    const start = new Date(resStart);
    const end = new Date(resEnd);

    if (now < start) {
      const timeUntilStart = start - now;
      return `Start: ${formatTimeDifference(timeUntilStart)}`;
    } else if (now >= start && now < end) {
      const timeUntilEnd = end - now;
      return `End: ${formatTimeDifference(timeUntilEnd)}`;
    } else {
      return "Reservation ended";
    }
  };

  useEffect(() => {
    if (rental.reservation_start && rental.reservation_end) {
      const timerInterval = setInterval(() => {
        const timerValue = reservationTimer(
          rental.reservation_start,
          rental.reservation_end
        );
        setTimerDisplay(timerValue);

        if (timerValue === "Reservation ended") {
          setOwnerRental(false);
          setActiveReservation(false);
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [rental.reservation_start, rental.reservation_end, setOwnerRental, setActiveReservation]);
  return (
    <div className="activerental__countdown">
      {timerDisplay}
    </div>
  );
};

export default ActiveRentalTimecount;
