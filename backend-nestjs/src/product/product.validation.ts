import { z, ZodType } from 'zod';

export class ProductValidation {
  static readonly GALLERY: ZodType = z.object({
    product_galeries_image: z.string().min(1).max(255),
    product_galeries_thumbnail: z.boolean(),
  });

  static readonly CREATE: ZodType = z.object({
    product_sku: z.string().min(1).max(225),
    product_name: z.string().min(1).max(225),
    product_description: z.string().min(1).max(225),
    product_short_description: z.string().min(1).max(50),
    product_price_original: z.string().min(1).max(10000),
    product_price_discount: z.string().min(1).max(10000).optional(),
    product_quantity: z.string().min(1).max(10000),
    product_weight: z.string().min(1).max(500),
    categoryProductId: z.number().min(1).max(225),
  });

  static readonly UPDATE: ZodType = z.object({
    product_sku: z.string().min(1).max(225).optional(),
    product_name: z.string().min(1).max(225).optional(),
    product_description: z.string().min(1).max(225).optional(),
    product_short_description: z.string().min(1).max(50).optional(),
    product_price_original: z.string().min(1).max(10000).optional(),
    product_price_discount: z.string().min(1).max(10000).optional(),
    product_quantity: z.string().min(1).max(10000).optional(),
    product_weight: z.string().min(1).max(500).optional(),
    categoryProductId: z.number().min(1).max(225).optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    id: z.number().min(1).positive(),
  });
}
