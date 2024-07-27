import axios from "axios";
import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import {
  GetDiscountProductAllInterface,
  GetDiscountProductDetailInterface,
} from "../Interface/AssignProductDiscountInterface.ts";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function AssignProductDiscountDeleteViewModel({ onClose }) {
  const {
    API_URL_DISCOUNTPRODUCT_GET,
    API_URL_PRODUCT_REMOVE_PRODUCTDISCOUNT,
  } = API_FRONTEND();
  const [discount, setDiscount] = useState<GetDiscountProductAllInterface[]>(
    []
  );
  const [getdiscountDetail, setDiscountDetail] =
    useState<GetDiscountProductDetailInterface | null>(null);
  const [discountId, setDiscountId] = useState<string | null>(null);
  const [showModalViewDetailDiscount, setShowModalViewDetailDiscount] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_DISCOUNTPRODUCT_GET}`);
        const formattedData = response.data.map((item) => ({
          ...item,
          product_count: item.products.length,
          createdAt: new Date(item.createdAt).toISOString(),
          updatedAt: new Date(item.updatedAt).toISOString(),
        }));

        setDiscount(formattedData);
      } catch (error) {
        console.error("Error fetching discount:", error);
      }
    };

    fetchData();
  }, [API_URL_DISCOUNTPRODUCT_GET]);

  const getDiscountByID = async (discountId: string) => {
    try {
      setDiscountId(discountId);
      const response = await axios.get(
        `${API_URL_DISCOUNTPRODUCT_GET}/${discountId}`
      );
      console.log("data check", response.data);

      if (response.status === 200) {
        const data: GetDiscountProductDetailInterface = response.data;
        setDiscountDetail(data);
        setShowModalViewDetailDiscount(true);
      } else {
        throw new Error("Failed to fetch discount detail");
      }

    } catch (error) {
      console.error("Error fetching discount detail:", error);
    }
  };

  const removeProductDiscountIdFromProduct = async (productId: string) => {
    try {
      console.log("Updating product with ID:", productId);

      const response = await axios.delete(
        `${API_URL_PRODUCT_REMOVE_PRODUCTDISCOUNT}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.status === 200) {
        onClose();
        toast.success("productDiscountId berhasil diubah menjadi NULL", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        console.error(
          "Failed to delete productDiscountId:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating productDiscountId:", error);
    }
  };

  return {
    discount,
    setDiscount,
    getDiscountByID,
    showModalViewDetailDiscount,
    getdiscountDetail,
    setShowModalViewDetailDiscount,
    discountId,
    removeProductDiscountIdFromProduct,
  };
}

export default AssignProductDiscountDeleteViewModel;
