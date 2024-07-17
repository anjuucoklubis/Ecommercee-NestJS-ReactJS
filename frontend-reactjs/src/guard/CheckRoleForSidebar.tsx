import { useEffect, useState } from "react";
import { GetDataMyAccount } from "../modules/dashboard/manage-user/my-account/ViewModel/GetDataMyAccount.ts";

const CheckRoleForSidebar = () => {
  const { profile, loading } = GetDataMyAccount();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading && profile) {
      setIsAdmin(profile.UserRole?.role_name === "ADMIN");
    }
  }, [loading, profile]);

  return isAdmin;
};

export default CheckRoleForSidebar;
