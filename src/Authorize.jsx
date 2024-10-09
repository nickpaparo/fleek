import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authorize = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    console.log("Authorize: user_id from localStorage:", userId);
    if (!localStorage.getItem("user_id")) {
      navigate("/login")
    }
  }, [navigate]);

  return localStorage.getItem("user_id") ? children : null;
};

export default Authorize;
