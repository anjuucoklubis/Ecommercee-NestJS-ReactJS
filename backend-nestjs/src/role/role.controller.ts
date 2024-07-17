import {
  Get,
  Res,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  CreateUserRoleRequest,
  UnauthorizedResponse,
  UpdateUserRoleRequest,
  UserRoleResponse,
} from 'src/model/userrole.model';
import { RoleService } from './role.service';
import { WebResponse } from 'src/model/web.model';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  @ApiOkResponse({
    description: 'OK',
    type: UserRoleResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async create(
    @Body() request: CreateUserRoleRequest,
  ): Promise<WebResponse<UserRoleResponse>> {
    try {
      const result = await this.roleService.create(request);
      return {
        data: result,
      };
    } catch (error) {
      throw new Error('Failed to create user role: ' + error.message);
    }
  }

  @Get('get')
  findAll() {
    return this.roleService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOkResponse({
    description: 'OK',
    type: UserRoleResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async update(@Param('id') id: number, @Body() body: UpdateUserRoleRequest) {
    try {
      const roleId = parseInt(id.toString(), 10);
      const userRole = await this.roleService.findOne(roleId);

      if (!userRole) {
        throw new HttpException('Role product not found', HttpStatus.NOT_FOUND);
      }

      if (body.role_name || body.role_description) {
        const updatedProduct = await this.roleService.update(roleId, body);
        const response = {
          'INFORMATION-RESPONSE': {
            REQUESTNAME: 'UPDATE USER ROLE',
            METHOD: 'PATCH',
            'STATUS-RESPONSE': HttpStatus.OK,
            url: 'http://127.0.0.1:3000/role/update/id',
          },
          'RESPONSE-DATA': {
            id: updatedProduct.id,
            role_name: updatedProduct.role_name,
            role_description: updatedProduct.role_description,
          },
        };
        return response;
      } else {
        throw new Error('No valid data provided for update');
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: number, @Res() response: Response) {
    const deletedRecord = await this.roleService.remove(+id);

    if (deletedRecord) {
      const response = {
        'INFORMATION-RESPONSE': {
          REQUESTNAME: 'DELETE USER ROLE',
          METHOD: 'DELETE',
          'STATUS-RESPONSE': HttpStatus.OK,
          url: 'http://127.0.0.1:3000/role/delete/id',
        },
        'RESPONSE-DATA': {
          id: deletedRecord.id,
          role_name: deletedRecord.role_name,
          role_description: deletedRecord.role_description,
          createdAt: deletedRecord.createdAt,
          updateAt: deletedRecord.updateAt,
        },
      };
      return response;
    } else {
      return response;
    }
  }
}
