import { TokensService } from '@modules/authorization/utils/TokensService.ts';
import axios from 'axios';

export const createInstance = (path: string) => {
  const service = axios.create({
    baseURL: `http://api.lexilift.dragonestia.ru/api${path[0] === '/' ? path : `/${path}`}`,
  });

  service.interceptors.request.use(request => {
    request.headers.Authorization = `Bearer ${TokensService.GetTokens()['accessToken']}`;
    return request;
  });

  return service;
};
