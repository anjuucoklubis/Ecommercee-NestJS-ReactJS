import { useState } from "react";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../api/api.ts";

function GaleriesViewModelDelete() {
  const { API_URL_GALERIESPRODUCT } = API_FRONTEND();
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleRemoveItem = async (id: number) => {
    try {
      const response = await fetch(`${API_URL_GALERIESPRODUCT}/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Item ${id} successfully deleted`);
        return true;
      } else {
        const errorText = await response.text();
        console.error("Failed to delete item:", errorText);
        throw new Error(`Failed to delete item: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      throw new Error(`Error deleting item: ${error.message}`);
    }
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete !== null) {
      try {
        await handleRemoveItem(itemToDelete);
        console.log("Deleting item:", itemToDelete);
        setItemToDelete(null);
        toast.success("Galeries berhasil dihapus", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } catch (error) {
        console.error("Error while deleting gallery:", error);
        toast.error(`Error while deleting gallery: ${error.message}`);
      }
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

export default GaleriesViewModelDelete;
