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
  Link,
} from "@nextui-org/react";
import { SearchIcon } from "../../../components/icons/SearchIcon.tsx";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../../../api/auth";
import { unauthenticateUser } from "../../../redux/slices/authSlice";
import useAuth from "../../../hooks/useAuth.ts";
import { GetDataMyAccount } from "../manage-user/my-account/ViewModel/GetDataMyAccount.ts";
import { User } from "../manage-user/my-account/MyAccountInterface.ts";

const NavbarView = () => {
  const dispatch = useDispatch();
  const { fetchUserProfile, API_URL_USER_PROFILE_IMAGE } = GetDataMyAccount();

  const [protectedData, setProtectedData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        console.log("Fetched User Profile:", userProfile);

        setProfile(userProfile);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const avatarUrl = profile?.userprofile
    ? `${API_URL_USER_PROFILE_IMAGE}/${profile.userprofile.image}`
    : "";

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

  useEffect(() => {
    protectedInfo();
  }, []);

  const user = useAuth();
  console.log("data user", user);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar isBordered className="bg-light">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">Dashboard</p>
          <p className="hidden sm:block font-bold text-inherit">
            {protectedData}
          </p>
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
            {profile?.userprofile ? (
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={avatarUrl || "fallback-image-url"}
                  alt="User Avatar"
                  style={{ borderRadius: "50%", width: "40px", height: "40px" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: "green",
                    border: "2px solid white",
                  }}
                />
              </div>
            ) : (
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  style={{ borderRadius: "50%", width: "40px", height: "40px" }}
                  alt="User Avatar"
                  src="https://media.istockphoto.com/id/1294780139/id/foto/potret-close-up-pria-tersenyum-dengan-kacamata-dengan-kemeja-biru-ilustrasi-3d-karakter.jpg?s=612x612&w=0&k=20&c=FxcfijJ5ROSDDqu7hT6E8JE9utPq1_0wrVhThXqymb0="
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: "green",
                    border: "2px solid white",
                  }}
                />
              </div>
            )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {user ? user.email : "Loading..."}
              </p>
            </DropdownItem>
            <DropdownItem key="settings">
              <Link href="/admin/manageuser-myaccount">
                <h6 style={{ color: "black", fontSize: 14 }}>My Account</h6>
              </Link>
            </DropdownItem>

            {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
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
