import { Container, Filters } from "@/shared/components/shared";
import { ProductsList } from "@/shared/components/shared/products-list";
import { findProducts, GetSearchParams } from "@/shared/lib/find-products";

export default async function Home({ searchParams }: { searchParams: GetSearchParams}) {
  const products = await findProducts(searchParams);

  return (
    <>
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтраиця */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {products.length > 0 ? (
                <ProductsList
                  products={products} // Передаем весь массив продуктов
                />
              ) : (
                <p>Нет доступных продуктов</p> // Добавляем сообщение, если нет продуктов
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
