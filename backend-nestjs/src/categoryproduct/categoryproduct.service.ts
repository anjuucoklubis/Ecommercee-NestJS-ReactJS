import {
  Inject,
  forwardRef,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CategoryProductResponse,
  CreateCategoryProductRequest,
  UpdateCategoryProductRequest,
} from 'src/model/categoryproduct.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryProductValidation } from './category.validation';
import { ValidationService } from 'src/common/validation.service';

@Injectable()
export class CategoryproductService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    request: CreateCategoryProductRequest,
  ): Promise<CategoryProductResponse> {
    try {
      const createCategoryProductRequest: CreateCategoryProductRequest =
        this.validationService.validate(
          CategoryProductValidation.CREATE,
          request,
        );

      const createCategoryProduct = await this.prisma.categoryProduct.create({
        data: {
          ...createCategoryProductRequest,
          updatedAt: null,
        },
      });

      const response: CategoryProductResponse = {
        id: createCategoryProduct.id,
        name: createCategoryProduct.name,
        description: createCategoryProduct.description,
        image: createCategoryProduct.image,
      };

      return response;
    } catch (error) {
      throw new Error('Failed to create category product: ' + error.message);
    }
  }

  findAll() {
    return this.prisma.categoryProduct.findMany();
  }

  findOne(id: number) {
    return this.prisma.categoryProduct.findUnique({
      where: {
        id: +id,
      },
    });
  }

  async update(
    id: number,
    request: UpdateCategoryProductRequest,
  ): Promise<CategoryProductResponse> {
    try {
      const updateRequest: UpdateCategoryProductRequest =
        this.validationService.validate(
          CategoryProductValidation.UPDATE,
          request,
        );
      const categoryId = parseInt(id.toString(), 10);
      const updatedData: Partial<Prisma.CategoryProductUpdateInput> = {};
      if (updateRequest.name) {
        updatedData.name = updateRequest.name;
      }
      if (updateRequest.description) {
        updatedData.description = updateRequest.description;
      }
      if (updateRequest.image) {
        updatedData.image = updateRequest.image;
      }
      if (Object.keys(updatedData).length > 0) {
        return await this.prisma.categoryProduct.update({
          where: {
            id: categoryId,
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
        throw new Error('Failed to update category product');
      }
    }
  }

  remove(id: number) {
    return this.prisma.categoryProduct.delete({
      where: {
        id: +id,
      },
    });
  }
}
