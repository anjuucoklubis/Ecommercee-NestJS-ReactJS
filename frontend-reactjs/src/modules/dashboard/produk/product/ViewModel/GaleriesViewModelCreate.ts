import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../api/api.ts";

function GaleriesViewModelCreate({ onClose }) {
  const { API_URL_GALERIESPRODUCT_CREATE } = API_FRONTEND();
  const [formData, setFormData] = useState<{
    id: number;
    product_galeries_image: File | null;
    productId: string;
  }>({
    id: 1,
    product_galeries_image: null,
    productId: "",
  });

  const handleSubmitCreateGaleriesProduct = async (event) => {
    event.preventDefault();

    if (!formData.product_galeries_image) {
      toast.error("Please select a product_galeries_image.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append(
      "product_galeries_image",
      formData.product_galeries_image
    );
    formDataToSend.append("productId", formData.productId);

    try {
      const response = await fetch(
        `${API_URL_GALERIESPRODUCT_CREATE}/${formData.productId}`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      console.log("Response received");
      if (response.ok) {
        setFormData({
          id: 1,
          product_galeries_image: null,
          productId: "",
        });
        onClose();

        toast.success("Gallery created successfully", {
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
          console.error("Failed to create gallery:", response.statusText);
          toast.error("Failed to create gallery");
        }
      }
    } catch (error) {
      console.error("Error creating gallery:", error);
      toast.error("Error creating gallery");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        product_galeries_image: file,
      }));
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
