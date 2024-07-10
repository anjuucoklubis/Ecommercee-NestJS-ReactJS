import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import API_FRONTEND from "../../../api/api.ts";

function LoginViewModel() {
  const { API_URL_AUTH_LOGIN } = API_FRONTEND();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    console.log("Form Data:", formData);

    if (!formData.email || !formData.password) {
      if (!formData.email) {
        toast.error("Please enter email");
      }
      if (!formData.password) {
        toast.error("Please enter password");
      }
      return;
    }

    try {
      const response = await fetch(`${API_URL_AUTH_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Ensure cookies are included in the request
      });

      console.log("Response received");
      if (response.ok) {
        setFormData({
          email: "",
          password: "",
        });
        toast.success("Logged in successfully", {
          position: "top-right",
          onClose: () => {
            window.location.href = "/dashboard"; // Redirect to dashboard or another page
          },
        });
      } else {
        const responseData = await response.json();
        if (responseData && responseData.message) {
          if (Array.isArray(responseData.message)) {
            responseData.message.forEach((msg) => toast.error(msg));
          } else {
            toast.error(responseData.message);
          }
        } else {
          console.error("Failed to submit form:", response.statusText);
          toast.error("Failed to submit form");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  const handleInputChangeLogin = (event) => {
    const { name, value } = event.target;
    console.log("Input Changed:", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    handleSubmitLogin,
    handleInputChangeLogin,
    formData,
  };
}

export default LoginViewModel;
