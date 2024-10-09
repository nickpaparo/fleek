import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import OwnerRental from "../OwnerRental/OwnerRental";
import "./NewProduct.scss";
const productUrl = "/product";
const API_URL = import.meta.env.VITE_API_URL;

const NewProduct = () => {
  const navigate = useNavigate();

  const handleNewProductFormNav = () => {
    navigate("/newproduct");
  };

  const updateOwnerReservations = () => {
    
  }

  return (
    <section className="earn">
      <h1 className="earn__header">Earn with Recoup</h1>
      <motion.button
        className="earn__cta-new-product"
        whileHover={{ scaleX: 1.05 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onClick={handleNewProductFormNav}
      >
        List New Product
      </motion.button>
      <div className="earn__active">
        <h2 className="earn__active-header">Active Rentals:</h2>
        <ul className="earn__active-list">{/* {active listings} */}</ul>
      </div>
      <div className="earn__all">
        <h2 className="earn__all-header">All Rentals:</h2>
        <OwnerRental />
        <div className="earn__earnings">
          <h2 className="earn__earnings-header">Total Earnings:</h2>
          <div className="earn__earnings-total">$$$</div>
        </div>
      </div>
    </section>
  );
};

export default NewProduct;
