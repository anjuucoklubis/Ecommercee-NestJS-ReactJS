import { z, ZodType } from 'zod';

export class CategoryProductValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(225),
    description: z.string().min(1).max(225),
    image: z.string().min(1),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(225).optional(),
    description: z.string().min(1).max(225).optional(),
    image: z.string().min(1).optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    id: z.number().min(1).positive(),
  });
}
