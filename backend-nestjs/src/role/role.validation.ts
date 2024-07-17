import { z, ZodType } from 'zod';

export class UserRoleValidation {
  static readonly CREATE: ZodType = z.object({
    role_name: z.string().min(1).max(225),
    role_description: z.string().min(1).max(225),
  });

  static readonly UPDATE: ZodType = z.object({
    role_name: z.string().min(1).max(225).optional(),
    role_description: z.string().min(1).max(225).optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    id: z.number().min(1).positive(),
  });
}
