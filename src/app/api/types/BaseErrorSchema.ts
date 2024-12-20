import { z } from 'zod';

import { ErrorSchema } from './ErrorSchema';

export const BaseErrorSchema = ErrorSchema(z.string(), z.object({}));
