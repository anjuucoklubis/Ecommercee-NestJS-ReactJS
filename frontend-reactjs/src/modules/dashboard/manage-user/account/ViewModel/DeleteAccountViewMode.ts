import { useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const DeleteAccountViewModel = () => {
  const { API_URL_USER_DATA_DELETE_USER_ACCOUNT } = API_FRONTEND();
  const [userId, setUserId] = useState<string | null>(null);

  const deleteUserAccount = async () => {
    if (userId) {
      try {
        const response = await axios.delete(
          `${API_URL_USER_DATA_DELETE_USER_ACCOUNT}/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("User Account deleted successfully");
          toast.success("User Account deleted successfully", {
            position: "top-right",
            onClose: () => {
              window.location.reload();
            },
          });
        } else {
          console.error("Failed to delete address");
        }
      } catch (error) {
        console.error("Error deleting address:", error);
      } finally {
        setUserId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setUserId(null);
  };
  return {
    deleteUserAccount,
    userId,
    handleCancelDelete,
    setUserId,
  };
};

export default DeleteAccountViewModel;
