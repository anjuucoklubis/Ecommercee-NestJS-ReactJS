import axios from "axios";
import Cookies from "js-cookie";
import API_FRONTEND from "../../../../../api/api.ts";
import { useEffect, useState } from "react";
import { User } from "../MyAccountInterface";

console.log("useEffect:", useEffect);
console.log("useState:", useState);

export const GetDataMyAccount = () => {
  const fetchUserProfile = async () => {
    const response = await axios.get("http://localhost:3000/users/profile", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data.user;
  };

  const { API_URL_USER_PROFILE_IMAGE } = API_FRONTEND();

  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect triggered");
    const getUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  return {
    fetchUserProfile,
    API_URL_USER_PROFILE_IMAGE,
    profile,
    loading,
  };
};
