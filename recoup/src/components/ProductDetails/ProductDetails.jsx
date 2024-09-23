import { motion } from "framer-motion";
import "./ProductDetails.scss";

const ProductDetails = () => {
  return (
    <section className="product">
      <h1 className="product__header">product title</h1>
      <div className="product__image-container">
        <img className="avatar-image" />
      </div>
      <div className="product__details-container">
        <div className="product__user-image">user image</div>
        <div className="product__rating-container">
          <p className="product__location">product location</p>
          <div className="product__rating">rating 1-5</div>
        </div>
      </div>
      <div className="product__price-container">
        <motion.button
          className="product__price-hour"
          whileHover={{ scaleX: 1.075 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          Price/Hour
        </motion.button>
        <motion.button
          className="product__price-day"
          whileHover={{ scaleX: 1.075 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          Price/Day
        </motion.button>
      </div>
      <div className="product__description-container">
        <p className="product__description-copy">product description</p>
      </div>
    </section>
  );
};

export default ProductDetails;
