import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../../api/api.ts";
import Cookies from "js-cookie";
import axios from "axios";
import { DateValue } from "@nextui-org/react";
import ImageBase64 from "../../../../../../utils/imageBase64.ts";

function VMUpdateUserProfile({ onClose }) {
  const { convertToBase64 } = ImageBase64();
  const { API_URL_USER_PROFILE_UPDATE } = API_FRONTEND();
  const [formData, setFormData] = useState<{
    firstname: string;
    lastname: string;
    gender: string;
    birthday: DateValue | null;
    telephone: string;
    image: string;
  }>({
    firstname: "",
    lastname: "",
    gender: "",
    birthday: null,
    telephone: "",
    image: "",
  });

  const handleSubmitUpdateUserProfile = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.gender ||
      !formData.birthday ||
      !formData.telephone
    ) {
      toast.error("Please fill out all required fields");
      return;
    }

    try {
      // formDataToSend.append("telephone", formData.telephone.replace(/\D/g, ""));

      const formattedBirthday = formData.birthday
        ? formData.birthday.toString()
        : "";

      const formDataToSend = {
        ...formData,
        birthday: formattedBirthday,
      };

      const response = await axios.patch(
        API_URL_USER_PROFILE_UPDATE,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("Response received", response);
      if (response.status === 200) {
        setFormData({
          firstname: "",
          lastname: "",
          gender: "",
          birthday: null,
          telephone: "",
          image: "",
        });
        onClose();

        toast.success("UserProfile updated successfully", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        const responseData = response.data;
        if (responseData && responseData.message) {
          toast.error(responseData.message);
        } else {
          console.error("Failed to submit form:", response.statusText);
          toast.error("Failed to submit form");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error submitting form");
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input Changed:", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    console.log("Phone Changed:", value);
    setFormData({
      ...formData,
      telephone: value,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Image Changed:", file);
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, image: base64 });
    }
  };

  const handleGenderChange = (event) => {
    setFormData({ ...formData, gender: event });
  };

  return {
    handleSubmitUpdateUserProfile,
    handleInputChange,
    formData,
    handlePhoneChange,
    handleImageChange,
    handleGenderChange,
    setFormData,
  };
}

export default VMUpdateUserProfile;
