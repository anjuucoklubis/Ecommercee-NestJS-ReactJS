import axios from "axios";
import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import {
  GetRoleAllInterface,
  GetRoleDetailInterface,
} from "../Interface/RoleInterface.ts";

function RoleViewModelGet() {
  const { API_URL_USEROLE_GET } = API_FRONTEND();
  const [roles, setRoles] = useState<GetRoleAllInterface[]>([]);
  const [getRoleDetail, setGetRoleDetail] =
    useState<GetRoleDetailInterface | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_USEROLE_GET}`);
        const formattedData = response.data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt).toISOString(),
          updateAt: new Date(item.updateAt).toISOString(),
        }));

        setRoles(formattedData);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchData();
  }, [API_URL_USEROLE_GET]);

  const getRoleById = async (roleId: number) => {
    try {
      setRoleId(roleId);
      const response = await fetch(`${API_URL_USEROLE_GET}/${roleId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch role detail");
      }
      const data: GetRoleDetailInterface = await response.json();
      data.userCount = data.users.length;
      setGetRoleDetail(data);
    } catch (error) {
      console.error("Error fetching role detail:", error);
    }
  };

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Role Name", uid: "role_name", sortable: true },
    { name: "Role Description", uid: "role_description", sortable: true },
    { name: "Created", uid: "createdAt", sortable: true },
    { name: "Updated", uid: "updateAt", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  return {
    roles,
    setRoles,
    getRoleById,
    setGetRoleDetail,
    roleId,
    columns,
    getRoleDetail,
  };
}

export default RoleViewModelGet;
