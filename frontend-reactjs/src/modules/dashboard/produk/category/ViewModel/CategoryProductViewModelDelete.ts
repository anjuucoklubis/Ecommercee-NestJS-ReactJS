import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_FRONTEND from "../../../../../api/api.ts";

function CategoryProductViewModelDelete() {
  const { API_URL_CATEGORYPRODUCT_DELETE } = API_FRONTEND();
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const handleRemoveItem = async (id: number) => {
    try {
      const response = await axios.delete(
        `${API_URL_CATEGORYPRODUCT_DELETE}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status === 200) {
      } else {
        console.error("Failed to delete item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      handleRemoveItem(itemToDelete);
      setItemToDelete(null);
      toast.success("Kategori berhasil dihapus", {
        position: "top-right",
        onClose: () => {
          window.location.reload();
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  return {
    handleConfirmDelete,
    handleCancelDelete,
    itemToDelete,
    setItemToDelete,
  };
}

export default CategoryProductViewModelDelete;
