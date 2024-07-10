import {
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Controller,
  HttpException,
  // UseGuards,
} from '@nestjs/common';
import {
  CreateProductRequest,
  ProductResponse,
  UnauthorizedResponse,
  UpdateProductRequest,
} from 'src/model/product.model';
import { WebResponse } from 'src/model/web.model';
import { ProductService } from './product.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('product')
// @UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @ApiOkResponse({
    description: 'OK',
    type: ProductResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async create(
    @Body() request: CreateProductRequest,
  ): Promise<WebResponse<ProductResponse>> {
    try {
      const result = await this.productService.create(request);
      return {
        data: result,
      };
    } catch (error) {
      throw new Error('Failed to create product: ' + error.message);
    }
  }

  @Get('get')
  findAll() {
    return this.productService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOkResponse({
    description: 'OK',
    type: ProductResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async update(@Param('id') id: number, @Body() body: UpdateProductRequest) {
    try {
      const productId = parseInt(id.toString(), 10);
      const product = await this.productService.findOne(productId);

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      if (
        body.product_sku ||
        body.product_name ||
        body.product_description ||
        body.product_short_description ||
        body.product_price_original ||
        body.product_price_discount ||
        body.product_quantity ||
        body.product_weight ||
        body.categoryProductId
      ) {
        const updatedProduct = await this.productService.update(
          productId,
          body,
        );
        const response = {
          'INFORMATION-RESPONSE': {
            REQUESTNAME: 'UPDATE PRODUCT',
            METHOD: 'PATCH',
            'STATUS-RESPONSE': HttpStatus.OK,
            url: 'http://127.0.0.1:3000/product/update/id',
          },
          'RESPONSE-DATA': {
            id: updatedProduct.id,
            product_sku: updatedProduct.product_sku,
            product_name: updatedProduct.product_name,
            product_description: updatedProduct.product_description,
            product_short_description: updatedProduct.product_short_description,
            product_price_original: updatedProduct.product_price_original,
            product_price_discount: updatedProduct.product_price_discount,
            product_quantity: updatedProduct.product_quantity,
            product_weight: updatedProduct.product_weight,
            categoryProductId: updatedProduct.categoryProductId,
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
    const deletedRecord = await this.productService.remove(+id);

    if (deletedRecord) {
      const response = {
        'INFORMATION-RESPONSE': {
          REQUESTNAME: 'DELETE PRODUCT',
          METHOD: 'DELETE',
          'STATUS-RESPONSE': HttpStatus.OK,
          url: 'http://127.0.0.1:3000/product/delete/id',
        },
        'RESPONSE-DATA': {
          id: deletedRecord.id,
          product_sku: deletedRecord.product_sku,
          product_name: deletedRecord.product_name,
          product_description: deletedRecord.product_description,
          product_short_description: deletedRecord.product_short_description,
          product_price_original: deletedRecord.product_price_original,
          product_price_discount: deletedRecord.product_price_discount,
          product_quantity: deletedRecord.product_quantity,
          product_weight: deletedRecord.product_weight,
          categoryProductId: deletedRecord.categoryProductId,
        },
      };
      return response;
    } else {
      return response;
    }
  }
}
