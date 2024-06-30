import { ApiProperty } from '@nestjs/swagger';

export class CreateGaleryProductRequest {
  @ApiProperty({
    example: 'image.png',
    description: 'product_galeries_image of the product created',
  })
  product_galeries_image: string;

  @ApiProperty({
    example: true,
    description: 'product_galeries_thumbnail of the product created',
  })
  product_galeries_thumbnail?: boolean;

  @ApiProperty({
    example: 1,
    description: 'productId of the product created',
  })
  productId: number;
}

export class UpdateGaleryProductRequest {
  @ApiProperty({
    example: 'image.png',
    description: 'product_galeries_image of the product created',
  })
  product_galeries_image?: string;

  @ApiProperty({
    example: true,
    description: 'product_galeries_thumbnail of the product created',
  })
  product_galeries_thumbnail?: boolean;

  @ApiProperty({
    example: 1,
    description: 'productId of the product created',
  })
  productId?: number;
}

export class GaleryProductResponse {
  @ApiProperty({
    example: {
      id: 1,
      product_galeries_image: 'image.png',
      product_galeries_thumbnail: true,
      productId: 1,
    },
    description: 'Data object example',
  })
  id: number;

  @ApiProperty()
  product_galeries_image: string;

  @ApiProperty()
  product_galeries_thumbnail: boolean;

  @ApiProperty()
  productId: number;
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
