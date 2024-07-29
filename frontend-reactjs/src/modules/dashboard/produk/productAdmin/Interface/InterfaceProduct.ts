export interface GetProductAllInterface {
  id: number;
  product_sku: string;
  product_name: string;
  product_description: string;
  product_short_description: string;
  product_price_original: string;
  product_price_discount: string;
  product_quantity: string;
  product_weight: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductDetailInterface {
  product_sku: string;
  product_name: string;
  product_description: string;
  product_short_description: string;
  product_price_original: string;
  product_price_discount: string;
  product_quantity: string;
  product_weight: string;
  CategoryProduct: {
    id: number;
    name: string;
  };
  productGalleries: {
    id: number;
    product_galeries_image: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ShowModalProductDetailInterface {
  product_sku: string;
  product_name: string;
  product_description: string;
  product_short_description: string;
  product_price_original: string;
  product_price_discount: string;
  product_quantity: string;
  product_weight: string;
  CategoryProduct: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FormDataUpdateProductInterface {
  product_sku: string;
  product_name: string;
  product_description: string;
  product_short_description: string;
  product_price_original: string;
  product_price_discount: string;
  product_quantity: string;
  product_weight: string;
  categoryProductId: number;
}

export interface GetAllCategoryProductForCreateProductInterface {
  id: number;
  name: string;
}
