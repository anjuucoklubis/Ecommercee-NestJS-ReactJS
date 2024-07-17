import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export interface GetAllDiscountProductForAssignToProductInterface {
  id: number;
  product_discount_name: string;
}

export interface GetProductAllInterface {
  id: number;
  product_sku: string;
  product_name: string;
  product_description: string;
  product_short_description: string;
  product_price_original: string;
  product_price_discount: string;
  product_quantity: string;
  product_weight: string;
  createdAt: string;
  updatedAt: string;
}

function AssignProductDiscountCreateViewModel({ onClose }) {
  const [formData, setFormData] = useState<{
    discountId: number;
    productIds: number[];
  }>({
    discountId: 1,
    productIds: [],
  });

  const [getAllDiscountforAssignProduct, setGetAllDiscountforAssignProduct] = useState<GetAllDiscountProductForAssignToProductInterface[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<number | string>("");

  useEffect(() => {
    const fetchDataCategoryForCreateProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3000/discountproduct/get');
        console.log("Fetched products:", response.data); // Tambahkan ini
        const formattedData = response.data.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt).toISOString(),
          updatedAt: new Date(item.updatedAt).toISOString(),
        }));

        setGetAllDiscountforAssignProduct(formattedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchDataCategoryForCreateProduct();
  }, []);

  const handleDiscountChange = (event) => {
    const discountId = Number(event.target.value);
    setSelectedDiscount(discountId);
    setFormData((prev) => ({ ...prev, discountId }));
  };

  const [getAllProductforAssignProduct, setGetAllProductforAssignProduct] = useState<GetProductAllInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product/get');
        const formattedData = response.data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt).toISOString(),
          updatedAt: new Date(item.updatedAt).toISOString(),
        }));
        setGetAllProductforAssignProduct(formattedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/product/assign-to-discount',
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      toast.success("Products assigned to discount successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to assign products to discount.");
    }
  };

  const handleProductSelection = (productId) => {
    console.log("Selected product ID:", productId); // Tambahkan ini
    setFormData((prev) => {
      const productIds = prev.productIds.includes(productId)
        ? prev.productIds.filter((id) => id !== productId)
        : [...prev.productIds, productId];
      return { ...prev, productIds };
    });
  };
  
  
  
  return {
    getAllDiscountforAssignProduct,
    selectedDiscount,
    handleDiscountChange,
    getAllProductforAssignProduct,
    handleSubmit,
    formData,
    handleProductSelection,
  };
}

export default AssignProductDiscountCreateViewModel;
