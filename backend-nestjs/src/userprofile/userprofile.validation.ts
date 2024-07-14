import { z, ZodType } from 'zod';

export class UserProfileValidation {
  static readonly CREATE: ZodType = z.object({
    firstname: z.string().min(1).max(225),
    lastname: z.string().min(1).max(225),
    gender: z.string().min(1).max(225),
    birthday: z.string().min(1).max(225),
    telephone: z.string().min(1).max(225),
    image: z.string().min(1).max(225),
  });

  static readonly UPDATE: ZodType = z.object({
    firstname: z.string().min(1).max(225).optional(),
    lastname: z.string().min(1).max(225).optional(),
    gender: z.string().min(1).max(225).optional(),
    birthday: z.string().min(1).max(225).optional(),
    telephone: z.string().min(1).max(225).optional(),
    image: z.string().min(1).max(225).optional(),
  });
}
