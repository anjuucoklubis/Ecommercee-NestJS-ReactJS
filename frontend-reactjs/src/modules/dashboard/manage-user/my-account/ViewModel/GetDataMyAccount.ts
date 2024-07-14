import axios from "axios";
import Cookies from "js-cookie";
import API_FRONTEND from "../../../../../api/api.ts";

export const GetDataMyAccount = () => {
  const fetchUserProfile = async () => {
    const response = await axios.get("http://localhost:3000/users/profile", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data.user;
  };

  const {API_URL_USER_PROFILE_IMAGE} = API_FRONTEND();

  return {
    fetchUserProfile,
    API_URL_USER_PROFILE_IMAGE
  };
};
