import {
  Res,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  HttpException,
} from '@nestjs/common';
import {
  UnauthorizedResponse,
  DiscountProductResponse,
  CreateDiscountProductRequest,
  UpdateDiscountProductRequest,
} from 'src/model/discountproduct.model';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { DiscountproductService } from './discountproduct.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Discount Product')
@Controller('discountproduct')
@UseGuards(JwtAuthGuard)
export class DiscountproductController {
  constructor(
    private readonly discountproductService: DiscountproductService,
  ) {}

  @Post('/create')
  @ApiOkResponse({
    description: 'OK',
    type: DiscountProductResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async create(
    @Body() request: CreateDiscountProductRequest,
  ): Promise<WebResponse<DiscountProductResponse>> {
    try {
      const result = await this.discountproductService.create(request);
      return {
        data: result,
      };
    } catch (error) {
      throw new Error('Failed to create discount product: ' + error.message);
    }
  }

  @Get('get')
  findAll() {
    return this.discountproductService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id') id: number) {
    return this.discountproductService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOkResponse({
    description: 'OK',
    type: DiscountProductResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() body: UpdateDiscountProductRequest,
  ) {
    try {
      const discountId = parseInt(id.toString(), 10);
      const discountProduct =
        await this.discountproductService.findOne(discountId);

      if (!discountProduct) {
        throw new HttpException(
          'Discount product not found',
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        body.product_discount_name ||
        body.product_discount_description ||
        body.product_discount_percent ||
        body.product_discount_active
      ) {
        const updateDiscountProduct = await this.discountproductService.update(
          discountId,
          body,
        );
        const response = {
          'INFORMATION-RESPONSE': {
            REQUESTNAME: 'UPDATE DISCOUNT PRODUCT',
            METHOD: 'PATCH',
            'STATUS-RESPONSE': HttpStatus.OK,
            url: 'http://127.0.0.1:3000/discountproduct/update/id',
          },
          'RESPONSE-DATA': {
            id: updateDiscountProduct.id,
            product_discount_name: updateDiscountProduct.product_discount_name,
            product_discount_description:
              updateDiscountProduct.product_discount_description,
            product_discount_percent:
              updateDiscountProduct.product_discount_percent,
            product_discount_active:
              updateDiscountProduct.product_discount_active,
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
    const deletedRecord = await this.discountproductService.remove(+id);

    if (deletedRecord) {
      const response = {
        'INFORMATION-RESPONSE': {
          REQUESTNAME: 'DELETE DISCOUNT PRODUCT',
          METHOD: 'DELETE',
          'STATUS-RESPONSE': HttpStatus.OK,
          url: 'http://127.0.0.1:3000/discountproduct/delete/id',
        },
        'RESPONSE-DATA': {
          id: deletedRecord.id,
          product_discount_name: deletedRecord.product_discount_name,
          product_discount_description:
            deletedRecord.product_discount_description,
          product_discount_percent: deletedRecord.product_discount_percent,
          product_discount_active: deletedRecord.product_discount_active,
          createdAt: deletedRecord.createdAt,
          updatedAt: deletedRecord.updatedAt,
        },
      };
      return response;
    } else {
      return response;
    }
  }
}
