import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../../MyAccountInterface.ts";
import { GetDataMyAccount } from "../../ViewModel/GetDataMyAccount.ts";
import API_FRONTEND from "../../../../../../api/api.ts";

function VMDeleteUserAddress() {
  const { API_URL_USER_ADDRESS_DELETE } = API_FRONTEND();
  const { fetchUserProfile } = GetDataMyAccount();

  const [itemToDelete, setItemToDelete] = useState(null);
  const [profile, setProfile] = useState<User | null>(null);
  console.log(profile);

  const handleDeleteAddress = (id) => {
    setItemToDelete(id);
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
        // setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        const response = await fetch(
          `${API_URL_USER_ADDRESS_DELETE}/${itemToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("Address deleted successfully");
          toast.success("Address updated successfully", {
            position: "top-right",
            onClose: () => {
              window.location.reload();
            },
          });
          setProfile((prevProfile) => {
            if (!prevProfile) return null;

            return {
              ...prevProfile,
              useraddress: prevProfile.useraddress.filter(
                (address) => address.id !== itemToDelete
              ),
              email: prevProfile.email,
              createdAt: prevProfile.createdAt,
              updateAt: prevProfile.updateAt,
              userprofile: prevProfile.userprofile,
            };
          });
        } else {
          console.error("Failed to delete address");
        }
      } catch (error) {
        console.error("Error deleting address:", error);
      } finally {
        setItemToDelete(null);
      }
    }
  };
  const handleCancelDelete = () => {
    setItemToDelete(null);
  };
  return {
    handleConfirmDelete,
    handleDeleteAddress,
    handleCancelDelete,
    itemToDelete,
  };
}

export default VMDeleteUserAddress;
