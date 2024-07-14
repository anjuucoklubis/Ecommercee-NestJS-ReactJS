import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../api/api.ts";
import axios from "axios";
import Cookies from "js-cookie";
function ChangePasswordViewModel({ onClose }) {
  const { API_URL_AUTH_CHANGEPASSWORD } = API_FRONTEND();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmitChangePassword = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    if (!formData.oldPassword || !formData.newPassword) {
      if (!formData.oldPassword) {
        toast.error("Please enter Old Password");
      }
      if (!formData.newPassword) {
        toast.error("Please enter New Password");
      }
      return;
    }

    try {
      const response = await axios.post(
        API_URL_AUTH_CHANGEPASSWORD,
        {
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("Response received", response);
      if (response.status === 201) {
        setFormData({
          oldPassword: "",
          newPassword: "",
        });
        onClose();

        toast.success("Password updated successfully", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        const responseData = response.data;
        if (responseData && responseData.message) {
          toast.error(responseData.message);
        } else {
          console.error("Failed to submit form:", response.statusText);
          toast.error("Failed to submit form");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error submitting form");
      }
    }
  };

  const handleInputChangePassword = (event) => {
    const { name, value } = event.target;
    console.log("Input Changed:", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    handleSubmitChangePassword,
    handleInputChangePassword,
    formData,
  };
}

export default ChangePasswordViewModel;
