import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
import Cookies from "js-cookie";
export interface CategoriesModel {
  id: number;
  name: string;
  image: string;
}
function CardCategoryViewModel() {
  const {
    API_URL_CATEGORYPRODUCT_GET_ALL_HOME,
    API_URL_CATEGORYPRODUCT_IMAGE_HOME,
  } = API_FRONTEND();

  const [categories, setCategories] = useState<CategoriesModel[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(API_URL_CATEGORYPRODUCT_GET_ALL_HOME, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.status === 200) {
        setCategories(response.data);
      } else {
        console.log("Error fetching categories");
      }
    };
    getCategories();
  }, [API_URL_CATEGORYPRODUCT_GET_ALL_HOME]);
  return {
    categories,
    API_URL_CATEGORYPRODUCT_IMAGE_HOME,
  };
}

export default CardCategoryViewModel;
