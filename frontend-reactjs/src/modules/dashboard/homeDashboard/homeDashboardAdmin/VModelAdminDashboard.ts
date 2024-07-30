import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../api/api.ts";

export default function VModelAdminDashboard() {
  const {
    API_URL_PRODUCT_GET,
    API_URL_USER_DATA_GET_ALL,
    API_URL_DISCOUNTPRODUCT_GET,
    API_URL_CATEGORYPRODUCT_GET,
  } = API_FRONTEND();

  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState(0);
  const [discounts, setDiscounts] = useState(0);
  const [categoryproducts, setCategoryproducts] = useState(0);

  const getAllProduct = async () => {
    try {
      const response = await axios.get(API_URL_PRODUCT_GET, {
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

  const getAllUsers = async () => {
    try {
      const response = await axios.get(API_URL_USER_DATA_GET_ALL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.status === 200) {
        setUsers(response.data.length);
      }
    } catch (error) {}
  };

  const getAllDiscounts = async () => {
    try {
      const response = await axios.get(API_URL_DISCOUNTPRODUCT_GET, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.status === 200) {
        setDiscounts(response.data.length);
      }
    } catch (error) {}
  };

  const getAllCategoryproducts = async () => {
    try {
      const response = await axios.get(API_URL_CATEGORYPRODUCT_GET, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.status === 200) {
        setCategoryproducts(response.data.length);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProduct();
    getAllUsers();
    getAllDiscounts();
    getAllCategoryproducts();
  }, []);

  return {
    products,
    users,
    discounts,
    categoryproducts,
  };
}
