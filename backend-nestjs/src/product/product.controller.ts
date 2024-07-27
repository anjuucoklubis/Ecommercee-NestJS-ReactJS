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
  UseGuards,
  Req,
} from '@nestjs/common';
import { join } from 'path';
import {
  AssignProductToDiscountRequest,
  CreateProductRequest,
  ProductResponse,
  UnauthorizedResponse,
  UpdateProductRequest,
} from 'src/model/product.model';
import { Observable, of } from 'rxjs';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ProductService } from './product.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const logger = new Logger('ProductController');
@ApiTags('Product')
@Controller('product')
@UseGuards(JwtAuthGuard)
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
    @Req() req,
    @Body() request: CreateProductRequest,
  ): Promise<WebResponse<ProductResponse>> {
    try {
      const userId = req.user.id;
      logger.log('User ID: ' + userId);
      logger.log('Create Product Request: ' + JSON.stringify(request));

      const result = await this.productService.create(request, userId);
      logger.log('Create Product Result: ' + JSON.stringify(result));

      if (!result) {
        throw new Error('Failed to create product: Empty result');
      }
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
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
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
  async update(@Param('id') id: string, @Body() body: UpdateProductRequest) {
    try {
      const product = await this.productService.findOne(id);

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
        const updatedProduct = await this.productService.update(id, body);
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
    const deletedRecord = await this.productService.remove(String(id));

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

  @Get('product-image/:imageName')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Get category product image',
  })
  getProfileImage(
    @Param('imageName') imageName,
    @Res() res,
  ): Observable<string> {
    return of(
      res.sendFile(join(process.cwd(), 'public/img/product/' + imageName)),
    );
  }

  @Post('/assign-to-discount')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Products assigned to discount',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async assignToDiscount(
    @Body() request: AssignProductToDiscountRequest,
  ): Promise<WebResponse<void>> {
    try {
      await this.productService.assignToDiscount(request);
      return { data: null };
    } catch (error) {
      throw new HttpException(
        'Failed to assign products to discount: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/remove-discount/:id')
  async removeDiscount(@Param('id') id: string) {
    console.log(`Received request to remove discount for product ID: ${id}`);
    try {
      return await this.productService.removeProductDiscount(id);
    } catch (error) {
      console.error('Error in remove discount endpoint:', error);
      throw new HttpException(
        'Failed to remove product discount',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
