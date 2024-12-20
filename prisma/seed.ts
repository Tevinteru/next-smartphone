import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";

async function up() {
  // Добавление пользователей
  await prisma.user.createMany({
    data: [
      {
        fullName: "Alexey",
        email: "petr@test.ru",
        password: hashSync("123", 10),
        role: "USER",
      },
      {
        fullName: "Admin",
        email: "admin@test.ru",
        password: hashSync("123", 10),
        role: "ADMIN",
      },
    ],
  });

  // Добавление брендов
  const brands = await prisma.brand.createMany({
    data: [
      { name: "Apple" },
      { name: "Samsung" },
      { name: "Xiaomi" },
      { name: "HONOR" },
      { name: "Infinix" },
      { name: "realme" },
    ],
  });

  // Добавление продуктов (смартфонов)
  const products = await prisma.product.createMany({
    data: [
      {
        name: "iPhone 13 Pro",
        description: "Новый iPhone 13 Pro с потрясающим экраном и камерой.",
        price: 30999,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st1/fit/500/500/eaa653df54bdef99e7a35bebb6e5b277/bbc9e5cb02430806cb0d8a28879e0fa10b77dea3f56b3bc3d33fe89fbc3e2462.jpg.webp",
        brandId: 1,
      },
      {
        name: "Samsung Galaxy S21",
        description: "Флагманский смартфон Samsung с невероятной камерой.",
        price: 14799,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st1/fit/500/500/cbb7a8a05fe0f1dbbbe24d0886669a44/68e94d97e37063392c59cd11d781b590869784d0dc6236c31c09da5cbd6f66f7.jpg.webp",
        brandId: 2,
      },
      {
        name: "Samsung Galaxy A55",
        description:
          "Лучший смартфон для геймеров и фанатов качественного экрана.",
        price: 13699,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st1/fit/500/500/a0ec6ac6fd9317b6a03797ba10031fb1/a40a5958bbb44ee158fad1a2d04972c7dadb88f8abbb45fb0b1b4cc6a23c9c86.jpg.webp",
        brandId: 2,
      },
      {
        name: "Xiaomi Redmi Note 13",
        description:
          "Флагман Note 13 с отличной производительностью и камерой.",
        price: 13899,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st1/fit/500/500/dd182dc1b0265b6b9c762a76553ecb91/c535077fe172ce14b87dc57b1c9a0d3873cf76bf608832dfa58f4f928759fe0c.jpg.webp",
        brandId: 3,
      },
      {
        name: "HONOR 90 Lite",
        description: "Лучший смартфон от Honor с уникальной камерой.",
        price: 12899,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st4/fit/500/500/23d69e083d3a06e645c127803856946a/01be22a53e3389f7585889f676e1c8472b53486332985b078600b9ed6f60da7f.jpg.webp",
        brandId: 4,
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        description: "Смартфон с отличной камерой и дисплеем от Samsung.",
        price: 11099,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st4/fit/500/500/eaeba33a42d4467c49de57f334bd36a7/666e7887f02c3b8fab3972c5e3cdf21561ec814af9a9276dc5f1b2a2163b69bf.jpg.webp",
        brandId: 2,
      },
      {
        name: "Xiaomi Redmi 12",
        description: "Смартфон Xiaomi с необычным дизайном и хорошей камерой.",
        price: 8549,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st4/fit/500/500/a69fd97f8deaf0b68fc8b86d8dded976/2ba49bf168c9c68b0fe67cd938ce7adf7d7ac2487b837088a2650775ee470bf2.jpg.webp",
        brandId: 3,
      },
      {
        name: "Xiaomi Redmi Note 13 Pro",
        description: "Смартфон с 5G поддержкой и хорошей камерой от Xiaomi.",
        price: 7699,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st1/fit/500/500/fe4226d8fdc14d85316eda91b32df156/16b304c42543c1645063fc81898f8f616a31eb71c1a008c19116b12f65fdd530.jpg.webp",
        brandId: 3,
      },
      {
        name: "Infinix ZERO 30",
        description: "Флагман Infinix с качественным дисплеем и камерой.",
        price: 6999,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st4/fit/500/500/c3280598160e5a308e7b317906e3267e/95b95ebd20e5cde9810625ce476123320ed5a703d5410a758b17bd9a653c8502.jpg.webp",
        brandId: 5,
      },
      {
        name: "realme Note 50",
        description: "Геймерский смартфон с отличной производительностью.",
        price: 4999,
        imageUrl:
          "https://c.dns-shop.ru/thumb/st1/fit/500/500/eaca2545eb3daf349db33ac064ed18c6/a437e4d715a18c1a0c34a985065199906a859b64f0fdefaa7532d962771da58f.jpg.webp",
        brandId: 6,
      },
    ],
  });

  // Добавление характеристик смартфонов
  const smartphoneCharacteristics =
    await prisma.smartphoneCharacteristic.createMany({
      data: [
        {
          smartphoneId: 1,
          characteristic: "Процессор",
          value: "A15 Bionic",
        },
        {
          smartphoneId: 1,
          characteristic: "Экран",
          value: "6.1 дюйма, OLED",
        },
        {
          smartphoneId: 2,
          characteristic: "Процессор",
          value: "Exynos 2100",
        },
        {
          smartphoneId: 2,
          characteristic: "Экран",
          value: "6.2 дюйма, AMOLED",
        },
        {
          smartphoneId: 3,
          characteristic: "Процессор",
          value: "Snapdragon 888",
        },
        {
          smartphoneId: 3,
          characteristic: "Экран",
          value: "6.81 дюйма, AMOLED",
        },
        {
          smartphoneId: 4,
          characteristic: "Процессор",
          value: "Snapdragon 888",
        },
        {
          smartphoneId: 4,
          characteristic: "Экран",
          value: "6.55 дюйма, Fluid AMOLED",
        },
        {
          smartphoneId: 5,
          characteristic: "Процессор",
          value: "Kirin 990 5G",
        },
        {
          smartphoneId: 5,
          characteristic: "Экран",
          value: "6.58 дюйма, OLED",
        },
        {
          smartphoneId: 6,
          characteristic: "Процессор",
          value: "Snapdragon 865",
        },
        {
          smartphoneId: 6,
          characteristic: "Экран",
          value: "6.5 дюйма, OLED",
        },
        {
          smartphoneId: 7,
          characteristic: "Процессор",
          value: "Snapdragon 765G",
        },
        {
          smartphoneId: 7,
          characteristic: "Экран",
          value: "6.8 дюйма, OLED",
        },
        {
          smartphoneId: 8,
          characteristic: "Процессор",
          value: "Snapdragon 765G",
        },
        {
          smartphoneId: 8,
          characteristic: "Экран",
          value: "6.81 дюйма, IPS LCD",
        },
        {
          smartphoneId: 9,
          characteristic: "Процессор",
          value: "Snapdragon 865",
        },
        {
          smartphoneId: 9,
          characteristic: "Экран",
          value: "6.7 дюйма, OLED",
        },
        {
          smartphoneId: 10,
          characteristic: "Процессор",
          value: "Snapdragon 870",
        },
        {
          smartphoneId: 10,
          characteristic: "Экран",
          value: "6.43 дюйма, AMOLED",
        },
        {
          smartphoneId: 1,
          characteristic: "ram",
          value: "4",
        },
        {
          smartphoneId: 2,
          characteristic: "ram",
          value: "8",
        },
        {
          smartphoneId: 3,
          characteristic: "ram",
          value: "12",
        },
        {
          smartphoneId: 4,
          characteristic: "ram",
          value: "8",
        },
        {
          smartphoneId: 5,
          characteristic: "ram",
          value: "6",
        },
        {
          smartphoneId: 6,
          characteristic: "ram",
          value: "6",
        },
        {
          smartphoneId: 7,
          characteristic: "ram",
          value: "6",
        },
        {
          smartphoneId: 8,
          characteristic: "ram",
          value: "4",
        },
        {
          smartphoneId: 9,
          characteristic: "ram",
          value: "8",
        },
        {
          smartphoneId: 10,
          characteristic: "ram",
          value: "12",
        },
        // Встроенная память (storage)
        { smartphoneId: 1, characteristic: "storage", value: "128" },
        { smartphoneId: 2, characteristic: "storage", value: "256" },
        { smartphoneId: 3, characteristic: "storage", value: "128" },
        { smartphoneId: 4, characteristic: "storage", value: "128" },
        { smartphoneId: 5, characteristic: "storage", value: "128" },
        { smartphoneId: 6, characteristic: "storage", value: "128" },
        { smartphoneId: 7, characteristic: "storage", value: "128" },
        { smartphoneId: 8, characteristic: "storage", value: "64" },
        { smartphoneId: 9, characteristic: "storage", value: "128" },
        { smartphoneId: 10, characteristic: "storage", value: "256" },
      ],
    });
    await prisma.cart.createMany({
      data: [
        {
          userId: 1,
          totalAmount: 0,
          token: "1111",
        },
        {
          userId: 2,
          totalAmount: 0,
          token: "2222",
        },
      ],
    });
    await prisma.cartItem.create({
      data: {
        productId: 1,
        cartId: 1,
        userId: 1,
        quantity: 1,
      },
    });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User", "Brand", "Product", "SmartphoneCharacteristic", "Cart", "CartItem", "Order" RESTART IDENTITY CASCADE`;
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
