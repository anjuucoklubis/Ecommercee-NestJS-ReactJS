import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { RxDashboard } from "react-icons/rx";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Category from "@mui/icons-material/Category";
import Inventory from "@mui/icons-material/Inventory";
import Discount from "@mui/icons-material/Discount";
import { Link } from "react-router-dom";
import CheckRoleForSidebar from "../../../guard/CheckRoleForSidebar.tsx";
const SidebarView = () => {
  const isAdmin = CheckRoleForSidebar();
  return (
    <Sidebar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem icon={<MenuOutlinedIcon />} style={{ textAlign: "center" }}>
          <h2>Admin</h2>
        </MenuItem>
        {/* <SubMenu
          title="Dashboard"
          label="Dashboard"
          icon={<PeopleOutlinedIcon />}
        >
          {isAdmin && (
            <MenuItem icon={<AccountCircleIcon />}>
              <Link to="/admin/dashboardhome-admin">Dashboard</Link>
            </MenuItem>
          )}
          {!isAdmin && (
            <MenuItem icon={<VerifiedUserIcon />}>
              <Link to="/admin/dashboardhome-penjual">Dashboard</Link>
            </MenuItem>
          )}
        </SubMenu> */}
        {isAdmin && (
          <MenuItem
            icon={<RxDashboard />}
            className="shadow-lg transform hover:scale-105 transition duration-500"
            component={<Link to="/admin/dashboardhome-admin" />}
          >
            Dashboard
          </MenuItem>
        )}
        {!isAdmin && (
          <MenuItem
            icon={<RxDashboard />}
            className="shadow-lg transform hover:scale-105 transition duration-500"
            component={<Link to="/admin/dashboardhome-penjual" />}
          >
            Dashboard
          </MenuItem>
        )}

        {isAdmin && (
          <SubMenu
            title="Manage Landing"
            label="Manage Landing"
            icon={<Inventory />}
            className="shadow-lg transform hover:scale-105 transition duration-500"
          >
            <MenuItem
              icon={<Category />}
              className="shadow-lg transform hover:scale-90 transition duration-500"
            >
              <Link to="/admin/carousel-admin">Carousel</Link>
            </MenuItem>
          </SubMenu>
        )}
        
        <SubMenu
          title="Manage User"
          label="Manage User"
          icon={<PeopleOutlinedIcon />}
          className="shadow-lg transform hover:scale-105 transition duration-500"
        >
          {isAdmin && (
            <MenuItem icon={<AccountCircleIcon />}>
              <Link to="/admin/manageuser-account">Account</Link>
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem icon={<VerifiedUserIcon />}>
              <Link to="/admin/manageuser-role">Role</Link>
            </MenuItem>
          )}
          <MenuItem icon={<VerifiedUserIcon />}>
            <Link to="/admin/manageuser-myaccount">My Account</Link>
          </MenuItem>
        </SubMenu>
        <SubMenu
          title="Manage Product"
          label="Manage Product"
          icon={<Inventory />}
          className="shadow-lg transform hover:scale-105 transition duration-500"
        >
          {isAdmin && (
            <MenuItem
              icon={<Category />}
              className="shadow-lg transform hover:scale-90 transition duration-500"
            >
              <Link to="/admin/manageproduct-categoryproduct">
                Category Product
              </Link>
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem
              icon={<Category />}
              className="shadow-lg transform hover:scale-90 transition duration-500"
            >
              <Link to="/admin/manageproduct-product-admin">Product</Link>
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem
              icon={<Category />}
              className="shadow-lg transform hover:scale-90 transition duration-500"
            >
              <Link to="/admin/manageproduct-discountproduct-admin">
                {" "}
                Discount
              </Link>
            </MenuItem>
          )}
          {!isAdmin && (
            <MenuItem
              icon={<Inventory />}
              className="shadow-lg transform hover:scale-90 transition duration-500"
            >
              <Link to="/admin/manageproduct-product">My Product</Link>
            </MenuItem>
          )}
          {!isAdmin && (
            <MenuItem
              icon={<Discount />}
              className="shadow-lg transform hover:scale-90 transition duration-500"
            >
              <Link to="/admin/manageproduct-discountproduct">My Discount</Link>
            </MenuItem>
          )}
          {!isAdmin && (
            <MenuItem
              icon={<Discount />}
              className="shadow-lg transform hover:scale-90 transition duration-500"
            >
              <Link to="/admin/manageproduct-assigndiscount">
                Assign Discount
              </Link>
            </MenuItem>
          )}
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarView;
