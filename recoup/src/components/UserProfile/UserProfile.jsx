import { motion } from "framer-motion";
import "./UserProfile.scss";

const UserProfile = () => {
  return (
    <section className="user">
      <div className="user__details">
        <div className="user__avatar-container">
          <img className="user__avatar-image" />
        </div>
        <p className="user__username">username</p>
      </div>
      <div className="user__reservations">active reservations</div>
      <div className="user__products">active listings</div>
      <motion.button
        className="user__edit"
        whileHover={{ scaleX: 1.05 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        edit profile
      </motion.button>
    </section>
  );
};

export default UserProfile;
