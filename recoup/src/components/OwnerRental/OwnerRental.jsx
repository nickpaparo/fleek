import { useState, useEffect } from "react";
import axios from "axios";
import "./OwnerRental.scss";
import ActiveOwnerRental from "../ActiveOwnerRental/ActiveOwnerRental";
import ActiveRentalTimecount from "../ActiveRentalTimecount/ActiveRentalTimecount";
const API_URL = import.meta.env.VITE_API_URL;

const OwnerRental = () => {
  const userId = localStorage.getItem("user_id");
  const [ownerRental, setOwnerRental] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOwnerRental = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_URL}/user/${userId}/owner`);
      if (Array.isArray(data)) {
        setOwnerRental(data);
      } else if (typeof data === "object" && data !== null) {
        setOwnerRental(Object.values(data));
      } else {
        setOwnerRental([]);
      }
    } catch (error) {
      console.log(
        `Unable to retrieve reservations for owner: ${userId}`,
        error
      );
      setOwnerRental([]);
    } finally {
      setIsLoading(false);
    }
  };
  //   const fetchOwnerRental = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const { data } = await axios.get(`${API_URL}/user/${userId}/owner`);
  //       const ownerRental = data;
  //       console.log(ownerRental);
  //       if (Array.isArray(ownerRental)) {
  //         setOwnerRental(ownerRental);
  //       } else if (typeof ownerRental === "object" && ownerRental !== null) {
  //         const arrayProperty = object.values(ownerRental).find(Array.isArray);
  //         if (arrayProperty) {
  //           setOwnerRental(arrayProperty);
  //         } else {
  //           throw new Error("Unexpected response format");
  //         }
  //       } else {
  //         throw new Error("Unexplected reponse format");
  //       }
  //     } catch (error) {
  //       console.log(
  //         `Unable to retrieve reservations for owner: ${userId}`,
  //         error
  //       );
  //       setOwnerRental([]);
  //     }
  //   };

  useEffect(() => {
    fetchOwnerRental();
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {Array.isArray(ownerRental) && ownerRental.length > 0 ? (
        ownerRental.map((rental) => (
          <ActiveOwnerRental
            key={rental.id}
            owner_id={userId}
            rental={rental}
            name={rental.title}
            fetchOwnerRental={fetchOwnerRental}
            setOwnerRental={setOwnerRental}
          />
        ))
      ) : (
        <li>No active rentals found.</li>
      )}
      {/* {ownerRental.map((rental) => (
        <ActiveOwnerRental
          key={rental.id}
          id={userId}
          rental={rental}
          name={rental.title}
          fetchOwnerRental={fetchOwnerRental}
          setOwnerRental={setOwnerRental}
        />
      ))} */}
      {/* {ownerRental.length > 0 ? (
        ownerRental.map((rental) => (
          <ActiveOwnerRental
            key={rental.id}
            rental={rental}
            fetchOwnerRental={fetchOwnerRental}
            setOwnerRental={setOwnerRental}
          />
        ))
      ) : (
        <li>No active rentals found.</li>
      )} */}
    </ul>
  );
};

export default OwnerRental;
