import {
  Res,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  HttpStatus,
  UploadedFile,
  HttpException,
  UseInterceptors,
  NotFoundException,
  ParseFilePipeBuilder,
  UseGuards,
} from '@nestjs/common';
import { unlinkSync } from 'fs';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageUploadProduct } from 'src/utils/storage-upload';
import { GaleriesproductService } from './galeriesproduct.service';
import { GaleryProductResponse } from 'src/model/galeriproduct.model';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedResponse } from 'src/model/categoryproduct.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

const MAX_SIZE_IMAGE_UPLOAD = 5 * 1024 * 1024;

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
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /image\/(jpeg|png)/ })
        .addMaxSizeValidator({ maxSize: MAX_SIZE_IMAGE_UPLOAD })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
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
          product_galeries_image: file.filename,
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
  async remove(@Param('id') id: number, @Res() response: Response) {
    try {
      const deletedRecord = await this.galeriproductservice.remove(+id);

      if (deletedRecord) {
        const filePath = `./public/img/product/${deletedRecord.product_galeries_image}`;
        try {
          unlinkSync(filePath);
          console.log(`Deleted image file: ${filePath}`);
        } catch (error) {
          console.error(`Error deleting image file: ${error}`);
        }

        const responseBody = {
          'INFORMATION-RESPONSE': {
            REQUESTNAME: 'DELETE GALERI PRODUCT',
            METHOD: 'DELETE',
            'STATUS-RESPONSE': HttpStatus.OK,
            url: `http://127.0.0.1:3000/galeriesproduct/delete/${id}`,
          },
          'RESPONSE MESSAGE': 'SUCCESS DELETE',
        };

        return response.status(HttpStatus.OK).json(responseBody);
      } else {
        throw new NotFoundException(`Record with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error while deleting gallery:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
