import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./RentProductCta.scss";
const reservationUrl = "/reservation";
const API_URL = import.meta.env.VITE_API_URL;

const RentProductCta = ({
  productId,
  owner_id,
  price_per_day,
  price_per_hour,
  enqueueSnackbar,
}) => {
  console.log(productId);
  const [hourlyClicks, setHourlyClicks] = useState(0);
  const [dailyClicks, setDailyClicks] = useState(0);
  const [hourlyTotal, setHourlyTotal] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const totalHourly = hourlyClicks * price_per_hour;
    const totalDaily = dailyClicks * price_per_day;
    const totalPrice = totalDaily + totalHourly;
    setTotalPrice(totalPrice);
    setHourlyTotal(totalHourly);
    setDailyTotal(totalDaily);
  }, [hourlyClicks, dailyClicks, price_per_day, price_per_hour]);

  const calTotalPrice = (
    hourlyClicks,
    dailyClicks,
    price_per_day,
    price_per_hour
  ) => {
    const hourlyTotal = hourlyClicks * price_per_hour;
    const dailyTotal = dailyClicks * price_per_day;
    return hourlyTotal + dailyTotal;
  };

  const handleHourlyClick = () => {
    setHourlyClicks((prevClicks) => prevClicks + 1);
  };

  const handleMinusHourlyClick = () => {
    setHourlyClicks((prevClicks) => Math.max(prevClicks - 1, 0));
  };

  const handleDailyClick = () => {
    setDailyClicks((prevClicks) => prevClicks + 1);
  };

  const handleMinusDailyClick = () => {
    setDailyClicks((prevClicks) => Math.max(prevClicks - 1, 0));
  };

  const postReservation = async () => {
    if (hourlyClicks === 0 && dailyClicks === 0) {
      enqueueSnackbar("Please select rental option to continue", {
        variant: "warning",
      });
      return;
    }

    if (!userId) {
      enqueueSnackbar("Please login to rent product", { variant: "error" });
    }
    const resStart = new Date();
    const resEnd = new Date(resStart);
    resEnd.setHours(resEnd.getHours() + hourlyClicks);
    resEnd.setDate(resEnd.getDate() + dailyClicks);
    const totalPrice = calTotalPrice(
      hourlyClicks,
      dailyClicks,
      price_per_day,
      price_per_hour
    );
    console.log(resStart, resEnd);
    const reservationData = {
      product_id: productId,
      user_id: userId,
      owner_id: owner_id,
      total_price: totalPrice,
      reservation_start: resStart.toISOString(),
      reservation_end: resEnd.toISOString(),
    };
    console.log(reservationData);
    try {
      const response = await axios.post(
        `${API_URL}${reservationUrl}`,
        reservationData
      );
      console.log(`Reservation created`, response.data);
      enqueueSnackbar("Rental Successful", { variant: "success" });
    } catch (error) {
      console.log(`Unable to create reservation`, error);
      enqueueSnackbar("Unable to create reservation", { variant: "error" });
    }
  };



  return (
    <div className="product__price-container">
      <div className="product__cta-container">
        <div className="product__price-header">
          <h3 className="product__cta-header">Rent by the hour</h3>
          <h3>(${price_per_hour})</h3>
        </div>
        <div className="product__subcontainer">
          <motion.button
            className="product__price-add"
            whileHover={{ scaleX: 1.075, scaleY: 1.075 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={handleHourlyClick}
          >
            +
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: "linear" },
            }}
            className="product__price-count"
          >
            {hourlyClicks}
          </motion.div>
          <motion.div
            className="product__price-minus"
            whileHover={{ scaleX: 1.075, scaleY: 1.075 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={handleMinusHourlyClick}
          >
            -
          </motion.div>
          <div className="product__price-count">{hourlyTotal}</div>
        </div>
      </div>
      <div className="product__cta-container">
        <div className="product__price-header">
          <h3 className="product__cta-header">Rent by the day</h3>
          <h3>(${price_per_day})</h3>
        </div>
        <div className="product__subcontainer">
          <motion.button
            className="product__price-add"
            whileHover={{ scaleX: 1.075, scaleY: 1.075 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={handleDailyClick}
          >
            +
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: "linear" },
            }}
            className="product__price-count"
          >
            {dailyClicks}
          </motion.div>
          <motion.div
            className="product__price-minus"
            whileHover={{ scaleX: 1.075, scaleY: 1.075 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={handleMinusDailyClick}
          >
            -
          </motion.div>
          <div className="product__price-count">{dailyTotal}</div>
        </div>
      </div>
      <div className="product__price-cta-container">
        <motion.button
          className="product__cta-rent"
          whileHover={{ scaleX: 1.075, scaleY: 1.075 }}
          whileTap={{ scaleX: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={postReservation}
        >
          Rent
        </motion.button>
        <div className="product__price-total-container">
          <div className="product__price-total">${totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default RentProductCta;
