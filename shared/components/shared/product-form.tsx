"use client";

import React from "react";
import toast from "react-hot-toast";
import { useCartStore } from "@/shared/store/cart";
import { ProductWithRelations } from "@/@types/prisma";
import { ProductFormDetails } from "./product-form-details";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {

  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  const handleSubmit = async () => {
    try {
      await addCartItem({
        productId: product.id,
      });

      toast.success(product.name + " добавлена в корзину");

      _onSubmit?.();
    } catch (err) {
      toast.error("Не удалось добавить товар в корзину");
      console.error(err);
    }
  };

  return (
    <ProductFormDetails
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={handleSubmit}
      characteristics={product.smartphoneCharacteristics}
      loading={loading}
      description={product.description}
      price={product.price}
    />
  );
};