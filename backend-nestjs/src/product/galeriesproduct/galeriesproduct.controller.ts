import {
  Res,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageUploadProduct } from 'src/utils/storage-upload';
import { GaleriesproductService } from './galeriesproduct.service';
import { GaleryProductResponse } from 'src/model/galeriproduct.model';
import { UnauthorizedResponse } from 'src/model/categoryproduct.model';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Galeries Product')
@Controller('galeriesproduct')
@UseGuards(JwtAuthGuard)
export class GaleriesproductController {
  constructor(private galeriproductservice: GaleriesproductService) {}

  @Post('create/:id')
  @UseInterceptors(
    FileInterceptor('product_galeries_image', StorageUploadProduct),
  )
  @ApiOkResponse({
    description: 'OK',
    type: GaleryProductResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  async create(
    @Res() res: Response,
    @Body() body: Prisma.ProductGalleriesCreateInput,
    @Param('id') id: number,
  ): Promise<any> {
    try {
      const product = await this.galeriproductservice.findOne(id);

      if (!product) {
        throw new NotFoundException(`Produk dengan ID ${id} tidak ditemukan`);
      }

      const createdGalleryData = await this.galeriproductservice.createMany([
        {
          product_galeries_image: body.product_galeries_image,
          product_galeries_thumbnail: false,
          Product: { connect: { id: String(id) } },
        },
      ]);

      const responseData: GaleryProductResponse = {
        id: createdGalleryData[0].id,
        product_galeries_image: createdGalleryData[0].product_galeries_image,
        product_galeries_thumbnail:
          createdGalleryData[0].product_galeries_thumbnail,
        productId: Number(createdGalleryData[0].productId),
      };

      const response = {
        'INFORMATION-RESPONSE': {
          REQUESTNAME: 'CREATE GALLERY PRODUCT',
          METHOD: 'POST',
          'STATUS-RESPONSE': HttpStatus.CREATED,
          url: `http://127.0.0.1:3000/galeriesproduct/create/${id}`,
        },
        'RESPONSE-DATA': responseData,
      };

      return res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      console.error('Error while creating galleries:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: number) {
    return await this.galeriproductservice.remove(+id);
  }
}
