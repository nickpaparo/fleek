import axios from "axios";
import Modal from "../Modal/Modal";
const API_URL = import.meta.env.VITE_API_URL;

const DeleteProduct = ({ handleClose, productData, onDeleteSuccess, handleOpen }) => {
  const product_id = productData.id;
  console.log("Delete Modal ID:", product_id);

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.post(`${API_URL}/product/delete`, {
        id: product_id,
      });
      console.log(response);
      onDeleteSuccess();
      handleClose();
    } catch (error) {
      console.log("Error deleting producting", error);
    }
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete this product?"
        handleClose={handleClose}
        handleDelete={handleDeleteProduct}
      />
    </>
  );
};

export default DeleteProduct;
