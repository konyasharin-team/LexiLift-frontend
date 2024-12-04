import { Params } from 'react-router-dom';

export type Middleware<T> = (params: Readonly<Params<string>>) => Partial<T>;
