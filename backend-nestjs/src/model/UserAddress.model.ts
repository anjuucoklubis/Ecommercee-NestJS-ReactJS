import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserAddressRequest {
  @ApiProperty({
    example: 'Jalan Balige',
    description: 'Address of the user address',
  })
  @IsNotEmpty()
  @IsString()
  address_line: string;

  @ApiProperty({
    example: '22312',
    description: 'Postal Code of the user address',
  })
  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @ApiProperty({
    example: 'Balige',
    description: 'City of the user address',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Sumatera Utara',
    description: 'Province of the user address',
  })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({
    example: 'Indonesia',
    description: 'Country of the user address',
  })
  @IsNotEmpty()
  @IsString()
  country: string;
}

export class CreateUserAddressResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  address_line: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  city: string;
  @ApiProperty()
  province: string;
  @ApiProperty()
  country: string;
}

export class UpdateUserAddressRequest {
  @ApiProperty({
    example: 'Jalan Balige',
    description: 'Address of the user address',
  })
  @IsNotEmpty()
  @IsString()
  address_line?: string;

  @ApiProperty({
    example: '22312',
    description: 'Postal Code of the user address',
  })
  @IsNotEmpty()
  @IsString()
  postal_code?: string;

  @ApiProperty({
    example: 'Balige',
    description: 'City of the user address',
  })
  @IsNotEmpty()
  @IsString()
  city?: string;

  @ApiProperty({
    example: 'Sumatera Utara',
    description: 'Province of the user address',
  })
  @IsNotEmpty()
  @IsString()
  province?: string;

  @ApiProperty({
    example: 'Indonesia',
    description: 'Country of the user address',
  })
  @IsNotEmpty()
  @IsString()
  country?: string;
}
