import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import {
  FormDataUpdateProductInterface,
  GetAllCategoryProductForCreateProductInterface,
  ShowModalProductDetailInterface,
} from "../Interface/InterfaceProduct.ts";
import axios from "axios";

function ProductViewModelUpdate({ onClose }) {
  const { API_URL_PRODUCT } = API_FRONTEND();
  const [productId, setProductId] = useState<number | null>(null);
  const [productDetail, setProductDetail] =
    useState<ShowModalProductDetailInterface | null>(null);
  const [formDataUpdate, setFormDataUpdate] =
    useState<FormDataUpdateProductInterface>({
      product_sku: "",
      product_name: "",
      product_description: "",
      product_short_description: "",
      product_price_original: "",
      product_price_discount: "0",
      product_quantity: "",
      product_weight: "",
      categoryProductId: 0,
    });

  const handleShowDetailProduct = async (productId) => {
    try {
      setProductId(productId);
      const response = await fetch(`${API_URL_PRODUCT}/get/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product detail");
      }
      const data = await response.json();

      setProductDetail(data);
      setFormDataUpdate({
        product_sku: data.product_sku,
        product_name: data.product_name,
        product_description: data.product_description,
        product_short_description: data.product_short_description,
        product_price_original: data.product_price_original,
        product_price_discount: data.product_price_discount,
        product_quantity: data.product_quantity,
        product_weight: data.product_weight,
        categoryProductId: data.CategoryProduct.id,
      });
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };

  const handleSubmitUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      // const parsedFormData = {
      //   ...formDataUpdate,
      //   CatagoryProductId: parseInt(formDataUpdate.CatagoryProductId),
      // };

      console.log("Form Data:", formDataUpdate);
      const response = await fetch(`${API_URL_PRODUCT}/update/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formDataUpdate),
        credentials: "include",
      });
      if (response.ok) {
        onClose();
        toast.success("product berhasil diubah", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to update product new:", errorData);
        console.error("Failed to update product new:", errorData);

        console.error("Failed to update product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input Changed:", name, value);
    setFormDataUpdate({
      ...formDataUpdate,
      [name]: value,
    });
  };
  // Find Category All
  const [getAllCategoryforCreateProduct, setGetAllCategoryforCreateProduct] =
    useState<GetAllCategoryProductForCreateProductInterface[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  useEffect(() => {
    const fetchDataCategoryForCreateProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/categoryproduct/get"
        );

        const formattedData = response.data.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt).toISOString(),
          updatedAt: new Date(item.updatedAt).toISOString(),
        }));

        setGetAllCategoryforCreateProduct(formattedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchDataCategoryForCreateProduct();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryProductId = parseInt(event.target.value, 10);
    setSelectedCategory(categoryProductId);
    console.log(categoryProductId);
    setFormDataUpdate({
      ...formDataUpdate,
      categoryProductId,
    });
  };

  return {
    handleShowDetailProduct,
    productDetail,
    setProductDetail,
    handleSubmitUpdateProduct,
    formDataUpdate,
    setFormDataUpdate,
    handleInputChange,
    handleCategoryChange,
    getAllCategoryforCreateProduct,
    selectedCategory,
  };
}

export default ProductViewModelUpdate;
