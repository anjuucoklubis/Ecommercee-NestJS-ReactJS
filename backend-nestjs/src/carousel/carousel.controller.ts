import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  UploadedFile,
  HttpException,
  UseInterceptors,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { join } from 'path';
import * as sharp from 'sharp';
import {
  CarouselResponse,
  CreateCarouselRequest,
  UnauthorizedResponse,
  UpdateCarouselRequest,
} from 'src/model/carousel.model';
import { Observable, of } from 'rxjs';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CarouselService } from './carousel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, unlinkSync, writeFileSync } from 'fs';
import { StorageUploadCarousel } from 'src/utils/storage-upload';

const MAX_IMAGE_UPLOAD = 5 * 1024 * 1024;

@ApiTags('Carousel')
@Controller('carousel')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', StorageUploadCarousel))
  @ApiOkResponse({
    description: 'OK',
    type: CarouselResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /image\/(jpeg|png)/ })
        .addMaxSizeValidator({ maxSize: MAX_IMAGE_UPLOAD })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() request: CreateCarouselRequest,
  ): Promise<WebResponse<CarouselResponse>> {
    try {
      if (!file || !file.buffer) {
        console.log('File received:', file);
        throw new HttpException(
          'No image file uploaded or buffer is empty',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const image = sharp(file.buffer);
      const { width, height } = await image.metadata();
      console.log('Image dimensions:', { width, height });

      if (width < 1920 || height < 600) {
        throw new HttpException(
          `Image harus (1920 x 600), image anda (${width}x${height})`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const filePath = `./public/img/carousel/${file.filename}`;
      writeFileSync(filePath, file.buffer);
      request.image = file.filename;
      const result = await this.carouselService.create(file, request);
      if (!result) {
        throw new HttpException(
          'Failed to create carousel: Empty result',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        data: result,
      };
    } catch (error) {
      console.error('Error creating carousel:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: CarouselResponse,
  })
  @HttpCode(200)
  findAll() {
    return this.carouselService.findAll();
  }

  @Get('/get/:id')
  @ApiOkResponse({
    description: 'OK',
    type: CarouselResponse,
  })
  @HttpCode(200)
  findOne(@Param('id') id: number) {
    return this.carouselService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOkResponse({
    description: 'OK',
    type: CarouselResponse,
  })
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image', StorageUploadCarousel))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateCarouselRequest,
  ) {
    try {
      const carouselId = parseInt(id.toString(), 10);
      const carousel = await this.carouselService.findOne(carouselId);

      if (!carousel) {
        throw new HttpException('Carousel not found', HttpStatus.NOT_FOUND);
      }

      if (file && file.filename) {
        const oldImagePath = `./public/img/carousel/${carousel.image}`;
        if (existsSync(oldImagePath)) {
          unlinkSync(oldImagePath);
          console.log(`Deleted old image file: ${oldImagePath}`);
        } else {
          console.log(`File not found: ${oldImagePath}`);
        }

        body.image = file.filename;
      }
      if (body.name || body.image) {
        const updatedCarousel = await this.carouselService.update(
          carouselId,
          body,
        );
        const response = {
          'INFORMATION-RESPONSE': {
            REQUESTNAME: 'UPDATE CAROUSEL',
            METHOD: 'PATCH',
            'STATUS-RESPONSE': HttpStatus.OK,
            url: 'http://127.0.0.1:3000/carousel/update/id',
          },
          'RESPONSE-DATA': {
            id: updatedCarousel.id,
            name: updatedCarousel.name,
            image: updatedCarousel.image,
            isActive: updatedCarousel.isActive,
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
  @ApiOkResponse({
    description: 'OK',
    type: CarouselResponse,
  })
  @HttpCode(200)
  async remove(@Param('id') id: number, @Res() response: Response) {
    const deletedRecord = await this.carouselService.remove(+id);

    if (deletedRecord) {
      const filePath = `./public/img/carousel/${deletedRecord.image}`;
      try {
        unlinkSync(filePath);
        console.log(`Deleted image file: ${filePath}`);
      } catch (error) {
        console.error(`Error deleting image file: ${error}`);
      }
      const response = {
        'INFORMATION-RESPONSE': {
          REQUESTNAME: 'DELETE CAROUSEL',
          METHOD: 'DELETE',
          'STATUS-RESPONSE': HttpStatus.OK,
          url: 'http://127.0.0.1:3000/carousel/delete/id',
        },
        'RESPONSE-DATA': {
          id: deletedRecord.id,
          name: deletedRecord.name,
          image: deletedRecord.image,
          isActive: deletedRecord.isActive,
          createdAt: deletedRecord.createdAt,
          updateAt: deletedRecord.updateAt,
        },
      };
      return response;
    } else {
      return response;
    }
  }

  @Get('carousel-image/:imageName')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Get category carousel image',
  })
  getProfileImage(
    @Param('imageName') imageName,
    @Res() res,
  ): Observable<string> {
    return of(
      res.sendFile(join(process.cwd(), 'public/img/carousel/' + imageName)),
    );
  }
}
