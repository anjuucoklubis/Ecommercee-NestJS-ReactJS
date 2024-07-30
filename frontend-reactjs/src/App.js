import AccountView from "./modules/dashboard/manage-user/account/AccountView.tsx";
import RoleView from "./modules/dashboard/manage-user/role/RoleView.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import CategoryProductView from "./modules/dashboard/produk/category/CategoryProductView.tsx";
import ProductView from "./modules/dashboard/produk/product/ProductView.tsx";
import DiscountProductView from "./modules/dashboard/produk/discount/DiscountProductView.tsx";
import RegisterView from "./modules/auth/register/RegisterView.tsx";
import LoginView from "./modules/auth/login/LoginView.tsx";
import { useSelector } from "react-redux";
import MyAccountView from "./modules/dashboard/manage-user/my-account/MyAccountView.tsx";
import AssignProductDiscountView from "./modules/dashboard/produk/assignproductdiscount/AssignProductDiscountView.tsx";
import CheckRoleRouteAdmin from "./guard/CheckRoleRouteAdmin.tsx";
import CheckRoleRoutePenjual from "./guard/CheckRoleRoutePenjual.tsx";
import ProductAdminView from "./modules/dashboard/produk/productAdmin/ProductAdminView.tsx";
import DiscountProductAdminView from "./modules/dashboard/produk/discountAdmin/DiscountProductAdminView.tsx";
import NotFoundView from "./modules/dashboard/not-found/NotFoundView.tsx";
import DashboardPenjualView from "./modules/dashboard/homeDashboard/homeDashboardPenjual/DashboardPenjualView.tsx";
import DashboardAdminView from "./modules/dashboard/homeDashboard/homeDashboardAdmin/DashboardAdminView.tsx";

const PrivateRoutes = () => {
  // const authState = useSelector((state) => state.auth);
  // console.log("Auth state", authState);
  // return <>{authState.isAuth ? <Outlet /> : <Navigate to="/auth/login" />}</>;

  const { isAuth } = useSelector((state) => state.auth);
  console.log("Auth state", isAuth);
  return <>{isAuth ? <Outlet /> : <Navigate to="/auth/login" />}</>;
};

const RestrictedRoutes = () => {
  // const authState = useSelector((state) => state.auth);
  // console.log("Auth state", authState);
  // return (
  //   <>
  //     {!authState.isAuth ? (
  //       <Outlet />
  //     ) : (
  //       <Navigate to="/admin/manageproduct-product" />
  //     )}
  //   </>
  // );
  const { isAuth } = useSelector((state) => state.auth);
  console.log("Auth state", isAuth);

  return (
    <>
      {!isAuth ? (
        <Outlet />
      ) : (
        <Navigate to="/admin/manageproduct-discountproduct" />
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* MANAGEMENT NOT FOUND */}
          <Route path="/not-found" element={<NotFoundView />} />

          {/* MANAGEMENT DASHBOARD - HOME */}
          <Route element={<CheckRoleRoutePenjual />}>
            <Route
              path="/admin/dashboardhome-penjual"
              element={<DashboardPenjualView />}
            />
          </Route>
          <Route element={<CheckRoleRouteAdmin />}>
            <Route
              path="/admin/dashboardhome-admin"
              s
              element={<DashboardAdminView />}
            />
          </Route>

          {/* MANAGEMENT DASHBOARD - MANAGEMENT PRODUCT */}
          {/* ADMIN */}
          <Route element={<CheckRoleRouteAdmin />}>
            <Route
              path="/admin/manageproduct-product-admin"
              element={<ProductAdminView />}
            />
          </Route>
          <Route element={<CheckRoleRouteAdmin />}>
            <Route
              path="/admin/manageproduct-categoryproduct"
              element={<CategoryProductView />}
            />
          </Route>
          <Route element={<CheckRoleRouteAdmin />}>
            <Route
              path="/admin/manageproduct-discountproduct-admin"
              element={<DiscountProductAdminView />}
            />
          </Route>
          {/* END ADMIN */}

          {/* PENJUAL */}
          <Route element={<CheckRoleRoutePenjual />}>
            <Route
              path="/admin/manageproduct-product"
              element={<ProductView />}
            />
          </Route>
          <Route element={<CheckRoleRoutePenjual />}>
            <Route
              path="/admin/manageproduct-discountproduct"
              element={<DiscountProductView />}
            />
          </Route>
          <Route element={<CheckRoleRoutePenjual />}>
            <Route
              path="/admin/manageproduct-assigndiscount"
              element={<AssignProductDiscountView />}
            />
          </Route>
          {/* END PENJUAL */}

          {/* MANAGEMENT DASHBOARD - MANAGEMENT USER */}
          <Route element={<CheckRoleRouteAdmin />}>
            <Route path="/admin/manageuser-account" element={<AccountView />} />
          </Route>
          <Route element={<CheckRoleRouteAdmin />}>
            <Route path="/admin/manageuser-role" element={<RoleView />} />
          </Route>

          {/* MANAGEMENT DASHBOARD - MANAGEMENT ACOUND */}
          <Route
            path="/admin/manageuser-myaccount"
            element={<MyAccountView />}
          />
        </Route>

        <Route element={<RestrictedRoutes />}>
          {/* MANAGEMENT AUTH */}
          <Route path="/auth/register" element={<RegisterView />} />
          <Route path="/auth/login" element={<LoginView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
