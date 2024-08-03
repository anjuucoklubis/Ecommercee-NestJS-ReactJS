import { z, ZodType } from 'zod';

export class CarouselValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(225),
    image: z.string().min(1).max(225),
    isActive: z.string().min(1).max(225),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(225).optional(),
    image: z.string().min(1).max(225).optional(),
    isActive: z.string().min(1).max(225).optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    id: z.number().min(1).positive(),
  });
}
