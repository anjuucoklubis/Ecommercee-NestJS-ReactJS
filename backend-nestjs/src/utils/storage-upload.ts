import { extname } from 'path';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const StorageUploadCategory = {
  storage: diskStorage({
    destination: './public/img/category',
    filename: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(
          new BadRequestException('Uploaded file is not an image'),
          null,
        );
      }
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};

export const StorageUploadProduct = {
  storage: diskStorage({
    destination: './public/img/product',
    filename: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(
          new BadRequestException('Uploaded file is not an image'),
          null,
        );
      }
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
