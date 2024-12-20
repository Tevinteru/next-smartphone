import { Brand } from '@prisma/client';
import { axiosInstance } from './axios-instance';
import { ApiRoutes } from './constants';

export const getAll = async () => {
   return (await axiosInstance.get<Brand[]>(ApiRoutes.BRANDS)).data;
};
