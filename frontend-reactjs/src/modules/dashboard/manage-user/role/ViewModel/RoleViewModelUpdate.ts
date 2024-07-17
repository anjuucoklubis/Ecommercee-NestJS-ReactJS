import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import axios from "axios";
import {
  GetRoleDetailInterface,
  FormDataUpdateRoleInterface,
} from "../Interface/RoleInterface.ts";

function RoleViewModelUpdate({ onClose }) {
  const { API_URL_USEROLE_GET, API_URL_USEROLE_UPDATE } = API_FRONTEND();
  const [roleId, setRoleId] = useState<number | null>(null);
  const [roleDetail, setRoleDetail] = useState<GetRoleDetailInterface | null>(
    null
  );
  const [formDataUpdate, setFormDataUpdate] =
    useState<FormDataUpdateRoleInterface>({
      role_name: "",
      role_description: "",
    });

  const handleShowDetailRole = async (roleId) => {
    try {
      setRoleId(roleId);
      const response = await fetch(`${API_URL_USEROLE_GET}/${roleId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch role detail");
      }
      const data = await response.json();

      setRoleDetail(data);
      setFormDataUpdate({
        role_name: data.role_name,
        role_description: data.role_description,
      });
    } catch (error) {
      console.error("Error fetching role detail:", error);
    }
  };

  const handleSubmitUpdateRole = async (event) => {
    event.preventDefault();
    try {
      console.log("Form Data:", formDataUpdate);
      const response = await fetch(`${API_URL_USEROLE_UPDATE}/${roleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formDataUpdate),
        credentials: "include",
      });
      if (response.ok) {
        onClose();
        toast.success("role berhasil diubah", {
          position: "top-right",
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to update role new:", errorData);
        console.error("Failed to update role new:", errorData);

        console.error("Failed to update role:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input Changed:", name, value);
    setFormDataUpdate({
      ...formDataUpdate,
      [name]: value,
    });
  };

  return {
    handleShowDetailRole,
    roleDetail,
    setRoleDetail,
    handleSubmitUpdateRole,
    formDataUpdate,
    setFormDataUpdate,
    handleInputChange,
  };
}

export default RoleViewModelUpdate;
