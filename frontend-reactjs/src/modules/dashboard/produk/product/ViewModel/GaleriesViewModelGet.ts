import { useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import { GetProductDetailInterfaceForGaleries } from "../Interface/InterfaceGaleries.ts";
import axios from "axios";
import Cookies from "js-cookie";

function GaleriesViewModelGet() {
  const { API_URL_PRODUCT_GET } = API_FRONTEND();
  const [productDetailForGaleries, setProductDetailForGaleries] =
    useState<GetProductDetailInterfaceForGaleries | null>(null);
  const [showModalViewDetailProduct, setShowModalViewDetailProduct] =
    useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  const getProductByIDForGaleries = async (productId: string) => {
    try {
      setProductId(productId);
      const response = await axios.get(`${API_URL_PRODUCT_GET}/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      
      if (response.status === 200) {
        const data: GetProductDetailInterfaceForGaleries = response.data;
        setProductDetailForGaleries(data);
        setShowModalViewDetailProduct(true);
      } else {
        throw new Error("Failed to fetch galeries product");
      }
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };

  return {
    productId,
    getProductByIDForGaleries,
    showModalViewDetailProduct,
    productDetailForGaleries,
  };
}

export default GaleriesViewModelGet;
