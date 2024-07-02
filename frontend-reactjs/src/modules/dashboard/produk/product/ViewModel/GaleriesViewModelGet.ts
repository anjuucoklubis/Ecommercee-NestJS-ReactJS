import { useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import { GetProductDetailInterfaceForGaleries } from "../Interface/InterfaceGaleries.ts";

function GaleriesViewModelGet() {
  const { API_URL_PRODUCT } = API_FRONTEND();
  const [productDetailForGaleries, setProductDetailForGaleries] =
    useState<GetProductDetailInterfaceForGaleries | null>(null);
  const [showModalViewDetailProduct, setShowModalViewDetailProduct] =
    useState(false);

  const getProductByIDForGaleries = async (productId: number) => {
    try {
      const response = await fetch(`${API_URL_PRODUCT}/get/${productId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch galeries product");
      }

      const data: GetProductDetailInterfaceForGaleries = await response.json();
      setProductDetailForGaleries(data);
      setShowModalViewDetailProduct(true);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };

  return {
    getProductByIDForGaleries,
    showModalViewDetailProduct,
    productDetailForGaleries,
  };
}

export default GaleriesViewModelGet;
