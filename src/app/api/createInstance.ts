import axios from 'axios';

export const createInstance = (path: string) => {
  return axios.create({
    baseURL: `http://proxy.dragonestia.ru:9000${path[0] === '/' ? path : `/${path}`}`,
  });
};
