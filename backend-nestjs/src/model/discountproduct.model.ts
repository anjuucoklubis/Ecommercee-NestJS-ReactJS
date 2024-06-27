import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountProductRequest {
  @ApiProperty({
    example: 'Ramadhan Sale Discount',
    description: 'name of the discount product created',
  })
  product_discount_name: string;

  @ApiProperty({
    example: 'Ramadhan Sale adalah discount saat ramadhan',
    description: 'description of the discount product created',
  })
  product_discount_description: string;

  @ApiProperty({
    example: 30,
    description: 'percent of the discount product created',
  })
  product_discount_percent: number;

  @ApiProperty({
    example: true,
    description: 'active of the discount product created',
  })
  product_discount_active: boolean;
}

export class UpdateDiscountProductRequest {
  @ApiProperty({
    example: 'Ramadhan Sale Discount',
    description: 'name of the discount product updated',
  })
  product_discount_name?: string;

  @ApiProperty({
    example: 'Ramadhan Sale adalah discount saat ramadhan',
    description: 'description of the discount product updated',
  })
  product_discount_description?: string;

  @ApiProperty({
    example: 30,
    description: 'percent of the discount product updated',
  })
  product_discount_percent?: number;

  @ApiProperty({
    example: true,
    description: 'active of the discount product updated',
  })
  product_discount_active?: boolean;
}

export class DiscountProductResponse {
  @ApiProperty({
    example: {
      id: 1,
      product_discount_name: 'Ramadhan Sale Discount',
      product_discount_description:
        'Ramadhan Sale adalah discount saat ramadhan',
      product_discount_percent: 30,
      product_discount_active: true,
    },
    description: 'Data object example',
  })
  id: number;

  @ApiProperty()
  product_discount_name: string;

  @ApiProperty()
  product_discount_description: string;

  @ApiProperty()
  product_discount_percent: number;

  @ApiProperty()
  product_discount_active: boolean;
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
