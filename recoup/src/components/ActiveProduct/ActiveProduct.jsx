import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./ActiveProduct.scss";
import DeleteProduct from "../DeleteProduct/DeleteProduct";

const ActiveProduct = ({ image, product, rating, id, onEdit }) => {
  const [openModal, setOpenModal] = useState();

  const openDeleteProductModal = () => setOpenModal(true);
  const closeDeleteProductModal = () => setOpenModal(false);

  return (
    <div className="activeproduct-container">
      <NavLink to={`/rent/${product.id}`} className={"activeproduct__link"}>
        <div className="activeproduct" id={id}>
          <img
            className="activeproduct__image"
            src={image}
            alt={"main image for product"}
          />
          <div className="activeproduct__rating">{rating}/5</div>
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
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActiveProduct;
