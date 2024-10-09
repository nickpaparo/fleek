import { motion } from "framer-motion";
import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import axios from "axios";
import "./EditUser.scss";
const API_URL = import.meta.env.VITE_API_URL;

const EditUser = ({ handleClose, text, userData }) => {
  const [userDetails, setUserDetails] = useState({
    email: userData.email,
    password: userData.password,
    first_name: userData.first_name,
    last_name: userData.last_name,
  });

  console.log(userData);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 33,
        stiffness: 600,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  const handleUserEditChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/user/${userData.id}`,
        userDetails
      );
      console.log("User info updates successfully", response.data);
      handleClose();
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="edituser green-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p className="edituser__copy">
          This is a modal to edit user data: {text}
        </p>
        <form className="edituser__input-container" onSubmit={handleSubmit}>
          <div className="edituser__name-container">
            <div className="edituser__firstname-container">
              <label className="edituser__label">first name</label>
              <input
                className="edituser__input"
                value={userDetails.first_name}
                name="first_name"
                onChange={handleUserEditChange}
              ></input>
            </div>
            <div className="edituser__lastname-container">
              <label className="edituser__label">last name</label>
              <input
                className="edituser__input"
                value={userDetails.last_name}
                name="last_name"
                onChange={handleUserEditChange}
              ></input>
            </div>
          </div>
          {/* <label className="edituser__label">username</label>
          <input
            className="edituser__input"
            value={userDetails.username}
            name="username"
            onChange={handleUserEditChange}
          ></input> */}
          <label className="edituser__label">email</label>
          <input
            className="edituser__input"
            value={userDetails.email}
            name="email"
            onChange={handleUserEditChange}
          ></input>
          <label className="edituser__label">password</label>
          <input
            className="edituser__input"
            value={userDetails.password}
            type="password"
            name="password"
            onChange={handleUserEditChange}
          ></input>
          <div className="edituser__cta-container">
            <motion.button
              type="submit"
              className="edituser__button"
              whileHover={{ scaleX: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              Save
            </motion.button>
            <motion.button
              className="edituser__button"
              whileHover={{ scaleX: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={handleClose}
            >
              Close
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default EditUser;
