import { Product, SmartphoneCharacteristic } from '@prisma/client';

export type ProductWithRelations = Product & {smartphoneCharacteristics: SmartphoneCharacteristic[]};
