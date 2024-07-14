import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserProfileRequest {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    example: 'Male',
    description: 'Gender of the user',
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({
    example: '17-08-2001',
    description: 'Birthday of the user',
  })
  @IsNotEmpty()
  @IsString()
  birthday: string;

  @ApiProperty({
    example: '08123456789',
    description: 'Telephone number of the user',
  })
  @IsNotEmpty()
  @IsString()
  telephone: string;

  @ApiProperty({
    example: 'url_image_profile.png',
    description: 'Image Profile number of the user',
  })
  image: string;
}

export class UserProfileResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  image: string;
}

export class UpdateUserProfileRequest {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsNotEmpty()
  @IsString()
  firstname?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsNotEmpty()
  @IsString()
  lastname?: string;

  @ApiProperty({
    example: 'Male',
    description: 'Gender of the user',
  })
  @IsNotEmpty()
  @IsString()
  gender?: string;

  @ApiProperty({
    example: '17-08-2001',
    description: 'Birthday of the user',
  })
  @IsNotEmpty()
  @IsString()
  birthday?: string;

  @ApiProperty({
    example: '08123456789',
    description: 'Telephone number of the user',
  })
  @IsNotEmpty()
  @IsString()
  telephone?: string;

  @ApiProperty({
    example: 'url_image_profile.png',
    description: 'Image Profile number of the user',
  })
  image?: string;
}
