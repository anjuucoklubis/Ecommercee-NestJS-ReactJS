import React from "react";
import CarouselViewModel from "./CarouselViewModel.ts";
import ImageBase64 from "../../../../../utils/imageBase64.ts";

function CarouselView() {
  const { carousels, handlePrev, handleNext, currentIndex } = CarouselViewModel();
  const { DisplayBase64 } = ImageBase64();

  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        {carousels.map((carousel, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={DisplayBase64(carousel.image)}
              className="d-block w-100"
              alt={carousel.name}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default CarouselView;
