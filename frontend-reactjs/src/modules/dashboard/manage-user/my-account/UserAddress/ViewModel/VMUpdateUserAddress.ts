import { useEffect, useState } from "react";
import { Useraddress } from "../Interface/UserAddressInterface";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

interface Province {
  id: number;
  province: string;
}

interface City {
  id: number;
  city_name: string;
  postal_code: string;
}

export const useUpdateAddress = (
  addressData: Useraddress,
  onClose: () => void
) => {
  const [error, setError] = useState<Error | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [full_name, setFull_name] = useState("");
  const [number_phone, setNumber_phone] = useState("");
  const [province, setProvince] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [address_line, setAddress_line] = useState("");
  const [houseOroffice, setHouseOroffice] = useState("");
  const [formData, setFormData] = useState({
    houseOroffice: "",
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/masterlocation/province"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedProvince) {
        console.log(`Fetching cities for province ID: ${selectedProvince}`);
        try {
          const response = await axios.get(
            `http://localhost:3000/masterlocation/city/${selectedProvince}`
          );
          setCities(response.data);
          setCity(""); 
          setPostal_code(""); 
          setSelectedCityName(""); 
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedProvince]);
  

  useEffect(() => {
    if (addressData) {
      setFull_name(addressData.full_name || "");
      setNumber_phone(addressData.number_phone || "");
      setProvince(addressData.province || "");
      setCity(addressData.city || "");
      setPostal_code(addressData.postal_code || "");
      setAddress_line(addressData.address_line || "");
      setHouseOroffice(addressData.houseOroffice || "");
    }
  }, [addressData]);

  const handleProvinceChange = (e) => {
    const selectedProvince = provinces.find(
      (province) => province.id === Number(e.target.value)
    );
    if (selectedProvince) {
      setSelectedProvince(selectedProvince.id.toString());
      setSelectedProvinceName(selectedProvince.province);
      setProvince(selectedProvince.province); 
      setCity("");
      setPostal_code("");
      setSelectedCityName(""); 
    } else {
      setSelectedProvince("");
      setSelectedProvinceName("");
      setProvince("");
      setCity("");
      setPostal_code(""); 
      setSelectedCityName("");
    }
  };
  

  const handleCityChange = (e) => {
    const selectedCity = cities.find((city) => city.id === Number(e.target.value));
    if (selectedCity) {
      setCity(selectedCity.city_name);
      setSelectedCityName(selectedCity.city_name); 
      setPostal_code(selectedCity.postal_code);
    } else {
      setCity("");
      setSelectedCityName("");
      setPostal_code("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedAddress: Useraddress = {
      id: addressData.id,
      full_name,
      number_phone,
      province,
      city,
      postal_code,
      address_line,
      houseOroffice,
    };

    try {
      await handleUpdateAddress(updatedAddress);
      onClose();
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  const handleUpdateAddress = async (addressData: Useraddress) => {
    const token = Cookies.get("token");
    console.log("Token:", token);

    try {
      const response = await axios.patch(
        `http://localhost:3000/useraddress/address/${addressData.id}`,
        JSON.stringify(addressData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.error("Error Response:", response.data);
        throw new Error(response.data.message || "Failed to update address");
      } else {
        onClose();

        toast.success("Address updated successfully", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      }

      return response.data;
    } catch (error) {
      setError(error as Error);
      throw error;
    }
  };

  return {
    error,
    handleUpdateAddress,
    handleSubmit,
    handleProvinceChange,

    handleCityChange,
    cities,
    provinces,
    full_name,
    address_line,
    number_phone,
    setFull_name,
    setAddress_line,
    setNumber_phone,
    province,
    setProvince,
    formData,
    setFormData,
    city,
    postal_code,
    houseOroffice,
    setHouseOroffice
  };
};
