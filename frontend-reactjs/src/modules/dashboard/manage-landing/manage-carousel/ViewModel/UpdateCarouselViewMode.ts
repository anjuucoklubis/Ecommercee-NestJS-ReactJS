import { useState } from "react";
import { toast } from "react-toastify";
import {
  ShowModalCarouselProductDetailInterface,
  FormDataUpdateCarouselProductInterface,
} from "../Interface/CarouselInterface.ts";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
import Cookies from "js-cookie";
import ImageBase64 from "../../../../../utils/imageBase64.ts";

function UpdateCarouselViewModel({ onClose }) {
  const { convertToBase64 } = ImageBase64();
  const { API_URL_CAROUSEL_GET, API_URL_CAROUSEL_UPDATE } = API_FRONTEND();
  const [carouselId, setCarouselId] = useState<number | null>(null);
  const [carouselDetail, setCarouselDetail] =
    useState<ShowModalCarouselProductDetailInterface | null>(null);
  const [formDataUpdate, setFormDataUpdate] =
    useState<FormDataUpdateCarouselProductInterface>({
      name: "",
      isActive: "",
      image: "",
      originalImage: "",
    });

  const handleInputChangeUpdateCarousel = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormDataUpdate({
      ...formDataUpdate,
      [name]: value,
    });
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

  const handleImageChangeUpdateCarouselProduct = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log("Input file", file);
    if (file) {
      const isValidSize = await isValidImageSize(file);
      if (isValidSize) {
        const base64 = await convertToBase64(file);
        setFormDataUpdate({ ...formDataUpdate, image: base64 });
      } else {
        toast.error(
          "Gambar harus memiliki ukuran lebar antara 1100 hingga 1200 dan tinggi antara 180 hingga 200."
        );
      }
    }
  };

  const handleShowDetailCarousel = async (carouselId: number) => {
    try {
      setCarouselId(carouselId);
      const response = await axios.get(
        `${API_URL_CAROUSEL_GET}/${carouselId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data: {
          name: string;
          isActive: string;
          image: string;
          createdAt: string;
          updateAt: string;
        } = response.data;

        setCarouselDetail(data);
        setFormDataUpdate({
          name: data.name,
          isActive: data.isActive,
          image: data.image,
          originalImage: data.image,
        });
      } else {
        throw new Error("Failed to fetch carousel detail");
      }
    } catch (error) {
      console.error("Error fetching carousel detail:", error);
    }
  };

  const handleSubmitUpdateCarouselProduct = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formDataUpdate.name);
      formData.append("isActive", formDataUpdate.isActive);
      formData.append("image", formDataUpdate.image);

      const response = await axios.patch(
        `${API_URL_CAROUSEL_UPDATE}/${carouselId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status === 200) {
        onClose();
        toast.success("Carousel berhasil diubah", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        console.error("Failed to update carousel:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating carousel:", error);
    }
  };

  return {
    handleShowDetailCarousel,
    carouselDetail,
    setCarouselDetail,
    handleSubmitUpdateCarouselProduct,
    formDataUpdate,
    setFormDataUpdate,
    handleInputChangeUpdateCarousel,
    handleImageChangeUpdateCarouselProduct,
  };
}

export default UpdateCarouselViewModel;
