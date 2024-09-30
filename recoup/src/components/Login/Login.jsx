import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";
const API_URL = import.meta.env.VITE_API_URL;

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterNav = () => {
    navigate("/signup")
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/user/login`, { email, password });
      console.log(data);
      if (data.id) {
        localStorage.setItem("user_id", data.id);
        setIsLoggedIn(true);
        console.log("Navigating to:", `/profile/${data.id}`);
        navigate(`/profile/${data.id}`);
      } else {
        setError("Invalid credentials", error);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <section className="login">
      <h2 className="login__header">Welcome to Recoup</h2>
      <form className="login__form" onSubmit={handleLogin}>
        <div className="login__container">
          <label className="login__label">Email:</label>
          <input
            className="login__input"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="login__container">
          <label className="login__label">Password:</label>
          <input
            className="login__input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className="login__cta-container">
          <div className="login__cta-subcontainer">
          <motion.button 
          className="login__cta" 
          type="submit"
          whileHover={{ scaleX: 1.05, scaleY: 1.05 }}
          whileTap={{ scaleX: 1, scaleY: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          >Log In</motion.button>
          <motion.div
          className="login__cta" 
          whileHover={{ scaleX: 1.05, scaleY: 1.05 }}
          whileTap={{ scaleX: 1, scaleY: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={handleRegisterNav}
          >
            Sign Up
          </motion.div>
          </div>
          <div className="login__forgot">Forgot your password?</div>
        </div>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default Login;
