import { z, ZodType } from 'zod';

export class DiscountProductValidation {
  static readonly CREATE: ZodType = z.object({
    product_discount_name: z.string().min(1).max(225),
    product_discount_description: z.string().min(1).max(225),
    product_discount_percent: z.number().min(1).max(100),
    product_discount_active: z.boolean(),
  });

  static readonly UPDATE: ZodType = z.object({
    product_discount_name: z.string().min(1).max(225).optional(),
    product_discount_description: z.string().min(1).max(225).optional(),
    product_discount_percent: z.number().min(1).max(100).optional(),
    product_discount_active: z.boolean().optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    id: z.number().min(1).positive(),
  });
}
