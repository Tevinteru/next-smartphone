import { Container } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductForm } from "@/shared/components/shared/product-form";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;  // Using `await` to resolve params

  // Convert id to a number
  const productId = Number(id);

  // Validate the productId
  if (isNaN(productId)) {
    return notFound();  // If the id is invalid, return a 404
  }

  // Fetch the product using the productId
  const product = await prisma.product.findFirst({
    where: { id: productId },
    include: {
      smartphoneCharacteristics: {
        include: {
          category: true, // Include categories for characteristics
        },
      },
    },
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
