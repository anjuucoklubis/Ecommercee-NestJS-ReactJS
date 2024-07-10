const API_FRONTEND = () => {
  const API_URL = "http://localhost:3000";

  // eslint-disable-next-line no-lone-blocks
  {
    /*MANAGEMENT PRODUCT API */
  }
  const API_URL_PRODUCT = "http://localhost:3000/product";
  const API_URL_CATEGORYPRODUCT = "http://localhost:3000/categoryproduct";
  const API_URL_DISCOUNTPRODUCT = "http://localhost:3000/discountproduct";
  const API_URL_GALERIESPRODUCT = "http://localhost:3000/galeriesproduct";
  const API_URL_IMAGESRC_PRODUCT = `${API_URL}/product`;
  const API_URL_IMAGESRC = `${API_URL}/category`;

  // eslint-disable-next-line no-lone-blocks
  {
    /*MANAGEMENT URL API AUTH */
  }
  const API_URL_AUTH_REGISTER = "http://localhost:3000/auth/signup";
  const API_URL_AUTH_LOGIN = "http://localhost:3000/auth/signin";

  return {
    API_URL,
    API_URL_CATEGORYPRODUCT,
    API_URL_DISCOUNTPRODUCT,
    API_URL_IMAGESRC,
    API_URL_PRODUCT,
    API_URL_IMAGESRC_PRODUCT,
    API_URL_GALERIESPRODUCT,
    API_URL_AUTH_REGISTER,
    API_URL_AUTH_LOGIN,
  };
};

export default API_FRONTEND;
