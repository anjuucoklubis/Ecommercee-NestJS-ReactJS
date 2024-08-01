import React from "react";
import MainView from "../partial/MainView.tsx";
import CarouselView from "./components/carousel/CarouselView.tsx";
import CardProduct from "./components/cardProduct/CardProduct.tsx";
import CardCategory from "./components/cardCategoryProduct/CardCategory.tsx";
function LandingView() {
  return (
    <div className="bg-gray-200">
      <MainView>
        <CarouselView />
        <CardCategory />
        <CardProduct />
      </MainView>
    </div>
  );
}

export default LandingView;
