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
  async create(
    request: CreateProductRequest,
    userId: string,
  ): Promise<ProductResponse> {
    try {
      const createProductRequest: CreateProductRequest =
        this.validationService.validate(ProductValidation.CREATE, request);
      const { categoryProductId, ...restData } = createProductRequest;
      const product_price_discount =
        createProductRequest.product_price_discount ?? '0';

      const createProduct = await this.prisma.product.create({
        data: {
          ...restData,
          categoryProductId: categoryProductId,
          product_price_discount: product_price_discount,
          userId: userId,
          updatedAt: null,
        },
      });
      console.log('Created Product:', createProduct);
      if (!createProduct) {
        throw new Error('Failed to create product');
      }
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

  findOne(id: string) {
    console.log('Searching for product with ID:', id);
    return this.prisma.product
      .findUnique({
        where: {
          id: id,
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
      })
      .then((product) => {
        console.log('Product found:', product);
        return product;
      })
      .catch((error) => {
        console.error('Error finding product:', error);
        throw error;
      });
  }

  async update(
    id: string,
    request: UpdateProductRequest,
  ): Promise<ProductResponse> {
    try {
      const updateRequest: UpdateProductRequest =
        this.validationService.validate(ProductValidation.UPDATE, request);
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
          connect: { id: Number(updateRequest.categoryProductId) },
        };
      }

      if (Object.keys(updatedData).length > 0) {
        const updatedProduct = await this.prisma.product.update({
          where: {
            id: id,
          },
          data: updatedData,
          include: {
            CategoryProduct: true,
          },
        });
        return {
          id: updatedProduct.id,
          product_sku: updatedProduct.product_sku,
          product_name: updatedProduct.product_name,
          product_description: updatedProduct.product_description,
          product_short_description: updatedProduct.product_short_description,
          product_price_original: updatedProduct.product_price_original,
          product_price_discount: updatedProduct.product_price_discount,
          product_quantity: updatedProduct.product_quantity,
          product_weight: updatedProduct.product_weight,
          categoryProductId: updatedProduct.CategoryProduct.id,
        };
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

  remove(id: string) {
    return this.prisma.product.delete({
      where: {
        id: String(id),
      },
    });
  }

  async assignToDiscount(
    request: AssignProductToDiscountRequest,
  ): Promise<void> {
    try {
      const productDiscountId = request.discountId;
      const productIds = request.productIds.map(String);
      const discount = await this.prisma.productDiscount.findUnique({
        where: { id: productDiscountId },
      });

      if (!discount) {
        throw new Error(`Discount with ID ${productDiscountId} not found`);
      }

      const existingProducts = await this.prisma.product.findMany({
        where: {
          id: { in: productIds },
        },
      });

      const existingProductIds = existingProducts.map((product) => product.id);

      const missingProductIds = productIds.filter(
        (id) => !existingProductIds.includes(id),
      );

      if (missingProductIds.length > 0) {
        throw new Error(
          `Product IDs not found: ${missingProductIds.join(', ')}`,
        );
      }

      await this.prisma.$transaction(
        existingProducts.map((product) => {
          const originalPrice = parseFloat(product.product_price_original);
          let discountPrice = 0;

          if (discount.product_discount_active) {
            const discountAmount =
              (discount.product_discount_percent / 100) * originalPrice;
            discountPrice = originalPrice - discountAmount;
          }

          return this.prisma.product.update({
            where: { id: product.id },
            data: {
              productDiscountId,
              product_price_discount: discountPrice.toString(),
            },
          });
        }),
      );
    } catch (error) {
      throw new Error(
        'Failed to assign products to discount: ' + error.message,
      );
    }
  }
}
