import { useState } from "react";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../api/api.ts";
import {
  FormDataUpdateDiscountProductInterface,
  ShowModalDiscountProductDetailInterface,
} from "../Interface/InterfaceDiscountProduct.ts";

function DiscountProductViewModelUpdate({ onClose }) {
  const { API_URL_DISCOUNTPRODUCT_UPDATE, API_URL_DISCOUNTPRODUCT_GET } =
    API_FRONTEND();
  const [discountId, setDiscountId] = useState<number | null>(null);
  const [discountDetail, setDiscountDetail] =
    useState<ShowModalDiscountProductDetailInterface | null>(null);
  const [formDataUpdate, setFormDataUpdate] =
    useState<FormDataUpdateDiscountProductInterface>({
      product_discount_name: "",
      product_discount_description: "",
      product_discount_percent: "",
      product_discount_active: "0",
    });

  const handleShowDetailDiscount = async (discountId) => {
    try {
      setDiscountId(discountId);
      const response = await fetch(
        `${API_URL_DISCOUNTPRODUCT_GET}/${discountId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch discount detail");
      }
      const data = await response.json();

      setDiscountDetail(data);
      setFormDataUpdate({
        product_discount_name: data.product_discount_name,
        product_discount_description: data.product_discount_description,
        product_discount_percent: data.product_discount_percent,
        product_discount_active: data.product_discount_active ? "1" : "0",
      });
    } catch (error) {
      console.error("Error fetching discount detail:", error);
    }
  };

  const handleSubmitUpdateDiscountProduct = async (event) => {
    event.preventDefault();
    try {
      const parsedFormData = {
        ...formDataUpdate,
        product_discount_percent: parseInt(
          formDataUpdate.product_discount_percent
        ),
        product_discount_active: formDataUpdate.product_discount_active === "1",
      };

      console.log("Form Data:", formDataUpdate);
      const response = await fetch(
        `${API_URL_DISCOUNTPRODUCT_UPDATE}/${discountId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(parsedFormData),
          credentials: "include",
        }
      );
      if (response.ok) {
        onClose();
        toast.success("Discount berhasil diubah", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        console.error("Failed to update discount:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating discount:", error);
    }
  };

  const handleInputChangeUpdateDiscount = (event) => {
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

    setFormDataUpdate((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  return {
    handleShowDetailDiscount,
    discountDetail,
    setDiscountDetail,
    handleSubmitUpdateDiscountProduct,
    formDataUpdate,
    setFormDataUpdate,
    handleInputChangeUpdateDiscount,
  };
}

export default DiscountProductViewModelUpdate;
