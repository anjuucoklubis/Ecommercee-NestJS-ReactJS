import axios from "axios";
import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import {
  GetProductAllInterface,
  GetProductDetailInterface,
} from "../Interface/InterfaceProduct.ts";

function ProductViewModelGet() {
  const { API_URL_PRODUCT, API_URL } = API_FRONTEND();
  const [products, setProducts] = useState<GetProductAllInterface[]>([]);
  const [getproductDetail, setProductDetail] =
    useState<GetProductDetailInterface | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [showModalViewDetailProduct, setShowModalViewDetailProduct] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_PRODUCT}/get`);
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
  }, [API_URL_PRODUCT]);

  const getProductByID = async (productId: number) => {
    try {
      setProductId(productId);
      const response = await fetch(`${API_URL_PRODUCT}/get/${productId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product detail");
      }
      const data: GetProductDetailInterface = await response.json();
      setProductDetail(data);
      setShowModalViewDetailProduct(true);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "product_sku", uid: "product_sku", sortable: true },
    { name: "product_name", uid: "product_name", sortable: true },
    { name: "product_description", uid: "product_description", sortable: true },
    { name: "product_short_description", uid: "product_short_description", sortable: true },
    { name: "product_price_original", uid: "product_price_original", sortable: true },
    { name: "product_price_discount", uid: "product_price_discount", sortable: true },
    { name: "product_quantity", uid: "product_quantity", sortable: true },
    { name: "product_weight", uid: "product_weight", sortable: true },
    { name: "CREATED_AT", uid: "createdAt", sortable: true },
    { name: "UPDATED_AT", uid: "updatedAt", sortable: true },
    { name: "ACTIONS", uid: "actions" },
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

export default ProductViewModelGet;
