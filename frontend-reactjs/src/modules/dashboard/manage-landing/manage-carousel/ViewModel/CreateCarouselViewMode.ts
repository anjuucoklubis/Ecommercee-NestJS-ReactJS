import { useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import ImageBase64 from "../../../../../utils/imageBase64.ts";

function CreateCarouselViewModel({ onClose }) {
  const { convertToBase64 } = ImageBase64();
  const { API_URL_CAROUSEL_CREATE } = API_FRONTEND();
  const [formData, setFormData] = useState<{
    name: string;
    image: string;
    isActive: string;
  }>({
    name: "",
    image: "",
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

      const response = await axios.post(
        API_URL_CAROUSEL_CREATE,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Request successful: " + JSON.stringify(response.status));
      if (response.status === 200) {
        setFormData({
          name: "",
          image: "",
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

  const isValidImageSize = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
      };

      img.onload = () => {
        const { width, height } = img;
        const isValidWidth = width >= 900 && width <= 1200;
        const isValidHeight = height >= 180 && height <= 300;
        resolve(isValidWidth && isValidHeight);
      };

      img.onerror = () => reject(false);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Input file", file);
    if (file) {
      const isValidSize = await isValidImageSize(file);
      if (isValidSize) {
        const base64 = await convertToBase64(file);
        setFormData({ ...formData, image: base64 });
      } else {
        toast.error(
          "Gambar harus memiliki ukuran lebar antara 1100 hingga 1200 dan tinggi antara 180 hingga 200."
        );
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
  return {
    handleSubmitCreateCarousel,
    handleImageChange,
    handleInputChange,
    formData,
  };
}
export default CreateCarouselViewModel;
