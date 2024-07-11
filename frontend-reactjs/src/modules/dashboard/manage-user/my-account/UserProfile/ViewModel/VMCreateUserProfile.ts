import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../../api/api.ts";
import Cookies from "js-cookie";
import axios from "axios";

function VMCreateUserProfile({ onClose }) {
  const { API_URL_USER_PROFILE_CREATE } = API_FRONTEND();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    telephone: "",
  });

  const handleSubmitCreateUserProfile = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    if (!formData.firstname || !formData.lastname || !formData.telephone) {
      if (!formData.firstname) {
        toast.error("Please enter name of UserProfile");
      }
      if (!formData.lastname) {
        toast.error("Please enter description of UserProfile");
      }
      if (!formData.telephone) {
        toast.error("Please enter telephone of UserProfile");
      }
      return;
    }

    try {
      const response = await axios.post(`${API_URL_USER_PROFILE_CREATE}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      console.log("Response received", response);
      if (response.status === 201) { // Adjust this condition based on your API's success response code
        setFormData({
          firstname: "",
          lastname: "",
          telephone: "",
        });
        onClose();

        toast.success("UserProfile created successfully", {
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
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error submitting form");
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input Changed:", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    handleSubmitCreateUserProfile,
    handleInputChange,
    formData,
  };
}

export default VMCreateUserProfile;
