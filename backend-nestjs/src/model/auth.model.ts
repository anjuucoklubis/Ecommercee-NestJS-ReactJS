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
