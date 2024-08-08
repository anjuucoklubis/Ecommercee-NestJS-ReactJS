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
  HttpException,
} from '@nestjs/common';
import {
  CarouselResponse,
  CreateCarouselRequest,
  UnauthorizedResponse,
  UpdateCarouselRequest,
} from 'src/model/carousel.model';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CarouselService } from './carousel.service';
@ApiTags('Carousel')
@Controller('carousel')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
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
    @Body() request: CreateCarouselRequest,
  ): Promise<WebResponse<CarouselResponse>> {
    try {
      const result = await this.carouselService.create(request);
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

  @Get('/getforLanding')
  @ApiOkResponse({
    description: 'OK',
    type: CarouselResponse,
  })
  @HttpCode(200)
  findAllforLanding() {
    return this.carouselService.findAll();
  }

  @Get('/get/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: CarouselResponse,
  })
  @HttpCode(200)
  findOne(@Param('id') id: number) {
    return this.carouselService.findOne(+id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: CarouselResponse,
  })
  @HttpCode(200)
  async update(@Param('id') id: number, @Body() body: UpdateCarouselRequest) {
    try {
      const carouselId = parseInt(id.toString(), 10);
      const carousel = await this.carouselService.findOne(carouselId);

      if (!carousel) {
        throw new HttpException('Carousel not found', HttpStatus.NOT_FOUND);
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
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: CarouselResponse,
  })
  @HttpCode(200)
  async remove(@Param('id') id: number, @Res() response: Response) {
    const deletedRecord = await this.carouselService.remove(+id);

    if (deletedRecord) {
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
}
