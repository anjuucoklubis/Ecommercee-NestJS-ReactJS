import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryProductRequest {
  @ApiProperty({
    example: 'elektronik',
    description: 'name of the category product created',
  })
  name: string;

  @ApiProperty({
    example: 'elektronik adalah alat elektronik',
    description: 'description of the category product created',
  })
  description: string;

  @ApiProperty({
    example: 'image.jpg',
    description: 'city of the category product created',
  })
  image: string;
}

export class UpdateCategoryProductRequest {
  @ApiProperty({
    example: 'elektronik',
    description: 'name of the category product updated',
  })
  name?: string;

  @ApiProperty({
    example: 'elektronik adalah alat elektronik updated',
    description: 'description of the category product updated',
  })
  description?: string;

  @ApiProperty({
    example: 'image.jpg',
    description: 'city of the category product updated',
  })
  image?: string;
}

export class CategoryProductResponse {
  @ApiProperty({
    example: {
      id: 1,
      name: 'elektronik',
      description: 'elektronik adalah alat elektronik',
      image: 'image.jpg',
    },
    description: 'Data object example',
  })
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
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
