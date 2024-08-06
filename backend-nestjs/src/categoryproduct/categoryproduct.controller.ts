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
} from '@nestjs/common';
import { join } from 'path';
import { Observable, of } from 'rxjs';

import {
  UnauthorizedResponse,
  CategoryProductResponse,
  CreateCategoryProductRequest,
  UpdateCategoryProductRequest,
} from 'src/model/categoryproduct.model';
import { existsSync, unlinkSync } from 'fs';
import { WebResponse } from 'src/model/web.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageUploadCategory } from 'src/utils/storage-upload';
import { CategoryproductService } from './categoryproduct.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Category Product')
@Controller('categoryproduct')
export class CategoryproductController {
  constructor(
    private readonly categoryproductService: CategoryproductService,
  ) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', StorageUploadCategory))
  @ApiOkResponse({
    description: 'OK',
    type: CategoryProductResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  async create(
    @Body() request: CreateCategoryProductRequest,
  ): Promise<WebResponse<CategoryProductResponse>> {
    try {
      const result = await this.categoryproductService.create(request);
      return {
        data: result,
      };
    } catch (error) {
      throw new Error('Failed to create category product: ' + error.message);
    }
  }

  @Get('get')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.categoryproductService.findAll();
  }

  @Get('getallcategory-home')
  findAllForHome() {
    return this.categoryproductService.findAll();
  }

  @Get('/get/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.categoryproductService.findOne(+id);
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: CategoryProductResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: UnauthorizedResponse,
  })
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image', StorageUploadCategory))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateCategoryProductRequest,
  ) {
    try {
      const categoryId = parseInt(id.toString(), 10);
      const categoryProduct =
        await this.categoryproductService.findOne(categoryId);

      if (!categoryProduct) {
        throw new HttpException(
          'Category product not found',
          HttpStatus.NOT_FOUND,
        );
      }

      if (file && file.filename) {
        const oldImagePath = `./public/img/category/${categoryProduct.image}`;
        if (existsSync(oldImagePath)) {
          unlinkSync(oldImagePath);
          console.log(`Deleted old image file: ${oldImagePath}`);
        } else {
          console.log(`File not found: ${oldImagePath}`);
        }

        body.image = file.filename;
      }
      if (body.name || body.image) {
        const updatedProduct = await this.categoryproductService.update(
          categoryId,
          body,
        );
        const response = {
          'INFORMATION-RESPONSE': {
            REQUESTNAME: 'UPDATE CATEGORY PRODUCT',
            METHOD: 'PATCH',
            'STATUS-RESPONSE': HttpStatus.OK,
            url: 'http://127.0.0.1:3000/category-product/update/id',
          },
          'RESPONSE-DATA': {
            id: updatedProduct.id,
            name: updatedProduct.name,
            image: updatedProduct.image,
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
  async remove(@Param('id') id: number, @Res() response: Response) {
    const deletedRecord = await this.categoryproductService.remove(+id);

    if (deletedRecord) {
      const filePath = `./public/img/category/${deletedRecord.image}`;
      try {
        unlinkSync(filePath);
        console.log(`Deleted image file: ${filePath}`);
      } catch (error) {
        console.error(`Error deleting image file: ${error}`);
      }
      const response = {
        'INFORMATION-RESPONSE': {
          REQUESTNAME: 'DELETE CATEGORY PRODUCT',
          METHOD: 'DELETE',
          'STATUS-RESPONSE': HttpStatus.OK,
          url: 'http://127.0.0.1:3000/category-product/delete/id',
        },
        'RESPONSE-DATA': {
          id: deletedRecord.id,
          name: deletedRecord.name,
          image: deletedRecord.image,
          createdAt: deletedRecord.createdAt,
          updatedAt: deletedRecord.updatedAt,
        },
      };
      return response;
    } else {
      return response;
    }
  }

  @Get('categoryproduct-image/:imageName')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Get category product image',
  })
  getCategoriesImage(
    @Param('imageName') imageName,
    @Res() res,
  ): Observable<string> {
    return of(
      res.sendFile(join(process.cwd(), 'public/img/category/' + imageName)),
    );
  }

  @Get('categoryproduct-image-home/:imageName')
  @ApiOkResponse({
    description: 'Get category product image for homepage',
  })
  getCategoriesImageforHome(
    @Param('imageName') imageName,
    @Res() res,
  ): Observable<string> {
    return of(
      res.sendFile(join(process.cwd(), 'public/img/category/' + imageName)),
    );
  }
}
