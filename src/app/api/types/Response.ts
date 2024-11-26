import { IResponse } from '@api';
import { AxiosResponse } from 'axios';

export type Response<T, P> = AxiosResponse<IResponse<T, P>>;
