import {
  Inject,
  forwardRef,
  Injectable,
  HttpStatus,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateUserRoleRequest,
  UpdateUserRoleRequest,
  UserRoleResponse,
} from 'src/model/userrole.model';
import { Prisma } from '@prisma/client';
import { UserRoleValidation } from './role.validation';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';

@Injectable()
export class RoleService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(request: CreateUserRoleRequest): Promise<UserRoleResponse> {
    try {
      const createUserRoleRequest: CreateUserRoleRequest =
        this.validationService.validate(UserRoleValidation.CREATE, request);

      const createUserRole = await this.prisma.userRole.create({
        data: {
          ...createUserRoleRequest,
          updateAt: null,
        },
      });

      const response: UserRoleResponse = {
        id: createUserRole.id,
        role_name: createUserRole.role_name,
        role_description: createUserRole.role_description,
      };

      return response;
    } catch (error) {
      console.error(error);

      if (error.code === 'P2002') {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: 'Role name sudah digunakan, silakan pakai nama yang lain.',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create user role: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  findAll() {
    return this.prisma.userRole.findMany({
      include: {
        users: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.userRole.findUnique({
      where: {
        id: +id,
      },
      include: {
        users: true,
      },
    });
  }

  async update(
    id: number,
    request: UpdateUserRoleRequest,
  ): Promise<UserRoleResponse> {
    try {
      const updateRequest: UpdateUserRoleRequest =
        this.validationService.validate(UserRoleValidation.UPDATE, request);
      const roleId = parseInt(id.toString(), 10);
      const updatedData: Partial<Prisma.UserRoleUpdateInput> = {};
      if (updateRequest.role_name) {
        updatedData.role_name = updateRequest.role_name;
      }
      if (updateRequest.role_description) {
        updatedData.role_description = updateRequest.role_description;
      }
      if (Object.keys(updatedData).length > 0) {
        return await this.prisma.userRole.update({
          where: {
            id: roleId,
          },
          data: updatedData,
        });
      } else {
        throw new Error('Nothing to update');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new Error('Validation failed: ' + error.message);
      } else {
        throw new Error('Failed to update user role');
      }
    }
  }

  remove(id: number) {
    return this.prisma.userRole.delete({
      where: {
        id: +id,
      },
    });
  }
}
