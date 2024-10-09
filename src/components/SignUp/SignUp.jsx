import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.scss";
const API_URL = import.meta.env.VITE_API_URL;

const SignUp = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/signup`, formData);
      console.log("Sign up successful:", response.data);
      const loginResponse = await axios.post(`${API_URL}/user/login`, { email: formData.email, password: formData.password });
      if (loginResponse.data.id) {
        localStorage.setItem("user_id", loginResponse.data.id);
        setIsLoggedIn(true);
        navigate(`/profile/${loginResponse.data.id}`)
      } else {
        console.error("Login after sign up failed")
      }
    } catch (error) {
      console.error("Sign up error:", error.response?.data);
    }
  };

  return (
    <section className="login">
      <h2 className="login__header">Sign Up</h2>
      <form className="login__form" onSubmit={handleSignUp}>
        <div className="login__container">
          <label className="login__label">First Name:</label>
          <input
            className="login__input"
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="login__container">
          <label className="login__label">Last Name:</label>
          <input
            className="login__input"
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="login__container">
          <label className="login__label">Email:</label>
          <input
            className="login__input"
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="login__container">
          <label className="login__label">Password:</label>
          <input
            className="login__input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="login__cta-container">
          <motion.button
            className="login__cta"
            type="submit"
            whileHover={{ scaleX: 1.05, scaleY: 1.05 }}
            whileTap={{ scaleX: 1, scaleY: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            Sign Up
          </motion.button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
