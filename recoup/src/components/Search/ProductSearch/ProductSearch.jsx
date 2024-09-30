import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./ProductSearch.scss";
const productUrl = "/product";
const API_URL = import.meta.env.VITE_API_URL;

const ProductSearch = ({ name, id, rating, price, image, product }) => {
  const [productRating, setRating] = useState([]);

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
          <div className="productsearch__rating">{rating}/5</div>
        </div>
      </li>
    </NavLink>
  );
};

export default ProductSearch;
