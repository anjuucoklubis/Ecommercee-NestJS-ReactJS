import {
  Inject,
  Injectable,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import {
  AssignProductToDiscountRequest,
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from 'src/model/product.model';
import { Prisma } from '@prisma/client';
import { ProductValidation } from './product.validation';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ValidationService } from 'src/common/validation.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    private validationService: ValidationService,
  ) {}
  async create(request: CreateProductRequest): Promise<ProductResponse> {
    try {
      const createProductRequest: CreateProductRequest =
        this.validationService.validate(ProductValidation.CREATE, request);

      const createProduct = await this.prisma.product.create({
        data: {
          ...createProductRequest,
          product_price_discount:
            createProductRequest.product_price_discount ?? '0',
        },
      });

      const response: ProductResponse = {
        id: createProduct.id,
        product_sku: createProduct.product_sku,
        product_name: createProduct.product_name,
        product_description: createProduct.product_description,
        product_short_description: createProduct.product_short_description,
        product_price_original: createProduct.product_price_original,
        product_price_discount: createProduct.product_price_discount,
        product_quantity: createProduct.product_quantity,
        product_weight: createProduct.product_weight,
        categoryProductId: createProduct.categoryProductId,
      };

      return response;
    } catch (error) {
      throw new Error('Failed to create product: ' + error.message);
    }
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id: +id,
      },
      include: {
        CategoryProduct: {
          select: {
            id: true,
            name: true,
          },
        },
        productGalleries: true,
      },
    });
  }

  async update(
    id: number,
    request: UpdateProductRequest,
  ): Promise<ProductResponse> {
    try {
      const updateRequest: UpdateProductRequest =
        this.validationService.validate(ProductValidation.UPDATE, request);
      const productId = parseInt(id.toString(), 10);
      const updatedData: Partial<Prisma.ProductUpdateInput> = {};

      if (updateRequest.product_sku) {
        updatedData.product_sku = updateRequest.product_sku;
      }
      if (updateRequest.product_name) {
        updatedData.product_name = updateRequest.product_name;
      }
      if (updateRequest.product_description) {
        updatedData.product_description = updateRequest.product_description;
      }
      if (updateRequest.product_short_description) {
        updatedData.product_short_description =
          updateRequest.product_short_description;
      }
      if (updateRequest.product_price_original) {
        updatedData.product_price_original =
          updateRequest.product_price_original;
      }
      if (updateRequest.product_price_discount) {
        updatedData.product_price_discount =
          updateRequest.product_price_discount;
      }
      if (updateRequest.product_quantity) {
        updatedData.product_quantity = updateRequest.product_quantity;
      }
      if (updateRequest.product_weight) {
        updatedData.product_weight = updateRequest.product_weight;
      }
      if (updateRequest.categoryProductId) {
        updatedData.CategoryProduct = {
          connect: { id: updateRequest.categoryProductId },
        };
      }

      if (Object.keys(updatedData).length > 0) {
        return await this.prisma.product.update({
          where: {
            id: productId,
          },
          data: updatedData,
          include: {
            CategoryProduct: true,
          },
        });
      } else {
        throw new Error('Nothing to update');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new Error('Validation failed: ' + error.message);
      } else {
        throw new Error('Failed to update product');
      }
    }
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id: +id,
      },
    });
  }

  async assignToDiscount(
    request: AssignProductToDiscountRequest,
  ): Promise<void> {
    try {
      const productDiscountId = request.discountId;
      const productIds = request.productIds;

      // Fetch existing products to validate the IDs
      const existingProducts = await this.prisma.product.findMany({
        where: {
          id: { in: productIds },
        },
        select: { id: true }, // Only get IDs
      });

      const existingProductIds = existingProducts.map((product) => product.id);

      // Check for missing product IDs
      const missingProductIds = productIds.filter(
        (id) => !existingProductIds.includes(id),
      );

      if (missingProductIds.length > 0) {
        throw new Error(
          `Product IDs not found: ${missingProductIds.join(', ')}`,
        );
      }

      // Proceed with the update if all IDs are valid
      await this.prisma.$transaction(
        existingProductIds.map((productId) =>
          this.prisma.product.update({
            where: { id: productId },
            data: { productDiscountId },
          }),
        ),
      );
    } catch (error) {
      throw new Error(
        'Failed to assign products to discount: ' + error.message,
      );
    }
  }
}
