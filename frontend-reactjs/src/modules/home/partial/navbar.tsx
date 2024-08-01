import React from "react";
import useIsAuth from "./NavbarViewModel.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../../../api/auth";
import { unauthenticateUser } from "../../../redux/slices/authSlice";
import { IoPowerOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { GetDataMyAccount } from "../../dashboard/manage-user/my-account/ViewModel/GetDataMyAccount.ts";
import API_FRONTEND from "../../../api/api.ts";
function Navbar() {
  const dispatch = useDispatch();
  const { API_URL_USER_PROFILE_IMAGE } = API_FRONTEND();

  const { isAuth } = useIsAuth();
  const { profile } = GetDataMyAccount();

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

  return (
    <div>
      <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <div>
              <a
                className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700"
                href="#/"
              >
                Brand
              </a>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="md:flex items-center">
            <div className="flex flex-col md:flex-row md:mx-6">
              <a
                className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
                href="/landing"
              >
                Home
              </a>
            </div>

            {isAuth ? (
              <div
                className="flex justify-center"
                style={{ alignItems: "center", gap: 10 }}
              >
                <a
                  className="relative text-gray-700 hover:text-gray-600"
                  href="#/"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span className="absolute top-0 left-0 rounded-full bg-indigo-500 text-white p-1 text-xs"></span>
                </a>
                <div
                  className="items-center"
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    bottom: "10rem",
                  }}
                >
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      {profile?.userprofile ? (
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={avatarUrl || "fallback-image-url"}
                            alt="User Avatar"
                            style={{
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                            }}
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
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            style={{
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                            }}
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
                          {profile ? profile.email : "Loading..."}
                        </p>
                      </DropdownItem>
                      <DropdownItem
                        key="profile"
                        className="h-8 gap-2 shadow-lg transform hover:scale-105 transition duration-500"
                        color="success"
                      >
                        {profile && profile.UserRole ? (
                          profile.UserRole.role_name === "ADMIN" ? (
                            <div
                              className="d-flex align-items-center"
                              style={{ flexDirection: "row", gap: 10 }}
                            >
                              <div>
                                <RxDashboard />
                              </div>
                              <div>
                                <a href="/admin/dashboardhome-admin">
                                  <p className="">
                                    Dashboard
                                  </p>
                                </a>
                              </div>
                            </div>
                          ) : profile.UserRole.role_name === "PENJUAL" ? (
                            <div
                              className="d-flex align-items-center"
                              style={{ flexDirection: "row", gap: 10 }}
                            >
                              <div>
                                <RxDashboard />
                              </div>
                              <div>
                                <a href="/admin/dashboardhome-penjual">
                                  <p className="">Dashboard</p>
                                </a>
                              </div>
                            </div>
                          ) : null
                        ) : null}
                      </DropdownItem>

                      <DropdownItem
                        onClick={() => logout()}
                        color="danger"
                        className="d-flex align-items-center shadow-lg transform hover:scale-105 transition duration-500"
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{ flexDirection: "row", gap: 10 }}
                        >
                          <div>
                            <IoPowerOutline />
                          </div>
                          <p className="">Logout</p>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <a
                  className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500  md:my-0 "
                  href="/auth/login"
                  style={{ fontWeight: "bold" }}
                >
                  Login |
                </a>
                <a
                  className="my-1 text-sm text-gray-700 font-medium hover:text-indigo-500 md:mx-1 md:my-0"
                  href="/auth/register"
                  style={{ fontWeight: "bold" }}
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
      ;
    </div>
  );
}

export default Navbar;
