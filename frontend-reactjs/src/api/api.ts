const API_FRONTEND = () => {
  /*BASE API*/
  const API_URL = "http://localhost:3000";

  /*MANAGEMENT URL API AUTH */
  const API_URL_AUTH_REGISTER = "http://localhost:3000/auth/signup";
  const API_URL_AUTH_LOGIN = "http://localhost:3000/auth/signin";
  const API_URL_AUTH_CHANGEPASSWORD = "http://localhost:3000/auth/change-password";

  /*MANAGEMENT PRODUCT API */
  const API_URL_PRODUCT_GET = "http://localhost:3000/product/get";
  const API_URL_PRODUCT_CREATE = "http://localhost:3000/product/create";
  const API_URL_PRODUCT_DELETE = "http://localhost:3000/product/delete";
  const API_URL_PRODUCT_UPDATE = "http://localhost:3000/product/update";
  const API_URL_PRODUCT_IMAGE = "http://localhost:3000/product/product-image";
  const API_URL_PRODUCT_ASSIGN_PRODUCTDISCOUNT = "http://localhost:3000/product/assign-to-discount";
  const API_URL_PRODUCT_REMOVE_PRODUCTDISCOUNT = "http://localhost:3000/product/remove-discount";



  /*MANAGEMENT CATEGORY PRODUCT API */
  const API_URL_CATEGORYPRODUCT_CREATE = "http://localhost:3000/categoryproduct/create";
  const API_URL_CATEGORYPRODUCT_GET = "http://localhost:3000/categoryproduct/get";
  const API_URL_CATEGORYPRODUCT_DELETE = "http://localhost:3000/categoryproduct/delete";
  const API_URL_CATEGORYPRODUCT_UPDATE = "http://localhost:3000/categoryproduct/update";
  const API_URL_CATEGORYPRODUCT_IMAGE = "http://localhost:3000/categoryproduct/categoryproduct-image";

  /*MANAGEMENT DISCOUNT PRODUCT API */
  const API_URL_DISCOUNTPRODUCT_GET = "http://localhost:3000/discountproduct/get";
  const API_URL_DISCOUNTPRODUCT_CREATE= "http://localhost:3000/discountproduct/create";
  const API_URL_DISCOUNTPRODUCT_UPDATE = "http://localhost:3000/discountproduct/update";
  const API_URL_DISCOUNTPRODUCT_DELETE = "http://localhost:3000/discountproduct/delete";

  /*MANAGEMENT GALERI PRODUCT API */
  const API_URL_GALERIESPRODUCT_CREATE = "http://localhost:3000/galeriesproduct/create";
  const API_URL_GALERIESPRODUCT_DELETE = "http://localhost:3000/galeriesproduct/delete";


  const API_URL_IMAGESRC = `${API_URL}/category`;

  /*MANAGEMENT URL USER PROFILE */
  const API_URL_USER_PROFILE_CREATE = "http://localhost:3000/userprofile/profile-create";
  const API_URL_USER_PROFILE_UPDATE = "http://localhost:3000/userprofile/profile=update";
  const API_URL_USER_PROFILE_IMAGE = "http://localhost:3000/userprofile/profile-image";

  /*MANAGEMENT URL USER ADDRESS */
  const API_URL_USER_ADDRESS_CREATE = "http://localhost:3000/useraddress/address-create";
  const API_URL_USER_ADDRESS_UPDATE = "http://localhost:3000/useraddress/address-update";
  const API_URL_USER_ADDRESS_DELETE = "http://localhost:3000/useraddress/address-delete";

  /*MANAGEMENT LOCATION */
  const API_URL_LOC_CITY = "http://localhost:3000/masterlocation/city";
  const API_URL_LOC_PROVINCE = "http://localhost:3000/masterlocation/province";

  /* MANAGEMENT  USER ROLE */
  const API_URL_USEROLE_GET = "http://localhost:3000/role/get";
  const API_URL_USEROLE_CREATE = "http://localhost:3000/role/create";
  const API_URL_USEROLE_UPDATE = "http://localhost:3000/role/update";
  const API_URL_USEROLE_DELETE = "http://localhost:3000/role/delete";

  return {
    API_URL,
    API_URL_DISCOUNTPRODUCT_GET,
    API_URL_DISCOUNTPRODUCT_CREATE,
    API_URL_DISCOUNTPRODUCT_UPDATE,
    API_URL_DISCOUNTPRODUCT_DELETE,
    API_URL_IMAGESRC,
    API_URL_GALERIESPRODUCT_CREATE,
    API_URL_GALERIESPRODUCT_DELETE,
    API_URL_AUTH_REGISTER,
    API_URL_AUTH_LOGIN,
    API_URL_USER_PROFILE_CREATE,
    API_URL_USER_PROFILE_UPDATE,
    API_URL_USER_ADDRESS_CREATE,
    API_URL_USER_ADDRESS_UPDATE,
    API_URL_USER_ADDRESS_DELETE,
    API_URL_LOC_CITY,
    API_URL_LOC_PROVINCE,
    API_URL_USER_PROFILE_IMAGE,
    API_URL_AUTH_CHANGEPASSWORD,
    API_URL_PRODUCT_GET,
    API_URL_PRODUCT_CREATE,
    API_URL_CATEGORYPRODUCT_GET,
    API_URL_PRODUCT_DELETE,
    API_URL_PRODUCT_UPDATE,
    API_URL_CATEGORYPRODUCT_CREATE,
    API_URL_CATEGORYPRODUCT_DELETE,
    API_URL_CATEGORYPRODUCT_UPDATE,
    API_URL_CATEGORYPRODUCT_IMAGE,
    API_URL_PRODUCT_IMAGE,
    API_URL_PRODUCT_ASSIGN_PRODUCTDISCOUNT,
    API_URL_USEROLE_GET,
    API_URL_USEROLE_CREATE,
    API_URL_USEROLE_UPDATE,
    API_URL_USEROLE_DELETE,
    API_URL_PRODUCT_REMOVE_PRODUCTDISCOUNT
    
  };
};

export default API_FRONTEND;
