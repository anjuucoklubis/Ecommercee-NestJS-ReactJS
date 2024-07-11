import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class AuthDtoModel {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'email of the auth account signup & signin',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: '123test',
    description: 'password of the auth account signup & signin',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  public password: string;
}

export class CreateUserPersonalRequest {
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
    example: '08123456789',
    description: 'Telephone number of the user',
  })
  @IsNotEmpty()
  @IsString()
  telephone: string;
}

export class CreateUserPersonalResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  telephone: string;
}

export class UpdateUserPersonalRequest {
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
    example: '08123456789',
    description: 'Telephone number of the user',
  })
  @IsNotEmpty()
  @IsString()
  telephone: string;
}
