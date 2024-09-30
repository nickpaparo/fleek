import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./ProductSearch.scss";
const productUrl = "/product";
const API_URL = import.meta.env.VITE_API_URL;

const ProductSearch = ({ name, id, price, image }) => {
  const productId = id;
  console.log("Product ID:", productId);
  const [rating, setRating] = useState({});

  const fetchProductRating = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}${productUrl}/${productId}/rating`
      );
      console.log(data);
      setRating(data.product_rating);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductRating();
  }, [productId]);

  console.log(rating);

  if (rating === null) {
    return <div>No ratings yet</div>;
  }

  return (
    <NavLink to={`/rent/${id}`} className={"productsearch-link"}>
      <li className="productsearch">
        <h3 className="productsearch__title">{name}</h3>
        <img
          className="productsearch__image"
          src={image}
          alt={"main image for product"}
        />
        <div className="productsearch__details">
          <div className="productsearch__price">${price}</div>
          <div className="productsearch__rating">
            {rating === 0 ? "0 Ratings" : `${rating}`}
          </div>
        </div>
      </li>
    </NavLink>
  );
};

export default ProductSearch;
