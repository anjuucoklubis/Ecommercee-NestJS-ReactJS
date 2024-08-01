import React from "react";
import CardCategoryViewModel from "./CardCategoryViewModel.ts";

function CardCategory() {
  const { categories, API_URL_CATEGORYPRODUCT_IMAGE_HOME } =
    CardCategoryViewModel();
  return (
    <div className=" bg-light p-2" style={{ marginBottom: 50 }}>
      <div className="text-lg" style={{marginBottom:15}}>Category</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 ">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-2 gap-1 rounded-lg border-2 shadow-lg transform hover:scale-105 transition duration-500"
          >
            <div className="flex flex-col items-center">
              <div className="text-lg">{category.name}</div>
              {/* <div className="text-2xl text-purple-100">{category.count}</div> */}
            </div>
            <div className="text-purple-300 bg-gradient-to-l from-purple-700 via-purple-800 to-purple-900 rounded-full p-1">
              <img
                src={`${API_URL_CATEGORYPRODUCT_IMAGE_HOME}/${category.image}`}
                alt={`${category.name} icon`}
                className="h-20 w-20"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardCategory;
