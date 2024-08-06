export interface GetCategoryProductAllInterface {
    id: number;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface GetCategoryProductDetailInterface {
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ShowModalCategoryProductDetailInterface {
    name: string;
    description: string
    image: string;
  }
  
  export interface FormDataUpdateCategoryProductInterface {
    name: string;
    description: string;
    image: string;
    originalImage: string;
  }