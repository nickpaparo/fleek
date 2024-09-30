import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import EditUser from "../EditUser/EditUser";
import "./UserProfile.scss";
import ActiveProduct from "../ActiveProduct/ActiveProduct";
import ActiveRental from "../ActiveRental/ActiveRental";
import EditProduct from "../EditProduct/EditProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
const userUrl = "/user";
const API_URL = import.meta.env.VITE_API_URL;

const UserProfile = () => {
  const { userId } = useParams();
  const [activeRentalData, setActiveRentalData] = useState([]);
  const [activeProductData, setActiveProduct] = useState([]);
  const [userData, setUserData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const openEditResModal = (rental) => {
    setActiveRentalData(rental);
    setEditResModalOpen(true);
  };

  const closeEditProductModal = () => {
    setEditProductModalOpen(false);
    setSelectedProduct(null);
  };

  const openDeleteProductModal = (product) => {
    setSelectedProduct(product);
    setDeleteProductModalOpen(true);
  };

  const openEditProductModal = (product) => {
    setSelectedProduct(product);
    setEditProductModalOpen(true);
  };

  const closeDeleteProductModal = () => {
    setDeleteProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductDeleted = () => {
    fetchActiveProduct();
  };

  const handleReservationDeleted = () => {
    fetchActiveRental();
  };

  const fetchUserProfile = async () => {
    if (userId) {
      try {
        const { data } = await axios.get(`${API_URL}${userUrl}/${userId}`);
        const userData = data;
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchActiveProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}${userUrl}/${userId}/product`
      );
      const activeProductData = data;
      console.log(activeProductData.image)
      setActiveProduct(activeProductData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActiveProduct();
  }, []);

  const fetchActiveRental = async () => {
    try {
      const { data } = await axios.get(`${API_URL}${userUrl}/${userId}/rental`);
      const activeRentalData = data;
      setActiveRentalData(activeRentalData);
    } catch (error) {
      console.log(error);
      setActiveRentalData([]);
    }
  };

  useEffect(() => {
    fetchActiveRental();
  }, []);

  const updateActiveReservations = (deletedReservationId) => {
    setActiveRentalData((prevReservations) =>
      prevReservations.filter(
        (reservation) => reservation.id !== deletedReservationId
      )
    );
  };

  if (!activeProductData) return null;
  if (!userData) return null;

  return (
    <section className="user">
      <div className="user__details">
        <div className="user__avatar-container">
          <img className="user__avatar-image" />
        </div>
        <div className="user__name-container">
          <p className="user__firstname">{userData.first_name}</p>
          <p className="user__lastname">{userData.last_name}</p>
        </div>
      </div>
      <div className="user__reservations-container">
        <h2 className="user__reservations-header">Active Rentals:</h2>
        <div className="user__reservations">
          {activeRentalData
            .filter((rental) => {
              const end = new Date(rental.reservation_end);
              return end > new Date();
            })
            .map((rental) => (
              <ActiveRental
                key={rental.id}
                id={userId}
                name={rental.title}
                rental={rental}
                updateActiveReservations={updateActiveReservations}
              />
            ))}
        </div>
      </div>
      <div>
        <div className="user__active-container">
          <h2 className="user__active-header">Active Products:</h2>
          <NavLink to="/newproduct" className="user__new-product-link">
            <motion.button
              className="user__new-product"
              whileHover={{ scaleX: 1.05, scaleY: 1.05 }}
            >
              +
            </motion.button>
          </NavLink>
        </div>
        <div className="user__products">
          {activeProductData.map((product) => (
            <ActiveProduct
              key={product.id}
              id={userId}
              product={product}
              image={product.image}
              onEdit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openEditProductModal(product);
              }}
            />
          ))}
        </div>
      </div>
      <motion.button
        className="user__edit"
        whileHover={{ scaleX: 1.05 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onClick={() => (modalOpen ? close() : open())}
      >
        Edit Profile
      </motion.button>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <EditUser
            modalOpen={modalOpen}
            handleClose={close}
            userData={userData}
          />
        )}
        {editProductModalOpen && (
          <EditProduct
            modalOpen={openEditProductModal}
            handleClose={closeEditProductModal}
            productData={selectedProduct}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default UserProfile;
