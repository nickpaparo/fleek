import { useState } from "react";
import { motion } from "framer-motion";
import "./Search.scss";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="search">
      <h1 className="search__header">Find Your Next Adventure</h1>
      <div className="search__bar">
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
          whileHover={{ scaleX: 1.075 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        ></motion.button>
      </div>
      <ul className="search__list">
        {/* {filteredProducts.map(product => (
                <li key={product.id}>{product.name}</li>
            ))} */}
        <li className="search__product"></li>
        <li className="search__product"></li>

      </ul>
    </section>
  );
};

export default Search;
