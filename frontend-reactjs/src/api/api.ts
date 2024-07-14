const API_FRONTEND = () => {
  /*BASE API*/
  const API_URL = "http://localhost:3000";

  /*MANAGEMENT URL API AUTH */
  const API_URL_AUTH_REGISTER = "http://localhost:3000/auth/signup";
  const API_URL_AUTH_LOGIN = "http://localhost:3000/auth/signin";

  /*MANAGEMENT PRODUCT API */
  const API_URL_PRODUCT = "http://localhost:3000/product";
  const API_URL_CATEGORYPRODUCT = "http://localhost:3000/categoryproduct";
  const API_URL_DISCOUNTPRODUCT = "http://localhost:3000/discountproduct";
  const API_URL_GALERIESPRODUCT = "http://localhost:3000/galeriesproduct";
  const API_URL_IMAGESRC_PRODUCT = `${API_URL}/product`;
  const API_URL_IMAGESRC = `${API_URL}/category`;

  /*MANAGEMENT URL USER PROFILE */
  const API_URL_USER_PROFILE_CREATE = "http://localhost:3000/userprofile/profile";
  const API_URL_USER_PROFILE_UPDATE = "http://localhost:3000/userprofile/profile";
  const API_URL_USER_PROFILE_IMAGE = "http://localhost:3000/userprofile/userprofile-image";

/*MANAGEMENT URL USER ADDRESS */
  const API_URL_USER_ADDRESS_CREATE = "http://localhost:3000/useraddress/address";
  const API_URL_USER_ADDRESS_UPDATE = "http://localhost:3000/useraddress/address";
 

  /*MANAGEMENT LOCATION */
  const API_URL_LOC_CITY = "http://localhost:3000/masterlocation/city";
  const API_URL_LOC_PROVINCE = "http://localhost:3000/masterlocation/province";

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
    API_URL_USER_PROFILE_CREATE,
    API_URL_USER_PROFILE_UPDATE,
    API_URL_USER_ADDRESS_CREATE,
    API_URL_USER_ADDRESS_UPDATE,
    API_URL_LOC_CITY,
    API_URL_LOC_PROVINCE,
    API_URL_USER_PROFILE_IMAGE
  };
};

export default API_FRONTEND;
