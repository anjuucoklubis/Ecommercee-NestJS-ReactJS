import axios from "axios";
import { useEffect, useState } from "react";
import {
  GetDiscountProductAllInterface,
  GetDiscountProductDetailInterface,
} from "../Interface/InterfaceDiscountProduct.ts";
import API_FRONTEND from "../../../../../api/api.ts";
import Cookies from "js-cookie";

function DiscountProductViewModelGet() {
  const { API_URL_DISCOUNTPRODUCT_GET } = API_FRONTEND();
  const [discount, setDiscount] = useState<GetDiscountProductAllInterface[]>(
    []
  );
  const [getdiscountDetail, setDiscountDetail] =
    useState<GetDiscountProductDetailInterface | null>(null);
  const [discountId, setDiscountId] = useState<number | null>(null);
  const [showModalViewDetailDiscount, setShowModalViewDetailDiscount] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_DISCOUNTPRODUCT_GET}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        const formattedData = response.data.map((item) => ({
          ...item,
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

  const getDiscountByID = async (discountId: number) => {
    try {
      setDiscountId(discountId);
      const response = await axios.get(
        `${API_URL_DISCOUNTPRODUCT_GET}/${discountId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const data: {
          product_discount_name: string;
          product_discount_description: string;
          product_discount_percent: number;
          product_discount_active: boolean;
          createdAt: string;
          updatedAt: string;
        } = response.data;
        setDiscountDetail(data);
        setShowModalViewDetailDiscount(true);
      }
      throw new Error("Failed to fetch discount detail");
    } catch (error) {
      console.error("Error fetching discount detail:", error);
    }
  };

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Name", uid: "product_discount_name", sortable: true },
    {
      name: "Description",
      uid: "product_discount_description",
      sortable: true,
    },
    { name: "Percent", uid: "product_discount_percent", sortable: true },
    { name: "Active", uid: "product_discount_active", sortable: true },
    { name: "Created", uid: "createdAt", sortable: true },
    { name: "Updated", uid: "updatedAt", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  return {
    discount,
    setDiscount,
    getDiscountByID,
    showModalViewDetailDiscount,
    getdiscountDetail,
    setShowModalViewDetailDiscount,
    discountId,
    columns,
  };
}

export default DiscountProductViewModelGet;
