import { useState } from "react";
import { toast } from "react-toastify";
import {
  ShowModalCarouselProductDetailInterface,
  FormDataUpdateCarouselProductInterface,
} from "../Interface/CarouselInterface.ts";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
import Cookies from "js-cookie";

function UpdateCarouselViewModel({ onClose }) {
  const { API_URL_CAROUSEL_GET, API_URL_CAROUSEL_UPDATE } = API_FRONTEND();
  const [carouselId, setCarouselId] = useState<number | null>(null);
  const [carouselDetail, setCarouselDetail] =
    useState<ShowModalCarouselProductDetailInterface | null>(null);
  const [formDataUpdate, setFormDataUpdate] =
    useState<FormDataUpdateCarouselProductInterface>({
      name: "",
      isActive: "",
      image: null,
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

  const handleImageChangeUpdateCarouselProduct = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFormDataUpdate({
      ...formDataUpdate,
      image: file,
    });
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
          image: null,
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
      if (formDataUpdate.image instanceof File) {
        formData.append("image", formDataUpdate.image);
      }

      const response = await axios.patch(
        `${API_URL_CAROUSEL_UPDATE}/${carouselId}`,
        formData,
        {
          headers: {
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
