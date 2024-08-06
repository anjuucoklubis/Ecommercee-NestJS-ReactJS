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
    image: string;
  }>({
    name: "",
    description: "",
    image: "",
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
      const response = await axios.post(
        API_URL_CATEGORYPRODUCT_CREATE,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Request successful: " + JSON.stringify(response.status));
      if (response.status === 200) {
        setFormData({
          name: "",
          description: "",
          image: "",
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

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, image: base64 });
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.result) {
          const base64String = fileReader.result as string;
          const base64Data = base64String.split(",")[1];
          resolve(base64Data);
        } else {
          reject(new Error("FileReader result is null"));
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return {
    handleSubmitCreateCategoryProduct,
    handleInputChange,
    handleImageFileChange,
    formData,
    showModalCreateCategory,
    setShowModalCreateCateogry,
  };
}

export default CategoryProductViewModelCreate;
