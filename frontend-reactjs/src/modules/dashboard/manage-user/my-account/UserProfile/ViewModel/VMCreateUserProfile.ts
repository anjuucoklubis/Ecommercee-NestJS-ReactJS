import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../../api/api.ts";
import Cookies from "js-cookie";
import axios from "axios";
import { DateValue } from "@nextui-org/react";
import ImageBase64 from "../../../../../../utils/imageBase64.ts";

function VMCreateUserProfile({ onClose }) {
  const { convertToBase64 } = ImageBase64();
  const { API_URL_USER_PROFILE_CREATE } = API_FRONTEND();
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

  const handleSubmitCreateUserProfile = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.gender ||
      !formData.birthday ||
      !formData.telephone ||
      !formData.image
    ) {
      if (!formData.firstname) {
        toast.error("Please enter First Name");
      }
      if (!formData.lastname) {
        toast.error("Please enter Last Name");
      }
      if (!formData.gender) {
        toast.error("Please enter Gender");
      }
      if (!formData.birthday) {
        toast.error("Please enter Birthday");
      }
      if (!formData.telephone) {
        toast.error("Please enter Telephone");
      }
      if (!formData.image) {
        toast.error("Please enter Image");
      }
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstname", formData.firstname);
      formDataToSend.append("lastname", formData.lastname);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("birthday", formData.birthday?.toString() || "");
      formDataToSend.append("telephone", formData.telephone.replace(/\D/g, ""));
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        API_URL_USER_PROFILE_CREATE,
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

        toast.success("UserProfile created successfully", {
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

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  return {
    handleSubmitCreateUserProfile,
    handleInputChange,
    formData,
    handlePhoneChange,
    handleImageChange,
    handleGenderChange,
    setFormData,
  };
}

export default VMCreateUserProfile;
