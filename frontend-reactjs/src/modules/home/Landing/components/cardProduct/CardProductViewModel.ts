import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api";
import axios from "axios";
export interface CategoriesModel {
  id: number;
  name: string;
  description: string;
  image: string;
}
function CardProductViewModel() {
  const { API_URL_CATEGORYPRODUCT_GET_ALL_HOME } = API_FRONTEND();

  const [categories, setCategories] = useState<CategoriesModel[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(API_URL_CATEGORYPRODUCT_GET_ALL_HOME, {
        headers: {
          "Content-Type": "application/json",
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

  console.log("categories all home", categories);
  return {
    categories,
  };
}

export default CardProductViewModel;
