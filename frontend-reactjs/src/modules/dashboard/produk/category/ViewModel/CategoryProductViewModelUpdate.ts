import { useState } from "react";
import { toast } from "react-toastify";
import {
  FormDataUpdateCategoryProductInterface,
  ShowModalCategoryProductDetailInterface,
} from "../Interface/InterfaceCategoryProduct";
import API_FRONTEND from "../../../../../api/api.ts";

function CategoryProductViewModelUpdate({ onClose }) {
  const { API_URL_CATEGORYPRODUCT } = API_FRONTEND();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryDetail, setCategoryDetail] =
    useState<ShowModalCategoryProductDetailInterface | null>(null);
  const [formDataUpdate, setFormDataUpdate] =
    useState<FormDataUpdateCategoryProductInterface>({
      name: "",
      description: "",
      image: null,
      originalImage: "",
    });

  const handleInputChangeUpdateCategory = (event) => {
    const { name, value } = event.target;
    setFormDataUpdate({
      ...formDataUpdate,
      [name]: value,
    });
  };

  const handleImageChangeUpdateCategoryProduct = (event) => {
    const file = event.target.files[0];
    setFormDataUpdate({
      ...formDataUpdate,
      image: file,
    });
  };

  const handleShowDetailCategory = async (categoryId: number) => {
    try {
      setCategoryId(categoryId);
      const response = await fetch(
        `${API_URL_CATEGORYPRODUCT}/get/${categoryId}`
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
      setFormDataUpdate({
        name: data.name,
        description: data.description,
        image: null,
        originalImage: data.image,
      });
    } catch (error) {
      console.error("Error fetching category detail:", error);
    }
  };

  const handleSubmitUpdateCategoryProduct = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formDataUpdate.name);
      formData.append("description", formDataUpdate.description);
      if (formDataUpdate.image instanceof File) {
        formData.append("image", formDataUpdate.image);
      }

      const response = await fetch(
        `${API_URL_CATEGORYPRODUCT}/update/${categoryId}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );
      if (response.ok) {
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
