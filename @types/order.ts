export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brandId: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  cartId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Order {
  id: number;
  userId: number;
  token: string;
  status: string;
  totalAmount: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
