import React from "react";
import PartialView from "../partial/PartialView.tsx";
import notfoundLogo from "./../../../assets/img/404_notfound.png";

export default function NotFoundView() {
  return (
    <PartialView>
      <div className="text-center">
        <img src={notfoundLogo} alt="Not Found" className="mx-auto" />
        <h1 className="text-3xl font-bold mt-4">Not Found</h1>
        <p className="text-lg mt-2">The page you're looking for doesn't exist.</p>
      </div>
    </PartialView>
  );
}
