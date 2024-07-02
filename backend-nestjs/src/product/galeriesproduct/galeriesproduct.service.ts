import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GaleriesproductService {
  constructor(private prisma: PrismaService) {}

  async createMany(galleries: Prisma.ProductGalleriesCreateInput[]) {
    const createdGalleries = await Promise.all(
      galleries.map(async (gallery) => {
        return this.prisma.productGalleries.create({
          data: {
            product_galeries_image: gallery.product_galeries_image,
            product_galeries_thumbnail: gallery.product_galeries_thumbnail,
            Product: {
              connect: { id: Number(gallery.Product.connect.id) },
            },
          },
        });
      }),
    );

    return createdGalleries;
  }

  findAll() {
    return this.prisma.productGalleries.findMany({
      include: {
        Product: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id: +id,
      },
    });
  }

  remove(id: number) {
    try {
      return this.prisma.productGalleries.delete({
        where: { id: +id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Record with ID ${id} not found`);
      }
      throw error;
    }
  }
}
