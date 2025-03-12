import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

type SmartphoneCharacteristicData = {
  smartphoneId: number;
  characteristic: string;
  value: string;
  categoryId: number;

};
type ProductsData = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brandId: number;
};


async function up() {
  // Используем транзакцию для всех операций
  await prisma.$transaction(async (prisma) => {
    // 1. Создание пользователей
    await prisma.user.createMany({
      data: [
        { fullName: "Alexey", email: "alex@test.ru", password: hashSync("123", 10), role: "USER" },
        { fullName: "Petrov", email: "petr@test.ru", password: hashSync("123", 10), role: "USER" },
        { fullName: "Ivanov", email: "ivan@test.ru", password: hashSync("123", 10), role: "USER" },
        { fullName: "Sidorov", email: "sidorov@test.ru", password: hashSync("123", 10), role: "USER" },
        { fullName: "Misha", email: "misha@test.ru", password: hashSync("123", 10), role: "USER" },
        { fullName: "Admin", email: "admin@test.ru", password: hashSync("123", 10), role: "ADMIN" },
      ],
    });
  });

  // 2. Список брендов
  const brandsData = [
    { name: 'Apple' },
    { name: 'Samsung' },
    { name: 'Xiaomi' },
    { name: 'OnePlus' },
    { name: 'Oppo' },
    { name: 'Realme' },
    { name: 'Sony' },
    { name: 'Huawei' },
    { name: 'Nokia' },
    { name: 'Google' },
  ];

  await prisma.$transaction(async (prisma) => {
    await prisma.brand.createMany({
      data: brandsData,
    });
  });

  // Получаем все бренды с id после создания
  const brands = await prisma.brand.findMany();

  // 3. Список категорий характеристик
  const categoriesData = [
    { name: 'Экран' },
    { name: 'Память' },
    { name: 'Камера' },
    { name: 'Корпус' },
    { name: 'Процессор и ядра' },
    { name: 'Аккумулятор' },
    { name: 'Безопасность' },
    { name: 'Общая информация' },
  ];

  // Проверяем, существуют ли категории, и если нет, то добавляем
  await prisma.$transaction(async (prisma) => {
    for (const category of categoriesData) {
      const existingCategory = await prisma.characteristicCategory.findFirst({
        where: { name: category.name },
      });
      if (!existingCategory) {
        await prisma.characteristicCategory.create({
          data: category,
        });
      }
    }
  });

  // Получаем все категории после добавления
  const categories = await prisma.characteristicCategory.findMany();

  // 3. Списки случайных данных для продуктов и характеристик
  const phoneNames = ['Pro', 'Ultra', 'Max', 'Lite', 'Plus', 'Note', 'A', 'X', 'S', 'Edge', 'Power', 'Zoom', 'Vision', 'Neo', 'GT'];
  const phoneDescriptions = [
    'Потрясающий смартфон с невероятной камерой и высокой производительностью.',
    'Идеальный выбор для тех, кто ценит стиль и функциональность.',
    'Надежный и мощный смартфон для повседневных задач и развлечений.',
    'Смартфон с большим экраном и мощным аккумулятором для длительного использования.',
    'Современный смартфон с передовыми технологиями и стильным дизайном.',
    'Лучший смартфон в своем классе с отличным соотношением цены и качества.',
    'Инновационный смартфон с уникальными функциями и возможностями.',
    'Премиальный смартфон для самых требовательных пользователей.',
    'Компактный и удобный смартфон для активного образа жизни.',
    'Доступный смартфон с хорошими характеристиками и надежной работой.',
  ];

  // Генерация характеристик
  const characteristicTemplates = [
    {
      characteristic: 'Экран',
      subCharacteristics: [
        { name: 'Диагональ экрана', values: ['6.1"', '6.3"', '6.4"', '6.5"', '6.7"', '6.8"'] },
        { name: 'Разрешение экрана', values: ['2160 x 1080 px', '2340 x 1080 px', '2400 x 1080 px', '2520 x 1080 px', '2778 x 1284 px'] },
        { name: 'Тип экрана', values: ['IPS', 'OLED', 'AMOLED', 'Super AMOLED', 'Dynamic AMOLED 2X'] },
        { name: 'Частота обновления', values: ['60 Гц', '90 Гц', '120 Гц', '144 Гц'] },
        { name: 'Макс. яркость', values: ['800 нит', '1000 нит', '1200 нит', '1500 нит', '2000 нит', '2600 нит'] },
      ],
    },
    {
      characteristic: 'Память',
      subCharacteristics: [
        { name: 'Оперативная память', values: ['3 ГБ', '4 ГБ', '6 ГБ', '8 ГБ', '12 ГБ'] },
        { name: 'Встроенная память', values: ['64 ГБ', '128 ГБ', '256 ГБ', '512 ГБ', '1024 ГБ'] },
      ],
    },
    {
      characteristic: 'Камера',
      subCharacteristics: [
        { name: 'Основная камера', values: ['12 Мп', '48 Мп', '50 Мп', '64 Мп', '108 Мп'] },
        { name: 'Фронтальная', values: ['8 Мп', '12 Мп', '16 Мп', '32 Мп'] },
        { name: 'Разрешение видео', values: ['Full HD 1920 x 1080 / 60 fps', 'UHD 4K 3840 x 2160 / 60 fps', 'UHD 8K 7680 x 4320 / 30 fps'] },
      ],
    },
    {
      characteristic: 'Корпус',
      subCharacteristics: [
        { name: 'Материал', values: ['Пластик', 'Металл', 'Стекло', 'Металл, стекло'] },
        { name: 'Вес', values: ['150 г', '160 г', '170 г', '180 г', '190 г', '200 г'] },
        { name: 'Высота', values: ['140 мм', '145 мм', '150 мм', '155 мм', '160 мм'] },
        { name: 'Ширина', values: ['65 мм', '70 мм', '75 мм', '80 мм'] },
        { name: 'Толщина', values: ['7 мм', '7.5 мм', '8 мм', '8.5 мм', '9 мм'] },
      ],
    },
    {
      characteristic: 'Процессор и ядра',
      subCharacteristics: [
        { name: 'Процессор', values: ['Snapdragon 8 Gen 2', 'Snapdragon 8 Gen 3', 'Exynos 2200', 'Exynos 2400', 'Dimensity 9200+', 'Qualcomm Snapdragon 8 Elite for Galaxy'] },
        { name: 'Количество ядер', values: ['8', '10'] },
      ],
    },
    {
      characteristic: 'Аккумулятор',
      subCharacteristics: [
        { name: 'Ёмкость аккумулятора', values: ['3500 мАч', '4000 мАч', '4500 мАч', '5000 мАч'] },
        { name: 'Быстрая зарядка', values: ['Да', 'Нет'] },
      ],
    },
    {
      characteristic: 'Безопасность',
      subCharacteristics: [
        { name: 'Сканер отпечатков пальцев', values: ['Да', 'Нет', 'Под экраном', 'Боковой'] },
        { name: 'Распознование лица', values: ['Да', 'Нет'] },
      ],
    },
    {
      characteristic: 'Общая информация',
      subCharacteristics: [
        { name: 'Год выпуска', values: ['2023', '2024', '2025'] },
        { name: 'Операционная система', values: ['Android 13', 'Android 14', 'Android 15', 'iOS 16', 'iOS 17', 'iOS 18'] },
        { name: 'Cтрана производства', values: ['Китай', 'Вьетнам', 'Индия'] },
      ],
    },
  ];

  const getRandomImage = () => {
    const imageFolderPath = path.join(process.cwd(), 'public', 'assets', 'product-images');
    const imageFiles = fs.readdirSync(imageFolderPath);
  
    // Выбираем случайное изображение
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    return `/assets/product-images/${randomImage}`;
  };

  // Генерация продуктов
  const productsData: ProductsData[] = [];
  for (let i = 0; i < 100; i++) {
    const brand = faker.helpers.arrayElement(brands);

    // Генерация названия и описания продукта
    const productName = `${brand.name} ${faker.helpers.arrayElement(phoneNames)} ${faker.number.int({ min: 1, max: 20 })}`;
    const productDescription = faker.helpers.arrayElement(phoneDescriptions);

    productsData.push({
      name: productName,
      description: productDescription,
      price: faker.number.int({ min: 4999, max: 100500 }),
      imageUrl: getRandomImage(),
      brandId: brand.id,
    });
  }

  await prisma.$transaction(async (prisma) => {
    await prisma.product.createMany({
      data: productsData,
    });
  });

  // Генерация характеристик для каждого продукта
  const smartphoneCharacteristicsData: SmartphoneCharacteristicData[] = [];
  const createdProducts = await prisma.product.findMany();

  for (const product of createdProducts) {
    for (const category of characteristicTemplates) {
      const foundCategory = categories.find(cat => cat.name === category.characteristic);
  
      if (foundCategory) {
        const categoryId = foundCategory.id;
  
        for (const subCharacteristic of category.subCharacteristics) {
          const value = faker.helpers.arrayElement(subCharacteristic.values);
          smartphoneCharacteristicsData.push({
            smartphoneId: product.id,
            characteristic: subCharacteristic.name,
            value,
            categoryId: categoryId,
          });
        }
      } else {
        console.warn(`Категория с названием "${category.characteristic}" не найдена.`);
      }
    }
  }

  await prisma.$transaction(async (prisma) => {
    await prisma.smartphoneCharacteristic.createMany({
      data: smartphoneCharacteristicsData,
    });
  });

  const products = await prisma.product.findMany();

  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.findMany({
      where: { role: "USER" },
    });
  
    if (!user) {
      throw new Error("Пользователь с ролью USER не найден");
    }
    const items = [
      {
        productId: products[i].id,
        quantity: 1,
        price: products[i].price,
      },
    ];

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const token = faker.string.uuid();

    await prisma.order.create({
      data: {
        userId: user[i].id,
        items: items,
        totalAmount: totalAmount,
        status: "PENDING",
        fullName: user[i].fullName,
        email: user[i].email,
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        comment: faker.lorem.sentence(),
        token: token,
      },
    });
  }

  console.log('Фейковые данные успешно заполнены');
}


async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User", "Brand", "Product", "SmartphoneCharacteristic", "Cart", "CartItem", "Order", "CharacteristicCategory" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
