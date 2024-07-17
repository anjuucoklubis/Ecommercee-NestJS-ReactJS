import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
function RoleViewModelCreate({ onClose }) {
  const { API_URL_USEROLE_CREATE } = API_FRONTEND();

  const [formData, setFormData] = useState<{
    role_name: string;
    role_description: string;
  }>({
    role_name: "",
    role_description: "",
  });

  const handleSubmitCreateRole = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    if (!formData.role_name || !formData.role_description) {
      if (!formData.role_name) {
        toast.error("Please enter Role Name of Role");
      }
      if (!formData.role_description) {
        toast.error("Please enter Role Description of Role");
      }
      return;
    }

    try {
      const response = await fetch(`${API_URL_USEROLE_CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response received");
      if (response.ok) {
        setFormData({
          role_name: "",
          role_description: "",
        });
        onClose();

        toast.success("Role created successfully", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        const responseData = await response.json();
        if (responseData && responseData.message) {
          toast.error(responseData.message);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input Changed:", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    handleSubmitCreateRole,
    handleInputChange,
    formData,
  };
}

export default RoleViewModelCreate;
