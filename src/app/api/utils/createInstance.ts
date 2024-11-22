import axios from 'axios';

export const createInstance = (path: string) => {
  const service = axios.create({
    baseURL: `http://185.127.26.21:9000/api${path[0] === '/' ? path : `/${path}`}`,
  });

  service.interceptors.request.use(request => {
    request.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MzhiNjExMS02NGFlLTRiYTAtODRjMy0xN2RmNDg2M2RjYTEiLCJpYXQiOjE3MzIyODkxMzMsImV4cCI6MTczMjM3NTUzM30.RbMdFne2dS_8JcVWMgrqoQjrzezWaX59upHTBsJBBNA';
    return request;
  });

  return service;
};
