export interface CartItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  className?: string;
  disabled?: boolean;
}