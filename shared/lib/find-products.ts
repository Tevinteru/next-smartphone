import { prisma } from "@/prisma/prisma-client";

// Типы для параметров
export interface GetSearchParams {
  query?: string; // Название смартфона
  sortBy?: string; // Сортировка
  brands?: string; // Фильтрация по брендам
  ram?: string; // Фильтрация по RAM
  storage?: string; // Фильтрация по памяти
  priceFrom?: string; // Минимальная цена
  priceTo?: string; // Максимальная цена
  priceRange?: string; // Диапазон цен
  sort?: string;
  limit?: string;
  page?: string;
}

// Стандартные значения
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100000;

const DEFAULT_LIMIT = 12;
const DEFAULT_PAGE = 1;

// Диапазоны цен
type PriceRangeKey = "under10000" | "10001-18000" | "18001-27000" | "27001-40000" | "above40000";

const priceRanges: Record<PriceRangeKey, { gte: number; lte: number }> = {
  under10000: { gte: 0, lte: 10000 },
  "10001-18000": { gte: 10001, lte: 18000 },
  "18001-27000": { gte: 18001, lte: 27000 },
  "27001-40000": { gte: 27001, lte: 40000 },
  above40000: { gte: 40001, lte: Infinity },
};

export const findProducts = async (params: GetSearchParams) => {
  // Разбор параметров  
  const brandsArr = params.brands?.split(',').map(Number); // Бренды
  const ramArr = params.ram?.split(",").map((r) => `${r} ГБ`);
  const storageArr = params.storage?.split(",").map((s) => `${s} ГБ`);
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const limit = Number(params.limit || DEFAULT_LIMIT);
  const page = Number(params.page || DEFAULT_PAGE);

  // Обработка диапазонов цен через чекбоксы
  let priceFilter: { gte: number; lte: number } = { gte: minPrice, lte: maxPrice };

  if (params.priceRange && priceRanges[params.priceRange as PriceRangeKey]) {
    priceFilter = priceRanges[params.priceRange as PriceRangeKey];
  }
  let orderBy: { name?: "asc" | "desc"; price?: "asc" | "desc" } = { name: "asc" }; // По умолчанию сортируем по имени

  if (params.sort === "name") {
    orderBy = { name: "asc" };
  } else if (params.sort === "price_asc") {
    orderBy = { price: "asc" };
  } else if (params.sort === "price_desc") {
    orderBy = { price: "desc" };
  }
  // Основной запрос
  const result = await prisma.product
    .paginate({
    where: {
      name: {
        contains: params.query || "", // Фильтрация по названию
        mode: "insensitive", // Регистр не имеет значения
      },
      price: priceFilter, // Применяем фильтрацию по цене
      brandId: brandsArr?.length ? { in: brandsArr } : undefined, // Фильтрация по брендам
      AND: [
        ramArr?.length ? {
          smartphoneCharacteristics: {
            some: {
              characteristic: "Оперативная память",
              value: { in: ramArr },
            }
          }
        } : {},

        storageArr?.length ? {
          smartphoneCharacteristics: {
            some: {
              characteristic: "Встроенная память",
              value: { in: storageArr },
            }
          }
        } : {},
      ],
    },
    include: {
      brand: true,
      smartphoneCharacteristics: true,
    },
    orderBy,
  })
  .withPages({
    page,
    limit,
    includePageCount: true,
  });

  return result;
};