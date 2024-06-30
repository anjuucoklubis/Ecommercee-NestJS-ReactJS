import { z, ZodType } from 'zod';

export class GalleryProductValidation {
  static readonly CREATE: ZodType = z.object({
    product_galeries_image: z.string().min(1).max(225),
    product_galeries_thumbnail: z.boolean().optional(),
    productId: z.number().min(1).max(225),
  });

  static readonly UPDATE: ZodType = z.object({
    product_galeries_image: z.string().min(1).max(225).optional(),
    product_galeries_thumbnail: z.boolean().optional(),
    productId: z.number().min(1).max(225).optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    id: z.number().min(1).positive(),
  });
}
