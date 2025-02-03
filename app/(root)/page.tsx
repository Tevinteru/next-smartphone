import { Container, Filters, Pagination } from "@/shared/components/shared";
import { ProductsList } from "@/shared/components/shared/products-list";
import { findProducts, GetSearchParams } from "@/shared/lib/find-products";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: GetSearchParams}) {
  const params = await searchParams;
  const [products, meta] = await findProducts(params);

  return (
    <>
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтраиця */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
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
            <div className="flex items-center gap-6 mt-12">
              <Pagination pageCount={meta.pageCount} currentPage={meta.currentPage} />
              <span className="text-sm text-gray-400">5 из 65</span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
