import { Container } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductForm } from "@/shared/components/shared/product-form";
import { ReactNode } from "react";


export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include:{
      smartphoneCharacteristics: true,
    }
   
  });
  if (!product) {
    return notFound();
  }
  
  return (
    <Container className="flex flex-col pt-10">
    <ProductForm product={product} />
  </Container>
  );
}