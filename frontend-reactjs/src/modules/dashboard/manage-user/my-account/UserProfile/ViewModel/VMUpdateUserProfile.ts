import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import API_FRONTEND from "../../../../../../api/api.ts";
import { FormDataUpdateUserProfileInterface } from "../Interface/UserProfileInterface.ts";
import { GetDataMyAccount } from "../../ViewModel/GetDataMyAccount.ts";
import { User } from "../../MyAccountInterface.ts";

function VMUpdateUserProfile({ onClose }) {
  const { API_URL_USER_PROFILE_UPDATE } = API_FRONTEND();
  const [formDataUpdate, setFormDataUpdate] =
    useState<FormDataUpdateUserProfileInterface>({
      firstname: "",
      lastname: "",
      telephone: "",
    });

  const { fetchUserProfile } = GetDataMyAccount();
  const [profile, setProfile] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
        setFormDataUpdate({
          firstname: userProfile.userprofile.firstname,
          lastname: userProfile.userprofile.lastname,
          telephone: userProfile.userprofile.telephone,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const handleSubmitUpdateUserProfile = async (event) => {
    event.preventDefault();
    try {
      console.log("Form Data:", formDataUpdate);
      const response = await axios.patch(
        `${API_URL_USER_PROFILE_UPDATE}`,
        {
          firstname: formDataUpdate.firstname,
          lastname: formDataUpdate.lastname,
          telephone: formDataUpdate.telephone.replace(/\D/g, ""),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status === 200) {
        onClose();
        toast.success("User Profile berhasil diubah", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        console.error("Failed to update User Profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating User Profile:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input Changed:", name, value);
    setFormDataUpdate({
      ...formDataUpdate,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    console.log("Phone Changed:", value);
    setFormDataUpdate({
      ...formDataUpdate,
      telephone: value,
    });
  };

  return {
    profile,
    loading,
    handleSubmitUpdateUserProfile,
    formDataUpdate,
    setFormDataUpdate,
    handleInputChange,
    handlePhoneChange,
  };
}

export default VMUpdateUserProfile;
