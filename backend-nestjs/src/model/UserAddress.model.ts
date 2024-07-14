import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserAddressRequest {
  @ApiProperty({
    example: 'Anju Lubis',
    description: 'full_name of the user address',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '081234567865',
    description: 'number_phone of the user address',
  })
  @IsNotEmpty()
  @IsString()
  number_phone: string;

  @ApiProperty({
    example: 'Sumatera Utara',
    description: 'Province of the user address',
  })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiProperty({
    example: 'Balige',
    description: 'City of the user address',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    example: '22312',
    description: 'Postal Code of the user address',
  })
  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @ApiProperty({
    example: 'Jalan Balige',
    description: 'Address of the user address',
  })
  @IsNotEmpty()
  @IsString()
  address_line: string;

  @ApiProperty({
    example: 'House',
    description: 'houseOroffice of the user address',
  })
  @IsNotEmpty()
  @IsString()
  houseOroffice: string;
}

export class UserAddressResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  number_phone: string;

  @ApiProperty()
  province: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  address_line: string;

  @ApiProperty()
  houseOroffice: string;
}

export class UpdateUserAddressRequest {
  @ApiProperty({
    example: 'Anju Lubis',
    description: 'full_name of the user address',
  })
  @IsNotEmpty()
  @IsString()
  full_name?: string;

  @ApiProperty({
    example: '081234567865',
    description: 'number_phone of the user address',
  })
  @IsNotEmpty()
  @IsString()
  number_phone?: string;

  @ApiProperty({
    example: 'Sumatera Utara',
    description: 'Province of the user address',
  })
  @IsNotEmpty()
  @IsString()
  province?: string;

  @ApiProperty({
    example: 'Balige',
    description: 'City of the user address',
  })
  @IsNotEmpty()
  @IsString()
  city?: string;

  @ApiProperty({
    example: '22312',
    description: 'Postal Code of the user address',
  })
  @IsNotEmpty()
  @IsString()
  postal_code?: string;

  @ApiProperty({
    example: 'Jalan Balige',
    description: 'Address of the user address',
  })
  @IsNotEmpty()
  @IsString()
  address_line?: string;

  @ApiProperty({
    example: 'House',
    description: 'houseOroffice of the user address',
  })
  @IsNotEmpty()
  @IsString()
  houseOroffice?: string;
}
