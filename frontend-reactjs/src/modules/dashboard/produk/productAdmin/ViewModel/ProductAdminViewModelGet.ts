import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import {
  GetProductAllInterface,
  GetProductDetailInterface,
} from "../Interface/InterfaceProduct.ts";

function ProductAdminViewModelGet() {
  const { API_URL, API_URL_PRODUCT_GET } = API_FRONTEND();
  const [products, setProducts] = useState<GetProductAllInterface[]>([]);
  const [getproductDetail, setProductDetail] =
    useState<GetProductDetailInterface | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [showModalViewDetailProduct, setShowModalViewDetailProduct] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_PRODUCT_GET, {
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

        setProducts(formattedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [API_URL_PRODUCT_GET]);

  const getProductByID = async (productId: string) => {
    try {
      setProductId(productId);
      const response = await axios.get(`${API_URL_PRODUCT_GET}/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.status === 200) {
        const data: GetProductDetailInterface = response.data;
        setProductDetail(data);
        setShowModalViewDetailProduct(true);
      } else {
        throw new Error("Failed to fetch product detail");
      }
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Product SKU", uid: "product_sku", sortable: true },
    { name: "Product Name", uid: "product_name", sortable: true },
    { name: "Product Description", uid: "product_description", sortable: true },
    {
      name: "Product Short Description",
      uid: "product_short_description",
      sortable: true,
    },
    {
      name: "Product Price Original",
      uid: "product_price_original",
      sortable: true,
    },
    {
      name: "Product Price Discount",
      uid: "product_price_discount",
      sortable: true,
    },
    { name: "Product Quantity", uid: "product_quantity", sortable: true },
    { name: "Product Weight", uid: "product_weight", sortable: true },
    { name: "Created", uid: "createdAt", sortable: true },
    { name: "Updated", uid: "updatedAt", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  const imageSrc = `${API_URL}/product`;
  return {
    products,
    setProducts,
    getProductByID,
    showModalViewDetailProduct,
    setProductDetail,
    imageSrc,
    setShowModalViewDetailProduct,
    productId,
    columns,
    getproductDetail,
  };
}

export default ProductAdminViewModelGet;
