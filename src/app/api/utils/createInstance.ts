import axios from 'axios';

export const createInstance = (path: string) => {
  const service = axios.create({
    baseURL: `http://185.127.26.21:9000/api${path[0] === '/' ? path : `/${path}`}`,
  });

  service.interceptors.request.use(request => {
    request.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2YzQzMGQ1Ni05MzVkLTRmZGEtYWZkMi0xZTVlNTYxNDZhY2IiLCJpYXQiOjE3MzIxMDY2MDIsImV4cCI6MTczMjE5MzAwMn0.PTGjxMqY8dA5krEB5K4p_bLEM5JBgkXs-4Io9ks8yCM';
    return request;
  });

  return service;
};
