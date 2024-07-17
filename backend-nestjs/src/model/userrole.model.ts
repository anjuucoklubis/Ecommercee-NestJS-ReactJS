import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRoleRequest {
  @ApiProperty({
    example: 'Admin',
    description: 'Role name of the role Created',
  })
  @IsNotEmpty()
  @IsString()
  role_name: string;

  @ApiProperty({
    example: 'Admin is admin',
    description: 'Description of the role Created',
  })
  @IsNotEmpty()
  @IsString()
  role_description: string;
}

export class UpdateUserRoleRequest {
  @ApiProperty({
    example: 'Admin',
    description: 'Role name of the role Updated',
  })
  @IsNotEmpty()
  @IsString()
  role_name?: string;

  @ApiProperty({
    example: 'Admin is admin',
    description: 'Description of the role Updated',
  })
  @IsNotEmpty()
  @IsString()
  role_description?: string;
}

export class UserRoleResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  role_name: string;

  @ApiProperty()
  role_description: string;
}

export class UnauthorizedResponse {
  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error message',
  })
  errors: string;
}
