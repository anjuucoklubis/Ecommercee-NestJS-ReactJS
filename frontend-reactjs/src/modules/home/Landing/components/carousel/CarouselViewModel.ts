import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";

export interface Carousel {
  name: string;
  image: string;
}
export default function CarouselViewModel() {
  const { API_URL_CAROUSEL_GET_FORLANDING } = API_FRONTEND();
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await axios.get(`${API_URL_CAROUSEL_GET_FORLANDING}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCarousels(response.data);
      } catch (error) {
        console.error("Error fetching carousels:", error);
      }
    };

    fetchCarousels();
  }, [API_URL_CAROUSEL_GET_FORLANDING]);

  useEffect(() => {
    if (autoSlide && carousels.length > 1) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === carousels.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [autoSlide, carousels]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carousels.length - 1 : prevIndex - 1
    );
    setAutoSlide(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carousels.length - 1 ? 0 : prevIndex + 1
    );
    setAutoSlide(false);
  };
  return {
    carousels,
    handlePrev,
    handleNext,
    currentIndex,
  };
}
