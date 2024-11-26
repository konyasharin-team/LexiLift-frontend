import { Response } from '@api';

export type ResponsePromise<T, P> = Promise<Response<T, P>>;
