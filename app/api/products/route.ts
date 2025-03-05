import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(){
    const products = await prisma.product.findMany({
        include:{
            smartphoneCharacteristics: true,
        }
    });
    return NextResponse.json(products);
}