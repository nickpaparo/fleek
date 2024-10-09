import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./ActiveProduct.scss";
import axios from "axios";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
const productUrl = "/product";
const API_URL = import.meta.env.VITE_API_URL;

const ActiveProduct = ({ image, product, id, onEdit, updateActiveProducts }) => {
  const productId = id;
  console.log(productId);
  console.log(product);
  const [openModal, setOpenModal] = useState();
  const [rating, setRating] = useState({})

  const openDeleteProductModal = () => setOpenModal(true);
  const closeDeleteProductModal = () => setOpenModal(false);

  const fetchProductRating = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}${productUrl}/${product.id}/rating`
      );
      console.log(data)
      setRating(data.product_rating);
    } catch (error) {
      console.log(error);
      setRating(null);
    }
  };

  useEffect(() => {
    fetchProductRating();
  }, [productId]);

  if (rating === null) {
    return <div>No ratings yet</div>;
  }

  return (
    <div className="activeproduct-container">
      <NavLink to={`/rent/${product.id}`} className={"activeproduct__link"}>
        <div className="activeproduct" id={id}>
          <img
            className="activeproduct__image"
            src={image}
            alt={"main image for product"}
          />
          <div className="activeproduct__rating">{rating === 0 ? "0 Ratings" : `${rating}`}</div>
        </div>
      </NavLink>
      <div className="activeproduct__cta-container">
        <motion.button
          className="activeproduct__edit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.75 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(e);
          }}
        ></motion.button>
        <motion.button
          className="activeproduct__delete"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.75 }}
          onClick={(e) => openDeleteProductModal(e)}
        ></motion.button>
      </div>
      <AnimatePresence>
        {openModal && (
          <DeleteProduct
            openModal={openModal}
            handleClose={closeDeleteProductModal}
            productData={product}
            updateActiveProducts={updateActiveProducts}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActiveProduct;
