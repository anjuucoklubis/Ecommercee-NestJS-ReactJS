import {
  Inject,
  Injectable,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateDiscountProductRequest,
  DiscountProductResponse,
  UpdateDiscountProductRequest,
} from 'src/model/discountproduct.model';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { DiscountProductValidation } from './discount.validation';

@Injectable()
export class DiscountproductService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    request: CreateDiscountProductRequest,
  ): Promise<DiscountProductResponse> {
    try {
      const createDiscountProductRequest: CreateDiscountProductRequest =
        this.validationService.validate(
          DiscountProductValidation.CREATE,
          request,
        );

      const createDiscountProduct = await this.prisma.productDiscount.create({
        data: { ...createDiscountProductRequest },
      });

      const response: DiscountProductResponse = {
        id: createDiscountProduct.id,
        product_discount_name: createDiscountProduct.product_discount_name,
        product_discount_description:
          createDiscountProduct.product_discount_description,
        product_discount_percent:
          createDiscountProduct.product_discount_percent,
        product_discount_active: createDiscountProduct.product_discount_active,
      };

      return response;
    } catch (error) {
      throw new Error('Failed to create discount product: ' + error.message);
    }
  }

  findAll() {
    return this.prisma.productDiscount.findMany();
  }

  findOne(id: number) {
    return this.prisma.productDiscount.findUnique({
      where: {
        id: +id,
      },
    });
  }

  async update(
    id: number,
    request: UpdateDiscountProductRequest,
  ): Promise<DiscountProductResponse> {
    try {
      const updateRequest: UpdateDiscountProductRequest =
        this.validationService.validate(
          DiscountProductValidation.UPDATE,
          request,
        );
      const discountId = parseInt(id.toString(), 10);
      const updatedData: Partial<Prisma.ProductDiscountUpdateInput> = {};

      if (updateRequest.product_discount_name !== undefined) {
        updatedData.product_discount_name = updateRequest.product_discount_name;
      }
      if (updateRequest.product_discount_description !== undefined) {
        updatedData.product_discount_description =
          updateRequest.product_discount_description;
      }
      if (updateRequest.product_discount_percent !== undefined) {
        updatedData.product_discount_percent =
          updateRequest.product_discount_percent;
      }
      if (updateRequest.product_discount_active !== undefined) {
        updatedData.product_discount_active =
          updateRequest.product_discount_active;
      }

      if (Object.keys(updatedData).length > 0) {
        const updatedProduct = await this.prisma.productDiscount.update({
          where: {
            id: discountId,
          },
          data: updatedData,
        });

        const response: DiscountProductResponse = {
          id: updatedProduct.id,
          product_discount_name: updatedProduct.product_discount_name,
          product_discount_description:
            updatedProduct.product_discount_description,
          product_discount_percent: updatedProduct.product_discount_percent,
          product_discount_active: updatedProduct.product_discount_active,
        };

        return response;
      } else {
        throw new Error('Nothing to update');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new Error('Validation failed: ' + error.message);
      } else {
        throw new Error('Failed to update discount product: ' + error.message);
      }
    }
  }

  remove(id: number) {
    return this.prisma.productDiscount.delete({
      where: {
        id: +id,
      },
    });
  }
}
