import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../../api/api.ts";
import Cookies from "js-cookie";
import axios from "axios";
import { DateValue } from "@nextui-org/react";

function VMUpdateUserProfile({ onClose }) {
  const { API_URL_USER_PROFILE_UPDATE } = API_FRONTEND();
  const [formData, setFormData] = useState<{
    firstname: string;
    lastname: string;
    gender: string;
    birthday: DateValue | null;
    telephone: string;
    image: File | string;
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
      const formDataToSend = new FormData();
      formDataToSend.append("firstname", formData.firstname);
      formDataToSend.append("lastname", formData.lastname);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append(
        "birthday",
        formData.birthday ? formData.birthday.toString() : ""
      );

      formDataToSend.append("telephone", formData.telephone.replace(/\D/g, ""));
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.patch(
        API_URL_USER_PROFILE_UPDATE,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
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
