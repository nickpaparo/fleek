import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./Search.scss";
import ProductSearch from "./ProductSearch/ProductSearch";
const productUrl = "/product";
const API_URL = import.meta.env.VITE_API_URL;

const Search = () => {
  const [productList, setProductList] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}${productUrl}`);
      const productList = data;
      console.log("Fetched products:", productList)
      setProductList(productList);
    } catch (error) {
      console.log(error);
      setProductList([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery === "") return;
    
    console.log("Initiating search with query:", searchQuery);
    
    try {
      const url = `${API_URL}${productUrl}/search`;
      console.log("Search URL:", url);
      
      const response = await axios.get(url, {
        params: { searchQuery: searchQuery }
      });
      
      console.log("Raw response:", response);
      console.log("Search results:", response.data);
      
      if (Array.isArray(response.data)) {
        setProductList(response.data);
      } else {
        console.warn("Response data is not an array:", response.data);
        setProductList([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      setProductList([]);
    }
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="search">
      <h1 className="search__header">Find Your Next Adventure</h1>
      <form className="search__bar" onSubmit={handleSearch}>
        <input
          className="search__bar-input"
          placeholder="Search..."
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <motion.button
          className="search__cta"
          whileHover={{ scaleX: 1.025 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          type="submit"
        ></motion.button>
      </form>
      <ul className="search__list">
        {productList.map((product) => (
                <ProductSearch key={product.id} id={product.id} name={product.title} price={product.price_per_hour} image={product.image}/>
            ))}
      </ul>
    </section>
  );
};

export default Search;
