import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
import Cookies from "js-cookie";

function CategoryProductViewModelCreate({ onClose }) {
  const { API_URL_CATEGORYPRODUCT_CREATE } = API_FRONTEND();
  const [showModalCreateCategory, setShowModalCreateCateogry] =
    React.useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    image: File | null;
  }>({
    name: "",
    description: "",
    image: null,
  });

  const handleSubmitCreateCategoryProduct = async (event) => {
    event.preventDefault();
    console.log("Form Create Category Product");
    console.log("Form Data:", formData);

    if (!formData.name || !formData.description || !formData.image) {
      if (!formData.name) {
        toast.error("Please enter name of category");
      }
      if (!formData.description) {
        toast.error("Please enter description of category");
      }
      if (!formData.image) {
        toast.error("Please upload an image file");
      }
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        API_URL_CATEGORYPRODUCT_CREATE,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("Request successful: " + JSON.stringify(response.status));
      if (response.status === 200) {
        setFormData({
          name: "",
          description: "",
          image: null,
        });
        onClose();

        toast.success("Category created successfully", {
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Input file", file);
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  return {
    handleSubmitCreateCategoryProduct,
    handleInputChange,
    handleImageChange,
    formData,
    showModalCreateCategory,
    setShowModalCreateCateogry,
  };
}

export default CategoryProductViewModelCreate;
