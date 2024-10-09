import axios from "axios";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useNavigate } from "react-router-dom";
import "./MakeNewProduct.scss";
import { image } from "framer-motion/client";
import { createPortal } from "react-dom";
const productUrl = "/product";
const API_URL = import.meta.env.VITE_API_URL;

const MakeNewProduct = () => {
  const userId = localStorage.getItem("user_id");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    user_id: userId,
    title: "",
    description: "",
    price_per_day: "",
    price_per_hour: "",
    is_available: true,
    image: "",
    address: "",
    zipcode: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceDayRef = useRef(null);
  const priceHourRef = useRef(null);
  const imageRef = useRef(null);
  const addressRef = useRef(null);
  const zipcodeRef = useRef(null);

  const handleCancelNewProduct = () => {
    navigate("/earn");
  };

  const validatePrice = (price) => {
    const numPrice = Number(price);
    return !isNaN(numPrice) && numPrice >= 0;
  };

  const postProduct = async (newProduct) => {
    try {
      console.log(formData);
      const response = await axios.post(`${API_URL}${productUrl}`, formData);
      console.log(`Successfully posted new product`, response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error posting product",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name.includes("price") ? value.replace(/[^0-9.]/g, "") : value,
      imageUrl: name === "image" ? value : prevData.imageUrl,
    }));
  };

  const handleAddNewProduct = async () => {
    try {
      if (
        !formData.user_id ||
        !formData.title ||
        !formData.price_per_hour ||
        !formData.price_per_day
      ) {
        alert("Please fill out all required fields");
        return;
      }
      console.log(formData);
      await postProduct(formData);
      const userId = localStorage.getItem("user_id");
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Error adding new product", error);
    }
  };

  const moveNextStep = async (e) => {
    e.preventDefault();
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        console.log(formData);
        await handleAddNewProduct();
        const userId = localStorage.getItem("user_id");
        navigate(`/profile/${userId}`);
      } catch (error) {
        console.error("Error adding new product:", error);
      }
    }
  };

  return (
    <>
      <motion.div
        style={{
          scaleX,
          transformOrigin: "0%",
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          height: 10,
          background: "#33AE8C",
        }}
      ></motion.div>
      <form
        className="newproduct"
        onSubmit={(e) => {
          e.preventDefault();
          moveNextStep();
        }}
      >
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="newproduct-container green-background"
            >
              <div className="newproduct__title-container">
                <h3 className="newproduct__title-header">
                  Got something gathering dust?
                </h3>
                <input
                  ref={titleRef}
                  id="title"
                  name="title"
                  value={formData.product_title}
                  onChange={handleInputChange}
                  type="text"
                  className="newproduct__title"
                  placeholder="title (250 character limit)"
                ></input>
              </div>
              <div className="direct">
                <motion.div
                  className="direct-image"
                  alt={"double chevron down"}
                  whileHover={{ scaleX: 1.1, scaleY: 1.05 }}
                  whileTap={{ scaleX: 1, scaleY: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={moveNextStep}
                ></motion.div>
              </div>
            </motion.div>
          )}
          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="newproduct-container white-background"
            >
              <div className="newproduct__description-container">
                <h3 className="newproduct__description-header">
                  Tell us a little more about it!
                </h3>
                <p className="newproduct__description-subheader">
                  Pro Tip: <br /> People love to hear your favorite way to use
                  it.
                </p>
                <textarea
                  ref={descriptionRef}
                  id="description"
                  name="description"
                  type="text"
                  value={formData.product_description}
                  onChange={handleInputChange}
                  className="newproduct__description-input"
                  placeholder="write a quick description here"
                ></textarea>
              </div>
              <div className="direct">
                <motion.div
                  className="direct-image"
                  alt={"double chevron up"}
                  whileHover={{ scaleX: 1.1, scaleY: 1.05 }}
                  whileTap={{ scaleX: 1, scaleY: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={(e) => moveNextStep(e)}
                ></motion.div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="newproduct-container green-background"
            >
              <div className="newproduct__price-container">
                <h3 className="newproduct__price-header">
                  Let's now put a price on it...
                </h3>
                <div className="newproduct__price-subheader-container">
                  <p className="newproduct__price-subheader">Pro Tip:</p>
                  <p className="newproduct__price-subheader">
                    You can always adjust the price later.
                  </p>
                </div>
                <div className="newproduct__price-cta-container">
                  <input
                    ref={priceDayRef}
                    value={formData.price_per_day}
                    onChange={handleInputChange}
                    type="number"
                    min="0"
                    step="1"
                    id="price_per_day"
                    name="price_per_day"
                    className="newproduct__price-input"
                    placeholder="per day"
                  ></input>
                  <input
                    ref={priceHourRef}
                    value={formData.price_per_hour}
                    onChange={handleInputChange}
                    type="number"
                    min="0"
                    step="1"
                    id="price_per_hour"
                    name="price_per_hour"
                    className="newproduct__price-input"
                    placeholder="per hour"
                  ></input>
                </div>
                <div className="direct">
                  <motion.button
                    className="direct-image"
                    alt={"double chevron up"}
                    whileHover={{ scaleX: 1.1, scaleY: 1.05 }}
                    whileTap={{ scaleX: 1, scaleY: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    onClick={(e) => moveNextStep(e)}
                  ></motion.button>
                </div>
              </div>
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="newproduct-container white-background"
            >
              <div className="newproduct__image-container">
                <h3 className="newproduct__image-header">
                  Show off your stuff!
                </h3>
                <div className="newproduct__image-subheader-container">
                  <p className="newproduct__image-subheader">Pro Tip:</p>
                  <p className="newproduct__image-subheader">
                    Upload clear images, with the product well lit
                  </p>
                </div>
                <div className="newproduct__image-input-container">
                  <label className="newproduct__image-label">
                    Insert image URL below:
                  </label>
                  <input
                    className="newproduct__image-input"
                    type="url"
                    id="url-input"
                    name="image"
                    accept="image/*"
                    placeholder="Enter image URL"
                    ref={imageRef}
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                  />
                  {formData.imageUrl && (
                    <img
                      className="newproduct__image-preview"
                      id="url-preview"
                      src={formData.imageUrl}
                      alt="Image preview"
                      onError={(e) => {
                        e.target.style.display = "none";
                        console.error("Error loading image");
                      }}
                    />
                  )}
                </div>
                <div className="direct">
                  <motion.button
                    className="direct-image"
                    alt={"double chevron up"}
                    whileHover={{ scaleX: 1.1, scaleY: 1.05 }}
                    whileTap={{ scaleX: 1, scaleY: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    onClick={(e) => moveNextStep(e)}
                  ></motion.button>
                </div>
              </div>
            </motion.div>
          )}
          {currentStep === 4 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="newproduct-container green-background"
            >
              <div className="newproduct__address-header-container">
                <h2 className="newproduct__address-header">
                  Product's location
                </h2>
                <p className="newproduct__address-subheader">
                  Will be shown only after reservation is confirmed
                </p>
              </div>
              <div className="newproduct__address-input-container">
                <label className="newproduct__address-label">Address</label>
                <input
                  ref={addressRef}
                  onChange={handleInputChange}
                  id="address"
                  name="address"
                  type="text"
                  className="newproduct__address-input"
                  placeholder="333 Smith Rd"
                />
                <label className="newproduct__address-label">Zipcode</label>
                <input
                  ref={zipcodeRef}
                  onChange={handleInputChange}
                  type="number"
                  min="0"
                  step="1"
                  id="zipcode"
                  name="zipcode"
                  className="newproduct__address-input"
                  placeholder="10011"
                />
              </div>
              <div className="direct">
                <motion.button
                  className="direct-image"
                  alt={"double chevron up"}
                  whileHover={{ scaleX: 1.1, scaleY: 1.05 }}
                  whileTap={{ scaleX: 1, scaleY: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={moveNextStep}
                ></motion.button>
              </div>
            </motion.div>
          )}
          {currentStep === 5 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="newproduct-container white-background"
            >
              <div className="newproduct__cta">
                <h3 className="newproduct__cta-header">Go Live!</h3>
                <div className="newproduct__cta-subcontainer">
                  <motion.button
                    whileHover={{ scaleX: 1.1, scaleY: 1.05 }}
                    whileTap={{ scaleX: 1, scaleY: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="newproduct__cancel"
                    onClick={handleCancelNewProduct}
                  >
                    Cancel
                  </motion.button>
                  {console.log(formData)}
                  <NavLink to="/earn">
                    <motion.button
                      className="newproduct__submit"
                      type="submit"
                      onClick={(e) => moveNextStep(e)}
                      disabled={currentStep < 3}
                      whileHover={{ scaleX: 1.1, scaleY: 1.05 }}
                      whileTap={{ scaleX: 1, scaleY: 1 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    ></motion.button>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
};

export default MakeNewProduct;
