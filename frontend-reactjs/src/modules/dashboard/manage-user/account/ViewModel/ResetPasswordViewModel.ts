import { useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const ResetPasswordViewModel = () => {
  const { API_URL_USER_DATA_RESET_PASSWORD } = API_FRONTEND();
  const [userId, setUserId] = useState<string | null>(null);

  const handleResetPassword = async (userId: string) => {
    try {
      setUserId(userId);
      const response = await axios.patch(
        `${API_URL_USER_DATA_RESET_PASSWORD}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Password reset successfully");
      } else {
        throw new Error("Failed to reset password user ");
      }
    } catch (error) {
      console.error("Error to reset password user ", error);
    }
  };

  const handleConfirmResetPassword = () => {
    console.log("handleConfirmResetPassword called");
    console.log("handleConfirmResetPassword called with userId:", userId);
    if (userId) {
      handleResetPassword(userId);
      setUserId(null);
      toast.success("Password Reset successfully", {
        position: "top-right",
        onClose: () => {
          window.location.reload();
        },
      });
    } else {
      console.error("User ID is not available");
    }
  };

  const handleCancelResetPassword = () => {
    setUserId(null);
  };
  return {
    handleResetPassword,
    userId,
    handleConfirmResetPassword,
    handleCancelResetPassword,
    setUserId,
  };
};

export default ResetPasswordViewModel;
