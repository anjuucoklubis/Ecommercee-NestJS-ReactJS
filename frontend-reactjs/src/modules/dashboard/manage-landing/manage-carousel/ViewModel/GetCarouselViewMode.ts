import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
import Cookies from "js-cookie";
import {
  GetCarouselAllInterface,
  GetCarouselDetailInterface,
} from "../Interface/CarouselInterface.ts";

function GetCarouselViewMode() {
  const { API_URL_CAROUSEL_GET } = API_FRONTEND();
  const [carousels, setCarousels] = useState<GetCarouselAllInterface[]>([]);
  const [getCarouselDetail, setGetCarouselDetail] =
    useState<GetCarouselDetailInterface | null>(null);
  const [carouselId, setCarouselId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_CAROUSEL_GET}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log("Data fetched:", response.data); // Tambahkan ini

        const formattedData = response.data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt).toISOString(),
          updateAt: new Date(item.updateAt).toISOString(),
        }));

        setCarousels(formattedData);
      } catch (error) {
        console.error("Error fetching carousel:", error);
      }
    };

    fetchData();
  }, [API_URL_CAROUSEL_GET]);

  const getCarouselByID = async (carouselId: number) => {
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
          image: string;
          isActive: string;
          createdAt: string;
          updateAt: string;
        } = response.data;
        setGetCarouselDetail(data);
      } else {
        throw new Error("Failed to fetch carousel detail");
      }
    } catch (error) {
      console.error("Error fetching carousel detail:", error);
    }
  };

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Name", uid: "name", sortable: true },
    { name: "Active", uid: "isActive", sortable: true },
    { name: "Created", uid: "createdAt", sortable: true },
    { name: "Updated", uid: "updateAt", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  return {
    carousels,
    setCarousels,
    getCarouselByID,
    getCarouselDetail,
    carouselId,
    columns,
  };
}

export default GetCarouselViewMode;
