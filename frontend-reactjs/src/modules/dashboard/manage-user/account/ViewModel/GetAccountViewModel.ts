import { useEffect, useState } from "react";
import API_FRONTEND from "../../../../../api/api.ts";
import { GetAllUserInterface } from "../Interface/AccountInterface.ts";
import axios from "axios";
import Cookies from "js-cookie";

const GetAccountViewModel = () => {
  const { API_URL_USER_DATA_GET_ALL, API_URL_USER_DATA_BY_ID_NEW } = API_FRONTEND();
  const [getAllUsers, setGetAllUsers] = useState<GetAllUserInterface[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [getuserDetail, setUserDetail] = useState<GetAllUserInterface | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_USER_DATA_GET_ALL, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setGetAllUsers(data);
        } else {
          throw new Error("Failed to fetch all users");
        }
      } catch (error) {
        console.error("Error fetching all user:", error);
      }
    };
    fetchData();
  }, [API_URL_USER_DATA_GET_ALL]);

  const getUserByID = async (userId: string) => {
    try {
      setUserId(userId);
      const response = await axios.get(`${API_URL_USER_DATA_BY_ID_NEW}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      console.log("Response received", response.data);
      if (response.status === 200) {
        const data: GetAllUserInterface = response.data;
        setUserDetail(data);
        // setShowModalViewDetailProduct(true);
      } else {
        throw new Error("Failed to fetch user detail");
      }
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  };

  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Email", uid: "email", sortable: true },
    { name: "Role", uid: `UserRole.role_name`, sortable: true },
    { name: "Created", uid: "createdAt", sortable: true },
    { name: "Updated", uid: "updateAt", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  return {
    getAllUsers,
    columns,
    getUserByID,
    getuserDetail,
    userId,
  };
};

export default GetAccountViewModel;
