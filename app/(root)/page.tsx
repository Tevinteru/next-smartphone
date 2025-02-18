import { Container, Filters, Pagination, SortPopup } from "@/shared/components/shared";
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

          {/* Див товаров */}
          <div className="flex-1">

            {/* Сортировка товаров */}
            <div className="flex justify-end">
              <SortPopup className="mb-4"/>
            </div>

            {/* Список товаров */}
            <div className="flex flex-col gap-16">
              {products.length > 0 ? (
                <ProductsList
                  products={products}
                />
              ) : (
                <p>Нет доступных продуктов</p>
              )}
            </div>
            <div className="flex items-center justify-center gap-6 mt-12">
              <Pagination pageCount={meta.pageCount} currentPage={meta.currentPage} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
