import { ErrorSchema } from '@api';
import { z } from 'zod';

export const BaseErrorSchema = ErrorSchema(z.string(), z.object({}));
