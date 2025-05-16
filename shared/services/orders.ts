import { axiosInstance } from './axios-instance';
import { OrderWithItemsDTO } from './dto/orders';

export const getOrdersByUser = async (userId: number): Promise<OrderWithItemsDTO[]> => {
  const { data } = await axiosInstance.get(`/orders?userId=${userId}`);
  return data;
};
