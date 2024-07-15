import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../../../../api/api.ts";
import Cookies from "js-cookie";
import axios from "axios";

interface Province {
  id: number;
  province: string;
}

interface City {
  id: number;
  city_name: string;
  province_id: number;
  postal_code: string;
}

function VMCreateUserAddress({ onClose }) {
  const {
    API_URL_USER_ADDRESS_CREATE,
    API_URL_LOC_CITY,
    API_URL_LOC_PROVINCE,
  } = API_FRONTEND();
  const [formData, setFormData] = useState<{
    full_name: string;
    number_phone: string;
    province: string;
    city: string;
    postal_code: string;
    address_line: string;
    houseOroffice: string;
  }>({
    full_name: "",
    number_phone: "",
    province: "",
    city: "",
    postal_code: "",
    address_line: "",
    houseOroffice: "",
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${API_URL_LOC_PROVINCE}`);
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
            `${API_URL_LOC_CITY}/${selectedProvince}`
          );
          setCities(response.data);
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

  const handleSubmitCreateUserAddress = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    if (
      !formData.full_name ||
      !formData.number_phone ||
      !formData.province ||
      !formData.city ||
      !formData.postal_code ||
      !formData.address_line ||
      !formData.houseOroffice
    ) {
      if (!formData.full_name) {
        toast.error("Please enter full_name");
      }
      if (!formData.number_phone) {
        toast.error("Please enter number_phone");
      }
      if (!formData.province) {
        toast.error("Please enter province");
      }
      if (!formData.city) {
        toast.error("Please enter city");
      }
      if (!formData.postal_code) {
        toast.error("Please enter postal_code");
      }

      if (!formData.address_line) {
        toast.error("Please enter address_line");
      }

      if (!formData.houseOroffice) {
        toast.error("Please enter houseOroffice");
      }
      return;
    }

    try {
      const response = await axios.post(
        API_URL_USER_ADDRESS_CREATE,
        {
          full_name: formData.full_name,
          number_phone: formData.number_phone,
          province: formData.province,
          city: formData.city,
          postal_code: formData.postal_code,
          address_line: formData.address_line,
          houseOroffice: formData.houseOroffice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("Response received", response);
      if (response.status === 201) {
        setFormData({
          full_name: "",
          number_phone: "",
          province: "",
          city: "",
          postal_code: "",
          address_line: "",
          houseOroffice: "",
        });
        onClose();

        toast.success("Address created successfully", {
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

  const handleProvinceChange = (event) => {
    const { value } = event.target;
    const selectedProvince = provinces.find(
      (province) => province.id === parseInt(value, 10)
    );
    setSelectedProvince(value);
    setFormData({
      ...formData,
      province: selectedProvince ? selectedProvince.province : "",
      city: "",
      postal_code: "",
    });
  };

  const handleCityChange = (event) => {
    const { value } = event.target;
    console.log("City Changed:", value);
    const selectedCity = cities.find((city) => city.id === parseInt(value, 10));
    setFormData({
      ...formData,
      city: selectedCity ? selectedCity.city_name : "",
      postal_code: selectedCity ? selectedCity.postal_code : "",
    });
  };

  const handlePhoneChange = (value) => {
    console.log("Phone Changed:", value);
    setFormData({
      ...formData,
      number_phone: value,
    });
  };

  const handleHouseOrOfficeChange = (value: string) => {
    console.log("House/Office Changed:", value);
    setFormData({ ...formData, houseOroffice: value });
  };

  return {
    handleInputChange,
    handleCityChange,
    handleProvinceChange,
    formData,
    provinces,
    cities,
    selectedProvince,
    handleSubmitCreateUserAddress,
    handlePhoneChange,
    handleHouseOrOfficeChange,
    setFormData,
  };
}

export default VMCreateUserAddress;
