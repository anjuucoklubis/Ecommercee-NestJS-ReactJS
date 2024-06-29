import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../api/api.ts";
function DiscountProductViewModelCreate({ onClose }) {
  const { API_URL_DISCOUNTPRODUCT } = API_FRONTEND();
  const [showModalCreateDiscount, setShowModalCreateDiscount] =
    React.useState(false);
  const [formData, setFormData] = useState<{
    product_discount_name: string;
    product_discount_description: string;
    product_discount_percent: string;
    product_discount_active: string;
  }>({
    product_discount_name: "",
    product_discount_description: "",
    product_discount_percent: "",
    product_discount_active: "0",
  });

  const handleSubmitCreateDiscountProduct = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    if (
      !formData.product_discount_name ||
      !formData.product_discount_description ||
      !formData.product_discount_percent ||
      !formData.product_discount_active
    ) {
      if (!formData.product_discount_name) {
        toast.error("Please enter name of Discount");
      }
      if (!formData.product_discount_description) {
        toast.error("Please enter description of Discount");
      }
      if (!formData.product_discount_percent) {
        toast.error("Please enter percent of Discount");
      }
      if (!formData.product_discount_active) {
        toast.error("Please enter active of Discount");
      }
      return;
    }

    try {
      const parsedFormData = {
        ...formData,
        product_discount_percent: parseInt(formData.product_discount_percent),
        product_discount_active: formData.product_discount_active === "1",
      };

      const response = await fetch(`${API_URL_DISCOUNTPRODUCT}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedFormData),
      });

      console.log("Response received");
      if (response.ok) {
        setFormData({
          product_discount_name: "",
          product_discount_description: "",
          product_discount_percent: "",
          product_discount_active: "0",
        });
        onClose();

        toast.success("Discount created successfully", {
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
    let parsedValue = value;
    if (name === "product_discount_percent") {
      parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        parsedValue = "";
      } else {
        if (parsedValue < 1) {
          parsedValue = 1;
        } else if (parsedValue > 100) {
          parsedValue = 100;
        }
      }
    }

    if (name === "product_discount_active") {
      parsedValue = value;
    }

    console.log(`Updating ${name} to`, parsedValue);

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  return {
    handleSubmitCreateDiscountProduct,
    handleInputChange,
    formData,
    showModalCreateDiscount,
    setShowModalCreateDiscount,
  };
}

export default DiscountProductViewModelCreate;
