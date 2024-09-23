import "./NavBar.scss";
import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <section className="navbar">
      <motion.div
        className="navbar__container navbar__rent"
        whileHover={{ scaleX: 1.075 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <p className="navbar__copy">rent</p>
      </motion.div>
      <motion.div
        className="navbar__container navbar__earn"
        whileHover={{ scaleX: 1.075 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <p className="navbar__copy">earn</p>
      </motion.div>
      <motion.div
        className="navbar__container navbar__profile"
        whileHover={{ scaleX: 1.075 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <p className="navbar__copy">profile</p>
      </motion.div>
    </section>
  );
};

export default NavBar;
