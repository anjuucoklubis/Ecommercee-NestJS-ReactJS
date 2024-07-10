import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { SearchIcon } from "../../../components/icons/SearchIcon.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProtectedInfo,
  fetchUserById,
  onLogout,
} from "../../../api/auth.js";
import { unauthenticateUser } from "../../../redux/slices/authSlice.js";

const NavbarView = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);
  const [userData, setUserData] = useState({ email: "" }); // State untuk data pengguna, dengan nilai default untuk 'email'

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      setProtectedData(data.info);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  const loadUserData = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Ambil userId dari localStorage atau dari mana pun Anda menyimpannya setelah login
      if (userId) {
        const response = await fetchUserById(userId);
        if (response.data && response.data.user) {
          setUserData(response.data.user); // Mengatur data pengguna setelah berhasil memuat
        } else {
          // Handle case when user data is not available
          console.error("User data not found:", response.data);
          setUserData({ email: "" }); // Set default value or handle accordingly
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      // Handle error fetching user data
    }
  };

  const [emaill, setEmail] = useState("");
  // useEffect(() => {
  //   const storedName = localStorage.getItem("email");
  //   if (storedName) {
  //     setEmail(storedName);
  //   }
  //   console.log(storedName)
  // }, []);
  // console.log(emaill)
  const dispatchh = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => { 
    protectedInfo();
    loadUserData(); // Panggil fungsi untuk memuat data pengguna setelah komponen dimuat
  }, []);

  return (
    <Navbar isBordered className="bg-light">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          {/* <AcmeLogo /> */}
          <p className="hidden sm:block font-bold text-inherit">Dashboard</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent as="div" className="items-center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[40rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="md"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">kwwwkwk={emaill}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem onClick={() => logout()} color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarView;
