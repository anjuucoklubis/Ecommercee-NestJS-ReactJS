import axios from "axios";
import { useEffect, useState } from "react";

import {
  GetCategoryProductAllInterface,
  GetCategoryProductDetailInterface,
} from "../Interface/InterfaceCategoryProduct.js";
import API_FRONTEND from "../../../../../api/api.ts";

function CategoryProductViewModelGet() {
  const { API_URL_CATEGORYPRODUCT_GET, API_URL} = API_FRONTEND();
  const [categories, setCategories] = useState<
    GetCategoryProductAllInterface[]
  >([]);
  const [getcategoryDetail, setCategoryDetail] =
    useState<GetCategoryProductDetailInterface | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [showModalViewDetailCategory, setShowModalViewDetailCategory] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_CATEGORYPRODUCT_GET}`);
        const formattedData = response.data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt).toISOString(),
          updatedAt: new Date(item.updatedAt).toISOString(),
        }));

        setCategories(formattedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [API_URL_CATEGORYPRODUCT_GET]);

  const getCategoryByID = async (categoryId: number) => {
    try {
      setCategoryId(categoryId);
      const response = await fetch(
        `${API_URL_CATEGORYPRODUCT_GET}/${categoryId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch category detail");
      }
      const data: {
        name: string;
        description: string;
        image: string;
        createdAt: string;
        updatedAt: string;
      } = await response.json();
      setCategoryDetail(data);
      setShowModalViewDetailCategory(true);
    } catch (error) {
      console.error("Error fetching category detail:", error);
    }
  };

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Name", uid: "name", sortable: true },
    { name: "Description", uid: "description", sortable: true },
    { name: "Image", uid: "image", sortable: true },
    { name: "Created", uid: "createdAt", sortable: true },
    { name: "Updated", uid: "updatedAt", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  const imageSrc = `${API_URL}/category`;
  return {
    categories,
    setCategories,
    getCategoryByID,
    showModalViewDetailCategory,
    getcategoryDetail,
    imageSrc,
    setShowModalViewDetailCategory,
    categoryId,
    columns,
  };
}

export default CategoryProductViewModelGet;
