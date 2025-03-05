import { axiosInstance } from './axios-instance';
import { ApiRoutes } from './constants';
import { ProductWithRelations } from '@/@types/prisma';

export const getAll = async () => {
   return (await axiosInstance.get<ProductWithRelations[]>(ApiRoutes.PRODUCTS)).data;
};
