import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  FormDataUpdateCategoryProductInterface,
  ShowModalCategoryProductDetailInterface,
} from "../Interface/InterfaceCategoryProduct";
import API_FRONTEND from "../../../../../api/api.ts";
import ImageBase64 from "../../../../../utils/imageBase64.ts";

function CategoryProductViewModelUpdate({ onClose }) {
  const { convertToBase64 } = ImageBase64();
  const { API_URL_CATEGORYPRODUCT_GET, API_URL_CATEGORYPRODUCT_UPDATE } =
    API_FRONTEND();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryDetail, setCategoryDetail] =
    useState<ShowModalCategoryProductDetailInterface | null>(null);
  const [formDataUpdate, setFormDataUpdate] =
    useState<FormDataUpdateCategoryProductInterface>({
      name: "",
      description: "",
      image: "",
      originalImage: "",
    });

  const handleInputChangeUpdateCategory = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormDataUpdate({
      ...formDataUpdate,
      [name]: value,
    });
  };

  const handleImageChangeUpdateCategoryProduct = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const base64 = await convertToBase64(file);
      setFormDataUpdate({ ...formDataUpdate, image: base64 });
    }
  };

  const handleShowDetailCategory = async (categoryId: number) => {
    try {
      setCategoryId(categoryId);
      const response = await axios.get(
        `${API_URL_CATEGORYPRODUCT_GET}/${categoryId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data: {
          name: string;
          description: string;
          image: string;
          createdAt: string;
          updatedAt: string;
        } = response.data;

        setCategoryDetail(data);
        setFormDataUpdate({
          name: data.name,
          description: data.description,
          image: data.image,
          originalImage: data.image,
        });
      } else {
        throw new Error("Failed to fetch category detail");
      }
    } catch (error) {
      console.error("Error fetching category detail:", error);
    }
  };

  const handleSubmitUpdateCategoryProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${API_URL_CATEGORYPRODUCT_UPDATE}/${categoryId}`,
        formDataUpdate,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        onClose();
        toast.success("Kategori berhasil diubah", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        console.error("Failed to update category:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return {
    handleShowDetailCategory,
    categoryDetail,
    setCategoryDetail,
    handleSubmitUpdateCategoryProduct,
    formDataUpdate,
    setFormDataUpdate,
    handleInputChangeUpdateCategory,
    handleImageChangeUpdateCategoryProduct,
  };
}

export default CategoryProductViewModelUpdate;
