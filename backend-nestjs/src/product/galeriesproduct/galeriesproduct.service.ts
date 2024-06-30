import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';

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
    return this.prisma.productGalleries.delete({
      where: {
        id: +id,
      },
    });
  }
}
