import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../api/api.ts";

export default function VModelPenjualDashboard() {
  const {
    API_URL_PRODUCT_GET_ALL_BY_USERAUTH,
    API_URL_DISCOUNTPRODUCT_GET_ALL_BY_USERAUTH,
  } = API_FRONTEND();

  const [products, setProducts] = useState(0);

  const [discounts, setDiscounts] = useState(0);

  const getAllProduct = async () => {
    try {
      const response = await axios.get(API_URL_PRODUCT_GET_ALL_BY_USERAUTH, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.status === 200) {
        setProducts(response.data.length);
      }
    } catch (error) {}
  };

  const getAllDiscounts = async () => {
    try {
      const response = await axios.get(
        API_URL_DISCOUNTPRODUCT_GET_ALL_BY_USERAUTH,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setDiscounts(response.data.length);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProduct();
    getAllDiscounts();
  }, []);

  return {
    products,
    discounts,
  };
}
