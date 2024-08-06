import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
import Cookies from "js-cookie";
import ImageBase64 from "../../../../../utils/imageBase64.ts";
function GaleriesViewModelCreate({ onClose }) {
  const { convertToBase64 } = ImageBase64();
  const { API_URL_GALERIESPRODUCT_CREATE } = API_FRONTEND();
  const [formData, setFormData] = useState<{
    id: number;
    product_galeries_image: string;
    productId: string;
  }>({
    id: 1,
    product_galeries_image: "",
    productId: "",
  });

  const handleSubmitCreateGaleriesProduct = async (event) => {
    event.preventDefault();

    if (!formData.product_galeries_image) {
      toast.error("Please select a product_galeries_image.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL_GALERIESPRODUCT_CREATE}/${formData.productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received");
      if (response.status === 201) {
        setFormData({
          id: 1,
          product_galeries_image: "",
          productId: "",
        });
        onClose();

        toast.success("Gallery created successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3200);
      } else {
        const responseData = response.data;
        if (responseData && responseData.message) {
          toast.error(responseData.message);
        } else {
          console.error("Failed to create gallery:", response.statusText);
          toast.error("Failed to create gallery");
        }
      }
    } catch (error) {
      console.error("Error creating gallery:", error);
      toast.error("Error creating gallery");
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, product_galeries_image: base64 });
    }
  };

  return {
    handleSubmitCreateGaleriesProduct,
    handleImageChange,
    formData,
    setFormData,
  };
}

export default GaleriesViewModelCreate;
