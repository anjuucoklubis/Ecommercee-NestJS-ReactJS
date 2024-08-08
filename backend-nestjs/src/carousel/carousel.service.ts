import {
  CarouselResponse,
  CreateCarouselRequest,
  UpdateCarouselRequest,
} from 'src/model/carousel.model';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CarouselValidation } from './carousel.validation';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationService } from 'src/common/validation.service';

@Injectable()
export class CarouselService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}
  async create(request: CreateCarouselRequest): Promise<CarouselResponse> {
    try {
      const createCarouselRequest: CreateCarouselRequest =
        this.validationService.validate(CarouselValidation.CREATE, request);
      const createCarousel = await this.prisma.carousel.create({
        data: {
          ...createCarouselRequest,
          updateAt: null,
        },
      });
      console.log('Created carousel:', createCarousel);
      if (!createCarousel) {
        throw new Error('Failed to create carousel');
      }
      const response: CarouselResponse = {
        id: createCarousel.id,
        name: createCarousel.name,
        image: createCarousel.image,
        isActive: createCarousel.isActive,
      };
      return response;
    } catch (error) {
      throw new Error('Failed to create carousel: ' + error.message);
    }
  }

  async findAll() {
    return this.prisma.carousel.findMany();
  }

  async findOne(id: number) {
    return this.prisma.carousel.findUnique({
      where: {
        id: +id,
      },
    });
  }

  async update(
    id: number,
    request: UpdateCarouselRequest,
  ): Promise<CarouselResponse> {
    try {
      const updateCarouseRequest: UpdateCarouselRequest =
        this.validationService.validate(CarouselValidation.UPDATE, request);

      const updateData: Partial<Prisma.CarouselUpdateInput> = {};
      if (updateCarouseRequest.name) {
        updateData.name = updateCarouseRequest.name;
      }
      if (updateCarouseRequest.image) {
        updateData.image = updateCarouseRequest.image;
      }
      if (updateCarouseRequest.isActive) {
        updateData.isActive = updateCarouseRequest.isActive;
      }
      if (Object.keys(updateData).length > 0) {
        return await this.prisma.carousel.update({
          where: {
            id: id,
          },
          data: updateData,
        });
      } else {
        throw new Error('Nothing to update');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new Error('Validation failed: ' + error.message);
      } else {
        throw new Error('Failed to update carousel');
      }
    }
  }

  async remove(id: number) {
    return this.prisma.carousel.delete({
      where: {
        id: +id,
      },
    });
  }
}
