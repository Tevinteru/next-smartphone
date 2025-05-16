export interface OrderItemDTO {
  productId: number;
  quantity: number;
  price: number;
  name?: string;
}

export interface OrderWithItemsDTO {
  id: number;
  userId: number | null;
  token: string;
  status: string;
  totalAmount: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItemDTO[];
}
