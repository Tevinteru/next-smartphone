import { Container, AdaptiveFilters, Pagination, SortPopup } from "@/shared/components/shared";
import { ProductsList } from "@/shared/components/shared/products-list";
import { findProducts, GetSearchParams } from "@/shared/lib/find-products";
import { Suspense } from "react";

export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const [products, meta] = await findProducts(params as GetSearchParams);

  return (
    <>
      <Container className="mt-6 md:mt-6 pb-6 md:pb-14">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-[80px]">
          {/* Фильтрация */}
          <div className="w-full md:w-[250px] px-2 md:px-4">
            <div className="sticky top-4 h-fit"> {/* Добавлен sticky-контейнер */}
            <Suspense>
              <AdaptiveFilters />
            </Suspense>
            </div>
          </div>

          {/* Див товаров */}
          <div className="flex-1">

            {/* Сортировка товаров */}
            <div className="flex justify-end px-2 md:px-4">
              <SortPopup className="mb-2 md:mb-4"/>
            </div>

            {/* Список товаров */}
            <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
              {products.length > 0 ? (
                <ProductsList
                  products={products}
                />
              ) : (
                <p>Нет доступных продуктов</p>
              )}
            </div>
            <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8 lg:mt-12">
              <Pagination pageCount={meta.pageCount} currentPage={meta.currentPage} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
