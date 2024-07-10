import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../api/api.ts";

function RegisterViewModel() {
  const { API_URL_AUTH_REGISTER } = API_FRONTEND();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    if (!formData.email || !formData.password) {
      if (!formData.email) {
        toast.error("Please enter email");
      }
      if (!formData.password) {
        toast.error("Please enter password");
      }
      return;
    }

    try {
      const response = await fetch(`${API_URL_AUTH_REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response received");
      if (response.ok) {
        setFormData({
          email: "",
          password: "",
        });
        toast.success("User created successfully", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        const responseData = await response.json();
        if (responseData && responseData.message) {
          if (Array.isArray(responseData.message)) {
            responseData.message.forEach((msg) => toast.error(msg));
          } else {
            toast.error(responseData.message);
          }
        } else {
          console.error("Failed to submit form:", response.statusText);
          toast.error("Failed to submit form");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  const handleInputChangeRegister = (event) => {
    const { name, value } = event.target;
    console.log("Input Changed:", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    handleSubmitRegister,
    handleInputChangeRegister,
    formData,
  };
}

export default RegisterViewModel;
