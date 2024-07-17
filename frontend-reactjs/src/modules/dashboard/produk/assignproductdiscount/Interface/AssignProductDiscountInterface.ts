export interface GetDiscountProductAllInterface {
  id: number;
  product_discount_name: string;
  product_discount_description: string;
  product_discount_percent: number;
  product_discount_active: boolean;
  products: products[];
  createdAt: string;
  updatedAt: string;
}

export interface products {
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
  productDiscountId: string;
}

export interface GetDiscountProductDetailInterface {
  product_discount_name: string;
  product_discount_description: string;
  product_discount_percent: string;
  product_discount_active: boolean;
  products: products[];
  createdAt: string;
  updatedAt: string;
}

export interface ShowModalDiscountProductDetailInterface {
  product_discount_name: string;
  product_discount_description: string;
  product_discount_percent: string;
  product_discount_active: string;
}

export interface FormDataUpdateDiscountProductInterface {
  product_discount_name: string;
  product_discount_description: string;
  product_discount_percent: string;
  product_discount_active: string;
}
