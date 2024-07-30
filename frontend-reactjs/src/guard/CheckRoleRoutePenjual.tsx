import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { GetDataMyAccount } from "../modules/dashboard/manage-user/my-account/ViewModel/GetDataMyAccount.ts";

const CheckRoleRoutePenjual = () => {
  const { profile, loading } = GetDataMyAccount();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && profile) {
      console.log("Profile data inside useEffect:", profile);
      setRole(profile.UserRole?.role_name ?? null);
    }
  }, [loading, profile]);

  if (loading) {
    // return <div>Loading...</div>;
    return;
  }

  if (role === null) {
    // return <div>Loading...</div>;
    return;
  }

  console.log("role check", role);
  return role === "PENJUAL" ? <Outlet /> : <Navigate to="/not-found" />;
};

export default CheckRoleRoutePenjual;
