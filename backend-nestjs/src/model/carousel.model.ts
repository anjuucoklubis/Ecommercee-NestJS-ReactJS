import { ApiProperty } from '@nestjs/swagger';

export class CreateCarouselRequest {
  @ApiProperty({
    example: 'Carousel 1',
    description: 'name of the carousel created',
  })
  name: string;

  @ApiProperty({
    example: 'carousel.png',
    description: 'image of the carousel created',
  })
  image: string;

  @ApiProperty({
    example: 'true',
    description: 'isActive of the carousel created',
  })
  isActive: string;
}

export class UpdateCarouselRequest {
  @ApiProperty({
    example: 'Carousel 1',
    description: 'name of the carousel updated',
  })
  name?: string;

  @ApiProperty({
    example: 'carousel.png',
    description: 'image of the carousel updated',
  })
  image?: string;

  @ApiProperty({
    example: 'true',
    description: 'isActive of the carousel updated',
  })
  isActive?: string;
}

export class CarouselResponse {
  @ApiProperty({
    example: '1',
    description: 'id of the carousel',
  })
  id: number;

  @ApiProperty({
    example: 'Carousel 1',
    description: 'name of the carousel',
  })
  name: string;

  @ApiProperty({
    example: 'carousel.png',
    description: 'image of the carousel',
  })
  image: string;

  @ApiProperty({
    example: 'FALSE',
    description: 'isActive of the carousel',
  })
  isActive: string;
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
