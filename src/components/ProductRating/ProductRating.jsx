import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductRating.scss"
const API_URL = import.meta.env.VITE_API_URL;

const ProductRating = ({ productId }) => {
    const [rating, setRating] = useState({});

    const fetchProductRating = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/product/${productId}/rating`)
            console.log(data);
            setRating(data.product_rating);
        } catch (error) {
            console.log("Unable to retrieve product ratings", error);
            setRating(null)
        }
    }

    useEffect(() => {
        fetchProductRating();
    }, [productId])

    if (rating === null) {
        return <div>No ratings yet</div>
    }

    return ( 
        <div className="product__rating">
            {rating === 0 ? "0 Ratings" : `Renter Rating: ${rating}`}
        </div>
     );
}
 
export default ProductRating;