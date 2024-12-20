import { Roles } from '@constants';
import { z } from 'zod';

type Role = (typeof Roles)[keyof typeof Roles];

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  activated: z.boolean(),
  permissionGroup: z.enum(Object.values(Roles) as [Role, ...Role[]]),
  authorities: z.array(z.object({ authority: z.string() })),
  accountNonExpired: z.boolean(),
  accountNonLocked: z.boolean(),
  credentialsNonExpired: z.boolean(),
});

export type UserSchemaInfer = z.infer<typeof UserSchema>;
