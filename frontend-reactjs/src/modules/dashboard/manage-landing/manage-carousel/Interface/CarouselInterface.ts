export interface GetCarouselAllInterface {
  id: number;
  name: string;
  image: string;
  isActive: string;
  createdAt: string;
  updateAt: string;
}

export interface GetCarouselDetailInterface {
  name: string;
  image: string;
  isActive: string;
  createdAt: string;
  updateAt: string;
}

export interface FormDataUpdateCarouselProductInterface{
  name: string;
  isActive: string;
  image: File | null;
  originalImage: string;
}

export interface ShowModalCarouselProductDetailInterface {
  name: string;
  isActive: string
  image: string;
  
}