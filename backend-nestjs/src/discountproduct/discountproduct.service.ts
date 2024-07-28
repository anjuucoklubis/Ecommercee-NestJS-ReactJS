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
import { Request } from 'express';
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
    userId: string,
  ): Promise<DiscountProductResponse> {
    try {
      const createDiscountProductRequest: CreateDiscountProductRequest =
        this.validationService.validate(
          DiscountProductValidation.CREATE,
          request,
        );

      const createDiscountProduct = await this.prisma.productDiscount.create({
        data: {
          ...createDiscountProductRequest,
          updatedAt: null,
          userId: userId,
        },
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
    return this.prisma.productDiscount.findMany({
      include: {
        products: true,
      },
    });
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('ID cannot be null or undefined');
    }

    return this.prisma.productDiscount.findUnique({
      where: {
        id: id,
      },
      include: {
        products: true,
      },
    });
  }

  findDiscountAllByUser(req: Request) {
    const decodedUser = req.user as { id: string; email: string };
    return this.prisma.productDiscount.findMany({
      where: {
        userId: decodedUser.id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        products: true,
      },
    });
  }

  async update(
    id: string,
    request: UpdateDiscountProductRequest,
  ): Promise<DiscountProductResponse> {
    try {
      const existingDiscount = await this.prisma.productDiscount.findUnique({
        where: { id: id },
      });

      if (!existingDiscount) {
        throw new Error('Discount product not found');
      }

      const updateRequest: UpdateDiscountProductRequest =
        this.validationService.validate(
          DiscountProductValidation.UPDATE,
          request,
        );
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

      const updatedProduct = await this.prisma.productDiscount.update({
        where: {
          id: id,
        },
        data: updatedData,
      });

      if (updateRequest.product_discount_active !== undefined) {
        if (updateRequest.product_discount_active) {
          const products = await this.prisma.product.findMany({
            where: { productDiscountId: id },
          });
          await Promise.all(
            products.map((product) =>
              this.prisma.product.update({
                where: { id: product.id },
                data: {
                  product_price_discount: this.calculateDiscountedPrice(
                    product.product_price_original,
                    updateRequest.product_discount_percent,
                  ),
                },
              }),
            ),
          );
        } else {
          await this.prisma.product.updateMany({
            where: {
              productDiscountId: id,
            },
            data: {
              product_price_discount: '0',
            },
          });
        }
      }

      if (
        updateRequest.product_discount_percent !== undefined &&
        updatedProduct.product_discount_active
      ) {
        const products = await this.prisma.product.findMany({
          where: { productDiscountId: id },
        });
        await Promise.all(
          products.map((product) =>
            this.prisma.product.update({
              where: { id: product.id },
              data: {
                product_price_discount: this.calculateDiscountedPrice(
                  product.product_price_original,
                  updateRequest.product_discount_percent,
                ),
              },
            }),
          ),
        );
      }

      const response: DiscountProductResponse = {
        id: updatedProduct.id,
        product_discount_name: updatedProduct.product_discount_name,
        product_discount_description:
          updatedProduct.product_discount_description,
        product_discount_percent: updatedProduct.product_discount_percent,
        product_discount_active: updatedProduct.product_discount_active,
      };

      return response;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new Error('Validation failed: ' + error.message);
      } else {
        throw new Error('Failed to update discount product: ' + error.message);
      }
    }
  }

  async remove(id: string) {
    const discountProduct = await this.prisma.productDiscount.findUnique({
      where: { id: String(id) },
      include: { products: true },
    });

    if (!discountProduct) {
      throw new Error('Discount product not found');
    }
    if (discountProduct.product_discount_active) {
      await this.prisma.product.updateMany({
        where: { productDiscountId: id },
        data: {
          product_price_discount: String(0),
        },
      });
    }
    return this.prisma.productDiscount.delete({
      where: { id: String(id) },
    });
  }
  private calculateDiscountedPrice(
    originalPrice: string,
    discountPercent: number,
  ): string {
    const originalPriceInt = parseInt(originalPrice, 10);
    const discountPrice = originalPriceInt * (1 - discountPercent / 100);
    return discountPrice.toString();
  }
}
