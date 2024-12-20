import { ProductWithRelations } from "@/@types/prisma";

interface ReturnProps {
  currentProductId: number;
}

export const useProductOptions = (product: ProductWithRelations): ReturnProps => {
  const currentProductId = product.id;

  return {
    currentProductId,
  };
};
