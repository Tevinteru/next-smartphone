import { PrismaClient } from '@prisma/client'
import { pagination } from 'prisma-extension-pagination';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(pagination());
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma