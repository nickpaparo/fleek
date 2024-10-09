import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import "./ProductDetails.scss";
import RentProductCta from "../RentProductCta/RentProductCta";
import ProductRating from "../ProductRating/ProductRating";
import backArrow from "../../assets/left-chevron.png";
const productUrl = "/product";
const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${API_URL}${productUrl}/${productId}`);
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileNav = () => {
    navigate(`/profile/${user_id}`);
  };

  const handleBackNav = () => {
    navigate(`/rent`)
  }

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <section className="product">
      <div className="product__header-container">
        <img 
        src={backArrow} 
        className="product__header-back"
        alt={"Left arrow to go back to product search page"}
        onClick={handleBackNav}
        />
        <h1 className="product__header">{product.title}</h1>
      </div>
      <div className="product__image-container">
        <img
          className="product__image"
          src={product.image}
          alt={`User submitted image of ${product.title}`}
        />
      </div>
      <div className="product__details-container">
        <div className="product__user-image" onClick={handleProfileNav}>
          user image
        </div>
        <div className="product__rating-container">
          <p className="product__location">
            {product.address}, {product.zipcode}
          </p>
          <ProductRating productId={productId} />
        </div>
      </div>
      <div className="product__description-container">
        <p className="product__description-copy">{product.description}</p>
      </div>
      <RentProductCta
        price_per_day={product.price_per_day}
        price_per_hour={product.price_per_hour}
        owner_id={product.user_id}
        productId={productId}
        enqueueSnackbar={enqueueSnackbar}
      />
    </section>
  );
};

export default ProductDetails;
