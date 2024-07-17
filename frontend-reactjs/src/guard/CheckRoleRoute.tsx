import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { GetDataMyAccount } from "../modules/dashboard/manage-user/my-account/ViewModel/GetDataMyAccount.ts";

const CheckRoleRoute = () => {
  const { profile, loading } = GetDataMyAccount();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && profile) {
      console.log("Profile data inside useEffect:", profile);
      setRole(profile.UserRole?.role_name ?? null);
    }
  }, [loading, profile]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role === null) {
    return <div>Error: Role not found</div>;
  }

  console.log("role check", role);
  return role === "ADMIN" ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default CheckRoleRoute;
