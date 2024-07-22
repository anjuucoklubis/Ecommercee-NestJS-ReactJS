import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductRequest {
  @ApiProperty({
    example: '0123456755',
    description: 'SKU of the product created',
  })
  product_sku: string;

  @ApiProperty({
    example: 'leptop asus',
    description: 'name of the product created',
  })
  product_name: string;

  @ApiProperty({
    example: 'leptop asus adalah alat elektronik',
    description: 'description of the product created',
  })
  product_description: string;

  @ApiProperty({
    example: 'leptop asus adalah alat elektronik short description',
    description: 'description short of the product created',
  })
  product_short_description: string;

  @ApiProperty({
    example: '1500',
    description: 'price original of the product created',
  })
  product_price_original: string;

  @ApiProperty({
    example: '1000',
    description: 'price discount of the product created',
  })
  product_price_discount?: string;

  @ApiProperty({
    example: '50',
    description: 'quantity  of the product created',
  })
  product_quantity: string;

  @ApiProperty({
    example: '10',
    description: 'weight  of the product created',
  })
  product_weight: string;

  @ApiProperty({
    example: 1,
    description: 'categoryProductId of the category product created',
  })
  categoryProductId: number;
}

export class UpdateProductRequest {
  @ApiProperty({
    example: '0123456755',
    description: 'SKU of the product updated',
  })
  product_sku?: string;

  @ApiProperty({
    example: 'leptop asus',
    description: 'name of the product updated',
  })
  product_name?: string;

  @ApiProperty({
    example: 'leptop asus adalah alat elektronik',
    description: 'description of the product updated',
  })
  product_description?: string;

  @ApiProperty({
    example: 'leptop asus adalah alat elektronik short description',
    description: 'description short of the product updated',
  })
  product_short_description?: string;

  @ApiProperty({
    example: '1500',
    description: 'price original of the product updated',
  })
  product_price_original?: string;

  @ApiProperty({
    example: '1000',
    description: 'price discount of the product updated',
  })
  product_price_discount?: string;

  @ApiProperty({
    example: '50',
    description: 'quantity  of the product updated',
  })
  product_quantity?: string;

  @ApiProperty({
    example: '10',
    description: 'weight  of the product updated',
  })
  product_weight?: string;

  @ApiProperty({
    example: 1,
    description: 'categoryProductId of the category product updated',
  })
  categoryProductId?: number;
}

export class ProductResponse {
  @ApiProperty({
    example: 1,
    description: 'ID of product',
  })
  id: string;

  @ApiProperty({
    example: '0123456755',
    description: 'SKU of product',
  })
  product_sku: string;

  @ApiProperty({
    example: 'leptop asus',
    description: 'Name of product',
  })
  product_name: string;

  @ApiProperty({
    example: 'leptop asus adalah alat elektronik',
    description: 'description of product',
  })
  product_description: string;

  @ApiProperty({
    example: 'leptop asus adalah alat elektronik short description',
    description: 'description short of product',
  })
  product_short_description: string;

  @ApiProperty({
    example: '1500',
    description: 'price original of product',
  })
  product_price_original: string;

  @ApiProperty({
    example: '1000',
    description: 'price discount of product',
  })
  product_price_discount: string;

  @ApiProperty({
    example: '50',
    description: 'quantity of product',
  })
  product_quantity: string;

  @ApiProperty({
    example: '10',
    description: 'weight of product',
  })
  product_weight: string;

  @ApiProperty({
    example: 1,
    description: 'categoryProductId of the category',
  })
  categoryProductId: number;
}

export class UnauthorizedResponse {
  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error message',
  })
  errors: string;
}

export class RemoveResponseOk {
  @ApiProperty({ example: true })
  data: boolean;

  constructor(data: boolean) {
    this.data = data;
  }
}

export class AssignProductToDiscountRequest {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  discountId: number;

  @ApiProperty({
    type: [Number],
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[];
}
