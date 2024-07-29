export interface GetDiscountProductAllInterface {
  id: number;
  product_discount_name: string;
  product_discount_description: string;
  product_discount_percent: number;
  product_discount_active: boolean;
  createdAt: string;
  updatedAt: string | null;
  user: {
    id: string;
    email: string;
  };
}

export interface GetDiscountProductDetailInterface {
  product_discount_name: string;
  product_discount_description: string;
  product_discount_percent: number;
  product_discount_active: boolean;
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
