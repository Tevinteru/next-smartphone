import { Container } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductForm } from "@/shared/components/shared/product-form";


export default async function ProductPage({ params }: { params: { id: string } }) {
  // Ожидаем params
  const { id } = await params;

  // Преобразуем id в число
  const productId = Number(id);

  // Проверка на валидность id
  if (isNaN(productId)) {
    return notFound();  // Если id невалидный, показываем 404
  }

  const product = await prisma.product.findFirst({
    where: { id: productId },
    include:{
      smartphoneCharacteristics:  {
        include: {
          category: true,
        },
      },
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