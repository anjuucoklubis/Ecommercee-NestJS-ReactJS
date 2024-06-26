"use client";
import React from "react";
import SidebarView from "./SidebarView.tsx";
import FooterView from "./FooterView.tsx";
import NavbarView from "./NavbarView.tsx";

function PartialView({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SidebarView />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <NavbarView />
        <div style={{ flex: 1, overflow: "auto" }}>
          <main style={{ padding: "1rem" }}>{children}</main>
        </div>
        <FooterView />
      </div>
    </div>
  );
}

export default PartialView;
