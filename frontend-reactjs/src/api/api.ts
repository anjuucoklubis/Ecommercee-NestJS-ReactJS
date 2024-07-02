const API_FRONTEND = () => {
  const API_URL = "http://localhost:3000";
  const API_URL_CATEGORYPRODUCT = "http://localhost:3000/categoryproduct";
  const API_URL_DISCOUNTPRODUCT = "http://localhost:3000/discountproduct";
  const API_URL_PRODUCT = "http://localhost:3000/product";

  const API_URL_IMAGESRC = `${API_URL}/category`;
  const API_URL_IMAGESRC_PRODUCT = `${API_URL}/product`;


  const API_URL_GALERIESPRODUCT = "http://localhost:3000/galeriesproduct";
  return {
    API_URL,
    API_URL_CATEGORYPRODUCT,
    API_URL_DISCOUNTPRODUCT,
    API_URL_IMAGESRC,
    API_URL_PRODUCT,
    API_URL_IMAGESRC_PRODUCT,
    API_URL_GALERIESPRODUCT
  };
};

export default API_FRONTEND;
