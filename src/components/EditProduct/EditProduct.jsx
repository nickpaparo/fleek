import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import Backdrop from "../Backdrop/Backdrop";
import "./EditProduct.scss";
const API_URL = import.meta.env.VITE_API_URL;

const EditProduct = ({ modalOpen, handleClose, productData }) => {
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price_per_hour: "",
    price_per_day: "",
    address: "",
    zipcode: "",
  });

  useEffect(() => {
    if (productData) {
      setProductDetails({
        title: productData.title || "",
        description: productData.description || "",
        price_per_hour: productData.price_per_hour || "",
        price_per_day: productData.price_per_day || "",
      });
    }
  }, [productData]);

  const handleProductEditChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/product/${productData.id}`,
        productDetails
      );
      console.log("Product info updates successfully", response.data);
      handleClose();
    } catch (error) {
      console.log("Unable to update product details", error);
    }
  };
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 33,
        stiffness: 600,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  useEffect(() => {
    handleSubmit(productDetails.id)
  })

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="editproduct green-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h3 className="editproduct__header">
          This is a modal to edit product data:
        </h3>
        <form className="editproduct__input-container" onSubmit={handleSubmit}>
          <div className="editproduct__name-container">
            <div className="editproduct__firstname-container">
              <label className="editproduct__label">Product title</label>
              <p className="editproduct__copy">250 Characters max</p>
              <input
                className="editproduct__input"
                name="title"
                value={productDetails.title}
                onChange={handleProductEditChange}
              ></input>
            </div>
            <div className="editproduct__lastname-container">
              <label className="editproduct__label">description</label>
              <input
                type="textarea"
                name="description"
                className="editproduct__input"
                value={productDetails.description}
                onChange={handleProductEditChange}
              ></input>
            </div>
          </div>
          <div className="editproduct__price-container">
            <div className="editproduct__price-subcontainer">
              <label className="editproduct__label">Price per hour</label>
              <input
                type="number"
                min="0"
                step="1"
                className="editproduct__input-price"
                name="price_per_hour"
                value={productDetails.price_per_hour}
                onChange={handleProductEditChange}
              ></input>
            </div>
            <div className="editproduct__price-subcontainer">
              <label className="editproduct__label">Price per day</label>
              <input
                type="number"
                min="0"
                step="1"
                className="editproduct__input-price"
                name="price_per_day"
                value={productDetails.price_per_day}
                onChange={handleProductEditChange}
              ></input>
            </div>
          </div>
          {/* <div>
            <label className="editproduct__label">Address</label>
            <input
              className="editproduct__input"
              // placeholder={productaddress}
              type="text"
              onChange={handleProductEditChange}
              value={productDetails.address}
            ></input>
          </div>
          <div>
            <label className="editproduct__label">Zipcode</label>
            <input
              className="editproduct__input"
              // placeholder={zipcode}
              value={productDetails.zipcode}
              type="numbers"
              onChange={handleProductEditChange}
            ></input>
          </div> */}
          <div className="editproduct__cta-container">
            <motion.button
              className="editproduct__button"
              whileHover={{ scaleX: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              type="submit"
            >
              Save
            </motion.button>
            <motion.button
              className="editproduct__button"
              whileHover={{ scaleX: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={handleClose}
            >
              Close
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default EditProduct;
