import { useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

function CreateCarouselViewModel({ onClose }) {
  const { API_URL_CAROUSEL_CREATE } = API_FRONTEND();
  const [formData, setFormData] = useState<{
    name: string;
    image: File | null;
    isActive: string;
  }>({
    name: "",
    image: null,
    isActive: "0",
  });

  const handleSubmitCreateCarousel = async (event) => {
    event.preventDefault();
    console.log("Form Create Carouse");
    console.log("Form Data:", formData);

    if (!formData.name || !formData.image || !formData.isActive) {
      if (!formData.name) {
        toast.error("Please enter name of carousel");
      }
      if (!formData.image) {
        toast.error("Please upload an image file");
      }
      if (!formData.isActive) {
        toast.error("Please select status Activated");
      }
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("image", formData.image);
      formDataToSend.append(
        "isActive",
        formData.isActive === "1" ? "true" : "false"
      );
      // const parsedFormData = {
      //   ...formDataToSend,
      //   isActive: formData.isActive === "1",
      // };

      const response = await axios.post(
        API_URL_CAROUSEL_CREATE,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("Request successful: " + JSON.stringify(response.status));
      if (response.status === 200) {
        setFormData({
          name: "",
          image: null,
          isActive: "0",
        });
        onClose();

        toast.success("Carousel created successfully", {
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
        const errorMessage = error.response.data.message;
        toast.error(`${errorMessage}`);
      } else {
        toast.error("Error submitting form");
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Input file", file);
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
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
  return {
    handleSubmitCreateCarousel,
    handleImageChange,
    handleInputChange,
    formData,
  };
}
export default CreateCarouselViewModel;
