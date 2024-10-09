import { useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { motion } from "framer-motion";

const NavBar = ({ setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      const userId = localStorage.getItem("user_id");
      navigate(`/profile/${userId}`);
    } else {
      navigate("/login");
    }
  };
  // const handleEarnClick = () => {
  //   if (isLoggedIn) {
  //     navigate("/earn");
  //   } else {
  //     navigate("/login");
  //   }
  // };
  const handleRentClick = () => {
    if (isLoggedIn) {
      navigate("/rent");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="navbar">
      <motion.div
        className="navbar__container navbar__rent"
        whileHover={{ scaleX: 1.033 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        onClick={handleRentClick}
      >
        <p className="navbar__copy">Rent</p>
      </motion.div>
      <motion.div
        className="navbar__container navbar__earn"
        whileHover={{ scaleX: 1.033 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        // onClick={handleEarnClick}
      >
        <p className="navbar__copy">Earn</p>
      </motion.div>
      <motion.div
        className="navbar__container navbar__profile"
        whileHover={{ scaleX: 1.033 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        onClick={handleProfileClick}
      >
        <p className="navbar__copy">Profile</p>
      </motion.div>
    </section>
  );
};

export default NavBar;
