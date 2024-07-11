import axios from "axios";
import Cookies from "js-cookie";

export const GetDataMyAccount = () => {
  const fetchUserProfile = async () => {
    const response = await axios.get("http://localhost:3000/users/profile", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data.user;
  };

  return {
    fetchUserProfile,
  };
};
