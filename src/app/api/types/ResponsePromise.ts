import { IResponse } from '@api';
import { AxiosResponse } from 'axios';

export type ResponsePromise<T, P> = Promise<AxiosResponse<IResponse<T, P>>>;
