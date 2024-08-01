"use client";
import React from "react";
import Footer from "./footer.tsx";
import Navbar from "./navbar.tsx";

interface MainViewProps {
  children: React.ReactNode;
}

const MainView: React.FC<MainViewProps> = ({ children }) => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <main className="flex-1 overflow-auto p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default MainView;
