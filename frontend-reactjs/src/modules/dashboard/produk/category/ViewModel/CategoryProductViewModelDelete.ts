import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../api/api.ts";

function CategoryProductViewModelDelete() {
  const { API_URL_CATEGORYPRODUCT} = API_FRONTEND();
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const handleRemoveItem = async (id: number) => {
    try {
      const response = await fetch(
        `${API_URL_CATEGORYPRODUCT}/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
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